const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { cloudinary } = require('../config/cloudinary');

// Create local uploads directory if using local storage as fallback (only in development)
const uploadsDir = path.join(__dirname, '../uploads');
if (process.env.NODE_ENV !== 'production' && !fs.existsSync(uploadsDir)){
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (error) {
    console.log('Could not create uploads directory:', error.message);
  }
}

// Configure storage based on environment
const storage = process.env.NODE_ENV === 'production' 
  ? multer.memoryStorage() 
  : multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadsDir);
      },
      filename: function (req, file, cb) {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
      }
    });

// Set file filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Initialize multer upload for local storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB in bytes
  },
  fileFilter: fileFilter
}).single('file');

// @desc    Upload a file to cloudinary
// @route   POST /api/upload
// @access  Private
exports.uploadFile = (req, res) => {
  try {
    // Verify if we have a file to upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    // If using cloudinary (file comes from multer-storage-cloudinary)
    if (req.file.path && req.file.path.includes('cloudinary')) {
      return res.status(200).json({
        success: true,
        url: req.file.path,
        filename: req.file.filename,
        public_id: req.file.public_id
      });
    }
    
    // If using local storage (file was uploaded by local multer)
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    const filePath = `/uploads/${req.file.filename}`;
    
    res.status(200).json({
      success: true,
      url: `${baseUrl}${filePath}`,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Server error during file upload:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during file upload'
    });
  }
};

// @desc    Delete a file
// @route   DELETE /api/upload/:filename
// @access  Private
exports.deleteFile = async (req, res) => {
  try {
    const { publicId } = req.params;
    
    // Check if we're deleting from cloudinary
    if (publicId && publicId.includes('cloudinary')) {
      // Extract just the public_id part
      const parts = publicId.split('/');
      const actualPublicId = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`.split('.')[0];
      
      const result = await cloudinary.uploader.destroy(actualPublicId);
      
      if (result.result === 'ok') {
        return res.status(200).json({
          success: true,
          message: 'File deleted successfully from Cloudinary'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Failed to delete file from Cloudinary'
        });
      }
    }
    
    // Otherwise assume local file
    const { filename } = req.params;
    
    // Prevent path traversal
    if (filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid filename'
      });
    }
    
    const filePath = path.join(uploadsDir, filename);
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }
      
      // Delete file
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Failed to delete file'
          });
        }
        
        res.status(200).json({
          success: true,
          message: 'File deleted successfully'
        });
      });
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting file'
    });
  }
}; 