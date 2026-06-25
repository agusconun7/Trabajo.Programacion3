const Producto = require("../models/Producto");

const obtenerProductos = async (req, res) => {

    try{

        const productos = await Producto.findAll();

        res.json(productos);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener los productos"
        });

    }

};



const obtenerProductoPorId = async (req, res) => {

    try {

        const id = req.params.id;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al buscar el producto"
        });

    }

};
const crearProducto = async (req, res) => {

    try {

        const producto = await Producto.create({

            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            imagen: req.body.imagen,
            activo: req.body.activo

        });

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            producto
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al crear el producto"
        });

    }

};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto
};