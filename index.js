import express from 'express';
import Authroutes from './routes/Auth.js';
import MessageRoutes from './routes/Message.js';
import dotenv from 'dotenv';
import DbCon from './utils/db.js';
dotenv.config();

const PORT  = process.env.PORT || 6000; 

// Dbconnections
DbCon(); // Call the database connection function

const app = express();
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/auth', Authroutes);
app.use('/api/message', MessageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});