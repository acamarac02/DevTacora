---
title: "Ideas generales"
sidebar_position: 0
toc_max_heading_level: 5
description: "Introducción a los problemas de regresión en Machine Learning. Qué es la regresión, en qué se diferencia de la clasificación, principales métricas de evaluación y visión general de los modelos de regresión."
keywords: [Regresión, Machine Learning, modelos de regresión, métricas, MSE, MAE, R2, supervisado]
---

Un **problema de regresión** es un tipo de problema de **aprendizaje supervisado** en el que el objetivo es **predecir un valor numérico continuo**.

En estos problemas:
- El dataset contiene **features** (variables de entrada).
- Existe una variable objetivo (**target**) **numérica**.
- El modelo aprende una relación entre las features y el target.

## Ejemplos de problemas de regresión
- Predecir el **precio de una vivienda**
- Estimar la **temperatura** de mañana
- Calcular el **consumo eléctrico**
- Predecir la **nota final** de un estudiante

---

## Diferencias entre regresión y clasificación

Aunque ambos son problemas de aprendizaje supervisado, existen diferencias clave:

| Característica | Regresión | Clasificación |
|----------------|----------|---------------|
| Tipo de salida | Numérica continua | Categoría o clase |
| Ejemplo de target | 1250.75 | "spam", "no spam" |
| Métricas comunes | MSE, MAE, R² | Accuracy, Precision, Recall |
| Visualización | Rectas, curvas | Regiones de decisión |

👉 La **principal diferencia** está en el **tipo de variable objetivo**.

---

## Modelos de regresión

En regresión, el objetivo es predecir un **valor numérico continuo**.
Algunos modelos lo hacen ajustando una **función global** (como una recta o un plano),
mientras que otros realizan predicciones locales basadas en los datos más cercanos,
como ocurre en k-NN.

![Simple vs Multiple](../../0-img/simple_vs_multiple.png)

| Modelo | Tipo | Lineal | Paramétrico | Interpretabilidad |
|------|------|--------|-------------|------------------|
| Regresión Lineal | Base | Sí | Sí | Alta |
| Regresión Polinómica | Extensión | No | Sí | Media |
| k-NN Regresión | Basado en instancias | No | No | Baja |
| Árbol de Decisión | Basado en reglas | No | No | Media |
| Random Forest | Ensemble | No | No | Baja |
| Ridge | Lineal regularizado | Sí | Sí | Media |
| Lasso | Lineal regularizado | Sí | Sí | Media |

:::info ¿Qué significan estas características?
En la tabla se utilizan los siguientes conceptos:

- **Lineal**: indica si el modelo asume una relación lineal entre las variables de entrada y la variable objetivo.  
  Un modelo lineal puede representarse mediante una combinación lineal de las features.

- **Paramétrico**: indica si el modelo aprende un número fijo de parámetros (como coeficientes).  
  Los modelos paramétricos asumen una forma concreta del modelo y no dependen directamente del número de datos.

- **Interpretabilidad**: hace referencia a lo fácil que es entender cómo el modelo realiza sus predicciones.  
  Modelos simples y lineales suelen ser más interpretables, mientras que modelos más complejos suelen ofrecer mayor rendimiento pero menor explicación.
:::


Una vez ajustado el modelo, necesitamos medir qué tan bien se adapta a los datos.
Para ello se utilizan distintas métricas de evaluación.


---

## Métricas de evaluación en regresión

Para evaluar modelos de regresión se utilizan métricas que miden **el error entre el valor real y el valor predicho**.

### Mean Squared Error (MSE)

El **Mean Squared Error (MSE)** es una de las métricas más utilizadas en problemas de regresión. Mide el **promedio del cuadrado de la diferencia entre los valores reales y los valores predichos por el modelo**.

En otras palabras, cuantifica **cuánto se equivoca el modelo al predecir**, dando **más peso a los errores grandes**.

Si tenemos un conjunto de $ n $ observaciones:

* $ y_i $: valor real
* $ \hat{y}_i $: valor predicho por el modelo

El MSE se define como:

$$
\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

:::tip
Cuanto **menor** sea el MSE, **mejor** es el modelo,  
porque indica que, en promedio, las predicciones del modelo están más
cerca de los valores reales y que los errores grandes son menos frecuentes.
:::

Ejemplo de cálculo del MSE con un dataset de prueba:

![Cálculo MSE](../../0-img/calculo-mse.png)


Si el modelo comete errores grandes en pocas observaciones, el MSE **aumenta mucho**.

---

#### Relación con el entrenamiento del modelo

En muchos modelos de regresión, el entrenamiento del modelo consiste en
encontrar los **parámetros internos** (por ejemplo, los **coeficientes**) que
minimizan una **función de coste**, siendo el MSE una de las más utilizadas.

En este contexto, el MSE:
- Se utiliza como función de coste durante el entrenamiento
- Guía el ajuste de los parámetros del modelo

