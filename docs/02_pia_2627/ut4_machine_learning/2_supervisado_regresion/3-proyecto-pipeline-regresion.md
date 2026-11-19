---
draft: true
title: "Proyecto 3: Pipeline Completo de Regresión"
sidebar_position: 3
description: "Enunciado, requerimientos técnicos y rúbrica de evaluación para el Proyecto 3 individual: pipeline integral de predicción continua con Scikit-learn."
keywords: ["proyecto 3", "pipeline regresion", "columntransformer", "gridsearchcv", "evaluacion", "residuos"]
---

<div class="justify-text">

:::info Resumen de la actividad
En este proyecto individual, cada alumno consolida el paradigma de Pipelines aplicándolo a un problema real de predicción de variables continuas, comparando modelos lineales y basados en árboles.
:::

## Objetivos del Proyecto

* Construir un flujo de trabajo de regresión estructurado y reproducible de extremo a extremo en Jupyter Notebook.
* Automatizar el preprocesamiento de variables continuas y categóricas mediante `ColumnTransformer`.
* Entrenar y comparar al menos 3 familias de regresores mediante validación cruzada (ej. Regresión Lineal regularizada, Random Forest Regressor y XGBoost Regressor).
* Optimizar la configuración de hiperparámetros del estimador más prometedor con `GridSearchCV`.
* Evaluar el rendimiento utilizando MAE, RMSE y $R^2$ tanto en entrenamiento como en el conjunto de prueba independiente.
* Analizar los residuos gráficamente para verificar si existen sesgos sistemáticos en las predicciones.

---

## Fases Requeridas en el Notebook

### 1. Carga y Partición Inicial
* Carga del conjunto de datos asignado para regresión (ej. tasación inmobiliaria o precios de venta).
* División en Train ($80\%$) y Test ($20\%$) con semilla fija (`random_state=42`).

### 2. EDA Guiado
* Distribución de la variable objetivo continua (detección de asimetría o valores atípicos severos).
* Bucle automatizado de gráficos bivariantes mostrando la relación de cada variable numérica con el target.
* Matriz de correlación rápida y tabla de acciones de preprocesamiento.

### 3. Pipeline de Preprocesamiento
* Tratamiento de valores ausentes y escalado de variables numéricas.
* Codificación de variables cualitativas (`OneHotEncoder`).
* Ensamble centralizado en `ColumnTransformer`.

### 4. Comparativa de Modelos mediante Cross-Validation
* Integración del preprocesador con al menos 3 regresores (un modelo lineal regularizado y dos no lineales basados en árboles o distancias).
* Evaluación mediante validación cruzada (5 pliegues) sobre el conjunto de entrenamiento usando `neg_mean_absolute_error` o `neg_root_mean_squared_error`.
* Tabla resumen inicial con MAE, RMSE y $R^2$ medios.

### 5. Optimización con GridSearchCV
* Búsqueda en rejilla para afinar los hiperparámetros clave del modelo con mejor balance entre precisión y coste de cómputo.
* Obtención de los parámetros óptimos y validación de su estabilidad.

### 6. Diagnóstico y Evaluación Definitiva en Test
* Cálculo de MAE, RMSE y $R^2$ sobre el conjunto de prueba independiente.
* Gráfico de dispersión: valores reales vs predicciones finales.
* Detección de sobreajuste comparando métricas de train vs test.
* Conclusiones finales y justificación técnica de la solución adoptada.

</div>
