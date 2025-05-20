import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, useTheme, useMediaQuery, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TargetIcon from '@mui/icons-material/GpsFixed';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const FeatureCard = ({ icon, title, description, link }) => (
  <Card
    component={motion.div}
    whileHover={{ scale: 1.05, y: -10 }}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'rgba(255, 0, 0, 0.05)',
      borderRadius: 2,
      border: '1px solid rgba(255, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: '#ff0000' }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        {description}
      </Typography>
      <Button
        component={Link}
        to={link}
        variant="contained"
        sx={{
          bgcolor: '#ff0000',
          color: '#000000',
          '&:hover': {
            bgcolor: '#cc0000',
            color: '#ffffff',
          },
        }}
        fullWidth
      >
        Learn More
      </Button>
    </CardContent>
  </Card>
);

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      py: 8,
      position: 'relative',
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/main.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: '5rem', md: '8rem' },
              background: 'linear-gradient(45deg, #ff0000 30%, #cc0000 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontFamily: '"Bauhaus 93", "Roboto", sans-serif',
              textTransform: 'uppercase',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            SNYPTR
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 6,
              color: '#ffffff',
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              fontFamily: '"Harlow Solid Italic", "Roboto", sans-serif',
              fontStyle: 'italic',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Advanced Shooting Analysis Technology
          </Typography>
        </motion.div>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<AnalyticsIcon sx={{ fontSize: 60, color: '#ff0000' }} />}
              title="Error Analysis"
              description="Upload your shooting images for instant ML-powered feedback. Get detailed analysis of your form and technique with personalized improvement suggestions."
              link="/error-analysis"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<TargetIcon sx={{ fontSize: 60, color: '#ff0000' }} />}
              title="Real-time Laser Tracking"
              description="Experience real-time feedback with our advanced laser tracking system. Perfect your aim with immediate visual guidance through our camera-based analysis."
              link="/laser-tracking"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{
              color: '#ff0000',
              mb: 4,
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Harlow Solid Italic", "Roboto", sans-serif',
              fontStyle: 'italic',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Why Choose SNYPTR?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              mb: 4,
              color: '#ffffff',
              fontSize: '1.1rem',
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            SNYPTR combines cutting-edge machine learning with real-time tracking to provide
            comprehensive shooting analysis. Whether you're a beginner or a professional,
            our technology helps you improve your accuracy and technique.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;