const { scrapeHackerNews } = require('../services/scraper');

const triggerScrape = async (req, res) => {
  try {
    const stories = await scrapeHackerNews();
    res.status(200).json({
      message: 'Scrape successful',
      count: stories.length,
      data: stories
    });
  } catch (error) {
    res.status(500).json({ message: 'Scrape failed', error: error.message });
  }
};

module.exports = { triggerScrape };
