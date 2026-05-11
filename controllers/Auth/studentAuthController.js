const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../../models");

const { User, Student } = db;

/**
 * ================= REGISTER STUDENT =================
 * Creates a new user account and related student profile
 */

const registerStudent = async (req, res) => {
  const transaction = await db.sequelize.transaction();

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

    /* ================= VALIDATION ================= */

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        success: false,

        message: "First name, last name, email, and password are required",
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

        message: "Password must be at least 6 characters",
      });
    }

    /* ================= CHECK EMAIL ================= */

    const existingUser = await User.findOne({
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

    const hashedPassword = await bcrypt.hash(password, 10);

    /* ================= CREATE USER ================= */

    const newUser = await User.create(
      {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role: "student",
      },

      { transaction },
    );

    /* ================= CREATE STUDENT PROFILE ================= */

    await Student.create(
      {
        user_id: newUser.user_id,

        major: major || null,

        year_of_study: year_of_study || null,

        gender: gender || null,
      },

      { transaction },
    );

    await transaction.commit();

    /* ================= RESPONSE ================= */

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
    await transaction.rollback();

    console.error("Register Student Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal server error",
    });
  }
};

/**
 * ================= LOGIN STUDENT =================
 * Validates student credentials and returns JWT token
 */

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* ================= VALIDATION ================= */

    if (!email || !password) {
      return res.status(400).json({
        success: false,

        message: "Email and password are required",
      });
    }

    /* ================= FIND USER ================= */

    const user = await User.findOne({
      where: { email },
    });

    if (!user || user.role !== "student") {
      return res.status(401).json({
        success: false,

        message: "Invalid email or password",
      });
    }

    /* ================= CHECK PASSWORD ================= */

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,

        message: "Invalid email or password",
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
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    );

    /* ================= RESPONSE ================= */

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

/**
 * ================= GET STUDENT PROFILE =================
 * Returns logged in student profile
 */

const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: {
        user_id: req.user.id,
      },

      include: [
        {
          model: User,

          attributes: ["user_id", "first_name", "last_name", "email", "role"],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        success: false,

        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,

      student,
    });
  } catch (error) {
    console.error("Get Student Profile Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal server error",
    });
  }
};

/**
 * ================= UPDATE STUDENT PROFILE =================
 * Updates logged in student profile
 */

const updateStudentProfile = async (req, res) => {
  try {
    const { first_name, last_name, major, year_of_study, gender } = req.body;

    const user = await User.findByPk(req.user.id);

    const student = await Student.findOne({
      where: {
        user_id: req.user.id,
      },
    });

    if (!user || !student) {
      return res.status(404).json({
        success: false,

        message: "Student not found",
      });
    }

    /* ================= UPDATE USER ================= */

    await user.update({
      first_name: first_name || user.first_name,

      last_name: last_name || user.last_name,
    });

    /* ================= UPDATE STUDENT ================= */

    await student.update({
      major: major || student.major,

      year_of_study: year_of_study || student.year_of_study,

      gender: gender || student.gender,
    });

    return res.status(200).json({
      success: true,

      message: "Student profile updated successfully",
    });
  } catch (error) {
    console.error("Update Student Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal server error",
    });
  }
};

/**
 * ================= DELETE STUDENT PROFILE =================
 * Deletes logged in student account
 */

const deleteStudentProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "Student not found",
      });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,

      message: "Student account deleted successfully",
    });
  } catch (error) {
    console.error("Delete Student Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal server error",
    });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
};
