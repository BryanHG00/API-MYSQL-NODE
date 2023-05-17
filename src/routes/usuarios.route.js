import { Router } from "express";

import { InicioSesion, deleteUsuarios, getUsuario, getUsuarios, postUsuario, putUsuarios } from "../controllers/usuarios.controller.js";

const router = Router();

router.get('/Usuarios', getUsuarios)

router.get('/Usuarios/:id', getUsuario)

router.post('/Usuarios', postUsuario)
//inciiar sesion
router.post('/Usuarios/iniciarsesion', InicioSesion)

router.put('/Usuarios/:id', putUsuarios)

router.delete('/Usuarios', deleteUsuarios)

export default router;