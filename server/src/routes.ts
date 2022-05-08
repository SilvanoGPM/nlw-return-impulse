import express from "express";
import nodemailer from "nodemailer";

import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "57e9ce5130c4f0",
    pass: "0331879337a3f1",
  },
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository);

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

  // const html = [
  //   `<div style="font-family: sans-serif; font-size: 16px; color #111">`,
  //   `<p>Tipo do feedback ${type}</p>`,
  //   `<p>Comentário ${comment}</p>`,
  //   `</div>`
  // ].join("\n");

  // await transport.sendMail({
  //   from: "Equipe Feedget <oi@feedget.com>",
  //   to: "Silvano Marques <silvanosilvino@hotmail.com>",
  //   subject: "Novo feeedback",
  //   html,
  // });

  return res.status(201).send();
});
