// const express = require('express');
// const { getUsers, createUser, updateUser } = require('../controllers/userController');
// const { validateRequest, createUserSchema } = require('../validation/schema.js');
import express from 'express';
import { createUser, getUsers, updateUser } from '../controllers/userController.js';
import { createUserSchema, validateRequest } from '../middlewares/schema.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/create-user', validateRequest(createUserSchema), createUser); // Added validation middleware
router.put('/update-user/:userId?', updateUser);

// module.exports = router;
export default router;