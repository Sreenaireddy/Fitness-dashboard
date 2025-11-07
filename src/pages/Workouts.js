import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkouts } from '../services/api';
import '../styles/Workouts.css';

const Workouts = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [loading, setLoading] = useState(true);

  // Default workouts if backend is not available
  const defaultWorkouts = [
    {
      id: 1,
      title: 'Morning Yoga',
      type: 'Yoga',
      difficulty: 'Beginner',
      duration: '30 min',
      calories: 150,
      description: 'Start your day with energizing yoga poses',
      image: '🧘'
    },
    {
      id: 2,
      title: 'HIIT Cardio',
      type: 'Cardio',
      difficulty: 'Advanced',
      duration: '20 min',
      calories: 300,
      description: 'High-intensity interval training for maximum burn',
      image: '🏃'
    },
    {
      id: 3,
      title: 'Strength Training',
      type: 'Strength',
      difficulty: 'Intermediate',
      duration: '45 min',
      calories: 250,
      description: 'Build muscle with compound exercises',
      image: '🏋️'
    },
    {
      id: 4,
      title: 'Evening Yoga',
      type: 'Yoga',
      difficulty: 'Beginner',
      duration: '25 min',
      calories: 120,
      description: 'Relaxing yoga flow to unwind',
      image: '🧘'
    },
    {
      id: 5,
      title: 'Running Intervals',
      type: 'Cardio',
      difficulty: 'Intermediate',
      duration: '35 min',
      calories: 350,
      description: 'Boost endurance with interval running',
      image: '🏃'
    },
    {
      id: 6,
      title: 'Upper Body Blast',
      type: 'Strength',
      difficulty: 'Advanced',
      duration: '40 min',
      calories: 280,
      description: 'Intense upper body workout',
      image: '💪'
    },
    {
      id: 7,
      title: 'Core Power',
      type: 'Strength',
      difficulty: 'Intermediate',
      duration: '30 min',
      calories: 200,
      description: 'Strengthen your core muscles',
      image: '🏋️'
    },
    {
      id: 8,
      title: 'Dance Cardio',
      type: 'Cardio',
      difficulty: 'Beginner',
      duration: '30 min',
      calories: 250,
      description: 'Fun dance-based cardio workout',
      image: '💃'
    },
    {
      id: 9,
      title: 'Power Yoga',
      type: 'Yoga',
      difficulty: 'Advanced',
      duration: '50 min',
      calories: 300,
      description: 'Challenging yoga for strength and flexibility',
      image: '🧘'
    }
  ];

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    filterWorkouts();
  }, [selectedType, selectedDifficulty, workouts]);

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data.length > 0 ? data : defaultWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setWorkouts(defaultWorkouts);
    } finally {
      setLoading(false);
    }
  };

  const filterWorkouts = () => {
    let filtered = [...workouts];

    if (selectedType !== 'all') {
      filtered = filtered.filter(workout => workout.type === selectedType);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(workout => workout.difficulty === selectedDifficulty);
    }

    setFilteredWorkouts(filtered);
  };

  const getDifficultyClass = (difficulty) => {
    return difficulty.toLowerCase();
  };

  if (loading) {
    return <div className="loading">Loading workouts...</div>;
  }

  return (
    <div className="workouts-container">
      <button className="btn-back" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
      <div className="workouts-header">
        <h1>Workout Library</h1>
        <p>Choose your workout and start your fitness journey</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Type:</label>
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="Yoga">Yoga</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Difficulty:</label>
          <select 
            value={selectedDifficulty} 
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="workouts-grid">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <div key={workout.id} className="workout-card">
              <div className="workout-image">
                <span className="workout-emoji">{workout.image}</span>
              </div>
              <div className="workout-content">
                <h3>{workout.title}</h3>
                <p className="workout-description">{workout.description}</p>
                <div className="workout-meta">
                  <span className="workout-type">{workout.type}</span>
                  <span className={`workout-difficulty ${getDifficultyClass(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                </div>
                <div className="workout-stats">
                  <div className="stat">
                    <span className="stat-icon">⏱️</span>
                    <span>{workout.duration}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">🔥</span>
                    <span>{workout.calories} cal</span>
                  </div>
                </div>
                <button 
                  className="btn-start-workout"
                  onClick={() => navigate(`/workout/${workout.id}`)}
                >
                  Start Workout
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No workouts found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
