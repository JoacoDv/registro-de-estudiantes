
/* const express = require('express');
const sqlite = require('sqlite3');
const app = express();
const PORT = 5000;
const path = require("path");
const dbPath = path.resolve(__dirname, "estudiantes.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (error) => {
    if (error) {
        console.error("Error al conectar con la base de datos:", error);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});


app.post("/api/data", (req, res) => {
    const { name, lastname, selectOption, description } = req.body;

    // Consulta SQL usando parámetros
    const query = `INSERT INTO estudiantes (nombre, apellido, materia, descripcion) VALUES (?, ?, ?, ?)`;
    const table = "CREATE TABLE IF NOT EXIST estudiantes (id INT PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(30) NOT NULL, apellido VARCHAR(30) NOT NULL, materia VARCHAR(30) NOT NULL, descripcion VARCHAR(300))"
    
    db.run(table, (error) => {
        if (error) {
            console.log(error)
        }
    })
    db.run(query, [name, lastname, selectOption, description], function(error) {
        if (error) {
            console.error("Error al guardar los datos en SQLite:", error);
            res.status(500).json({ error: "Error al guardar los datos" });
        } else {
            console.log(name, lastname, selectOption, description);
            res.status(201).json({ 
                message: "Datos guardados exitosamente", 
                data: { id: this.lastID, name, lastname, selectOption, description }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

 */


/* 
// Configura la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost', // O la dirección de tu base de datos
    user: 'root',
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
}); */



const sqlite = require("sqlite3").verbose();
const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors(/* { origin: "http://localhost:3000" } */))

const db = new sqlite.Database("./estudiantes.db", sqlite.OPEN_READWRITE, (error) => {
    if (error) {
        console.error("Error al conectar con la base de datos:", error.message);
    } else {
        console.log("Conexión exitosa a la base de datos");
        
        // Crear la tabla si no existe
        const createTableQuery = `CREATE TABLE IF NOT EXISTS estudiantes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(30) NOT NULL,
            apellido VARCHAR(30) NOT NULL,
            materia VARCHAR(30) NOT NULL,
            descripcion VARCHAR(300)
        )`;
        
        db.run(createTableQuery, (error) => {
            if (error) {
                console.error("Error al crear la tabla: ", error.message);
            } else {
                console.log("Tabla 'estudiantes' verificada o creada exitosamente.");
            }
        });
    }
});

app.get("/estudiantes", (req, res) => {
    const query = "SELECT * FROM estudiantes"

    db.all(query, (error, rows) => {
        if(error) { 
            console.log(error); 
            res.status(500).json({ error: "Error al guardar los datos" });
        }
        else {
            console.log("Datos obtenidos: ", rows)
            res.status(200).json(rows)
        }
    })
})

app.get("/estudiantes/buscador", (req, res) => {
    const {name, lastname, materia} = req.query;
    let query = `SELECT * FROM estudiantes `; 
    const params = []
 
    //req.query params
    console.log(name);
    console.log(lastname);
    console.log(materia);

    if(name) {
        const queryName = `nombre='${name}' `;
        params.push(queryName)                                              
    }
    if(lastname) {
        const queryLastname = `apellido='${lastname}' `
        params.push(queryLastname)                                        
    }
    if(materia !== "Todas") {
        const queryMateria = `materia='${materia}' `
        params.push(queryMateria)
    }
    if (params.length > 0) {
        query += `WHERE ` + params.join("AND ")
    }
    console.log(query)

    db.all(query, (error, rows) => {
        if (error) {
            console.error("No se a podido realizar la busqueda");
            console.log(error)
            res.status(500).json({error: "error al realizar la busqueda"});
        } else {
            console.log(rows);
            res.status(200).json(rows);
        }
    })
})

app.put("/estudiantes", (req, res) => {
    const {id, nombre, apellido, materia, descripcion} = req.body;
    const query = "UPDATE estudiantes SET nombre = ?, apellido = ?, materia = ?, descripcion = ? WHERE id = ? "

    db.run(query,[nombre, apellido, materia, descripcion, id], (error) => {
        if(error) {
            console.error("Error al modificar los datos: ", error);
            res.status(500).json({error: "error al modificar los datos"})
        } else {
            console.log("Estudiante modificado");
            res.status(200).json({ message: "Estudiante modificado con exito"});
        }
    })
})

// Ruta para insertar datos
app.post("/estudiantes", (req, res) => {
    const { name, lastname, selectOption, description } = req.body;

    const query = `INSERT INTO estudiantes (nombre, apellido, materia, descripcion) VALUES (?, ?, ?, ?)`;

    db.run(query, [name, lastname, selectOption, description], function(error) {
        if (error) {
            console.error("Error al guardar los datos en SQLite:", error.message);
            res.status(500).json({ error: "Error al guardar los datos" });
        } else {
            console.log("Datos guardados:", name, lastname, selectOption, description);
            res.status(201).json({ 
                message: "Datos guardados exitosamente", 
                data: { id: this.lastID, name, lastname, selectOption, description }
            });
        }
    });
});

app.delete("/estudiantes", (req, res) => {
    const {id, name} = req.body

    const query = "DELETE FROM estudiantes WHERE id=?"

    if (!id) {
        console.log(id)
        return res.status(400).json({ error: "Se requiere el ID del estudiante para eliminar" });
    }

    db.run(query, [id], (error) => {
        if (error) {
            console.error("No se ha podidio eliminar: ", error);
            res.status(500).json({error: "No se puedo eliminar el estudiante"});
        }
        else {
            console.log("EStudiante " + name + " se a eliminado");
            res.status(200).json({ message: "El estudiante se a eliminado correctamente"})
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
