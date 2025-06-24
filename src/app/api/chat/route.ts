import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: '`messages` must be array' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });

    return NextResponse.json(
      { content: completion.choices[0].message.content ?? '' },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ hint: 'Use POST with { messages }' }, { status: 405 });
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}
