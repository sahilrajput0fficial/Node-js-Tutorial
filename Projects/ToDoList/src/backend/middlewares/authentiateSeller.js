export function authenticateSeller(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }
  const { role } = req.user;
  const allowedRoles = ["seller", "admin", "staff"];
  if (!allowedRoles.includes(role) || !req.user.sellerId) {
    return res.status(403).json({
      message: "Access denied. Seller-only resource.",
    });
  }
  req.sellerId = req.user.sellerId;
  next();
}