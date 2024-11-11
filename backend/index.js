const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const route = require('./routes/index');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
dotenv.config({ path: path.resolve(__dirname, './.env') });

const PORT = process.env.PORT || 3001;
const db = require('./config/db/index');
db.connect();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

route(app);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});


