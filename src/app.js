import express from 'express';

import editorialesRoutes from './routes/editoriales.routes.js';
import usuariosRoutes from './routes/usuarios.route.js';
import cors from 'cors';
import {PORT} from './config.js';

const app = express();

app.use(cors())

app.use(express.json());

app.use('/api',usuariosRoutes)
app.use('/api',editorialesRoutes)

export default app;