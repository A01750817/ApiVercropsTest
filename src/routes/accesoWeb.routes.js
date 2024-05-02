import { Router } from "express";
import { getAccesos, getAcceso, createAcceso, updateAccesoSalida } from "../controllers/accesoWeb.controller.js";

const router = Router();

// Endpoint para obtener todos los accesos
router.get('/accesos', getAccesos);

// Endpoint para obtener un acceso por su ID
router.get('/accesos/:id', getAcceso);

// Endpoint para crear un nuevo acceso
router.post('/accesos', createAcceso);

// En tu archivo accesoWeb.routes.js
//idAcceso_Web
router.put('/accesos/:idAcceso_Web', updateAccesoSalida);


export default router;
