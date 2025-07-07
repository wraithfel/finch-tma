import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const assistantId = process.env.ASSISTANT_ID!;

type ThreadMessage = OpenAI.Beta.Threads.Messages.Message;
type MessageBlock = ThreadMessage['content'][number];

function isTextBlock(
  block: MessageBlock,
): block is Extract<MessageBlock, { type: 'text' }> {
  return block.type === 'text';
}

export async function askAssistant(
  content: string,
  threadId?: string,
): Promise<{ answer: string; threadId: string }> {
  const thread =
    threadId == null
      ? await openai.beta.threads.create()
      : await openai.beta.threads.retrieve(threadId);

  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content,
  });

  let run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistantId,
  });

  while (run.status === 'queued' || run.status === 'in_progress') {
    await new Promise(r => setTimeout(r, 1_000));
    run = await openai.beta.threads.runs.retrieve(run.id, {
      thread_id: thread.id,
    });
  }

  if (run.status !== 'completed') {
    throw new Error(`run finished with status ${run.status}`);
  }

  const { data } = await openai.beta.threads.messages.list(thread.id, {
    order: 'desc',
    limit: 1,
  });

  const last = data[0];
  const answer = last?.content.find(isTextBlock)?.text.value ?? '';

  return { answer, threadId: thread.id };
}
