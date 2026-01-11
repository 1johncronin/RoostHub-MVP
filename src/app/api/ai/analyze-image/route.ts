import { analyzeMachineImage } from '@/lib/ai/groq';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json(); // base64 string
    if (!image) return NextResponse.json({ error: 'Image data required' }, { status: 400 });

    // AI Vision Analysis
    const analysis = await analyzeMachineImage(image);
    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('AI Vision Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
