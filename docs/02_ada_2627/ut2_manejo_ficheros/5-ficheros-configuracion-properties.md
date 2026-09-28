---
title: Ficheros de Configuración y Patrón Singleton
sidebar_position: 5
description: Gestión de parámetros de aplicación mediante ficheros .properties y diseño del patrón creacional Singleton en Java.
keywords: [properties, configuracion, singleton, patron de diseño, ficheros]
---

<div class="justify-text">

## Resumen del Tema

Este tema enseña a externalizar la configuración de una aplicación fuera del código fuente, una buena práctica arquitectónica fundamental para evitar valores fijos (*hardcoding*) en credenciales, puertos, rutas o parámetros del juego/sistema.

Aprenderemos a manipular ficheros con formato clave-valor `.properties` utilizando la clase nativa `java.util.Properties`, cubriendo su carga mediante flujos con `load()`, la obtención de propiedades con valores por defecto con `getProperty()`, y la actualización y persistencia en disco con `setProperty()` y `store()`.

Asimismo, conectaremos este mecanismo con la ingeniería de software profesional introduciendo el **Patrón Creacional Singleton**. Construiremos una clase `ConfigManager` que garantiza la existencia de una única instancia de configuración en toda la aplicación, sirviendo de base directa para gestionar configuraciones por defecto y personalizadas en aplicaciones profesionales.

## Objetivos de Aprendizaje

- Entender el principio de externalización de configuración frente al *hardcoding* de parámetros en código Java.
- Leer y parsear propiedades clave-valor con la clase `java.util.Properties`.
- Convertir de forma segura cadenas de texto a tipos primitivos (`int`, `boolean`, `double`) desde un fichero de propiedades.
- Modificar y guardar propiedades persistiendo comentarios y fechas con el método `store()`.
- Implementar el **Patrón de Diseño Singleton** (`thread-safe` básico) para centralizar la gestión de configuración en memoria.

## Contenidos a Desarrollar

- **El rol de los ficheros de configuración en el software profesional**: Separación de código y entorno.
- **Estructura del formato `.properties`**: Sintaxis clave=valor, comentarios y codificación.
- **La clase `java.util.Properties`**: Operaciones de carga (`load`), consulta (`getProperty`), escritura (`setProperty`) y almacenamiento (`store`).
- **Arquitectura: El Patrón Singleton**: Justificación, implementación clásica mediante constructor privado y método factoría `getInstance()`.
- **Implementación de un `ConfigManager`**: Gestión unificada de configuración por defecto y configuración personalizada de usuario.

</div>
