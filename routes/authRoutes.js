import { login, cadastro } from '../controllers/authController.js'
import express from 'express';

const router = express.Router();

router.post('/login', login);
router.post('/cadastro', cadastro);

export default router;