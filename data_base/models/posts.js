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

/*    delete(sql, id) {
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
*/