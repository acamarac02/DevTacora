---
title: Maven y Formato de Intercambio JSON
sidebar_position: 7
description: Introducción a la gestión de dependencias con Maven e intercambio de datos en formato JSON mediante Jackson y Java Records.
keywords: [maven, pom.xml, json, jackson, objectmapper, records, data binding]
---

<div class="justify-text">

## Resumen del Tema

Este tema marca el salto hacia el desarrollo Java moderno en proyectos profesionales, introduciendo **Apache Maven** como gestor de proyectos y dependencias antes de abordar el formato de intercambio de datos rey de la web y las APIs REST: **JSON** (JavaScript Object Notation).

Aprenderemos a estructurar un proyecto Maven con su archivo `pom.xml`, comprenderemos la anatomía de las coordenadas GAV (`groupId`, `artifactId`, `version`) e incorporaremos la librería de referencia en la industria: **Jackson** (`jackson-databind`).

Utilizando la clase `ObjectMapper`, realizaremos la serialización (de objetos/records Java a texto JSON) y deserialización (de texto JSON a objetos/records Java), descubriendo cómo los **Java Records** proporcionan una forma limpia, concisa e inmutable de modelar DTOs (*Data Transfer Objects*) sin necesidad de constructores ni getters manuales.

## Objetivos de Aprendizaje

- Comprender la necesidad de un gestor de dependencias (Maven) al incorporar librerías de terceros en el ecosistema Java.
- Configurar y gestionar dependencias en el archivo `pom.xml` dentro de IntelliJ IDEA.
- Entender la sintaxis y tipos de datos del formato JSON (objetos, arrays, valores primitivos).
- Utilizar `ObjectMapper` de Jackson para serializar colecciones y objetos Java hacia archivos `.json`.
- Deserializar archivos JSON directamente a instancias de **Java Records** con tipado seguro y validaciones.

## Contenidos a Desarrollar

- **Introducción a Apache Maven**: Ciclo de vida básico, estructura estándar de directorios y el fichero `pom.xml`.
- **El ecosistema Jackson**: Dependencias clave (`com.fasterxml.jackson.core:jackson-databind`).
- **Fundamentos del formato JSON**: Estructura, ventajas frente a otros formatos y casos de uso en backend.
- **Data Binding con `ObjectMapper`**:
  - Escritura a archivo con indentación (`writerWithDefaultPrettyPrinter().writeValue()`).
  - Lectura desde archivo (`readValue()`) hacia clases y colecciones (`TypeReference`).
- **Integración con Java Records**: Modelado inmutable y limpio de entidades de transferencia.

</div>
