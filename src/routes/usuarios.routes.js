import express from 'express';
import { register, login } from '../controllers/usuarios.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /usuarios/register
router.post('/register', register);

// POST /usuarios/login
router.post('/login', login);

// GET /usuarios/me
router.get('/me', authMiddleware, async (req, res) => {
    res.json({
        message: "You are  authenticated",
        user: req.user
    })
})

export default router;