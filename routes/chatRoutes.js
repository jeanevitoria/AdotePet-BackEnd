import express from 'express';
import { getChats, getMessagesChat, sendMessage} from '../controllers/chatController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/enviar-mensagem', authenticateToken, sendMessage)
router.get('/canais', authenticateToken, getChats)
router.get('/canal/mensagens', authenticateToken, getMessagesChat)

export default router;