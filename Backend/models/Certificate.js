const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  certificateNumber: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'revoked'],
    default: 'active'
  },
  score: {
    type: Number,
    required: true
  },
  completionTime: {
    type: Number // in minutes
  },
  fileUrl: {
    type: String
  },
  verificationCode: {
    type: String
  },
  revokedAt: {
    type: Date
  },
  revokedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  revokedReason: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
certificateSchema.index({ userId: 1, status: 1 });
certificateSchema.index({ courseId: 1, status: 1 });
certificateSchema.index({ certificateNumber: 1 });
certificateSchema.index({ verificationCode: 1 });
certificateSchema.index({ issuedAt: -1 });

module.exports = mongoose.model('Certificate', certificateSchema);
