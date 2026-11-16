---
draft: true
title: "Práctica Guiada: Segmentación de Clientes con Clustering"
sidebar_position: 3
description: "Caso práctico de aplicación de K-Means y DBSCAN sobre datos tabulares: preparación, escalado, búsqueda del número de grupos y perfilado de segmentos."
keywords: ["practica clustering", "segmentacion clientes", "k-means", "dbscan", "perfilado", "interpretacion"]
---

<div class="justify-text">

:::info Resumen de la actividad
En este caso práctico integrador, los alumnos aplican algoritmos de agrupamiento sobre un conjunto de datos comerciales para identificar segmentos naturales de usuarios y perfilar sus patrones de comportamiento.
:::

## Objetivos del Caso Práctico

* Cargar y preparar un conjunto de datos sin variable objetivo para tareas de agrupamiento.
* Aplicar obligatoriamente escalado numérico estandarizado mediante `StandardScaler`.
* Aplicar **K-Means** calculando la inercia y el Silhouette Score para justificar el número óptimo de segmentos.
* Aplicar **DBSCAN** sobre los mismos datos explorando diferentes combinaciones de `eps` y aislando muestras anómalas (`-1`).
* Generar visualizaciones bidimensionales claras de los clusters resultantes.
* Construir una tabla descriptiva que resuma las características medias de cada grupo (edad, nivel de ingresos, frecuencia de compra, etc.) asignando un nombre de negocio o arquetipo a cada segmento.

---

## Fases del Notebook

### 1. Exploración y Escalado
* Carga de datos de comportamiento de clientes.
* Inspección de rangos numéricos y aplicación de `StandardScaler`.

### 2. Segmentación con K-Means
* Bucle de entrenamiento para $k \in [2, 8]$.
* Gráfica del Método del Codo y curva de Silhouette.
* Selección razonada de $k$ y reentrenamiento del modelo final.
* Visualización gráfica de los grupos y sus centroides.

### 3. Detección de Anomalías con DBSCAN
* Experimentación con valores de `eps` y `min_samples`.
* Identificación de clientes anómalos o atípicos (etiqueta `-1`).
* Comparación de resultados frente a K-Means.

### 4. Interpretación y Conclusiones de Negocio
* Tabla resumen con la media de cada variable por cluster.
* Redacción de conclusiones explicando la utilidad práctica de los segmentos identificados para una campaña de marketing personalizada.

</div>
