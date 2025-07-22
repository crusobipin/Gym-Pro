const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema(
  {
    gym_name: {
      type: String,
      required: true,
      trim: true,
    },
    gym_address: {
      type: String,
      required: true,
      trim: true,
    },
    gym_contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin/owner of the gym
      required: true,
    },
    openingHours: {
      type: String, // e.g., "6:00 AM - 10:00 PM"
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gym", GymSchema);
