const Story = require('../models/Story');
const User = require('../models/User');

const getStories = async (req, res) => {
  const pageSize = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  try {
    const count = await Story.countDocuments();
    const stories = await Story.find({})
      .sort({ points: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      stories,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (story) {
      res.json(story);
    } else {
      res.status(404).json({ message: 'Story not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const storyId = req.params.id;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(id => id.toString() !== storyId);
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();
    res.json({ 
      isBookmarked: !isBookmarked,
      bookmarks: user.bookmarks 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookmarkedStories = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStories,
  getStoryById,
  toggleBookmark,
  getBookmarkedStories,
};
