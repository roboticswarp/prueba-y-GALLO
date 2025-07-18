const pool = require('../db');

// CREAR TAREA
exports.crearTarea = async (req, res) => {
    try {
        // Desestructuramos del cuerpo de la petición
        const { titulo, descripcion, completado } = req.body;

        // Validación de entrada
        if (!titulo || titulo.trim() === '') {
            return res.status(400).json({ error: 'El título es requerido' });
        }

        // Ejecución de la consulta SQL
        const [resultado] = await pool.execute(
            'INSERT INTO tareas (titulo, descripcion, completado) VALUES (?, ?, ?)',
            [titulo, descripcion || null, completado ?? false]
        );

        // Respuesta exitosa
        res.status(201).json({ 
            id: resultado.insertId, 
            titulo: titulo, 
            descripcion: descripcion, 
            completado: completado ?? false 
        });

    } catch (error) {
        // Manejo de errores del servidor
        console.error("Error al crear tarea:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// OBTENER TODAS LAS TAREAS
exports.obtenerTodas = async (req, res) => {
    try {
        const [tareas] = await pool.query('SELECT * FROM tareas ORDER BY creado_en DESC');
        res.status(200).json(tareas);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// OBTENER TAREA POR ID
exports.obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [tarea] = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]);
        
        if (tarea.length <= 0) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.status(200).json(tarea[0]);
    } catch (error) {
        console.error("Error al obtener tarea por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// ACTUALIZAR TAREA
exports.actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, completado } = req.body;

        // Verificar si la tarea existe
        const [tareaExistente] = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]);
        if (tareaExistente.length === 0) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        // Validación
        if (!titulo || titulo.trim() === '') {
            return res.status(400).json({ error: 'El título es requerido' });
        }

        // Lógica para no sobreescribir 'completado' si no viene en la petición
        const nuevoEstadoCompletado = completado === undefined ? tareaExistente[0].completado : completado;

        await pool.execute(
            'UPDATE tareas SET titulo = ?, descripcion = ?, completado = ? WHERE id = ?',
            [titulo, descripcion || null, nuevoEstadoCompletado, id]
        );
        res.status(200).json({ message: "Tarea actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// ELIMINAR TAREA
exports.eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.execute('DELETE FROM tareas WHERE id = ?', [id]);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.status(204).send(); // Sin contenido
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};