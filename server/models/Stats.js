const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  caloriesGoal: {
    type: Number,
    default: 2000
  },
  steps: {
    type: Number,
    default: 0
  },
  stepsGoal: {
    type: Number,
    default: 10000
  },
  waterIntake: {
    type: Number,
    default: 0
  },
  waterGoal: {
    type: Number,
    default: 8
  },
  date: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stats', statsSchema);
