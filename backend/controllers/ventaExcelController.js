const XLSX = require("xlsx");
const Venta = require("../models/Venta");

const exportarVentas = async (req, res) => {

    try {

        const ventas = await Venta.findAll({
            raw: true
        });

        const datos = [];

        for (let i = 0; i < ventas.length; i++) {

            datos.push({

                ID: ventas[i].id,

                Cliente: ventas[i].cliente,

                Fecha: new Date(ventas[i].fecha)
                    .toLocaleDateString("es-AR"),

                Total: Number(ventas[i].total)

            });

        }

        const libro = XLSX.utils.book_new();

        const hoja = XLSX.utils.json_to_sheet(datos);

        XLSX.utils.book_append_sheet(
            libro,
            hoja,
            "Ventas"
        );

        const buffer = XLSX.write(libro, {
            type: "buffer",
            bookType: "xlsx"
        });

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=ventas.xlsx"
        );

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.send(buffer);

    } catch (error) {

        console.error(error);

        res.status(500).send("Error al generar el Excel");

    }

};

module.exports = {
    exportarVentas
};