DROP DATABASE IF EXISTS tienda;
CREATE DATABASE tienda CHARACTER SET utf8mb4;
USE tienda;

CREATE TABLE fabricante (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE producto (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DOUBLE NOT NULL,
  id_fabricante INT UNSIGNED NOT NULL,
  tipo ENUM('PERIFERICO', 'COMPONENTE') NOT NULL,
  tipo_conexion VARCHAR(50) NULL,
  consumo_w INT NULL,
  FOREIGN KEY (id_fabricante) REFERENCES fabricante(id)
);

INSERT INTO fabricante VALUES(1, 'Asus');
INSERT INTO fabricante VALUES(2, 'Lenovo');
INSERT INTO fabricante VALUES(3, 'Hewlett-Packard');
INSERT INTO fabricante VALUES(4, 'Samsung');
INSERT INTO fabricante VALUES(5, 'Seagate');
INSERT INTO fabricante VALUES(6, 'Crucial');
INSERT INTO fabricante VALUES(7, 'Gigabyte');
INSERT INTO fabricante VALUES(8, 'Huawei');
INSERT INTO fabricante VALUES(9, 'Xiaomi');

INSERT INTO producto VALUES(1, 'Disco duro SATA3 1TB', 86.99, 5, 'COMPONENTE', NULL, 10);
INSERT INTO producto VALUES(2, 'Memoria RAM DDR4 8GB', 120, 6, 'COMPONENTE', NULL, 65);
INSERT INTO producto VALUES(3, 'Disco SSD 1 TB', 150.99, 4, 'COMPONENTE', NULL, 5);
INSERT INTO producto VALUES(4, 'GeForce GTX 1050Ti', 185, 7, 'COMPONENTE', NULL, 75);
INSERT INTO producto VALUES(5, 'GeForce GTX 1080 Xtreme', 755, 6, 'COMPONENTE', NULL, 180);
INSERT INTO producto VALUES(6, 'Monitor 24 LED Full HD', 202, 1, 'PERIFERICO', 'HDMI', NULL);
INSERT INTO producto VALUES(7, 'Monitor 27 LED Full HD', 245.99, 1, 'PERIFERICO', 'DisplayPort', NULL);
INSERT INTO producto VALUES(8, 'Teclado Mecánico RGB', 89.99, 1, 'PERIFERICO', 'USB', NULL);
INSERT INTO producto VALUES(9, 'Ratón Inalámbrico Pro', 49.99, 2, 'PERIFERICO', 'Bluetooth', NULL);
INSERT INTO producto VALUES(10, 'Impresora HP Deskjet 3720', 59.99, 3, 'PERIFERICO', 'USB', NULL);
INSERT INTO producto VALUES(11, 'Impresora HP Laserjet Pro M26nw', 180, 3, 'PERIFERICO', 'Wi-Fi', NULL);
