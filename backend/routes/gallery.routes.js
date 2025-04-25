const express = require('express');
const { 
  getAllGallery, 
  getGallery, 
  createGallery, 
  updateGallery, 
  deleteGallery 
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getAllGallery);
router.get('/:id', getGallery);

// Admin protected routes
router.post('/', protect, authorize('admin'), upload.single('image'), createGallery);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateGallery);
router.delete('/:id', protect, authorize('admin'), deleteGallery);

module.exports = router; 