import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    maxlength: [255, 'userName cannot be more than 255 characters'],
    minlength: [5, 'userName cannot be smaller than 5 characters'],
    required: true,
    trim: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    trim: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 5,  
    maxlength: 255,
    required: true,
    trim: true
  },  
  role: {
    type: String,
    maxlength: 5,
    default: "user",
  },
  reset_Token: String,
  reset_Token_Expiration_Time: Date
});

userSchema.pre('save', async function(next) {
  if(!this.isModified("password")) return next();
  this.password =  await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.setToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN, { expiresIn: '15h' });
  return token;
};

userSchema.methods.passCheck = async function(pass) {
  const check = await bcrypt.compare(pass, this.password);
  return check;
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);