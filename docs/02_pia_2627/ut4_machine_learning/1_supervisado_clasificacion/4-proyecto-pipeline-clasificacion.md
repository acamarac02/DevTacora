---
draft: true
title: "Proyecto: Pipeline completo de clasificación"
sidebar_position: 4
description: "Enunciado y guía paso a paso para desarrollar un proyecto completo de clasificación: EDA simplificado, preprocesamiento con Pipelines, entrenamiento con GridSearchCV y comparativa final de modelos."
keywords: ["proyecto", "pipeline", "clasificacion", "columntransformer", "gridsearchcv", "eda", "overfitting"]
---

<div class="justify-text">

En este proyecto individual pondrás en práctica todo el flujo de trabajo completo de un problema de clasificación supervisada sobre un conjunto de datos real: desde el análisis exploratorio inicial y el preprocesamiento con Pipelines hasta el entrenamiento, ajuste de hiperparámetros y comparación de varios modelos para elegir el mejor candidato.

---

## Pipeline completo de Machine Learning

Esta parte del trabajo se entregará en un único **Jupyter Notebook** estructurado en las siguientes fases:

### Carga de datos y partición inicial

* Carga el conjunto de datos asignado e inspecciona sus dimensiones y primeras filas.
* Separa las variables predictoras (`X`) de la variable objetivo (`y`).
* Realiza la división estratificada en entrenamiento (`80%`) y prueba (`20%`) fijando `random_state=42`. El conjunto de test debe mantenerse intacto hasta la fase de evaluación.

### Análisis exploratorio (EDA)

En esta fase no es necesario aplicar la fórmula V-H-A debajo de cada gráfico individual. Para agilizar el proceso, **puedes generar los gráficos del mismo tipo dentro de un bucle** (por ejemplo, un bucle para los histogramas o diagramas de caja de las variables numéricas y otro para los gráficos de barras de las categóricas).

Lo fundamental de este apartado es:

* Revisar si las clases están balanceadas. Si no lo están, toma las medidas oportunas, indicando cuáles son.
* Revisar tipos de datos, valores nulos y posibles valores atípicos o incoherentes.
* Elaborar una **tabla resumen final** con todas las variables del dataset, indicando qué problema presenta cada una y qué transformación se le va a aplicar.
* Redactar de forma clara las **conclusiones extraídas** del análisis.

### Preprocesamiento con Pipelines

* Es **obligatorio** implementar todo el preprocesamiento mediante **Pipelines y `ColumnTransformer`**, siguiendo la estructura vista en la unidad anterior. El uso de otras técnicas supondrá una calificación de 0 en este apartado.
* Aplica el preprocesador sobre los datos de entrenamiento y de prueba para obtener las matrices finales listas para entrenar.

### Entrenamiento y evaluación de modelos

Entrena y evalúa **todos los modelos de clasificación** en el proyecto anterior.

Para cada modelo deberás:

1. Buscar los mejores hiperparámetros mediante **`GridSearchCV`**.
2. Recuperar el mejor estimador (`best_estimator_`) y anotar los mejores hiperparámetros (`best_params_`).
3. Calcular las **métricas de evaluación** y representar su **Matriz de Confusión**. Añadir conclusiones sobre los resultados obtenidos para cada modelo.
4. Realizar el **análisis de *overfitting* y *underfitting*** y añadir las conclusiones extraídas.
5. Guardar el nombre del modelo, sus hiperparámetros óptimos y sus métricas en una lista de diccionarios para construir la tabla comparativa final.

### Tabla resumen y selección del mejor modelo

* Muestra una **tabla comparativa final** que reúna todos los modelos probados junto con sus **hiperparámetros seleccionados** y las **métricas obtenidas**.
* Indica cuál es el **mejor modelo** y justifica tu elección en una celda Markdown, teniendo en cuenta no solo la puntuación más alta sino también el equilibrio entre métricas, la estabilidad y la ausencia de sobreajuste.

### Exportación de los joblibs

Exporta los 3 mejores modelos y el preprocesador a `.joblib` para poder utilizarlos en la API REST.

---

## Aplicación web: API REST y Frontend

A partir de los artefactos exportados (el preprocesador y los 3 mejores modelos), deberás construir una aplicación web siguiendo la arquitectura vista en la unidad anterior:

### Backend con FastAPI

* **Esquemas Pydantic (`schemas.py`):** Define las clases de entrada y salida con los tipos de datos adecuados, validaciones de rango (`Field`) y ejemplos para la documentación interactiva (`/docs`).
* **Carga de artefactos e inferencia (`main.py`):**
  * Carga en memoria al arrancar la aplicación (`lifespan`) el preprocesador y los **3 mejores modelos** `.joblib`.
  * Crea el endpoint `/predict` para recibir los datos del formulario, aplicar el preprocesamiento correspondiente y devolver la predicción de los tres modelos.

### Frontend Web

* Construye una interfaz web limpia y usable servida desde la ruta raíz `/` (`templates/` y `static/`).
* Incluye un formulario con todos los campos necesarios y visualización clara del resultado devuelto por el modelo, separando la respuesta de los tres modelos para poder comparar.

### Despliegue en la nube

* Publica la aplicación completa (API + Frontend) en un servicio en la nube (Render, Railway, Hugging Face Spaces o similar) asegurándote de incluir un `requirements.txt` con las versiones exactas de las librerías (especialmente `scikit-learn`).

---

## Entregables y conjunto de datos

Para completar la entrega deberás subir los siguientes cuatro elementos:

1. **Notebook de Jupyter / Colab (`.ipynb`):** Con todas las celdas ejecutadas en orden, los gráficos visibles, las tablas comparativas y las conclusiones redactadas.
2. **Archivo comprimido (`.zip`) con el código de la API y Frontend:** Con la estructura completa lista para ejecutarse en local. No incluyas carpetas de entorno virtual ni cachés.
3. **Archivo Markdown de despliegue:** Debe contener la **URL pública y activa** de la API desplegada, breves instrucciones de uso (`/` y `/docs`)
4. **Captura de pantalla** de la aplicación funcionando.

**Dataset de trabajo:** 📥 **<a href="/DevTacora/recursos/pia_ut4/titanic.csv" download="titanic.csv">Descargar titanic.csv</a>** (variable objetivo: `Survived`).

---

## Rúbrica de evaluación

La calificación final se reparte en un **70% para el trabajo en Notebook/Colab** y un **30% para la API, Frontend y despliegue**:

| Bloque | Criterio de evaluación | Ponderación |
| :--- | :--- | :---: |
| **Colab / Notebook (70%)** | **Carga, partición y EDA** | **10%** |
| | **Preprocesamiento con Pipelines** | **20%** |
| | **Entrenamiento, GridSearchCV y Evaluación** | **30%** |
| | **Tabla comparativa y Exportación** | **10%** |
| **API y Despliegue (30%)** | **Backend FastAPI y Pydantic** | **15%** |
| | **Frontend Web** | **10%** |
| | **Despliegue en la nube y entrega** | **5%** |

</div>
