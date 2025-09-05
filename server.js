const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();


const { ensureSchema } = require('./utils/db');
const uploadRoute = require('./routes/upload');
const filesRoute = require('./routes/files');


const app = express();
const PORT = process.env.PORT || 3000;


// Logs
if (!fs.existsSync(path.join(__dirname, 'logs'))) fs.mkdirSync(path.join(__dirname, 'logs'));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Ensure DB tables
ensureSchema();


// Static SPA
app.use(express.static(path.join(__dirname, 'public')));
// Local uploaded files (fallback storage)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API routes
app.use('/api', uploadRoute);
app.use('/api', filesRoute);


// SPA fallback – serve index.html for all non-API routes
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
console.log(`NetsHosting server running on http://localhost:${PORT}`);
});

