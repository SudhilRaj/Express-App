import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 5000;

// const baseRoutes = require('./routes/baseRoutes.js');
import authRoutes from './routes/authRoutes.js';
import baseRoutes from './routes/baseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
// import { authenticateUser } from './middlewares/authMiddleware.js';

// app.use() is the syntax to use any middleware
// Middleware to parse JSON requests
app.use(express.json())

// Global authentication middleware (Applied to all routes)
// app.use(authenticateUser);

// Routes
app.use('/auth', authRoutes);
app.use('/base', baseRoutes);
app.use('/user', userRoutes);
app.use('/api', fileRoutes);

// Middleware to serve uploaded files statically
// const path = require('path');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));
// This is very useful for serving static files like images and stylessheets. (We can make any dir public like this)

app.listen(port, (error) => {
  if (!error)
    console.log(`App listening on port ${port}`)
  else
    console.log("Error occurred, server can't start", error);
})