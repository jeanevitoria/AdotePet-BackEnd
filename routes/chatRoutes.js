import { authenticateToken } from '../middlewares/authMiddleware.js';

import express from 'express';
import { getChats, getMessagesChat, sendMessage} from '../controllers/chatController.js';
const router = express.Router();

router.post('/send-message', sendMessage)
router.get('/channels', getChats)
router.get('/data', getMessagesChat)

router.get('/', () => {
    console.log("funcionando.")
});

export default router;