---
title: Caso Práctico Guiado - Demo Tienda (CRUD Completo)
sidebar_position: 4
description: Desarrollo guiado de una aplicación de consola completa conectada a MySQL, implementando el CRUD de la base de datos tienda con modelo plano.
keywords: [demo, caso practico, tienda, producto, fabricante, crud, java]
---

<div class="justify-text">

# 4. Caso Práctico Guiado: Demo Tienda (CRUD Completo)

> **Resumen de la sesión / Objetivos docentes:**
> Este documento culmina el **Día 1**. Aquí se ensamblan todos los conceptos anteriores en un proyecto ejecutable de consola. Se proporciona el script SQL para Docker y la arquitectura de clases (`model`, `bbdd`, `Main`), implementando las operaciones requeridas sobre la tabla `producto` con un modelo de atributos planos.

---

## 1. Script de la Base de Datos (`tienda.sql`)

Para que los alumnos puedan cargar los datos directamente en su contenedor Docker de MySQL:

```sql
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
    FOREIGN KEY (id_fabricante) REFERENCES fabricante(id)
);

-- Datos iniciales
INSERT INTO fabricante (id, nombre) VALUES
(1, 'Asus'), (2, 'Lenovo'), (3, 'Hewlett-Packard'), (4, 'Samsung'), (5, 'Seagate');

INSERT INTO producto (nombre, precio, id_fabricante) VALUES
('Disco duro SATA3 1TB', 86.99, 5),
('Memoria RAM DDR4 8GB', 120.00, 4),
('Disco SSD 1 TB', 150.99, 4),
('Monitor 24 LED Full HD', 202.00, 1),
('Monitor 27 LED Full HD', 245.99, 1),
('Portátil Yoga 520', 559.00, 2),
('Impresora HP Deskjet 3720', 59.99, 3);
```

---

## 2. Arquitectura de Clases del Proyecto

Estructura de paquetes recomendada para mantener el proyecto ordenado pero accesible:

```text
src/main/java/
├── bbdd/
│   └── GestionDBTienda.java   # Singleton: conexión + métodos de consulta y modificación
├── model/
│   └── Producto.java         # Clase POJO plana con datos de producto y fabricante
└── Main.java                 # Punto de entrada con menú interactivo por consola
```

---

## 3. El Modelo: `Producto.java` (Atributos Planos)

Para no sobrecargar el primer día, se utiliza un modelo plano donde la información del fabricante se guarda directamente como atributos simples en el producto:

```java
public class Producto {
    private int id;
    private String nombre;
    private double precio;
    private int idFabricante;
    private String nombreFabricante;

    // Constructores, getters, setters y toString()
    public Producto(int id, String nombre, double precio, int idFabricante, String nombreFabricante) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.idFabricante = idFabricante;
        this.nombreFabricante = nombreFabricante;
    }

    @Override
    public String toString() {
        return String.format("[%d] %-30s | %8.2f € | Fabricante: %s", 
                id, nombre, precio, (nombreFabricante != null ? nombreFabricante : idFabricante));
    }
}
```

---

## 4. Métodos CRUD en `GestionDBTienda.java`

Los alumnos implementan los siguientes métodos dentro de la clase Singleton:

1. **`List<Producto> obtenerProductos()`**: Ejecuta `SELECT p.id, p.nombre, p.precio, p.id_fabricante, f.nombre AS nombre_fab FROM producto p JOIN fabricante f ON p.id_fabricante = f.id;` y devuelve una lista de objetos `Producto`.
2. **`void mostrarProductos()`**: Llama al método anterior y los imprime formateados en consola.
3. **`void mostrarProductosFabricante(String nombreFabricante)`**: Consulta parametrizada filtrando por el nombre del fabricante (`WHERE f.nombre = ?`).
4. **`Producto buscarProducto(int id)`**: Devuelve el producto si existe en la BD o `null` si no se encuentra.
5. **`boolean modificarProducto(int id, String nuevoNombre, double nuevoPrecio)`**: Lanza un `UPDATE` parametrizado.
6. **`boolean eliminarProducto(int id)`**: Lanza un `DELETE` por ID y comprueba las filas afectadas.

---

## 5. El Menú de la Aplicación en `Main.java`

El programa principal ofrece un menú en bucle (`do-while`) gestionado por `Scanner`:

```text
================ MENÚ TIENDA ================
1. Mostrar todos los productos
2. Mostrar productos de un fabricante
3. Modificar datos de un producto
4. Eliminar un producto
5. Salir
Seleccione una opción: 
```

> [!TIP] Meta cumplida en la Sesión 1
> Al finalizar esta demo, el alumno comprende cómo el código Java se conecta a MySQL, cómo interactúan `Connection`, `PreparedStatement` y `ResultSet`, y cómo estructurar un CRUD completo de forma limpia con el patrón Singleton.

</div>
