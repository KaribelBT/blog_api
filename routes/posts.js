const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/posts_middlewares.js');
const postController = require('../controllers/posts.js');

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

module.exports = router;