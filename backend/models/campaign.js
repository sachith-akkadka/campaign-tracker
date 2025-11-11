// backend/models/campaign.js
const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  clientName: { type: String, required: true },
  startDate: { type: Date, required: true },
  status: { type: String, default: "Active" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Campaign", campaignSchema);
