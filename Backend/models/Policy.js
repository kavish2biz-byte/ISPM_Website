const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const policySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Security', 'Privacy', 'Compliance', 'HR', 'IT', 'Operations']
  },
  version: {
    type: String,
    required: true,
    default: '1.0'
  },
  effectiveDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'archived', 'expired'],
    default: 'draft'
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number
  },
  mimeType: {
    type: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  assignedRoles: [{
    type: String,
    enum: ['admin', 'manager', 'employee']
  }],
  assignedDepartments: [{
    type: String
  }],
  acknowledgmentsRequired: {
    type: Boolean,
    default: true
  },
  acknowledgmentDeadline: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  revisionHistory: [{
    version: String,
    changes: String,
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    modifiedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
policySchema.index({ title: 'text', description: 'text', tags: 'text' });
policySchema.index({ status: 1, effectiveDate: 1 });
policySchema.index({ assignedRoles: 1, assignedDepartments: 1 });

// Update timestamps
policySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add pagination plugin
policySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Policy', policySchema);
