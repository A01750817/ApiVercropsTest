import { Router } from "express";
import { getPartidas, getPartida, createPartida } from "../controllers/partida.controller.js";

const router = Router();

// Endpoint para obtener todos los accesos
router.get('/partida', getPartidas);

// Endpoint para obtener un acceso por su ID
router.get('/partida/:id', getPartida);

// Endpoint para crear un nuevo acceso
router.post('/partida', createPartida);

export default router;