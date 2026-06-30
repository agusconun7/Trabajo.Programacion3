const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Producto = sequelize.define("Producto", {



    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },

    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },

    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },

    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

},{
    tableName: "productos",
    timestamps: false
});




module.exports = Producto;