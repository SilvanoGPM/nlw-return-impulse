import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const feedbacksRepositoryMock = { create: createFeedbackSpy };
const mailAdapterMock = { sendMail: sendMailSpy };

const submitFeedback = new SubmitFeedbackUseCase(
  feedbacksRepositoryMock,
  mailAdapterMock
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "data:image/png;base64,LPWQKJLGQPKGO1P5J1KLTÇ1JK5KL1JK51LÇ61JK6",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback wihout type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Example comment",
        screenshot: "data:image/png;base64,LPWQKJLGQPKGO1P5J1KLTÇ1JK5KL1JK51LÇ61JK6",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback wihout comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,LPWQKJLGQPKGO1P5J1KLTÇ1JK5KL1JK51LÇ61JK6",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "test.png",
      })
    ).rejects.toThrow();
  });
});
