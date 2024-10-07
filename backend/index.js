const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const route = require('./routes/index');

const db = require('./config/db/index');
db.connect();

const app = express();
app.use(cors());
app.use(express.json());

route(app);


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});


