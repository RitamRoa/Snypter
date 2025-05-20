import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, useTheme, useMediaQuery, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import HoverParticles from './components/HoverParticles';
import AudioPlayer from './components/AudioPlayer';

// Pages
import Home from './pages/Home';
import ErrorAnalysis from './pages/ErrorAnalysis';
import LaserTracking from './pages/LaserTracking';
import ContactUs from './pages/ContactUs';

const NavButton = ({ to, children }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (window.playNavSound) {
      window.playNavSound();
    }
    navigate(to);
  };

  return (
    <Button
      component="a"
      href={to}
      onClick={handleClick}
      sx={{
        color: '#ffffff',
        mx: 1,
        textTransform: 'none',
        fontSize: '1rem',
        '&:hover': {
          color: '#ff0000',
          backgroundColor: 'transparent',
        },
      }}
    >
      {children}
    </Button>
  );
};

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (to) => {
    if (window.playNavSound) {
      window.playNavSound();
    }
    navigate(to);
    setMobileOpen(false);
  };

  const drawer = (
    <List>
      {[
        { path: '/', label: 'Home' },
        { path: '/error-analysis', label: 'Error Analysis' },
        { path: '/laser-tracking', label: 'Laser Tracking' },
        { path: '/contact-us', label: 'Contact Us' }
      ].map((item) => (
        <ListItem 
          button 
          key={item.path}
          onClick={() => handleNavClick(item.path)}
          sx={{
            color: '#ffffff',
            '&:hover': {
              color: '#ff0000',
              backgroundColor: 'rgba(255, 0, 0, 0.05)',
            },
          }}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#000000',
      position: 'relative',
    }}>
      <HoverParticles />
      <AudioPlayer />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/main.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <AppBar 
          position="fixed" 
          sx={{ 
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
            borderBottom: '1px solid rgba(255, 0, 0, 0.1)',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography
                component="a"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/');
                }}
                sx={{
                  textDecoration: 'none',
                  color: '#ff0000',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#cc0000',
                  },
                }}
              >
                SNYPTR
              </Typography>
              
              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    color: '#ffffff',
                    '&:hover': {
                      color: '#ff0000',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Box>
                  <NavButton to="/">Home</NavButton>
                  <NavButton to="/error-analysis">Error Analysis</NavButton>
                  <NavButton to="/laser-tracking">Laser Tracking</NavButton>
                  <NavButton to="/contact-us">Contact Us</NavButton>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              bgcolor: '#000000',
              color: '#ffffff',
              borderLeft: '1px solid rgba(255, 0, 0, 0.1)',
            },
          }}
        >
          {drawer}
        </Drawer>

        <Toolbar />
        <Container component={motion.main} layout maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/error-analysis" element={<ErrorAnalysis />} />
            <Route path="/laser-tracking" element={<LaserTracking />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;