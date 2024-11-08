import { atualizarPerfil, deletarPublicacao, getAnimaisPublicados, getUser } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

import express from 'express';
const router = express.Router();

router.get('/animais-publicados', authenticateToken, getAnimaisPublicados);
router.put('/alterar-perfil', authenticateToken, atualizarPerfil)
router.delete('/deletar-publicacao', authenticateToken, deletarPublicacao)
router.get('/perfil', authenticateToken, getUser);

export default router;