import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { MailAdapter, SendMailData } from "../mail-adapter";

dotenv.config();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export class NodemailderMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Silvano Marques <silvanosilvino@hotmail.com>",
      subject,
      html: body,
    });
  }
}
