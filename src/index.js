const express = require('express');
const cors = require('cors');
const multer = require('multer');
const colors = require('colors');
const db = require('./models/index');
const api = require('./api');
const secret = require('./config/config.json').secret;

const app = express();
const upload = multer({dest: './src/img'});

app.use(cors());
app.use(express.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('image'));
app.use(express.static('/src/img'));

app.set('jwt-secret', secret);

db.sequelize.sync();

app.use('/', api);

const listener = app.listen(3000, () => {
    console.log(colors.white("Server Started at " + listener.address().port));
});