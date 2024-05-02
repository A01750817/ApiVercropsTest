import { Router } from "express";
import { getAccesoGames, getAccesoGame, createAccesoGame, updateAccesoGame } from "../controllers/accesoGame.controller.js";

const router = Router();

// Endpoint para obtener todos los accesos a videojuegos
router.get('/accesosGame', getAccesoGames);

// Endpoint para obtener un acceso a videojuego por su ID
router.get('/accesosGame/:id', getAccesoGame);

// Endpoint para crear un nuevo acceso a videojuego
router.post('/accesosGame', createAccesoGame);

// Endpoint para actualizar la fecha de salida de un acceso a videojuego
router.put('/accesosGame/:id', updateAccesoGame);

export default router;
