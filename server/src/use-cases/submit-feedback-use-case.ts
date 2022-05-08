import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbacUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute({ type, comment, screenshot }: SubmitFeedbacUseCaseRequest) {
    if (!type) {
      throw new Error('Type is required');
    }

    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });


    const body = [
      `<div style="font-family: sans-serif; font-size: 16px; color #111">`,
      `<p>Tipo do feedback ${type}</p>`,
      `<p>Comentário ${comment}</p>`,
      `</div>`,
    ].join("\n");

    await this.mailAdapter.sendMail({ subject: "Novo feedback", body });
  }
}
