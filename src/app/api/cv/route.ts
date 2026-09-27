import {
  authorizeCvUpload,
  isPdf,
  maxCvBytes,
  readCv,
  saveCv,
  uploadContextError,
} from '@/lib/cvStore'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  let cv = await readCv()

  return Response.json({
    ok: true,
    source: cv.source,
    bytes: cv.bytes.byteLength,
    updatedAt: cv.updatedAt,
  })
}

export async function POST(request: Request) {
  let auth = authorizeCvUpload(request)
  if (auth === 'unconfigured') {
    return Response.json(
      { error: 'CV_UPLOAD_TOKEN is not configured.' },
      { status: 503 },
    )
  }
  if (auth === 'unauthorized') {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let contextError = uploadContextError()
  if (contextError) {
    return Response.json({ error: contextError }, { status: 403 })
  }

  let bytes = await readUpload(request)
  if (bytes instanceof Response) return bytes

  let saved = await saveCv(bytes)

  return Response.json({
    ok: true,
    source: saved.source,
    bytes: saved.bytes.byteLength,
    updatedAt: saved.updatedAt,
  })
}

async function readUpload(request: Request) {
  let type = request.headers.get('content-type') ?? ''
  let bytes: Uint8Array

  if (type.includes('multipart/form-data')) {
    let form = await request.formData()
    let file = form.get('file')
    if (!(file instanceof File)) {
      return Response.json(
        { error: 'Send the PDF as the "file" field.' },
        { status: 400 },
      )
    }
    bytes = new Uint8Array(await file.arrayBuffer())
  } else {
    bytes = new Uint8Array(await request.arrayBuffer())
  }

  if (bytes.byteLength === 0) {
    return Response.json({ error: 'The PDF is empty.' }, { status: 400 })
  }
  if (bytes.byteLength > maxCvBytes) {
    return Response.json(
      { error: 'The PDF is larger than 6 MB.' },
      { status: 413 },
    )
  }
  if (!isPdf(bytes)) {
    return Response.json({ error: 'The file is not a PDF.' }, { status: 415 })
  }

  return bytes
}
