import prisma from "../config/db.js";
import { dispatchWebhook } from "../webhooks/webhook.dispatcher.js";
import { EVENTS } from "../webhooks/webhook.event.js";
import * as botService from "../services/chatbot.service.js";

export const submitFeedback = async (req, res, next) => {
  try {
    const { message, rating } = req.body;
    await prisma.feedback.create({ data: { userId: req.user.userId, message, rating } });
    dispatchWebhook(EVENTS.FEEDBACK_SUBMITTED, { userId: req.user.userId, rating });

    res.json({ success: true, message: botService.feedbackReceivedMessage() });
  } catch (err) {
    next(err);
  }
};
