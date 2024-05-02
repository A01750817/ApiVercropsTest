import {pool} from '../db.js'

export const getPartidas = async (req, res) => {
    try {
        const [rows] =await pool.query('SELECT * FROM Partida');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Someyhing went wrong'
        })
    }

}

export const getPartida = async (req, res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM Partida WHERE idPartida = ?', [req.params.id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'Partida no encontrada'
    })
    
    res.json(rows[0])
    }
    catch (error) {
        return res.status(500).json({
            message: 'Someyhing went wrong'
        })
    }
}

export const createPartida = async (req, res) => {
    try {
        // Extraer los datos necesarios del cuerpo de la solicitud
        const { Ganador, idAcceso_VideoJuego, idTipo_Financiamiento } = req.body;

        // Verificar si los datos requeridos están presentes
        if (!Ganador || !idAcceso_VideoJuego || !idTipo_Financiamiento) {
            return res.status(400).json({
                message: 'Ganador, idAcceso_VideoJuego e idTipo_Financiamiento son campos requeridos'
            });
        }

        // Insertar una nueva partida en la base de datos
        const [result] = await pool.query('INSERT INTO Partida (Ganador, idAcceso_VideoJuego, idTipo_Financiamiento) VALUES (?, ?, ?)', [Ganador, idAcceso_VideoJuego, idTipo_Financiamiento]);

        // Devolver el ID de la nueva partida creada
        res.status(201).json({
            id: result.insertId,
            message: 'Partida creada exitosamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};
