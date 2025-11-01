const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: String,
  resume: String, // URL to uploaded resume
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'interview', 'rejected', 'accepted'],
    default: 'pending'
  },
  matchScore: {
    type: Number,
    default: 0 // Auto-calculated based on qualifications
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date
});

// Compound index to ensure student can only apply once per job
jobApplicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);