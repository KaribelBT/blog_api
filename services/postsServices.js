const db = require('../models');
const { posts, categories } = db;

const list = async () => {
    try {
        return await posts.findAll({
            attributes: ['id', 'title', 'img_url', 'createdAt'],
            where: { enable: true },
            order: [['createdAt', 'DESC']],
            include: [{
                model: categories,
                attributes: ['id', 'name']
            }]
        })
    } catch (error) {
        console.log(error);
    }
};

const getById = async (id) => {
    try {
        return await posts.findOne({
            attributes: ['id', 'title', 'content', 'img_url', 'createdAt'],
            where: {
                id: id
            },
            include: [{
                model: categories,
                attributes: ['id', 'name']
            }]
        });       
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    list,
    getById
}
