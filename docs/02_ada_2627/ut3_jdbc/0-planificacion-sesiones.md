---
title: Planificación Docente y Sesiones
draft: true
sidebar_position: 0
description: Planificación docente y correspondencia entre sesiones de aula y ficheros de contenido para la UT3 (JDBC).
keywords: [planificacion, sesiones, ut3, ada, jdbc, mysql, draft]
---

<div class="justify-text">

## Planificación de Sesiones - UT3: Acceso a BBDD Relacionales con JDBC

Documento interno de organización docente. Este archivo está configurado como `draft: true`, por lo que solo es visible en el entorno de desarrollo local (`localhost`) y no se compilará en la versión final de producción.

---

### Correspondencia entre Sesiones y Contenidos

| Sesión | Ficheros / Bloque | Tipo de Sesión | Contenidos Clave y Metodología |
| :---: | :--- | :---: | :--- |
| **Sesión 1**<br/>*(Día 1)* | • `1-introduccion-jdbc-maven.md`<br/>• `2-conexion-patron-singleton.md`<br/>• `3-operaciones-crud-preparedstatement.md`<br/>• `4-caso-practico-tienda.md` | **Teoría + Demos Guiadas** | **El Núcleo Completo de JDBC (1 sola jornada)**:<br/>- Qué es JDBC y los 4 componentes de `java.sql` (`DriverManager`, `Connection`, `PreparedStatement`, `ResultSet`).<br/>- Dependencia Maven (`mysql-connector-j`) y cadena de conexión a MySQL en contenedor Docker.<br/>- **Patrón Creacional Singleton**: Explicación detallada desde cero (justificación de recurso único, constructor privado, atributo e instancia estática `getInstance()`).<br/>- Operaciones CRUD seguras con `PreparedStatement` (consultas parametrizadas con `?`, prevención de SQL Injection).<br/>- Recorrido del cursor con `ResultSet` y recuperación de claves generadas (`RETURN_GENERATED_KEYS`).<br/>- **Demo integradora `tienda`**: Aplicación de consola con menú para listar, buscar por fabricante, modificar y eliminar productos (modelo 1:N plano). |
| **Sesión 2**<br/>*(Día 2)* | • `5-relaciones-join-composicion.md`<br/>• `6-herencia-estrategia-tabla-unica.md` | **Taller Práctico / Ampliación** | **Mapeo de Relaciones y Jerarquías (Sin complejidad innecesaria)**:<br/>- **Desfase objeto-relacional**: Transición del modelo plano a composición orientada a objetos (`Producto` contiene un objeto `Fabricante`).<br/>- Consultas combinadas con `INNER JOIN` y mapeo del `ResultSet` combinado a objetos enlazados en Java.<br/>- **Herencia en BBDD Relacionales**: Estrategia de **Tabla Única (*Single Table*)** con columna discriminadora `tipo`.<br/>- Clases hijas `Periferico` y `Componente` heredando de `Producto`.<br/>- Mapeo polimórfico en JDBC mediante lectura condicional (`switch`/`if`) del tipo de fila. |

---

### Resumen de la Estructura de Ficheros de la UT

```text
docs/02_ada_2627/ut3_jdbc/
├── 0-planificacion-sesiones.md           # (Este documento - draft: true)
├── 1-introduccion-jdbc-maven.md          # Sesión 1: Qué es JDBC, Maven y MySQL en Docker
├── 2-conexion-patron-singleton.md        # Sesión 1: Patrón Singleton y DriverManager
├── 3-operaciones-crud-preparedstatement.md# Sesión 1: PreparedStatement y ResultSet
├── 4-caso-practico-tienda.md             # Sesión 1: Demo guiada completa (CRUD Tienda)
├── 5-relaciones-join-composicion.md      # Sesión 2: Desfase relacional, Composición y JOINs
└── 6-herencia-estrategia-tabla-unica.md  # Sesión 2: Jerarquía con Single Table y discriminador
```

</div>
