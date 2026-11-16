---
draft: true
title: "Guía Didáctica y Metodología de la UT4"
sidebar_position: 0
description: "Estructura general, temporalización (34 horas) y metodología docente para la UT4: Machine Learning en el módulo PIA."
keywords: ["UT4", "guia docente", "machine learning", "clasificacion", "regresion", "clustering", "flipped classroom", "pipelines"]
---

<div class="justify-text">

**Duración total:** 34 horas lectivas  
**Ubicación temporal:** 1ª Evaluación (continuación directa de la UT3: Preparación y análisis de datos)  
**Entorno de trabajo:** Google Colab y Jupyter Notebooks para experimentación rápida y desarrollo de proyectos.

---

## Enfoque Pedagógico y Metodología

La **UT4: Machine Learning** marca el paso de la preparación de datos a la construcción de modelos predictivos inteligentes. Tras dominar el EDA y los Pipelines en la UT3, el objetivo ahora es comprender **cómo piensan y aprenden los algoritmos**, cómo evaluarlos rigurosamente y cómo optimizarlos sin caer en trampas como el sobreajuste (*overfitting*).

### Principios metodológicos

1. **Flipped Classroom y Aprendizaje Cooperativo (Proyecto 1):**  
   En lugar de sesiones magistrales repetitivas desgranando algoritmo por algoritmo, los alumnos investigan en grupos de 3 un modelo asignado. Se convierten en los "expertos" de ese modelo, exponiendo sus fundamentos prácticos y demostrando su uso con notebooks preparados sobre datasets limpios y controlados.
2. **Foco Conceptual y Práctico («Sin Paja» Matemática):**  
   No nos detenemos en demostraciones algebraicas complejas ni en métricas hiperavanzadas (evitamos curvas ROC/AUC o formulaciones multiclase densas). Centramos el esfuerzo en el impacto real: entender qué hace cada hiperparámetro, qué atributos nos devuelve el modelo tras entrenar y qué sacrificamos al mover el umbral de decisión (*threshold*).
3. **Consolidación mediante Pipelines Individuales (Proyectos 2 y 3):**  
   Tras conocer los modelos, cada alumno afronta de forma autónoma la construcción de un pipeline completo de extremo a extremo: desde el preprocesamiento hasta la selección justificada del mejor estimador mediante validación cruzada y búsqueda de hiperparámetros.

---

## Estructura de la Unidad y Temporalización (34 Horas)

| Bloque Temático | Horas | Dinámica Principal | Entregables / Hitos |
| :--- | :---: | :--- | :--- |
| **Bloque 1: Aprendizaje Supervisado — Clasificación** | 18 h | Teoría interactiva + Aprendizaje cooperativo + Proyecto individual | Práctica 1, Presentación + 2 Notebooks (Proyecto 1), Pipeline de Clasificación (Proyecto 2) |
| **Bloque 2: Aprendizaje Supervisado — Regresión** | 9 h | Sesión teórica comparativa + Proyecto individual | Pipeline completo de Regresión (Proyecto 3) |
| **Bloque 3: Aprendizaje No Supervisado — Clustering** | 6 h | Práctica guiada y experimentación visual | Reto de segmentación con K-Means y DBSCAN |
| **Cierre y Evaluación** | 1 h | Feedback global y retrospectiva de la unidad | Puesta en común de resultados |

---

## Mapa de Contenidos por Secciones

* **`1_supervisado_clasificacion/`**
  * `1-fundamentos-metricas.md`: Concepto de clasificación, métricas esenciales (Accuracy, Matriz de Confusión, Precision, Recall, F1), la lógica del *threshold* y detección de over/underfitting.
  * `2-guia-proyecto-modelos-cooperativo.md`: Guía de trabajo del Proyecto 1, asignación de los 7 modelos en grupos de 3, rúbrica de exposición y datasets reducidos de prueba.
  * `3-validacion-cruzada-gridsearch.md`: Por qué un simple train/test no basta, estrategia K-Fold y automatización con `GridSearchCV`.
  * `4-proyecto-pipeline-clasificacion.md`: Enunciado y rúbrica del Proyecto 2 (pipeline individual completo con preprocesamiento y comparativa de modelos).
* **`2_supervisado_regresion/`**
  * `1-fundamentos-metricas-regresion.md`: Naturaleza del problema continuo, residuos y métricas de error (MAE, MSE, RMSE, R²).
  * `2-modelos-regresion.md`: Modelos lineales (Regresión Lineal, Ridge, Lasso) y adaptación de árboles y ensambles a regresión.
  * `3-proyecto-pipeline-regresion.md`: Enunciado y rúbrica del Proyecto 3 (pipeline individual de regresión).
* **`3_no_supervisado/`**
  * `1-clustering-kmeans.md`: Agrupamiento sin etiquetas, cálculo de centroides, método del codo e índice Silhouette.
  * `2-clustering-dbscan.md`: Agrupamiento basado en densidad, hiperparámetros clave (`eps`, `min_samples`) y detección de ruido/anomalías.
  * `3-practica-segmentacion.md`: Caso práctico integrador de segmentación de datos.

</div>
