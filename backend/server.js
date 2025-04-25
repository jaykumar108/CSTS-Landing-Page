const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const passport = require('passport');
const { createDefaultAdmin } = require('./controllers/authController');

// Import routes
const authRoutes = require('./routes/auth.routes');
const galleryRoutes = require('./routes/gallery.routes');
const jobRoutes = require('./routes/job.routes');
const contactRoutes = require('./routes/contact.routes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/admin-panel',
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// JWT सीक्रेट सेट करें अगर एनवायरनमेंट वेरिएबल से नहीं मिला
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your_secure_fallback_secret_key';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '14d';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/admin-panel')
  .then(() => {
    console.log('MongoDB Connected');
    // Create default admin user
    createDefaultAdmin();
  })
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contacts', contactRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 