require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());



    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });


// Conectar con MySQL
db.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err);
    } else {
        console.log("Conexión a MySQL establecida.");
    }
});

// Ruta para registrar un usuario
app.post("/registrar", (req, res) => {
    const { nombre, apellidos, domicilio, edad, telefono, alergias } = req.body;

    const sql = "INSERT INTO usuarios (nombre, apellidos, domicilio, edad, telefono, alergias) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [nombre, apellidos, domicilio, edad, telefono, alergias], (err, result) => {
        if (err) {
            console.error("Error al registrar usuario:", err);
            res.status(500).json({ message: "Error al registrar usuario" });
        } else {
            res.status(200).json({ message: "Usuario registrado con éxito" });
        }
    });
});

// Servidor corriendo en el puerto 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
