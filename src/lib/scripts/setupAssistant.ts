import { createReadStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

async function main(): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY in env');
  }
  const openai = new OpenAI({ apiKey });

  const knowledgeDir = path.resolve(process.cwd(), 'knowledge');
  const fileNames = await fs.readdir(knowledgeDir);
  if (fileNames.length === 0) {
    throw new Error('📂 /knowledge directory is empty');
  }

  const file_ids: string[] = [];
  for (const name of fileNames) {
    const stream = createReadStream(path.join(knowledgeDir, name));
    const uploaded = await openai.files.create({
      file: stream,
      purpose: 'assistants',
    });
    console.log(`✔ Uploaded ${name} → ${uploaded.id}`);
    file_ids.push(uploaded.id);
  }

  const vectorStore = await openai.vectorStores.create({
    name: 'Finch Knowledge',
    file_ids,            
  });
  console.log(`🗃 Created vector store ${vectorStore.id} (status: ${vectorStore.status})`);

  while (vectorStore.status !== 'completed') {
    await new Promise((r) => setTimeout(r, 3000));
    const refreshed = await openai.vectorStores.retrieve(vectorStore.id);
    process.stdout.write(`↻ Indexing... status=${refreshed.status}\r`);
    if (refreshed.status === 'expired') {
      throw new Error('❌ Vector store indexing failed');
    }
    if (refreshed.status === 'completed') {
      console.log('\n✅ Vector store ready');
      break;
    }
  }

  const assistant = await openai.beta.assistants.create({
    name: 'Finch Mentor',
    model: 'gpt-4o',
    instructions: `
        Ты — дружелюбный и профессиональный AI-ментор официанта Finch. Твоя задача:

        1. Отвечать чётко и по делу (2–5 предложений), подкрепляя ответ примерами из меню или стандартов сервиса.
        2. Игнорировать нерелевантные вопросы ("какая погода на Марсе?") фразой:
        “Извините, я здесь чтобы помогать официантам Finch. Вернёмся к теме обслуживания.”
        3. Не предлагать блюд и напитков, которых нет в текущем меню.
        4. Структура ответа:
        a) Краткая рекомендация (1–2 предложения).  
        b) Конкретный пример применения (1–2 предложения).
        5. Тон — дружелюбный, уверенный, профессиональный наставник.
        6. При выходе за рамки компетенции:
        “Извините, я здесь чтобы помогать официантам Finch. Чем ещё могу помочь по теме обслуживания?”
    `.trim(),
    tools: [{ type: 'file_search' }],
    tool_resources: {                 
      file_search: {
        vector_store_ids: [vectorStore.id],
      },
    },
  });
  console.log(`🤖 Assistant created → ${assistant.id}`);

  const envLocal = path.resolve(process.cwd(), '.env.local');
  const append = `\nVECTOR_STORE_ID=${vectorStore.id}\nASSISTANT_ID=${assistant.id}\n`;
  await fs.appendFile(envLocal, append, 'utf8');
  console.log('🔐 IDs appended to .env.local');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
