---
title: "Redes Densas para Regresión"
sidebar_position: 1
description: "Cómo utilizar redes neuronales densas (MLP) para predecir valores continuos. Arquitectura, funciones de activación y métricas clave."
keywords: [regresión, redes densas, MLP, California Housing, MSE, MAE, ReLU, TensorBoard]
---

En las unidades anteriores hemos visto cómo funciona una neurona individual y cómo se entrena mediante el descenso de gradiente. Pero una sola neurona (perceptrón) tiene una limitación fundamental: solo puede aprender relaciones lineales.

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
* **Función de Activación**: El estándar hoy en día es **ReLU** (*Rectified Linear Unit*). Es eficiente y funciona muy bien para permitir que la red aprenda relaciones no lineales.

### C. Capa de Salida (Output)
Esta es la parte crítica que diferencia a la regresión de la clasificación.
* **Número de neuronas**: **1** (porque queremos predecir un único valor numérico).
* **Función de Activación**: **Ninguna (Lineal)**.
    * No usamos Sigmoid o Tanh porque estas comprimen la salida a rangos limitados ([0,1] o [-1,1]).
    * Queremos que la red pueda predecir cualquier valor real (por ejemplo, un precio de 500.000\$ o una temperatura de -15ºC), por lo que dejamos que la neurona devuelva el valor tal cual lo calcula la suma ponderada: $y = \sum (w_i x_i) + b$.

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

### La Importancia de la Estandarización
A diferencia de los modelos basados en árboles (como Random Forest o XGBoost), las redes neuronales son **muy sensibles a la escala de los datos**.

Si una variable tiene valores entre 0-1 (como una proporción) y otra tiene valores entre 1.000-100.000 (como ingresos), la red tendrá dificultades para converger, ya que los pesos asociados a la variable grande tendrán que ser muy pequeños y el gradiente será inestable.

:::important Regla de Oro
En Deep Learning, **siempre** debemos estandarizar o normalizar los datos de entrada para que tengan una escala similar (por ejemplo, media 0 y desviación estándar 1).
:::

---

## Análisis de Experimentos: TensorBoard

Cuando entrenamos redes neuronales, a menudo probamos muchas configuraciones distintas:
* ¿Mejor con 1 capa oculta o con 3?
* ¿Mejor con 32 neuronas o con 128?
* ¿Mejor con *learning rate* 0.01 o 0.001?

Llevar la cuenta de todo esto no es fácil. Aquí entra en juego **TensorBoard**.

### ¿Qué es TensorBoard?
Es una herramienta de visualización incliuda en TensorFlow que nos permite monitorizar el entrenamiento en tiempo real.

Nos permite ver:
1. **Curvas de Pérdida**: Ver si el modelo está aprendiendo o si ha dejado de mejorar.
2. **Comparar Modelos**: Superponer las gráficas de distintos entrenamientos para ver cuál converge más rápido o consigue menor error.
3. **Detectar Overfitting**: Si vemos que la pérdida en entrenamiento baja pero en validación sube, sabremos exactamente en qué época empezó el sobreajuste.

En la demo práctica aprenderemos a instrumentar nuestro código para enviar estos datos a TensorBoard y analizarlos visualmente.

---


## Evitando el memorismo: Early Stopping

Cuando entrenamos una red neuronal, corremos el riesgo de que aprenda "demasiado bien" los datos de entrenamiento, hasta el punto de memorizar el ruido en lugar del patrón general. A esto se le llama **Overfitting** (sobreajuste).

### ¿Cómo detectarlo?
Lo veremos claramente en las gráficas de pérdida (Loss) que nos muestra TensorBoard o el historial de entrenamiento:

*   La pérdida en **Train** sigue bajando indefinidamente.
*   La pérdida en **Validation** deja de bajar y empieza a subir.

Ese punto de inflexión es donde el modelo empieza a memorizar.

### La solución más sencilla: Early Stopping
En lugar de intentar adivinar cuántas épocas necesita el modelo (¿100? ¿200? ¿500?), usamos una técnica llamada **Early Stopping** (parada temprana).

Funciona así:
1.  Monitorizamos la pérdida de validación en cada época.
2.  Si la pérdida de validación no mejora durante un número determinado de épocas (paciencia), **paramos el entrenamiento automáticamente**.
3.  Restauramos los pesos del modelo al punto donde consiguió el mejor resultado.

Es una forma muy eficaz y sencilla de evitar el sobreajuste sin complicar la arquitectura del modelo.

---

## Siguientes Pasos

Ahora que conocemos la teoría de las redes densas para regresión, ¡vamos a construir una!

👉 **[Demo: Regresión con California Housing y TensorBoard](../0-colab/regresion_california.ipynb)**
*(Nota: El enlace a la demo se activará cuando la creemos en los siguientes pasos)*