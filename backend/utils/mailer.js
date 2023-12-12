const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.drogueriagarzon.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: 'notificaciones@drogueriagarzon.com',
        pass: 'CqMEwy9xxt2w',
    },
    tls: {
        rejectUnauthorized: false, // Aceptar certificados no autorizados o vencidos
    },
});

const sendWelcomeEmail = async (email) => {
    try {
        const mailOptions = {
            from: 'notificaciones@drogueriagarzon.com',
            to: email,
            subject: 'Bienvenido a nuestra aplicación',
            text: '¡Gracias por registrarte en nuestra aplicación! Esperamos que disfrutes de tu experiencia.',
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo de bienvenida:', error);
    }
};

const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        const mailOptions = {
            from: 'notificaciones@drogueriagarzon.com',
            to: email,
            subject: 'Restablecimiento de contraseña',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
    }
};

module.exports = { sendWelcomeEmail, sendPasswordResetEmail };
