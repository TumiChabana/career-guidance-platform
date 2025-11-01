const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution',
    required: true
  },
  facultyName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  duration: String, // e.g., "3 years", "4 years"
  description: String,
  requirements: {
    minimumGrade: String, // e.g., "C+", "B"
    requiredSubjects: [String],
    additionalRequirements: String
  },
  availableSlots: {
    type: Number,
    default: 0
  },
  applicationDeadline: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);