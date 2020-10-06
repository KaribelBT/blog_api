'use strict';

module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING
  });

  categories.associate = models => {
    categories.hasMany(models.posts, {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    }, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      }
    });
  };

  return categories;
};