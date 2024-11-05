import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: 'smtp.gmail.com',
    port: /*587*/  465,
    secure: /*false*/ true,
    auth: {
        user: 'abubakarimoro27@gmail.com',
        pass: process.env.EMAIL_PASSWORD_KEY
    },
    from: 'abubakarimoro27@gmail.com'
});