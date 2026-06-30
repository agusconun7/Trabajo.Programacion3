const express = require("express");

const router = express.Router();

const ventaExcelController =
require("../controllers/ventaExcelController");

router.get(
    "/",
    ventaExcelController.exportarVentas
);

module.exports = router;