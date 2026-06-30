const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VentaProducto = sequelize.define("VentaProducto", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    ventaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    tableName: "venta_productos",
    timestamps: false
});

module.exports = VentaProducto;