import db from "../../models/index.js";

const { Residence, ResidenceImage } = db;

/**
 * Add a new residence.
 * Only authenticated owners can add residences.
 * The owner_id is taken from the JWT token, not from the request body.
 */
export const addResidence = async (req, res) => {
  try {
    const { description, floor_num, address, rent_price, building_num } =
      req.body;

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

    const residence = await Residence.create({
      description: description || null,
      is_available: true,
      floor_num: floor_num || null,
      address,
      rent_price,
      building_num: building_num || null,
      owner_id: req.user.id,
    });

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        image_url: `/uploads/residences/${file.filename}`,
        res_id: residence.res_id,
      }));

      await ResidenceImage.bulkCreate(images);
    }

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