const User = require('../models/User');
const jwt = require('jsonwebtoken');

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