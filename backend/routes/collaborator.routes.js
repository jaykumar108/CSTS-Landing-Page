const express = require('express');
const {
  getCollaborators,
  getCollaborator,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator
} = require('../controllers/collaboratorController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getCollaborators);
router.get('/:id', getCollaborator);

// Admin protected routes
router.post('/', protect, authorize('admin'), createCollaborator);
router.put('/:id', protect, authorize('admin'), updateCollaborator);
router.delete('/:id', protect, authorize('admin'), deleteCollaborator);

module.exports = router; 