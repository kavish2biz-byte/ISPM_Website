const mongoose = require('mongoose');

const policyAcknowledgementSchema = new mongoose.Schema({
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  acknowledgedAt: {
    type: Date,
    default: Date.now
  },
  acknowledgedVersion: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  acknowledgmentText: {
    type: String,
    default: 'I acknowledge that I have read, understood, and agree to comply with this policy.'
  },
  isLate: {
    type: Boolean,
    default: false
  },
  daysLate: {
    type: Number,
    default: 0
  },
  reminderSent: [{
    sentAt: Date,
    type: {
      type: String,
      enum: ['initial', 'reminder', 'escalation']
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure one acknowledgment per user per policy version
policyAcknowledgementSchema.index({ policyId: 1, userId: 1, acknowledgedVersion: 1 }, { unique: true });
policyAcknowledgementSchema.index({ userId: 1, acknowledgedAt: -1 });
policyAcknowledgementSchema.index({ policyId: 1, acknowledgedAt: -1 });

module.exports = mongoose.model('PolicyAcknowledgement', policyAcknowledgementSchema);

