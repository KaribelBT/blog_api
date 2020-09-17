class Middlewares {
    postNotFound(posts, categories) {
        return function (req, res, next) {
            posts.findOne({
                where: { id: req.params.id }
            }).then(post => {
                if (!post) {
                    res.status(404).json({ error: 'Post not found' });
                } else {
                    next()
                }
            })
        }
    };
    postDeleted(posts){
        return function (req, res, next){
            posts.findOne({
                where: { 
                    id: req.params.id,
                    enable: false
                }
            }).then(post => {
                if (post) {
                    res.status(409).json({ error: 'Conflict, post deleted' });
                } else {
                    next()
                }
            })
        }
    }
}
module.exports = { Middlewares }