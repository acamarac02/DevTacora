---
title: Formato XML Moderno con Jackson XML
sidebar_position: 8
description: Tratamiento del formato XML mediante Data Binding moderno con Jackson Dataformat XML, anotaciones y comparativa conceptual con DOM.
keywords: [xml, jackson, xmlmapper, data binding, dom, records, java]
---

<div class="justify-text">

## Resumen del Tema

Este tema aborda el formato jerárquico **XML** (eXtensible Markup Language), ampliamente utilizado en configuraciones empresariales, interoperabilidad entre sistemas heredados y servicios web.

Frente al enfoque tradicional y tedioso de manipular árboles nodo a nodo con el analizador DOM clásico (`DocumentBuilderFactory`, `NodeList`, `Transformer`), adoptaremos la vía moderna y ágil de la industria: el **Data Binding con Jackson XML** (`jackson-dataformat-xml`).

Aprovechando que los alumnos ya dominan `ObjectMapper` del tema anterior, utilizaremos `XmlMapper`, permitiendo serializar y deserializar documentos XML complejos (como catálogos de productos o inventarios) hacia **Java Records** con exactamente el mismo patrón de código que en JSON. Además, revisaremos brevemente la estructura conceptual del árbol DOM para que el alumno comprenda qué ocurre por debajo sin sufrir su complejidad sintáctica.

## Objetivos de Aprendizaje

- Conocer la estructura de un documento XML (etiquetas, atributos, anidamiento jerárquico, prólogo).
- Comprender las diferencias fundamentales entre el enfoque en árbol (DOM tradicional) y el enfoque de enlace de datos (Data Binding moderno).
- Configurar la dependencia `jackson-dataformat-xml` en el `pom.xml` de Maven.
- Mapear colecciones y elementos XML a **Java Records** utilizando la clase `XmlMapper`.
- Utilizar anotaciones básicas de Jackson XML (`@JacksonXmlProperty`, `@JacksonXmlElementWrapper`) para personalizar atributos y nombres de etiquetas.

## Contenidos a Desarrollar

- **El formato XML en la empresa**: Usos actuales, estructura y comparativa directa con JSON.
- **La arquitectura DOM bajo el capó**: Cómo se representa un árbol de nodos (nodos elemento, texto y atributos).
- **Data Binding moderno con Jackson XML**:
  - Dependencia Maven `jackson-dataformat-xml`.
  - La clase `XmlMapper`: lectura (`readValue`) y escritura (`writeValue`) limpia.
- **Anotaciones para XML**: Control de atributos (`isAttribute = true`), envolturas de listas y renombramiento de etiquetas.
- **Caso práctico**: Deserialización completa de un archivo `semillas.xml` estructurado en Java Records.

</div>
