---
title: "Redes Densas para Regresión"
sidebar_position: 1
description: "Cómo utilizar redes neuronales densas (MLP) para predecir valores continuos. Arquitectura, funciones de activación y métricas clave."
keywords: [regresión, redes densas, MLP, California Housing, MSE, MAE, ReLU, TensorBoard]
---

En los apartados anteriores hemos visto cómo funciona una neurona individual y cómo se entrena mediante el descenso de gradiente. Pero una sola neurona (perceptrón) tiene una limitación fundamental: solo puede aprender relaciones lineales.

Para resolver problemas complejos, necesitamos conectar muchas neuronas en capas, formando lo que se conoce como **Red Neuronal Densa** o **Perceptrón Multicapa (MLP)**.

En este apartado vamos a ver cómo configurar estas redes para resolver problemas de **regresión**, es decir, cuando queremos predecir un valor numérico continuo (como el precio de una casa, la temperatura de mañana o la demanda de electricidad).

---

## ¿Qué es una Red Neuronal Densa?

Una red densa (*Fully Connected Layer* o *Dense Layer*) es aquella en la que **cada neurona de una capa está conectada con todas las neuronas de la capa siguiente**.

Es la arquitectura más básica y fundamental del Deep Learning. Su potencia reside en que, al apilar varias capas con funciones de activación no lineales (como ReLU), la red puede aprender a aproximar cualquier función matemática compleja, no solo líneas rectas.

![Gráfico EDA](../0-img/nn-architecture.png)

---

##  Arquitectura para Regresión

Cuando diseñamos una red para un problema de regresión, la arquitectura suele seguir un patrón estándar:

### A. Capa de Entrada (Input)
El número de neuronas de entrada debe coincidir con el número de **características (features)** de nuestros datos.
* Si nuestro dataset tiene 8 columnas de datos (como en California Housing), la capa de entrada tendrá 8 neuronas.


### B. Capas Ocultas (Hidden Layers)
Aquí es donde ocurre la "magia".
* **Número de capas y neuronas**: Depende de la complejidad del problema. Para problemas sencillos, 1 o 2 capas con 32-64 neuronas suelen funcionar bien.
* **Función de Activación**: El estándar hoy en día es **ReLU**.

:::tip ¿Cuál es la mejor arquitectura?
No existe una fórmula mágica. La clave en Deep Learning es la **experimentación**. Probaremos diferentes combinaciones (más capas, menos neuronas, etc.) y nos quedaremos con aquella que:
1.  **Mejor generalice**: La que consiga el menor error en el conjunto de **Validación** (no en el de entrenamiento).
2.  **Sea más simple**: Siguiendo el principio de la *Navaja de Ockham*, si dos arquitecturas dan resultados similares, siempre elegiremos la más sencilla para evitar el sobreajuste y ahorrar cómputo.
:::

### C. Capa de Salida (Output)
Esta es la parte crítica que diferencia a la regresión de la clasificación.
* **Número de neuronas**: **1** (porque queremos predecir un único valor numérico).
* **Función de Activación**: **Ninguna (Lineal)**.
    * No usamos Sigmoid o Tanh porque estas comprimen la salida a rangos limitados ([0,1] o [-1,1]).
    * Queremos que la red pueda predecir cualquier valor real (por ejemplo, un precio de 500.000\$ o una temperatura de -15ºC), por lo que dejamos que la neurona devuelva el valor tal cual lo calcula la suma ponderada: $y = \sum (w_i x_i) + b$.

### Implementación básica en Keras

Traducir esta arquitectura a código con TensorFlow y Keras es muy directo. Aquí tienes un ejemplo de cómo se configuraría la arquitectura:

```python
import tensorflow as tf
from tensorflow.keras import layers

# 1. Definir la arquitectura
model = tf.keras.Sequential([
    # Capa oculta 1: 64 neuronas, activación ReLU
    layers.Dense(64, activation='relu', input_shape=[n_features]), 
    # Capa oculta 2: 32 neuronas, activación ReLU
    layers.Dense(32, activation='relu'),
    # Capa de salida: 1 neurona, sin activación (lineal)
    layers.Dense(1)
])
```

---

## Configuración del Entrenamiento

Para entrenar una red de regresión, necesitamos configurar el compilador del modelo con los siguientes elementos:

