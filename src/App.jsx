import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, useTheme, useMediaQuery, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AudioPlayer from './components/AudioPlayer';
import CrosshairSplash from './components/CrosshairSplash';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './pageTransitions.css';

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
        color: '#eaeaea',
        background: 'none',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        px: 2,
        mx: 0.5,
        borderRadius: 2,
        transition: 'color 0.2s',
        '&:hover': {
          color: '#ff4c29',
          background: 'none',
          textDecoration: 'underline',
        },
        '&:last-of-type': {
          mr: 2.5,
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
  const location = useLocation();
  const [showSplash, setShowSplash] = React.useState(true);

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
          }}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      {showSplash && <CrosshairSplash onFinish={() => setShowSplash(false)} />}
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: '#0f1116',
        position: 'relative',
      }}>
        <AudioPlayer />
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0f1116',
            zIndex: 0,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <AppBar 
            position="fixed"
            sx={{
              bgcolor: 'rgba(15,17,22,0.55)',
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
              border: 'none',
              zIndex: 1200,
              backdropFilter: 'blur(6px)',
            }}
          >
            <Toolbar sx={{ px: 0, minHeight: { xs: 64, md: 80 }, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <Box sx={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', pl: 0, ml: { xs: 2, md: 4 } }}>
                <Typography
                  component="a"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/');
                  }}
                  sx={{
                    textDecoration: 'none',
                    fontWeight: 900,
                    fontSize: { xs: '2rem', md: '2.7rem' },
                    letterSpacing: '3px',
                    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
                    background: 'linear-gradient(90deg, #ff4c29 0%, #00d1b2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 12px rgba(0,0,0,0.35)',
                    cursor: 'pointer',
                    ml: 0,
                    lineHeight: 1.1,
                    pl: 0,
                  }}
                >
                  SNYPTR
                </Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 0 }}>
                {isMobile ? (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ color: '#ffffff' }}
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
              </Box>
            </Toolbar>
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
                bgcolor: '#1a1c22',
                color: '#eaeaea',
                borderLeft: '1px solid #ff4c29',
              },
            }}
          >
            {drawer}
          </Drawer>

          <Toolbar />
          <Container component="main" layout maxWidth="lg" sx={{ position: 'relative', minHeight: '80vh' }}>
            <TransitionGroup>
              <CSSTransition key={location.pathname} classNames="fade-page" timeout={500}>
                <div className="fade-page">
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/error-analysis" element={<ErrorAnalysis />} />
                    <Route path="/laser-tracking" element={<LaserTracking />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                  </Routes>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default App;