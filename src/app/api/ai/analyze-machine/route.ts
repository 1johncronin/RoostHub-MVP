import { analyzeMachineText } from '@/lib/ai/groq';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) return NextResponse.json({ error: 'Text required' }, { status: 400 });

    const specs = await analyzeMachineText(text);
    return NextResponse.json(specs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
