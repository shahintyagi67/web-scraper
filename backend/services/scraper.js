const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
  try {
    const { data } = await axios.get('https://news.ycombinator.com');
    const $ = cheerio.load(data);
    const stories = [];

    $('.athing').slice(0, 10).each((index, element) => {
      const id = $(element).attr('id');
      const title = $(element).find('.titleline > a').text();
      const url = $(element).find('.titleline > a').attr('href');
      
      const subtext = $(element).next();
      const pointsText = subtext.find('.score').text() || '0 points';
      const points = parseInt(pointsText.split(' ')[0]);
      const author = subtext.find('.hnuser').text() || 'N/A';
      const postedAt = subtext.find('.age').attr('title') || subtext.find('.age').text();

      stories.push({
        title,
        url,
        points,
        author,
        postedAt,
        hackerNewsId: id,
      });
    });

    // Upsert stories to avoid duplicates
    for (const story of stories) {
      await Story.findOneAndUpdate(
        { hackerNewsId: story.hackerNewsId },
        story,
        { upsert: true, returnDocument: 'after' }
      );
    }

    console.log('Successfully scraped top 10 stories');
    return stories;
  } catch (error) {
    console.error(`Scraping failed: ${error.message}`);
    throw error;
  }
};

module.exports = { scrapeHackerNews };
