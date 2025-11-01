const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    minimumQualification: String, // e.g., "Bachelor's Degree"
    preferredField: [String], // e.g., ["Computer Science", "IT"]
    minimumGPA: Number,
    yearsOfExperience: Number,
    requiredSkills: [String],
    certificates: [String]
  },
  location: String,
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'LSL'
    }
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time'
  },
  deadline: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);