const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const Performance = require('../models/Performance');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');
const { memUsers } = require('../services/data.service');

const JWT_SECRET = process.env.JWT_SECRET || 'prepmind_ai_super_secret_jwt_key_2026';

// Helper to sign JWT token
const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id ? user._id.toString() : user.id,
      email: user.email,
      name: user.name,
      goal: user.goal || user.targetGoal || 'Software Engineer'
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Format public user object
const formatUserObj = (user) => ({
  id: user._id ? user._id.toString() : user.id,
  name: user.name,
  email: user.email,
  goal: user.goal || user.targetGoal || 'Software Engineer',
  targetRole: user.targetRole || 'Full Stack Developer',
  skills: user.skills || ['JavaScript', 'Coding', 'Problem Solving'],
  strengths: user.strengths || ['Coding Fundamentals', 'Logical Thinking'],
  weaknesses: user.weaknesses || ['Quantitative Aptitude', 'Mock Interviews']
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const validation = validateRegisterInput(req.body || {});
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors.join(' ')
      });
    }

    const { name, email, password, goal, targetGoal, targetRole } = req.body;
    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = password.trim();
    const userGoal = (goal || targetGoal || 'Software Engineer').trim();

    // Check database connection
    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email already exists. Please log in.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(cleanPassword, salt);

      const newUser = await User.create({
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        goal: userGoal,
        targetRole: targetRole || 'Full Stack Developer'
      });

      // Create initial performance record
      try {
        await Performance.create({ userId: newUser._id });
      } catch (err) {
        console.warn('Non-critical: Performance init warning:', err.message);
      }

      const token = signToken(newUser);
      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        token,
        user: formatUserObj(newUser)
      });
    }

    // In-memory fallback if MongoDB is not connected
    const existingMem = memUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existingMem) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists. Please log in.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(cleanPassword, salt);
    const memUser = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      goal: userGoal,
      targetRole: targetRole || 'Full Stack Developer',
      skills: ['JavaScript', 'Coding', 'Problem Solving']
    };
    memUsers.push(memUser);

    const token = signToken(memUser);
    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: formatUserObj(memUser)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const validation = validateLoginInput(req.body || {});
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors.join(' ')
      });
    }

    const { email, password } = req.body;
    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = password.trim();

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail });
      if (user) {
        const isMatch = await bcrypt.compare(cleanPassword, user.password);
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password.'
          });
        }

        const token = signToken(user);
        return res.json({
          success: true,
          message: 'Logged in successfully!',
          token,
          user: formatUserObj(user)
        });
      }
    }

    // In-memory lookup fallback
    const memUser = memUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!memUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(cleanPassword, memUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = signToken(memUser);
    return res.json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: formatUserObj(memUser)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / invalidate session
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = async (req, res) => {
  return res.json({
    success: true,
    message: 'Logged out successfully.'
  });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.user.id)) {
      const user = await User.findById(req.user.id).select('-password');
      if (user) {
        return res.json({
          success: true,
          user: formatUserObj(user)
        });
      }
    }

    const memUser = memUsers.find(u => u._id === req.user.id);
    if (memUser) {
      return res.json({
        success: true,
        user: formatUserObj(memUser)
      });
    }

    res.json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name || 'Student User',
        email: req.user.email || 'user@example.com',
        goal: req.user.goal || 'Software Engineer',
        targetRole: 'Full Stack Developer',
        skills: ['Coding', 'Problem Solving']
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user preparation goal
// @route   POST /api/auth/goal
// @access  Private / Public
const updateGoal = async (req, res, next) => {
  try {
    const { userId, targetGoal, targetRole, weaknesses, strengths } = req.body || {};
    const effectiveUserId = req.user?.id || userId;
    const newGoal = targetGoal || 'Software Engineer';
    const newRole = targetRole || 'Full Stack Developer';

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(effectiveUserId)) {
      const updatedUser = await User.findByIdAndUpdate(
        effectiveUserId,
        {
          ...(targetGoal && { goal: targetGoal }),
          ...(targetRole && { targetRole }),
          ...(strengths && { strengths }),
          ...(weaknesses && { weaknesses })
        },
        { new: true }
      ).select('-password');

      if (updatedUser) {
        return res.json({
          success: true,
          message: 'Preparation goals updated successfully!',
          user: formatUserObj(updatedUser)
        });
      }
    }

    res.json({
      success: true,
      message: 'Goal settings saved!',
      user: {
        id: effectiveUserId || 'usr_default',
        goal: newGoal,
        targetRole: newRole,
        strengths: strengths || ['Coding Fundamentals', 'Logical Thinking'],
        weaknesses: weaknesses || ['Quantitative Aptitude', 'Mock Interviews']
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateGoal
};
