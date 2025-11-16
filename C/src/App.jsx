import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Hardcode valid credentials for testing
const VALID_USERS = [
  {email: 'test@example.com', password: 'Test123!'},
  {email: 'admin@example.com', password: 'Admin456#'},
  {email: 'user@example.com', password: 'User789$'}
];

function App() {
  // State management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  /**
   * Validates email field
   * Checks if email is not empty and exists in our valid users list
   */
  const validateEmail = (emailValue) => {
    if (!emailValue.trim()) {
      return 'Email is required.';
    }

    const emailExists = VALID_USERS.some(user => user.email === emailValue);
    if (!emailExists) {
      return 'This email does not exist. Please try: test@example.com';
    }

    return '';
  };

  /**
   * Validates password field
   * Requirements: 8-16 characters, uppercase, lowercase, number, symbol
   */
  const validatePassword = (passwordValue) => {
    if (!passwordValue) {
      return 'Password is Required.';
    }
    
    if (passwordValue.length < 8 || passwordValue.length > 16) {
      return 'Password must be between 8-16 characters.'
    }

    const hasUppercase = /[A-Z]/.test(passwordValue);
    const hasLowercase = /[a-z]/.test(passwordValue);
    const hasNumber = /[0-9]/.test(passwordValue);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordValue);

    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter.'
    }
    if (!hasLowercase) {
      return 'Password must contain at least one lowercase letter.'
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSymbol) {
      return 'Password must contain at least one symbol.'
    }

    return '';
  }

  /**
   * Checks if the email and password combination is correct
   */
  
  const checkCredentials = (emailValue, passwordValue) => {
    const user = VALID_USERS.find(user => user.email === emailValue);

    if (user && user.password !== passwordValue) {
      return 'Incorrect password. Please try again.';
    }

    return '';
  }

  /**
   * Handles from submission
   * Validates all fields and performs login if valid
   */

  const handleSubmit = (e) => {
    e.preventDefault(); // stops the page from reloading

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    const emailErr = validateEmail(email);
    if (emailErr) {
      setEmailError(emailErr);
      return;
    }

    // Validate password format
    const passwordErr = validatePassword(password);
    if (passwordErr) {
      setPasswordError(passwordErr);
      return;
    }

    // Check if credentials match
    const credentialErr = checkCredentials(email, password);
    if (credentialErr) {
      setPasswordError(credentialErr);
      return;
    }

    // Login successful - store email and show welcome message
    setLoggedInEmail(email);
    setIsLoggedIn(true);
  }

  /**
   * Handles logout action
   * Resets all state and returns to login form
   */

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInEmail('');
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  };

  // If logged in, show welcome message with user email
  if (isLoggedIn) {
    return (
      <div className="container">
        <div className="login-card">
          <div className="welcome-screen">
            <div className="success-icon">✓</div>
            <h1 className='welcome-title'>Welcome!</h1>
            <p className='welcome-email'>{loggedInEmail}</p>
            <button
              className="loggout-button"
              onClick={handleLogout}
            >Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show login form
  return (
    <div className="container">
      <div className="login-card">
        <h2>Login</h2>
        <p className="subtitle">Please enter your credentials</p>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              className={emailError ? 'error' : ''}
              placeholder='Enter your email'
            />
            {emailError && (
              <div className="error-message">{emailError}</div>
            )}
          </div>
          
          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              className={passwordError ? 'error' : ''}
              placeholder='Enter your password'
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
            <div className="password-requirements">
              Password must contain:
              <ul>
                <li>8-16 characters</li>
                <li>One uppercase & lowercase letter</li>
                <li>One number & one symbol</li>
              </ul>
            </div>
          </div>

          {/*Login Button*/}
          <button type="submit" className="login-button">
            Login
          </button>

          {/* Forget Password Link */}
          <div className="forget-password">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Forget password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App
