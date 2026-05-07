import { useState, useContext } from 'react';
import API from '../api/axios';
import AuthContext from '../context/AuthContext';

const StoryCard = ({ story, initialBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const { userInfo } = useContext(AuthContext);

  const toggleBookmark = async () => {
    if (!userInfo) {
      alert('Please login to bookmark stories');
      return;
    }

    try {
      const { data } = await API.post(`/stories/${story._id}/bookmark`);
      setIsBookmarked(data.isBookmarked);
    } catch (error) {
      console.error('Bookmark failed', error);
    }
  };

  return (
    <div className="story-card glass animate-fade-in">
      <div>
        <a href={story.url} target="_blank" rel="noopener noreferrer" className="story-title">
          {story.title}
        </a>
        <div className="story-info">
          <span className="story-meta">👤 {story.author}</span>
          <span className="story-meta">⭐️ {story.points} points</span>
          <span className="story-meta">⏰ {story.postedAt}</span>
        </div>
      </div>

      <div className="story-footer">
        <button
          className={`btn ${isBookmarked ? 'btn-primary' : 'btn-outline'}`}
          onClick={toggleBookmark}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
        >
          {isBookmarked ? '🔖 Bookmarked' : '📑 Bookmark'}
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
