const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const formularioLogin = (req, res) => {

    res.render("login");

};



const iniciarSesion = async (req, res) => {

    try {

        const usuario = await Usuario.findOne({

            where: {
                correo: req.body.correo
            }

        });

        if (!usuario) {

            return res.send("Correo incorrecto");

        }

        const coincide = await bcrypt.compare(

            req.body.password,
            usuario.password

        );

        if (!coincide) {

            return res.send("Contraseña incorrecta");

        }

        req.session.usuario = usuario.id;

        res.redirect("/admin");

    } 
    catch (error) {

        console.error("ERROR LOGIN:");
        console.error(error);

        res.status(500).send(error.message);

    }

};

const cerrarSesion = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

};

module.exports = {

    formularioLogin,
    iniciarSesion,
    cerrarSesion

};