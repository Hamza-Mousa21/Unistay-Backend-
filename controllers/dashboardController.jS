const Owner = require("../models/Owner");
const Property = require("../models/Property");
const Student = require("../models/Student");
const Request = require("../models/Request");

// GET /api/dashboard/stats
const getStats = async (req, res) => {
  try {
    const [totalProperties, totalStudents, totalOwners, newRequests] =
      await Promise.all([
        Property.countDocuments(),
        Student.countDocuments(),
        Owner.countDocuments(),
        Request.countDocuments({ status: "pending" }),
      ]);

    res.json({
      success: true,
      data: {
        totalProperties,
        totalStudents,
        totalOwners,
        newRequests,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/dashboard/charts
const getCharts = async (req, res) => {
  try {
    const now = new Date();
    const months = [];

    // Build last 12 months labels
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
    }

    // Properties per month (cumulative)
    const propertiesData = await Promise.all(
      months.map(async ({ year, month }) => {
        const count = await Property.countDocuments({
          createdAt: { $lte: new Date(year, month, 0) },
        });
        return { year, month, value: count };
      })
    );

    // Requests per month
    const requestsData = await Promise.all(
      months.map(async ({ year, month }) => {
        const count = await Request.countDocuments({
          createdAt: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1),
          },
        });
        return { year, month, value: count };
      })
    );

    // Students & Owners per month (cumulative)
    const usersData = await Promise.all(
      months.map(async ({ year, month }) => {
        const [students, owners] = await Promise.all([
          Student.countDocuments({
            createdAt: { $lte: new Date(year, month, 0) },
          }),
          Owner.countDocuments({
            createdAt: { $lte: new Date(year, month, 0) },
          }),
        ]);
        return { year, month, students, owners };
      })
    );

    res.json({
      success: true,
      data: { propertiesData, requestsData, usersData },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getStats, getCharts };