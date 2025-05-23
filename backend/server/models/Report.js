const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: [true, 'Location coordinates are required']
    },
    address: {
      type: String,
      required: [true, 'Address is required']
    }
  },
  ward: {
    type: String,
    required: [true, 'Ward information is required']
  },
  images: [{
    url: String,
    public_id: String
  }],
  status: {
    type: String,
    enum: ['pending', 'verified', 'in-progress', 'completed', 'rejected'],
    default: 'pending'
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  upvotes: {
    type: Number,
    default: 0
  },
  upvotedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['pending', 'verified', 'in-progress', 'completed', 'rejected']
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  estimatedCompletionDate: Date,
  actualCompletionDate: Date
}, {
  timestamps: true
});

// Index for geospatial queries
reportSchema.index({ location: '2dsphere' });

// Method to add status update
reportSchema.methods.addStatusUpdate = function(status, userId, comment) {
  this.statusHistory.push({
    status,
    updatedBy: userId,
    comment,
    timestamp: new Date()
  });
  this.status = status;
  
  if (status === 'completed') {
    this.actualCompletionDate = new Date();
  }
};

const Report = mongoose.model('Report', reportSchema);

module.exports = Report; 