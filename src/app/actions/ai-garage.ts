'use server';

import { createClient } from '@/lib/supabase/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function askGarageAI(machineId: string, message: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  // 1. Get Machine Context
  const { data: machine } = await supabase
    .from('garage_machines')
    .select('*')
    .eq('id', machineId)
    .single();

  if (!machine) return { error: 'Machine not found' };

  // 2. Save User Message
  await supabase.from('garage_ai_chats').insert({
    user_id: user.id,
    machine_id: machineId,
    role: 'user',
    content: message
  });

  // 3. Prompt Groq
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are RoostHub AI, an expert motorsports mechanic. 
        You are helping a user with their ${machine.year} ${machine.make} ${machine.model}.
        The machine currently has ${machine.hours} hours.
        Provide technical, precise maintenance advice. Suggest specific parts or service intervals.`
      },
      { role: 'user', content: message }
    ],
    model: 'llama-3.3-70b-versatile',
  });

  const response = completion.choices[0]?.message?.content || "Sorry, I couldn't process that.";

  // 4. Save AI Response
  await supabase.from('garage_ai_chats').insert({
    user_id: user.id,
    machine_id: machineId,
    role: 'assistant',
    content: response
  });

  return { content: response };
}
