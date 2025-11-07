const express = require('express');
const router = express.Router();
const Stats = require('../models/Stats');

// Get user stats
router.get('/:userId', async (req, res) => {
  try {
    let stats = await Stats.findOne({ userId: req.params.userId });
    
    // If no stats exist, create default stats
    if (!stats) {
      stats = new Stats({
        userId: req.params.userId,
        caloriesBurned: 0,
        caloriesGoal: 2000,
        steps: 0,
        stepsGoal: 10000,
        waterIntake: 0,
        waterGoal: 8
      });
      await stats.save();
    }
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user stats
router.put('/:userId', async (req, res) => {
  try {
    const { caloriesBurned, caloriesGoal, steps, stepsGoal, waterIntake, waterGoal } = req.body;
    
    let stats = await Stats.findOne({ userId: req.params.userId });
    
    if (!stats) {
      // Create new stats if they don't exist
      stats = new Stats({
        userId: req.params.userId,
        caloriesBurned,
        caloriesGoal,
        steps,
        stepsGoal,
        waterIntake,
        waterGoal
      });
    } else {
      // Update existing stats
      stats.caloriesBurned = caloriesBurned !== undefined ? caloriesBurned : stats.caloriesBurned;
      stats.caloriesGoal = caloriesGoal !== undefined ? caloriesGoal : stats.caloriesGoal;
      stats.steps = steps !== undefined ? steps : stats.steps;
      stats.stepsGoal = stepsGoal !== undefined ? stepsGoal : stats.stepsGoal;
      stats.waterIntake = waterIntake !== undefined ? waterIntake : stats.waterIntake;
      stats.waterGoal = waterGoal !== undefined ? waterGoal : stats.waterGoal;
      stats.updatedAt = Date.now();
    }
    
    await stats.save();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset daily stats
router.post('/:userId/reset', async (req, res) => {
  try {
    const stats = await Stats.findOneAndUpdate(
      { userId: req.params.userId },
      { 
        caloriesBurned: 0,
        steps: 0,
        waterIntake: 0,
        date: Date.now(),
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
