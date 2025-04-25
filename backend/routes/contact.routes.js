const express = require('express');
const { 
  submitContact,
  getAllContacts, 
  getContact, 
  updateContact, 
  deleteContact 
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/', submitContact);

// Admin protected routes
router.get('/', protect, authorize('admin'), getAllContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id', protect, authorize('admin'), updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router; 