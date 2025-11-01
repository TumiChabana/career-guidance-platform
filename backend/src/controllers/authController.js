const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { email, password, role, ...profileData } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user object based on role
    const userData = {
      email,
      password,
      role,
      isEmailVerified: true  // Auto-verified for demo
    };

    // Add role-specific profile data
    if (role === 'student') {
      userData.studentProfile = profileData;
    } else if (role === 'institute') {
      userData.instituteProfile = profileData;
    } else if (role === 'company') {
      userData.companyProfile = profileData;
    }

    // Create user
    const user = await User.create(userData);

    res.status(201).json({
      success: true,
      message: 'Registration successful! You can now login.',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { role } = user;
    const updates = req.body;

    // Update role-specific profile
    if (role === 'student' && updates.studentProfile) {
      user.studentProfile = { ...user.studentProfile, ...updates.studentProfile };
    } else if (role === 'institute' && updates.instituteProfile) {
      user.instituteProfile = { ...user.instituteProfile, ...updates.instituteProfile };
    } else if (role === 'company' && updates.companyProfile) {
      user.companyProfile = { ...user.companyProfile, ...updates.companyProfile };
    }

    user.updatedAt = Date.now();
    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};