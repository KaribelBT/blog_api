const db = require('../models');
const { Posts, Categories } = db;
const postsJoiValidation = require("../joivalidation/posts");

const list = async () => {
    try {
        return await Posts.findAll({
            attributes: ['id', 'title', 'img_url', 'createdAt'],
            order: [['createdAt', 'DESC']],
            include: [{
                model: Categories,
                attributes: ['id', 'name']
            }]
        })
    } catch (error) {
        console.log(error);
    }
};

const getById = async (id) => {
    try {
        return await Posts.findOne({
            attributes: ['id', 'title', 'content', 'img_url', 'createdAt'],
            where: { id: id },
            include: [{
                model: Categories,
                attributes: ['id', 'name']
            }]
        });
    } catch (error) {
        console.log(error);
    }
}

const create = async (data) => {
    try {
        await postsJoiValidation(data); 
        return await Posts.create(data);        
    } catch (error) {
        console.log(error);
    }
}

const deleteById = async (id) => {
    try {
        const post = await db.Posts.findByPk(id);
        if (!post) {
          deletedEntry = null;
        } else {
          await db.Posts.destroy({
            where: {
              id,
            },
          });
        }
        return post;
      } catch (error) {
        console.log(error);
      }
}

module.exports = {
    list,
    getById,
    create,
    deleteById
}
