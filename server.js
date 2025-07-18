const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json()); // Middleware CRÍTICO para leer JSON
app.use('/api/tasks', require('./routes/tasks'));
app.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));