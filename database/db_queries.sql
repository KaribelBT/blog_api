CREATE DATABASE blog_api;

DROP TABLE IF EXISTS  categories;
DROP TABLE IF EXISTS  posts;

CREATE TABLE categories (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL
);

CREATE TABLE posts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
  category_id INT NOT NULL,
  title VARCHAR(60) NOT NULL,
  content TEXT NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  create_date  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  enable  BOOLEAN NOT NULL,
  KEY  fk_category_id_id  (category_id),
  CONSTRAINT fk_category_id_id FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);