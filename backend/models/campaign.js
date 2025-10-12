const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: "Active" },
  budget: { type: Number },
  createdAt: { type: Date, default: Date.now },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 new
});

module.exports = mongoose.model("Campaign", campaignSchema);
