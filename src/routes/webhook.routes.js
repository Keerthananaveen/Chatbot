import express from "express";
import auth from "../middleware/auth.middleware.js";
import prisma from "../config/db.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { url, event, secret } = req.body;
  const webhook = await prisma.webhook.create({
    data: { url, event, secret }
  });
  res.status(201).json(webhook);
});

router.get("/", auth, async (_, res) => {
  const webhooks = await prisma.webhook.findMany();
  res.json(webhooks);
});

router.delete("/:id", auth, async (req, res) => {
  await prisma.webhook.delete({ where: { id: req.params.id } });
  res.sendStatus(204);
});

export default router;
