import express from 'express';
import multer from 'multer';
import { getAnimaisDisponiveis, getAnimal, cadastrarAnimal, getPublicacoes, definirAdocao, getAnimalFilter } from '../controllers/animalController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

// Middleware para upload de arquivos
const storage = multer.memoryStorage(); // Armazena arquivos na memória
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/disponiveis', authenticateToken, getAnimaisDisponiveis);
router.get('/publicacoes', authenticateToken, getPublicacoes);
router.post('/definir-adocao', authenticateToken, definirAdocao)
router.post('/cadastrar', authenticateToken, upload.single('foto'), cadastrarAnimal);
router.get('/filtrar', authenticateToken, getAnimalFilter);
router.get('/:id', authenticateToken, getAnimal);
export default router;
