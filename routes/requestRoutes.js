const express = require("express");
const router = express.Router();
const {
  getRequests, getRequest, createRequest, acceptRequest, rejectRequest, deleteRequest,
} = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(protect, getRequests)
  .post(protect, createRequest);

router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);

router.route("/:id")
  .get(protect, getRequest)
  .delete(protect, deleteRequest);

module.exports = router;