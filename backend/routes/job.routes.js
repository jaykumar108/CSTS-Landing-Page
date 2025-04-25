const express = require('express');
const { 
  getAllJobs, 
  getJob, 
  createJob, 
  updateJob, 
  deleteJob 
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJob);

// Admin protected routes
router.post('/', protect, authorize('admin'), createJob);
router.put('/:id', protect, authorize('admin'), updateJob);
router.delete('/:id', protect, authorize('admin'), deleteJob);

module.exports = router; 