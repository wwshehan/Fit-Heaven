### Schema
CREATE DATABASE exercises_db;
USE exercises_db;

CREATE TABLE exercises
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	level TEXT NOT NULL,
    muscle_group varchar(20) NOT NULL,
    equipment varchar(30) NOT NULL,
	PRIMARY KEY (id)
);
