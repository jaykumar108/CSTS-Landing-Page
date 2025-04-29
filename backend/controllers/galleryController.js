const Gallery = require('../models/Gallery');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
exports.getAllGallery = async (req, res) => {
  try {
    const query = req.query.isPublished ? { isPublished: true } : {};
    const gallery = await Gallery.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single gallery image
// @route   GET /api/gallery/:id
// @access  Public
exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      });
    }

    res.status(200).json({
      success: true,
      data: gallery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create gallery image
// @route   POST /api/gallery
// @access  Private (Admin)
exports.createGallery = async (req, res) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }
    
    // Log file information for debugging
    console.log('Uploaded file information:', req.file);

    // Ensure we have the required fields from the upload
    if (!req.file.path || !req.file.filename) {
      return res.status(400).json({
        success: false,
        message: 'Image upload failed. Missing file information.',
        fileInfo: req.file
      });
    }

    // Create gallery with image data from Cloudinary
    const gallery = await Gallery.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.file.path,
      cloudinaryId: req.file.filename,
      isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: gallery
    });
  } catch (error) {
    console.error('Gallery creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private (Admin)
exports.updateGallery = async (req, res) => {
  try {
    let gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      });
    }

    // Check if new image was uploaded
    if (req.file) {
      try {
        // Delete previous image from Cloudinary if cloudinaryId exists
        if (gallery.cloudinaryId) {
          console.log(`Attempting to delete previous image: ${gallery.cloudinaryId}`);
          await cloudinary.uploader.destroy(gallery.cloudinaryId);
        }

        // Update with new image data
        req.body.imageUrl = req.file.path;
        req.body.cloudinaryId = req.file.filename;
      } catch (uploadError) {
        console.error('Error handling image update:', uploadError);
        // Continue with the update even if image deletion fails
      }
    }

    // Update gallery
    gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: gallery
    });
  } catch (error) {
    console.error('Gallery update error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      });
    }

    try {
      // Delete image from Cloudinary if cloudinaryId exists
      if (gallery.cloudinaryId) {
        console.log(`Attempting to delete image: ${gallery.cloudinaryId}`);
        await cloudinary.uploader.destroy(gallery.cloudinaryId);
      }
    } catch (deleteError) {
      console.error('Error deleting image from Cloudinary:', deleteError);
      // Continue with gallery deletion even if image deletion fails
    }

    // Remove gallery from database
    await gallery.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Gallery deletion error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all gallery categories
// @route   GET /api/gallery/categories
// @access  Private (Admin)
exports.getCategories = async (req, res) => {
  try {
    // Get all unique categories from the database
    const categories = await Gallery.distinct('category');

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 