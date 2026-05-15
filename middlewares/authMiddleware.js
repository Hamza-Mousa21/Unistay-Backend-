const jwt = require("jsonwebtoken");

/**
 * ==================================================
 * AUTHENTICATION MIDDLEWARE
 * ==================================================
 * Verifies JWT token and allows only authenticated users
 */

const protect = async (req, res, next) => {
  try {
    let token;

    /* ================= GET TOKEN ================= */

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    /* ================= CHECK TOKEN ================= */

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    /* ================= VERIFY TOKEN ================= */

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ================= STORE USER ================= */

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};

/**
 * ==================================================
 * ROLE AUTHORIZATION
 * ==================================================
 * Restricts access based on user role
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
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
