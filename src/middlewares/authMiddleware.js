const jwt = require("jsonwebtoken");

/**
 * ==================================================
 * AUTHENTICATION MIDDLEWARE
 * ==================================================
 * Verifies JWT token and allows only authenticated users.
 */

const protect = (req, res, next) => {
  try {
    /* ================= GET TOKEN ================= */

    const authHeader = req.headers.authorization;

    /* ================= CHECK TOKEN EXISTS ================= */

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    /* ================= EXTRACT TOKEN ================= */

    const token = authHeader.split(" ")[1];

    /* ================= VERIFY TOKEN ================= */

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ================= STORE USER DATA ================= */

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/**
 * ==================================================
 * AUTHORIZATION MIDDLEWARE
 * ==================================================
 * Allows access only to specific user roles.
 *
 * Example:
 * authorizeRoles("student")
 * authorizeRoles("owner")
 * authorizeRoles("admin")
 */

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    /* ================= CHECK USER ROLE ================= */

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this route",
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
