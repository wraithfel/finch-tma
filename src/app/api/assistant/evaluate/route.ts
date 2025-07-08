import { NextResponse } from 'next/server'
import { askAssistant } from '@/lib/openai/assistant'
import { cleanText } from '@/lib/utils/converters'

interface EvaluateRequest {
  dishName: string
  ingredients?: string[]
  sauceNames?: string[]
  sauceIngredients?: string[]
  userAnswer: string
  threadId?: string
}

function buildPrompt(
  dishName: string,
  ingredients: string[],
  sauceNames: string[],
  sauceIngredients: string[],
  userAnswer: string
) {
  const base = `Пользователь отвечает на вопрос: "Расскажи мне о составе блюда ${dishName}, указав все ингредиенты блюда и каждого соуса."`
  const dishPart = `Правильный состав блюда: ${ingredients.join(', ')} и соусы и их состав, если есть в блюде.`
  const saucePart = sauceNames.length
    ? `; соусы: ${sauceNames.join(', ')} с ингредиентами ${sauceIngredients.join(', ')}`
    : ''
  const ua = `Пользователь ответил: "${userAnswer}".`
  const instr =
    'Оцени, как живой человек: если всё верно — похвали; если есть неточности — мягко укажи их и назови верный состав блюда и соусов.'
  return [base, dishPart + saucePart + '.', ua, instr].filter(Boolean).join(' ')
}

export async function POST(req: Request) {
  const {
    dishName,
    ingredients = [],
    sauceNames = [],
    sauceIngredients = [],
    userAnswer,
    threadId
  } = (await req.json()) as EvaluateRequest

  const prompt = buildPrompt(
    dishName,
    ingredients,
    sauceNames,
    sauceIngredients,
    userAnswer
  )
  const { answer, threadId: newThreadId } = await askAssistant(prompt, threadId)
  return NextResponse.json({
    feedback: cleanText(answer.trim()),
    threadId: newThreadId
  })
}