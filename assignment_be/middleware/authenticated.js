const jwt = require("jsonwebtoken");
const Member = require("../models/memberModel");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      req.user = null; // No user logged in
      return next(); // Allow access if no token
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const member = await Member.findById(decoded.memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    req.user = member;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Authentication error", error: err.message });
  }
};

const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = { authenticate, requireAuth, requireAdmin };
