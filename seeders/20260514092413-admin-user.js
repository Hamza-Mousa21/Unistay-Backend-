require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const admins = [
  {
    name: "Bara Shurab",
    email: "bara@unistay.com",
    password: "admin123",
  },
  {
    name: "Super Admin",
    email: "admin@unistay.com",
    password: "admin123",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing admins
    await Admin.deleteMany({});
    console.log("🗑️  Cleared existing admins");

    // Insert new admins (password hashing handled by pre-save hook)
    for (const adminData of admins) {
      await Admin.create(adminData);
      console.log(`✔️  Created admin: ${adminData.email}`);
    }

    console.log("🎉 Admin seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit();
  }
};

seed();