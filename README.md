# JobFlow Tracker

A comprehensive job application tracking system built with Node.js, Express, MongoDB, and React.

## Features

- **User Authentication**: Secure registration and login system
- **Job Management**: Add, edit, delete, and track job applications
- **Status Tracking**: Monitor application status (Applied, Interview, Offer, Rejected, Withdrawn)
- **Analytics Dashboard**: Visual insights with charts and statistics
- **Advanced Filtering**: Search and filter jobs by various criteria
- **Contact Management**: Store recruiter and hiring manager information
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Recharts for data visualization
- Lucide React for icons
- React Hot Toast for notifications

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jobflow-tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jobtracker
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   JWT_EXPIRE=30d
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:5000

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Jobs
- `GET /api/jobs` - Get all jobs (with filtering)
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/:id` - Get a specific job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job
- `GET /api/jobs/stats` - Get job statistics

### Users
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/profile` - Delete user account

## Project Structure

```
jobflow-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.