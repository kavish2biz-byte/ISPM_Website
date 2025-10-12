const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const courseSchema = new mongoose.Schema({
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
    enum: ['Security Awareness', 'Privacy Training', 'Compliance', 'IT Security', 'General']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimatedDuration: {
    type: Number, // in minutes
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  assignedRoles: [{
    type: String,
    enum: ['admin', 'manager', 'employee']
  }],
  assignedDepartments: [{
    type: String
  }],
  assignedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  content: {
    modules: [{
      title: String,
      description: String,
      order: Number,
      contentType: {
        type: String,
        enum: ['text', 'video', 'document', 'interactive']
      },
      content: String, // HTML content or file URL
      fileUrl: String,
      duration: Number // in minutes
    }]
  },
  quiz: {
    enabled: {
      type: Boolean,
      default: true
    },
    passingScore: {
      type: Number,
      default: 80
    },
    maxAttempts: {
      type: Number,
      default: 3
    },
    timeLimit: {
      type: Number // in minutes
    },
    questions: [{
      question: String,
      type: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'multiple-select']
      },
      options: [String],
      correctAnswers: [Number], // indices of correct options
      explanation: String,
      points: {
        type: Number,
        default: 1
      }
    }]
  },
  certificate: {
    enabled: {
      type: Boolean,
      default: true
    },
    template: String, // Certificate template URL
    validFor: {
      type: Number, // days
      default: 365
    }
  },
  deadline: {
    type: Date
  },
  autoAssign: {
    type: Boolean,
    default: false
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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

// Indexes
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });
courseSchema.index({ status: 1, createdAt: -1 });
courseSchema.index({ assignedRoles: 1, assignedDepartments: 1 });

// Update timestamps
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add pagination plugin
courseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Course', courseSchema);
