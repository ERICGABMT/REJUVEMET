require("dotenv").config();
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error("Error: Faltan variables de entorno en el archivo .env");
    process.exit(1); // Detener ejecución si faltan datos
}

    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3307,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });


// Conectar con MySQL--------------------------------------------------------------------------------------------------------
db.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err);
    } else {
        console.log("Conexión a MySQL establecida.");
    }
});

// Ruta para registrar un usuario---------------------------------------------------------------------------------------------
app.post("/registrar", (req, res) => {
    const { nombre, apellidos, domicilio, edad, telefono, contraseña, alergias } = req.body;

    const sql = "INSERT INTO Paciente (nombre, apellidos, domicilio, edad, telefono, contraseña, alergias) VALUES (?, ?, ?, ?, ?, ?, ?node)";
    db.query(sql, [nombre, apellidos, domicilio, edad, telefono, contraseña, alergias], (err, result) => {
        if (err) {
            console.error("Error al registrar usuario:", err);
            res.status(500).json({ message: "Error al registrar usuario" });
        } else {
            res.status(200).json({ message: "Usuario registrado con éxito" });
        }
    });
});

//Ruta para iniciar sesion-----------------------------------------------------------------------------------------------------
app.post("/iniciar_sesion", (req, res) => {
    const { contraseña } = req.body; // Usamos teléfono como identificador único

    if (!contraseña) {
        return res.status(400).json({ message: "La contraseña es obligatoria" });
    }

    const sql = "SELECT * FROM Paciente WHERE contraseña = ?";
    
    db.query(sql, [contraseña], (err, result) => {
        if (err) {
            console.error("Error al verificar usuario:", err);
            return res.status(500).json({ message: "Error en el servidor" });
        }

        if (result.length > 0) {
            res.status(200).json({ success: true, message: "Usuario encontrado" });
        } else {
            res.status(401).json({ success: false, message: "Usuario no registrado" });
        }
    });
});

// Servidor corriendo en el puerto 8080
const PORT = process.env.PORT || 7009;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
