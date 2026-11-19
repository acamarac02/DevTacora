---
draft: true
title: "Proyecto: Estudio de modelos"
sidebar_position: 2
description: "Guía del Proyecto 1: estudio en equipo de los principales algoritmos de clasificación, preparación de la presentación y desarrollo de dos notebooks prácticos."
keywords: ["proyecto 1", "clasificacion", "regresion logistica", "knn", "arboles de decision", "random forest", "gradient boosting", "svm", "xgboost"]
---

<div class="justify-text">

## Introducción

En este proyecto trabajaremos en grupos para estudiar en detalle uno de los principales algoritmos de clasificación supervisada. Cada equipo se especializará en un modelo concreto y deberá preparar una presentación breve para explicárselo al resto de la clase, acompañada de dos cuadernos prácticos (uno para clasificación binaria y otro para clasificación multiclase).

Se van a formar, según criterio de la profesora:

* 6 grupos de 2 alumnos
* 2 grupos de 3 alumnos

---

## Modelos a estudiar

Cada equipo tendrá asignado uno de los siguientes ocho temas:

* **Regresión Logística (`LogisticRegression`):** función sigmoide, estimación de probabilidades, parámetro de regularización `C` y extensión a clasificación multiclase.
* **K-Vecinos más Cercanos (`KNeighborsClassifier`):** cálculo de distancias, número de vecinos (`n_neighbors`), ponderación por distancia (`weights`) y efecto de la escala de los datos.
* **Árboles de Decisión (`DecisionTreeClassifier`):** criterios de división (`gini` y `entropy`), profundidad máxima (`max_depth`), mínimo de muestras para dividir y representación gráfica del árbol.
* **Bosques Aleatorios (`RandomForestClassifier`):** concepto de ensamble (*Bagging*), número de árboles (`n_estimators`), control de profundidad e importancia de variables.
* **Gradient Boosting (`GradientBoostingClassifier`):** ensamble secuencial (*Boosting*), tasa de aprendizaje (`learning_rate`), número de estimadores y control del sobreajuste.
* **Máquinas de Vectores de Soporte (`SVC`):** hiperplano de separación, margen, vectores de soporte y uso de *kernels* (`linear` frente a `rbf`).
* **XGBoost (`XGBClassifier`):** optimización de árboles potenciados por gradiente, hiperparámetros clave (`n_estimators`, `learning_rate`, `max_depth`) y regularización.
* **Ensambles basados en árboles (Bagging, Pasting y Boosting):** diferencias conceptuales entre un árbol individual (`DecisionTreeClassifier`) y los métodos de ensamble (`BaggingClassifier`, `RandomForestClassifier`, `GradientBoostingClassifier`, `XGBoost`), técnicas de muestreo con y sin reemplazo (*Bagging* frente a *Pasting*), votación y aprendizaje paralelo frente a secuencial.

---

## Entregables

### Presentación

La exposición tendrá una duración aproximada de **10 minutos**, más un breve turno de preguntas. Se valorará especialmente que las diapositivas sean claras, directas y visuales, evitando bloques largos de texto.

La presentación deberá cubrir cuatro puntos obligatorios sobre el algoritmo asignado (en el caso del grupo de **Ensambles**, el foco principal recaerá en el primer punto comparando las estrategias de *Bagging*, *Pasting* y *Boosting* frente a un árbol único, sin necesidad de profundizar en el detalle de los hiperparámetros, atributos útiles y requisitos de preprocesamiento de cada modelo):

* **Funcionamiento interno:** explicación intuitiva de cómo aprende el algoritmo y cómo toma las decisiones al predecir, sin entrar en demostraciones matemáticas complejas. Es recomendable utilizar imágenes que ayuden a entender cómo funciona el algoritmo.
* **Hiperparámetros fundamentales:** los hiperparámetros más importantes del modelo, indicando para qué sirven y qué ocurre cuando se sube o se baja su valor.
* **Atributos útiles tras el entrenamiento:** qué información interna se puede consultar después de ejecutar `.fit()` (por ejemplo, `.coef_`, `.intercept_`, `.feature_importances_`, `.classes_`, etc.).
* **Requisitos de preprocesamiento:** si el modelo necesita escalado obligatorio de variables, si es sensible a valores atípicos (*outliers*) o cualquier otra condición relevante para que funcione bien.

