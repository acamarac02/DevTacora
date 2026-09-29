---
title: Arquitectura Limpia y Patrón DAO
sidebar_position: 9
description: Diseño arquitectónico en capas y aplicación del patrón de acceso a datos DAO (Data Access Object) desacoplando la persistencia en ficheros.
keywords: [arquitectura, dao, data access object, capas, interfaz, dto, desacoplamiento]
---

<div class="justify-text">

## Resumen del Tema

Este tema constituye la culminación arquitectónica de la unidad, transformando el código directo de lectura y escritura en ficheros en una solución profesional, desacoplada y escalable bajo una **arquitectura por capas**.

Se presenta el patrón de diseño estructural **DAO (Data Access Object)** y el principio de inversión de dependencias: la lógica de negocio (Servicios) y la interfaz de usuario nunca deben manipular directamente flujos de E/S, buffers ni rutas de ficheros. En su lugar, interactúan exclusivamente con interfaces Java abstractas (ej. `ISemillaDAO`, `IPartidaDAO`).

Veremos cómo esta abstracción permite sustituir la fuente de datos (por ejemplo, cambiar una implementación que lee de `semillas.xml` por otra que lee de `semillas.json` o de una base de datos en unidades futuras) sin tocar una sola línea de la lógica de la aplicación. Este tema servirá de puente directo hacia la UT3 (JDBC y bases de datos relacionales).

## Objetivos de Aprendizaje

- Identificar los problemas de acoplamiento y mantenimiento del código monolítico de acceso a ficheros.
- Comprender la arquitectura en capas estándar de backend (Presentación / CLI $\rightarrow$ Servicio de Negocio $\rightarrow$ Capa DAO $\rightarrow$ Almacenamiento).
- Definir interfaces de acceso a datos utilizando colecciones tipadas y **Java Records** como DTOs.
- Implementar el patrón DAO abstrayendo la tecnología de almacenamiento subyacente (ficheros binarios, RAF, JSON o XML).
- Diseñar la arquitectura base que permitirá abordar con éxito proyectos de software complejos y modulares.

## Contenidos a Desarrollar

- **Arquitectura en capas**: Separación estricta de responsabilidades (SoC).
- **El Patrón DAO (Data Access Object)**:
  - Justificación, anatomía y programación contra interfaces (`interface IDAOGenerico<T, K>`).
  - Implementaciones concretas sobre el sistema de archivos (`SemillaXmlDAOImpl`, `PartidaBinariaDAOImpl`).
- **Desacoplamiento y polimorfismo**: Intercambio de proveedores de datos sin impacto en la lógica de negocio.
- **Diagrama de arquitectura del patrón DAO**: Flujo de información entre Controlador, Servicio, DAO y Sistema de Archivos.
- **Preparación arquitectónica para el proyecto integrador**: Organización de paquetes (`model`, `dao`, `service`, `config`, `app`).

</div>
