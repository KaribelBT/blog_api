const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/postsControllers');

router.get('/', postsControllers.getAll);
router.get('/:id', postsControllers.getOne);
router.delete('/:id', postsControllers.deleteOne);

module.exports = router;

/*
//crea un post
router.post('/', postController.createPost);

//modifica datos de post por id
router.patch('/:id', middlewares.postNotFound, middlewares.postDeleted, postController.updatePost);

module.exports = router; */