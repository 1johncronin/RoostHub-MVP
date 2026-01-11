import { Resend } from 'resend';

// Initialize lazily to prevent crash during build if key is missing
let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

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
  const resendInstance = getResend();
  
  if (!resendInstance) {
    console.warn('RESEND_API_KEY is not set. Skipping email.');
    return;
  }

  try {
    const { data, error } = await resendInstance.emails.send({
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
