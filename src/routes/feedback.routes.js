import express from "express";
import auth from "../middleware/auth.middleware.js";
import { submitFeedback } from "../controllers/feedback.controller.js";

const router = express.Router();
router.post("/", auth, submitFeedback);
export default router;
