import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTranslation } from 'react-i18next';

const PredictionResult = ({ prediction, onRetry }) => {
  const { t } = useTranslation();

  if (!prediction || typeof prediction !== 'object') {
    return null;
  }

  const { disease, confidence, treatment } = prediction;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mt: 3, 
          backgroundColor: '#ffffff',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#000000', 
              fontWeight: 'bold',
              mb: 2,
              fontSize: '1.2rem'
            }}
          >
            {t('diseaseDetection.result.disease')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#000000',
              fontSize: '1.1rem',
              fontWeight: 'medium'
            }}
          >
            {disease}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#000000', 
              fontWeight: 'bold',
              mb: 2,
              fontSize: '1.2rem'
            }}
          >
            {t('diseaseDetection.result.confidence')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#000000',
              fontSize: '1.1rem',
              fontWeight: 'medium'
            }}
          >
            {confidence.toFixed(2)}%
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#000000', 
              fontWeight: 'bold',
              mb: 2,
              fontSize: '1.2rem'
            }}
          >
            {t('diseaseDetection.result.treatment')}
          </Typography>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              backgroundColor: '#f8f9fa',
              borderRadius: 1
            }}
          >
            <Typography 
              sx={{ 
                color: '#000000',
                fontSize: '1rem',
                lineHeight: 1.6
              }}
            >
              {treatment}
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onRetry}
            startIcon={<RefreshIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '8px',
              px: 4,
              py: 1
            }}
          >
            {t('diseaseDetection.result.retry')}
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default PredictionResult; 