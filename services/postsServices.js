const db = require('../models');
const { posts, categories } = db;

const listPosts = async () => {
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

module.exports = {
    listPosts
}
