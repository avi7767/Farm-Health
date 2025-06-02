import React, { useState } from 'react';
import { Container, Box, Typography, Button, Paper, TextField, Divider } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, getAuth } from "firebase/auth";
// Removed: import { initializeApp } from "firebase/app"; // This is now in App.js
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

// Removed: firebaseConfig and initializeApp call - these are now in App.js

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { auth } = useAuth(); // Get auth instance from AuthContext

  const handleGoogleLogin = async () => {
    const currentAuth = getAuth(); // Get auth instance inside the handler
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(currentAuth, provider);
      // Redirect after successful login
      navigate('/'); // Redirect to home page or dashboard
    } catch (error) {
      console.error("Google Login Error:", error);
      setError(error.message);
    }
  };

  const handleEmailPasswordLogin = async () => {
    const currentAuth = getAuth(); // Get auth instance inside the handler
    setError(null);
    try {
      await signInWithEmailAndPassword(currentAuth, email, password);
      // Redirect after successful login
      navigate('/'); // Redirect to home page or dashboard
    } catch (error) {
      console.error("Email/Password Login Error:", error);
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        {/* Email and Password Login */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleEmailPasswordLogin}
          >
            Login with Email
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        {/* Google Login */}
        <Box>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<GoogleIcon />}
            fullWidth
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

      </Paper>
    </Container>
  );
};

export default Login;