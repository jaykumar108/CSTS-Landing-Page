const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const passport = require('passport');
const { createDefaultAdmin } = require('./controllers/authController');
const { seedDefaultCollaborators } = require('./controllers/collaboratorController');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const authRoutes = require('./routes/auth.routes');
const galleryRoutes = require('./routes/gallery.routes');
const jobRoutes = require('./routes/job.routes');
const contactRoutes = require('./routes/contact.routes');
const notificationRoutes = require('./routes/notification.routes');
const collaboratorRoutes = require('./routes/collaborator.routes');
const uploadRoutes = require('./routes/upload.routes');
const eventRoutes = require('./routes/event.routes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Make io accessible to routes
app.set('io', io);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Join admin room if authenticated
  socket.on('join-admin', (token) => {
    // In a real app, validate token here
    socket.join('admin-room');
    console.log(`Socket ${socket.id} joined admin-room`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secure_session_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// JWT 
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your_secure_fallback_secret_key';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2d';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    // Create default admin user
    createDefaultAdmin();
    // Seed default collaborators
    seedDefaultCollaborators();
  })
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/collaborators', collaboratorRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/events', eventRoutes);

// Root route to show server is running
app.get('/', (req, res) => {
  res.json({
    message: 'Server is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Serve uploaded files (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 