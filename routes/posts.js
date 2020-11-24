const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/postsControllers');
const postsMiddlewares = require('../middlewares/posts');

router.post ('/', postsControllers.create);
router.get('/', postsControllers.getAll);
router.get('/:id', postsMiddlewares.postDeleted, postsControllers.getOne);
router.put('/:id', postsMiddlewares.postDeleted, postsMiddlewares.postNotFound, postsControllers.update);
router.delete('/:id', postsMiddlewares.postDeleted, postsMiddlewares.postNotFound, postsControllers.deleteOne);

module.exports = router;