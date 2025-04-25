const express = require('express');
const { 
  getAllGallery, 
  getGallery, 
  createGallery, 
  updateGallery, 
  deleteGallery,
  getCategories
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getAllGallery);

// Admin protected routes
router.get('/categories', protect, authorize('admin'), getCategories);
router.post('/', protect, authorize('admin'), upload.single('image'), createGallery);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateGallery);
router.delete('/:id', protect, authorize('admin'), deleteGallery);

// This route must be last to avoid conflicts with specific routes like '/categories'
router.get('/:id', getGallery);

module.exports = router; 