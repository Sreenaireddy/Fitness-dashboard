# Fitness Dashboard

A comprehensive fitness tracking application built with React.js, Firebase Authentication, and MongoDB.

## Features

- **Authentication**: Secure signup and login with Firebase
- **Dashboard**: Track calories, steps, and water intake with visual progress indicators
- **Workouts**: Browse and filter workout routines by type and difficulty
- **Profile Management**: Update user information and manage account settings

## Setup Instructions

### 1. Install Dependencies
bash
npm install


### 2. Configure Firebase
1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Copy your Firebase configuration
4. Create a `.env` file based on `.env.example` and add your Firebase credentials

### 3. Configure MongoDB
1. Install MongoDB locally or use MongoDB Atlas
2. Update the `MONGODB_URI` in your `.env` file

### 4. Run the Application

**Start the backend server:**
```bash
npm run server
```

**Start the React app (in a new terminal):**
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
fitness-dashboard/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.js
├── server/
│   ├── models/
│   ├── routes/
│   └── server.js
└── package.json
```

## Technologies Used

- **Frontend**: React.js, React Router
- **Authentication**: Firebase Auth
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Styling**: CSS3
