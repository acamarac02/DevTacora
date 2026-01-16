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

En una **regresión lineal clásica**, el objetivo del modelo es muy simple:

> Encontrar los coeficientes que **minimizan el error de predicción** sobre los datos de entrenamiento.

Es decir, el modelo solo se preocupa de **ajustarse lo mejor posible a los datos que ve**.

### ¿Cuál es el problema de esto?

Cuando el dataset es complejo, tiene **muchas variables** o contiene **ruido**, el modelo puede:

* asignar **coeficientes muy grandes** a algunas variables
* “forzar” el ajuste para explicar casos particulares
* aprender patrones que no se repiten en nuevos datos

Esto provoca **overfitting**: el modelo funciona bien en entrenamiento, pero peor en test.

---

### Ejemplo intuitivo

Imaginemos un problema de predicción del precio de viviendas con estas variables:

* superficie
* número de habitaciones
* distancia al centro
* antigüedad
* muchas variables adicionales poco relevantes

En una regresión lineal **sin regularizar**:

* el modelo puede asignar un coeficiente enorme a una variable poco importante
* simplemente porque ayuda a reducir un poco el error en entrenamiento
* aunque ese efecto no sea estable en datos nuevos

El resultado es un modelo **demasiado sensible** a pequeñas variaciones del dataset.

---

### Multicolinealidad: un caso típico

Supongamos dos variables muy correlacionadas:

* superficie en m²
* superficie en pies cuadrados

Ambas contienen casi la misma información.

Una regresión lineal clásica puede:

* dar un coeficiente muy grande a una
* y otro muy grande (positivo o negativo) a la otra
* compensándose entre sí

Aunque la predicción sea correcta, el modelo se vuelve **inestable**:
pequeños cambios en los datos pueden provocar grandes cambios en los coeficientes.

---

## ¿Qué hace la regularización?

La **regularización** introduce una idea clave:

> *“Entre dos modelos que predicen parecido, preferimos el más simple.”*

Para ello, el modelo no solo penaliza el error de predicción, sino también la **complejidad del modelo**, medida a través del tamaño de los coeficientes.

---

### Qué significa “castigar coeficientes grandes”

* Coeficientes grandes → modelo muy sensible
* Coeficientes pequeños → modelo más estable y suave

La regularización añade un **término de penalización** que hace que:

* los coeficientes no crezcan sin control
* el modelo prefiera repartir la información
* se reduzca el impacto del ruido

El objetivo pasa a ser:

> Ajustar bien los datos **sin depender excesivamente de ninguna variable**.

---

### Intuición visual (sin matemáticas)

Puedes pensar en la regularización como:

* una “fuerza” que empuja los coeficientes hacia 0
* pero sin obligarlos a ser exactamente 0 (Ridge)
* o permitiendo que algunos se anulen completamente (Lasso)

Esto produce modelos:

* más simples
* más estables
* que generalizan mejor

---

### Resumen clave para el alumnado

* La regresión lineal busca solo minimizar el error
* Eso puede provocar modelos demasiado complejos
* La regularización añade una penalización a los coeficientes grandes
* El objetivo es **mejor generalización**, no solo buen entrenamiento

Esta idea es la base tanto de **Ridge** como de **Lasso**; la diferencia entre ellos está en **cómo** penalizan los coeficientes, que veremos a continuación.


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
- $ alpha $ controla la fuerza de la regularización

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

Esto convierte a Lasso en un modelo útil tanto para:

- predicción
- interpretación
- reducción de dimensionalidad

---

## Diferencia clave entre Ridge y Lasso

| Aspecto | Ridge | Lasso |
|-------|-------|-------|
| Tipo de penalización | L2 (cuadrado) | L1 (valor absoluto) |
| Reduce coeficientes | ✔ Sí | ✔ Sí |
| Elimina variables | ❌ No | ✔ Sí |
| Selección de features | ❌ No | ✔ Sí |
| Estabilidad | Muy alta | Menor si variables están correlacionadas |

---

## El hiperparámetro `alpha`

El parámetro **`alpha`** controla la intensidad de la regularización.

- `alpha = 0` → regresión lineal clásica
- `alpha` pequeño → regularización suave
- `alpha` grande → modelo muy simple

### Efecto de alpha

- Si es **demasiado pequeño** → no soluciona overfitting
- Si es **demasiado grande** → underfitting

Por eso **alpha debe ajustarse**, normalmente con validación cruzada.

---

## Entrenamiento vs predicción

### Entrenamiento

Durante el entrenamiento:

1. El modelo busca coeficientes que minimicen:
   - el error de predicción
   - + el término de regularización
2. Los coeficientes quedan penalizados según `alpha`
3. El modelo aprende un equilibrio entre ajuste y simplicidad

---

### Predicción

En predicción:

- Se usa la misma ecuación lineal
- No hay penalización explícita
- La regularización solo afecta a los coeficientes aprendidos

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

## Hiperparámetros principales

### `alpha`

- Controla la fuerza de la regularización
- Es el hiperparámetro clave en ambos modelos
- Se ajusta normalmente con `GridSearchCV` o validación cruzada

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
| 6. Comparación | Ridge vs Lasso vs Linear | Elegir el mejor |

---

## Ridge y Lasso frente a otros modelos

- Son **más simples** que Random Forest o Boosting
- Funcionan muy bien como **baseline fuerte**
- Son rápidos de entrenar
- Muy útiles para entender el efecto de la regularización

---

## Actividad de seguimiento

Utiliza el mismo dataset empleado en regresión lineal y compara:

- Regresión Lineal
- Ridge Regression
- Lasso Regression

Incluye:

- Escalado de variables
- Ajuste de `alpha`
- Comparación de métricas
- Análisis de coeficientes
- Conclusiones razonadas
