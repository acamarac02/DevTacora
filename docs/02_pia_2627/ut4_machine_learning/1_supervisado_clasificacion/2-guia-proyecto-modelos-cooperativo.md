---
draft: true
title: "Proyecto 1: Estudio Cooperativo de Modelos de Clasificación"
sidebar_position: 2
description: "Guía docente y de trabajo para el Proyecto 1: investigación en equipos de 3 alumnos sobre los 7 grandes modelos de clasificación, presentaciones y notebooks prácticos."
keywords: ["proyecto 1", "flipped classroom", "modelos clasificacion", "regresion logistica", "knn", "arboles de decision", "random forest", "gradient boosting", "svm", "xgboost"]
---

<div class="justify-text">

:::info Resumen de la actividad
En este proyecto cooperativo en grupos de 3, cada equipo se especializa en un algoritmo de clasificación, elaborando una presentación técnica y dos notebooks demostrativos sobre conjuntos de datos estandarizados con pocas características.
:::

## Objetivos del Proyecto

* Investigar de forma autónoma el principio de funcionamiento de un algoritmo de clasificación sin entrar en demostraciones matemáticas complejas.
* Identificar los hiperparámetros críticos que controlan el sesgo, la varianza y la complejidad del modelo.
* Conocer los atributos internos que el estimador expone tras el entrenamiento para interpretar sus decisiones.
* Determinar las exigencias de preprocesamiento del modelo (necesidad de escalado numérico, sensibilidad a valores atípicos o soporte nativo para relaciones no lineales).
* Comunicar eficazmente los hallazgos técnicos ante el resto del grupo en una exposición sintética de 10 minutos.

---

## Modelos Asignados (7 Grupos)

1. **Regresión Logística (Logistic Regression):**  
   Función sigmoide, probabilidades, regularización ($C$) y extensión multiclase (`ovr` / `multinomial`).
2. **K-Vecinos más Cercanos (K-Nearest Neighbors - KNN):**  
   Métrica de distancia, número de vecinos ($k$), ponderación por distancia e impacto de la dimensionalidad.
3. **Árboles de Decisión (Decision Tree Classifier):**  
   Criterios de división (Gini / Entropía), profundidad máxima (`max_depth`), muestras mínimas para dividir y visualización gráfica del árbol.
4. **Bosques Aleatorios (Random Forest Classifier):**  
   Concepto de ensamble por ensacado (*Bagging*), estimadores base (`n_estimators`), aleatoriedad de características e importancia de variables.
5. **Potenciación del Gradiente (Gradient Boosting Classifier):**  
   Ensamble secuencial (*Boosting*), corrección iterativa de errores residuales, tasa de aprendizaje (`learning_rate`) y control de sobreajuste.
6. **Máquinas de Vectores de Soporte (Support Vector Machines - SVC):**  
   Hiperplanos de separación, margen óptimo, vectores de soporte y el truco del núcleo (*Kernel* lineal vs RBF).
7. **XGBoost Classifier:**  
   Optimización moderna de árboles potenciados por gradiente, regularización interna, velocidad de cómputo y manejo de divisiones eficientes.

---

## Entregables del Proyecto

### 1. Presentación Técnica (10 minutos de exposición + 3 min de preguntas)
* **Contenido mínimo:**
  * Intuición del funcionamiento interno (con analogías visuales, sin fórmulas densas).
  * Tabla con los 3 a 5 hiperparámetros fundamentales y qué efecto tiene subirlos o bajarlos.
  * Atributos clave tras `fit()` (ej. `.coef_`, `.intercept_`, `.feature_importances_`, `.classes_`).
  * Semáforo de preprocesamiento: ¿Requiere escalado obligatorio? ¿Es sensible a outliers?
* **Criterios de calidad:** Diapositivas limpias, diagramas explicativos y dominio oral por parte de todos los miembros del equipo.

### 2. Dos Notebooks Demostrativos (Binario y Multiclase)
Para asegurar que todos los grupos trabajan en igualdad de condiciones y se centran en el entrenamiento sin perder tiempo limpiando datos, se trabajarán dos datasets directos con un número reducido de variables numéricas:
* **Notebook 1 — Clasificación Binaria:**  
  * Dataset controlado y limpio con 4-6 características clave (subconjunto seleccionado de variables numéricas continuas).
* **Notebook 2 — Clasificación Multiclase:**  
  * Dataset con pocas características y 3 clases bien definidas (ej. `load_iris` o subconjunto de `load_wine`).

**Estructura obligatoria de cada notebook:**
1. Carga del conjunto de datos y partición train/test fija (`random_state=42`).
2. Instanciación y entrenamiento del modelo asignado con sus hiperparámetros destacados.
3. Consulta e impresión comentada de sus atributos útiles tras el entrenamiento.
4. Predicción sobre nuevos ejemplos hipotéticos.
5. Diagnóstico de sobreajuste/subajuste comparando métricas en entrenamiento vs test.
6. Evaluación: Accuracy, Matriz de Confusión, Precision, Recall y F1-Score.
7. Conclusiones técnicas redactadas en Markdown.

</div>
