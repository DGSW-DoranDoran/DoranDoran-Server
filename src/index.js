const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const db = require('./models/index');
const app = express();

db.sequelize.sync();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
    console.log(`server started at ${port}`);
})