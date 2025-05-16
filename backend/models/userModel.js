
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    first_name: {
      type: String,
      default: ""
    },
    last_name: {
      type: String,
      default: ""
    },
    telegramId: {
      type: String,
      unique: true,
      sparse: true,
    },
    walletAddress: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String,
      default: 'default-avatar.png',
    },
    referralCode: {
      type: String,
      unique: true,
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    points: {
      type: Number,
      default: 0,
    },
    totalEarned: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    totalReferralPoints: {
      type: Number,
      default: 0
    },
    dailyTasksCompleted: {
      type: Number,
      default: 0,
    },
    dailyPointsEarned: {
      type: Number,
      default: 0,
    },
    lastDailyReset: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) {
    return next();
  }

  // Hash password with salt of 12
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual for referral count
userSchema.virtual('referralCount', {
  ref: 'User',
  localField: '_id',
  foreignField: 'referredBy',
  count: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
