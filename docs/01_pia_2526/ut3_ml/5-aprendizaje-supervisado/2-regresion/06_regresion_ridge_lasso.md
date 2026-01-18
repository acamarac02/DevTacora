---
title: "Ridge y Lasso Regression"
sidebar_position: 6
toc_max_heading_level: 5
description: "Introducción a Ridge y Lasso Regression. Regularización en modelos lineales, funcionamiento interno, hiperparámetro alpha, diferencias entre L1 y L2, preprocesamiento y evaluación."
keywords: [Ridge, Lasso, Regularización, Regresión Lineal, Machine Learning, scikit-learn, L1, L2]
---

Los modelos **Ridge Regression** y **Lasso Regression** son extensiones de la **Regresión Lineal** que incorporan un mecanismo de **regularización**, es decir, un término adicional que penaliza modelos demasiado complejos.

Ambos modelos se utilizan para:

- Reducir **overfitting**
- Controlar coeficientes grandes
- Mejorar la **generalización**
- (En el caso de Lasso) realizar **selección automática de variables**

La idea central es sencilla:

> “Preferimos modelos más simples, incluso si encajan un poco peor en entrenamiento, porque generalizan mejor.”

---

## Idea principal de la regularización

En una **regresión lineal clásica**, el modelo busca los coeficientes que **minimizan el error de predicción en entrenamiento**, sin tener en cuenta la complejidad del modelo.

Cuando el dataset tiene **muchas variables**, **ruido** o **variables correlacionadas**, esto puede provocar:

* coeficientes excesivamente grandes
* modelos muy sensibles a pequeñas variaciones de los datos
* **overfitting** (buen rendimiento en entrenamiento, peor en test)

La **regularización** añade un término de penalización que limita el tamaño de los coeficientes, basándose en las siguientes premisas:

* Coeficientes grandes → modelo sensible e inestable
* Coeficientes pequeños → modelo más suave y robusto

La regularización actúa como una **fuerza que empuja los coeficientes hacia 0**:

* sin anularlos completamente (Ridge)
* o permitiendo eliminar algunos (Lasso)

---

## Funcionamiento interno del modelo

### Regresión Lineal (recordatorio)

La regresión lineal minimiza la siguiente función de coste:

$$
\text{Error} = \text{MSE}
$$

Es decir, solo se preocupa por ajustar lo mejor posible los datos de entrenamiento.

---

## Ridge Regression (Regularización L2)

Ridge añade un término de penalización basado en el **cuadrado de los coeficientes**.

### Función de coste (Ridge)

$$
\text{Error} = \text{MSE} + \alpha \sum \beta_j^2
$$

Donde:

- $ beta_j $ son los coeficientes del modelo
- $ alpha $ controla la fuerza de la regularización (hiperparámetro cuyo valor especificamos nosotros)

### Qué hace Ridge en la práctica

- Reduce el valor de los coeficientes
- Evita coeficientes extremadamente grandes
- **No elimina variables** (los coeficientes rara vez llegan a 0)

Ridge es especialmente útil cuando:

- hay **multicolinealidad**
- muchas variables aportan información parcial
- se quiere estabilidad en el modelo

---

## Lasso Regression (Regularización L1)

Lasso introduce una penalización basada en el **valor absoluto de los coeficientes**.

### Función de coste (Lasso)

$$
\text{Error} = \text{MSE} + \alpha \sum |\beta_j|
$$

### Qué hace Lasso en la práctica

- Reduce coeficientes
- **Fuerza a que algunos coeficientes sean exactamente 0**
- Realiza **selección automática de variables**

---

## Diferencia clave entre Ridge y Lasso

| Aspecto | Ridge | Lasso |
|-------|-------|-------|
| Tipo de penalización | L2 (cuadrado) | L1 (valor absoluto) |
| Reduce coeficientes | ✔ Sí | ✔ Sí |
| Elimina variables | ❌ No | ✔ Sí |
| Selección de features | ❌ No | ✔ Sí |
| Estabilidad | Muy alta | Menor si variables están correlacionadas |


:::tip ¿CÓMO FUNCIONAN RIDGE Y LASSO EN LA PRÁCTICA?

Supongamos un modelo de **regresión lineal** con tres variables:

* `x1`: superficie de la vivienda
* `x2`: número de habitaciones
* `x3`: una variable poco relevante (ruido)

**Regresión lineal (sin regularización)**

Tras entrenar el modelo, obtenemos estos coeficientes:

| Variable          | Coeficiente |
| ----------------- | ----------- |
| x1 (superficie)   | 0.85        |
| x2 (habitaciones) | 1.20        |
| x3 (ruido)        | **4.50**    |

📌 Observación:

* El coeficiente de `x3` es muy grande
* El modelo está usando una variable poco importante para ajustar mejor el entrenamiento
* Esto suele indicar **overfitting**

---

**Ridge Regression (regularización L2)**

Entrenamos ahora un modelo Ridge con un valor moderado de `alpha`.

| Variable          | Coeficiente |
| ----------------- | ----------- |
| x1 (superficie)   | 0.72        |
| x2 (habitaciones) | 0.98        |
| x3 (ruido)        | **0.60**    |

