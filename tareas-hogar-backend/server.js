const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks'); // Verifica que esta ruta sea correcta
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de tareas
app.use('/tasks', taskRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});