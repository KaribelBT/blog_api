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

//lista todos los posts que no hayan sido borrados
server.get('/posts', async (req, res) => {
    let postsList = await myPost.list(sql);
    res.status(200).json(postsList);
});

//obtiene post por id
server.get('/posts/:id', myPost.postNotFound(sql), myPost.postDeleted(sql), async (req, res) => {
    let post = await myPost.get(sql, req.params.id);
    post = post[0];
    res.status(200).json(post);
});

//crea un post
server.post('/posts', async (req, res) => {
    const { id_category, title, content, img_url } = req.body;
    let create = await myPost.create(sql, id_category, title, content, img_url);
    if (create.length > 0) {
        let post = await myPost.get(sql, create[0]);
        res.status(201).json({ post });
    } else {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });
    }
});

//modifica datos de post por id
server.patch('/posts/:id', myPost.postNotFound(sql), myPost.postDeleted(sql), async (req, res) => {
    const { id_category, title, content, img_url } = req.body;
    try {
        await myPost.update(sql, req.params.id, id_category, title, content, img_url);
        let postUpdated = await myPost.get(sql, req.params.id);
        postUpdated = postUpdated[0];
        res.status(200).json({ postUpdated });
    } catch {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' })
    };
});

//borrado logico de post por id
server.delete('/posts/:id', myPost.postNotFound(sql), myPost.postDeleted(sql), async (req, res) => {
    try {
        await myPost.delete(sql, req.params.id);
        res.status(200).json({ message: 'Success, product disabled' });
    }
    catch{
        res.status(400).json({ error: 'Bad Request, invalid or missing input' })
    }
});