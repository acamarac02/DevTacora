---
title: "AS1 - Parte 2: Despliegue"
sidebar_position: 7
description: "Actividad práctica de despliegue de la API REST y página web de Inteligencia Artificial en Hugging Face Spaces."
keywords: [FastAPI, Hugging Face Spaces, actividad, despliegue, nube, producción, Evex]
---

<div class="justify-text">

## 1. Contexto y Objetivos

En esta segunda fase de la actividad darás continuidad al trabajo realizado en la [AS1 - Parte 1: API Rest](./5-as1-api-rest.md). El objetivo es desplegar en producción la API y la página web interactiva desarrollada para que sea accesible públicamente a través de internet.

---

## 2. Requisitos

La página web y la API desarrolladas en la **Parte 1** deben desplegarse en un **hosting en la nube gratuito**, debiendo permanecer el servicio activo y accesible públicamente.

Todo lo explicado en el fichero anterior ya no es útil, porque se basaba en un hosting concreto (HuggingFace Spaces) con una herramienta concreta (Gradio). Por tanto, tenéis que investigar cómo hacer el despliegue en el hosting que elijáis.

Lo ideal es buscar un servicio de hosting que en el futuro permita desplegar APIs con modelos de IA. De momento, los compañeros han encontrado:

- Andrés: Modal
- Daniel: Render

Falta por comprobar si permite desplegar APIs con modelos. Para ello, podéis intentar desplegar el código de este repo:

```bash
git clone https://huggingface.co/spaces/acamarac02/perros-gatos-clasificador
```

Contiene un clasificador de imágenes de perros o gatos.

Si algún alumno despliega este repo con modelos de IA y le funciona, que incluya en la documentación a entregar el enlace a la página desplegada y una descripción de cómo ha hecho el despliegue.

:::danger ENUNCIADO ANTIGUO
La página web y la API desarrolladas en la **Parte 1** deben desplegarse en **Hugging Face Spaces**, debiendo permanecer el servicio activo y accesible públicamente.

Como hemos visto en clase, ya no podemos desplegar ahí porque es de pago.
:::

:::danger Integridad académica y penalización por copia
Al tratarse de un repositorio **público**, el código fuente está disponible en internet.
- **Queda terminantemente prohibido compartir el enlace o el código fuente con cualquier otro alumno.**
- La práctica es estrictamente individual.
- **Cualquier copia, plagio o coincidencia detectada entre entregas será calificada automáticamente con un 0 para ambos alumnos** (tanto para el alumno que copia como para el alumno del que han copiado).
:::

---

## 3. Entrega de la Actividad

La entrega de esta práctica se realizará a través de la plataforma **Evex**.

Debes subir un **único archivo comprimido `.zip`** que contenga:

1. **Código fuente del proyecto** (excluyendo el entorno virtual `.venv/` o carpetas de caché).
2. **Archivo Markdown (`README.md`)** que incluya:
   - **Descripción de la aplicación**: Qué hace el servicio y qué problema resuelve.
   - **URL pública**: Enlace para acceder a la página web desplegada.
   - **Plataforma de despliegue**: Indicar en qué plataforma se ha desplegado la aplicación.
   - **Descripción detallada del proceso de despliegue**: Explicar paso a paso cómo se ha desplegado la aplicación, de forma que cualquier compañero pueda replicarlo siguiendo este tutorial. Se busca algo similar al apartado "Despliegue en Hugging Face Spaces" que hay en esta documentación, pero adaptado a vuestro hosting.
   

---

## 4. Criterios de Evaluación

| Criterio | Ponderación | Descripción |
| :--- | :---: | :--- |
| **Modularidad y Arquitectura** | 10% | Organización del proyecto y separación de responsabilidades. |
| **Modelado y Validación** | 15% | Definición y validación de esquemas de entrada y salida. |
| **API y Lógica de Inferencia** | 30% | Implementación de endpoints, documentación y lógica del servicio. |
| **Frontend** | 10% | Formulario interactivo y consumo asíncrono con visualización del resultado. |
| **Despliegue** | 20% | Despliegue operativo en la plataforma elegida y entrega en Evex. |
| **Documentación** | 15% | Estructura, claridad y completitud del archivo README.md. |

</div>
