/* const sequelize = require('../database/database.js');
const posts = require('../database/models/posts.js');
const categories = require('../database/models/categories.js');
const associations = require('../database/models/associations.js');

exports.listPosts = async (req, res) => {
    let postsListed = await posts.findAll({
        attributes: ['id', 'title', 'img_url', 'create_date'],
        where: { enable: true },
        order: [['create_date', 'DESC']],
        include: [{
            model: categories
        }]
    })
    res.json(postsListed);
};

exports.createPost = async (req, res) => {
    const { category_id, title, content, img_url } = req.body;
    try {
        let create = await posts.create({
            category_id: category_id,
            title: title,
            content: content,
            img_url: img_url
        })
        let newPost = await posts.findOne({
            attributes: ['id', 'title', 'content', 'img_url', 'create_date'],
            where: {
                id: create.id
            },
            include: [{
                model: categories
            }]
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        let post = await posts.findOne({
            attributes: ['id', 'title', 'content', 'img_url', 'create_date'],
            where: {
                id: req.params.id
            },
            include: [{
                model: categories
            }]
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });
    }
};

exports.updatePost = async (req, res) => {
    const { category_id, title, content, img_url } = req.body;    
    if (!req.body) {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });          
    } else {
        let postUpdated = await posts.update({
            category_id: category_id,
            title: title,
            content: content,
            img_url: img_url
        },
            { where: { id: req.params.id } }
        );
        postUpdated = await posts.findOne({
            attributes: ['id', 'title', 'content', 'img_url', 'create_date'],
            where: {
                id: req.params.id
            },
            include: [{
                model: categories
            }]
        });
        res.status(200).json(postUpdated);           
    }
};

exports.deletePost = async (req, res) => {
    try {
        await posts.update({
            enable: false
        },
            { where: { id: req.params.id } }
        );
        res.status(200).json({ message: 'Success, post disabled' });
    }
    catch{
        res.status(400).json({ error: 'Bad Request, invalid or missing input' })
    }
}; */