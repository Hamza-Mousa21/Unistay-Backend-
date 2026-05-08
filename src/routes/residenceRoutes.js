const express = require("express");

const { addResidence } = require("../controllers/residenceController");
const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Residence Routes
|--------------------------------------------------------------------------
| POST /add -> Add a new residence
| Only authenticated owners can add residences.
|--------------------------------------------------------------------------
*/

router.post(
  "/add",
  protect,
  authorizeRoles("owner"),
  upload.array("images", 5),
  addResidence
);

module.exports = router;