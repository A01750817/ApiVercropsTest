import {pool} from '../db.js'

export const getUsuarios = async (req, res) => { 
    try {
        const [rows] =await pool.query('SELECT * FROM Usuario');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Someyhing went wrong'
        })
    }

}
 
export const getUsuario = async (req, res) =>{
    try {
        console.log(req.params.id)
        const [rows] = await pool.query('SELECT * FROM Usuario WHERE idUsuario = ?', [req.params.id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })
    
    res.json(rows[0])
    }
    catch (error) {
        return res.status(500).json({
            message: 'Someyhing went wrong'
        })
    }
}

export const createUsuarios = async (req, res) => { 
    try{
        const {idUsuario, Correo, Contrasena, Nombre, Apellido, FechaNacimiento, Telefono, idTipo_Usuario} = req.body;
        const [rows] = await pool.query('INSERT INTO Usuario (idUsuario, Correo, Contrasena, Nombre, Apellido, FechaNacimiento, Telefono, idTipo_Usuario) VALUES (?,?,?,?,?,?,?,?)', [idUsuario, Correo, Contrasena, Nombre, Apellido, FechaNacimiento, Telefono, idTipo_Usuario])
        res.send({
        id: rows.insertId,
        Correo : Correo,
        Contrasena : Contrasena,
        Nombre : Nombre,
        Apellido : Apellido,
        FechaNacimiento : FechaNacimiento,
        Telefono : Telefono,
        idTipo_Usuario : idTipo_Usuario
    })
    }catch (error) {
        return res.status(500).json({
            message: 'Someyhing went wrong'
        })
    }
}




export const deleteUsuario = async (req, res) => {
    try{
        const [result] = await pool.query('DELETE FROM Usuario WHERE idUsuario = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({ 
            message: 'Usuario no encontrado'
        })
        res.sendStatus(204);
    }catch (error) {
        return res.status(500).json({
            message: 'Someyhing went wrong'
        })
    }
    
}

export const updateUsuario = async (req, res) => {
    
    const {id} = req.params; // Access idUsuario from req.params
    const { Correo, Contrasena, Nombre, Apellido, FechaNacimiento, Telefono, idTipo_Usuario } = req.body;

    try{
        const [result] = await pool.query('UPDATE Usuario SET Correo = IFNULL(?, Correo), Contrasena = IFNULL(?, Contrasena), Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?, Apellido), FechaNacimiento = IFNULL(?, FechaNacimiento), Telefono = IFNULL(?, Telefono), idTipo_Usuario = IFNULL(?, idTipo_Usuario) WHERE idUsuario = ?', [Correo, Contrasena, Nombre, Apellido, FechaNacimiento, Telefono, idTipo_Usuario, id]);
        if(result.affectedRows === 0) return res.status(404).json({
        message: 'Usuario no encontrado'
        });
        const [rows] = await pool.query('SELECT * FROM Usuario WHERE idUsuario = ?', [id])
        res.json(rows[0]);
    }catch (error) {
        return res.status(500).json({
            message: 'Someyhing went wrong'
        })
    }
    

    
  };
  
  