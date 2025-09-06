require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

const uploadRouter = require('./routes/upload');
const filesRouter = require('./routes/files');

// logging ke logs/access.log
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// static file public/
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/upload', uploadRouter);
app.use('/f', filesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
