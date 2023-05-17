import { pool } from '../db.js';
//cosa para encriptar las contraseñas
import bcrypt from 'bcrypt';
const saltRounds = 10;



export const getUsuarios = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM usuario')
        res.send(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Algo ha salido mal'
        })
    }
}

export const getUsuario = async (req, res)=>{
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ? ',[req.params.id])
    
    if(rows.length <= 0) return res.status(404).json({
        message:"Registro no encotrado"
    })
    
    res.send(rows[0])
}

export const postUsuario = async (req, res) => {
    const { nombre, apellidos, correo, pass, username } = req.body;
  
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(pass, saltRounds);
  
      const [rows] = await pool.query('INSERT INTO `bibliorese`.`usuario` (`nombre`, `apellidos`, `correo`, `pass`, `username`) VALUES (?,?,?,?,?);', [nombre, apellidos, correo, hashedPassword, username]);
      res.send({
        id: rows.insertId,
        username,
        correo
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  };

  export const InicioSesion = async (req, res) =>{
    const {username, pass} = req.body
    const [rows] = await pool.query('SELECT * FROM usuario WHERE username = ? || correo = ?',[username, username])
    if(rows.length > 0){
        const passwordMatch = await bcrypt.compare(pass, rows[0].pass)
        if(passwordMatch){
            res.json({
                Resultado: true,
                message:"Usuario y contraseña correctos"
            })
        }else{
            res.json({
                Resultado: false,
                message:"Contraseña erronea"
            })
        }
    }else{
        res.json({
            Resultado: false,
            message:"Usuario no se encontró"
        })
    }
  }

  export const putUsuarios = async (req, res)=>{
    const {id} = req.params
    const { nombre, apellidos, username } = req.body;

    const [result] = await pool.query('UPDATE usuario SET nombre=?, apellidos=?, username=? WHERE id_usuario = ?',[nombre, apellidos, username, id]);

    if(result.affectedRows === 0) return res.status(404).json({
        message: "No se pudo encontrar el registro"
    })

    const[rows] = await pool.query('SELECT * FORM usuario WHERE id_usuario = ?',[id])

    res.json(rows[0])
}

export const deleteUsuarios = (req, res)=>{res.send('Eliminando datos');}