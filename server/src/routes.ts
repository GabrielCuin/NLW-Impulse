import express from "express";
import { SubmitFeedbackService } from "./services/submit-feedback-service";
import { PrismaFeedbackRepositorie } from "./repositories/prisma/prisma-feedbacks-repositorie";
import { NodemailerMailAdapter } from "./adapters/nodeMailer/nodemailer-mail-adapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  try {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepositorie = new PrismaFeedbackRepositorie();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackService = new SubmitFeedbackService(
      prismaFeedbackRepositorie,
      nodemailerMailAdapter
    );

    await submitFeedbackService.execute({
      type,
      comment,
      screenshot,
    });

    return res.status(201).send();
  } catch (error) {
    console.log(error);

    return res.status(500).send();
  }
});
