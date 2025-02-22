const express = require("express");
const pkg = require("pg")
const cors = require("cors")
const app = express();
const PORT = 5000;
require('dotenv').config();


app.use(express.json());
app.use(cors(/* { origin: "http://localhost:3000" } */))

const { Pool } = pkg
const pool = new Pool({
  user: 'joaco',
  host: 'dpg-cusgqqjqf0us739k9g4g-a',
  database: 'database_41qg',
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false },
})

pool.connect()
  .then(() => console.log("🟢 Conectado a PostgreSQL"))
  .catch(err => console.error("🔴 Error de conexión:", err));

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    materia VARCHAR(30) NOT NULL,
    descripcion TEXT
  )
`;

async function setupDatabase() {
     try {
        await pool.query(createTableQuery);
        console.log("✅ Tabla 'estudiantes' verificada o creada exitosamente.");
     } catch (error) {
        console.error("🔴 Error al conectar con la base de datos:", error.message)
     }
}

setupDatabase()

app.get("/estudiantes", async (req, res) => {
    const query = "SELECT * FROM estudiantes";

    try {
        const { rows } = await pool.query(query);
        console.log("Datos obtenidos:", rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error al obtener los datos" });
    }
});

app.post("/estudiantes", async (req, res) => {
    const { name, lastname, selectOption, description } = req.body;

    const query = `
        INSERT INTO estudiantes (nombre, apellido, materia, descripcion) 
        VALUES ($1, $2, $3, $4) RETURNING id
    `;

    try {
        const { rows } = await pool.query(query, [name, lastname, selectOption, description]);
        const newId = rows[0].id;

        console.log("Datos guardados:", name, lastname, selectOption, description);
        res.status(201).json({ 
            message: "Datos guardados exitosamente", 
            data: { id: newId, name, lastname, selectOption, description }
        });
    } catch (error) {
        console.error("Error al guardar los datos en PostgreSQL:", error.message);
        res.status(500).json({ error: "Error al guardar los datos" });
    }
});

app.delete("/estudiantes", async (req, res) => {
    const { id, name } = req.body;

    if (!id) {
        console.log(id);
        return res.status(400).json({ error: "Se requiere el ID del estudiante para eliminar" });
    }

    const query = "DELETE FROM estudiantes WHERE id = $1";

    try {
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No se encontró el estudiante con ese ID" });
        }

        console.log("Estudiante " + name + " se ha eliminado");
        res.status(200).json({ message: "El estudiante se ha eliminado correctamente" });
    } catch (error) {
        console.error("No se ha podido eliminar:", error);
        res.status(500).json({ error: "No se pudo eliminar el estudiante" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
