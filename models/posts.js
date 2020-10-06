'use strict';

module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    img_url: DataTypes.STRING,
    enable: DataTypes.BOOLEAN
  });
  posts.associate = models => {
    posts.belongsTo(models.categories, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      }
    })
  };
  return posts;
};