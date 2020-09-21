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
app.use(express.urlencoded({ extended: false }));

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
            CSVtoJSON().fromFile('./database/bulkinsert/categories.csv').then(arrcat => {
                categories.bulkCreate(arrcat);
                console.log('categories inserted');
            })
        }
    } catch (error) {
        console.log(error)
    }
});
posts.findAll().then(existingPosts => {
    try {
        if (existingPosts.length === 0) {
            CSVtoJSON().fromFile('./database/bulkinsert/posts.csv').then(arrposts => {
                posts.bulkCreate(arrposts);
                console.log('posts inserted')
            })
        }
    } catch (error) {
        console.log(error)
    }
});