### Función de Pérdida (Loss Function)
Es la métrica que el optimizador intentará minimizar. Las más comunes en regresión son:

* **MSE (Mean Squared Error)**: Calcula el promedio de los errores al cuadrado. Penaliza mucho los errores grandes (outliers). Es la más habitual en regresión.
* **MAE (Mean Absolute Error)**: Calcula el promedio del valor absoluto de los errores. Es menos sensible a outliers que el MSE.

### Optimizador
Como vimos en la teoría, el algoritmo que ajusta los pesos. El estándar de facto para empezar es **Adam**, ya que gestiona automáticamente el *learning rate* de forma adaptativa.

### Métricas
Son valores que *nosotros* leemos para entender qué tan bien funciona el modelo (aunque no se usan directamente para optimizar).
* **MAE** es muy interpretable: nos dice, de media, cuánto nos estamos equivocando en las unidades originales (por ejemplo, "nos equivocamos en 20.000$ de media").
* **RMSE** (Raíz del error cuadrático medio): Muy usada también para tener una medida de error en las mismas unidades que la variable objetivo.
* **R² (R-cuadrado)**: Indica qué porcentaje de la variación de los datos es capaz de explicar nuestro modelo. Un R² de 0.8 significa que el modelo explica el 80% de la variabilidad. Es la métrica ideal para saber si el modelo es "bueno" en términos generales.

---

### Implementación básica en Keras

Traducir esta arquitectura a código con TensorFlow y Keras es muy directo. Aquí tienes un ejemplo de cómo se compila un modelo:

```python
# 2. Compilar el modelo
model.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae']
)
```

:::tip Diferencia entre Loss y Metrics
*   **Loss (Pérdida)**: Es para la **Red Neuronal**. Es la función que el optimizador intenta minimizar para ajustar los pesos.
*   **Metrics (Métricas)**: Es para el **Humano**. Son valores que Keras nos muestra durante el entrenamiento para que podamos entender cómo de bueno es el modelo en unidades comprensibles (como el MAE en dólares), pero la red no las usa para aprender.
:::

---

## El Proceso de Entrenamiento: Batches y Validación

Para que el modelo aprenda correctamente, no basta con pasarle los datos; hay que definir *cómo* los va a procesar.

### ¿Qué es el Batch Size?
No le pasamos todos los datos a la red a la vez (sería demasiado pesado para la memoria), ni tampoco uno por uno (sería muy lento). Los agrupamos en **batches** (lotes).
* **Batch Size**: El número de ejemplos que procesa la red antes de actualizar los pesos. Un valor común es 32 o 64.
* *Nota: No confundir con "Batch Normalization", que es una técnica de regularización que veremos más adelante.*

### El Conjunto de Validación (Validation Split)
Durante el entrenamiento, es vital saber cómo se comporta el modelo con datos que **no está usando para aprender**. 
Reservamos una pequeña parte de los datos (por ejemplo, el 20%) para validación. El modelo:
1. Aprende con el conjunto de **Entrenamiento**.
2. Al final de cada época, se evalúa con el conjunto de **Validación**.

Esto nos permite detectar el sobreajuste en tiempo real: si el error de entrenamiento baja pero el de validación sube, el modelo está empezando a memorizar.

```python
# Entrenar usando batches y conjunto de validación
history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=32,
    validation_data=(X_valid, y_valid),
    verbose=0
)
```

:::tip Train, Validation y Test
Para entrenar un modelo correctamente, solemos dividir nuestros datos en tres bloques:

1.  **Entrenamiento (`X_train`, `y_train`)**: Son los "apuntes" que la red estudia para ajustar sus pesos.
2.  **Validación (`X_valid`, `y_valid`)**: Es un "simulacro de examen" que se hace al final de cada época. Sirve para ver si el modelo está aprendiendo a generalizar o solo está memorizando. **La red no usa estos datos para ajustar pesos.**
3.  **Test (`X_test`, `y_test`)**: Es el "examen final" que solo se hace una vez hemos terminado de entrenar y ajustar todo, para saber el rendimiento real del modelo con datos que nunca ha visto.

```python
from sklearn.model_selection import train_test_split

# Dividimos para obtener el conjunto de Test (20%)
X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2)

# Del resto (80%), sacamos el conjunto de Validación (ej: 25% de 80% = 20% del total)
X_train, X_valid, y_train, y_valid = train_test_split(X_temp, y_temp, test_size=0.25)
```
:::

