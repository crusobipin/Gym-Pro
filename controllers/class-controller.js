const Class = require("../models/gymClass");
const Gym = require("../models/gym-schema");
const addClass = async (req, res) => {
  try {
    const { name, description, instructor,location,difficulty,isCancelled,startTime,endTime,capacity } = req.body;
    const gymclasses = await Class.create({ name, description, instructor,location, gym:req.user.gymId,difficulty,isCancelled,startTime,endTime,capacity});
    res.status(201).json({ message: "Class added successfully", gymclasses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding class" });
  }
};
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({ gym:req.user.gymId }); 
    if (!classes) return res.status(404).json({ message: "No classes found" });
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting classes" });
  }
};
const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const gymclass = await Class.findById(id);
    if (!gymclass) return res.status(404).json({ message: "Class not found" });
    res.status(200).json(gymclass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting class" });
  }
};
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const gymclass = await Class.findByIdAndDelete(id);
    if (!gymclass) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting class" });
  }
};
const editClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, instructor,location,difficulty,isCancelled,startTime,endTime,capacity } = req.body;
    const gymclass = await Class.findByIdAndUpdate(id, { name, description, instructor,location,difficulty,isCancelled,startTime,endTime,capacity });
    if (!gymclass) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ message: "Class updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating class" });
  }
};

module.exports = { addClass, getClasses, getClassById, deleteClass, editClass };