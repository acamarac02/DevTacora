---
draft: true
title: "Proyecto 2: Pipeline Completo de Clasificación"
sidebar_position: 4
description: "Enunciado, requerimientos técnicos y rúbrica de evaluación para el Proyecto 2 individual: construcción de un pipeline integral de clasificación con Scikit-learn."
keywords: ["proyecto 2", "pipeline clasificacion", "columntransformer", "gridsearchcv", "evaluacion", "eda"]
---

<div class="justify-text">

:::info Resumen de la actividad
En este proyecto individual, cada alumno integra todos los conocimientos adquiridos en la UT3 y UT4 para resolver un reto de clasificación real mediante un pipeline reproducible y optimizado.
:::

## Objetivos del Proyecto

* Diseñar un flujo de trabajo de Machine Learning robusto, estructurado y documentado en un único Jupyter Notebook.
* Realizar un Análisis Exploratorio de Datos (EDA) conciso y automatizado mediante bucles y tablas resumen.
* Implementar un preprocesamiento profesional con `ColumnTransformer` (imputación, escalado de numéricas y codificación de categóricas).
* Entrenar y comparar al menos 3 familias de modelos de clasificación distintas utilizando validación cruzada.
* Optimizar los hiperparámetros del mejor candidato mediante `GridSearchCV`.
* Analizar la presencia de sobreajuste o subajuste y justificar con criterio de negocio la elección del modelo final.

---

## Fases Requeridas en el Notebook

### 1. Carga y Partición Inicial
* Carga del conjunto de datos asignado.
* Separación inmediata de variables predictoras ($X$) y variable objetivo ($y$).
* Partición estratificada en Train ($80\%$) y Test ($20\%$) con semilla fija (`random_state=42`). El conjunto de test permanece aislado hasta el final.

### 2. EDA Sintético y Guiado
* Inspección de tipos de datos, cardinalidad y valores nulos.
* Automatización de visualizaciones univariantes mediante bucles (histogramas para continuas, gráficos de barras para categóricas).
* Tabla resumen con las decisiones de preprocesamiento acordadas para cada columna.

### 3. Definición del Preprocesamiento con Pipelines
* Rama numérica: imputación de nulos y escalado (`StandardScaler` o `RobustScaler`).
* Rama categórica: imputación y codificación (`OneHotEncoder`).
* Ensamble centralizado en `ColumnTransformer`.

### 4. Experimentación con Múltiples Modelos
* Integración del preprocesador con al menos 3 estimadores de familias diferentes (ej. Regresión Logística, Random Forest, Gradient Boosting / XGBoost).
* Evaluación mediante validación cruzada estratificada (5 pliegues) sobre el conjunto de entrenamiento.
* Comparativa de métricas: Accuracy, Precision, Recall y F1-Score.

### 5. Optimización del Modelo Ganador
* Búsqueda en rejilla (`GridSearchCV`) sobre los hiperparámetros del algoritmo con mejor desempeño inicial.
* Extracción de la mejor configuración y análisis de estabilidad.

### 6. Diagnóstico y Evaluación Definitiva en Test
* Análisis de over/underfitting comparando el rendimiento del modelo óptimo en train vs test.
* Matriz de confusión final sobre el conjunto de prueba independiente.
* Tabla comparativa consolidada: Modelo, Hiperparámetros óptimos y Métricas finales.
* Conclusiones y justificación de por qué el modelo seleccionado es el más adecuado para el problema.

---

## Conjunto de Datos
*(El dataset definitivo —por ejemplo, una versión adaptada de datos tabulares con valores numéricos y categóricos— se confirmará en el momento del lanzamiento del proyecto).*

</div>
