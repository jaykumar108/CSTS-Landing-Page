const Contact = require('../models/Contact');
const Notification = require('../models/Notification');

// @desc    Submit contact form
// @route   POST /api/contacts
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Get IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress
    });

    // Create notification for new contact
    const notification = await Notification.create({
      type: 'contact',
      title: 'New Contact Message',
      message: `New message from ${name}: ${subject}`,
      sourceId: contact._id
    });

    // Emit socket event for real-time notification
    const io = req.app.get('io');
    if (io) {
      io.to('admin-room').emit('new-notification', {
        notification,
        contact
      });
    }

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private (Admin)
exports.getAllContacts = async (req, res) => {
  try {
    // Build query
    let query;
    
    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit', 'search', 'startDate', 'endDate'];
    
    // Delete fields from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Base query from filters
    let queryObj = JSON.parse(queryStr);
    
    // Add date filtering
    if (req.query.startDate || req.query.endDate) {
      queryObj.createdAt = {};
      if (req.query.startDate) {
        queryObj.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        queryObj.createdAt.$lte = new Date(req.query.endDate);
      }
    }
    
    // Add search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      queryObj = {
        ...queryObj,
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { subject: searchRegex },
          { message: searchRegex }
        ]
      };
    }
    
    // Add status filter
    if (req.query.status && req.query.status !== 'all') {
      queryObj.status = req.query.status;
    }
    
    // Finding resources
    query = Contact.find(queryObj);
    
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
      query = query.sort('-createdAt');
    }
    
    // Count total before pagination
    const total = await Contact.countDocuments(queryObj);
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    query = query.skip(startIndex).limit(limit);
    
    // Execute query
    const contacts = await query;
    
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
      count: contacts.length,
      pagination,
      total,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private (Admin)
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private (Admin)
exports.updateContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    // Update contact
    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private (Admin)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    // Remove contact from database
    await contact.deleteOne();
    
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