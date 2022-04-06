import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 155,
    minlength: 5,
    required: true,
    trim: true
  },
  url: {
    type: String,
    maxLength: 255,
    required: true,
    trim: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  categoryName: {
    type: String,
    maxLength: 255,
    required: true,
    index: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.models.Link || mongoose.model("Link", linkSchema);