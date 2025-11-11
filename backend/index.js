require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const campaignsRouter = require("./routes/campaigns");

const app = express();
app.use(cors({ origin: "*", methods: ["GET","POST","PUT","DELETE"] }));
app.use(express.json());

app.use("/api/campaigns", campaignsRouter);
app.get("/", (req,res)=>res.send("✅ Campaign Tracker Backend is running!"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch(err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`)));
