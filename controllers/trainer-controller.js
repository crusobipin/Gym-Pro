const Trainer = require("../models/trainer");
const User = require("../models/user");
const Gym = require("../models/gym-schema");

// for trainer register
const addTrainer = async (req, res) => {
  try {
    const { name, startTime, endTime, type, experience,phone,email } = req.body;
    const trainer = await Trainer.create({ name, startTime, endTime, type, experience,phone,email, gym:req.user.gymId });
    res.status(201).json({ message: "Trainer added successfully", trainer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding trainer" });
  }
};
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({ gym:req.user.gymId });
    if (!trainers) return res.status(404).json({ message: "No trainers found" });
    res.status(200).json(trainers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting trainers" });
  }
};
const getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findById(id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json(trainer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting trainer" });
  }
};
const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findByIdAndDelete(id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting trainer" });
  }
};
const editTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startTime, endTime, type, experience,phone,email } = req.body;
    const trainer = await Trainer.findByIdAndUpdate(id, { name, startTime, endTime, type, experience,phone,email });
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json({ message: "Trainer updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing trainer" });
  }
};

module.exports = { addTrainer, getTrainers, getTrainerById, deleteTrainer, editTrainer };
