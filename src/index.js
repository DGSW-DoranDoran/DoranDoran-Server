const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
    console.log(`server started at ${port}`);
})