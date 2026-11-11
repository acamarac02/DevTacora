---
title: Operaciones CRUD
sidebar_position: 3
description: Ejecución de consultas SELECT y operaciones DML (INSERT, UPDATE, DELETE) seguras, tipadas y parametrizadas mediante PreparedStatement.
keywords: [crud, preparedstatement, resultset, sql injection, return_generated_keys, executequery, executeupdate]
---

<div class="justify-text">

Una vez centralizada la conexión a MySQL mediante el patrón Singleton, el siguiente paso es interactuar con los datos. En cualquier sistema de gestión de información, las interacciones básicas se resumen en el acrónimo **CRUD**:

* **C**reate (Crear / Insertar): Sentencias `INSERT`.
* **R**ead (Leer / Consultar): Sentencias `SELECT`.
* **U**pdate (Actualizar / Modificar): Sentencias `UPDATE`.
* **D**elete (Eliminar / Borrar): Sentencias `DELETE`.

En este tema aprenderemos a ejecutar estas cuatro operaciones en Java utilizando la interfaz **`PreparedStatement`** y a procesar los resultados con **`ResultSet`**.

---

## Sentencias seguras: PreparedStatement frente a Statement

En JDBC existen dos interfaces para enviar sentencias SQL al servidor:

1. **`Statement`:** Ejecuta cadenas SQL directas. Obliga a concatenar variables de Java en el propio texto de la consulta (`"WHERE id = " + id`). **Desaconsejado:** es lento (el motor debe compilar la consulta cada vez) y extremadamente vulnerable a **inyecciones SQL**.
2. **`PreparedStatement` (el estándar recomendado):**
   * La sentencia se precompila en MySQL utilizando marcadores de posición (`?`).
   * Los valores se asignan mediante métodos fuertemente tipados (`setInt()`, `setString()`, `setDouble()`).
   * El driver escapa automáticamente cualquier carácter conflictivo (comillas, barras, punto y coma).

:::danger Peligro: inyección SQL con Statement
Si validamos un usuario concatenando texto:
```java
// Vulnerable a inyección SQL
String sql = "SELECT * FROM usuario WHERE user = '" + inputUser + "' AND pass = '" + inputPass + "'";
```
Un atacante podría introducir como usuario `' OR '1'='1` y acceder sin conocer la contraseña. Con `PreparedStatement` este ataque es imposible, ya que el motor interpreta el valor estrictamente como texto literal y nunca como código ejecutable.
:::

---

## Los dos métodos de ejecución en JDBC

A diferencia de lo que ocurre en una consola de MySQL donde todo se lanza igual, en JDBC la llamada al método cambia en función de si la sentencia **devuelve filas** o **modifica registros**:

| Método | Sentencias SQL | Valor devuelto | Casos de uso |
| :--- | :--- | :--- | :--- |
| **`executeQuery()`** | Consultas de lectura (`SELECT`) | Objeto **`ResultSet`** con las filas devueltas. | Listar productos, buscar por clave primaria, filtros. |
| **`executeUpdate()`** | Modificación de datos (`INSERT`, `UPDATE`, `DELETE`) | Un entero (**`int`**) con el **número de filas afectadas**. | Insertar nuevo registro, cambiar precio, eliminar. |

:::warning Índices basados en 1 (1-based)
Al asignar valores a los parámetros con `setInt(pos, valor)` o `setString(pos, valor)`, **el primer interrogante `?` ocupa la posición 1**, no la 0. Asignar la posición 0 provocará una excepción `SQLException: Parameter index out of range`.
:::

---

## Consulta y lectura de datos

Un **`ResultSet`** actúa como una tabla virtual en memoria y gestiona un **cursor** que apunta a la fila actual sobre la que estamos operando.

* **Posición inicial:** Al crearse, el cursor se sitúa **antes de la primera fila**.
* **Método `next()`:** Desplaza el cursor a la siguiente fila. Devuelve `true` si existe dicha fila y `false` si se ha alcanzado el final de la tabla de resultados.
* **Extracción de datos:** Se utilizan métodos tipados indicando el nombre de la columna: `getInt("nombre_columna")`, `getString("nombre_columna")`, `getDouble("nombre_columna")`.

