import { NextResponse } from "next/server" 

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('user_id')
  if (!userId) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
  }

  const photosRes = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}&limit=1`
  )
  const photosData = await photosRes.json()

  if (!photosData.ok || photosData.result.total_count === 0) {
    return NextResponse.next() 
  }

  const fileId = photosData.result.photos[0][0].file_id

  const fileRes = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
  )
  const fileData = await fileRes.json()

  if (!fileData.ok) {
    return NextResponse.next()
  }

  const filePath = fileData.result.file_path
  const photoUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`

  return NextResponse.redirect(photoUrl)
}
