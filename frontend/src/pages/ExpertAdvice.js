import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ExpertAdvice = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    city: '',
    cropType: '',
    soilType: ''
  });
  const [advice, setAdvice] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const soilTypes = [
    'Sandy',
    'Clay',
    'Loamy',
    'Silt',
    'Peaty',
    'Chalky',
  ];

  const cropTypes = [
    'Rice',
    'Wheat',
    'Maize',
    'Sugarcane',
    'Cotton',
    'Soybean',
    'Potato',
    'Tomato',
    'Onion',
    'Other',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAdvice('');

    try {
      const response = await axios.post('http://localhost:5000/api/expert-advice', {
        ...formData,
        language: i18n.language
      });
      setAdvice(response.data.advice);
      setWeather(response.data.weather);
      toast.success('Advice generated successfully!');
    } catch (err) {
      console.error('Error getting advice:', err);
      setError(t('expertAdvice.error'));
      toast.error('Error getting advice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          {t('expertAdvice.title')}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('city_name')}
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label={t('crop_type')}
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleInputChange}
                  required
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  {cropTypes.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label={t('soil_type')}
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  required
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  {soilTypes.map((soil) => (
                    <option key={soil} value={soil}>
                      {soil}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <AgricultureIcon />}
            sx={{ py: 1.5 }}
          >
            {loading ? t('generating_advice') : t('expertAdvice.form.submit')}
          </Button>
        </Box>

        {error && (
          <ErrorMessage message={error} onRetry={() => setError(null)} />
        )}

        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ mt: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('current_weather')}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <ThermostatIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6">{weather.temp}°C</Typography>
                      <Typography variant="body2" color="text.secondary">{t('temperature')}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <WaterDropIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6">{weather.humidity}%</Typography>
                      <Typography variant="body2" color="text.secondary">{t('humidity')}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <AirIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6">{weather.wind_speed} m/s</Typography>
                      <Typography variant="body2" color="text.secondary">{t('wind_speed')}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <CloudIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6">{weather.description}</Typography>
                      <Typography variant="body2" color="text.secondary">{t('conditions')}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {advice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mt: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {t('farming_recommendations')}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography
                component="div"
                sx={{
                  whiteSpace: 'pre-wrap',
                  '& p': { mb: 2 },
                  '& ul': { pl: 3, mb: 2 },
                  '& li': { mb: 1 },
                }}
                dangerouslySetInnerHTML={{ __html: advice.replace(/\n/g, '<br />') }}
              />
            </Paper>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default ExpertAdvice; 