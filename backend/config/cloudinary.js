const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Direct configuration with hardcoded values as fallback, but use environment variables if available
cloudinary.config({
  cloud_name: "dzgr4iqt7",
  api_key: "817248727652271",
  api_secret: "Lw_IyI-21YHvig3AovvVbCbrn3Q"
});

// Create local storage as fallback
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Local storage configuration
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Create storage objects for different upload types
try {
  // Collaborator storage (use Cloudinary if available, otherwise fallback to disk)
  const collaboratorStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'collaborators',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 500, crop: 'limit' }],
      format: 'png'
    }
  });

  // General uploads storage
  const generalStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      format: 'png'
    }
  });

  // Gallery uploads storage
  const galleryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'gallery',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 1200, height: 1200, crop: 'limit' }],
      format: 'png'
    }
  });

  // Create the upload middleware
  const collaboratorUpload = multer({
    storage: collaboratorStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: fileFilter
  });

  const generalUpload = multer({
    storage: generalStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
  });

  const galleryUpload = multer({
    storage: galleryStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
  });

  console.log("Cloudinary configuration successful");

  module.exports = {
    cloudinary,
    collaboratorUpload,
    generalUpload,
    galleryUpload
  };
} catch (error) {
  console.error("Cloudinary configuration error:", error);
  
  // Fallback to local storage if Cloudinary fails
  console.log("Using fallback local storage for uploads");
  
  const localUpload = multer({
    storage: diskStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
  });
  
  module.exports = {
    cloudinary,
    collaboratorUpload: localUpload,
    generalUpload: localUpload,
    galleryUpload: localUpload
  };
} 