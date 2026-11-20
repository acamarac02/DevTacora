---
title: Planificación docente y sesiones
draft: true
sidebar_position: 0
description: Planificación docente y correspondencia entre sesiones de aula y ficheros de contenido para la UT3 (JDBC).
keywords: [planificacion, sesiones, ut3, ada, jdbc, mysql, draft]
---

<div class="justify-text">

## Planificación de sesiones - UT3: acceso a BBDD relacionales con JDBC

Documento interno de organización docente. Este archivo está configurado como `draft: true`, por lo que solo es visible en el entorno de desarrollo local (`localhost`) y no se compilará en la versión final de producción.

---

### Correspondencia entre sesiones y contenidos

| Sesión | Ficheros / Bloque | Tipo de sesión | Contenidos clave y metodología |
| :---: | :--- | :---: | :--- |
| **Sesión 1**<br/>*(Día 1)* | • `1-introduccion-jdbc-maven.md`<br/>• `2-conexion-patron-singleton.md`<br/>• `3-operaciones-crud-preparedstatement.md`<br/>• `4-caso-practico-tienda.md` | **Teoría + Demos guiadas** | **El núcleo completo de JDBC (1 sola jornada)**:<br/>- Qué es JDBC y los 4 componentes de `java.sql` (`DriverManager`, `Connection`, `PreparedStatement`, `ResultSet`).<br/>- Dependencia Maven (`mysql-connector-j`) y cadena de conexión a MySQL en contenedor Docker.<br/>- **Patrón creacional Singleton**: Explicación detallada desde cero (justificación de recurso único, constructor privado, atributo e instancia estática `getInstancia()`).<br/>- Operaciones CRUD seguras con `PreparedStatement` (consultas parametrizadas con `?`, prevención de inyección SQL).<br/>- Recorrido del cursor con `ResultSet` y recuperación de claves generadas (`RETURN_GENERATED_KEYS`).<br/>- **Demo integradora `tienda`**: Aplicación de consola con menú para listar, buscar por fabricante, modificar y eliminar productos con **composición de objetos real** (`Producto` tiene un `Fabricante`) y consultas combinadas con `JOIN`. |
| **Sesión 2**<br/>*(Día 2)* | • `5-herencia-estrategia-tabla-unica.md` | **Taller práctico de ampliación** | **Herencia relacional sin sobrecarga**:<br/>- **El dilema de la herencia**: Clases abstractas y subclases de Java frente a tablas planas de SQL.<br/>- **Estrategia de tabla única (*Single Table*)**: Columna discriminadora `tipo` y columnas nulables específicas.<br/>- Clases hijas `Periferico` y `Componente` heredando de `Producto`.<br/>- Mapeo polimórfico en JDBC mediante lectura condicional (`switch`/`if`) en el método de obtención del catálogo. |

---

### Resumen de la estructura de ficheros de la UT

```text
docs/02_ada_2627/ut3_jdbc/
├── _category_.json                       # Configuración de categoría Docusaurus
├── 0-planificacion-sesiones.md           # (Este documento - draft: true)
├── 1-introduccion-jdbc-maven.md          # Sesión 1: Qué es JDBC, Maven y MySQL en Docker
├── 2-conexion-patron-singleton.md        # Sesión 1: Patrón Singleton y DriverManager
├── 3-operaciones-crud-preparedstatement.md# Sesión 1: PreparedStatement y ResultSet
├── 4-caso-practico-tienda.md             # Sesión 1: Demo guiada completa (CRUD Tienda con Composición)
└── 5-herencia-estrategia-tabla-unica.md  # Sesión 2: Herencia con Single Table y discriminador
```

</div>
