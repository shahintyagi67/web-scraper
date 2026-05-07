import { useState, useEffect, useContext } from 'react';
import API from '../api/axios';
import StoryCard from '../components/StoryCard';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/stories?page=${page}&limit=10`);
        setStories(data.stories);
        setPages(data.pages);

        if (userInfo) {
          const { data: bookmarkData } = await API.get('/stories/bookmarks');
          setUserBookmarks(bookmarkData.map(b => b._id));
        }
      } catch (err) {
        setError('Failed to fetch stories');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, userInfo]);

  const handleScrape = async () => {
    try {
      await API.post('/scrape');
      setPage(1); // Reset to page 1 to see new stories
      window.location.reload(); // Simple way to refresh data
    } catch (err) {
      alert('Manual scrape failed');
    }
  };

  if (loading) return <div className="loading">Loading stories...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Top Stories</h1>
          <p style={{ color: 'var(--text-muted)' }}>Latest updates from Hacker News</p>
        </div>
        <button className="btn btn-outline" onClick={handleScrape}>
          🔄 Trigger Scrape
        </button>
      </div>

      {error && <div style={{ color: '#ef4444', marginTop: '2rem' }}>{error}</div>}

      <div className="story-grid">
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            initialBookmarked={userBookmarks.includes(story._id)}
          />
        ))}
      </div>

      {stories.length === 0 && (
        <div className="empty-state glass">
          <p>No stories found. Try triggering a scrape!</p>
        </div>
      )}

      {pages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </button>
          {[...Array(pages).keys()].map((p) => (
            <button
              key={p + 1}
              className={`pagination-btn ${page === p + 1 ? 'active' : ''}`}
              onClick={() => setPage(p + 1)}
            >
              {p + 1}
            </button>
          ))}
          <button
            className="pagination-btn"
            disabled={page === pages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
