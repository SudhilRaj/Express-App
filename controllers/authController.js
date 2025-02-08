import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const users = []; // Temporary in-memory array for users

// SIGNUP FUNCTION
export const signup = async (req, res) => {
   try {
      const { username, password } = req.body;
      if (!username || !password) {
         return res.status(400).json({ status: 'error', message: 'Username and password are required' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user (In a real app, save it to a database)
      users.push({ id: users.length + 1, username, password: hashedPassword });

      res.status(201).json({ status: 'success', message: 'User registered successfully!' });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
   }
};

// SIGNIN FUNCTION
export const signin = async (req, res) => {
   try {
      const { username, password } = req.body;

      // Find user
      console.log({ users })
      const user = users.find(u => u.username === username);
      if (!user) {
         return res.status(401).json({ status: 'error', message: 'Invalid username or password' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ status: 'error', message: 'Invalid username or password' });
      }

      // Generate token
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

      // Set token in HTTP-only cookie - Another method for sending the JWT
      // The server sends the JWT as an HTTP-only cookie.
      // The browser will automatically includes the cookie in all requests.
      // The server reads the token from the cookie instead of the Authorization header. (Need to adjust in the middleware)
      // res.cookie("token", token, {
      //    httpOnly: true,
      //    secure: process.env.NODE_ENV === "production", // Only in HTTPS
      //    sameSite: "Strict"
      // });
      //   res.json({ status: "success", message: "Logged in successfully" });

      // By passing the token this way, we can store it in the localStorage and then manually attach in the Authorization header for other requests.
      res.status(200).json({ status: 'success', token });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
   }
};
