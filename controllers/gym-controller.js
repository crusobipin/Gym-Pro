const GymEquipment=require("../models/equipment");
const GymClass=require("../models/gymClass");
const User=require("../models/user");
const Gym = require("../models/gym-schema");

// req.user have userId: manager._id,
        // gymId: gym._id,
        // role: manager.role,
const getSingleGym = async (req, res) => {
  try {
    const gym = await Gym.findById(req.user.gymId);
    if (!gym) return res.status(404).json({ message: "Gym not found" });
    res.status(200).json(gym);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching gym" });
  }
};
const editGym=async(req,res)=>{
    try {
        const {gym_name,gym_address,gym_contactNumber,openingHours,isActive}=req.body;
        if (!req.user.role==="admin"){
            return res.status(403).json({message:"You are not authorized to update this gym"});
        }
         const gym=await Gym.findByIdAndUpdate(req.user.gymId,{gym_name,gym_address,gym_contactNumber,openingHours,isActive});
        if(!gym) return res.status(404).json({message:"Gym not found"});
        res.status(200).json({message:"Gym updated successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Error updating gym"});
    }
}

    module.exports={getSingleGym,editGym};
    