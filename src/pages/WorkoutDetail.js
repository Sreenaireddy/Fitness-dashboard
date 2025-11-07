import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/WorkoutDetail.css';

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Default workouts (same as in Workouts.js)
  const defaultWorkouts = [
    {
      id: 1,
      title: 'Morning Yoga',
      type: 'Yoga',
      difficulty: 'Beginner',
      duration: '30 min',
      durationMinutes: 30,
      calories: 150,
      description: 'Start your day with energizing yoga poses',
      image: '🧘',
      exercises: [
        { name: 'Sun Salutation', duration: '5 min', reps: '5 rounds' },
        { name: 'Warrior Pose', duration: '3 min', reps: 'Hold 30 sec each side' },
        { name: 'Tree Pose', duration: '3 min', reps: 'Hold 30 sec each side' },
        { name: 'Downward Dog', duration: '4 min', reps: 'Hold 1 min' },
        { name: 'Child Pose', duration: '3 min', reps: 'Rest' },
        { name: 'Cobra Pose', duration: '4 min', reps: '8 reps' },
        { name: 'Seated Twist', duration: '4 min', reps: 'Hold 30 sec each side' },
        { name: 'Savasana', duration: '4 min', reps: 'Relax' }
      ]
    },
    {
      id: 2,
      title: 'HIIT Cardio',
      type: 'Cardio',
      difficulty: 'Advanced',
      duration: '20 min',
      durationMinutes: 20,
      calories: 300,
      description: 'High-intensity interval training for maximum burn',
      image: '🏃',
      exercises: [
        { name: 'Jumping Jacks', duration: '2 min', reps: '40 reps' },
        { name: 'Burpees', duration: '3 min', reps: '15 reps' },
        { name: 'High Knees', duration: '2 min', reps: '30 sec sprint' },
        { name: 'Mountain Climbers', duration: '3 min', reps: '20 reps' },
        { name: 'Jump Squats', duration: '3 min', reps: '15 reps' },
        { name: 'Rest', duration: '2 min', reps: 'Active recovery' },
        { name: 'Sprint in Place', duration: '3 min', reps: '30 sec sprint' },
        { name: 'Cool Down', duration: '2 min', reps: 'Stretch' }
      ]
    },
    {
      id: 3,
      title: 'Strength Training',
      type: 'Strength',
      difficulty: 'Intermediate',
      duration: '45 min',
      durationMinutes: 45,
      calories: 250,
      description: 'Build muscle with compound exercises',
      image: '🏋️',
      exercises: [
        { name: 'Warm Up', duration: '5 min', reps: 'Light cardio' },
        { name: 'Squats', duration: '8 min', reps: '3 sets x 12 reps' },
        { name: 'Push-ups', duration: '6 min', reps: '3 sets x 15 reps' },
        { name: 'Lunges', duration: '8 min', reps: '3 sets x 10 each leg' },
        { name: 'Plank', duration: '5 min', reps: '3 sets x 1 min' },
        { name: 'Dumbbell Rows', duration: '6 min', reps: '3 sets x 12 reps' },
        { name: 'Shoulder Press', duration: '5 min', reps: '3 sets x 10 reps' },
        { name: 'Cool Down', duration: '2 min', reps: 'Stretch' }
      ]
    }
  ];

  useEffect(() => {
    // Find workout by id
    const foundWorkout = defaultWorkouts.find(w => w.id === parseInt(id));
    if (foundWorkout) {
      setWorkout(foundWorkout);
      setTimeRemaining(foundWorkout.durationMinutes * 60); // Convert to seconds
    }
  }, [id]);

  useEffect(() => {
    let timer;
    if (isStarted && !isPaused && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsStarted(false);
            alert('🎉 Workout Complete! Great job!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, isPaused, timeRemaining]);

  const handleStartWorkout = () => {
    setIsStarted(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStopWorkout = () => {
    setIsStarted(false);
    setIsPaused(false);
    if (workout) {
      setTimeRemaining(workout.durationMinutes * 60);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!workout) {
    return <div className="loading">Loading workout...</div>;
  }

  return (
    <div className="workout-detail-container">
      <button className="btn-back" onClick={() => navigate('/workouts')}>
        ← Back to Workouts
      </button>

      <div className="workout-detail-header">
        <div className="workout-detail-icon">{workout.image}</div>
        <h1>{workout.title}</h1>
        <p className="workout-detail-description">{workout.description}</p>
        
        <div className="workout-detail-meta">
          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            <span>{workout.duration}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">🔥</span>
            <span>{workout.calories} cal</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📊</span>
            <span>{workout.difficulty}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">💪</span>
            <span>{workout.type}</span>
          </div>
        </div>
      </div>

      {isStarted && (
        <div className="timer-section">
          <div className="timer-display">
            <h2>Time Remaining</h2>
            <div className="timer">{formatTime(timeRemaining)}</div>
            <div className="timer-controls">
              <button 
                className="btn-timer-control pause" 
                onClick={handlePauseResume}
              >
                {isPaused ? '▶️ Resume' : '⏸️ Pause'}
              </button>
              <button 
                className="btn-timer-control stop" 
                onClick={handleStopWorkout}
              >
                ⏹️ Stop
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="exercises-section">
        <h2>Exercises</h2>
        <div className="exercises-list">
          {workout.exercises.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <div className="exercise-number">{index + 1}</div>
              <div className="exercise-content">
                <h3>{exercise.name}</h3>
                <div className="exercise-details">
                  <span className="exercise-duration">⏱️ {exercise.duration}</span>
                  <span className="exercise-reps">🔢 {exercise.reps}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isStarted && (
        <div className="workout-actions">
          <button className="btn-start-main" onClick={handleStartWorkout}>
            🚀 Start Workout
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutDetail;
