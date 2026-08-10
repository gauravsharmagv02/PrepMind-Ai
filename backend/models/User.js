const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6
    },
    goal: {
      type: String,
      default: 'Software Engineer',
      trim: true
    },
    targetRole: {
      type: String,
      default: 'Full Stack Developer',
      trim: true
    },
    skills: {
      type: [String],
      default: ['JavaScript', 'Coding', 'Problem Solving']
    },
    strengths: {
      type: [String],
      default: ['Coding Fundamentals', 'Logical Thinking']
    },
    weaknesses: {
      type: [String],
      default: ['Quantitative Aptitude', 'Mock Interviews']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
