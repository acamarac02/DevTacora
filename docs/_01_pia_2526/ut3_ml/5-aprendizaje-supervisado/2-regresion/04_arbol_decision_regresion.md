---
title: "Decision Trees Regresión"
sidebar_position: 3
toc_max_heading_level: 5
description: "Introducción a Decision Tree Regression en Machine Learning. Funcionamiento del algoritmo, diferencias con árboles de clasificación, hiperparámetros principales, visualización del árbol, importancia de variables y métricas de evaluación."
keywords: [Decision Tree, Árboles de decisión, Regresión, Decision Tree Regression, Machine Learning, scikit-learn]
---

Los **Árboles de Decisión para Regresión (Decision Tree Regression)** son algoritmos de Machine Learning utilizados para **predecir valores numéricos** mediante una serie de **reglas if–else** aprendidas a partir de los datos.

A diferencia de la Regresión Lineal, los árboles:

* No asumen una relación lineal
* Son **modelos no lineales**
* Permiten una **interpretación visual clara**

Además, a diferencia de KNN, **sí construyen un modelo explícito**, que puede analizarse y visualizarse.

---

## Idea principal del algoritmo

La idea de un árbol de decisión para regresión es sencilla:

> “Dividir el espacio de datos en regiones donde los valores del target sean lo más parecidos posible.”

El modelo aprende una serie de preguntas del tipo:

```text
¿feature ≤ valor?
```

Cada decisión divide los datos en dos grupos cada vez más homogéneos hasta llegar a una **hoja**, que devuelve un valor numérico.

:::info Los árboles de decisión son modelos no paramétricos
Los árboles de decisión para regresión son **modelos no paramétricos**:

* No tienen una forma fija predefinida
* La estructura del modelo depende directamente de los datos
* Si cambian los datos, cambia el árbol

Esto los hace muy flexibles, pero también propensos al sobreajuste si no se controlan.
:::

---

## Funcionamiento del modelo

El árbol se construye de forma **recursiva**, siguiendo estos pasos:

1. Seleccionar la mejor variable y el mejor punto de corte
2. Dividir los datos en dos subconjuntos
3. Repetir el proceso en cada rama
4. Detener el crecimiento según ciertos criterios
5. Asignar un valor numérico a cada hoja

En **regresión**, el valor que devuelve cada hoja suele ser la **media** de los valores del target que contiene.

![Gráfico EDA](../../0-img/dt_regressor.png)

:::info ¿Cómo se elige la“mejor división” en regresión?

Aquí está la diferencia clave con la clasificación.

* En **clasificación**, el árbol minimiza la **impureza** (Gini, Entropía)
* En **regresión**, el árbol minimiza el **error** (normalmente **MSE (Mean Squared Error)**)

👉 En los problemas de **regresión**, el árbol de decisión construye sus divisiones buscando **minimizar el error de predicción**. Para ello, en cada posible split evalúa cuánto se reduce el error si los datos se separan en dos grupos. Habitualmente se utiliza el **MSE (Mean Squared Error)** como medida de ese error, ya que penaliza más los valores que se alejan mucho del valor medio. El árbol elige siempre la división que consigue que, dentro de cada grupo, los valores numéricos del target sean lo más parecidos posible, logrando así predicciones más precisas en las hojas.
:::

---

## Entrenamiento vs predicción

### Entrenamiento

Durante el entrenamiento, el árbol:

* Prueba diferentes divisiones
* Evalúa cuánto reduce el error cada split
* Construye la estructura completa del árbol

Este proceso puede ser **costoso computacionalmente** si el árbol crece mucho.

---

### Predicción

Para predecir un nuevo dato:

1. Se empieza en la raíz del árbol
2. Se siguen las reglas if–else
3. Se llega a una hoja
4. Se devuelve el valor numérico asociado a esa hoja

👉 La predicción es **muy rápida**, ya que solo implica recorrer el árbol.

---

## Uso de Árboles de Decisión en Regresión

### Cuándo SÍ usarlos

Funcionan bien cuando:

* La relación entre variables es no lineal
* Se busca **interpretabilidad**
* Hay variables categóricas
* El preprocesamiento debe ser simple

---

### Cuándo NO funcionan bien

Suelen rendir peor cuando:

* Hay mucho ruido
* El dataset es pequeño
* El árbol crece sin restricciones (overfitting)

En la práctica:

> Un árbol de decisión suele ser un buen modelo base, pero rara vez el modelo final más robusto.

---

## Importancia del preprocesamiento

| Aspecto               | ¿Es necesario? | Explicación                    |
| --------------------- | -------------- | ------------------------------ |
| Tratamiento de nulos  | ✔ Sí           | No admite valores nulos        |
| Escalado              | ❌ No           | No usa distancias              |
| Outliers              | ⚠️ Importante  | Pueden generar splits extremos |

---

## Principales hiperparámetros

El rendimiento de un árbol de decisión para regresión depende en gran medida de **cómo se controla su complejidad**.
Si el árbol crece sin restricciones, puede aprender patrones muy específicos del conjunto de entrenamiento, perdiendo capacidad de generalización.

Por este motivo, los hiperparámetros del árbol se centran principalmente en **limitar su crecimiento**, buscando un equilibrio entre:

* **Modelo demasiado simple** → no captura bien la relación entre variables (underfitting)
* **Modelo demasiado complejo** → se ajusta en exceso a los datos (overfitting)

---

### Profundidad máxima (`max_depth`)

