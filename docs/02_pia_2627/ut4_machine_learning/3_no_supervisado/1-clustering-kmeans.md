---
draft: true
title: "Clustering Particional: K-Means y Selección de K"
sidebar_position: 1
description: "Fundamentos del aprendizaje no supervisado, algoritmo K-Means, necesidad crítica de escalado y técnicas para seleccionar el k óptimo (Codo y Silhouette)."
keywords: ["no supervisado", "clustering", "k-means", "centroides", "metodo del codo", "inercia", "silhouette"]
---

<div class="justify-text">

:::info Resumen de la sesión
En esta sesión se introduce el paradigma no supervisado donde los datos carecen de variable objetivo ($y$) y se estudia el algoritmo de agrupamiento particional más utilizado: K-Means.
:::

## Objetivos de Aprendizaje

* Comprender la diferencia esencial entre aprendizaje supervisado (con etiquetas conocidas) y no supervisado (descubrimiento de patrones ocultos).
* Explicar el ciclo iterativo de **K-Means**: inicialización de centroides, asignación por distancia euclídea y actualización de posiciones medias.
* Interiorizar la necesidad crítica del **escalado previo de variables**: cómo magnitudes dispares distorsionan por completo las distancias geométricas.
* Determinar el número óptimo de agrupaciones ($k$):
  * **Método del Codo (*Elbow Method*):** Evolución de la inercia (suma de distancias al cuadrado al centroide más cercano).
  * **Coeficiente de Silueta (*Silhouette Score*):** Medida de cohesión interna vs separación respecto al cluster vecino.
* Identificar las suposiciones y limitaciones de K-Means (asume grupos esféricos de tamaño y densidad similares).

---

## Estructura del Contenido a Desarrollar

* **El Reto de Aprender sin Respuestas:**
  * Casos de uso industrial: segmentación comercial de clientes, agrupación de documentos, compresión de color.
* **Mecánica de K-Means Paso a Paso:**
  * Elección aleatoria o informada (`k-means++`) de los centros iniciales.
  * Asignación de muestras y convergencia del algoritmo.
* **La Regla del Escalado Numérico:**
  * Demostración visual: cómo una variable en miles (ej. ingresos) anula a una variable en decenas (ej. edad).
* **¿Cuántos Clusters Existen Realmente?**
  * Gráfica de inercia y localización del punto de inflexión ("codo").
  * Interpretación del Silhouette Score (valores cercanos a $+1$, $0$ y negativos).
* **Inspección e Interpretación de Resultados:**
  * Análisis de los centroides finales (`cluster_centers_`) para construir perfiles descriptivos de cada grupo.

</div>
