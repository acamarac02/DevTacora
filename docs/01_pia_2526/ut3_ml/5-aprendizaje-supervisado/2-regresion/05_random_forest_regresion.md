---
title: "Random Forest Regresión"
sidebar_position: 5
toc_max_heading_level: 5
description: "Introducción a Random Forest Regression en Machine Learning. Funcionamiento del algoritmo (bootstrap y submuestreo de variables), diferencias con árboles de clasificación, hiperparámetros principales, importancia de variables y métricas de evaluación."
keywords: [Random Forest, Bosques Aleatorios, Regresión, Random Forest Regression, Machine Learning, scikit-learn, bootstrap, bagging]
---

Los **Random Forest para Regresión (Random Forest Regression)** son algoritmos de Machine Learning utilizados para **predecir valores numéricos** combinando las predicciones de **muchos árboles de decisión**.

Un Random Forest es, literalmente, un *“bosque”* de árboles:

- Cada árbol aprende reglas *if–else* como un Decision Tree
- Pero se entrena con **variación** (datos y variables diferentes)
- La predicción final se obtiene **promediando** las predicciones de todos los árboles

En la práctica, Random Forest suele ser más **robusto** y generaliza mejor que un único árbol, porque reduce el **overfitting** típico de los Decision Trees.

![Gráfico EDA](../../0-img/resumen-rfr.png)

---

## Idea principal del algoritmo

La idea es sencilla:

> “En vez de confiar en un solo árbol (que puede sobreajustar), entrenamos muchos árboles diferentes y combinamos sus predicciones.”

Para conseguir árboles **diferentes**, Random Forest introduce dos fuentes de aleatoriedad:

1. **Bootstrap de filas (bagging)**: cada árbol se entrena con una muestra aleatoria de los datos
2. **Submuestreo de variables**: en cada split, el árbol solo puede probar un subconjunto aleatorio de features

Esta combinación hace que los árboles no sean copias unos de otros, y por tanto el promedio final sea más estable.

:::info Random Forest es un ensemble
Random Forest es un modelo **ensemble**, es decir, un modelo formado por la combinación de muchos modelos simples (en este caso, árboles).

- Un árbol individual puede ser inestable y sobreajustar
- Un conjunto de árboles tiende a ser más robusto
- La combinación (media) reduce errores por “casualidades” del entrenamiento
:::

---

## Funcionamiento interno del modelo

Un Random Forest se entrena generando muchos árboles de decisión, pero **no todos ven exactamente los mismos datos ni las mismas variables**.

### Paso 1: Bootstrap (muestreo con reemplazo)

Para entrenar cada árbol:

- Se crea una muestra aleatoria del dataset **con reemplazo**
- Esto significa que:
  - algunas filas aparecen repetidas
  - algunas filas no aparecen en ese árbol

Ejemplo: si el dataset tiene 1.000 filas, cada árbol suele entrenarse con 1.000 filas muestreadas con reemplazo (por defecto), pero no serán las mismas que en otro árbol.

Esto se conoce como **bagging** (*bootstrap aggregating*).

---

### Paso 2: Entrenar un árbol con submuestreo de variables

Mientras el árbol se construye:

- En cada nodo, el algoritmo **no prueba todas las variables**
- En su lugar, selecciona un subconjunto aleatorio de features (por ejemplo, `sqrt(n_features)`)

Luego:

- Evalúa posibles splits usando solo esas variables disponibles
- Elige el split que mejor reduce el error

:::info ¿Cómo se elige la “mejor división” en regresión?
En Random Forest para **regresión**, cada árbol usa el mismo criterio que un árbol de decisión de regresión:

- La división se elige buscando **minimizar el error**
- Habitualmente se usa **MSE (Mean Squared Error)** como medida del error

El objetivo de cada split es que, dentro de cada grupo, los valores del target sean lo más parecidos posible.
:::

---

### Paso 3: Repetir para crear muchos árboles