Además, el MSE también puede utilizarse como métrica de evaluación en
procesos de selección de hiperparámetros, como GridSearch, donde se emplea
para comparar distintos modelos entrenados.

:::info ¿Qué es la función de coste?
La **función de coste** es una función matemática que mide el **error del modelo**, comparando los valores reales con los valores predichos.

Durante el entrenamiento, el objetivo del algoritmo es **minimizar la función de coste**, ajustando los parámetros del modelo.  
En problemas de regresión, una de las funciones de coste más utilizadas es el **Mean Squared Error (MSE)**.
:::

---

### Mean Absolute Error (MAE)

El **Mean Absolute Error (MAE)** mide el **promedio del valor absoluto de la diferencia entre los valores reales y los valores predichos por el modelo**.

A diferencia del MSE, el MAE **no eleva el error al cuadrado**, por lo que **todos los errores contribuyen de forma proporcional** al resultado final.

Si tenemos un conjunto de $ n $ observaciones:

* $ y_i $: valor real
* $ \hat{y}_i $: valor predicho por el modelo

El MAE se define como:

$$
\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} \lvert y_i - \hat{y}_i \rvert
$$

:::tip
Cuanto **menor** sea el MAE, **mejor** es el modelo, porque indica que, de media, el error de las predicciones es menor y el modelo se equivoca menos en las mismas unidades que la variable objetivo.
:::

El MAE indica, de media, **cuántas unidades se equivoca el modelo en sus predicciones**.

Por ejemplo:

* Un MAE de **5** en un problema de predicción de precios significa que,
  de media, el modelo se equivoca **5 unidades monetarias**.

Esto hace que el MAE sea una métrica **muy fácil de interpretar**, ya que se
expresa en las **mismas unidades que la variable objetivo**.

---

### Coeficiente de determinación (R²)

El **coeficiente de determinación (R²)** es una métrica utilizada en regresión que indica **qué proporción de la variabilidad de la variable objetivo es explicada por el modelo**.

A diferencia del MSE o el MAE, el R² **no mide el error directamente**, sino **la calidad del ajuste global del modelo**.

El R² compara el modelo entrenado con un modelo muy simple que **siempre predice la media del target**.

* Si el modelo explica bien los datos, el R² será alto.
* Si el modelo no mejora esa predicción básica, el R² será bajo o incluso negativo.

Los valores posibles del R² son:

* **R² = 1**
  El modelo explica el 100 % de la variabilidad del target (ajuste perfecto).

* **R² = 0**
  El modelo no mejora respecto a predecir siempre la media del target.

* **R² < 0**
  El modelo es peor que predecir la media, lo que indica un ajuste muy deficiente.

Por ejemplo:

* Un **R² = 0.80** significa que el modelo explica el **80 % de la variabilidad**
  de la variable objetivo.
* El **20 % restante** se debe a factores no capturados por el modelo.


:::info ¿Qué es el concepto de variabilidad?

La **variabilidad** de una variable es **cuánto cambian sus valores** dentro del dataset.


Imagina dos datasets con la misma media:

* Dataset A

    ```text
    10, 10, 10, 10, 10
    ```

    * Media = 10
    * Variabilidad = **muy baja** (todos los valores son iguales)

* Dataset B

    ```text
    2, 8, 10, 15, 25
    ```

    * Media ≈ 12
    * Variabilidad = **alta** (los valores están muy dispersos)

👉 Ambos tienen media similar, pero **no se comportan igual**.

En regresión, la variabilidad del target indica:

* Cuánto **varían los valores reales**
* Qué tan difícil es el problema
* Cuánto margen tiene el modelo para “explicar” los datos

Si el target casi no cambia, **no hay mucho que explicar**.
Si cambia mucho, el modelo debe capturar **patrones más complejos**.

El R² responde a esta pregunta:

> ¿Cuánta de esa variabilidad total consigue explicar el modelo?

* **R² = 0**
  El modelo no explica nada más que la media.

* **R² = 0.7**
  El modelo explica el **70 % de la variabilidad** del target.

* **R² = 1**
  El modelo explica toda la variabilidad.


Piensa en las notas de una clase:

* Si todos sacan un 7 → poca variabilidad
* Si hay notas entre 2 y 10 → mucha variabilidad

Un buen modelo sería aquel que **explica por qué unos sacan más y otros menos**.
:::

---

### Comparación entre MSE, MAE y R²

| Métrica | Qué mide | Penalización de errores grandes | Sensible a outliers | Interpretabilidad | Uso habitual |
|--------|---------|----------------------------------|---------------------|------------------|--------------|
| **MSE** | Error medio al cuadrado | Alta | Alta | Media | Función de coste y entrenamiento |
| **MAE** | Error medio absoluto | Baja | Media | Alta | Evaluación e interpretación |
| **R²** | Variabilidad explicada | No aplica | Baja | Alta | Comparación de modelos |
