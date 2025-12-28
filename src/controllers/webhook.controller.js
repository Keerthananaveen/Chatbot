import prisma from "../config/db.js";

export const createWebhook = async (req, res, next) => {
  try {
    const { url, event, secret } = req.body;
    const webhook = await prisma.webhook.create({ data: { url, event, secret } });
    res.status(201).json({ success: true, webhook });
  } catch (err) { next(err); }
};

export const listWebhooks = async (req, res, next) => {
  try {
    const webhooks = await prisma.webhook.findMany();
    res.json({ success: true, webhooks });
  } catch (err) { next(err); }
};

export const deleteWebhook = async (req, res, next) => {
  try {
    await prisma.webhook.delete({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) { next(err); }
};
