import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip,
  Tabs,
  Tab,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Rating,
  Paper,
  CardActionArea,
  CardActions,
  Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportIcon from '@mui/icons-material/Support';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BuyMedicine = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const pesticideImages = {
    Fungicide: [
      '/images/pesticide-1.jpg',
      '/images/pesticide-2.jpg',
      '/images/pesticide-3.jpg'
    ],
    Pesticide: [
      '/images/pesticide-4.jpg',
      '/images/pesticide-5.jpg',
      '/images/pesticide-6.jpg'
    ],
    'Growth Enhancer': [
      '/images/pesticide-7.jpg',
      '/images/pesticide-8.jpg',
      '/images/pesticide-1.jpg'
    ],
    Nutrient: [
      '/images/pesticide-2.jpg',
      '/images/pesticide-3.jpg',
      '/images/pesticide-4.jpg'
    ],
    Organic: [
      '/images/pesticide-5.jpg',
      '/images/pesticide-6.jpg',
      '/images/pesticide-7.jpg'
    ],
    Herbicide: [
      '/images/pesticide-8.jpg',
      '/images/pesticide-1.jpg',
      '/images/pesticide-2.jpg'
    ],
    Insecticide: [
      '/images/pesticide-3.jpg',
      '/images/pesticide-4.jpg',
      '/images/pesticide-5.jpg'
    ],
    Biological: [
      '/images/pesticide-6.jpg',
      '/images/pesticide-7.jpg',
      '/images/pesticide-8.jpg'
    ],
    'Soil Treatment': [
      '/images/pesticide-1.jpg',
      '/images/pesticide-2.jpg',
      '/images/pesticide-3.jpg'
    ]
  };

  const getRandomImage = (category) => {
    const images = pesticideImages[category] || pesticideImages.Pesticide;
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const medicines = [
    {
      id: 1,
      name: 'BioShield Fungicide',
      description: 'Advanced systemic fungicide for comprehensive protection against leaf spot, powdery mildew, and rust diseases. Safe for organic farming.',
      price: 1299.99,
      image: getRandomImage('Fungicide'),
      category: 'Fungicide',
      rating: 4.5,
      stock: 50,
      benefits: ['Long-lasting protection', 'Safe for beneficial insects', 'Rainfast after 2 hours']
    },
    {
      id: 2,
      name: 'CropGuard Pro',
      description: 'Premium broad-spectrum pesticide with advanced formulation for maximum pest control. Effective against multiple insect species.',
      price: 1499.99,
      image: getRandomImage('Pesticide'),
      category: 'Pesticide',
      rating: 4.8,
      stock: 35,
      benefits: ['Fast-acting formula', 'Residual protection', 'Crop-specific solutions']
    },
    {
      id: 3,
      name: 'GrowthMax Plus',
      description: 'Complete plant growth enhancer with essential micronutrients. Promotes root development and increases yield potential.',
      price: 899.99,
      image: getRandomImage('Growth Enhancer'),
      category: 'Growth Enhancer',
      rating: 4.6,
      stock: 60,
      benefits: ['Balanced nutrition', 'Enhanced flowering', 'Improved fruit set']
    },
    {
      id: 4,
      name: 'NutriBlend Complete',
      description: 'Comprehensive nutrient solution with NPK and essential micronutrients. Optimized for various crop types and growth stages.',
      price: 799.99,
      image: getRandomImage('Nutrient'),
      category: 'Nutrient',
      rating: 4.7,
      stock: 45,
      benefits: ['Complete nutrition', 'Easy absorption', 'pH balanced']
    },
    {
      id: 5,
      name: 'Organic Shield',
      description: '100% natural pest control solution made from neem and other botanical extracts. Certified organic and safe for all crops.',
      price: 699.99,
      image: getRandomImage('Organic'),
      category: 'Organic',
      rating: 4.4,
      stock: 40,
      benefits: ['Certified organic', 'No chemical residues', 'Safe for pollinators']
    },
    {
      id: 6,
      name: 'WeedMaster Pro',
      description: 'Advanced herbicide for effective weed control in large agricultural areas. Selective action protects your main crops.',
      price: 1599.99,
      image: getRandomImage('Herbicide'),
      category: 'Herbicide',
      rating: 4.5,
      stock: 30,
      benefits: ['Selective control', 'Long-lasting effect', 'Rain resistant']
    },
    {
      id: 7,
      name: 'InsectGuard Granules',
      description: 'Long-lasting soil-applied insecticide granules for protection against soil-dwelling pests. Ideal for root protection.',
      price: 1199.99,
      image: getRandomImage('Insecticide'),
      category: 'Insecticide',
      rating: 4.6,
      stock: 55,
      benefits: ['Soil protection', 'Extended control', 'Easy application']
    },
    {
      id: 8,
      name: 'BioControl Plus',
      description: 'Beneficial insects and microorganisms for natural pest management. Sustainable solution for integrated pest management.',
      price: 999.99,
      image: getRandomImage('Biological'),
      category: 'Biological',
      rating: 4.7,
      stock: 25,
      benefits: ['Natural control', 'Sustainable solution', 'No resistance issues']
    },
    {
      id: 9,
      name: 'SoilCare Premium',
      description: 'Comprehensive soil treatment solution for disease prevention and soil health improvement. Contains beneficial microbes.',
      price: 899.99,
      image: getRandomImage('Soil Treatment'),
      category: 'Soil Treatment',
      rating: 4.8,
      stock: 40,
      benefits: ['Soil health', 'Disease prevention', 'Microbial activity']
    }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(medicineId);
      return;
    }
    setCart(cart.map(item =>
      item.id === medicineId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    // Show success message
    setShowSuccessMessage(true);
    // Clear the cart
    setCart([]);
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  // Get unique categories for tabs
  const categories = ['all', ...new Set(medicines.map(medicine => medicine.category))];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          my: 4, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2
        }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: '#ffffff'
            }}
          >
            {t('buyMedicine.title')}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 4
          }}>
            <Paper elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#E8F5E9' }}>
              <LocalShippingIcon color="success" />
              <Typography>Free Shipping</Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#E8F5E9' }}>
              <VerifiedIcon color="success" />
              <Typography>Genuine Products</Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#E8F5E9' }}>
              <SupportIcon color="success" />
              <Typography>Expert Support</Typography>
            </Paper>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder={t('buyMedicine.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>{t('buyMedicine.categories.title')}</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label={t('buyMedicine.categories.title')}
                  sx={{
                    borderRadius: '12px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="all">{t('buyMedicine.categories.all')}</MenuItem>
                  <MenuItem value="Fungicide">{t('buyMedicine.categories.fungicide')}</MenuItem>
                  <MenuItem value="Pesticide">{t('buyMedicine.categories.pesticide')}</MenuItem>
                  <MenuItem value="Growth Enhancer">{t('buyMedicine.categories.growth_enhancer')}</MenuItem>
                  <MenuItem value="Nutrient">{t('buyMedicine.categories.nutrient')}</MenuItem>
                  <MenuItem value="Organic">{t('buyMedicine.categories.organic')}</MenuItem>
                  <MenuItem value="Herbicide">{t('buyMedicine.categories.herbicide')}</MenuItem>
                  <MenuItem value="Insecticide">{t('buyMedicine.categories.insecticide')}</MenuItem>
                  <MenuItem value="Biological">{t('buyMedicine.categories.biological')}</MenuItem>
                  <MenuItem value="Soil Treatment">{t('buyMedicine.categories.soil_treatment')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          {filteredMedicines.map((medicine) => (
            <Grid item xs={12} sm={6} md={4} key={medicine.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={medicine.image}
                    alt={medicine.name}
                    sx={{ 
                      objectFit: 'contain', 
                      p: 2, 
                      bgcolor: '#f5f5f5',
                      height: '200px',
                      width: '100%'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip 
                      label={medicine.category}
                      color="primary"
                      size="small"
                      sx={{ 
                        mb: 1,
                        fontWeight: 'bold',
                        backgroundColor: '#1976d2',
                        color: 'white'
                      }}
                    />
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#1a237e',
                        mb: 1
                      }}
                    >
                      {medicine.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={medicine.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({medicine.rating})
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        lineHeight: 1.6,
                        color: '#424242'
                      }}
                    >
                      {medicine.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {medicine.benefits.map((benefit, index) => (
                        <Chip 
                          key={index} 
                          label={benefit} 
                          size="small" 
                          sx={{ 
                            bgcolor: '#E8F5E9',
                            color: '#2E7D32',
                            fontWeight: 'medium',
                            '&:hover': {
                              bgcolor: '#C8E6C9',
                            },
                          }}
                        />
                      ))}
                    </Box>
                    <Typography 
                      variant="h5" 
                      color="primary" 
                      sx={{ 
                        fontWeight: 'bold', 
                        mb: 1,
                        color: '#d32f2f'
                      }}
                    >
                      ₹{medicine.price.toFixed(2)}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: medicine.stock > 10 ? '#2E7D32' : '#d32f2f',
                        fontWeight: 'medium'
                      }}
                    >
                      {medicine.stock > 10 ? 'In Stock' : `Only ${medicine.stock} left`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(medicine)}
                    startIcon={<AddIcon />}
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1565c0'
                      }
                    }}
                  >
                    {t('buyMedicine.add_to_cart')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Cart Summary Section */}
        {cart.length > 0 && (
          <Box sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#1a237e' }}>
                Your Cart Summary
              </Typography>
              <List>
                {cart.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              ₹{item.price.toFixed(2)} x {item.quantity}
                            </Typography>
                            <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                              = ₹{(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            sx={{ color: '#1976d2' }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ minWidth: '30px', textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            sx={{ color: '#1976d2' }}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                  Total: ₹{getTotalPrice().toFixed(2)}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0'
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Box>
        )}

        {/* Success Message */}
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={6000}
          onClose={handleCloseSuccessMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSuccessMessage} 
            severity="success" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            Thank you for your purchase! Your order has been placed successfully.
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
};

export default BuyMedicine; 