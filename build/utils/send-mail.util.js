"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    // @ts-ignore
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: process.env.SMTP_PORT,
    secure: parseInt(process.env.SMTP_PORT ?? '') === 465 ? true : false, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
    },
});
const sendMail = async (options) => {
    await transporter.sendMail({
        from: `"My Expenses" <${process.env.SMTP_MAIL}>`, // sender address
        to: options.to, // list of receivers
        subject: options.subject, // Subject line
        text: options.text, // plain text body
        html: options.html, // html body
    });
};
exports.sendMail = sendMail;
