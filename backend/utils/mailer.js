// mailer.js

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { generateToken } = require('./token');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    host: 'mail.drogueriagarzon.com',
    port: 587,
    secure: false,
    auth: {
        user: 'notificaciones@drogueriagarzon.com',
        pass: 'CqMEwy9xxt2w',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const readTemplate = (templateName) => {
    const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
    return fs.readFileSync(templatePath, 'utf-8');
};

const sendWelcomeEmail = async (email) => {
    try {
        const mailOptions = {
            from: 'notificaciones@drogueriagarzon.com',
            to: email,
            subject: 'Te damos la bienvenida a Garzón 💙',
            html: readTemplate('welcome'),
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo de bienvenida:', error);
    }
};

const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        const resetUrl = `http://45.162.169.217:3000/login/resetpass/${resetToken}`;

        const mailOptions = {
            from: 'notificaciones@drogueriagarzon.com',
            to: email,
            subject: 'Restablecimiento de contraseña',
            html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace: <a href="${resetUrl}">Restablecer contraseña</a></p>`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
    }
};

module.exports = { sendWelcomeEmail, sendPasswordResetEmail };
