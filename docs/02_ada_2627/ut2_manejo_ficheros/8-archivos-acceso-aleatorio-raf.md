---
title: Archivos de Acceso Aleatorio (RAF)
sidebar_position: 8
description: Acceso posicional a archivos mediante RandomAccessFile, cálculo de offsets en bytes y simulación de matrices bidimensionales.
keywords: [randomaccessfile, raf, puntero, seek, acceso aleatorio, bytes, matrices]
---

<div class="justify-text">

## Resumen del Tema

Este tema aborda el paradigma de acceso aleatorio a ficheros, donde la información no se procesa secuencialmente de principio a fin, sino que es posible posicionarse directamente en cualquier punto del archivo para leer o modificar datos en tiempo constante.

Profundizaremos en el funcionamiento de la clase `java.io.RandomAccessFile`, el concepto de puntero de lectura/escritura (`getFilePointer()`, `seek()`), y la necesidad crítica de conocer la estructura y tamaño exacto en bytes de cada tipo de dato primitivo (`int` = 4B, `boolean` = 1B, `double` = 8B, `char` = 2B).

Aprenderemos a diseñar registros de tamaño fijo para datos heterogéneos y cadenas de texto mediante `StringBuffer.setLength()`, y aplicaremos este conocimiento al modelado de matrices bidimensionales persistentes sobre disco, calculando los desplazamientos de filas de forma precisa.

## Objetivos de Aprendizaje

- Entender el funcionamiento del puntero de un archivo y la navegación aleatoria con `seek()` y `getFilePointer()`.
- Calcular con exactitud el tamaño en bytes de los registros a partir de los tipos de datos primitivos de Java.
- Manejar cadenas de longitud fija mediante `StringBuffer` y su método `setLength()` para evitar desajustes en el cálculo de offsets.
- Diseñar e implementar estructuras de datos matriciales (filas y columnas) persistidas directamente sobre un archivo RAF sin cargarlas en memoria RAM.
- Realizar operaciones quirúrgicas de actualización en disco sin sobreescribir el resto del archivo.

## Contenidos a Desarrollar

- **Acceso secuencial vs. acceso aleatorio**: Casos de uso de alto rendimiento y acceso por posición.
- **La clase `java.io.RandomAccessFile`**: Modos de apertura (`"r"`, `"rw"`), métodos de E/S tipados (`readInt`, `writeInt`, `readBoolean`, `writeBoolean`, etc.).
- **El puntero de archivo**: Navegación con `seek()` y control de fin de fichero con `length()`.
- **Estructuración de registros fijos**:
  - Tamaños en bytes de tipos primitivos.
  - Almacenamiento de cadenas fijas con `StringBuffer`.
- **Caso práctico: Simulación de una matriz bidimensional en disco**:
  - Mapeo de coordenadas `(fila, columna)` a desplazamiento de bytes:
    $$\text{offset} = (\text{fila} \times \text{numColumnas} + \text{columna}) \times \text{tamañoRegistro}$$
  - Lectura y siembra secuencial por filas.

</div>
