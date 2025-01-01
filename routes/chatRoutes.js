import express from 'express';
import { getChats, getMessagesChat, sendMessage} from '../controllers/chatController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/send-message', authenticateToken, sendMessage)
router.get('/channels', authenticateToken, getChats)
router.get('/channel/data', authenticateToken, getMessagesChat)

export default router;