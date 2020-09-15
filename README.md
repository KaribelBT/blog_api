# Blog API 

Challenge Semana 1 Backend Alkemylabs 

## Tecnologías utilizadas

- Node.js
- Libreria Nodemon
- Libreria Express
- Libreria Sequelize
- Libreria Cors
- Libreria BodyParser
- MySQL
- Postman 

### Paso 1: Clonar Proyecto:

Clonar repositorio desde el [siguiente link](https://github.com/KaribelBT/blog_api)

Abrir terminal y ejecutar 

`git clone https://github.com/KaribelBT/blog_api`

### Paso 2: Instalar dependencias 

En el directorio donde se clonó el proyecto, ejecutar desde la terminal:

`npm install`

### Paso 3: Crear la base de datos

- Si no tiene instalado XAMPP, por favor dirigirse a [este link](https://www.apachefriends.org/es/index.html)
- Abrir XAMPP Panel Control, iniciar los servicios de Apache y MySQL y corroborar que el puerto sobre el cual se está ejecutando la base de datos es `3306`
- Si no encuentra XAMPP Panel de Control, por terminal ejecutar:
`sudo /opt/lampp/lampp start` 
- Ingresar desde el navegador a la ruta `http://localhost/phpmyadmin/index.php`
- Abrir el archivo `db_queries.sql` ubicado dentro de la carpeta `data_base` del proyecto clonado
- Crear la base de datos, se puede importar el archivo o se puede copiar su contenido y pegar en la solapa de SQL

### Paso 4: Iniciar el servidor

Desde la terminal ubicandose en la carpeta `server`, ejecutar:

`node server.js`

### Colección de Postman

- Si no tiene instalado Postman, por favor dirigirse a [este link](https://www.getpostman.com/collections/c7e8c17f8be9132a735a)
- Abrir Postman, click en `File`, click en `Import`, click en `Import From Link` y pegar lo siguiente `https://www.getpostman.com/collections/c7e8c17f8be9132a735a` 
- Hacer las consultas deseadas