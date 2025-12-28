import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import { validatePassword } from "../utils/validatePassword.js";
import { dispatchWebhook } from "../webhooks/webhook.dispatcher.js";
import { EVENTS } from "../webhooks/webhook.event.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const errors = validatePassword(password);
    if (errors.length) return res.status(400).json({ success: false, errors });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ success: false, error: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { username, email, password: hashed, role } });

    dispatchWebhook(EVENTS.USER_REGISTERED, { userId: user.id, email: user.email });

    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ success: false, error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, error: "Invalid email or password" });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};
