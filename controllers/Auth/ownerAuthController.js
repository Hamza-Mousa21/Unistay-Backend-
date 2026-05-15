const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const db = require("../../models");

/**
 * ==================================================
 * REGISTER OWNER
 * ==================================================
 * Creates a new owner account and owner profile
 */

const registerOwner = async (req, res) => {

  let transaction;

  try {

    transaction =
      await db.sequelize.transaction();

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

        message:
          "Invalid email format",
      });

    }

    if (password.length < 6) {

      return res.status(400).json({
        success: false,

        message:
          "Password must be at least 6 characters",
      });

    }

    /* ================= CHECK EXISTING EMAIL ================= */

    const existingUser =
      await db.User.findOne({
        where: { email },
      });

    if (existingUser) {

      await transaction.rollback();

      return res.status(409).json({
        success: false,

        message:
          "Email already exists",
      });

    }

    /* ================= HASH PASSWORD ================= */

    const hashedPassword =
      await bcrypt.hash(password, 10);

    /* ================= CREATE USER ================= */

    const newUser =
      await db.User.create(
        {
          first_name,
          last_name,
          email,
          password:
            hashedPassword,
          role: "owner",
        },

        { transaction },
      );

    /* ================= CREATE OWNER PROFILE ================= */

    await db.Owner.create(
      {
        user_id:
          newUser.user_id,

        phone_num,

        verification: false,
      },

      { transaction },
    );

    /* ================= SAVE TRANSACTION ================= */

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

        email:
          newUser.email,

        role:
          newUser.role,
      },
    });

  } catch (error) {

    if (transaction) {
      await transaction.rollback();
    }

    console.error(
      "Register Owner Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message,
    });

  }
};

/**
 * ==================================================
 * LOGIN OWNER
 * ==================================================
 * Validates owner credentials and returns JWT token
 */

const loginOwner = async (req, res) => {

  try {

    const { email, password } =
      req.body;

    /* ================= VALIDATION ================= */

    if (!email || !password) {

      return res.status(400).json({
        success: false,

        message:
          "Email and password are required",
      });

    }

    /* ================= FIND USER ================= */

    const user =
      await db.User.findOne({
        where: { email },
      });

    if (
      !user ||
      user.role !== "owner"
    ) {

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

    /* ================= GENERATE JWT TOKEN ================= */

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
      },
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

        email:
          user.email,

        role:
          user.role,
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

/**
 * ==================================================
 * GET OWNER PROFILE
 * ==================================================
 * Returns logged in owner profile
 */

const getOwnerProfile = async (
  req,
  res
) => {

  try {

    const owner =
      await db.Owner.findOne({
        where: {
          user_id: req.user.id,
        },

        include: [
          {
            model: db.User,

            attributes: [
              "user_id",
              "first_name",
              "last_name",
              "email",
              "role",
            ],
          },
        ],
      });

    if (!owner) {

      return res.status(404).json({
        success: false,

        message:
          "Owner not found",
      });

    }

    return res.status(200).json({
      success: true,

      owner,
    });

  } catch (error) {

    console.error(
      "Get Owner Profile Error:",
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
 * ==================================================
 * UPDATE OWNER PROFILE
 * ==================================================
 * Updates logged in owner profile
 */

const updateOwnerProfile = async (
  req,
  res
) => {

  try {

    const {
      first_name,
      last_name,
      phone_num,
    } = req.body;

    const user =
      await db.User.findByPk(
        req.user.id
      );

    const owner =
      await db.Owner.findOne({
        where: {
          user_id: req.user.id,
        },
      });

    if (!user || !owner) {

      return res.status(404).json({
        success: false,

        message:
          "Owner not found",
      });

    }

    /* ================= UPDATE USER ================= */

    await user.update({
      first_name:
        first_name ||
        user.first_name,

      last_name:
        last_name ||
        user.last_name,
    });

    /* ================= UPDATE OWNER ================= */

    await owner.update({
      phone_num:
        phone_num ||
        owner.phone_num,
    });

    return res.status(200).json({
      success: true,

      message:
        "Owner profile updated successfully",
    });

  } catch (error) {

    console.error(
      "Update Owner Error:",
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
 * ==================================================
 * DELETE OWNER PROFILE
 * ==================================================
 * Deletes logged in owner account
 */

const deleteOwnerProfile = async (
  req,
  res
) => {

  try {

    const user =
      await db.User.findByPk(
        req.user.id
      );

    if (!user) {

      return res.status(404).json({
        success: false,

        message:
          "Owner not found",
      });

    }

    await user.destroy();

    return res.status(200).json({
      success: true,

      message:
        "Owner account deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete Owner Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Internal server error",
    });

  }
};


const getOwnerContactInfo = async (req, res) => {
  try {
    const { owner_id } = req.params;

    const owner = await db.Owner.findOne({
      where: { user_id: owner_id },
      attributes: ["phone_num"],
      include: [
        {
          model: db.User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    return res.status(200).json({
      success: true,
      phone_num: owner.phone_num,
      first_name: owner.User.first_name,
      last_name: owner.User.last_name,
    });

  } catch (error) {
    console.error("Get Owner Contact Info Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {
  registerOwner,
  loginOwner,
  getOwnerProfile,
  updateOwnerProfile,
  deleteOwnerProfile,
  getOwnerContactInfo
};