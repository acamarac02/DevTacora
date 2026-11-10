---
title: Operaciones CRUD con PreparedStatement y ResultSet
sidebar_position: 3
description: Ejecución de consultas SELECT y operaciones DML (INSERT, UPDATE, DELETE) seguras, tipadas y parametrizadas mediante PreparedStatement.
keywords: [crud, preparedstatement, resultset, sql injection, return_generated_keys, executequery, executeupdate]
---

<div class="justify-text">

# 3. Operaciones CRUD con PreparedStatement y ResultSet

> **Resumen de la sesión / Objetivos docentes:**
> Este documento cubre el núcleo operativo de JDBC: cómo enviar sentencias SQL desde Java de forma segura y eficiente. Se descarta el uso de `Statement` simple en favor de `PreparedStatement`, se aprende a navegar por el cursor de `ResultSet` y se explica la técnica para recuperar identificadores autoincrementales tras un `INSERT`.

---

## 1. ¿Por qué `PreparedStatement` frente a `Statement`?

En JDBC existen dos formas de lanzar sentencias:
1. `Statement`: Ejecuta sentencias SQL concatenando cadenas directamente (`"WHERE id = " + id`). **Mala práctica:** Expone la aplicación a ataques graves de **SQL Injection** y obliga a la base de datos a compilar el plan de ejecución en cada llamada.
2. **`PreparedStatement` (El estándar recomendado):**
   * La sentencia se precompila con marcadores de posición (`?`).
   * Los valores se inyectan mediante métodos tipados (`setInt`, `setString`). El driver se encarga del escapado automático de caracteres maliciosos.
   * Mejora el rendimiento en ejecuciones repetitivas.

---

## 2. Los Dos Métodos de Ejecución Clave

A diferencia de otros entornos, en JDBC la ejecución se divide según el tipo de sentencia SQL:

| Método | Tipo de Sentencia | Qué Devuelve | Ejemplo |
| :--- | :--- | :--- | :--- |
| **`executeQuery()`** | Consultas de lectura (`SELECT`) | Objeto **`ResultSet`** con los datos devueltos por el motor. | Listados, búsquedas por ID. |
| **`executeUpdate()`** | Sentencias de modificación (`INSERT`, `UPDATE`, `DELETE`) | Un entero (**`int`**) que indica el **número de filas afectadas** en la tabla. | Alta de registro, borrado, cambio de precio. |

> [!WARNING] Índice 1-based en JDBC
> En los métodos para asignar parámetros (`stmt.setInt(1, valor)`), **el primer interrogante `?` es la posición 1**, no la 0. Este es uno de los fallos más habituales en el alumnado al empezar con JDBC.

---

## 3. Lectura de Datos y el Cursor de `ResultSet`

Un `ResultSet` representa una tabla virtual de filas devueltas por MySQL:
* **Cursor interno:** Inicialmente se encuentra posicionado **antes de la primera fila**.
* **Método `next()`:** Desplaza el cursor al siguiente registro. Devuelve `true` si hay datos o `false` si ha llegado al final.
* **Extracción de columnas:**
  * Por etiqueta (recomendado): `rs.getInt("id")`, `rs.getString("nombre")`, `rs.getDouble("precio")`.
  * Por número de columna: `rs.getString(2)`.

```java
String sql = "SELECT id, nombre, precio FROM producto WHERE precio > ?";
try (PreparedStatement stmt = conn.prepareStatement(sql)) {
    stmt.setDouble(1, 150.0);
    try (ResultSet rs = stmt.executeQuery()) {
        while (rs.next()) {
            int id = rs.getInt("id");
            String nombre = rs.getString("nombre");
            double precio = rs.getDouble("precio");
            System.out.printf("ID: %d | %s | %.2f €%n", id, nombre, precio);
        }
    }
}
```

---

## 4. Escritura: INSERT, UPDATE y DELETE

Para operaciones de modificación, la mecánica es siempre la misma: parametrizar y lanzar `executeUpdate()`:

```java
// Ejemplo de UPDATE
String sqlUpdate = "UPDATE producto SET precio = ? WHERE id = ?";
try (PreparedStatement stmt = conn.prepareStatement(sqlUpdate)) {
    stmt.setDouble(1, 199.99);
    stmt.setInt(2, 5);
    
    int filasModificadas = stmt.executeUpdate();
    if (filasModificadas > 0) {
        System.out.println("Producto actualizado correctamente.");
    }
}
```

---

## 5. Recuperación de IDs Autoincrementales (`RETURN_GENERATED_KEYS`)

Al insertar registros cuya clave primaria es `AUTO_INCREMENT`, el ID lo genera el motor MySQL. Para recuperar ese ID asignado sin tener que hacer una segunda consulta:

1. Indicar el flag `Statement.RETURN_GENERATED_KEYS` al preparar la sentencia:
   ```java
   PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
   ```
2. Tras ejecutar `executeUpdate()`, llamar a `stmt.getGeneratedKeys()`:
   ```java
   try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
       if (generatedKeys.next()) {
           int idGenerado = generatedKeys.getInt(1);
           System.out.println("Nuevo ID generado: " + idGenerado);
       }
   }
   ```

---

## 6. Buenas Prácticas: `try-with-resources`

* `PreparedStatement` y `ResultSet` deben cerrarse siempre al terminar la operación para no dejar cursores abiertos en el motor.
* Usando **`try-with-resources`**, Java los cierra automáticamente al finalizar el bloque `try`, incluso si se produce una excepción `SQLException`.

</div>
