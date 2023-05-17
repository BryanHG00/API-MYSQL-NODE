import { Router } from "express";
import { pool } from '../db.js';
import { deleteEditoriales, getEditorial, getEditoriales,postEditoriales, putEditoriales } from "../controllers/editoriales.controller.js";

const router = Router();

router.get('/editorial', getEditoriales)

router.get('/editorial/:id', getEditorial)

router.post('/editorial', postEditoriales)

router.put('/editorial/:id', putEditoriales)

router.delete('/editorial/:id', deleteEditoriales)

export default router;