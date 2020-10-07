const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/postsControllers');

//lista todos los posts
router.get('/', postsControllers.getAll);

module.exports = router;
/*
//lista todos los posts
router.get('/', postController.listPosts);

//crea un post
router.post('/', postController.createPost);

//obtiene post por id
router.get('/:id', middlewares.postNotFound, middlewares.postDeleted, postController.getPostById);

//modifica datos de post por id
router.patch('/:id', middlewares.postNotFound, middlewares.postDeleted, postController.updatePost);

//borrado logico de post por id
router.delete('/:id', middlewares.postNotFound, middlewares.postDeleted, postController.deletePost);

module.exports = router; */