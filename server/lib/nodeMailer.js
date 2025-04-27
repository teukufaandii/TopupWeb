import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendVerificationEmail(to, token) {
  const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${token}`;
  
  const mailOptions = {
    from: '"Fandi Store" <no-reply@fandistore.com>',
    to,
    subject: 'Verifikasi Email Anda',
    html: `
      <h3>Verifikasi Email</h3>
      <p>Terima kasih telah mendaftar. Klik link di bawah ini untuk verifikasi email Anda:</p>
      <a href="${verificationLink}">Verifikasi Email</a>
    `,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendResetPasswordEmail(to, token) {
  const resetLink = `http://localhost:5000/api/auth/reset-password?token=${token}`;
  
  const mailOptions = {
    from: '"Fandi Store" <no-reply@fandistore.com>',
    to,
    subject: 'Reset Password',
    html: `
      <h3>Reset Password</h3>
      <p>Klik link berikut untuk mengganti password Anda:</p>
      <a href="${resetLink}">Reset Password</a>
    `,
  };

  return transporter.sendMail(mailOptions);
}
