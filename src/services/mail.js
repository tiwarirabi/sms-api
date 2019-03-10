import * as nodemailer from "nodemailer";

export async function sendMail(to, subject, body) {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const from = '"3jhakri.com" <auth@3jhakri.com>';

  const mailOptions = {
    to,
    subject,
    from,
    html: body,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
