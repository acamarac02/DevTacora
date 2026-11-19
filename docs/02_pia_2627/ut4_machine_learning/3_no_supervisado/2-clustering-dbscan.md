---
draft: true
title: "Clustering por Densidad: DBSCAN y Detección de Ruido"
sidebar_position: 2
description: "Agrupamiento espacial basado en densidad con DBSCAN: detección de clusters de formas arbitrarias, hiperparámetros eps y min_samples, y aislamiento de ruido."
keywords: ["dbscan", "densidad", "clustering", "eps", "min_samples", "anomalias", "outliers"]
---

<div class="justify-text">

:::info Resumen de la sesión
En esta sesión se estudia DBSCAN, un algoritmo de agrupamiento basado en densidad capaz de encontrar grupos de geometrías complejas y detectar anomalías o ruido de forma nativa.
:::

## Objetivos de Aprendizaje

* Comprender por qué los métodos particionales como K-Means fracasan ante agrupaciones con formas no esféricas, densidades dispares o presencia de valores atípicos.
* Explicar los fundamentos de **DBSCAN (Density-Based Spatial Clustering of Applications with Noise)**:
  * Vecindario circular/esférico determinado por el radio **`eps`** ($\varepsilon$).
  * Umbral de densidad controlado por **`min_samples`**.
* Clasificar las muestras según su densidad local:
  * **Puntos Núcleo (*Core Points*):** Tienen al menos `min_samples` dentro de su radio `eps`.
  * **Puntos Frontera (*Border Points*):** Están dentro del radio de un punto núcleo, pero no alcanzan la densidad propia.
  * **Puntos de Ruido o Anomalías (*Noise Points*):** Muestras aisladas que no pertenecen a ningún cluster (etiquetadas automáticamente con `-1`).
* Entender la gran ventaja operativa de DBSCAN: **no requiere prefijar el número de clusters $k$** a priori.
* Comparar críticamente las situaciones en las que conviene aplicar K-Means frente a DBSCAN.

---

## Estructura del Contenido a Desarrollar

* **Cuando la Geometría Engaña a los Centroides:**
  * Ejemplos de clusters concéntricos, alargados o en forma de luna.
* **El Funcionamiento de DBSCAN:**
  * Expansión de clusters por densidad conexa.
  * Por qué no todas las muestras tienen por qué ser asignadas a un grupo.
* **Ajuste Práctico de Hiperparámetros:**
  * El impacto de un `eps` demasiado pequeño (todo es ruido) o demasiado grande (un único macro-cluster).
  * Regla general para la elección de `min_samples`.
* **K-Means vs DBSCAN: Tabla Comparativa:**
  * Complejidad computacional, necesidad de escalado, manejo de ruido y flexibilidad de formas.

</div>
