const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: {
    type: String,
    required: [true, 'Job requirements are required']
  },
  salary: {
    type: String,
    trim: true
  },
  applicationLink: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Create index for job search
jobSchema.index({ title: 'text', description: 'text', company: 'text', location: 'text' });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 