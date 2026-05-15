const express = require("express");

const {
  addResidence,
  getAllResidences,
  getResidenceById,
  updateResidence,
  deleteResidence,
 
  searchResidences
} = require("../controllers/residenceController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

/**
 * ==================================================
 * RESIDENCE ROUTES
 * ==================================================
 * POST   /add      -> Add new residence (owner only)
 * GET    /         -> Get all residences (public)
 * GET    /:id      -> Get single residence (public)
 * PUT    /:id      -> Update residence (owner only)
 * DELETE /:id      -> Delete residence (owner only)
 * ==================================================
 */

/* ================= GET ALL RESIDENCES ================= */

router.get("/", getAllResidences);

/* ================= GET SINGLE RESIDENCE ================= */

router.get("/:id", getResidenceById);

/* ================= ADD RESIDENCE ================= */

router.post(
  "/add",
  protect,
  authorizeRoles("owner"),
  upload.array("images", 5),
  addResidence,
);

router.post("/search", searchResidences)

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

router.put("/:id", protect, authorizeRoles("owner"), updateResidence);

/* ================= DELETE RESIDENCE ================= */

router.delete("/:id", protect, authorizeRoles("owner"), deleteResidence);

module.exports = router;
