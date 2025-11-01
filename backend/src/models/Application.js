const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'admitted', 'rejected', 'waiting_list'],
    default: 'pending'
  },
  applicationDocuments: {
    transcript: String,
    idDocument: String,
    additionalDocuments: [String]
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectionReason: String
});

// Compound index to ensure student can only apply once per course
applicationSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);