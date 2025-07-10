import { NextResponse } from 'next/server'
import { askAssistant } from '@/lib/openai/assistant'
import { cleanText } from '@/lib/utils/converters'

interface EvaluateGeneralRequest {
  question: string
  correctAnswer: string
  userAnswer: string
  threadId?: string
}

function buildPrompt(question: string, correctAnswer: string, userAnswer: string) {
  return `Вопрос: "${question}". Правильный ответ: "${correctAnswer}". Ответ пользователя(стажера): "${userAnswer}". Оцени по десятибалльной шкале; 10 означает полностью правильно. Сначала напиши только "Оценка: {число}/10", затем обратную связь, как наставник, попытайся объяснить максимально хорошо.`
}

export async function POST(req: Request) {
  const { question, correctAnswer, userAnswer, threadId } =
    (await req.json()) as EvaluateGeneralRequest

  const prompt = buildPrompt(question, correctAnswer, userAnswer)
  const { answer, threadId: newThreadId } = await askAssistant(prompt, threadId)

  const cleaned = cleanText(answer.trim())
  const m = cleaned.match(/(?:^|\s)(10|\d)(?:[.,\/\s]|$)/)
  const score = m ? Number(m[1]) : 0

  return NextResponse.json({
    feedback: cleaned,
    score,
    threadId: newThreadId
  })
}
