const { ConfidentialClientApplication } = require('@azure/msal-node');
const axios = require('axios');

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const msalClient = new ConfidentialClientApplication(msalConfig);

// Token cache (simple in-memory, resets on cold start)
let cachedToken = null;
let tokenExpiry = null;

// Get access token
async function getAccessToken() {
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const tokenRequest = {
      scopes: ['https://graph.microsoft.com/.default'],
    };

    const response = await msalClient.acquireTokenByClientCredential(tokenRequest);
    cachedToken = response.accessToken;
    // Cache for 50 minutes (tokens valid for 60 minutes)
    tokenExpiry = Date.now() + 50 * 60 * 1000;
    
    return cachedToken;
  } catch (error) {
    console.error('Error acquiring token:', error);
    throw error;
  }
}

// Call Microsoft Graph API
async function callGraphAPI(endpoint, method = 'GET', data = null) {
  const token = await getAccessToken();

  try {
    const response = await axios({
      method,
      url: `https://graph.microsoft.com/v1.0${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data,
    });
    return response.data;
  } catch (error) {
    // If token expired, clear cache and retry once
    if (error.response && error.response.status === 401) {
      cachedToken = null;
      tokenExpiry = null;
      const newToken = await getAccessToken();
      
      const response = await axios({
        method,
        url: `https://graph.microsoft.com/v1.0${endpoint}`,
        headers: {
          Authorization: `Bearer ${newToken}`,
          'Content-Type': 'application/json',
        },
        data,
      });
      return response.data;
    }
    throw error;
  }
}

// CORS headers for API responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = {
  getAccessToken,
  callGraphAPI,
  corsHeaders,
};
