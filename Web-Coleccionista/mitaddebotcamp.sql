CREATE DATABASE collector;
USE collector;

CREATE TABLE coleccionist (
coleccionist_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
interest VARCHAR(100) NOT NULL,
email VARCHAR(75) NOT NULL,
password VARCHAR(100) NOT NULL,
description VARCHAR(1000) NOT NULL,
number_phone VARCHAR(20) NOT NULL, 
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(60) NOT NULL,
img VARCHAR(200),
is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
UNIQUE KEY email_UNIQUE (email)
);


CREATE TABLE object (
object_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
coleccionist_id INT UNSIGNED NOT NULL,
name VARCHAR(100),         
year_adquisition YEAR NOT NULL,
description VARCHAR(500),
img VARCHAR(200),
is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
CONSTRAINT fk_coleccionist FOREIGN KEY (coleccionist_id) REFERENCES coleccionist (coleccionist_id) ON DELETE CASCADE ON UPDATE CASCADE 
);

select * from coleccionist;
select * from object;
drop database collector;
DESCRIBE coleccionist;
DESCRIBE object;



