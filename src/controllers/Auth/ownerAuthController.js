import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as db from "../../../models/index.js";

/**
 * ================= REGISTER OWNER =================
 * Creates a new owner account and related owner profile
 */

export const registerOwner = async (req, res) => {

  const transaction = await db.sequelize.transaction();

  try {

    const {
      first_name,
      last_name,
      email,
      password,
      phone_num,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !phone_num
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields must be filled",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    /* ================= CHECK EMAIL ================= */

    const existingUser = await db.User.findOne({
      where: { email },
    });

    if (existingUser) {

      await transaction.rollback();

      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    /* ================= HASH PASSWORD ================= */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    /* ================= CREATE USER ================= */

    const newUser = await db.User.create(
      {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role: "owner",
      },
      { transaction }
    );

    /* ================= CREATE OWNER PROFILE ================= */

    await db.Owner.create(
      {
        user_id: newUser.user_id,
        phone_num,
        verification: false,
      },
      { transaction }
    );

    await transaction.commit();

    /* ================= RESPONSE ================= */

    return res.status(201).json({
      success: true,
      message:
        "Owner registered successfully",

      user: {
        id: newUser.user_id,
        first_name:
          newUser.first_name,
        last_name:
          newUser.last_name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {

    await transaction.rollback();

    console.error(
      "Register Owner Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
};

/**
 * ================= LOGIN OWNER =================
 * Validates owner credentials and returns JWT token
 */

export const loginOwner = async (req, res) => {

  try {

    const { email, password } = req.body;

    /* ================= VALIDATION ================= */

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    /* ================= FIND USER ================= */

    const user = await db.User.findOne({
      where: { email },
    });

    if (!user || user.role !== "owner") {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    /* ================= CHECK PASSWORD ================= */

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    /* ================= GENERATE TOKEN ================= */

    const token = jwt.sign(
      {
        id: user.user_id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:
          process.env.JWT_EXPIRES_IN ||
          "1d",
      }
    );

    /* ================= RESPONSE ================= */

    return res.status(200).json({
      success: true,
      message:
        "Owner logged in successfully",

      token,

      user: {
        id: user.user_id,
        first_name:
          user.first_name,
        last_name:
          user.last_name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(
      "Login Owner Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
};