import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Card,
  CardMedia,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const FarmerContribution = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    diseaseName: '',
    images: []
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  const diseases = [
    'Apple_Apple_scab',
    'Apple_Black_rot',
    'Apple_Cedar_apple_rust',
    'Apple_healthy',
    'Blueberry_healthy',
    'Cherry_Powdery_mildew',
    'Cherry_healthy',
    'Corn_Cercospora_leaf_spot',
    'Corn_Common_rust',
    'Corn_Northern_Leaf_Blight',
    'Corn_healthy',
    'Grape_Black_rot',
    'Grape_Esca',
    'Grape_Leaf_blight',
    'Grape_healthy',
    'Orange_Haunglongbing',
    'Peach_Bacterial_spot',
    'Peach_healthy',
    'Pepper_bell_Bacterial_spot',
    'Pepper_bell_healthy',
    'Potato_Early_blight',
    'Potato_Late_blight',
    'Potato_healthy',
    'Raspberry_healthy',
    'Soybean_healthy',
    'Squash_Powdery_mildew',
    'Strawberry_Leaf_scorch',
    'Strawberry_healthy',
    'Tomato_Bacterial_spot',
    'Tomato_Early_blight',
    'Tomato_Late_blight',
    'Tomato_Leaf_Mold',
    'Tomato_Septoria_leaf_spot',
    'Tomato_Spider_mites',
    'Tomato_Target_Spot',
    'Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato_mosaic_virus',
    'Tomato_healthy'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.diseaseName) {
      setSnackbarMessage('Please select a disease type');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (formData.images.length === 0) {
      setSnackbarMessage('Please upload at least one image');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('diseaseName', formData.diseaseName);
      formData.images.forEach((image, index) => {
        formDataToSend.append(`image${index}`, image);
      });

      const response = await axios.post('http://localhost:5000/api/upload-disease', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSnackbarMessage('Images uploaded successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        diseaseName: '',
        images: []
      });
      setPreviewUrls([]);
    } catch (error) {
      setSnackbarMessage('Error uploading images. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setUploading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <AgricultureIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              letterSpacing: '0.5px'
            }}
          >
            Farmer Contribution          </Typography>
          <Typography 
            variant="subtitle1" 
            paragraph
            sx={{ 
              maxWidth: 600,
              mx: 'auto',
              mb: 4,
              color: '#ffffff',
              fontSize: '1.1rem',
            }}
          >
            Help improve our plant disease detection by contributing images of plant diseases. Your contributions will help farmers worldwide.
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Select Disease Type</InputLabel>
                  <Select
                    value={formData.diseaseName}
                    name="diseaseName"
                    onChange={handleChange}
                    label="Select Disease Type"
                  >
                    {diseases.map((disease) => (
                      <MenuItem key={disease} value={disease}>
                        {disease.replace(/_/g, ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 2 }}
                    >
                      Upload Disease Images
                    </Button>
                  </label>
                  <Typography variant="body2" color="text.secondary">
                    Drag and drop images here or click to select
                  </Typography>
                </Box>
              </Grid>

              {previewUrls.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Selected Images
                  </Typography>
                  <Grid container spacing={2}>
                    {previewUrls.map((url, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="200"
                            image={url}
                            alt={`Preview ${index + 1}`}
                          />
                          <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                            <IconButton
                              color="error"
                              onClick={() => removeImage(index)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={uploading}
                  startIcon={uploading ? <CircularProgress size={20} /> : null}
                >
                  {uploading ? 'Uploading...' : 'Submit Images'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </motion.div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FarmerContribution; 