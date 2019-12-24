require('dotenv').config();

const jwt = require('jsonwebtoken');
const secret = require('../config/secretToken.json');

// Create Token
exports.createToken = async (id, name) => {
    const payload = {
      id,
      name
    };
    const option = { expiresIn: '5 days', issuer: 'doran.b1nd.com', subject: 'token' };
    console.log(payload);
    
    try {
      return await jwt.sign(payload, secret.key, option);
    } catch (error) {
      throw error;
    }
  };
  
  // Create Refresh Token
  exports.createRefreshToken = async (id, name) => {
    const payload = {
      id,
      name
    };
    const option = { expiresIn: '5 days', issuer: 'doran.b1nd.com', subject: 'token' };
  
    try {
      return await jwt.sign(payload, secret.key, option);
    } catch (error) {
      throw error;
    }
  };
  
  // Verify Token
  exports.verifyToken = async (token) => {
    try {
      return await jwt.verify(token, secret.key);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };