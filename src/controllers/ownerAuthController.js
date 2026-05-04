import bcrypt from "bcrypt";
import * as db from "../../models/index.js";

export const registerOwner = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_num } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const existingUser = await db.User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: "owner",
    });

    await db.Owner.create({
      user_id: newUser.user_id,
      phone_num: phone_num || null,
      verification: false,
    });

    return res.status(201).json({
      success: true,
      message: "Owner registered successfully",
      user: {
        id: newUser.user_id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register Owner Error:", error.message, error.stack);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await db.User.findOne({
      where: { email },
    });

    if (!user || user.role !== "owner") {
      return res.status(404).json({
        success: false,
        message: "Owner account not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Owner logged in successfully",
      user: {
        id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Owner Error:", error.message, error.stack);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
