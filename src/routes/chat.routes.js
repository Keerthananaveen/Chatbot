import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  startChat,
  sendMessage,
  endChat,
  history
} from "../controllers/chat.controller.js";

const router = express.Router();
router.post("/start", auth, startChat);
router.post("/query", auth, sendMessage);
router.post("/end", auth, endChat);
router.get("/history", auth, history);
export default router;
