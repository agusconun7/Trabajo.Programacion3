const express = require("express");

const router = express.Router();

const productoController = require("../controllers/productoController");

router.get("/", productoController.obtenerProductos);

router.get("/:id", productoController.obtenerProductoPorId);

router.post("/", productoController.crearProducto);

module.exports = router;