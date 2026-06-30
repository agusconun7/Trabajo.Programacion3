const bcrypt = require("bcrypt");
const sequelize = require("../config/database");
const Usuario = require("../models/Usuario");

async function crearAdmin() {

    try {

        await sequelize.authenticate();

        const passwordEncriptada = await bcrypt.hash("123456", 10);

        await Usuario.create({

            nombre: "Administrador",
            correo: "admin@peritech.com",
            password: passwordEncriptada

        });

        console.log("✅ Administrador creado correctamente");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit();

    }

}

crearAdmin();