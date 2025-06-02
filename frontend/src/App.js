import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // getAnalytics is optional unless you use it
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import theme from './theme';
import './i18n';  // Import i18n configuration
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './context/AuthContext';
import { getAuth } from 'firebase/auth'; // Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvZqTSUGiYnU-8kzbMumpOumkbV84cBMA",
  authDomain: "farm-health-c6458.firebaseapp.com",
  projectId: "farm-health-c6458",
  storageBucket: "farm-health-c6458.firebasestorage.app",
  messagingSenderId: "981724412908",
  appId: "1:981724412908:web:e83f50a3ac49c2e4151ec9",
  measurementId: "G-Y3HJT1JE4R"
};

// Initialize Firebase App once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Auth instance once

// Lazy load components
const Navbar = React.lazy(() => import('./components/Navbar'));
const Footer = React.lazy(() => import('./components/Footer'));
const Home = React.lazy(() => import('./pages/Home'));
const DiseaseDetection = React.lazy(() => import('./pages/DiseaseDetection'));
const ExpertAdvice = React.lazy(() => import('./pages/ExpertAdvice'));
const FarmerContribution = React.lazy(() => import('./pages/FarmerContribution'));
const BuyMedicine = React.lazy(() => import('./pages/BuyMedicine'));
const About = React.lazy(() => import('./pages/About'));
const Login = React.lazy(() => import('./pages/Login'));

// Loading component
const Loading = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

function App() {
  const { i18n } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider auth={auth}> {/* Pass auth instance to AuthProvider */}
          <Suspense fallback={<Loading />}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: 'background.default',
              }}
            >
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/disease-detection" element={<DiseaseDetection />} />
                  <Route path="/expert-advice" element={<ExpertAdvice />} />
                  <Route path="/farmer-contribution" element={<FarmerContribution />} />
                  <Route path="/buy-medicine" element={<BuyMedicine />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Suspense>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App; 