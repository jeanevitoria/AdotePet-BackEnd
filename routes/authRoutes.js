import { login, cadastro } from '../services/authService'
const express = require('express');
const router = express.Router();

router.post('/login', login);
router.post('/cadastro', cadastro);

export default router;