const express = require("express");
const router = express.Router();
const {
  getOwners, getOwner, createOwner, updateOwner, deleteOwner, loginOwner,
} = require("../controllers/ownerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", loginOwner);

router.route("/")
  .get(protect, getOwners)
  .post(protect, createOwner);

router.route("/:id")
  .get(protect, getOwner)
  .put(protect, updateOwner)
  .delete(protect, deleteOwner);

module.exports = router;