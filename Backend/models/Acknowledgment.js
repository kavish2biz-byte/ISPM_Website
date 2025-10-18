const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const acknowledgmentSchema = new mongoose.Schema({
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
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  acknowledgmentType: {
    type: String,
    enum: ['initial', 'revision', 'reminder'],
    default: 'initial'
  },
  version: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient queries
acknowledgmentSchema.index({ policyId: 1, userId: 1 });
acknowledgmentSchema.index({ acknowledgedAt: -1 });
acknowledgmentSchema.index({ policyId: 1, version: 1 });

// Add pagination plugin
acknowledgmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Acknowledgment', acknowledgmentSchema);
