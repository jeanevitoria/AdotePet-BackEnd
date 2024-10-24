import { getAnimaisDisponiveis, getAnimal, cadastrarAnimal, getAnimaisPublicados } from '../controllers/animalController';
import { atualizarPerfil, deletarPublicacao, getAnimaisPublicados } from '../controllers/userController';
const express = require('express');
const router = express.Router();

router.get('/animais-publicados', authenticateToken, getAnimaisPublicados);
router.put('/alterar-perfil', atualizarPerfil)
router.delete('/deletar-publicacao', deletarPublicacao)
export default router;