const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['applied', 'interview', 'offer', 'rejected', 'withdrawn'],
    default: 'applied'
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time'
  },
  location: {
    type: String,
    trim: true
  },
  salary: {
    type: Number,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  requirements: {
    type: String,
    trim: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  interviewDate: {
    type: Date
  },
  followUpDate: {
    type: Date
  },
  source: {
    type: String,
    enum: ['linkedin', 'indeed', 'company-website', 'referral', 'other'],
    default: 'other'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  notes: {
    type: String,
    trim: true
  },
  contactPerson: {
    name: String,
    email: String,
    phone: String
  }
}, {
  timestamps: true
});

jobSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Job', jobSchema);