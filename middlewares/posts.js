const db = require("../models");
const { Posts } = db;

exports.postNotFound = async (req, res, next) => {
    let postNotFound = await Posts.findOne({
        where: { id: req.params.id }
    })
    if (!postNotFound) {
        res.status(404).json({ error: 'Post not found' });
    } else {
        next()
    }
};
exports.postDeleted = async (req, res, next) => {
    let postDeleted = await Posts.findOne({
        where: {
            id: req.params.id
        }
    })
    if (postDeleted === null) {
        res.status(409).json({ error: 'Conflict, post deleted' });
    } else {
        next()
    }
}