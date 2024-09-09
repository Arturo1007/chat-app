import express from 'express';
import {login, logout, signup, getCurrentUser} from '../controllers/auth.controller';
import protectedRoute from '../middleware/protectRoute';
const router = express.Router();

router.get('/get-current-user', protectedRoute, getCurrentUser)
router.post('/login', login)
router.post('/logout', logout)
router.post('/signup', signup)

export default router;