El proceso se repite tantas veces como indique el hiperparámetro `n_estimators`:

- 100 árboles
- 200 árboles
- 500 árboles…

Cada árbol será distinto porque:

- ha visto un bootstrap distinto
- y ha tomado decisiones basadas en subconjuntos aleatorios de variables

---

## Entrenamiento vs predicción

### Entrenamiento

Durante el entrenamiento, el Random Forest:

1. Genera muchos conjuntos bootstrap
2. Entrena un árbol por cada bootstrap
3. Introduce aleatoriedad en las features de cada split
4. Guarda todos los árboles

Este proceso puede ser **costoso computacionalmente**, porque no entrenamos un modelo, sino muchos.

---

### Predicción

Para predecir un nuevo dato:

1. El dato se pasa por **cada árbol**
2. Cada árbol devuelve un valor numérico (su predicción)
3. El Random Forest devuelve la **media** de todas las predicciones

> En regresión, Random Forest predice promediando.

Esto suele dar resultados más estables que un árbol individual, especialmente si los datos tienen ruido.

---

## Random Forest en regresión vs clasificación

El funcionamiento general es el mismo en ambos casos:

- muchos árboles
- bootstrap
- submuestreo de variables
- agregación final

La diferencia está en **cómo se combinan las predicciones**:

- **Clasificación** → votación mayoritaria
- **Regresión** → media (promedio)

---

## Uso de Random Forest en Regresión

### Cuándo SÍ usarlos

Random Forest suele funcionar muy bien cuando:

- Hay relaciones no lineales
- El dataset tiene ruido moderado
- Se busca buen rendimiento con poco ajuste
- Se quiere un modelo robusto sin demasiada feature engineering

En muchos problemas tabulares, Random Forest es un modelo “todoterreno”.

---

### Cuándo NO funcionan bien

Puede no ser la mejor opción cuando:

- Hay muchísimas variables (muy alta dimensionalidad)
- Se necesita interpretabilidad total (un bosque es menos interpretable que un árbol)
- El dataset es enorme y el entrenamiento se vuelve lento
- Se requiere extrapolar fuera del rango observado (no es su punto fuerte)

---

## Importancia del preprocesamiento

| Aspecto               | ¿Es necesario? | Explicación |
| --------------------- | -------------- | ---------- |
| Tratamiento de nulos  | ✔ Sí           | No admite valores nulos |
| Escalado              | ❌ No           | No usa distancias |
| Variables categóricas | ⚠️ Depende      | Hay que codificarlas (one-hot, ordinal, etc.) |
| Outliers              | ⚠️ Importante  | Un bosque es más robusto que un árbol, pero outliers extremos aún pueden afectar |

---

## Principales hiperparámetros

Random Forest suele rendir muy bien “por defecto”, pero estos hiperparámetros son clave para controlar rendimiento, overfitting y coste:

* `n_estimators`
* `max_depth`
* `min_samples_split`
* `min_samples_leaf`
* `max_features`


### Número de árboles (`n_estimators`)

Controla cuántos árboles se entrenan. Por lo general, más árboles dan predicciones más estables (hasta cierto punto) pero con un mayor coste de entrenamiento

En general:
- 100 suele ser un buen punto de partida
- 200–500 puede mejorar en datasets complejos

---

### Profundidad máxima (`max_depth`)

Controla cuán complejos pueden ser los árboles. Árboles muy profundos tiene más riesgo de overfitting en cada árbol
pero el promedio del bosque suele reducirlo

Aun así, limitar `max_depth` puede:
- acelerar entrenamiento
- mejorar generalización en datasets pequeños/ruidosos

---

### Muestras mínimas (`min_samples_split`, `min_samples_leaf`)

Igual que en un árbol:

- `min_samples_split`: mínimo para dividir un nodo
- `min_samples_leaf`: mínimo para que una hoja sea válida

