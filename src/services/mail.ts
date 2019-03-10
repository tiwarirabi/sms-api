import * as mail from '../utils/mail';

export async function sendMail(to: string, subject: string, body: string) {
  
  const from = '"3jhakri.com" <noreply@3jhakri.com>';

  return mail.sendMail(from, to, subject, body);
}
