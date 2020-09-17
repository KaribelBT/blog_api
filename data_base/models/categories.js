const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class categories extends Model { }
categories.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }    
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true    
});

module.exports = categories;