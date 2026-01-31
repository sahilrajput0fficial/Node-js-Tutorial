import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.cookies["accessToken"];
  if (!authHeader) {
    return res.status(401).json({ message: "Access Token missing" });
  }
  const token = authHeader;
  if (!token) {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Access Token expired or invalid" });
  }
};
