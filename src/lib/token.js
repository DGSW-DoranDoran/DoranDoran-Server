const jwt = require('jsonwebtoken');
const secretCode = require('../config/config.json').secret;

exports.encodeToken = (id, name) => jwt.sign({
        id: id,
        name: name
    },
    secretCode,
    {
        expiresIn: "60m"
    });

exports.decodeToken = (token) => jwt.verify(token, secretCode);