```java
// 1. Obtenemos la conexión única del Singleton
Connection conn = ConexionBD.getInstancia().getConexion();

// 2. Sentencia con parámetro ?
String sql = "SELECT id, nombre, precio FROM producto WHERE precio > ?";

try (PreparedStatement stmt = conn.prepareStatement(sql)) {
    // Sustituimos el primer ? por el valor 100.0
    stmt.setDouble(1, 100.0);

    // Ejecutamos la consulta y recorremos el cursor
    try (ResultSet rs = stmt.executeQuery()) {
        while (rs.next()) {
            int id = rs.getInt("id");
            String nombre = rs.getString("nombre");
            double precio = rs.getDouble("precio");

            System.out.printf("Producto [%d]: %-25s | %.2f €%n", id, nombre, precio);
        }
    }
} catch (SQLException e) {
    System.err.println("Error al consultar productos: " + e.getMessage());
}
```

:::tip Lectura por nombre de columna vs por posición
Aunque es posible leer valores por posición numérica (`rs.getString(2)`), **siempre es preferible usar el nombre de la columna** (`rs.getString("nombre")`). Así el código sigue funcionando aunque en el futuro cambies el orden de los campos en el `SELECT`.
:::

---

## Inserción de registros 

Al ejecutar un `INSERT`, la columna `id` de la tabla suele ser `AUTO_INCREMENT`. En aplicaciones reales necesitamos conocer inmediatamente qué identificador le asignó MySQL al nuevo registro (por ejemplo, para asociarle detalles o mostrarlo en pantalla).

En JDBC no es necesario hacer una segunda consulta para averiguar el ID asignado; podemos solicitarlo directamente al preparar la sentencia:

```java
Connection conn = ConexionBD.getInstancia().getConexion();
String sql = "INSERT INTO producto (nombre, precio, id_fabricante) VALUES (?, ?, ?)";

// Indicamos que queremos recuperar la clave generada
try (PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
    stmt.setString(1, "Teclado Mecánico RGB");
    stmt.setDouble(2, 79.99);
    stmt.setInt(3, 1); // ID del fabricante Asus

    // Ejecutamos la inserción
    int filasInsertadas = stmt.executeUpdate();

    if (filasInsertadas > 0) {
        // Recuperamos la clave autoincremental generada por MySQL
        try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
            if (generatedKeys.next()) {
                int idGenerado = generatedKeys.getInt(1);
                System.out.println(">> Producto dado de alta con éxito. ID asignado: " + idGenerado);
            }
        }
    }
} catch (SQLException e) {
    System.err.println("Error al insertar producto: " + e.getMessage());
}
```

---

## Modificación y borrado de registros

Las operaciones de actualización (`UPDATE`) y eliminación (`DELETE`) siguen exactamente la misma estructura: preparamos los parámetros y comprobamos el entero devuelto por `executeUpdate()`:

```java
Connection conn = ConexionBD.getInstancia().getConexion();

// Modificar el precio de un producto por su ID
String sqlUpdate = "UPDATE producto SET precio = ? WHERE id = ?";
try (PreparedStatement stmt = conn.prepareStatement(sqlUpdate)) {
    stmt.setDouble(1, 89.99);
    stmt.setInt(2, 1);

    int filasAfectadas = stmt.executeUpdate();
    if (filasAfectadas > 0) {
        System.out.println(">> Precio actualizado correctamente.");
    } else {
        System.out.println(">> No se encontró ningún producto con el ID especificado.");
    }
} catch (SQLException e) {
    System.err.println("Error al actualizar: " + e.getMessage());
}

// Eliminar un producto por su ID
String sqlDelete = "DELETE FROM producto WHERE id = ?";
try (PreparedStatement stmt = conn.prepareStatement(sqlDelete)) {
    stmt.setInt(1, 10);

    int filasBorradas = stmt.executeUpdate();
    if (filasBorradas > 0) {
        System.out.println(">> Producto eliminado de la base de datos.");
    }
} catch (SQLException e) {
    System.err.println("Error al eliminar: " + e.getMessage());
}
```

---

## Cierre automático de recursos con try-with-resources

En apartados anteriores establecimos que la conexión del Singleton permanece abierta durante la sesión de la aplicación. Sin embargo, los objetos auxiliares **`PreparedStatement`** y **`ResultSet`** consumen memoria tanto en la aplicación como en el servidor MySQL mientras permanecen abiertos.

Por ello, la regla indiscutible en JDBC es envolverlos siempre en un bloque **`try-with-resources`**:

```java
// stmt y rs se cerrarán automáticamente incluso si ocurre una SQLException
try (PreparedStatement stmt = conn.prepareStatement(sql);
     ResultSet rs = stmt.executeQuery()) {

    while (rs.next()) {
        // Procesar filas...
    }
} catch (SQLException e) {
    e.printStackTrace();
}
```

Al implementar la interfaz `AutoCloseable`, Java garantiza que tanto el `ResultSet` como el `PreparedStatement` se cierran de forma limpia al salir del bloque, evitando fugas de memoria (*resource leaks*).

</div>
