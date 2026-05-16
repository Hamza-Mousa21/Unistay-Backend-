const Request = require("../models/Request");

// GET /api/requests
const getRequests = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;

    const total = await Request.countDocuments(query);
    const requests = await Request.find(query)
      .populate("student", "name email university")
      .populate("property", "name location")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/requests/:id
const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("student", "name email university")
      .populate("property", "name location price");

    if (!request)
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });

    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/requests
const createRequest = async (req, res) => {
  try {
    const { student, property, message } = req.body;

    // Check for duplicate pending request
    const existing = await Request.findOne({ student, property, status: "pending" });
    if (existing)
      return res.status(400).json({ success: false, message: "يوجد طلب معلق بالفعل لهذا العقار" });

    const request = await Request.create({ student, property, message });
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/requests/:id/accept
const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "accepted", resolvedAt: new Date(), resolvedBy: req.admin?.name || "Admin" },
      { new: true }
    );
    if (!request)
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });

    res.json({ success: true, message: "تم قبول الطلب", data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/requests/:id/reject
const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", resolvedAt: new Date(), resolvedBy: req.admin?.name || "Admin" },
      { new: true }
    );
    if (!request)
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });

    res.json({ success: true, message: "تم رفض الطلب", data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/requests/:id
const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request)
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });

    res.json({ success: true, message: "تم حذف الطلب بنجاح" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getRequests, getRequest, createRequest, acceptRequest, rejectRequest, deleteRequest };