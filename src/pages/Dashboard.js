import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import { getUserStats, updateUserStats } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    caloriesBurned: 0,
    caloriesGoal: 2000,
    steps: 0,
    stepsGoal: 10000,
    waterIntake: 0,
    waterGoal: 8
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      fetchUserStats(currentUser.uid);
    }
  }, []);

  const fetchUserStats = async (userId) => {
    try {
      // Try to get from localStorage first
      const localStats = localStorage.getItem(`stats_${userId}`);
      if (localStats) {
        setStats(JSON.parse(localStats));
        setLoading(false);
        return;
      }

      // Try to fetch from API
      const data = await getUserStats(userId);
      if (data) {
        setStats(data);
        // Save to localStorage
        localStorage.setItem(`stats_${userId}`, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use default stats
      const defaultStats = {
        caloriesBurned: 450,
        caloriesGoal: 2000,
        steps: 6500,
        stepsGoal: 10000,
        waterIntake: 5,
        waterGoal: 8
      };
      setStats(defaultStats);
      localStorage.setItem(`stats_${userId}`, JSON.stringify(defaultStats));
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "Success starts with self-discipline.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't wish for it, work for it."
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <button className="btn-back" onClick={() => navigate('/profile')}>
        ← Back to Profile
      </button>
      <div className="dashboard-header">
        <h1>Welcome back, {user?.displayName || 'User'}! 👋</h1>
        <p className="dashboard-date">{new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card calories">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>Calories Burned</h3>
            <div className="stat-value">
              <span className="current">{stats.caloriesBurned}</span>
              <span className="goal">/ {stats.caloriesGoal}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${calculateProgress(stats.caloriesBurned, stats.caloriesGoal)}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {calculateProgress(stats.caloriesBurned, stats.caloriesGoal).toFixed(0)}% of daily goal
            </p>
          </div>
        </div>

        <div className="stat-card steps">
          <div className="stat-icon">👟</div>
          <div className="stat-content">
            <h3>Steps Taken</h3>
            <div className="stat-value">
              <span className="current">{stats.steps}</span>
              <span className="goal">/ {stats.stepsGoal}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${calculateProgress(stats.steps, stats.stepsGoal)}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {calculateProgress(stats.steps, stats.stepsGoal).toFixed(0)}% of daily goal
            </p>
          </div>
        </div>

        <div className="stat-card water">
          <div className="stat-icon">💧</div>
          <div className="stat-content">
            <h3>Water Intake</h3>
            <div className="stat-value">
              <span className="current">{stats.waterIntake}</span>
              <span className="goal">/ {stats.waterGoal} glasses</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${calculateProgress(stats.waterIntake, stats.waterGoal)}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {calculateProgress(stats.waterIntake, stats.waterGoal).toFixed(0)}% of daily goal
            </p>
          </div>
        </div>
      </div>

      <div className="motivation-section">
        <div className="motivation-card">
          <div className="motivation-image">
            <div className="motivation-icon">💪</div>
          </div>
          <div className="motivation-content">
            <h2>Daily Motivation</h2>
            <p className="quote">"{randomQuote}"</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => window.location.href = '/workouts'}>
            <span className="action-icon">🏋️</span>
            <span>Start Workout</span>
          </button>
          <button className="action-btn" onClick={() => window.location.href = '/profile'}>
            <span className="action-icon">👤</span>
            <span>View Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
