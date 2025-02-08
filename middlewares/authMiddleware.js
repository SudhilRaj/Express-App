import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateUser = (req, res, next) => {
   // Allow unauthenticated access to sign-in and sign-up
   if (req.path.startsWith('/auth')) {
      return next();
   }

   const token = req.header('Authorization');
   if (!token) {
      return res.status(401).json({ status: 'error', message: 'Access denied. No token provided.' });
   }

   try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to request object
      next();
   } catch (error) {
      res.status(401).json({ status: 'error', message: 'Invalid token' });
   }
};
