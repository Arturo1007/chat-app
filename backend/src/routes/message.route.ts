import express from 'express';
import protectedRoute from '../middleware/protectRoute';
import { sendMessage, getMessages, getCurrentUserSidebarConversations } from '../controllers/message.controller';

const router = express.Router();

router.get('/conversations', protectedRoute, getCurrentUserSidebarConversations);
router.get('/:id', protectedRoute, getMessages);
router.post('/send/:id', protectedRoute, sendMessage);

export default router;