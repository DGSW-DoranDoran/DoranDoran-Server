const express = require('express');
const cors = require('cors');
const multer = require('multer');
const colors = require('colors');
const db = require('./models/index');
const api = require('./api');
const secret = require('./config/config.json').secret;
const middleware = require('./middleware/time');

const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('image'));
app.use(express.static('public'));

app.set('jwt-secret', secret);

db.sequelize.sync();

app.use(middleware.checkTime);
app.use('/', api);

const listener = app.listen(3001, () => {
    console.log(colors.white("Server Started at " + listener.address().port));
});