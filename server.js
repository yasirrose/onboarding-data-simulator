const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Onboarding endpoint
app.post('/onboarding', async (req, res) => {
  try {
    console.log('Request received:', req.body);
    
    // Validate incoming data
    const { firstName, lastName, email } = req.body;
    
    if (!firstName || !lastName || !email) {
      console.log('Error: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Forward data to downstream service
    console.log('Forwarding data to downstream service...');
    const downstreamResponse = await axios.post('https://dummy-s3-location.com/ingest', req.body);
    
    console.log('Downstream response status:', downstreamResponse.status);
    console.log('Downstream response data:', downstreamResponse.data);
    
    // Return success response
    return res.status(200).json({ 
      message: 'Onboarding data successfully processed',
      status: 'success'
    });
    
  } catch (error) {
    console.error('Error processing onboarding request:', error.message);
    
    // Check if the error is from the downstream service
    if (error.response) {
      console.error('Downstream service error:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
