import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ success: false, error: "Authorization required" });

  try {
    req.user = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ success: false, error: "Invalid or expired token" });
  }
};
