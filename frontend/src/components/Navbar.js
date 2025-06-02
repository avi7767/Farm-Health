import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import HomeIcon from '@mui/icons-material/Home';
import BugReportIcon from '@mui/icons-material/BugReport';
import PeopleIcon from '@mui/icons-material/People';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';

const navItems = [
  { name: 'home', path: '/', icon: <HomeIcon /> },
  { name: 'disease_detection', path: '/disease-detection', icon: <BugReportIcon /> },
  { name: 'expert_advice', path: '/expert-advice', icon: <PeopleIcon /> },
  { name: 'buy_medicine', path: '/buy-medicine', icon: <LocalPharmacyIcon /> },
  { name: 'farmer_contribution', path: '/farmer-contribution', icon: <AgricultureIcon /> },
  { name: 'about', path: '/about', icon: <InfoIcon /> },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(null);
  const [userMenu, setUserMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser } = useAuth();
  const auth = getAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLanguageClick = (event) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageMenu(null);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    handleLanguageClose();
  };

  const handleUserMenuOpen = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenu(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      handleUserMenuClose();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.name}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={t(`nav.${item.name}`)} />
          </ListItem>
        ))}
        {!currentUser ? (
          <ListItem button onClick={() => {
            navigate('/login');
            setMobileOpen(false);
          }}>
            <ListItemIcon sx={{ color: 'inherit' }}><LoginIcon /></ListItemIcon>
            <ListItemText primary={t('nav.login')} />
          </ListItem>
        ) : (
          <ListItem button onClick={handleLogout}>
             <ListItemIcon sx={{ color: 'inherit' }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary={t('nav.logout')} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: 'primary.main',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            {t('nav.app_name')}
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  color="primary"
                  onClick={() => navigate(item.path)}
                  sx={{
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {t(`nav.${item.name}`)}
                </Button>
              ))}

              {currentUser ? (
                <Tooltip title={currentUser.displayName || currentUser.email || 'User'}>
                  <IconButton onClick={handleUserMenuOpen} sx={{ p: 0 }}>
                    <Avatar alt={currentUser.displayName || 'User'} src={currentUser.photoURL}>
                      {!currentUser.photoURL && <AccountCircle />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  color="primary"
                  onClick={() => navigate('/login')}
                  startIcon={<LoginIcon />}
                >
                  {t('nav.login')}
                </Button>
              )}

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={userMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(userMenu)}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                   <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                   <ListItemText>{t('nav.logout')}</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          )}

          <IconButton
            color="primary"
            onClick={handleLanguageClick}
            sx={{ ml: 2 }}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageMenu}
            open={Boolean(languageMenu)}
            onClose={handleLanguageClose}
          >
            <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageChange('hi')}>हिंदी</MenuItem>
            <MenuItem onClick={() => handleLanguageChange('te')}>తెలుగు</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 