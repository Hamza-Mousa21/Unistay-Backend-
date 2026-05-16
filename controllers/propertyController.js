const Property = require("../models/Property");

// GET /api/properties
const getProperties = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;

    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .populate("owner", "name phone email")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/properties/:id
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name phone email"
    );
    if (!property)
      return res.status(404).json({ success: false, message: "العقار غير موجود" });

    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/properties
const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/properties/:id
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!property)
      return res.status(404).json({ success: false, message: "العقار غير موجود" });

    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/properties/:id
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property)
      return res.status(404).json({ success: false, message: "العقار غير موجود" });

    res.json({ success: true, message: "تم حذف العقار بنجاح" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProperties, getProperty, createProperty, updateProperty, deleteProperty };