const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'student', 'institute', 'company']
  },
  isEmailVerified: {
    type: Boolean,
    default: true
  },
  emailVerificationToken: String,
  
  // Student specific fields
  studentProfile: {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    dateOfBirth: Date,
    address: String,
    academicTranscript: String, // URL to uploaded file
    certificates: [String], // Array of URLs
    workExperience: [{
      company: String,
      position: String,
      duration: String,
      description: String
    }],
    admittedInstitution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution'
    }
  },

  // Institute specific fields
  instituteProfile: {
    institutionName: String,
    registrationNumber: String,
    address: String,
    phoneNumber: String,
    website: String,
    description: String,
    logo: String
  },

  // Company specific fields
  companyProfile: {
    companyName: String,
    registrationNumber: String,
    industry: String,
    address: String,
    phoneNumber: String,
    website: String,
    description: String,
    logo: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);