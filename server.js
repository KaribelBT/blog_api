const express = require('express');
const server = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const CSVtoJSON = require('csvtojson');
const FileSystem = require('fs');

const sequelize = require('./data_base/database.js');
const posts = require('./data_base/models/posts');
const categories = require('./data_base/models/categories');
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

// create application/json parser
server.use(bodyParser.json());
// parse various different custom JSON types as JSON
server.use(bodyParser.json({ type: 'application/*+json' }));
// parse some custom thing into a Buffer
server.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
server.use(bodyParser.text({ type: 'text/html' }));
// parse an text body into a string
server.use(bodyParser.text({ type: 'text/plain' }));
// create application/x-www-form-urlencoded parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

//inicia servidor
server.listen(port, () => {
    console.log(`Servidor Iniciado e http://localhost:${port}`);
    sequelize.sync({ alter: true }).then(() => {
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })
});

//inserta csv
categories.findAll().then(existingCategories => {
    try {
        if (existingCategories.length === 0) {
            CSVtoJSON().fromFile('./data_base/bulk_insert/categories.csv').then(categories => {
                categories.map(category => {
                    let query = sequelize.query(
                        `INSERT INTO categories (id, name)
                        VALUES (:id, :name)`,
                        {
                            replacements: {
                                id: category.id,
                                name: category.name
                            }
                        });
                    return query.then(resp => {
                        console.log('categories inserted')
                    })
                })
            });
        }
    } catch (error) {
        console.log(error)
    }
});
posts.findAll().then(existingPosts => {
    try {
        if (existingPosts.length === 0) {
            CSVtoJSON().fromFile('./data_base/bulk_insert/posts.csv').then(posts => {
                posts.map(post => {
                    let query = sequelize.query(
                        `INSERT INTO posts (id, category_id, title, content, img_url, create_date, enable)
                        VALUES (:id, :category_id, :title, :content, :img_url, :create_date, :enable)`,
                        {
                            replacements: {
                                id: post.id,
                                category_id: post.category_id,
                                title: post.title,
                                content: post.content,
                                img_url: post.img_url,
                                create_date: post.create_date,
                                enable: post.enable
                            }
                        });
                    return query.then(resp => {
                        console.log('posts inserted')
                    })
                })
            });
        }
    } catch (error) {
        console.log(error)
    }
});

//lista todos los posts que no hayan sido borrados
server.get('/posts', async (req, res) => {
    let postsListed = await posts.findAll({
        attributes: ['id', 'title', 'img_url', 'create_date'],
        where: { enable: true },
        order: [['create_date', 'DESC']],
        include: [{
            model: categories
        }]
    })
    res.json(postsListed);
});

//obtiene post por id
server.get('/posts/:id', async (req, res) => {
    try {
        let post = await posts.findOne({
            attributes: ['id', 'title', 'content', 'img_url', 'create_date'],
            where: {
                id: req.params.id,
                enable: true
            },
            include: [{
                model: categories
            }]
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' })
    }
});

//crea un post
server.post('/posts', async (req, res) => {
    const { category_id, title, content, img_url } = req.body;
    try {
        let create = await posts.create({
            category_id: category_id,
            title: title,
            content: content,
            img_url: img_url
        })
        res.status(201).json(create);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });
    }
});

//modifica datos de post por id
server.patch('/posts/:id', async (req, res) => {
    const { category_id, title, content, img_url } = req.body;
    if (!req.body) {
        let post = await posts.findOne({
            attributes: ['id', 'title', 'content', 'img_url', 'create_date'],
            where: {
                id: req.params.id,
                enable: true
            },
            include: [{
                model: categories
            }]
        });
        if (!post) {
            res.status(404).json({ error: 'Not Found' });
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
                    id: req.params.id,
                    enable: true
                },
                include: [{
                    model: categories
                }]
            });
            res.status(200).json(postUpdated);
        }
    } else {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });
    }
});

//borrado logico de post por id
server.delete('/posts/:id', async (req, res) => {
    try {
        let post = await posts.findOne({
            attributes: ['id', 'title', 'content', 'img_url', 'create_date'],
            where: {
                id: req.params.id,
                enable: true
            },
            include: [{
                model: categories
            }]
        });
        if (!post) {
            res.status(404).json({ error: 'Not Found' });
        } else {
            await posts.update({
                enable: false
            },
                { where: { id: req.params.id } }
            );
            res.status(200).json({ message: 'Success, post disabled' });
        }
    }
    catch{
        res.status(400).json({ error: 'Bad Request, invalid or missing input' })
    }
});

