//thi is the index.js from api folder
import express from 'express'
import usuariosRoutes from './routes/usuarios.routes.js'
import accesosWebRoutes from './routes/accesoWeb.routes.js'
import accesosGameRoutes from './routes/accesoGame.routes.js'

import indexRoutes from './routes/index.routes.js'


const app = express();

app.use(express.json());

app.use(indexRoutes)

app.use('/api', usuariosRoutes)
app.use('/api', accesosWebRoutes)
app.use('/api', accesosGameRoutes)


app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;