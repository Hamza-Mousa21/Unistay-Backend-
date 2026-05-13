const express = require("express");

const {
  addResidence,
  getAllResidences,
  updateResidence,
  deleteResidence,
  getResidenceById
} = require("../controllers/residenceController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

/**
 * ==================================================
 * RESIDENCE ROUTES
 * ==================================================
 * POST   /add      -> Add new residence
 * GET    /         -> Get all residences
 * PUT    /:id      -> Update residence
 * DELETE /:id      -> Delete residence
 * ==================================================
 */

/* ================= ADD RESIDENCE ================= */

router.post(
  "/add",

  protect,

  authorizeRoles("owner"),

  upload.array("images", 5),

  addResidence,
);

/* ================= GET ALL RESIDENCES ================= */

router.get(
  "/",

  getAllResidences,
);



router.get(
  "/:id",
  getResidenceById,
)

/* ================= UPDATE RESIDENCE ================= */

router.put(
  "/:id",

  protect,

  authorizeRoles("owner"),

  updateResidence,
);

/* ================= DELETE RESIDENCE ================= */

router.delete(
  "/:id",

  protect,

  authorizeRoles("owner"),

  deleteResidence,
);

module.exports = router;
