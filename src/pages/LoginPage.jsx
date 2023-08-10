import React from 'react';
import { useNavigate  } from 'react-router-dom';

export default function LoginPage() {
  const navigate  = useNavigate ();

  const handleSignUp = () => {
    // Implement sign up logic here
  };

  const handleLogin = () => {
    // Implement login logic here
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
  };

  const handleGitHubLogin = () => {
    // Implement GitHub login logic here
  };

  const handleGuestContinue = () => {
    navigate('/events');
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleGitHubLogin}>Login with GitHub</button>
      <button onClick={handleGuestContinue}>Continue as Guest</button>
    </div>
  );
}