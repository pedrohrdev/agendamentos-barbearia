import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/roleAuth.middleware.js";
import {
  criarServico,
  listarServico,
  listarServicoPorId,
  atualizarServico,
  deletarServico,
} from "../controllers/servicos.controller.js";

const router = Router();

router.get("/", listarServico);
router.get("/:id", listarServicoPorId);

router.post("/", authMiddleware, authorize("admin"), criarServico);

router.put("/:id", authMiddleware, authorize("admin"), atualizarServico);

router.delete("/:id", authMiddleware, authorize("admin"), deletarServico);

export default router;
