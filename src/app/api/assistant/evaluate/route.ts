import { NextResponse } from 'next/server'
import { askAssistant } from '@/lib/openai/assistant'

function buildPrompt(dishName: string, ingredients: string[], sauceIngredients: string[], userAnswer: string) {
  const base = `Пользователь отвечает на вопрос: "Расскажи мне о составе блюда ${dishName}".`
  const meds = `Правильный состав блюда: ${ingredients.join(', ')}.`
  const sauce = sauceIngredients.length
    ? `Правильный состав соуса: ${sauceIngredients.join(', ')}.`
    : ''
  const ua = `Пользователь ответил: "${userAnswer}".`
  const instr = `Оцени, как живой человек: если всё верно — скажи что всё правильно и похвали; если неточности — мягко укажи их и назови верный состав.`
  return [base, meds, sauce, ua, instr].filter(Boolean).join(' ')
}

export async function POST(req: Request) {
  const { dishName, ingredients, sauceIngredients, userAnswer, threadId } = await req.json()
  const prompt = buildPrompt(dishName, ingredients, sauceIngredients, userAnswer)
  const { answer, threadId: newThreadId } = await askAssistant(prompt, threadId)
  return NextResponse.json({ feedback: answer.trim(), threadId: newThreadId })
}
