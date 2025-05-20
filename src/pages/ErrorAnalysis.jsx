import React, { useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Alert, Container } from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

function ErrorAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/analyze', formData);
      setResult(response.data);
    } catch (err) {
      setError('Error analyzing image. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      color: '#ffffff',
      fontFamily: 'Montserrat, sans-serif',
      textAlign: 'center',
      textShadow: '0 0 5px #ffffff, 0 0 20px #000, 0 0 30px #000',
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/error-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1,
          zIndex: -2,
        }}
      />

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 'bold',
              mb: 3,
              color: '#ff0000',
              fontFamily: '"Bauhaus 93", "Roboto", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Error Analysis
          </Typography>

          <Paper
            sx={{
              mt: 4,
              p: 4,
              textAlign: 'center',
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                component="span"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Select Image
              </Button>
            </label>

            {preview && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '400px' }}
                />
              </Box>
            )}

            {selectedFile && (
              <Button
                variant="contained"
                onClick={handleAnalyze}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Analyze'}
              </Button>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {result && (
              <Box sx={{ mt: 4, textAlign: 'left' }}>
                <Typography variant="h5" gutterBottom>
                  Analysis Results
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  Detected Error: {result.category}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                  Issue Description:
                </Typography>
                <Typography variant="body1" paragraph>
                  {result.description}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Recommended Solution:
                </Typography>
                <Typography variant="body1">
                  {result.solution}
                </Typography>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default ErrorAnalysis;