const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");



const Venta = sequelize.define("Venta", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }

}, {
    tableName: "ventas",
    timestamps: false
});



module.exports = Venta;