import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e476f59fd0e3bd",
    pass: "a5b83e14b2a7f1",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <ola@email.com>",
      to: "Gabriel Cuin <gabrielcuin42@gmail.com>",
      subject,
      html: body,
    });
  }
}
