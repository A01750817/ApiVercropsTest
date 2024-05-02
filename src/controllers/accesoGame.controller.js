import {pool} from '../db.js'

export const getAccesoGames = async (req, res) => {
    try {
        const [rows] =await pool.query('SELECT * FROM Acceso_VideoJuego');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Someyhing went wrong'
        })
    }

}

export const getAccesoGame = async (req, res) =>{
    try {
        console.log(req.params.id)
        const [rows] = await pool.query('SELECT * FROM Acceso_VideoJuego WHERE idAcceso_VideoJuego = ?', [req.params.id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'AccesoGame no encontrado'
    })
    
    res.json(rows[0])
    }
    catch (error) {
        return res.status(500).json({
            message: 'Someyhing went wrong'
        })
    }
}

export const createAccesoGame = async (req, res) => {
    try {
        const { idAcceso_Web } = req.body;

        // Obtener la fecha actual en formato ISO 8601
        const fechaInicio = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Verificar si el ID de acceso web está presente
        if (!idAcceso_Web) {
            return res.status(400).json({
                message: 'idAcceso_Web es un campo requerido'
            });
        }

        // Definir la fecha de salida como null (puedes modificar esto según tus necesidades)
        const fechaSalida = null;

        // Insertar un nuevo registro en la tabla Acceso_VideoJuego
        const [result] = await pool.query('INSERT INTO Acceso_VideoJuego (FechaInicio, FechaSalida, idAcceso_Web) VALUES (?, ?, ?)', [fechaInicio, fechaSalida, idAcceso_Web]);

        // Responder con el ID del nuevo acceso creado y un mensaje de éxito
        res.status(201).json({
            id: result.insertId,
            message: 'AccesoGame creado exitosamente'
        });
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante el proceso
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};




// Endpoint para actualizar la fecha de salida de un acceso a videojuego
export const updateAccesoGame = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del acceso a videojuego de los parámetros de la solicitud

        // Obtener la fecha actual en formato ISO 8601
        const fechaSalida = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Actualizar la fecha de salida en la base de datos
        const [result] = await pool.query('UPDATE Acceso_VideoJuego SET FechaSalida = ? WHERE idAcceso_VideoJuego = ?', [fechaSalida, id]);

        // Verificar si se realizó la actualización correctamente
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Acceso a videojuego no encontrado'
            });
        }

        // Responder con un mensaje de éxito
        res.status(200).json({
            message: 'Fecha de salida actualizada exitosamente'
        });
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante el proceso
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};
