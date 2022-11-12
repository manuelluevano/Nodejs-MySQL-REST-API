CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE companydb(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY(id)
);

-- INSERT INTO companydb VALUES 
-- (1,"Joe", 1000),
-- (2,"Manuel", 3400),
-- (3,"Jose", 1340);
