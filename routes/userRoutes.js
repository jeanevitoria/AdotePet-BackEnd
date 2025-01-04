import { atualizarPerfil, deletarPublicacao, getAnimaisPublicados, getUser, getResponsavel, compararUsers } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

import express from 'express';
const router = express.Router();

router.get('/animais-publicados', authenticateToken, getAnimaisPublicados);
router.put('/alterar-perfil', authenticateToken, atualizarPerfil)
router.delete('/deletar-publicacao', authenticateToken, deletarPublicacao)
router.get('/perfil/:id', authenticateToken, getResponsavel);
router.get('/perfil', authenticateToken, getUser);
router.post('/comparar', authenticateToken, compararUsers);

export default router;