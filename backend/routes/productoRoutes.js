const express = require("express");

const router = express.Router();

const productoController = require("../controllers/productoController");

router.get("/", productoController.obtenerProductos);

router.get("/:id", productoController.obtenerProductoPorId);

router.post("/", productoController.crearProducto);

router.put("/:id", productoController.actualizarProducto);

router.patch("/:id/desactivar", productoController.desactivarProducto);

router.patch("/:id/activar", productoController.activarProducto);

module.exports = router;