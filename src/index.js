const express = require('express');
const cors = require('cors');
const colors = require('colors');
const db = require('./models/index');
const api = require('./api');
const secret = require('./config/config.json').secret;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('jwt-secret', secret);

db.sequelize.sync();

app.use('/', api);

const listener = app.listen(3001, () => {
    console.log(colors.white("Server Started at " + listener.address().port));
});