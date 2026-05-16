const Student = require("../models/Student");
const { generateToken } = require("../middleware/authMiddleware");

// GET /api/students
const getStudents = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { university: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;

    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .populate("property", "name location")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: students,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/students/:id
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "property",
      "name location price"
    );
    if (!student)
      return res.status(404).json({ success: false, message: "الطالب غير موجود" });

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/students
const createStudent = async (req, res) => {
  try {
    const { name, email, password, university } = req.body;

    const exists = await Student.findOne({ email });
    if (exists)
      return res.status(400).json({ success: false, message: "البريد الإلكتروني مستخدم مسبقاً" });

    const student = await Student.create({ name, email, password, university });
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student)
      return res.status(404).json({ success: false, message: "الطالب غير موجود" });

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, message: "الطالب غير موجود" });

    res.json({ success: true, message: "تم حذف الطالب بنجاح" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/students/login
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email }).select("+password");

    if (!student || !(await student.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "بيانات الدخول غير صحيحة" });
    }
    if (student.status === "محظور") {
      return res.status(403).json({ success: false, message: "تم حظر هذا الحساب" });
    }

    res.json({
      success: true,
      token: generateToken(student._id),
      data: student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent, loginStudent };