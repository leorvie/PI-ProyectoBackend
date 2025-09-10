import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends a password reset email using SendGrid.
 * @async
 * @function sendResetEmail
 * @param {string} to - The recipient's email address.
 * @param {string} link - The password reset link to include in the email.
 * @returns {Promise<void>}
 */
export const sendResetEmail = async (to, link) => {
  const msg = {
    to,
    from: process.env.EMAIL_USER, // Debe ser un correo verificado en SendGrid
    subject: "Restablece tu contraseña",
    html: `
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña. El enlace es válido por 1 hora:</p>
      <a href="${link}">${link}</a>
      <p>Si no solicitaste este cambio, ignora este correo.</p>
    `,
  };
  await sgMail.send(msg);
};