### Notebooks prácticos (Binario y Multiclase)

Cada grupo entregará **dos archivos `.ipynb`**: uno para un problema de **clasificación binaria** y otro para **clasificación multiclase**. En ambos casos se utilizarán conjuntos de datos limpios y con pocas variables para centrar el trabajo en el comportamiento del modelo.

Cada notebook debe seguir esta estructura:

1. **Carga del dataset** e inspección básica de sus dimensiones y clases.
2. **División en entrenamiento y prueba** (`train_test_split` con `random_state=42`).
3. **Entrenamiento del modelo** ajustando manualmente los hiperparámetros estudiados.
    * En el **grupo de Ensambles**, se entrenarán y compararán un árbol individual, `BaggingClassifier` con `bootstrap=True` y `bootstrap=False` para Bagging/Pasting, y un modelo de Boosting.
4. **Consulta de atributos útiles** mostrando e interpretando los valores obtenidos tras el entrenamiento.
    * Apartado opcional para el grupo de Ensambles.
5. **Predicciones con nuevos datos** sobre ejemplos creados manualmente.
6. **Evaluación y métricas:** Accuracy, Matriz de Confusión, Precision, Recall y F1-Score.
7. **Análisis de *overfitting* y *underfitting***.
8. **Prueba con otros valores de hiperparámetros**, visualizando cómo cambian los atributos útiles, métricas, si hay sobreajuste o no, etc.
    * Apartado opcional para el grupo de Ensambles.
9. **En modelos sensibles a la escala**, comprobar las diferencias de resultados entrenando el modelo con los datos escalados y sin escalar, utilizando siempre los mismos valores de hiperparámetros.
10. **Conclusiones:** interpretación clara de los resultados obtenidos en las métricas y en las pruebas realizadas.

#### Conjuntos de datos de partida

Para que todos los grupos trabajen con los mismos datos y se puedan comparar los resultados entre algoritmos, se utilizarán dos conjuntos incluidos en Scikit-Learn sin valores nulos y con cuatro características numéricas:

```python
from sklearn.datasets import load_breast_cancer, load_wine

# 1. Dataset para clasificación binaria (4 características seleccionadas)
cancer = load_breast_cancer(as_frame=True)
columnas_binarias = ["mean radius", "mean texture", "mean perimeter", "mean area"]
X_bin = cancer.data[columnas_binarias]
y_bin = cancer.target

# 2. Dataset para clasificación multiclase (3 tipos de vino, 4 características seleccionadas)
wine = load_wine(as_frame=True)
columnas_vino = ["alcohol", "malic_acid", "color_intensity", "proline"]
X_multi = wine.data[columnas_vino]
y_multi = wine.target
```

:::info
Para este proyecto **no hay que hacer EDA**, os confirmo que el dataset está limpio.

Sobre el **preprocesamiento**, en modelos sensibles a la escala de las variables (como Regresión Logística, KNN o SVC), conviene comparar los resultados obtenidos antes y después de aplicar un escalado con `StandardScaler` para observar su impacto real.
:::

---

## Rúbrica de evaluación

La calificación del proyecto se reparte al **50% entre la presentación oral** y los **dos notebooks prácticos** (binario y multiclase):

| Bloque | Criterio de evaluación | Ponderación |
| :--- | :--- | :---: |
| **Presentación y Exposición (50%)** | **Contenido sintético y visual** (ideas clave sin exceso de texto) | **15%** |
| | **Completitud técnica** (funcionamiento, hiperparámetros, atributos y preprocesamiento) | **20%** |
| | **Dominio y claridad en la exposición** (seguridad al explicar y responder preguntas) | **15%** |
| **Notebooks Prácticos (50%)** | **Entrenamiento, atributos útiles y nuevas predicciones** | **15%** |
| | **Evaluación, métricas y análisis de *overfitting*/*underfitting*** | **15%** |
| | **Experimentación** (pruebas con hiperparámetros y escalado cuando aplique) | **10%** |
| | **Conclusiones** (interpretación clara de los resultados) | **10%** |

</div>
