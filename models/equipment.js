const mongoose = require('mongoose');

const GymEquipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Cardio', 'Strength', 'Flexibility', 'Free Weights', 'Machine', 'Other'],
  },
  brand: {
    type: String,
    default: ''
  },
  model: {
    type: String,
    default: ''
  },
  purchaseDate: {
    type: Date
  },
  condition: {
    type: String,
    enum: ['New', 'Good', 'Needs Maintenance', 'Out of Order'],
    default: 'Good'
  },
  lastMaintenance: {
    type: Date
  },
  location: {
    type: String, // Example: "Room A", "Floor 2", etc.
    required: true
  },
  gym: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Gym",
  required: true
}

 
},{timestamps: true});

module.exports = mongoose.model('GymEquipment', GymEquipmentSchema);
