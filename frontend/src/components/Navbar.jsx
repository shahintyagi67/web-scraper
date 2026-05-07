import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/" className="nav-logo">
        <span style={{ color: '#6366f1' }}>⚡</span> ScraperNews
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {userInfo ? (
          <>
            <Link to="/bookmarks">Bookmarks</Link>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Hi, {userInfo.username}
            </span>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
