import { pool } from '../db.js';

export const getEditoriales = async (req, res)=>{
    // try{
    //     const [rows] = await pool.query('SELECT * FROM editorial')
    //     res.send(rows)
    // }catch(error){
    //     return res.status(500).json({
    //         message: 'Algo ha salido mal'
    //     })
    // }
            const [rows] = await pool.query('SELECT * FROM editorial')
        res.send(rows)
}

export const getEditorial = async (req, res)=>{
    const [rows] = await pool.query('SELECT * FROM editorial WHERE id_editorial = ? ',[req.params.id])
    
    if(rows.length <= 0) return res.status(404).json({
        message:"Registro no encotrado"
    })
    
    res.send(rows[0])
}

export const postEditoriales = async (req, res)=>{
    const {name, sitioWeb, estatus} = req.body
    const [rows] = await pool.query('INSERT INTO `bibliorese`.`editorial` (`nombreEditorial`, `sitioWeb`, `estatus`) VALUES (?, ?, ?);',[name, sitioWeb, estatus])
    res.send({
        id: rows.insertId,
        name,
        sitioWeb
    });
}

export const putEditoriales = async (req, res)=>{
    const {id} = req.params
    const {name, url} = req.body

    const [result] = await pool.query('UPDATE editorial SET nombreEditorial=?, sitioWeb=? WHERE id_editorial = ?',[name, url, id]);

    if(result.affectedRows === 0) return res.status(404).json({
        message: "No se pudo encontrar el registro"
    })

    const[rows] = await pool.query('SELECT * FORM editorial WHERE id_editorial = ?',[id])

    res.json(rows[0])
}

export const deleteEditoriales = async (req, res)=>{
    const result = await pool.query('DELETE FROM editorial WHERE id_editorial = ?',[req.params.id])
    
    if(result.affectedRows <= 0) return res.status(404).json({
        message: "No se pudo eliminar el registro"
    })
    
    res.sendStatus(204);
}