const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'policy_created', 'policy_updated', 'policy_deleted',
      'user_created', 'user_updated', 'user_deactivated',
      'training_created', 'training_updated', 'training_completed',
      'acknowledgment_made', 'report_generated', 'system_login',
      'bulk_upload', 'role_changed', 'department_changed'
    ]
  },
  details: {
    type: String,
    required: true
  },
  entityType: {
    type: String,
    enum: ['policy', 'user', 'training', 'acknowledgment', 'report', 'system'],
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId
  },
  metadata: {
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
  }
});

// Indexes for efficient querying
auditLogSchema.index({ timestamp: -1 });
auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });

// Add pagination plugin
auditLogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('AuditLog', auditLogSchema);
