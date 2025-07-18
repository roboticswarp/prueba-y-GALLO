const express = require('express');
const router = express.Router();

// Importamos el controlador con un nombre claro en español
const tareasController = require('../controllers/tareasController');

// Definimos las rutas y las asociamos a las funciones del controlador
// POST para crear un nuevo recurso
router.post('/', tareasController.crearTarea);

// GET para obtener todos los recursos
router.get('/', tareasController.obtenerTodas);

// GET para obtener un recurso específico por su ID
router.get('/:id', tareasController.obtenerPorId);

// PUT para actualizar un recurso específico por su ID
router.put('/:id', tareasController.actualizarTarea);

// DELETE para eliminar un recurso específico por su ID
router.delete('/:id', tareasController.eliminarTarea);

module.exports = router;