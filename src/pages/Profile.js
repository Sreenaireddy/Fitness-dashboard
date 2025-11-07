import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logOut } from '../services/authService';
import { getUserProfile, updateUserProfile } from '../services/api';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    goal: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      fetchProfile(currentUser.uid);
    }
  }, []);

  const fetchProfile = async (userId) => {
    try {
      // Try to get from localStorage first
      const localProfile = localStorage.getItem(`profile_${userId}`);
      if (localProfile) {
        const parsedProfile = JSON.parse(localProfile);
        setProfile(parsedProfile);
        setLoading(false);
        return;
      }

      // Try to fetch from API
      const data = await getUserProfile(userId);
      if (data) {
        setProfile({
          name: data.name || '',
          email: data.email || '',
          age: data.age || '',
          weight: data.weight || '',
          height: data.height || '',
          goal: data.goal || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Set default values from Firebase user
      const currentUser = getCurrentUser();
      setProfile({
        name: currentUser?.displayName || '',
        email: currentUser?.email || '',
        age: '',
        weight: '',
        height: '',
        goal: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      // Save to localStorage as fallback
      localStorage.setItem(`profile_${user.uid}`, JSON.stringify(profile));
      
      // Try to save to API (will fail silently if MongoDB not available)
      try {
        await updateUserProfile(user.uid, profile);
      } catch (apiError) {
        console.log('API update failed, using localStorage:', apiError);
      }
      
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <button className="btn-back" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <h1>{profile.name || 'User'}</h1>
        <p className="profile-email">{profile.email}</p>
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Personal Information</h2>
          {!isEditing && (
            <button 
              className="btn-edit" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              disabled
              className="disabled-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={profile.age}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={profile.weight}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your weight"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={profile.height}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your height"
              />
            </div>

            <div className="form-group">
              <label htmlFor="goal">Fitness Goal</label>
              <select
                id="goal"
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select a goal</option>
                <option value="lose-weight">Lose Weight</option>
                <option value="gain-muscle">Gain Muscle</option>
                <option value="maintain">Maintain Fitness</option>
                <option value="improve-endurance">Improve Endurance</option>
              </select>
            </div>
          </div>

          {isEditing && (
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile(user.uid);
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-save"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="profile-actions">
        <button className="btn-logout" onClick={handleLogout}>
          <span className="logout-icon">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
