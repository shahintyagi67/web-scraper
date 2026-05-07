import { useState, useEffect } from 'react';
import API from '../api/axios';
import StoryCard from '../components/StoryCard';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data } = await API.get('/stories/bookmarks');
        setBookmarks(data);
      } catch (err) {
        setError('Failed to fetch bookmarks');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) return <div className="loading">Loading your bookmarks...</div>;

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your Bookmarks</h1>
      <p style={{ color: 'var(--text-muted)' }}>Stories you've saved for later</p>

      {error && <div style={{ color: '#ef4444', marginTop: '2rem' }}>{error}</div>}

      <div className="story-grid">
        {bookmarks.map((story) => (
          <StoryCard 
            key={story._id} 
            story={story} 
            initialBookmarked={true}
          />
        ))}
      </div>

      {bookmarks.length === 0 && (
        <div className="empty-state glass">
          <p>You haven't bookmarked any stories yet.</p>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
