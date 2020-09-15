class Posts {
    list(sql) {
        let resp = sql.query(
            `SELECT * FROM posts 
            WHERE enable = :enable
            ORDER BY create_date DESC`, {
            replacements: {
                enable: 1
            },
            type: sql.QueryTypes.SELECT,
        })
        return resp;
    };    
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
    update(sql, id, id_category, title, content, img_url) {
        let resp = sql.query(
            `UPDATE posts
            SET id_category = :id_category, title = :title, content = :content, img_url = :img_url
            WHERE id = :id`, {
            replacements: {
                id,
                id_category,
                title,
                content,
                img_url
            },
            type: sql.QueryTypes.UPDATE
        });
        return resp
    };
    delete(sql, id) {
        let resp = sql.query(
            `UPDATE posts
            SET enable = :enable
            WHERE id = :id`, {
            replacements: {
                id,
                enable: false
            },
            type: sql.QueryTypes.UPDATE
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
    postDeleted(sql) {
        let self = this
        return function (req, res, next) {
            if (req.params.id) {
                self.get(sql, req.params.id)
                    .then(resp => {
                        if (resp.enable == true) {
                            next()
                        } else {
                            res.status(409)
                                .json({ error: `Conflict, post deleted` })
                        }
                    })
            }
        }
    }
};

module.exports = { Posts }