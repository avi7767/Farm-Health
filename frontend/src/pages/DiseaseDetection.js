import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  CardMedia,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BugReportIcon from '@mui/icons-material/BugReport';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PredictionResult from '../components/PredictionResult';
import '../styles/pages.css';
import DeleteIcon from '@mui/icons-material/Delete';

// Import example images
import healthyPlantImage from '../assets/images (8).jpeg.jpg';
import diseasedPlantImage from '../assets/images (10).jpeg.jpg';

// Define API URL
const API_URL = 'http://localhost:5000';

// Example images array
const exampleImages = [
  {
    src: healthyPlantImage,
    alt: 'Healthy Plant',
    description: 'healthy_plant_example'
  },
  {
    src: diseasedPlantImage,
    alt: 'Diseased Plant',
    description: 'diseased_plant_example'
  }
];

const DiseaseDetection = () => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [aiStatus, setAiStatus] = useState(null);
  const [testingAi, setTestingAi] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    testAiConnection();
  }, []);

  const testAiConnection = async () => {
    setTestingAi(true);
    try {
      const response = await fetch(`${API_URL}/api/test-ai`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setAiStatus({ success: true, message: t('diseaseDetection.ai_status_success') });
      } else {
        setAiStatus({ success: false, message: data.message || t('diseaseDetection.ai_status_generic_error') });
      }
    } catch (err) {
      setAiStatus({ success: false, message: t('diseaseDetection.ai_status_failed') });
    } finally {
      setTestingAi(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setPrediction(null);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
    setPrediction(null);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError(t('diseaseDetection.noImageSelected'));
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('language', i18n.language === 'hi' ? 'Hindi' : i18n.language === 'te' ? 'Telugu' : 'English');

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(t('diseaseDetection.predictionError'));
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction({
        disease: data.disease,
        confidence: data.confidence,
        treatment: data.treatment
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 6, pt: 4, position: 'relative' }}>
          <div className="decoration-circle decoration-circle-1" />
          <div className="decoration-circle decoration-circle-2" />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            className="hero-gradient"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 4,
              color: '#ffffff'
            }}
          >
            {t('diseaseDetection.title')}
          </Typography>

          <Paper
            elevation={3}
            className="detection-container"
            sx={{
              p: 4,
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box
                  className="upload-area"
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                  />
                  <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
                    {t('diseaseDetection.uploadImage')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#000000' }}>
                    {t('diseaseDetection.dragDrop')}
                  </Typography>
                </Box>

                {previewUrl && (
                  <Box
                    className="preview-image fade-in"
                    sx={{
                      mt: 3,
                      position: 'relative',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={previewUrl}
                      alt={t('diseaseDetection.selectedImage')}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />
                    <Button
                      className="delete-button"
                      onClick={handleDeleteImage}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        minWidth: 'auto',
                        p: 1,
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                )}

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button
                    className="gradient-button"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!selectedImage || loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      background: loading
                        ? theme.palette.grey[400]
                        : 'linear-gradient(45deg, #2E7D32 30%, #81C784 90%)',
                      '&:hover': {
                        background: loading
                          ? theme.palette.grey[400]
                          : 'linear-gradient(45deg, #81C784 30%, #2E7D32 90%)',
                      },
                    }}
                  >
                    {loading ? t('diseaseDetection.analyzing') : t('diseaseDetection.analyze')}
                  </Button>
                </Box>

                {aiStatus && (
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Chip
                      icon={aiStatus.success ? <VerifiedIcon /> : <BugReportIcon />}
                      label={aiStatus.message}
                      color={aiStatus.success ? 'success' : 'error'}
                      sx={{ fontSize: '1rem', py: 2, height: 'auto' }}
                    />
                  </Box>
                )}

                {error && (
                  <Box sx={{ mt: 3 }}>
                    <ErrorMessage message={error} />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#000000' }}>
                    {t('diseaseDetection.result.title')}
                  </Typography>

                  {prediction ? (
                    <PredictionResult
                      prediction={{
                        disease: prediction.disease,
                        confidence: prediction.confidence,
                        treatment: prediction.treatment
                      }}
                      onRetry={handleDeleteImage}
                    />
                  ) : (aiStatus?.success && !selectedImage && !error) ? (
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2, color: '#000000' }}>
                        {t('diseaseDetection.example_images')}
                      </Typography>
                      <Grid container spacing={2}>
                        {exampleImages.map((example, index) => (
                          <Grid item xs={6} key={index}>
                            <Card>
                              <CardMedia
                                component="img"
                                height="140"
                                image={example.src}
                                alt={example.alt}
                              />
                              <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                  {t(`diseaseDetection.${example.description}`)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                       <Box sx={{ mt: 4 }}>
                         <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#000000' }}>
                            {t('diseaseDetection.tips_title')}
                          </Typography>
                          <Card sx={{ p: 2 }}>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                              <li>{t('diseaseDetection.tip_clear_photos')}</li>
                              <li>{t('diseaseDetection.tip_focus_diseased')}</li>
                              <li>{t('diseaseDetection.tip_not_blurry')}</li>
                              <li>{t('diseaseDetection.tip_multiple_angles')}</li>
                            </ul>
                          </Card>
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body1" sx={{ color: '#000000' }}>
                       {t('diseaseDetection.no_image_selected_or_ai_down')}
                    </Typography>
                  )}

                  {prediction && (
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Button
                        variant="outlined"
                        onClick={handleDeleteImage}
                        startIcon={<RefreshIcon />}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderRadius: '8px'
                        }}
                      >
                        {t('diseaseDetection.result.retry')}
                      </Button>
                    </Box>
                  )}

                   {!prediction && selectedImage && !loading && !error && aiStatus?.success && (
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Button
                        variant="outlined"
                         onClick={handleDeleteImage}
                        startIcon={<RefreshIcon />}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderRadius: '8px'
                        }}
                      >
                        {t('diseaseDetection.back_to_upload')}
                      </Button>
                    </Box>
                  )}

                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default DiseaseDetection;