El hiperparámetro `max_depth` controla **cuántos niveles puede tener el árbol**, es decir, cuántas decisiones consecutivas puede tomar antes de llegar a una hoja.

* Un **árbol muy profundo**:

  * Aprende reglas muy específicas
  * Puede ajustarse casi perfectamente a los datos de entrenamiento
  * Tiene alto riesgo de **overfitting**

* Un **árbol poco profundo**:

  * Aprende reglas muy generales
  * Puede no capturar relaciones importantes entre variables
  * Produce **underfitting**

Controlar la profundidad es la forma **más directa y efectiva** de regular un árbol de decisión.
En la práctica, limitar `max_depth` ayuda a crear modelos más estables y con mejor capacidad de generalización.

---

### Muestras mínimas (`min_samples_split`, `min_samples_leaf`)

Estos hiperparámetros controlan **cuántos datos mínimos son necesarios para crear nuevas divisiones** en el árbol.

* `min_samples_split`:

  * Número mínimo de muestras que debe tener un nodo para poder dividirse
  * Evita que el árbol siga creciendo cuando quedan muy pocos datos

* `min_samples_leaf`:

  * Número mínimo de muestras que debe contener una hoja
  * Garantiza que cada predicción esté basada en suficientes datos

Establecer valores adecuados para estos parámetros:

* Reduce la creación de hojas con muy pocos datos
* Hace que las predicciones sean más robustas
* Mejora la **generalización** del modelo en datos no vistos

En muchos casos, aumentar ligeramente estos valores reduce el overfitting sin perder demasiado rendimiento.

---

### Ajuste de hiperparámetros

Al igual que en otros algoritmos:

* Se pueden ajustar con **validación cruzada**
* Es habitual usar **GridSearchCV**

Esto permite encontrar un equilibrio entre sesgo y varianza.

A cotinuación se muestra una **tabla orientativa** de valores a probar. No son valores óptimos, sino **rangos razonables** para empezar el GridSearch según el tamaño del dataset.

| Tamaño del dataset | Nº de registros | `max_depth` | `min_samples_split` | `min_samples_leaf` | Comentario                                                  |
| ------------------ | --------------- | ----------- | ------------------- | ------------------ | ----------------------------------------------------------- |
| Pequeño            | < 1.000         | 2 – 5       | 10 – 50             | 5 – 20             | Alto riesgo de overfitting, conviene limitar mucho el árbol |
| Mediano            | 1.000 – 10.000  | 3 – 10      | 5 – 20              | 2 – 10             | Buen equilibrio entre complejidad y generalización          |
| Grande             | > 10.000        | 5 – 20      | 2 – 10              | 1 – 5              | Más datos permiten árboles más profundos                    |


> Estos rangos sirven como punto de partida. El mejor conjunto de hiperparámetros siempre debe seleccionarse mediante validación cruzada, ya que depende de las características concretas del dataset y no solo de su tamaño.

---

## Visualización del árbol

Una de las grandes ventajas de los árboles de decisión es que **pueden visualizarse**.

Al representar el árbol, se puede observar:

* Las variables utilizadas en cada split
* Los valores de corte
* La profundidad del árbol
* El valor predicho en cada hoja

---

## Importancia de variables

Los árboles permiten calcular la **importancia de cada variable**.

Una variable será más importante si:

* Aparece frecuentemente en los splits
* Reduce mucho el error del modelo

Esto permite:

* Interpretar el modelo
* Identificar variables relevantes
* Apoyar procesos de selección de variables

A diferencia de KNN, aquí **sí es posible analizar qué variables influyen más** en la predicción.

---

## Métricas de evaluación

En problemas de regresión con árboles de decisión se utilizan las mismas métricas que en otros modelos:

* **MAE** (Mean Absolute Error)
* **MSE** (Mean Squared Error)
* **R²** (Coeficiente de determinación)

---

## Flujo recomendado en un problema de Árbol de Decisión (Regresión)

| Paso                | Qué se hace                        | Por qué es importante     |
| ------------------- | ---------------------------------- | ------------------------- |
| 1. EDA              | Analizar distribuciones y outliers | Evita splits extremos     |
| 2. Preprocesamiento | Limpieza de datos                  | El modelo no admite nulos |
| 3. Entrenamiento    | Ajustar hiperparámetros            | Controla overfitting      |
| 4. Evaluación       | MAE, MSE, R² + gráficos            | Medir rendimiento         |
| 5. Interpretación   | Árbol + importancia variables      | Entender el modelo        |
| 6. Comparación      | Comparar con otros modelos  | Determina qué modelo se adapta mejor a nuestro dataset |

---

## Ejemplo: Árbol de Decisión para Regresión

Para ver cómo funciona un **Decision Tree Regressor** en la práctica, puedes ejecutar este ejemplo utilizando el dataset **California Housing**.

👉 **Puedes abrir el cuaderno aquí:**
[Colab: Decision Tree Regression](../../0-datasets/ejemplo_decision_tree_regresion.ipynb)

---

## Actividad de seguimiento: Bike Sharing Dataset

Utiliza el **Bike Sharing Dataset** y compara:

* Regresión Lineal
* KNN Regresión
* Árbol de Decisión (Regresión)

Incluye:

* Ajuste de hiperparámetros
* Métricas de evaluación
* Visualización del árbol
* Análisis de importancia de variables
* Conclusiones razonadas

**Entrega:** Notebook (Colab) con conclusiones claras y justificadas.
