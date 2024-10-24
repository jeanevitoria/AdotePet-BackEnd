import { login, cadastro } from '../controllers/authController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/login', authenticateToken, login);
router.post('/cadastro', authenticateToken, cadastro);

export default router;