import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import BugReportIcon from '@mui/icons-material/BugReport';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TranslateIcon from '@mui/icons-material/Translate';
import PeopleIcon from '@mui/icons-material/People';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/pages.css';
// Re-import heroImage from constants/images.js
import { heroImage } from '../constants/images';

// Import local images
import diseaseDetectionLocalImage from '../assets/download (2).jpg';
import expertAdviceLocalImage from '../assets/download (1).jpg';
import farmerContributionLocalImage from '../assets/WhatsApp Image 2025-05-29 at 11.46.12_ce4b4064.jpg';
import buyMedicineLocalImage from '../assets/download.jpg'; // Corrected path assumption

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  const features = [
    {
      title: t('home.disease_detection'),
      description: t('home.disease_detection_desc'),
      icon: <BugReportIcon sx={{ fontSize: 40 }} />,
      path: '/disease-detection',
      color: '#4CAF50',
      image: diseaseDetectionLocalImage, // Use imported image
    },
    {
      title: t('home.expert_advice'),
      description: t('home.expert_advice_desc'),
      icon: <AgricultureIcon sx={{ fontSize: 40 }} />,
      path: '/expert-advice',
      color: '#FF9800',
      image: expertAdviceLocalImage, // Use imported image
    },
    {
      title: t('home.farmer_contribution'),
      description: t('home.farmer_contribution_desc'),
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/farmer-contribution',
      color: '#2196F3',
      image: farmerContributionLocalImage, // Use imported image
    },
    {
      title: t('home.buy_medicine'),
      description: t('home.buy_medicine_desc'),
      icon: <LocalPharmacyIcon sx={{ fontSize: 40 }} />,
      path: '/buy-medicine',
      color: '#E91E63',
      image: buyMedicineLocalImage, // Use imported image
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Remove this as we are now importing images directly
  // const featureImages = {
  //   disease_detection: diseaseDetectionImages,
  //   expert_advice: expertAdviceImages,
  //   farmer_contribution: farmerContributionImages,
  //   buy_medicine: buyMedicineImages
  // };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ mb: 10, pt: 4, position: 'relative' }}>
        <div className="decoration-circle decoration-circle-1" />
        <div className="decoration-circle decoration-circle-2" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Chip 
                  label="AI-Powered" 
                  color="primary" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 'bold',
                    px: 1,
                    py: 0.5,
                    '& .MuiChip-label': { px: 1 }
                  }} 
                />
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  className="hero-gradient"
                  sx={{
                    fontWeight: 800,
                    fontSize: isMobile ? '2.5rem' : '3.5rem',
                    lineHeight: 1.2,
                    mb: 2,
                    color: '#4cfa46',
                  }}
                >
                  {t('home.welcome_title')}
                </Typography>
                <Typography
                  variant="h5"
                  paragraph
                  className="fade-in"
                  sx={{ 
                    mb: 4,
                    lineHeight: 1.6,
                    fontWeight: 400,
                    color: '#ffffff',
                  }}
                >
                  {t('home.welcome_description')}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className="gradient-button"
                      size="large"
                      onClick={() => navigate('/disease-detection')}
                      startIcon={<BugReportIcon />}
                      endIcon={<ArrowForwardIcon />}
                    >
                      {t('home.get_started')}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/about')}
                      sx={{ 
                        py: 1.5,
                        px: 3,
                        borderRadius: 2,
                        borderWidth: 2,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        color: '#ffffff',
                        borderColor: '#ffffff',
                        '&:hover': {
                          borderColor: '#ffffff',
                        },
                      }}
                    >
                      {t('home.learn_more')}
                    </Button>
                  </motion.div>
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} className="slide-up">
                  <CheckCircleIcon color="success" />
                  <Typography variant="body1"
                    sx={{
                      color: '#ffffff',
                      fontSize: '1.1rem',
                    }}
                  >
                    {t('home.ready_to_start')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="hero-image-container">
                  {/* Assuming heroImage is still used from images.js or imported locally if preferred */}
                  {/* For now, keeping heroImage as is, as the request was about feature images */}
                  <img
                    src={heroImage}
                    alt={t('home.welcome_title')}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </div>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 10, position: 'relative' }}>
        <div className="decoration-circle decoration-circle-1" style={{ top: '50%', right: '-150px' }} />
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            gutterBottom
            className="hero-gradient"
            sx={{ 
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {t('home.our_features')}
          </Typography>
        </Box>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    className="feature-card"
                    style={{ '--feature-color': feature.color }}
                    onClick={() => feature.path && navigate(feature.path)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={feature.image} // Use the image from the features array
                      alt={feature.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          color: feature.color,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        sx={{ fontWeight: 600, mb: 2, color: '#000000' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1"
                        sx={{
                          color: '#000000',
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Home; 