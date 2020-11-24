'use strict'
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.hasMany(
        models.Posts,
        {
          onDelete: "NO ACTION",
          onUpdate: "NO ACTION",
        },
        {
          foreignKey: {
            name: "categoryId",
            allowNull: false,
          },
        }
      );
    }
  }
  Categories.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Categories",
    }
  );
  return Categories;
};
