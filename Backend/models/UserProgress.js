const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed', 'failed'],
    default: 'not-started'
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  timeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  moduleProgress: [{
    moduleId: mongoose.Schema.Types.ObjectId,
    completed: Boolean,
    completedAt: Date,
    timeSpent: Number
  }],
  quizAttempts: [{
    attemptNumber: Number,
    startedAt: Date,
    completedAt: Date,
    score: Number,
    passed: Boolean,
    answers: [{
      questionId: mongoose.Schema.Types.ObjectId,
      selectedAnswers: [Number],
      isCorrect: Boolean
    }],
    timeSpent: Number
  }],
  currentModule: {
    type: Number,
    default: 0
  },
  isOverdue: {
    type: Boolean,
    default: false
  },
  reminderSent: [{
    sentAt: Date,
    type: {
      type: String,
      enum: ['initial', 'reminder', 'escalation', 'overdue']
    }
  }],
  deadline: {
    type: Date
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

// Compound index
userProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
userProgressSchema.index({ userId: 1, status: 1 });
userProgressSchema.index({ courseId: 1, status: 1 });
userProgressSchema.index({ deadline: 1, status: 1 });

// Update timestamps
userProgressSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UserProgress', userProgressSchema);

