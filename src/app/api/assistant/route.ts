import { NextRequest, NextResponse } from 'next/server';
import { askAssistant } from '@/lib/openai/assistant';

export const runtime = 'edge';

interface Payload {
  message: string;
  threadId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, threadId }: Payload = await req.json();
    if (!message) {
      return NextResponse.json({ error: '`message` is required' }, { status: 400 });
    }

    const { answer, threadId: newThreadId } = await askAssistant(message, threadId);

    return NextResponse.json({ answer, threadId: newThreadId }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Assistant error' }, { status: 500 });
  }
}
