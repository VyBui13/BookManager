const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const route = require('./routes/index');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
dotenv.config({ path: path.resolve(__dirname, './.env') });
const { seed } = require('./config/seed/seed');
const PORT = process.env.PORT || 3001;
const db = require('./config/db/index');
async function connectDB() {
    try {
        await db.connect();
        // await seed();
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
}

connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

route(app);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});


