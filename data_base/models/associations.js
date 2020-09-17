const sequelize = require('../database');
const posts = require('../models/posts');
const categories = require('../models/categories');
categories.hasMany(posts, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
}, {
    foreignKey: {
        name: 'category_id',
        allowNull: false
    }
});
posts.belongsTo(categories, {
    foreignKey: {
        name: 'category_id',
        allowNull: false
    }
})