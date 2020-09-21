
const CSVtoJSON = require('csvtojson');
const FileSystem = require('fs');

const sequelize = require('../database.js');
const posts = require('../models/posts.js');
const categories = require('../models/categories.js');
const associations = require('../models/associations.js');
//inserta csv
categories.findAll().then(existingCategories => {
    try {
        if (existingCategories.length === 0) {
            CSVtoJSON().fromFile(`${__dirname}/categories.csv`).then(arrcat => {
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
            CSVtoJSON().fromFile(`${__dirname}/posts.csv`).then(arrposts => {
                posts.bulkCreate(arrposts);
                console.log('posts inserted')
            })
        }
    } catch (error) {
        console.log(error)
    }
});