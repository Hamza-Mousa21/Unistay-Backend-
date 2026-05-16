const express = require("express");
const router = express.Router();
const {
  getStudents, getStudent, createStudent, updateStudent, deleteStudent, loginStudent,
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", loginStudent);

router.route("/")
  .get(protect, getStudents)
  .post(protect, createStudent);

router.route("/:id")
  .get(protect, getStudent)
  .put(protect, updateStudent)
  .delete(protect, deleteStudent);

module.exports = router;