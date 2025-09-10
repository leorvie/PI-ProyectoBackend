import nodemailer from "nodemailer";

export const sendResetEmail = async (to, link) => {
  // Crea una cuenta de prueba en Ethereal
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Soporte" <no-reply@example.com>',
    to,
    subject: "Restablece tu contraseña",
    html: `
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña. El enlace es válido por 1 hora:</p>
      <a href="${link}">${link}</a>
      <p>Si no solicitaste este cambio, ignora este correo.</p>
    `,
  });

  // Muestra la URL de vista previa en consola
  console.log("Vista previa del email:", nodemailer.getTestMessageUrl(info));
};
