import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeMachineText(text: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are an omniscient motocross and snowmobile expert. Extract the Year, Make, Model, and Hours from the provided text. Return ONLY JSON.',
      },
      {
        role: 'user',
        content: text,
      },
    ],
    model: 'llama-3.3-70b-versatile',
    response_format: { type: 'json_object' },
  });

  return JSON.parse(chatCompletion.choices[0].message.content || '{}');
}
