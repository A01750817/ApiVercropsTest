import { Router } from "express";
import  { getUsuarios, createUsuarios, updateUsuario, deleteUsuario, getUsuario} from "../controllers/usuarios.controller.js";

const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuario);

router.post('/usuarios', createUsuarios);

router.patch('/usuarios/:id', updateUsuario);

router.delete('/usuarios/:id', deleteUsuario);

export default router;