Subir estos valores suele:
- suavizar las predicciones
- reducir overfitting
- hacer el modelo más estable

---

### Número de variables por split (`max_features`)

Este es uno de los hiperparámetros más característicos del Random Forest.

Indica cuántas variables se consideran **en cada split**.

- Menos variables → árboles más diferentes → mejor “diversidad”
- Demasiadas variables → árboles más parecidos → menos beneficio del ensemble

Valores típicos:
- `sqrt` (muy común)
- `log2`
- un porcentaje (ej. `0.7`)

---

### Ajuste de hiperparámetros

Como en otros algoritmos:

- Se puede usar validación cruzada
- Es habitual usar `GridSearchCV`

Tabla orientativa de rangos para empezar:

| Tamaño del dataset | Nº de registros | `n_estimators` | `max_depth` | `min_samples_leaf` | Comentario |
| ------------------ | --------------- | -------------- | ----------- | ------------------ | ---------- |
| Pequeño            | < 1.000         | 100 – 300      | 3 – 10      | 2 – 20             | Limitar complejidad para evitar overfitting |
| Mediano            | 1.000 – 10.000  | 200 – 500      | 5 – 20      | 1 – 10             | Buen equilibrio rendimiento/tiempo |
| Grande             | > 10.000        | 300 – 800      | 10 – None   | 1 – 5              | Más árboles y profundidad pueden ayudar |

> Estos rangos sirven como punto de partida. Los mejores hiperparámetros dependen del dataset y deben ajustarse con validación cruzada.

---

## Importancia de variables

Random Forest permite calcular **importancia de variables**, normalmente basada en:

- cuánto reduce el error cuando se usa una feature en los splits
- promediado a lo largo de todos los árboles

Esto es útil para:

- interpretación parcial del modelo
- selección de variables
- entender qué features aportan más información

:::info Importancia ≠ causalidad
Que una variable sea importante no significa que sea la causa del fenómeno.
Indica que el modelo la usa mucho para reducir el error, pero puede haber correlaciones o variables redundantes.
:::

---

## Métricas de evaluación

En Random Forest Regression se usan las mismas métricas que en otros modelos de regresión:

- **MAE** (Mean Absolute Error)
- **MSE** (Mean Squared Error)
- **R²** (Coeficiente de determinación)

---

## Flujo recomendado en un problema de Random Forest (Regresión)

| Paso                | Qué se hace                        | Por qué es importante |
| ------------------- | ---------------------------------- | --------------------- |
| 1. EDA              | Distribuciones, outliers, nulos     | Asegura calidad de datos |
| 2. Preprocesamiento | Limpieza + encoding categóricas     | No admite nulos, necesita numéricos |
| 3. Entrenamiento    | Ajustar hiperparámetros             | Controla rendimiento y coste |
| 4. Evaluación       | MAE, MSE, R² + gráficos             | Medir generalización |
| 5. Interpretación   | Importancia de variables            | Entender el modelo |
| 6. Comparación      | Comparar con otros modelos          | Elegir el mejor para el dataset |

---

## Ejemplo: Random Forest para Regresión

Para ver cómo funciona un **Random Forest Regressor** en la práctica, puedes ejecutar este ejemplo utilizando el dataset **California Housing**.

👉 **Puedes abrir el cuaderno aquí:**
[Colab: Random Forest Regression](../../0-datasets/ejemplo_random_forest_regresion.ipynb)

---

## Actividad de seguimiento: Bike Sharing Dataset

Utiliza el **Bike Sharing Dataset** y compara:

- Regresión Lineal
- KNN Regresión
- Árbol de Decisión (Regresión)
- Random Forest (Regresión)

Incluye:

- Ajuste de hiperparámetros (`n_estimators`, `max_depth`, `max_features`, etc.)
- Métricas de evaluación
- Importancia de variables
- Conclusiones razonadas

**Entrega:** Notebook (Colab) con conclusiones claras y justificadas.
