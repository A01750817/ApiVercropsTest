import {pool} from '../db.js'

export const getAccesos = async (req, res) => { 
    try {
        const [rows] = await pool.query('SELECT * FROM Acceso_Web');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const getAcceso = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Acceso_Web WHERE idAcceso_Web = ?', [req.params.id])
    
        if (rows.length <= 0) return res.status(404).json({
            message: 'Acceso no encontrado'
        })
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const createAcceso = async (req, res) => { 
    try {
        const { idUsuario } = req.body;

        // Verificar si el idUsuario está presente
        if (!idUsuario) {
            return res.status(400).json({
                message: 'idUsuario es un campo requerido'
            });
        }
S
        // Generar la fecha actual formateada correctamente para FechaInicio
        const fechaInicio = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato: YYYY-MM-DD HH:MM:SS

        // Dejar FechaSalida como null al inicio
        const fechaSalida = null;

        // Insertar un nuevo acceso en la base de datos
        const [result] = await pool.query('INSERT INTO Acceso_Web (FechaInicio, FechaSalida, idUsuario) VALUES (?, ?, ?)', [fechaInicio, fechaSalida, idUsuario]);

        // Devolver el ID del nuevo acceso creado
        res.status(201).json({
            id: result.insertId,
            message: 'Acceso creado exitosamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
}


export const updateAccesoSalida = async (req, res) => {
    try {
        const { idAcceso_Web } = req.params; // ID del acceso web a actualizar

        // Obtener la fecha y hora actual
        const fechaSalida = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Actualizar la fecha de salida en la base de datos
        await pool.query('UPDATE Acceso_Web SET FechaSalida = ? WHERE idAcceso_Web = ?', [fechaSalida, idAcceso_Web]);

        res.status(200).json({
            message: 'Fecha de salida actualizada correctamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

