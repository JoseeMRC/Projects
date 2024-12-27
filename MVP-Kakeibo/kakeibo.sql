CREATE DATABASE kakeibo;
-- DROP database kakeibo;
USE kakeibo;

CREATE TABLE user (
user_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50) NOT NULL, 
lastname VARCHAR(100),
email VARCHAR(150) UNIQUE,
password VARCHAR(100) NOT NULL,
birth_date DATE,
country VARCHAR(75),
phone_number VARCHAR(50),
img VARCHAR(200),
enabled BOOLEAN NOT NULL DEFAULT false, -- True = 1 => Enabled // False = 0 => Disabled
deleted BOOLEAN NOT NULL DEFAULT false, -- true cuando el usuario borre su cuenta
new_user BOOLEAN NOT NULL DEFAULT true, -- True = 1 => usuario no se ha logeado nunca // False = 0 => Ya se ha logeado la primera vez
rol TINYINT NOT NULL DEFAULT 2 -- 1 → admin   2 → client
);


CREATE TABLE goal (
goal_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
goal_amount DECIMAL(12,2) UNSIGNED NOT NULL,  -- 999.999.999.999,99
start_date DATE NOT NULL,
limit_date DATE NOT NULL,
goal_name VARCHAR(50),
goal_status BOOLEAN DEFAULT FALSE,
user_id INT UNSIGNED NOT NULL,
goal_icon TINYINT UNSIGNED NOT NULL,
CONSTRAINT fk_user_1 FOREIGN KEY (user_id)
REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DELIMITER //
CREATE TRIGGER set_default_start_date
BEFORE INSERT ON goal
FOR EACH ROW
BEGIN
    IF NEW.start_date IS NULL THEN
        SET NEW.start_date = CURRENT_DATE;
    END IF;
END; //
DELIMITER ;

CREATE TABLE category(
category_id TINYINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
category_title VARCHAR(70) NOT NULL,
category_icon VARCHAR(255) NOT NULL
);

CREATE TABLE movement (
movement_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(70),
date DATE,
hour TIME,
movement_import DECIMAL(12,2) NOT NULL, -- 999.999.999.999,99
movement_type TINYINT NOT NULL, -- 1 → Ingreso   2 → Gasto
user_id INT UNSIGNED NOT NULL,
category_id TINYINT UNSIGNED NOT NULL,
goal_id INT UNSIGNED,
CONSTRAINT fk_user_2 FOREIGN KEY (user_id)
REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_goal_1 FOREIGN KEY (goal_id)
REFERENCES goal(goal_id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_category_1 FOREIGN KEY (category_id)
REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE question(
question_id SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
question_title VARCHAR(500) NOT NULL,
enabled BOOLEAN NOT NULL DEFAULT false -- True = 1 => Enabled // False = 0 => Disabled
);

CREATE TABLE answer(
answer_text VARCHAR(500),
user_id INT UNSIGNED NOT NULL,
question_id SMALLINT UNSIGNED NOT NULL, -- UNIQUE?
CONSTRAINT fk_user_3 FOREIGN KEY (user_id)
REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_question_1 FOREIGN KEY (question_id)
REFERENCES question(question_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ALTER TABLE goal ADD COLUMN start_date DATE NOT NULL;
-- ALTER TABLE user MODIFY COLUMN email VARCHAR(150) UNIQUE;



SELECT answer.*, question.question_title
FROM user, question, answer
WHERE user.user_id = answer.user_id AND question.question_id = answer.question_id;


-- UPDATE user SET email=null where user_id = 3;

SELECT * FROM user;
SELECT * FROM question;
SELECT * FROM answer;
SELECT * FROM goal;

INSERT INTO answer (answer_text, user_id, question_id) VALUES ("La vida es dura 1", 26, 1);
INSERT INTO answer (answer_text, user_id, question_id) VALUES ("La vida es dura 2", 26, 2);


INSERT INTO user (name, lastname, email, password, birth_date, country, phone_number, img, disabled, deleted, rol) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', 'contraseña123', '1980-01-01', 'España', '+346463457853', 'img1.jpg', false, false, 2),
('María', 'García', 'maria.garcia@example.com', 'contraseña456', '1990-02-02', 'España', '+346345357853', 'img2.jpg', false, false, 2),
('Carlos', 'Sánchez', 'carlos.sanchez@example.com', 'contraseña789', '1985-03-03', 'España', '+34754357853', 'img3.jpg', false, false, 2),
('Admin', 'Usuario', 'admin@example.com', 'admin', '1975-04-04', 'España', '+346463456543', 'img3.jpg', false, false, 1);


INSERT INTO goal (goal_amount, limit_date, goal_name, goal_status, user_id, goal_icon) VALUES
(1000.00, '2024-12-31', 'Vacaciones', false, 1, 10),
(500.00, '2024-06-30', 'Nuevo Teléfono', true, 2, 8),
(1500.00, '2024-11-30', 'Curso Online', false, 3, 20);

INSERT INTO category (category_title, category_icon) VALUES
('transporte', 1),
('coche', 2),
('viaje', 3),
('compras', 4),
('medicina', 5),
('camara', 6),
('caja registradora', 7),
('gimnasio', 8),
('animal', 9),
('dinero', 10),
('diamante', 11),
('ahorro', 12),
('pintura', 13),
('landMark', 14),
('llaves', 15),
('regalo', 16),
('carrito de bebe', 17),
('shopify', 18),
('libro', 19),
('monedas', 20),
('sofa', 21),
('bandera de meta', 22),
('gafas', 23),
('musica', 24),
('bombilla', 25),
('Bombilla2', 26),
('candado', 27),
('agua', 28),
('quitanieves', 29),
('tractor', 30),
('utensilios', 31),
('herramientas', 32),
('graduacion', 33),
('tren', 34),
('compras online', 35);

select * from category;

drop table category;

INSERT INTO movement (title, date, hour, import, movement_type, user_id, category_id, goal_id) VALUES
('Salario', '2024-05-01', '09:00:00', 2000.00, 1, 1, 1, NULL),
('Compra Supermercado', '2024-05-02', '14:00:00', 150.00, 2, 1, 1, NULL),
('Pago Alquiler', '2024-05-03', '10:00:00', 700.00, 2, 1, 2, NULL),
('Cena con Amigos', '2024-05-04', '20:00:00', 50.00, 2, 2, 3, NULL),
('Ahorro', '2024-05-05', '15:30:00', 500.00, 2, 2, 2, 1),
('Ahorro', '2024-05-05', '15:30:00', 500.00, 2, 2, 2, 2);


INSERT INTO movement (title, date, hour, import, movement_type, user_id, category_id, goal_id)
VALUES ('Salario', '2024-06-01', '09:00:00', 2500.00, 4, 1, 11, NULL);



INSERT INTO question (question_title) VALUES
('¿Esta es una pregunta 1?'),
('¿Esta es una pregunta 2?'),
('¿Esta es una pregunta 3?');

INSERT INTO answer (answer_title, user_id, question_id) VALUES
('Respuesta1', 1, 1),
('Respuesta2', 2, 2),
('Respuesta3', 3, 3),
('Respuesta4', 1, 1),
('Respuesta5', 3, 2);

-- Insertar datos en la tabla user
INSERT INTO user (name, lastname, email, password, birth_date, country, phone_number, img, enabled, deleted, rol)
VALUES 
('John', 'Doe', 'john.doe@example.com', 'password123', '1990-01-01', 'USA', '123-456-7890', 'path/to/image.jpg', true, false, 2),
('Jane', 'Smith', 'jane.smith@example.com', 'password123', '1985-05-15', 'Canada', '098-765-4321', 'path/to/image2.jpg', true, false, 2),
('Alice', 'Johnson', 'alice.j@example.com', 'password123', '1992-07-20', 'UK', '111-222-3333', 'path/to/image3.jpg', true, false, 1);


-- Insertar datos en la tabla goal
INSERT INTO goal (goal_amount, limit_date, goal_name, goal_status, user_id, goal_icon)
VALUES 
(5000.00, '2024-12-31', 'Vacation', false, 1, 1),
(10000.00, '2025-06-30', 'New Car', false, 2, 2),
(1500.00, '2024-08-15', 'New Laptop', true, 1, 3);

-- Insertar datos en la tabla category
INSERT INTO category (category_title, category_icon)
VALUES 
('Food', 1),
('Transportation', 2),
('Entertainment', 3),
('Utilities', 4);

-- Insertar datos en la tabla movement
INSERT INTO movement (title, date, hour, import, movement_type, user_id, category_id, goal_id)
VALUES 
('Grocery Shopping', '2024-05-01', '10:30:00', 100.00, 2, 1, 1, NULL),
('Bus Ticket', '2024-05-02', '08:00:00', 2.50, 2, 2, 2, NULL),
('Cinema', '2024-05-03', '19:00:00', 15.00, 2, 1, 3, 1),
('Electric Bill', '2024-05-04', '15:00:00', 50.00, 2, 1, 4, NULL);

-- Insertar datos en la tabla question
INSERT INTO question (question_title, enabled)
VALUES 
('What is your favorite color?', true),
('What is your mother\'s maiden name?', true),
('What was your first pet\'s name?', false);


-- Consultar todas las categorías:
SELECT category_id, category_title, category_icon 
FROM category;

-- Consultar todas las respuestas de un usuario específico:
SELECT answer.answer_title, question.question_title 
FROM answer 
JOIN question ON answer.question_id = question.question_id
WHERE answer.user_id = 1;

-- Consultar los movimientos de un usuario específico en un rango de fechas:
SELECT movement_id, title, date, hour, import, movement_type 
FROM movement 
WHERE user_id = 4
  AND date BETWEEN '2024-01-01' AND '2024-12-31';  


select * from user;

select * from user where user_id = 10;

select * from goal where goal_id = 3;

delete from goal where goal_id = 2;

-- Insertar datos en la tabla answer

INSERT INTO answer (answer_text, user_id, question_id)
VALUES 
('Blue', 1, 1),
('Smith', 2, 2),
('Buddy', 1, 3);

SELECT user_id, name, lastname FROM user;
SELECT category_id, category_title FROM category;
SELECT goal_id, goal_name FROM goal;


-- Verificar existencia de user_id = 1
SELECT * FROM user WHERE user_id = 4;

-- Verificar existencia de category_id = 1
SELECT category_id FROM category WHERE category_id = 1;

-- Verificar existencia de goal_id = 1 (si es necesario)
SELECT goal_id FROM goal WHERE goal_id = 10;

-- Insertar un movimiento asegurando que los valores existen en las tablas correspondientes
INSERT INTO movement (title, date, hour, import, movement_type, user_id, category_id, goal_id)
VALUES ('Salario', '2024-06-01', '09:00:00', 2500.00, 1, 4, 1, 10), 
 ('Salario', '2024-06-01', '09:00:00', 500.00, 1, 4, 1, 10), 
 ('Salario', '2024-06-01', '09:00:00', 1500.00, 1, 4, 1, 10); 


select * from category;