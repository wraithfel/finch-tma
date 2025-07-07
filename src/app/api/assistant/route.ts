import { NextResponse } from 'next/server';
import { askAssistant } from '@/lib/openai/assistant';

function cleanText(text: string): string {
  return text
    .replace(/【[^】]+†[^】]+】/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .trim();
}

export async function POST(req: Request) {
  try {
    const { message, threadId } = await req.json();

    const { answer, threadId: newThreadId } = await askAssistant(
      message as string,
      threadId as string | undefined,
    );

    const cleaned = cleanText(answer);

    return NextResponse.json(
      { answer: cleaned, threadId: newThreadId },
      { status: 200 },
    );
  } catch (error) {
    console.error('[assistant-route]', error);
    return NextResponse.json(
      { error: 'Ошибка сервера Assistant' },
      { status: 500 },
    );
  }
}

