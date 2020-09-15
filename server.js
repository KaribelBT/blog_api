const express = require('express');
const server = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root@127.0.0.1:3306/blog_api')

server.use(bodyParser.json());
server.use(cors());

//inicia servidor
server.listen(port, () => {
    console.log('Servidor Iniciado');
});