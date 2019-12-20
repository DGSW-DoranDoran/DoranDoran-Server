require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = require('../config/secretToken.json');

// expiresIn format 7 days, 10h, 7d, 3min, 100 => 100ms

// Create Token
exports.createToken = async (member) => {
  const payload = {
    member,
  };
  const option = { expiresIn: '5 days', issuer: 'dgswbamboo.com', subject: 'token' };
  console.log(payload);
  
  try {
    return await jwt.sign(payload, secret.key, option);
  } catch (error) {
    throw error;
  }
};

// Create Refresh Token
exports.createRefreshToken = async (member) => {
  const payload = {
    member,
  };
  const option = { expiresIn: '7 days', issuer: 'dgswbamboo.com', subject: 'refreshToken' };

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
