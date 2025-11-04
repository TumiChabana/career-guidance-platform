const { db } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    const usersRef = db.collection('users');
    const existingUser = await usersRef.where('email', '==', email).get();
    
    if (!existingUser.empty) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object based on role
    const userData = {
      email,
      password: hashedPassword,
      role,
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add role-specific profile data
    if (role === 'student') {
      userData.studentProfile = {
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        phoneNumber: profileData.phoneNumber || '',
        dateOfBirth: profileData.dateOfBirth || null,
        address: profileData.address || '',
        academicTranscript: '',
        certificates: [],
        workExperience: [],
        admittedInstitution: null
      };
    } else if (role === 'institute') {
      userData.instituteProfile = {
        institutionName: profileData.institutionName || '',
        registrationNumber: profileData.registrationNumber || '',
        address: profileData.address || '',
        phoneNumber: profileData.phoneNumber || '',
        website: profileData.website || '',
        description: profileData.description || '',
        logo: ''
      };
    } else if (role === 'company') {
      userData.companyProfile = {
        companyName: profileData.companyName || '',
        registrationNumber: profileData.registrationNumber || '',
        industry: profileData.industry || '',
        address: profileData.address || '',
        phoneNumber: profileData.phoneNumber || '',
        website: profileData.website || '',
        description: profileData.description || '',
        logo: ''
      };
    }

    // Create user in Firestore
    const userDoc = await usersRef.add(userData);

    res.status(201).json({
      success: true,
      message: 'Registration successful! You can now login.',
      user: {
        id: userDoc.id,
        email: userData.email,
        role: userData.role,
        isEmailVerified: userData.isEmailVerified
      },
      token: generateToken(userDoc.id)
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Get first matching user
    const userDoc = snapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() };

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Remove password from response
    delete user.password;

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      token: generateToken(user.id)
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = { id: userDoc.id, ...userDoc.data() };
    delete user.password;

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userDoc.data();
    const { role } = user;
    const updates = req.body;

    // Prepare update data
    const updateData = {
      updatedAt: new Date()
    };

    // Update role-specific profile
    if (role === 'student' && updates.studentProfile) {
      updateData.studentProfile = {
        ...user.studentProfile,
        ...updates.studentProfile
      };
    } else if (role === 'institute' && updates.instituteProfile) {
      updateData.instituteProfile = {
        ...user.instituteProfile,
        ...updates.instituteProfile
      };
    } else if (role === 'company' && updates.companyProfile) {
      updateData.companyProfile = {
        ...user.companyProfile,
        ...updates.companyProfile
      };
    }

    await userRef.update(updateData);

    // Get updated user
    const updatedUserDoc = await userRef.get();
    const updatedUser = { id: updatedUserDoc.id, ...updatedUserDoc.data() };
    delete updatedUser.password;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message });
  }
};