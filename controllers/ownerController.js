const Owner = require("../models/Owner");
const Property = require("../models/Property");
const { generateToken } = require("../middleware/authMiddleware");

// GET /api/owners
const getOwners = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;

    const total = await Owner.countDocuments(query);
    const owners = await Owner.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    // Attach property count for each owner
    const ownersWithCount = await Promise.all(
      owners.map(async (o) => {
        const propertiesCount = await Property.countDocuments({ owner: o._id });
        return { ...o.toObject(), propertiesCount };
      })
    );

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: ownersWithCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/owners/:id
const getOwner = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner)
      return res.status(404).json({ success: false, message: "المالك غير موجود" });

    const properties = await Property.find({ owner: owner._id });
    res.json({ success: true, data: { ...owner.toObject(), properties } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/owners
const createOwner = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await Owner.findOne({ email });
    if (exists)
      return res.status(400).json({ success: false, message: "البريد الإلكتروني مستخدم مسبقاً" });

    const owner = await Owner.create({ name, email, password, phone });
    res.status(201).json({ success: true, data: owner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/owners/:id
const updateOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!owner)
      return res.status(404).json({ success: false, message: "المالك غير موجود" });

    res.json({ success: true, data: owner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/owners/:id
const deleteOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    if (!owner)
      return res.status(404).json({ success: false, message: "المالك غير موجود" });

    res.json({ success: true, message: "تم حذف المالك بنجاح" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/owners/login
const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await Owner.findOne({ email }).select("+password");

    if (!owner || !(await owner.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "بيانات الدخول غير صحيحة" });
    }
    if (owner.status === "محظور") {
      return res.status(403).json({ success: false, message: "تم حظر هذا الحساب" });
    }

    res.json({
      success: true,
      token: generateToken(owner._id),
      data: owner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getOwners, getOwner, createOwner, updateOwner, deleteOwner, loginOwner };