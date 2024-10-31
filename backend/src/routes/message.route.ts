import express from 'express';
import protectedRoute from '../middleware/protectRoute';
import { sendMessage, getMessages, getCurrentSidebarUsers } from '../controllers/message.controller';

const router = express.Router();

router.get('/sidebarUsers', protectedRoute, getCurrentSidebarUsers);
router.get('/:id', protectedRoute, getMessages);
router.post('/send/:id', protectedRoute, sendMessage);

export default router;