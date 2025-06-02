import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import ScienceIcon from '@mui/icons-material/Science';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const teamMembers = [
    {
      name: 'Addanki Avinash',
      role: t('team_lead'),
      avatar: '/avatars/team1.jpg',
    },
    {
      name: 'Avula karthik',
      role: t('ml_expert'),
      avatar: '/avatars/team2.jpg',
    },
    {
      name: 'Charan',
      role: t('developer'),
      avatar: '/avatars/team3.jpg',
    },
  ];

  const technologies = [
    {
      name: 'TensorFlow',
      description: t('tensorflow_desc'),
      icon: <ScienceIcon sx={{ fontSize: 40 }} />,
      color: '#FF6F00',
    },
    {
      name: 'React',
      description: t('react_desc'),
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      color: '#61DAFB',
    },
    {
      name: 'Flask',
      description: t('flask_desc'),
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      color: '#000000',
    },
    {
      name: 'Plant Pathology',
      description: t('pathology_desc'),
      icon: <AgricultureIcon sx={{ fontSize: 40 }} />,
      color: '#4CAF50',
    },
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)',
        minHeight: '100vh',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              component="h1"
              align="center"
              gutterBottom
              sx={{
                mb: 2,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {t('title')}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: '1.1rem',
                letterSpacing: '0.5px',
              }}
            >
              {t('description')}
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[8],
                    },
                    background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 3,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -8,
                          left: 0,
                          width: 60,
                          height: 3,
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: 2,
                        },
                      }}
                    >
                      {t('mission')}
                    </Typography>
                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ 
                        lineHeight: 1.8, 
                        mb: 2,
                        fontSize: '1.1rem',
                        color: 'text.primary',
                      }}
                    >
                      {t('mission_text')}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ 
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                        color: 'text.primary',
                      }}
                    >
                      {t('mission_text_2')}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[8],
                    },
                    background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 3,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -8,
                          left: 0,
                          width: 60,
                          height: 3,
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: 2,
                        },
                      }}
                    >
                      {t('team')}
                    </Typography>
                    <Grid container spacing={3}>
                      {teamMembers.map((member, index) => (
                        <Grid item xs={12} key={index}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              borderRadius: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                transform: 'translateX(8px)',
                              },
                            }}
                          >
                            <Avatar
                              src={member.avatar}
                              alt={member.name}
                              sx={{
                                width: 70,
                                height: 70,
                                mr: 3,
                                border: '3px solid',
                                borderColor: theme.palette.primary.main,
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                              }}
                            />
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{ 
                                  fontWeight: 600, 
                                  mb: 0.5,
                                  color: theme.palette.text.primary,
                                }}
                              >
                                {member.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ 
                                  fontSize: '1rem',
                                  color: theme.palette.primary.main,
                                }}
                              >
                                {member.role}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 6,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {t('tech_title')}
            </Typography>
            <Grid container spacing={4}>
              {technologies.map((tech, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      elevation={2}
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: theme.shadows[8],
                        },
                        borderRadius: 2,
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 4,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: `${tech.color}15`,
                            color: tech.color,
                            mb: 3,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: `0 0 20px ${tech.color}40`,
                            },
                          }}
                        >
                          {tech.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ 
                            fontWeight: 600, 
                            mb: 2,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {tech.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ 
                            lineHeight: 1.6,
                            fontSize: '1rem',
                          }}
                        >
                          {tech.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 