const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  address: String,
  phoneNumber: String,
  website: String,
  description: String,
  logo: String,
  isApproved: {
    type: Boolean,
    default: false
  },
  faculties: [{
    name: String,
    description: String,
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }]
  }],
  admissionsOpen: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Institution', institutionSchema);