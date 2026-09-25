---
title: "AS1 - Parte 1: API Rest"
sidebar_position: 5
description: "Actividad práctica de desarrollo de una API REST con FastAPI y Pydantic que simula la inferencia de un modelo de Inteligencia Artificial."
keywords: [FastAPI, Pydantic, actividad, API REST, backend, frontend, Inteligencia Artificial, scoring]
---

<div class="justify-text">

## 1. Contexto y Objetivos

En esta actividad práctica desarrollarás una **API REST completa con FastAPI** que simule el servicio de predicción o evaluación de un modelo de Inteligencia Artificial. La temática del servicio es **completamente libre**, lo que te permitirá diseñar un caso de uso adaptado a tus intereses (por ejemplo: tasación inmobiliaria o de vehículos, triaje clínico orientativo, recomendador de hábitos saludables, detector de spam o moderación de comentarios, cálculo de eficiencia energética, etc.).

El objetivo es aplicar los fundamentos técnicos estudiados en la unidad:
1. Diseñar una **arquitectura de proyecto modular** separando responsabilidades en ficheros independientes.
2. Validar exhaustivamente los datos de entrada y salida mediante **Pydantic**.
3. Configurar **CORS** para habilitar la comunicación entre orígenes distintos.
4. Conectar un **frontend desacoplado** que consuma los endpoints de la API de forma asíncrona.

:::info Uso de Inteligencia Artificial en el Frontend
Recuerda que el foco de este módulo es el **desarrollo del backend en Python y la arquitectura de APIs para IA**. El desarrollo frontend (HTML, Tailwind CSS, JavaScript) queda fuera del alcance de la asignatura, por lo que **puedes apoyarte en herramientas de IA Generativa** para crear la interfaz visual y el script cliente.
:::

---

## 2. Requisitos Técnicos

### 2.1. Validación y Modelado de Datos
Debes definir los esquemas necesarios utilizando modelos de datos:

1. **Esquema de entrada**:
   - Debe contener un mínimo de **4 a 5 atributos** representativos del problema elegido.
   - Debe contemplar diversidad de tipos de datos (cadenas de texto, numéricos y booleanos).
   - Debe incluir al menos un campo opcional o con valor por defecto.
   - Todos los campos deben estar estrictamente validados, aplicando restricciones coherentes con el dominio del problema (rangos numéricos mínimos y máximos, longitud de texto y descripciones explicativas).

2. **Esquema de salida**:
   - Debe estructurar el resultado generado por el motor de inferencia.
   - Debe incluir campos tipados para el veredicto o resultado principal, una métrica numérica asociada (score, probabilidad o estimación) y un mensaje o desglose explicativo.

---

### 2.2. Endpoints y Lógica de la API
1. **Endpoint informativo**:
   - Ruta informativa que devuelva en formato JSON el estado del servicio y detalles de consulta.

2. **Endpoint de inferencia**:
   - Ruta específica para la evaluación del modelo.
   - Debe recibir los datos de entrada en el cuerpo de la petición.
   - Debe garantizar que la respuesta devuelta coincide y se filtra según el esquema de salida definido.
   - **Lógica de simulación**: Debe implementar un algoritmo con reglas heurísticas, ponderaciones o cálculos que simulen el comportamiento de un modelo real a partir de los datos recibidos.

---

### 2.3. Frontend
Debes crear una interfaz frontend con un formulario que recoja los datos, envíe la petición al servidor y muestre en pantalla el resultado obtenido de la evaluación.

---

### 2.4. Documentación de la API
La API debe estar adecuadamente documentada para su visualización y prueba interactiva en Swagger UI, incluyendo títulos, descripciones explicativas del servicio y documentación clara de los campos y esquemas de datos.

---

## 3. Criterios de Evaluación

| Criterio | Ponderación | Descripción |
| :--- | :---: | :--- |
| **Modularidad y Arquitectura** | 15% | Organización del proyecto y separación de responsabilidades. |
| **Modelado y Validación** | 25% | Definición y validación de esquemas de entrada y salida. |
| **API y Lógica de Inferencia** | 30% | Implementación de endpoints, documentación y lógica del servicio. |
| **Frontend** | 10% | Formulario interactivo y consumo asíncrono con visualización del resultado. |
| **Despliegue (Parte 2)** | 20% | Despliegue en Hugging Face Spaces (evaluado en la *AS1 - Parte 2*). |

</div>
