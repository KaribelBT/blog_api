class Posts {
    get(sql, id) {
        let resp = sql.query(
            `SELECT p.id id_post, p.id_category id_category, c.name category_name, p.title, p.content, p.img_url, p.create_date, p.enable
            FROM posts p
            JOIN categories c ON p.id_category = c.id
            WHERE p.id = :id`, {
            replacements: {
                id
            },
            type: sql.QueryTypes.SELECT,
        });
        return resp;
    };
    create(sql, id_category, title, content, img_url) {
        let resp = sql.query(
            `INSERT INTO posts (id_category, title, content, img_url, enable) 
             VALUES (:id_category, :title, :content, :img_url, :enable)`,
            {
                replacements: {
                    id_category,
                    title,
                    content,
                    img_url,
                    enable: true
                }
            });
        return resp
    };
    //middlewares
    postNotFound(sql) {
        let self = this
        return function (req, res, next) {
            self.get(sql, req.params.id)
                .then(resp => {
                    if (resp.length === 0) return res.status(404).json({ error: 'Not Found' });
                    else { next() };
                })
        };
    };
};

module.exports = { Posts }