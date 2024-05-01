import app from "./app.js"
import {PORT} from './config.js'

//probando el puerto
app.listen(PORT, () => console.log('Server running on port 3000'));

