import express from "express";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/webhooks", webhookRoutes);

app.use(errorHandler);
export default app;
