const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "اسم العقار مطلوب"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "الموقع مطلوب"],
      trim: true,
    },
    rooms: {
      type: Number,
      required: [true, "عدد الغرف مطلوب"],
      min: 1,
    },
    price: {
      type: Number,
      required: [true, "السعر مطلوب"],
      min: 0,
    },
    status: {
      type: String,
      enum: ["نشط", "معلق", "غير نشط"],
      default: "نشط",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    availableRooms: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);