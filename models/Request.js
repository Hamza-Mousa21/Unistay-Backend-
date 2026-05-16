const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    type: {
      type: String,
      enum: ["new", "review"],
      default: "new",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
      trim: true,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    resolvedBy: {
      type: String, // admin ID or name
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);