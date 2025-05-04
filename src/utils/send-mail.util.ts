import nodemailer from 'nodemailer'
 
 interface IMailOption {
     to:string;
     subject:string;
     text?:string
     html?:string
 }
 
 
 const transporter = nodemailer.createTransport({
     // @ts-ignore
     host: process.env.SMTP_HOST ?? "smtp.gmail.com",
     port: process.env.SMTP_PORT,
     secure: parseInt(process.env.SMTP_PORT ?? '')=== 465 ? true :  false, // true for port 465, false for other ports
     auth: {
       user: process.env.SMTP_MAIL,
       pass: process.env.SMTP_PASS,
     },
   });
 
 
   export const sendMail = async (options:IMailOption) =>{
     await transporter.sendMail({
         from: `"My Expenses" <${process.env.SMTP_MAIL}>`, // sender address
         to: options.to, // list of receivers
         subject: options.subject, // Subject line
         text: options.text, // plain text body
         html: options.html, // html body
       });
    
   }