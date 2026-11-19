---
draft: true
title: "Modelos de Regresión y Regularización"
sidebar_position: 2
description: "Estudio comparativo de algoritmos para predicción continua: modelos lineales ordinarios y regularizados (Ridge, Lasso) y adaptación de árboles y ensambles."
keywords: ["regresion lineal", "ridge", "lasso", "regularizacion", "decision tree regressor", "random forest regressor", "xgboost regressor"]
---

<div class="justify-text">

:::info Resumen de la sesión
En esta sesión se exploran los modelos clásicos de regresión lineal y se analiza cómo los algoritmos estudiados previamente en clasificación se adaptan a la predicción numérica continua.
:::

## Objetivos de Aprendizaje

* Comprender el funcionamiento de la **Regresión Lineal por Mínimos Cuadrados Ordinarios (OLS)**.
* Entender el concepto de **regularización** para prevenir el sobreajuste y estabilizar los coeficientes:
  * **Ridge (penalización L2):** Reduce la magnitud de los coeficientes sin eliminarlos por completo.
  * **Lasso (penalización L1):** Anula coeficientes de variables irrelevantes, actuando como selector automático de características.
* Analizar cómo los modelos no lineales de clasificación se adaptan a regresión:
  * **KNN Regressor:** Predicción mediante la media (simple o ponderada) de los $k$ vecinos más cercanos.
  * **Árboles de Decisión y Random Forest para Regresión:** Predicción por el promedio de las muestras que caen en cada hoja terminal.
  * **Gradient Boosting y XGBoost Regressor:** Corrección secuencial de errores continuos paso a paso.
* Comprender las limitaciones de los árboles en regresión: incapacidad de extrapolar valores fuera del rango visto en entrenamiento.

---

## Estructura del Contenido a Desarrollar

* **La Regresión Lineal Clásica:**
  * Intuición geométrica de la recta o hiperplano de ajuste.
  * Interpretación directa de coeficientes e intercepto (`.coef_`, `.intercept_`).
* **Regularización para el Mundo Real (Ridge vs Lasso):**
  * Por qué un modelo lineal libre sufre ante multicolinealidad o variables redundantes.
  * El hiperparámetro de penalización `alpha`.
* **De Clasificar a Estimar: Adaptación de Algoritmos:**
  * KNN para regresión y el impacto crítico del escalado de variables.
  * Árboles y bosques de regresión: ventajas de capturar no linealidades sin necesidad de escalar.
  * Modelos deBoosting aplicados a problemas continuos.
* **Tabla Comparativa de Modelos:**
  * Velocidad, interpretabilidad, capacidad de extrapolación y sensibilidad a valores atípicos.

</div>
