---
draft: true
title: "Validación Cruzada y Búsqueda de Hiperparámetros"
sidebar_position: 3
description: "Evaluación robusta de modelos mediante Cross-Validation y optimización sistemática de hiperparámetros con GridSearchCV integrado en Pipelines."
keywords: ["cross-validation", "k-fold", "stratified k-fold", "gridsearchcv", "hiperparametros", "optimizacion", "data leakage"]
---

<div class="justify-text">

:::info Resumen de la sesión
En esta sesión se aborda la evaluación robusta de modelos para evitar la varianza de una partición única y la automatización del ajuste fino de hiperparámetros mediante `GridSearchCV`.
:::

## Objetivos de Aprendizaje

* Comprender las limitaciones de una partición fija Train/Test y el riesgo de tomar decisiones basadas en una división favorable o desfavorable.
* Aplicar la técnica de **Validación Cruzada en K Pliegues (*K-Fold Cross-Validation*)** y su variante estratificada (*Stratified K-Fold*) para clasificación.
* Comprender la diferencia entre parámetros entrenables (aprendidos durante `fit`) e **hiperparámetros** (configurados antes de entrenar).
* Configurar y ejecutar búsquedas sistemáticas en rejilla mediante **`GridSearchCV`**.
* Integrar `GridSearchCV` dentro de **Pipelines de Scikit-learn** para garantizar que los transformadores (escalado, imputación) se ajusten exclusivamente en cada pliegue de entrenamiento, eliminando cualquier fuga de datos (*Data Leakage*).

---

## Estructura del Contenido a Desarrollar

* **La Fragilidad del Train/Test Split Clásico:**
  * El problema de la "suerte" en el muestreo.
  * Por qué necesitamos estimaciones con media y desviación estándar de rendimiento.
* **Mecánica de K-Fold y Stratified K-Fold:**
  * División de los datos en $K$ bloques iterativos (ej. $K=5$).
  * Preservación de la proporción de clases en problemas de clasificación.
* **Estrategias de Búsqueda de Hiperparámetros:**
  * El coste computacional de probar combinaciones a ciegas.
  * Definición del diccionario de parámetros (`param_grid`).
  * Extracción del mejor modelo (`best_estimator_`), mejores parámetros (`best_params_`) y mejor puntuación (`best_score_`).
* **La Regla de Oro: GridSearch sobre Pipelines:**
  * Por qué optimizar primero preprocesando todo el dataset genera fugas de información.
  * Sintaxis de parámetros en pipelines anidados (ej. `clasificador__n_neighbors`).
* **Evaluación Final en Test:**
  * Uso del conjunto de prueba independiente reservado al inicio como árbitro definitivo e intocable.

</div>
