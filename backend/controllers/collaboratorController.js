const Collaborator = require('../models/Collaborator');

// @desc    Get all collaborators
// @route   GET /api/collaborators
// @access  Public
exports.getCollaborators = async (req, res) => {
  try {
    // Build query
    let query;
    
    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    // Delete fields from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Base query from filters
    let queryObj = JSON.parse(queryStr);
    
    // Default to isActive true for public API
    if (!req.user || (req.user && req.user.role !== 'admin')) {
      queryObj.isActive = true;
    }
    
    // Finding resources
    query = Collaborator.find(queryObj);
    
    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('order');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Collaborator.countDocuments(queryObj);
    
    query = query.skip(startIndex).limit(limit);
    
    // Execute query
    const collaborators = await query;
    
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: collaborators.length,
      pagination,
      total,
      data: collaborators
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single collaborator
// @route   GET /api/collaborators/:id
// @access  Public
exports.getCollaborator = async (req, res) => {
  try {
    const collaborator = await Collaborator.findById(req.params.id);
    
    if (!collaborator) {
      return res.status(404).json({
        success: false,
        message: 'Collaborator not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: collaborator
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new collaborator
// @route   POST /api/collaborators
// @access  Private (Admin)
exports.createCollaborator = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }
    
    // Create with default values for optional fields if needed
    const collaboratorData = {
      name: req.body.name,
      logo: req.body.logo || '',
      website: req.body.website || '',
      description: req.body.description || '',
      order: req.body.order || 0,
      isActive: typeof req.body.isActive === 'boolean' ? req.body.isActive : true
    };
    
    const collaborator = await Collaborator.create(collaboratorData);
    
    res.status(201).json({
      success: true,
      data: collaborator
    });
  } catch (error) {
    console.error('Error creating collaborator:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating collaborator'
    });
  }
};

// @desc    Update collaborator
// @route   PUT /api/collaborators/:id
// @access  Private (Admin)
exports.updateCollaborator = async (req, res) => {
  try {
    let collaborator = await Collaborator.findById(req.params.id);
    
    if (!collaborator) {
      return res.status(404).json({
        success: false,
        message: 'Collaborator not found'
      });
    }
    
    // Prepare update data with defaults for missing fields
    const updateData = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.logo !== undefined) updateData.logo = req.body.logo;
    if (req.body.website !== undefined) updateData.website = req.body.website;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.order !== undefined) updateData.order = req.body.order;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;
    
    collaborator = await Collaborator.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: collaborator
    });
  } catch (error) {
    console.error('Error updating collaborator:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating collaborator'
    });
  }
};

// @desc    Delete collaborator
// @route   DELETE /api/collaborators/:id
// @access  Private (Admin)
exports.deleteCollaborator = async (req, res) => {
  try {
    const collaborator = await Collaborator.findById(req.params.id);
    
    if (!collaborator) {
      return res.status(404).json({
        success: false,
        message: 'Collaborator not found'
      });
    }
    
    await collaborator.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Seed default collaborators
// @access  Private (called from server.js)
exports.seedDefaultCollaborators = async () => {
  try {
    const Collaborator = require('../models/Collaborator');
    const count = await Collaborator.countDocuments();
    
    // Only seed if no collaborators exist
    if (count === 0) {
      console.log('Seeding default collaborators...');
      
      const defaultCollaborators = [
        { name: "IGNCA", order: 1 },
        { name: "Sahitya Akademi", order: 2 },
        { name: "Darbhanga Sanskrit University", order: 3 },
        { name: "Bihar Lalit Kala Akademi", order: 4 },
        { name: "Mithila Research Foundation", order: 5 }, 
        { name: "JNU Sanskrit Dept.", order: 6 },
        { name: "Nalanda Studies Centre", order: 7 }, 
        { name: "Cultural Forum Delhi", order: 8 },
        { name: "Academy of Mithila Art", order: 9 },
      ];
      
      await Collaborator.insertMany(defaultCollaborators);
      console.log('Default collaborators created successfully');
    }
  } catch (error) {
    console.error('Error seeding collaborators:', error);
  }
}; 