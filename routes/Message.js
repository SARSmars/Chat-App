import express from 'express';
import { CreateMessage, GetMessages, GetUser } from '../controllers/MessageController.js';
const MessageRoutes = express.Router(); 

MessageRoutes.post('/create-message', CreateMessage);
MessageRoutes.post('/get-messages', GetMessages);
MessageRoutes.post('/get-user',GetUser)
export default MessageRoutes;