import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepositories } from "../repositories/Feedbacks-repositories";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepositories,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required.");
    }

    if (!comment) {
      throw new Error("Comment is required.");
    }

    if (screenshot && !screenshot.startsWith("data:image/png:base64")) {
      throw new Error("Formato de imagem inválida");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 14px; color: #">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot? `<img src="${screenshot}" />` : "",
        `</div>`,
      ].join("\n"),
    });
  }
}
