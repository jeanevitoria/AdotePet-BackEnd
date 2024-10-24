import { authenticateToken } from '../middlewares/authMiddleware.js';

import express from 'express';
const router = express.Router();

router.get('/', () => {
    console.log("funcionando.")
});

export default router;