import { readCv, toArrayBuffer } from '@/lib/cvStore'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  let cv = await readCv()

  return new Response(toArrayBuffer(cv.bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(cv.bytes.byteLength),
      'Cache-Control': 'no-store',
      'Content-Disposition': 'inline; filename="CV_Manuel-Blanco.pdf"',
    },
  })
}
