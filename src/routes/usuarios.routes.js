import express from 'express';
import { register, login } from '../controllers/usuarios.controller.js';

const router = express.Router();

// POST /usuarios/register
router.post('/register', register);

// POST /usuarios/login
router.post('/login', login);

export default router;