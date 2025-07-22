const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Gym = require("../models/gym-schema");

// for user register
const registerGymWithOwner = async (req, res) => {
  try {
    const {
      gym_name,
      gym_address,
      gym_contactNumber,
      openingHours,
      username,
      email,
      password,
    } = req.body;

    // 1. Check if email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // 2. Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user (without gym yet)
    const manager = await User.create({
      username,
      email: email,
      password: hashedPassword,
      role: "admin",
      address: gym_address,
      phone: gym_contactNumber,
    });

    // 4. Create gym with owner reference
    const gym = await Gym.create({
      gym_name,
      gym_address,
      gym_contactNumber,
      openingHours,
      owner: manager._id,
    });

    // 5. Update manager to include gym reference
    manager.gym = gym._id;
    await manager.save();

    // 6. Create JWT token
    const token = jwt.sign(
      {
        userId: manager._id,
        gymId: gym._id,
        role: manager.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Gym and manager account created",
      token,
      user: {
        _id: manager._id,
        name: manager.username,
        email: manager.email,
        gym: gym._id,
        role: manager.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while registering gym" });
  }
};

const addUserToGym = async (req, res) => {
  try {
    const { username, email, role,phone,address,expiryDate } = req.body;

    // Get gymId from the manager/admin's JWT
    const gymId = req.user.gymId;

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash("temp@123", 10);

    const user = await User.create({
      username,
      email: email,
      password: hashedPassword,
      role: role, 
      gym: gymId,
      mustResetPassword: false,
      phone,
      address,  
      isMember:true,
      joinDate:new Date(),
      expiryDate:expiryDate,
    });

    res.status(201).json({ message: `${role} added successfully`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding user to gym" });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // 2. Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    if (user.mustResetPassword && user.role !== "admin") {
      return res.status(200).json({
        message: "Password reset required",
        mustResetPassword: true,
        userId: user._id,
        email: user.email,
      });
    }
    // 3. Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        gymId: user.gym,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        gym: user.gym,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while logging in" });
  }
};

const resetPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.mustResetPassword = false;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
};
const getGymMembers = async (req, res) => {
  try {
    const gymId = req.user.gymId;

    // Find the gym and get the owner
    const gym = await Gym.findById(gymId).select('owner');
    if (!gym) return res.status(404).json({ message: "Gym not found" });

    // Exclude the owner from the members list
    const members = await User.find({
      gym: gymId,
      _id: { $ne: gym.owner },
      
    }).select('-password');

    if (!members || members.length === 0) {
      return res.status(404).json({ message: "No members found" });
    }
    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting gym members" });
  }
};
const deleteMember = async (req, res) => {
 try {
  const { id } = req.params;
  const member = await User.findByIdAndDelete(id);
  if (!member) return res.status(404).json({ message: "Member not found" });
  res.status(200).json({ message: "Member deleted successfully" });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Error deleting member" });
 }
};
const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await User.findById(id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting member" });
  }
};
const editMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, phone, address, expiryDate,isMember } = req.body;
    const member = await User.findByIdAndUpdate(id, { username, email, role, phone, address, expiryDate,isMember });
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json({ message: "Member updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing member" });
  }
};


module.exports = {
  registerGymWithOwner,
  addUserToGym,
  userLogin,
  resetPassword,
  getGymMembers,
  deleteMember,
  editMember,
  getMemberById,
  };  
