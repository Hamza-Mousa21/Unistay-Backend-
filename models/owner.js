const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "الاسم مطلوب"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "البريد الإلكتروني مطلوب"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "كلمة المرور مطلوبة"],
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      required: [true, "رقم الهاتف مطلوب"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["نشط", "معلق", "محظور"],
      default: "نشط",
    },
    totalIncome: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Hash password before saving
ownerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
ownerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual: count of properties
ownerSchema.virtual("propertiesCount", {
  ref: "Property",
  localField: "_id",
  foreignField: "owner",
  count: true,
});

module.exports = mongoose.model("Owner", ownerSchema);