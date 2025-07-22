const Equipment = require("../models/equipment");
const Gym = require("../models/gym-schema");

const addEquipment = async (req, res) => {
  try {
    const { name, type, brand, model, purchaseDate, condition, lastMaintenance, location } = req.body;
    const equipment = await Equipment.create({ name, type, brand, model, purchaseDate, condition, lastMaintenance, location, gym:req.user.gymId });
    res.status(201).json({ message: "Equipment added successfully", equipment });
  } catch (error) {
    console.error(error);   
    res.status(500).json({ message: "Error adding equipment" });
  }
};
const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find({ gym:req.user.gymId });
    if (!equipment) return res.status(404).json({ message: "No equipment found" });
    res.status(200).json(equipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting equipment" });
  }
};
const getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findById(id);
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });
    res.status(200).json(equipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting equipment" });
  }
};
const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findByIdAndDelete(id);
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });
    res.status(200).json({ message: "Equipment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting equipment" });
  }
};
const editEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, brand, model, purchaseDate, condition, lastMaintenance, location } = req.body;
    const equipment = await Equipment.findByIdAndUpdate(id, { name, type, brand, model, purchaseDate, condition, lastMaintenance, location, gym:req.user.gymId });
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });
    res.status(200).json({ message: "Equipment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing equipment" });
  }
};
module.exports = { addEquipment, getEquipment, getEquipmentById, deleteEquipment, editEquipment };