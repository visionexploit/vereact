import React, { useState } from 'react';
import './Login.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'student' // 'student' or 'admin'
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userType', data.userType);

      // Redirect based on user type
      if (data.userType === 'admin') {
        window.location.href = '/admin/dashboard';
      } else if (data.userType === 'student') {
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-modal">
        <h1 className="login-title">Welcome Back</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <div className="input-icon-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
                placeholder="Enter your username"
              />
              <FaEnvelope className="input-icon" />
            </div>
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="input-icon-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              <FaEnvelope className="input-icon" />
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <div className="input-group">
            <label>Login As</label>
            <select 
              name="userType" 
              value={formData.userType} 
              onChange={handleChange}
              className="user-type-select"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-bottom-text">
          Don't have an account? <a href="/signup">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;