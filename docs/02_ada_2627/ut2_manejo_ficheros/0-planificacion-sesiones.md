---
title: Planificación Docente y Sesiones
draft: true
sidebar_position: 0
description: Planificación docente y correspondencia entre sesiones de aula y ficheros de contenido para la UT2.
keywords: [planificacion, sesiones, ut2, ada, draft]
---

<div class="justify-text">

## Planificación de Sesiones - UT2: Manejo de Ficheros

Documento interno de organización docente. Este archivo está configurado como `draft: true`, por lo que solo es visible en el entorno de desarrollo local (`localhost`) y no se compilará en la versión final de producción.

---

### Correspondencia entre Sesiones y Contenidos

| Sesión | Ficheros / Bloque | Tipo de Sesión | Contenidos Clave y Metodología |
| :---: | :--- | :---: | :--- |
| **Sesión 1** | • `1-introduccion-sistema-archivos.md`<br/>• `2-operaciones-archivos-nio.md`<br/>• `3-archivos-texto-plano.md`<br/>• `4-archivos-csv.md`<br/>• `5-ficheros-configuracion-properties.md` | **Teoría + Demos** | **Fundamentos y bloque estándar del JDK**:<br/>- Persistencia, texto vs. binario, acceso secuencial vs. aleatorio.<br/>- Variables de entorno (`System.getProperty`) y rutas con `Path.of()`.<br/>- Operaciones atómicas con `Files` (`createFile`, `copy`, `move`, `deleteIfExists`).<br/>- Lectura y escritura de texto plano con codificación UTF-8.<br/>- Formato tabular **CSV**, modelos inmutables con **Java Records** y parseo seguro.<br/>- Ficheros `.properties` y diseño del **Patrón Singleton** (`ConfigManager`). |
| **Sesión 2** | *Ejercicios de aula (profesor)* | **Práctica** | **Afianzamiento del bloque 1**:<br/>- Ejercicios prácticos guiados de 1 sesión sobre NIO.2, parseo de CSV a Java Records y aplicación del patrón Singleton para configuración. |
| **Sesión 3** | • `6-archivos-binarios-serializacion.md`<br/>• `7-maven-formato-json.md`<br/>• `8-formato-xml-jackson.md` | **Teoría + Demos** | **Serialización y formatos de intercambio estructurados**:<br/>- Ficheros binarios nativos con `Serializable` y flujos de objetos (`ObjectOutputStream` / `ObjectInputStream`), gestión de `serialVersionUID`.<br/>- Introducción justificada a Apache Maven (`pom.xml`) para librerías de terceros.<br/>- Formato **JSON** con Jackson (`ObjectMapper`) y Data Binding hacia Java Records.<br/>- Formato **XML** moderno con Jackson XML (`XmlMapper`), anotaciones básicas y comparativa conceptual con la arquitectura en árbol de DOM. |
| **Sesión 4** | *Ejercicios de aula (profesor)* | **Práctica** | **Afianzamiento del bloque 2**:<br/>- Ejercicios prácticos guiados de 1 sesión sobre persistencia de estados de objetos con binarios, lectura/escritura JSON y XML con Jackson. |
| **Sesión 5** | • `9-archivos-acceso-aleatorio-raf.md` | **Teoría + Demos** | **Acceso aleatorio y almacenamiento posicional**:<br/>- La clase `RandomAccessFile`, punteros (`seek`, `getFilePointer`, `length`).<br/>- Tamaños en bytes de tipos primitivos.<br/>- Cadenas de tamaño fijo con `StringBuffer.setLength()`.<br/>- Persistencia de matrices bidimensionales por filas en disco. |
| **Sesión 6** | *Ejercicios de aula (profesor)* | **Práctica** | **Afianzamiento del bloque 3**:<br/>- Ejercicios prácticos guiados de 1 sesión sobre manipulación directa de bytes y navegación mediante punteros con `RandomAccessFile`. |
| **Sesión 7** | • `10-arquitectura-patron-dao.md` | **Teoría + Práctica** | **Arquitectura Limpia y Patrón DAO**:<br/>- Desacoplamiento de capas (Modelo/Record $\rightarrow$ DAO Interface $\rightarrow$ Implementación Fichero $\rightarrow$ Servicio $\rightarrow$ CLI).<br/>- Programación contra interfaces e inversión de dependencias.<br/>- Mini-ejercicio integrador en clase aplicando el patrón DAO a ficheros. |
| **Sesiones 8 a 20** | *Proyecto Stardam Valley* | **Proyecto Integrador** | **Tutorización y desarrollo guiado del proyecto**:<br/>- Configuración (`default_config.properties` / `personalized_config.properties` vía Singleton).<br/>- Catálogo de semillas (XML con Jackson XML / DOM).<br/>- Gestión del huerto matricial por filas en `huerto.dat` (RAF).<br/>- Persistencia del estado de la partida (`stardam_valley.bin` o JSON).<br/>- Separación limpia con patrón DAO. |

---

### Resumen de la Estructura de Ficheros de la UT

```text
docs/02_ada_2627/ut2_manejo_ficheros/
├── 0-planificacion-sesiones.md        # (Este documento - draft: true)
├── 0-img/                             # Recursos gráficos y diagramas
├── 1-introduccion-sistema-archivos.md  # Sesión 1
├── 2-operaciones-archivos-nio.md       # Sesión 1
├── 3-archivos-texto-plano.md          # Sesión 1
├── 4-archivos-csv.md                  # Sesión 1
├── 5-ficheros-configuracion-properties.md # Sesión 1
├── 6-archivos-binarios-serializacion.md # Sesión 3
├── 7-maven-formato-json.md            # Sesión 3
├── 8-formato-xml-jackson.md           # Sesión 3
├── 9-archivos-acceso-aleatorio-raf.md # Sesión 5
└── 10-arquitectura-patron-dao.md      # Sesión 7
```

</div>
