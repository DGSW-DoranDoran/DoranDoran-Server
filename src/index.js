const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const db = require('./models/index');
const api = require('./api');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.use('/', api);

app.listen(port, () => {
    console.log(`server started at ${port}`);
});