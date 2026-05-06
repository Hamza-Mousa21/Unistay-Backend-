import express from "express";

import { addResidence } from "../controllers/residenceController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

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

export default router;