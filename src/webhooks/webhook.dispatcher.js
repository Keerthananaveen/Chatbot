import crypto from "crypto";
import prisma from "../config/db.js";

export const dispatchWebhook = async (event, payload) => {
  const webhooks = await prisma.webhook.findMany({ where: { event, isActive: true } });

  for (const webhook of webhooks) {
    const signature = crypto.createHmac("sha256", webhook.secret)
      .update(JSON.stringify(payload))
      .digest("hex");

    fetch(webhook.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Event": event, "X-Signature": signature },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }
};
