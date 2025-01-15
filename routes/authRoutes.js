import { login, cadastro, recuperarSenha, redefinirSenha } from '../controllers/authController.js'
import express from 'express';

const router = express.Router();

router.post('/login', login);
router.post('/cadastro', cadastro);
router.post('/recuperar-senha', recuperarSenha)
router.post('/redefinir-senha', redefinirSenha)

export default router;