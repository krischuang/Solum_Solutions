import { useState } from 'react'
import './App.css'

// These are the test accounts you can use to login
const VALID_USERS = [
  {email: 'test@example.com', password: 'Testtest123!'},
  {email: 'admin@example.com', password: 'Adminadmin456#'},
  {email: 'user@example.com', password: 'Useruser789$'}
];

function App() {
  // Keep track of what the user types in the form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Store any error messages to show the user
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Track whether someone is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  // Check if the email the user entered is valid
  const validateEmail = (emailValue) => {
    // Make sure they actually typed something
    if (!emailValue.trim()) {
      return 'Email is required.';
    }

    // See if this email exists in our list of users
    const emailExists = VALID_USERS.some(user => user.email === emailValue);
    if (!emailExists) {
      return 'This email does not exist. Please try: test@example.com';
    }

    // All good!
    return '';
  };

  // Make sure the password meets all our security requirements
  const validatePassword = (passwordValue) => {
    // First, check if they typed anything at all
    if (!passwordValue) {
      return 'Password is Required.';
    }

    // Password needs to be the right length (not too short, not too long)
    if (passwordValue.length < 8 || passwordValue.length > 16) {
      return 'Password must be between 8-16 characters.'
    }

    // Check for all the different types of characters we need
    const hasUppercase = /[A-Z]/.test(passwordValue);  // Like: A, B, C
    const hasLowercase = /[a-z]/.test(passwordValue);  // Like: a, b, c
    const hasNumber = /[0-9]/.test(passwordValue);     // Like: 1, 2, 3
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordValue);  // Like: !, @, #

    // Tell the user what's missing in their password
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

    // Password looks good!
    return '';
  }

  // Check if the email and password match what we have on file
  const checkCredentials = (emailValue, passwordValue) => {
    // Find the user with this email
    const user = VALID_USERS.find(user => user.email === emailValue);

    // If we found the user but password doesn't match, show an error
    if (user && user.password !== passwordValue) {
      return 'Incorrect password. Please try again.';
    }

    // Everything matches!
    return '';
  }

  // This runs when the user clicks the Login button
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from refreshing

    // Clear out any old error messages
    setEmailError('');
    setPasswordError('');

    // Step 1: Check if the email is valid
    const emailErr = validateEmail(email);
    if (emailErr) {
      setEmailError(emailErr);
      return; // Stop here if there's a problem
    }

    // Step 2: Check if the password is strong enough
    const passwordErr = validatePassword(password);
    if (passwordErr) {
      setPasswordError(passwordErr);
      return; // Stop here if password is weak
    }

    // Step 3: Check if the email and password match
    const credentialErr = checkCredentials(email, password);
    if (credentialErr) {
      setPasswordError(credentialErr);
      return; // Stop here if credentials don't match
    }

    // Success! Log them in and show the welcome screen
    setLoggedInEmail(email);
    setIsLoggedIn(true);
  }

  // This runs when the user clicks the Logout button
  const handleLogout = () => {
    // Clear everything and go back to the login screen
    setIsLoggedIn(false);
    setLoggedInEmail('');
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  };

  // If someone is logged in, show them a welcome message
  if (isLoggedIn) {
    return (
      <div className="container">
        <div className="login-card">
          <div className="welcome-screen">
            <div className="success-icon">✓</div>
            <h1 className='welcome-title'>Welcome!</h1>
            <p className='welcome-email'>{loggedInEmail}</p>
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              <span className="logout-icon">⎋</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If not logged in, show the login form
  return (
    <div className="container">
      <div className="login-card">
        <h2>Login</h2>
        <p className="subtitle">Please enter your credentials</p>
        <form onSubmit={handleSubmit}>

          {/* Email input box */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(''); // Clear error when user starts typing
              }}
              className={emailError ? 'error' : ''}
              placeholder='Enter your email'
            />
            {/* Show error message if there's a problem with email */}
            {emailError && (
              <div className="error-message">{emailError}</div>
            )}
          </div>

          {/* Password input box */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(''); // Clear error when user starts typing
              }}
              className={passwordError ? 'error' : ''}
              placeholder='Enter your password'
            />
            {/* Show error message if there's a problem with password */}
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
            {/* Helpful reminder of password rules */}
            <div className="password-requirements">
              Password must contain:
              <ul>
                <li>8-16 characters</li>
                <li>One uppercase & lowercase letter</li>
                <li>One number & one symbol</li>
              </ul>
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" className="login-button">
            Login
          </button>

          {/* Link for users who forgot their password */}
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
