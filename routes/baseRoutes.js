// const express = require('express')
// const { startController, hiController } = require("../controllers/baseController.js")
import express from 'express';
import { hiController, startController } from '../controllers/baseController.js';

const router = express.Router();

router.get('/', startController);

router.get('/hi', hiController);

// module.exports = router;
export default router;