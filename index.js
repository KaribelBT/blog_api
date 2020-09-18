const express = require('express');
const app = express();
const port = 3001;

const CSVtoJSON = require('csvtojson');
const FileSystem = require('fs');

const sequelize = require('./database/database.js');
const posts = require('./database/models/posts.js');
const categories = require('./database/models/categories.js');
const associations = require('./database/models/associations.js');

app.use(express.json());
app.use('/posts', require('./routes/posts.js'))

//inicia servidor
app.listen(port, () => {
    console.log(`app started in: http://localhost:${port}`);
    sequelize.sync({ alter: true }).then(() => {
        console.log("Database connected");
    }).catch(error => {
        console.log('An error has ocurred', error);
    })
});

//inserta csv
categories.findAll().then(existingCategories => {
    try {
        if (existingCategories.length === 0) {
            CSVtoJSON().fromFile('./database/bulk_insert/categories.csv').then(categories => {
                categories.map(category => {
                    let query = sequelize.query(
                        `INSERT INTO categories (id, name)
                        VALUES (:id, :name)`,
                        {
                            replacements: {
                                id: category.id,
                                name: category.name
                            }
                        });
                    return query.then(resp => {
                        console.log('categories inserted')
                    })
                })
            });
        }
    } catch (error) {
        console.log(error)
    }
});
posts.findAll().then(existingPosts => {
    try {
        if (existingPosts.length === 0) {
            CSVtoJSON().fromFile('./database/bulk_insert/posts.csv').then(posts => {
                posts.map(post => {
                    let query = sequelize.query(
                        `INSERT INTO posts (id, category_id, title, content, img_url, create_date, enable)
                        VALUES (:id, :category_id, :title, :content, :img_url, :create_date, :enable)`,
                        {
                            replacements: {
                                id: post.id,
                                category_id: post.category_id,
                                title: post.title,
                                content: post.content,
                                img_url: post.img_url,
                                create_date: post.create_date,
                                enable: post.enable
                            }
                        });
                    return query.then(resp => {
                        console.log('posts inserted')
                    })
                })
            });
        }
    } catch (error) {
        console.log(error)
    }
});
