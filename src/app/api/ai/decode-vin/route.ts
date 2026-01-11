import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    const { vin } = await request.json();
    if (!vin) return NextResponse.json({ error: 'VIN required' }, { status: 400 });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an omniscient motocross and snowmobile VIN expert. Decode the provided VIN. Return Year, Make, and Model in JSON format ONLY.',
        },
        {
          role: 'user',
          content: `Decode this VIN: ${vin}`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(chatCompletion.choices[0].message.content || '{}');
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
