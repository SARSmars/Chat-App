import express from 'express';
import { Register, Login } from '../controllers/AuthControllers.js';
import upload from '../middlewares/Multer.js';
const Authroutes = express.Router();

Authroutes.post('/register', upload.single('profile'), Register);
Authroutes.post('/login', Login);
export default Authroutes;