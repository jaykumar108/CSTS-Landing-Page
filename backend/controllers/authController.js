const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Helper function to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// @desc    Create default admin user if none exists
// @route   Internal function
// @access  Private
exports.createDefaultAdmin = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // Create default admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'jsharma.dbg@gmail.com',
      password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin@123',
      role: 'admin'
    });

    console.log('Default admin user created successfully');
    return adminUser;
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
      secure: process.env.NODE_ENV === 'production'
    });

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  
  // Check if file was uploaded
  let profileImage = undefined;
  let cloudinaryId = undefined;
  
  if (req.file) {
    profileImage = req.file.path;
    cloudinaryId = req.file.filename;
  }
  
  // Build update object
  const updateData = {
    username,
    email
  };
  
  // Only add image fields if a file was uploaded
  if (profileImage) {
    updateData.profileImage = profileImage;
    updateData.cloudinaryId = cloudinaryId;
  }
  
  // Update user
  const user = await User.findByIdAndUpdate(
    req.user.id,
    updateData,
    { new: true, runValidators: true }
  ).select('-password');
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Change user password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Please provide current password and new password'
    });
  }

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check if current password matches
  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
});

// @desc    Update admin profile image
// @route   PUT /api/auth/admin/update-profile-image
// @access  Private/Admin
exports.updateAdminProfileImage = asyncHandler(async (req, res) => {
  // Check if the user is admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Only admin users can access this route'
    });
  }
  
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload an image file'
    });
  }
  
  const profileImage = req.file.path;
  const cloudinaryId = req.file.filename;
  
  // Update admin user
  const updatedAdmin = await User.findByIdAndUpdate(
    req.user.id,
    {
      profileImage,
      cloudinaryId
    },
    { new: true, runValidators: true }
  ).select('-password');
  
  res.status(200).json({
    success: true,
    data: updatedAdmin,
    message: 'Admin profile image updated successfully'
  });
});

// @desc    Check API connection
// @route   GET /api/auth/check
// @access  Private
exports.checkConnection = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Connection successful',
    timestamp: new Date().toISOString()
  });
}; 