# Blog API 

Challenge Semana 1 Backend Alkemylabs 

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize ORM
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
- Crear la base de datos haciendo click en `Nueva` con el nombre `blog_api`

### Paso 4: Configurar variables de entorno
- Cambia el nombre del archivo `.env.example` a `.env`

### Paso 5: Iniciar Servidor y crear tablas e inserts de ejemplo en la base de datos
Desde la terminal ubicandose en la carpeta del proyecto clonado, ejecutar:

`npm start`

Luego ejecutar:

`npx sequelize-cli db:migrate`

Por último ejecutar:

`npx sequelize-cli db:seed:all`

### Colección de Postman

- Si no tiene instalado Postman, por favor dirigirse a [este link](https://www.getpostman.com/collections/c7e8c17f8be9132a735a)
- Abrir Postman, click en `File`, click en `Import`, click en `Import From Link` y pegar lo siguiente `https://www.getpostman.com/collections/c7e8c17f8be9132a735a` 
- Hacer las consultas deseadas

## Documentación de la API

Para ver la documentación de la API, puede abrir el archivo `blog_api_documentation.yml` ubicado en el directorio raiz del proyecto o puede ingresar a [este link](https://app.swaggerhub.com/apis/KaribelBT/blog_api_documentation/1.0.0#/Posts/createPost)