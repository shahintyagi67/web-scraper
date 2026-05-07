const mongoose = require('mongoose');

const storySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    postedAt: {
      type: String,
      required: true,
    },
    hackerNewsId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Story', storySchema);
