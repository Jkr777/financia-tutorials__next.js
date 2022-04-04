import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    maxLength: 255,
    required: true,
    index: true,
    lowercase: true,
    trim: true
  },
  info: {
    type: String,
    maxLength: 555,
    minMax: 55,
    required: true,
    lowercase: true,
    trim: true
  },
  imgUrl: {
    type: String,
    maxLength: 255,
    lowercase: true,
    required: true,
    trim: true 
  }
});

module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);