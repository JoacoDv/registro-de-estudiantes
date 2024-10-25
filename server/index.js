const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

app.use(express.json());

app.post('/api/data', (req, res) => {
    const { name, email } = req.body;

    // Consulta SQL para insertar datos en la tabla
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (error, result) => {
        if (error) {
            console.error('Error al guardar los datos en MySQL:', error);
            res.status(500).json({ error: "Error al guardar los datos" });
        } else {
            res.status(201).json({ message: "Datos guardados exitosamente", data: { id: result.insertId, name, email } });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



// Configura la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost', // O la dirección de tu base de datos
    user: 'joaco',
    password: 'Jdv030903@',
    database: 'estudiantes'
});

// Conéctate a la base de datos
db.connect(error => {
    if (error) {
        console.error('Error al conectar a MySQL:', error);
    } else {
        console.log('Conectado a MySQL');
    }
});