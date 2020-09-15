CREATE DATABASE blog_api;

DROP TABLE IF EXISTS  categories;
DROP TABLE IF EXISTS  posts;

CREATE TABLE categories (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL
);

INSERT  INTO  categories  VALUES (1,'fashion'),(2,'beauty'), (3,'design'), (4,'health'), (5,'fitness');

CREATE TABLE posts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
  id_category INT NOT NULL,
  title VARCHAR(60) NOT NULL,
  content TEXT NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  create_date  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  enable  BOOLEAN NOT NULL,
  KEY  fk_id_category_id  (id_category),
  CONSTRAINT fk_id_category_id FOREIGN KEY (id_category) REFERENCES categories (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT  INTO  posts  VALUES (1, 2, 'Post Test 1', 'Content Post Test', 'url.com', '2020-09-15 00:00:00', 1), (2, 1, 'Post Test 2', 'Content Post Test', 'url.com', '2020-09-15 00:00:01',1); 