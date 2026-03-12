import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  criarAgendamento,
  listarMeusAgendamentos,
  cancelarAgendamento,
} from "../controllers/agendamentos.controller.js";

const router = Router();

// criar agendamento
router.post("/", authMiddleware, criarAgendamento);

// listar meus agendamentos
router.get("/me", authMiddleware, listarMeusAgendamentos);

// cancelar agendamento
router.delete("/:id", authMiddleware, cancelarAgendamento);

export default router;
