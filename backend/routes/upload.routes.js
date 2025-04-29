const express = require('express');
const { uploadFile, deleteFile } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');
const { collaboratorUpload, generalUpload } = require('../config/cloudinary');

const router = express.Router();

// All routes are admin protected
router.post('/', protect, authorize('admin'), collaboratorUpload.single('file'), uploadFile);
router.post('/general', protect, authorize('admin'), generalUpload.single('file'), uploadFile);
router.delete('/:filename', protect, authorize('admin'), deleteFile);
router.delete('/cloudinary/:publicId', protect, authorize('admin'), deleteFile);

module.exports = router; 