import express from 'express';
import { getChats, saveMessage} from '../controllers/chatController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/salvar-mensagem', authenticateToken, saveMessage)
router.get('/canais', authenticateToken, getChats)

export default router;