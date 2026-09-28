---
title: Archivos Binarios y Serialización de Objetos
sidebar_position: 6
description: Persistencia del estado de objetos en Java mediante flujos binarios y la interfaz Serializable.
keywords: [binario, serializacion, serializable, objectoutputstream, objectinputstream, serialversionuid]
---

<div class="justify-text">

## Resumen del Tema

Este tema introduce el almacenamiento y recuperación directa del estado de objetos en memoria hacia archivos binarios, permitiendo guardar el estado completo de una aplicación o sesión de usuario para reanudarla en cualquier momento.

Comprenderemos el mecanismo de serialización nativa de Java articulado a través de la interfaz marcadora `java.io.Serializable` y las clases de flujo `java.io.ObjectOutputStream` y `java.io.ObjectInputStream`, combinadas con `Files.newOutputStream` y `Files.newInputStream`.

Analizaremos en profundidad el atributo `serialVersionUID`, su impacto crítico en la compatibilidad de versiones de las clases, el modificador `transient` para omitir campos sensibles o no persistentes, y los riesgos de seguridad y acoplamiento que han llevado a la industria a preferir formatos neutros como JSON.

## Objetivos de Aprendizaje

- Comprender el proceso de serialización (objeto a secuencia de bytes) y deserialización (bytes a objeto).
- Habilitar la persistencia de clases implementando la interfaz marcadora `Serializable`.
- Escribir y leer grafos de objetos completos (incluyendo colecciones como `List` y relaciones entre objetos) con `ObjectOutputStream` y `ObjectInputStream`.
- Comprender el propósito del identificador `serialVersionUID` y evitar la excepción `InvalidClassException`.
- Utilizar la palabra clave `transient` para campos calculados o no serializables.

## Contenidos a Desarrollar

- **Persistencia binaria vs. persistencia textual**: Ventajas en compacidad e inconvenientes de legibilidad.
- **La interfaz `java.io.Serializable`**: Marcado de clases y serialización de objetos anidados.
- **Flujos de objetos**: Uso de `ObjectOutputStream.writeObject()` y `ObjectInputStream.readObject()` bajo `try-with-resources`.
- **Evolución de clases y `serialVersionUID`**: Control de versiones y prevención de incompatibilidades.
- **Atributos transitorios (`transient`)**: Exclusión de datos volátiles.
- **Limitaciones de la serialización nativa de Java**: Por qué la industria actual prioriza formatos abiertos e interoperables.

</div>
