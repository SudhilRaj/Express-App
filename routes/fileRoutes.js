// const fs = require('fs');
// const express = require('express');
// const multer = require('multer');
// const { uploadFile, uploadMultiple } = require('../controllers/fileController.js');

import multer from 'multer'
import express from 'express';
import fs from 'fs';
import { fileDownload, uploadFile, uploadMultiple } from "../controllers/fileController.js"
const router = express.Router();

if (!fs.existsSync('uploads')) {
   fs.mkdirSync('uploads');
}

// Configure multer storage
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the folder to store files
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Append a timestamp to the filename
   },
});

// Set up multer with storage and file filter (optional)
const upload = multer({
   storage: storage,
   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
   fileFilter: (req, file, cb) => {
      // Accept only certain file types
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
         cb(null, true);
      } else {
         cb(new Error('Only .jpg and .png files are allowed'), false);
      }
   },
});

// POST route for file upload
router.post('/upload', upload.single('file'), uploadFile);
router.post('/upload-multiple', upload.array('files', 5), uploadMultiple);

// GET route for file download
router.get('/download/:filename', fileDownload);


// module.exports = router;
export default router;
