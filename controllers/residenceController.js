const db = require("../models");

const { Residence, ResidenceImage } = db;

/**
 * ==================================================
 * ADD RESIDENCE
 * ==================================================
 * Creates a new residence for the authenticated owner
 */

const addResidence = async (req, res) => {
  try {
    const { description, floor_num, address, rent_price, building_num } =
      req.body;

    /* ================= VALIDATION ================= */

    if (!address || !rent_price) {
      return res.status(400).json({
        success: false,

        message: "Address and rent price are required",
      });
    }

    if (Number(rent_price) <= 0) {
      return res.status(400).json({
        success: false,

        message: "Rent price must be greater than zero",
      });
    }

    /* ================= CREATE RESIDENCE ================= */

    const residence = await Residence.create({
      description: description || null,

      is_available: true,

      floor_num: floor_num || null,

      address,

      rent_price,

      building_num: building_num || null,

      owner_id: req.user.id,
    });

    /* ================= SAVE IMAGES ================= */

    // if (req.files && req.files.length > 0) {
    //   const images = req.files.map((file) => ({
    //     image_url: `/uploads/residences/${file.filename}`,

    //     res_id: residence.res_id,
    //   }));

    //   await ResidenceImage.bulkCreate(images);
    // }

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
 * Returns all available residences
 */

const getAllResidences = async (req, res) => {
  try {
    const residences = await Residence.findAll(
      
      {
      include: [
        {
          model:ResidenceImage
          
        },
      ],
    }
  
  );

    return res.status(200).json({
      success: true,

      residences,
    });
  } catch (error) {
    console.error("Get Residences Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal server error",
    })
  }
};

/**
 * ==================================================
 * UPDATE RESIDENCE
 * ==================================================
 * Allows owner to update their residence
 */

const getResidenceById = async (req, res) => {
  try {
    const { id } = req.params;

    const residence = await Residence.findByPk(id, {
      include: [{ model: ResidenceImage },
        { model: db.Rating }
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
    console.error("Get Residence By Id Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




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

    if (residence.owner_id !== req.user.id) {
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

    if (residence.owner_id !== req.user.id) {
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
  updateResidence,
  deleteResidence,
  getResidenceById
  
};
