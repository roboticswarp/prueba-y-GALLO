const pool = require('../db');

exports.create = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        console.log('Datos recibidos:', { title, description, completed });
        if (!title || title.trim() === '') return res.status(400).json({ error: 'Título es requerido' });
        const [result] = await pool.execute('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)', [title, description || null, completed ?? false]);
        res.status(201).json({ id: result.insertId, title, description, completed: completed ?? false });
    } catch (error) { res.status(500).json({ message: "Error del servidor" }); }
};

exports.getAll = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) { res.status(500).json({ message: "Error del servidor" }); }
};

exports.getById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({ message: "Tarea no encontrada" });
        res.status(200).json(rows[0]);
    } catch (error) { res.status(500).json({ message: "Error del servidor" }); }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const [task] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
        if (task.length === 0) return res.status(404).json({ message: "Tarea no encontrada" });
        if (!title || title.trim() === '') return res.status(400).json({ error: 'Título es requerido' });
        
        const newCompleted = completed === undefined ? task[0].completed : completed;
        await pool.execute('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?', [title, description || null, newCompleted, id]);
        res.status(200).json({ message: "Tarea actualizada" });
    } catch (error) { res.status(500).json({ message: "Error del servidor" }); }
};

exports.delete = async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Tarea no encontrada" });
        res.status(204).send();
    } catch (error) { res.status(500).json({ message: "Error del servidor" }); }
};