---

## Caso de Estudio: California Housing

Para poner en práctica estos conceptos, en la siguiente demo utilizaremos el famoso dataset **California Housing**.

### El Problema
El objetivo es predecir el **precio medio de las viviendas** en un distrito de California, basándonos en datos del censo de 1990.

Las características (features) incluyen:
* Ingreso medio en el bloque (MedInc)
* Antigüedad media de las casas (HouseAge)
* Número medio de habitaciones (AveRooms)
* Latitud y Longitud
* Población, etc.

### EDA y preprocesamiento

Antes de pasar los datos a una red neuronal, debemos aplicar todo lo aprendido en las unidades anteriores sobre **Análisis Exploratorio de Datos (EDA)** y **Preprocesamiento**. 

A menudo se piensa que el Deep Learning es "mágico" y que puede procesar cualquier cosa, pero nada más lejos de la realidad:
*   **No admiten valores nulos**: Una red neuronal no puede operar con `NaN`. Debemos imputar o eliminar esos valores previamente.
*   **Solo entienden números**: Todo el texto (variables categóricas) debe ser codificado (One-Hot Encoding, Label Encoding, etc.) antes de entrar en la red.
*   **Sensibilidad a Outliers**: Al basarse en el descenso de gradiente, los valores extremos pueden desestabilizar el entrenamiento y hacer que los pesos "exploten".

En resumen: una red neuronal solo será tan buena como la calidad de los datos que le entregues.

### La Importancia de la Estandarización
A diferencia de los modelos basados en árboles (como Random Forest o XGBoost), las redes neuronales son **muy sensibles a la escala de los datos**.

Si una variable tiene valores entre 0-1 (como una proporción) y otra tiene valores entre 1.000-100.000 (como ingresos), la red tendrá dificultades para converger, ya que los pesos asociados a la variable grande tendrán que ser muy pequeños y el gradiente será inestable.

:::important Regla de Oro
En Deep Learning, **siempre** debemos estandarizar o normalizar los datos de entrada para que tengan una escala similar (por ejemplo, media 0 y desviación estándar 1).

**¿Y la variable objetivo (Target)?**
En problemas de regresión donde el valor a predecir es muy grande (como el precio de una casa: 500.000$), a veces también es recomendable escalarlo. Si no lo hacemos, el modelo podría tardar mucho en converger porque los errores iniciales serían gigantescos.
:::

---

## Análisis de Experimentos: TensorBoard

Cuando entrenamos redes neuronales, a menudo probamos muchas configuraciones distintas:
* ¿Mejor con 1 capa oculta o con 3?
* ¿Mejor con 32 neuronas o con 128?
* ¿Mejor con *learning rate* 0.01 o 0.001?

Llevar la cuenta de todo esto no es fácil. Aquí entra en juego TensorBoard.

**TensorBoard** es una herramienta de visualización incliuda en TensorFlow que nos permite monitorizar el entrenamiento en tiempo real.

Nos permite ver:
1. **Curvas de Pérdida**: Ver si el modelo está aprendiendo o si ha dejado de mejorar.
2. **Comparar Modelos**: Superponer las gráficas de distintos entrenamientos para ver cuál converge más rápido o consigue menor error.
3. **Detectar Overfitting**: Si vemos que la pérdida en entrenamiento baja pero en validación sube, sabremos exactamente en qué época empezó el sobreajuste.

En la demo práctica aprenderemos a instrumentar nuestro código para enviar estos datos a TensorBoard y analizarlos visualmente:

```python
import datetime

# 1. Definir dónde se guardarán los logs (historial del entrenamiento)
# Usamos la fecha y hora para que cada entrenamiento tenga su propia carpeta
log_dir = "logs/fit/" + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")

# 2. Crear el callback de TensorBoard
tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir, histogram_freq=1)

# 3. Entrenar el modelo pasando el callback en una lista
model.fit(
    X_train, y_train, 
    epochs=100, 
    validation_data=(X_valid, y_valid),
    callbacks=[tensorboard_callback]
)

# 4. Mostrar el panel de TensorBoard directamente en el cuaderno
%load_ext tensorboard
%tensorboard --logdir logs/fit
```

### ¿En qué fijarnos en TensorBoard?

