const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const wishlistController = require("../controllers/wishlistController");

router.get(
  "/",
  protect,
  authorizeRoles("student"),
  wishlistController.getAllWishedList,
);
router.get(
  "/:res_id",
  protect,
  authorizeRoles("student"),
  wishlistController.getWishlistByResId,
);
router.post(
  "/:res_id",
  protect,
  authorizeRoles("student"),
  wishlistController.addToWishlist,
);
router.delete(
  "/:res_id",
  protect,
  authorizeRoles("student"),
  wishlistController.removeFromWishlist,
);

module.exports = router;
