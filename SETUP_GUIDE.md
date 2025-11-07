Fitness Dashboard - Setup Guide

##  Prerequisites

Before you begin, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- A Firebase account

##  Step-by-Step Setup

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Authentication** → **Email/Password** sign-in method
4. Go to Project Settings → General
5. Scroll down to "Your apps" and click on the web icon (</>)
6. Register your app and copy the Firebase configuration

### 3. Configure Environment Variables

1. Copy `.env.example` to create a new `.env` file:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` and fill in your Firebase credentials:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   REACT_APP_FIREBASE_APP_ID=your_app_id_here
   ```

3. Configure MongoDB URI (if using local MongoDB, the default is fine):
   ```
   MONGODB_URI=mongodb://localhost:27017/fitness-dashboard
   ```

### 4. Set Up MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB is installed and running on your machine
- The default connection string will work: `mongodb://localhost:27017/fitness-dashboard`

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` with your Atlas connection string

### 5. Start the Application

You need to run both the backend server and the React app:

**Terminal 1 - Start the Backend Server:**
```bash
npm run server
```

You should see:
```
✅ Connected to MongoDB
 Server is running on port 5000
```

**Terminal 2 - Start the React App:**
```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

## 🎯 Features Overview

### 1. Authentication
- **Signup**: Create a new account with email/password
- **Login**: Sign in to your account
- **Protected Routes**: Dashboard, Workouts, and Profile are only accessible when logged in

### 2. Dashboard
- Welcome message with user name
- Stats cards showing:
  - Calories burned (with progress bar)
  - Steps taken (with progress bar)
  - Water intake (with progress bar)
- Daily motivational quotes
- Quick action buttons

### 3. Workouts
- Browse workout library
- Filter by:
  - Type (Yoga, Cardio, Strength)
  - Difficulty (Beginner, Intermediate, Advanced)
- Each workout shows:
  - Title and description
  - Duration and calories
  - Type and difficulty badges

### 4. Profile
- View user information
- Edit profile details:
  - Name, age, weight, height
  - Fitness goal
- Logout functionality

## 🗂️ Project Structure

```
fitness-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── PrivateRoute.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Dashboard.js
│   │   ├── Workouts.js
│   │   └── Profile.js
│   ├── services/
│   │   ├── firebase.js
│   │   ├── authService.js
│   │   └── api.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Auth.css
│   │   ├── Navbar.css
│   │   ├── Dashboard.css
│   │   ├── Workouts.css
│   │   └── Profile.css
│   ├── App.js
│   └── index.js
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Stats.js
│   │   └── Workout.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── statsRoutes.js
│   │   └── workoutRoutes.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Users
- `POST /api/users` - Create new user profile
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update user profile
- `DELETE /api/users/:userId` - Delete user profile

### Stats
- `GET /api/stats/:userId` - Get user stats
- `PUT /api/stats/:userId` - Update user stats
- `POST /api/stats/:userId/reset` - Reset daily stats

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get specific workout
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## 🎨 Customization

### Adding New Workouts
You can add workouts directly to the database or modify the default workouts in `src/pages/Workouts.js`

### Changing Colors
The main color scheme uses a purple gradient. To change it:
- Edit the gradient colors in CSS files (search for `#667eea` and `#764ba2`)

### Modifying Stats Goals
Default goals are set in `server/models/Stats.js`. You can modify:
- `caloriesGoal`: 2000
- `stepsGoal`: 10000
- `waterGoal`: 8

## 🐛 Troubleshooting

### Firebase Authentication Issues
- Make sure Email/Password authentication is enabled in Firebase Console
- Check that all Firebase config values are correct in `.env`

### MongoDB Connection Issues
- Verify MongoDB is running: `mongod --version`
- Check the connection string in `.env`
- For Atlas, ensure your IP is whitelisted

### Port Already in Use
If port 3000 or 5000 is already in use:
- Frontend: The app will ask if you want to use a different port
- Backend: Change `PORT` in `.env` and update `API_URL` in `src/services/api.js`

## 📱 Browser Compatibility

This app works best on:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Next Steps

1. Customize the workout library
2. Add more stats tracking features
3. Implement workout history
4. Add charts and graphs for progress tracking
5. Create a mobile-responsive design (already included!)

## 📞 Support

If you encounter any issues, check:
1. All dependencies are installed
2. Environment variables are set correctly
3. MongoDB is running
4. Firebase is configured properly

Happy coding! 💪
