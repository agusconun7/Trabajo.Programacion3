const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const sequelize = require("./config/database");
const session = require("express-session");
const productoRoutes = require("./routes/productoRoutes");
const loginRoutes = require("./routes/loginRoutes");
const ventaRoutes = require("./routes/ventaRoutes");
const ventaExcelRoutes =
require("./routes/ventaExcelRoutes");

require("./models/Producto");
require("./models/Usuario");
require("./models/Venta");
require("./models/VentaProducto");



dotenv.config();

const path = require("path");

const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 3000;


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "peritech2026",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

app.use("/ventas", ventaRoutes);
app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/productos", productoRoutes);
app.use("/excel", ventaExcelRoutes);


app.get("/", (req, res) => {
    res.send("🚀 Bienvenido al servidor de PeriTech Store");
});


async function iniciarServidor() {

    try {

        await sequelize.authenticate();
        console.log("✅ Conectado correctamente a MySQL");

        await sequelize.sync();
        console.log("✅ Base de datos sincronizada");

        app.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {

        console.error("❌ Error al iniciar el servidor");
        console.error(error);

    }

}

iniciarServidor();