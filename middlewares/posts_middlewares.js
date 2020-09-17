class Middlewares {
    postNotFound(posts, categories) {
        return function (req, res, next) {
            let post = posts.findOne({
                attributes: ['id', 'title', 'content', 'img_url', 'create_date'],
                where: {
                    id: req.params.id
                },
                include: [{
                    model: categories
                }]
            }).then(post => {
                if (!post) {
                    res.status(404).json({ error: 'Not Found' });
                } else {
                    next()
                }
            })
        }
    };
}
module.exports = { Middlewares }