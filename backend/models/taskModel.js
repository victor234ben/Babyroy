
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    type: {
      type: String,
      enum: ['one-time', 'daily', 'weekly'],
      required: [true, 'Please specify task type'],
    },
    category: {
      type: String,
      enum: ['social', 'content', 'engagement', 'learn', 'other'],
      default: 'other',
    },
    pointsReward: {
      type: Number,
      required: [true, 'Please specify points reward'],
      min: 0,
    },
    requirements: {
      type: String,
      required: [true, 'Please specify task requirements'],
    },
    verificationMethod: {
      type: String,
      enum: [ 'auto', 'link-visit'],
      default: 'auto',
    },
    verificationData: {
      type: String, // Can store URL, social handle, or other data needed for verification
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    taskType: {
      type: String,
      default: "ingame",
      enum: ["ingame", "partners"]
    },
    status: {
      type: String,
      enum: ["available", "pendingClaim"],
      defaullt: "available"
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
