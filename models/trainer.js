const mongoose = require('mongoose');
const trainerSchema = new mongoose.Schema({
    name: {
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
    type: {
        type: String,
        enum: ['Cardio', 'Strength', 'Flexibility', 'Free Weights', 'Machine', 'Other'],
        required: true,
        trim: true
    },
    experience: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
        trim: true
    },
    gym: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Gym",
  default: null
},
phone: {
    type: String,
    required: true,
    trim: true
},
email: {
    type: String,
    required: true,
    trim: true
}

}, {
    timestamps: true
});

module.exports = mongoose.model('Trainer', trainerSchema);
