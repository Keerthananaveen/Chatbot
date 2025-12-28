// src/controllers/chat.controller.js
import prisma from "../config/db.js";
import * as botService from "../services/chatbot.service.js";
import { dispatchWebhook } from "../webhooks/webhook.dispatcher.js";
import { EVENTS } from "../webhooks/webhook.event.js";

export const startChat = async (req, res, next) => {
  try {
    const chat = await prisma.chat.create({ data: { userId: req.user.userId } });
    dispatchWebhook(EVENTS.CHAT_STARTED, { chatId: chat.id });

    res.json({
      success: true,
      message: botService.chatStartedMessage(),
      chatId: chat.id
    });
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { chatId, message } = req.body;

    await prisma.message.create({ data: { chatId, sender: "USER", content: message } });
    dispatchWebhook(EVENTS.MESSAGE_SENT, { chatId, message });

    const typing = botService.typingIndicator();
    let reply;
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("hello")) {
      reply = botService.userGreeting(req.user.username);
    } else if (lowerMsg.includes("support")) {
      reply = botService.escalateToHuman();
    } else if (lowerMsg.includes("thanks") || lowerMsg.includes("thank you")) {
      reply = botService.thankUser();
    } else if (lowerMsg.includes("end")) {
      reply = botService.endChatMessage();
    } else if (lowerMsg.includes("faq")) {
      reply = botService.faqResponse(message);
    } else {
      reply = botService.invalidInputMessage();
    }
    await prisma.message.create({ data: { chatId, sender: "BOT", content: reply } });

    res.json({
      success: true,
      typing,
      reply
    });
  } catch (err) {
    next(err);
  }
};

export const endChat = async (req, res, next) => {
  try {
    const { chatId } = req.body;
    await prisma.chat.update({ where: { id: chatId }, data: { status: "ENDED" } });
    dispatchWebhook(EVENTS.CHAT_ENDED, { chatId });

    res.json({
      success: true,
      message: botService.chatEndedMessage()
    });
  } catch (err) {
    next(err);
  }
};

export const history = async (req, res, next) => {
  try {
    const chats = await prisma.chat.findMany({
      where: { userId: req.user.userId },
      include: { messages: true }
    });

    const summaries = chats.map((chat) => ({
      chatId: chat.id,
      summary: botService.chatHistorySummary(chat.id),
      messages: chat.messages
    }));

    res.json({ success: true, chats: summaries });
  } catch (err) {
    next(err);
  }
};
