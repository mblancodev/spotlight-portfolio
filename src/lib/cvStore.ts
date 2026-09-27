import { createHash, timingSafeEqual } from 'crypto'
import { mkdir, readFile, stat, writeFile } from 'fs/promises'
import path from 'path'

import { getStore } from '@netlify/blobs'

const STORE = 'cv'
const KEY = 'current'
/** Netlify synchronous functions reject request bodies above 6 MB. */
export const maxCvBytes = 6 * 1024 * 1024

const fallbackPath = path.join(process.cwd(), 'src/content/cv.pdf')
const localPath = path.join(process.cwd(), 'data/cv.pdf')

export type CvSource = 'netlify-blobs' | 'local' | 'bundled'

export type CvFile = {
  bytes: Uint8Array
  source: CvSource
  updatedAt: string | null
}

function onNetlify() {
  return process.env.NETLIFY === 'true'
}

function store() {
  return getStore({ name: STORE, consistency: 'strong' })
}

export function toArrayBuffer(bytes: Uint8Array) {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer
}

export function isPdf(bytes: Uint8Array) {
  let head = Buffer.from(bytes.subarray(0, 1024)).toString('latin1')
  return head.includes('%PDF-')
}

export function authorizeCvUpload(request: Request) {
  let expected = process.env.CV_UPLOAD_TOKEN
  if (!expected) return 'unconfigured' as const

  let header = request.headers.get('authorization') ?? ''
  let token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : ''
  let actualHash = createHash('sha256').update(token).digest()
  let expectedHash = createHash('sha256').update(expected).digest()

  if (!timingSafeEqual(actualHash, expectedHash)) return 'unauthorized' as const
  return 'ok' as const
}

/** Deploy previews share the production blob store, so they must not write it. */
export function uploadContextError() {
  if (
    onNetlify() &&
    process.env.CONTEXT &&
    process.env.CONTEXT !== 'production'
  ) {
    return 'Uploads are only accepted on the production site.'
  }
  return null
}

export async function saveCv(bytes: Uint8Array): Promise<CvFile> {
  let updatedAt = new Date().toISOString()

  if (onNetlify()) {
    await store().set(KEY, new Blob([toArrayBuffer(bytes)]), {
      metadata: { updatedAt, bytes: bytes.byteLength },
    })
    return { bytes, source: 'netlify-blobs', updatedAt }
  }

  await mkdir(path.dirname(localPath), { recursive: true })
  await writeFile(localPath, bytes)
  return { bytes, source: 'local', updatedAt }
}

export async function readCv(): Promise<CvFile> {
  if (onNetlify()) {
    let entry = await store().getWithMetadata(KEY, {
      type: 'arrayBuffer',
      consistency: 'strong',
    })
    if (entry?.data) {
      let updatedAt =
        typeof entry.metadata.updatedAt === 'string'
          ? entry.metadata.updatedAt
          : null
      return {
        bytes: new Uint8Array(entry.data),
        source: 'netlify-blobs',
        updatedAt,
      }
    }
  } else {
    try {
      let bytes = new Uint8Array(await readFile(localPath))
      let info = await stat(localPath)
      return { bytes, source: 'local', updatedAt: info.mtime.toISOString() }
    } catch (error) {
      if (!isMissingFile(error)) throw error
    }
  }

  let bytes = new Uint8Array(await readFile(fallbackPath))
  return { bytes, source: 'bundled', updatedAt: null }
}

function isMissingFile(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  )
}
