const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/postsControllers');

router.post ('/', postsControllers.create);
router.get('/', postsControllers.getAll);
router.get('/:id', postsControllers.getOne);
router.put('/:id', postsControllers.update);
router.delete('/:id', postsControllers.deleteOne);

module.exports = router;