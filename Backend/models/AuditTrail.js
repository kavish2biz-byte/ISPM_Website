const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const auditTrailSchema = new mongoose.Schema({
  entityType: {
    type: String,
    required: true,
    enum: ['policy', 'acknowledgment']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'acknowledge', 'view', 'download']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  changes: {
    type: mongoose.Schema.Types.Mixed
  },
  previousValues: {
    type: mongoose.Schema.Types.Mixed
  },
  newValues: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
});

// Indexes for efficient querying
auditTrailSchema.index({ entityType: 1, entityId: 1 });
auditTrailSchema.index({ userId: 1, timestamp: -1 });
auditTrailSchema.index({ timestamp: -1 });
auditTrailSchema.index({ action: 1, timestamp: -1 });

// Add pagination plugin
auditTrailSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('AuditTrail', auditTrailSchema);
