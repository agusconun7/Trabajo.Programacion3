const express = require("express");

const router = express.Router();

const loginController = require("../controllers/loginController");

router.get("/", loginController.formularioLogin);

router.post("/", loginController.iniciarSesion);

router.get("/logout", loginController.cerrarSesion);

module.exports = router;