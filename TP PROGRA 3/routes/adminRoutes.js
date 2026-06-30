const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const adminController = require("../controllers/adminController");
const verificarLogin = require("../middlewares/authMiddleware");

router.use(verificarLogin);

router.get("/", adminController.dashboard);

router.get("/editar/:id", adminController.formEditarProducto);

router.get("/nuevo", adminController.formNuevoProducto);

router.post(
    "/nuevo",
    upload.single("imagen"),
    adminController.guardarProducto
);

router.post(
    "/editar/:id",
    upload.single("imagen"),
    adminController.actualizarProducto
);


router.post("/desactivar/:id", adminController.desactivarProducto);

router.post("/activar/:id", adminController.activarProducto);

module.exports = router;