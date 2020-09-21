const express = require('express');
const app = express();
const port = 3001;

const sequelize = require('./database/database.js');

const bulkInsert = require('./database/bulkinsert/insert.js');

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