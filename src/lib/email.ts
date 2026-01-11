import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  react,
  text,
}: {
  to: string | string[];
  subject: string;
  react?: React.ReactNode;
  text?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Skipping email.');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'RoostHub <onboarding@resend.dev>', // Update this after domain verification
      to,
      subject,
      text: text || '',
      // react: react, // Uncomment when using react templates
    });

    if (error) {
      console.error('Error sending email:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Email exception:', error);
    return { error };
  }
}
