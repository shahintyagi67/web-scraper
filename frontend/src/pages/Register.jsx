import { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(username, email, password);
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container glass animate-fade-in">
      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Join us to save and track your favorite stories</p>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <div className="auth-footer">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Register;
