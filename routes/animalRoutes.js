import express from 'express';
import { getAnimaisDisponiveis, getAnimal, cadastrarAnimal} from '../controllers/animalController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/lista', authenticateToken, getAnimaisDisponiveis);
router.post('/cadastrar-animal', authenticateToken, cadastrarAnimal);
router.get('/:id', authenticateToken, getAnimal);

export default router;
