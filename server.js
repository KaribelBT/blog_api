const express = require('express');
const server = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const sql = new Sequelize('mysql://root@127.0.0.1:3306/blog_api')
const posts = require('./models/posts.js');
let myPost = new posts.Posts();

server.use(bodyParser.json());
server.use(cors());

//inicia servidor
server.listen(port, () => {
    console.log('Servidor Iniciado');
});

//obtiene post por id
server.get('/posts/:id', myPost.postNotFound(sql), async (req, res) => {
    let post = await myPost.get(sql, req.params.id);
    post = post[0];
    res.status(200).json(post);
});

//crea un post
server.post('/posts', async (req, res) => {
    let create = await myPost.create(sql, sql, id_category, title, content, img_url);
    if (create.length > 0) {
        let post = await myPost.get(sequelize, create[0]);
        res.status(201).json({ post });
    } else {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });
    }
});