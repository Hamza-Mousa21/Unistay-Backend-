const { Op } = require("sequelize");
const db = require("../models");


const { Residence, ResidenceImage } = db;

const Groq = require("groq-sdk");
const client = new Groq({ apiKey: "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" });

/**
 * ==================================================
 * ADD RESIDENCE
 * ==================================================
 * Creates a new residence for the authenticated owner
 */

const searchResidences = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    /* ================= GET ALL AVAILABLE RESIDENCES ================= */

    const residences = await db.Residence.findAll({
      where: { is_available: true },
      include: [{ model: db.ResidenceImage }],
    });

    /* ================= SEND TO GROQ ================= */

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `
            You are a smart residence search assistant.
            The user is searching for: "${query}"

            Here are the available residences in JSON format:
            ${JSON.stringify(residences, null, 2)}

            Instructions:
            - Read each residence description carefully
            - Return ONLY the residences that match the user's request
            - Match based on description, address, floor_num, rent_price, building_num
            - If nothing matches return an empty array []
            - Return ONLY a valid JSON array, no explanation, no markdown, no extra text
          `,
        },
      ],
    });

    /* ================= PARSE GROQ RESPONSE ================= */

    const raw = response.choices[0].message.content.trim();
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);

    return res.status(200).json({
      success: true,
      residences: result,
    });

  } catch (error) {
    console.error("AI Search Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const addResidence = async (req, res) => {
  try {
    const {
      title,
      description,
      housing_type,
      available_for,
      address,
      neighborhood,
      rent_price,
      distance_from_university,
      floor_num,
      building_num,
      capacity,
      rooms,
      bathrooms,
      wifi,
      parking,
      security,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (
      !title ||
      !housing_type ||
      !available_for ||
      !address ||
      !rent_price ||
      !distance_from_university
    ) {
      return res.status(400).json({
        success: false,
        message:
          "يرجى تعبئة المعلومات الأساسية والعنوان والسعر والمسافة قبل النشر",
      });
    }

    if (Number(rent_price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Rent price must be greater than zero",
      });
    }

    /* ================= GET OWNER ================= */

    const owner = await db.Owner.findOne({
      where: { user_id: req.user.id },
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    /* ================= CREATE RESIDENCE ================= */

    const residence = await Residence.create({
      owner_id: owner.user_id, // ✅ من جدول Owner مش من JWT
      title,
      description: description || null,
      housing_type,
      available_for,
      address,
      neighborhood: neighborhood || null,
      rent_price,
      distance_from_university,
      floor_num: floor_num || null,
      building_num: building_num || null,
      capacity: capacity || null,
      rooms: rooms || null,
      bathrooms: bathrooms || null,
      wifi: wifi === "true" || wifi === true,
      parking: parking === "true" || parking === true,
      security: security === "true" || security === true,
      is_available: true,
    });

    /* ================= SAVE IMAGES ================= */

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file, index) => ({
        image_url: `/uploads/residences/${file.filename}`,
        res_id: residence.res_id,
        is_primary: index === 0,
      }));

      await ResidenceImage.bulkCreate(images);
    }

    /* ================= RESPONSE ================= */

    return res.status(201).json({
      success: true,
      message: "Residence added successfully",
      residence,
    });
  } catch (error) {
    console.error("Add Residence Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * ==================================================
 * GET ALL RESIDENCES
 * ==================================================
 * Returns all available residences with their images
 */


const getAllResidences = async (req, res) => {
  try {
    const { minPrice, maxPrice, maxDistance, wifi, security, parking } = req.query

    const where = { is_available: true }

    // price filter
    if (minPrice && maxPrice) {
      where.rent_price = { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] }
    } else if (minPrice) {
      where.rent_price = { [Op.gte]: parseFloat(minPrice) }
    }

    // distance filter
    if (maxDistance) {
      where.distance_from_university = { [Op.lte]: parseInt(maxDistance) }
    }

    // amenities filter
    if (wifi === "true")     where.wifi = true
    if (security === "true") where.security = true
    if (parking === "true")  where.parking = true

    const residences = await Residence.findAll({
      where,
      include: [
        {
          model: ResidenceImage,
          as: "ResidenceImages",
          attributes: ["image_id", "image_url", "is_primary"],
        },
      ],
      order: [["res_id", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: residences.length,
      residences,
    });
  } catch (error) {
    console.error("Get Residences Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * ==================================================
 * GET SINGLE RESIDENCE
 * ==================================================
 * Returns a single residence by ID
 */

const getResidenceById = async (req, res) => {
  try {
    const { id } = req.params;

    const residence = await Residence.findByPk(id, {
      include: [
        {
          model: ResidenceImage,
          as: "ResidenceImages",
          attributes: ["image_id", "image_url", "is_primary"],
        },
      ],
    });

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: "Residence not found",
      });
    }

    return res.status(200).json({
      success: true,
      residence,
    });
  } catch (error) {
    console.error("Get Residence By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * ==================================================
 * UPDATE RESIDENCE
 * ==================================================
 * Allows owner to update their residence
 */





const updateResidence = async (req, res) => {
  try {
    const { id } = req.params;

    const residence = await Residence.findByPk(id);

    /* ================= CHECK RESIDENCE ================= */

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: "Residence not found",
      });
    }

    /* ================= OWNER CHECK ================= */

    const owner = await db.Owner.findOne({
      where: { user_id: req.user.id },
    });

    if (!owner || residence.owner_id !== owner.user_id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    /* ================= UPDATE ================= */

    await residence.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Residence updated successfully",
      residence,
    });
  } catch (error) {
    console.error("Update Residence Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * ==================================================
 * DELETE RESIDENCE
 * ==================================================
 * Allows owner to delete their residence
 */

const deleteResidence = async (req, res) => {
  try {
    const { id } = req.params;

    const residence = await Residence.findByPk(id);

    /* ================= CHECK RESIDENCE ================= */

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: "Residence not found",
      });
    }

    /* ================= OWNER CHECK ================= */

    const owner = await db.Owner.findOne({
      where: { user_id: req.user.id },
    });

    if (!owner || residence.owner_id !== owner.user_id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    /* ================= DELETE ================= */

    await residence.destroy();

    return res.status(200).json({
      success: true,
      message: "Residence deleted successfully",
    });
  } catch (error) {
    console.error("Delete Residence Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addResidence,
  getAllResidences,
  getResidenceById,
  updateResidence,
  deleteResidence,
  searchResidences
  
};
