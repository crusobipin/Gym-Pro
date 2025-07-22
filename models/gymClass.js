const mongoose = require('mongoose');

const GymClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
  },
  // thiswill be string for now but later we will use the user id
  instructor: {
   type: String,
   required: true,
   trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: String,
    required: true,
    trim: true
  },
  endTime: {
    type: String,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  isCancelled: {
    type: Boolean,
    default: false
  },
  gym: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Gym",
  required: true
},

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GymClass', GymClassSchema);
