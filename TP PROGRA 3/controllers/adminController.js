const Producto = require("../models/Producto");

const dashboard = async (req, res) => {

    try {

        const productos = await Producto.findAll();

        res.render("dashboard", {
            productos,
            mensaje: req.query.mensaje || null
        });
    } catch (error) {

        res.status(500).send("Error al cargar el dashboard");

    }

};

const formNuevoProducto = (req, res) => {

    res.render("nuevoProducto");

};

const guardarProducto = async (req, res) => {

    try {

        if (!req.body.nombre.trim()) {
            return res.status(400).send("El nombre es obligatorio.");
        }



        if (Number(req.body.precio) <= 0) {
            return res.render("nuevoProducto", {
                error: "El precio debe ser mayor a 0."
            });
        }

        if (!req.body.descripcion.trim()) {
            return res.status(400).send("La descripción es obligatoria.");
        }

        const categorias = [
            "Teclados",
            "Mouses",
            "Monitores",
            "Auriculares"
        ];

        if (!categorias.includes(req.body.categoria)) {
            return res.status(400).send("Categoría inválida.");
        }

        if (!req.file) {
            return res.status(400).send("Debe seleccionar una imagen.");
        }

        await Producto.create({

            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            imagen: req.file.filename,
            activo: true

        });

        res.redirect("/admin?mensaje=creado");

    

    } catch (error) {

        console.error(error);

        res.status(500).send("Error al guardar el producto");

    }

};

const formEditarProducto = async (req, res) => {

    try {

        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {

            return res.status(404).send("Producto no encontrado");

        }

        res.render("editarProducto", {
            producto
        });

    } catch (error) {

        res.status(500).send("Error al cargar el formulario");

    }

};

const actualizarProducto = async (req, res) => {

    try {

        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {

            return res.status(404).send("Producto no encontrado");

        }

        const datosActualizados = {

            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria

        };

        if (req.file) {

            datosActualizados.imagen = req.file.filename;

        }
        
        if (!req.body.nombre.trim()) {
            return res.status(400).send("El nombre es obligatorio.");
        }

        if (Number(req.body.precio) <= 0) {
            return res.render("editarProducto", {
                producto,
                error: "El precio debe ser mayor a 0."
            });
        }

        if (!req.body.descripcion.trim()) {
            return res.status(400).send("La descripción es obligatoria.");
        }

        await producto.update(datosActualizados);

        res.redirect("/admin?mensaje=editado");

    } catch (error) {

        console.error(error);
        res.status(500).send("Error al actualizar el producto");

    }

};

const desactivarProducto = async (req, res) => {

    try {

        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {

            return res.status(404).send("Producto no encontrado");

        }

        await producto.update({

            activo: false

        });

        res.redirect("/admin?mensaje=desactivado");

    } catch (error) {

        console.error(error);

        res.status(500).send("Error al desactivar");

    }

};

const activarProducto = async (req, res) => {

    try {

        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {

            return res.status(404).send("Producto no encontrado");

        }

        await producto.update({

            activo: true

        });

        res.redirect("/admin?mensaje=activado");

    } catch (error) {

        console.error(error);

        res.status(500).send("Error al activar");

    }

};

module.exports = {

    dashboard,
    formNuevoProducto,
    guardarProducto,
    formEditarProducto,
    actualizarProducto,
    activarProducto,
    desactivarProducto
};