📌 Qué ha ocurrido:

* Todos los coeficientes se han reducido
* El coeficiente de la variable ruidosa ha bajado mucho
* **Ninguna variable se elimina completamente**
* El modelo es más estable y menos sensible al ruido

---

**Lasso Regression (regularización L1)**

Entrenamos ahora un modelo Lasso con un valor similar de `alpha`.

| Variable          | Coeficiente |
| ----------------- | ----------- |
| x1 (superficie)   | 0.70        |
| x2 (habitaciones) | 0.95        |
| x3 (ruido)        | **0.00**    |

📌 Qué ha ocurrido:

* Lasso ha reducido los coeficientes
* La variable `x3` ha sido **eliminada automáticamente**
* El modelo es más simple e interpretable

---

👉 Todos los modelos pueden predecir razonablemente bien, pero:

* Ridge y Lasso suelen **generalizar mejor**
* Lasso produce modelos más simples
* Ridge es más estable cuando las variables están correlacionadas

:::

---

## El hiperparámetro `alpha`

El parámetro **`alpha`** controla la intensidad de la regularización.

- `alpha = 0` → regresión lineal clásica
- `alpha` pequeño → regularización suave
- `alpha` grande → modelo muy simple

Efecto de alpha:

- Si es **demasiado pequeño** → no soluciona overfitting
- Si es **demasiado grande** → underfitting

Por eso **alpha debe ajustarse**, normalmente con validación cruzada.

---

## Entrenamiento vs predicción

### Entrenamiento

Durante el entrenamiento:

1. El modelo busca coeficientes que minimicen **una función de coste compuesta por dos partes**:

   * el error de predicción (por ejemplo, MSE)
   * un término de penalización que castiga coeficientes grandes
2. La importancia de la penalización viene controlada por el hiperparámetro `alpha`
3. El modelo aprende un equilibrio entre:

   * ajustar bien los datos
   * y mantener un modelo simple y estable


---

### Predicción

Una vez el modelo ha sido entrenado, la **regularización ya no interviene directamente** en el cálculo de las predicciones.

En la fase de predicción:

* Se utiliza la **misma ecuación lineal** que en una regresión lineal clásica:
  $$
  \hat{y} = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots
  $$
* No se añade ningún término de penalización al calcular la predicción.
* La regularización ha actuado **solo durante el entrenamiento**, influyendo en los valores de los coeficientes.

Es decir, el modelo predice igual que una regresión lineal, pero usando **coeficientes previamente regularizados**, que suelen ser más pequeños y estables.

---

## Importancia del preprocesamiento (CRÍTICO)

A diferencia de árboles o Random Forest, **Ridge y Lasso son muy sensibles a la escala**.

| Aspecto | ¿Es necesario? | Explicación |
|------|------|------|
| Tratamiento de nulos | ✔ Sí | No admiten valores nulos |
| Escalado | ✔ **Imprescindible** | La penalización depende de la escala |
| Variables categóricas | ✔ Sí | Requieren encoding |
| Outliers | ⚠️ Importante | Pueden afectar mucho a los coeficientes |

:::warning Escalado obligatorio
Si las variables no están en la misma escala, la regularización penaliza más a unas que a otras de forma incorrecta.
:::

---

## Métricas de evaluación

Se usan las métricas estándar de regresión:

- **MAE**
- **MSE**
- **R²**

No hay métricas específicas para Ridge o Lasso.

---

## Cuándo usar Ridge o Lasso

### Ridge es buena opción cuando:

- Hay muchas variables correlacionadas
- Todas las variables aportan algo de información
- Se busca estabilidad y buen rendimiento

### Lasso es buena opción cuando:

- Se sospecha que muchas variables no son relevantes
- Se quiere un modelo más interpretable
- Se necesita selección automática de features

---

## Flujo recomendado en un problema de Ridge / Lasso

| Paso | Qué se hace | Por qué |
|----|----|----|
| 1. EDA | Distribuciones, outliers | Detectar problemas |
| 2. Preprocesamiento | Escalado + encoding | Imprescindible |
| 3. Entrenamiento | Ajustar `alpha` | Controlar complejidad |
| 4. Evaluación | MAE, MSE, R² | Medir generalización |
| 5. Interpretación | Coeficientes | Entender el modelo |
| 6. Comparación | Comparar métricas y resultados de los diferentes modelos | Elegir el mejor |

---

## Ejemplo: Ridge y Lasso

Para ver cómo funcionan **Ridge y Lasso** en la práctica, puedes ejecutar este ejemplo utilizando el dataset **California Housing**.

👉 **Puedes abrir el cuaderno aquí:**
[Colab: Ridge y Lasso](../../0-datasets/ejemplo_ridge_lasso.ipynb)

---

## Actividad de seguimiento: Bike Sharing Dataset

Utiliza el **Bike Sharing Dataset** y compara:

- Regresión Lineal
- Ridge Regression
- Lasso Regression

Incluye:

- Ajuste de `alpha`
- Comparación de métricas
- Análisis de coeficientes
- Conclusiones razonadas

**Entrega:** Notebook (Colab) con conclusiones claras y justificadas.