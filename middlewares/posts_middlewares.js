const sequelize = require('../database/database.js');
const posts = require('../database/models/posts.js');
const categories = require('../database/models/categories.js');
const associations = require('../database/models/associations.js');

exports.postNotFound = async (req, res, next) => {
    let postNotFound = await posts.findOne({
        where: { id: req.params.id }
    })
    if (!postNotFound) {
        res.status(404).json({ error: 'Post not found' });
    } else {
        next()
    }
};

exports.postDeleted = async (req, res, next) => {
    let postDeleted = await posts.findOne({
        where: {
            id: req.params.id,
            enable: false
        }
    })
    if (postDeleted) {
        res.status(409).json({ error: 'Conflict, post deleted' });
    } else {
        next()
    }
}