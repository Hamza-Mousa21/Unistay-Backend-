const jwt = require("jsonwebtoken");

/**
 * ==================================================
<<<<<<< HEAD
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
=======
 * PROTECT MIDDLEWARE
 * ==================================================
 * Verifies JWT token
 */

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,

        message: "Not authorized, no token",
>>>>>>> Sewar-Backend
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

<<<<<<< HEAD
    /* ================= STORE USER DATA ================= */

=======
>>>>>>> Sewar-Backend
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
<<<<<<< HEAD
      message: "Invalid or expired token",
=======

      message: "Not authorized, invalid token",
>>>>>>> Sewar-Backend
    });
  }
};

/**
 * ==================================================
<<<<<<< HEAD
 * AUTHORIZATION MIDDLEWARE
 * ==================================================
 * Allows access only to specific user roles.
 *
 * Example:
 * authorizeRoles("student")
 * authorizeRoles("owner")
 * authorizeRoles("admin")
=======
 * ROLE AUTHORIZATION
 * ==================================================
 * Restricts access based on user role
>>>>>>> Sewar-Backend
 */

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
<<<<<<< HEAD
    /* ================= CHECK USER ROLE ================= */

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this route",
=======
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,

        message: "Access denied",
>>>>>>> Sewar-Backend
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
