import Groq from 'groq-sdk';

function getGroqClient() {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

export async function analyzeMachineText(text: string) {
  const groq = getGroqClient();
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

export async function analyzeMachineImage(base64Image: string) {
  const groq = getGroqClient();
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'You are an omniscient motorsports expert. Analyze this photo of a machine. Identify all visible modifications (pipes, bars, graphics, tires, etc.) and describe the overall condition. Return ONLY JSON with keys: "modifications" (array), "condition_notes" (string), "suggested_title" (string).',
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    model: 'llama-3.2-11b-vision-preview',
    response_format: { type: 'json_object' },
  });

  return JSON.parse(chatCompletion.choices[0].message.content || '{}');
}
