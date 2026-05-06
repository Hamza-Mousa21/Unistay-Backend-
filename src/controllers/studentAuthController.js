import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../models/index.js";

const { User, Student } = db;

/**
 * Register a new student account.
 * Creates a record in Users table, then creates the related Student profile.
 */
export const registerStudent = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      major,
      year_of_study,
      gender,
    } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: "student",
    });

    await Student.create({
      user_id: newUser.user_id,
      major: major || null,
      year_of_study: year_of_study || null,
      gender: gender || null,
    });

    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      user: {
        id: newUser.user_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register Student Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Login student account.
 * Validates credentials, checks student role, and returns JWT token.
 */
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user || user.role !== "student") {
      return res.status(404).json({
        success: false,
        message: "Student account not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Student logged in successfully",
      token,
      user: {
        id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Student Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
