---
draft: true
title: "Fundamentos y Métricas de Regresión"
sidebar_position: 1
description: "Introducción a la predicción de variables continuas, análisis de residuos y comprensión intuitiva de las métricas de error: MAE, MSE, RMSE y R²."
keywords: ["regresion", "metricas", "mae", "mse", "rmse", "r2", "residuos", "variable continua"]
---

<div class="justify-text">

:::info Resumen de la sesión
En esta sesión se aborda la naturaleza de los problemas de regresión supervisada y cómo medir con precisión el error de predicción en variables continuas.
:::

## Objetivos de Aprendizaje

* Distinguir conceptualmente un problema de regresión (estimar un valor numérico continuo) frente a uno de clasificación (asignar una categoría).
* Comprender el concepto de **residuo** o error de predicción individual ($y - \hat{y}$).
* Analizar e interpretar las métricas fundamentales de regresión:
  * **MAE (Mean Absolute Error):** Magnitud media del error en las mismas unidades físicas del problema, robusto ante valores extremos.
  * **MSE (Mean Squared Error):** Media de los errores al cuadrado, con alta penalización a desviaciones graves.
  * **RMSE (Root Mean Squared Error):** Raíz cuadrada del MSE para recuperar las unidades originales conservando la penalización a grandes errores.
  * **$R^2$ (Coeficiente de Determinación):** Proporción de la varianza explicada por el modelo respecto a una predicción trivial por la media.
* Seleccionar la métrica adecuada según el impacto en el negocio: ¿es admisible un error grande aislado o preferimos minimizar la media general?

---

## Estructura del Contenido a Desarrollar

* **De Categorías a Cantidades:**
  * Ejemplos reales: tasación inmobiliaria, demanda energética, estimación de precios de venta.
* **Anatomía del Error de Regresión:**
  * Qué es un residuo y cómo se visualiza frente a la recta de predicción.
* **Comparativa Intuitiva de Métricas:**
  * *MAE vs RMSE:* El dilema de penalizar suavemente muchos errores pequeños frente a castigar drásticamente un fallo monumental.
  * *El Coeficiente $R^2$:* Escala de $0$ a $1$ (e interpretación de valores negativos cuando el modelo es peor que la media).
* **Diagnóstico Visual de Residuos:**
  * Gráfico de dispersión: valores reales vs predichos.
  * Detección de heterocedasticidad y patrones no capturados por el modelo.

</div>
