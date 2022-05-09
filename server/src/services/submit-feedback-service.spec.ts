import { SubmitFeedbackService } from "./submit-feedback-service";

const creatFedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: creatFedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "data:image/png:base64",
      })
    ).resolves.not.toThrow();

    expect(creatFedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Example comment",
        screenshot: "data:image/png:base64",
      })
    ).rejects.toThrow();
  });

  it("should be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png:base64",
      })
    ).rejects.toThrow();
  });

  it("should be able to submit a feedback with an invalid screendhot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "test.png",
      })
    ).rejects.toThrow();
  });
});
