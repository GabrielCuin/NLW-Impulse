import { prisma } from "../../prisma";
import { FeedbacksRepositories, FeedbackCreateData } from "../Feedbacks-repositories";

export class PrismaFeedbackRepositorie implements FeedbacksRepositories{
  async create ({type, comment, screenshot}: FeedbackCreateData)  {
    await prisma.feedback.create({
        data: {
          type,
          comment,
          screenshot,
        },
      })
   }; 
}