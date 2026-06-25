const productoRoutes = require("./routes/productoRoutes");
const Producto = require("./models/Producto");
const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/productos", productoRoutes);
// Ruta de prueba
app.get("/", (req, res) => {
    res.send("🚀 Bienvenido al servidor de PeriTech Store");
});

// Conexión a MySQL
sequelize.authenticate()
.then(async () => {

    console.log("✅ Conectado correctamente a MySQL");

    await Producto.sync();

    console.log("✅ Tabla productos lista");

    app.listen(PORT, () => {

        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });

})
.catch((error) => {

    console.error(error);

});