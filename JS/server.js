require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());



    const db = mysql.createConnection({
        host: process.env.DB_HOST || "bvgn6ybckjdhlv5nosbd-mysql.services.clever-cloud.com",
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || "u8r5nolzthslbkjq",
        password: process.env.DB_PASSWORD || "L9IRmSrKXAC2WVpXHmQo",
        database: process.env.DB_NAME || "bvgn6ybckjdhlv5nosbd"
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
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