Una vez que se abre el panel, puedes elegir entre visualizar los datos en diferentes pestañas. Las más útiles para monitorizar la evolución del entrenamiento son **Time Series** (vista moderna recomendada) o **Scalars** (vista clásica):

1.  **Time Series:** Es la mejor vista para observar cómo evolucionan las métricas a lo largo del tiempo (épocas). Te permite ver claramente la curva de entrenamiento y validación superpuestas.
2.  **Scalars:** Muestra exactamente la misma información pero con la interfaz clásica. Es útil si necesitas ajustar el *smoothing* (suavizado) de las curvas de forma más manual.

En cualquiera de las dos pestañas, las gráficas fundamentales a vigilar son:
1.  **`epoch_loss` / `val_loss`**: Es la gráfica fundamental. Nos dice el error (MSE) en cada época. Es la que usamos para ver si el modelo converge.
2.  **`epoch_mae` / `val_mae`**: Es la métrica que nosotros entendemos (error en unidades reales). Es muy útil para comunicar resultados.

En estas gráficas, debemos buscar las siguientes señales:

*   **Tendencia de las curvas**: Lo ideal es que tanto la curva de **entrenamiento (train)** como la de **validación (val)** bajen de forma suave. Si la curva es muy "dentada" o tiene picos bruscos, puede ser señal de que el *learning rate* es demasiado alto.
*   **Gap entre curvas**: Es normal que la pérdida de entrenamiento sea un poco menor que la de validación. Sin embargo, si la distancia entre ambas se vuelve cada vez más grande, significa que el modelo está empezando a memorizar (overfitting).
*   **El punto de "despegue"**: Fíjate en el momento exacto en que la curva de validación deja de bajar y empieza a subir lentamente. Ese es el momento óptimo para detener el entrenamiento (y es lo que automatizaremos con el *Early Stopping*).
*   **Comparación de experimentos**: TensorBoard nos permite marcar varios entrenamientos a la izquierda. Podrás ver, por ejemplo, si la red con 128 neuronas (curva azul) baja más rápido que la de 32 neuronas (curva roja).

![Gráfico EDA](../0-img/tensorboard-loss.png)

**Conclusiones de esta gráfica:**

Al observar una gráfica de `epoch_loss` como esta, podemos extraer conclusiones clave para mejorar el modelo:
1.  **Entrenamiento vs. Validación**: La curva naranja representa el **entrenamiento** (va bajando de forma suave hasta el final), mientras que la azul representa la **validación** (se vuelve muy inestable y ruidosa).
2.  **Inestabilidad (Ruido)**: Los picos constantes en la curva azul sugieren que el modelo tiene dificultades para generalizar en cada batch o que el conjunto de validación es pequeño/específico, aunque la tendencia general es clara.
3.  **Divergencia y Overfitting**: A partir de la época 100, la brecha entre las dos curvas se ensancha drásticamente. Mientras el error de entrenamiento sigue bajando (el modelo memoriza), el error de validación deja de mejorar. Esto es un caso de libro de **Overfitting**.
4.  **Punto Óptimo**: El mejor momento para haber detenido este entrenamiento fue alrededor de la **época 40-50**, donde la curva azul alcanzó su punto más bajo antes de volverse errática. Entrenar hasta la época 500 ha sido un desperdicio de tiempo y ha empeorado el modelo final.

---

## Demo práctica: California Housing

Puedes ver una demostración completa de lo anterior en este [cuaderno de Colab](../0-colab/california_housing_redes_densas.ipynb) donde entrenamos tres arquitecturas diferentes para el dataset de California Housing y analizamos los resultados en TensorBoard.

---

## Actividad de seguimiento

Para poner en práctica estos conceptos, implementa una red neuronal para predecir la demanda de alquiler de bicicletas utilizando el **Bike Sharing Dataset**.

Reutiliza el Colab que ya realizaste en el tema anterior, donde deberías tener hecho el EDA, preprocesamiento y evaluación de modelos de Machine Learning clásico.

**Requisitos de la actividad:**
1.  **Arquitecturas**: Define y entrena al menos **3 configuraciones de red** diferentes (por ejemplo: una baseline, una simple con una capa oculta y una más profunda/ancha).
2.  **Monitorización**: Utiliza el callback de **TensorBoard** para registrar el entrenamiento de todos los modelos y describe las gráficas de epoch_loss.
3.  **Evaluación**: Compara los modelos utilizando las métricas.