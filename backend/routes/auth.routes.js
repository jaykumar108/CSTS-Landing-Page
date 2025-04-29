const express = require('express');
const { login, logout, getMe, updateProfile, getProfile, changePassword, updateAdminProfileImage, checkConnection } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Auth routes
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);

// Protected routes
router.use(protect);
router.get('/profile', getProfile);
router.put('/update-profile', upload.single('profileImage'), updateProfile);
router.put('/change-password', changePassword);

// Admin specific routes
router.put('/admin/update-profile-image', protect, upload.single('profileImage'), updateAdminProfileImage);

// Add connection check route
router.get('/check', protect, checkConnection);

module.exports = router; 