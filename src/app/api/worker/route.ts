import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // This endpoint simulates a background worker.
  // It finds 'pending' jobs and marks them as 'completed' after a delay.
  
  const supabase = await createClient();

  // 1. Fetch pending jobs
  const { data: jobs } = await supabase
    .from('render_jobs')
    .select('*')
    .eq('status', 'pending')
    .limit(1);

  if (!jobs || jobs.length === 0) {
    return NextResponse.json({ message: 'No pending jobs' });
  }

  const job = jobs[0];

  // 2. Simulate processing (update to 'processing')
  await supabase
    .from('render_jobs')
    .update({ status: 'processing' })
    .eq('id', job.id);

  // 3. Simulate completion (update to 'completed' with dummy output)
  // In a real app, this would be done by an external worker after ffmpeg finishes.
  const dummyOutput = "https://www.w3schools.com/html/mov_bbb.mp4"; // Placeholder video

  await supabase
    .from('render_jobs')
    .update({ 
        status: 'completed',
        output_url: dummyOutput,
        updated_at: new Date().toISOString()
    })
    .eq('id', job.id);

  return NextResponse.json({ 
    message: `Processed job ${job.id}`, 
    job_id: job.id, 
    status: 'completed' 
  });
}
