const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class posts extends Model { }
posts.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    create_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true    
});

module.exports = posts;

/* class Posts {
    
    create(sql, category_id, title, content, img_url) {
        let resp = sql.query(
            `INSERT INTO posts (category_id, title, content, img_url, enable)
             VALUES (:category_id, :title, :content, :img_url, :enable)`,
            {
                replacements: {
                    category_id,
                    title,
                    content,
                    img_url,
                    enable: true
                }
            });
        return resp
    };
    update(sql, id, category_id, title, content, img_url) {
        let resp = sql.query(
            `UPDATE posts
            SET category_id = :category_id, title = :title, content = :content, img_url = :img_url
            WHERE id = :id`, {
            replacements: {
                id,
                category_id,
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
                        if (resp[0].enable == true) {
                            next();
                        } else {
                            res.status(409)
                                .json({ error: `Conflict, post deleted` })
                        }
                    })
            }
        }
    }
};

module.exports = { Posts } */