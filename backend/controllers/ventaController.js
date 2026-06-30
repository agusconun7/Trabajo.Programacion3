const Venta = require("../models/Venta");
const VentaProducto = require("../models/VentaProducto");

const registrarVenta = async (req, res) => {

    try {

        const { cliente, total, productos } = req.body;

        const venta = await Venta.create({

            cliente,
            total

        });

        for (const producto of productos) {

            await VentaProducto.create({

                ventaId: venta.id,
                productoId: producto.id,
                cantidad: producto.cantidad

            });

        }

        res.status(201).json({

            mensaje: "Venta registrada correctamente",
            ventaId: venta.id

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje: "Error al registrar la venta"

        });

    }

};

module.exports = {

    registrarVenta

};