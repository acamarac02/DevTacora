---
title: "Introducción"
sidebar_position: 1
description: "Conceptos básicos del aprendizaje automático: qué es, su terminología fundamental y los principales tipos de aprendizaje."
keywords: [Machine Learning, aprendizaje automático, IA, dataset, features, target, supervisado, no supervisado, reforzado, modelos predictivos]
---

<div class="justify-text">

El **aprendizaje automático (Machine Learning, ML)** es una rama de la **Inteligencia Artificial (IA)** que permite a las máquinas **aprender patrones a partir de datos** para **realizar predicciones o tomar decisiones** sin estar programadas explícitamente para cada tarea.

En lugar de seguir instrucciones fijas, los modelos de ML se **entrenan con ejemplos** (datos históricos) y aprenden a **generalizar** para nuevos casos.

## Conceptos básicos

| Término | Definición simple | Ejemplo |
|----------|-------------------|----------|
| **Dataset** | Conjunto de datos que usamos para entrenar y evaluar un modelo. | Un archivo CSV con información de pasajeros del Titanic. |
| **Features (características)** | Variables de entrada que describen cada observación. | Edad, sexo, clase del billete, número de hermanos a bordo... |
| **Target (etiqueta o variable objetivo)** | Lo que queremos predecir. | Si el pasajero sobrevivió (1) o no (0). |
| **Modelo** | Algoritmo que aprende una relación entre las features y el target. | Regresión logística, árbol de decisión, KNN, etc. |
| **Entrenamiento** | Fase en la que el modelo aprende a partir de los datos conocidos. | Ajustar pesos para minimizar el error. |
| **Predicción** | Aplicar el modelo a nuevos datos para obtener resultados. | Estimar si un nuevo pasajero sobreviviría. |

---

## Tipos de aprendizaje automático

El **tipo de aprendizaje** depende del tipo de información disponible y del objetivo del modelo:

### Aprendizaje supervisado

En el **aprendizaje supervisado**, el dataset **incluye las etiquetas (target)**, es decir, **sabemos el resultado correcto** durante el entrenamiento. El modelo aprende una función que relaciona las *features* con el *target* y puede aplicarla a nuevos datos.

Se utiliza para **predecir valores o clasificar elementos** en función de sus características.

![Aprendizaje supervisado](./0-img/aprendizaje-superv.png)

Las tareas supervisadas pueden ser, a su vez, de dos tipos:

- **Regresión:** el objetivo es **predecir un valor numérico continuo**.  
  Ejemplo: predecir el precio de una vivienda según sus metros cuadrados, ubicación y número de habitaciones.

- **Clasificación:** el objetivo es **predecir una categoría** o clase.  
  Ejemplo: determinar si un correo es *spam* o *no spam*, o si un cliente comprará un producto.


#### Ejemplo práctico 

![Regresión vs Clasificación](./0-img/reg_vs_clas.png)

Ambas figuras anteriores muestran conjuntos de datos **etiquetados**, como se describe a continuación:

**Figura A:**
Corresponde a un dataset de una tienda, utilizado para **predecir si un cliente comprará o no un determinado producto** en función de su **género, edad y salario**.

* **Entradas (Input):** Género, Edad, Salario
* **Salida (Output):** *Purchased* → 0 o 1

  * **1:** el cliente **sí comprará** el producto
  * **0:** el cliente **no lo comprará**

**Figura B:**
Representa un dataset **meteorológico**, cuyo objetivo es **predecir la velocidad del viento** a partir de distintos parámetros atmosféricos.

* **Entradas (Input):** Punto de rocío, Temperatura, Presión, Humedad relativa, Dirección del viento
* **Salida (Output):** *Wind Speed* (Velocidad del viento)

#### Algoritmos supervisados

El **aprendizaje supervisado** puede dividirse en varios tipos, cada uno con sus **características y aplicaciones propias**.
A continuación se presentan algunos de los **tipos de algoritmos de aprendizaje supervisado más comunes:**


| **Algoritmo**                             | **Regresión / Clasificación** | **Propósito**                                                                     | **Método**                                                                   | **Casos de uso**                                                                        |
| ----------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Linear Regression**                      | Regresión                     | Predecir valores de salida continuos                                              | Ecuación lineal que minimiza la suma de los cuadrados de los residuos        | Predicción de valores continuos                                                         |
| **Logistic Regression**                   | Clasificación                 | Predecir una variable de salida binaria                                           | Función logística que transforma una relación lineal                         | Tareas de clasificación binaria                                                         |
| **Decision Tree**                   | Ambos                         | Modelar decisiones y resultados                                                   | Estructura en forma de árbol con decisiones y resultados                     | Tareas de clasificación y regresión                                                     |
| **Random Forests**   | Ambos                         | Mejorar la precisión en clasificación y regresión                                 | Combinación de múltiples árboles de decisión                                 | Reducir sobreajuste, mejorar la precisión de predicción                                 |
| **Support Vector Machine (SVM)** | Ambos                         | Crear un hiperplano para clasificar o predecir valores continuos                  | Maximización del margen entre clases o predicción de valores continuos       | Tareas de clasificación y regresión                                                     |
| **K-Nearest Neighbours (KNN)**          | Ambos                         | Predecir la clase o el valor basándose en los *k* vecinos más cercanos            | Búsqueda de los *k* vecinos más cercanos y predicción por mayoría o promedio | Tareas de clasificación y regresión; sensible al ruido en los datos                     |
| **Gradient Boosting**                     | Ambos                         | Combinar modelos débiles para crear un modelo fuerte                              | Corrección iterativa de errores mediante nuevos modelos                      | Tareas de clasificación y regresión para mejorar la precisión de predicción             |
| **Naive Bayes**                           | Clasificación                 | Predecir clases basándose en la suposición de independencia entre características | Teorema de Bayes con hipótesis de independencia entre características        | Clasificación de texto, filtrado de spam, análisis de sentimiento, aplicaciones médicas |

Estos tipos de **aprendizaje supervisado** en *machine learning* varían según el **problema que intentamos resolver** y el **conjunto de datos con el que trabajamos**.
En los **problemas de clasificación**, la tarea consiste en **asignar las entradas a clases predefinidas**, mientras que en los **problemas de regresión** se busca **predecir resultados numéricos**.


#### Ejemplos prácticos de aprendizaje supervisado

Algunos ejemplos reales de **aprendizaje supervisado** en distintas industrias son los siguientes:

* **Detección de fraude en banca:**
  Se utilizan algoritmos de aprendizaje supervisado sobre datos históricos de transacciones, entrenando modelos con conjuntos de datos etiquetados que contienen operaciones legítimas y fraudulentas, para **predecir con precisión patrones de fraude**.

* **Predicción de la enfermedad de Parkinson:**
  El aprendizaje supervisado ayuda a **predecir la presencia o progresión del Parkinson**, una enfermedad neurodegenerativa que afecta el sistema nervioso y las partes del cuerpo controladas por los nervios.

* **Predicción de abandono de clientes (*Customer Churn*):**
  Se aplican técnicas supervisadas para **analizar datos históricos de clientes**, identificando las características asociadas con la pérdida de clientes y permitiendo **predecir la probabilidad de retención**.

* **Clasificación de células cancerígenas:**
  Se entrena un modelo supervisado con datos de características celulares para **identificar si una célula es “maligna” o “benigna”**, apoyando el diagnóstico médico.

* **Predicción del precio de acciones:**
  Los modelos supervisados se emplean para **predecir señales que indiquen si comprar una acción puede ser rentable o no**, basándose en datos históricos del mercado.


---

### Aprendizaje no supervisado

En el **aprendizaje no supervisado**, el dataset **no contiene etiquetas (target)**, es decir, **no sabemos el resultado correcto** durante el entrenamiento. El modelo trabaja únicamente con las *features* de entrada y busca **descubrir patrones, agrupamientos o relaciones ocultas** en los datos.

Se utiliza para **explorar datos**, **segmentar** o **reducir su dimensión**, cuando no existe una variable objetivo claramente definida.

![Aprendizaje no supervisado](./0-img/aprendizaje-no-superv.png)


Las tareas de aprendizaje no supervisado pueden ser de tres tipos:

* **Clustering (agrupamiento):** El objetivo es crear grupos de datos que resulten lo más similares posible dentro de cada cluster y lo más distintos posible entre grupos.
  Ejemplos: segmentar clientes según su comportamiento, agrupar documentos o imágenes según temas.

* **Aprendizaje de reglas de asociación (Association Rule Learning):** Se busca descubrir relaciones del tipo *si-entonces* entre variables del dataset.
  Ejemplo: en una tienda online, “si el cliente compró X y Y, es muy probable que también compre Z”.

* **Reducción de dimensionalidad (Dimensionality Reduction):** Consiste en transformar el dataset para reducir el número de variables, manteniendo la mayor información posible. 
  Ejemplos: para visualización (2D/3D), para acelerar algoritmos o eliminar ruido.

#### Algoritmos comunes

<div class="texto-sin-justificar">

| Algoritmo                                   | Tarea principal               | Comentario                                                                                        |
| ------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `KMeans`                                    | Clustering                    | Divide los datos en K grupos según distancia.                                                     |
| `Hierarchical Clustering`                   | Clustering jerárquico         | Construye dendrogramas que muestran grupos dentro de grupos.                                      |
| `DBSCAN`                                    | Clustering basado en densidad | Detecta grupos de alta densidad y trata los puntos aislados como “ruido”.                         |
| `Apriori`, `FP-Growth`                      | Reglas de asociación          | Encuentra reglas frecuentes tipo “si compra A y B, luego también C”.                              |
| `PCA` (Análisis de Componentes Principales) | Reducción de dimensionalidad  | Transforma variables originales en nuevas componentes que explican la mayor parte de la varianza. |

</div>

#### Ejemplos prácticos

* **Segmentación de clientes**: Imagina un conjunto de datos de compras en una tienda donde **no sabemos qué es un cliente “bueno” o “malo”**, solo tenemos sus características (edad, género, ingresos, frecuencia de compra). Al aplicar un algoritmo de clustering, podríamos descubrir grupos naturales de clientes (por ejemplo: jóvenes con pocos ingresos pero compras frecuentes; mayores con ingresos altos y pocas compras) que no estaban definidos previamente. Posteriormente esos grupos se pueden usar para marketing segmentado.
* **Detección de anomalías:** identifica patrones inusuales en los datos, ayudando en la **detección de fraudes**, la **ciberseguridad** y la **prevención de fallos en equipos**.
* **Sistemas de recomendación:** sugiere **productos, películas o música** analizando el **comportamiento y las preferencias de los usuarios**.
* **Agrupamiento de imágenes y texto:** organiza o agrupa **imágenes o documentos similares** para tareas de **clasificación, organización o recomendación de contenido**.
* **Análisis de redes sociales:** detecta **comunidades o tendencias** en las interacciones de los usuarios dentro de plataformas sociales.


---

### Aprendizaje por refuerzo
- Un **agente** aprende mediante **recompensas y penalizaciones**.
- No se entrena con datos fijos, sino con **experiencia**.
- Usado en:
  - Juegos (AlphaGo)
  - Robots que aprenden estrategias óptimas
  - Sistemas de recomendación adaptativos

---


## Flujo general de un proyecto de ML

Los proyecto de aprendizaje automático (ML) siguen un flujo estructurado que ayuda a asegurar que el modelo sea **preciso, fiable y escalable**.

![Flujo ML](./0-img/flujo-ml.png)

A continuación se describen los pasos típicos:

### 1. Definición del problema

* Comprender claramente **qué problema queremos resolver**, cuál es el objetivo del modelo y qué beneficio aportará.
* Identificar las **variables clave**, los indicadores de éxito (KPIs) y los recursos disponibles (datos, herramientas, equipo).
* Este paso es crítico porque **marca el alcance y dirección** del resto del proyecto.

### 2. Carga y recopilación de datos

* Recoger los datos necesarios desde distintas fuentes: bases de datos, ficheros CSV, APIs, sensores, etc.
* Asegurar que se haya capturado suficiente **diversidad y volúmen** para que el modelo pueda aprender correctamente.
* La calidad de los datos aquí tiene gran impacto en todo el proyecto.

### 3. Exploración de los datos (EDA)

* Analizar el contenido del dataset: tipos de variables, valores nulos, distribuciones, posibles outliers.
* Visualizar los datos con gráficas, calcular estadísticas descriptivas, matrices de correlación.
* Limpiar los datos: tratar valores faltantes, eliminar duplicados, corregir errores, convertir formatos.
* Esta fase prepara el terreno para el preprocesamiento y evita sorpresas en etapas posteriores.

### 4. Preprocesamiento

* Aquí se realiza la **ingeniería de características (feature engineering)**: crear nuevas variables, transformar variables existentes, seleccionar las más relevantes.
* Escalado de variables, codificación de categóricas, imputación de valores nulos, tratamiento de outliers.
* Dividir el dataset en conjuntos de entrenamiento y test (y a veces validación) **antes** de aplicar transformaciones que puedan causar filtración de datos (“data leakage”).
* Este paso prepara los datos para que puedan alimentar correctamente los algoritmos de ML.

### 5. Selección del modelo

* Decidir qué tipo de modelo o modelos utilizar: regresión, clasificación, clustering, etc.
* Comparar distintas familias de algoritmos teniendo en cuenta la naturaleza del problema y los datos.
* Ajustar hiperparámetros básicos y definir métricas de evaluación.

### 6. Entrenamiento del modelo

* Aplicar el algoritmo al conjunto de entrenamiento para que aprenda la relación entre features y target.
* Monitorizar métricas de rendimiento, comprobar progreso, y evitar sobreajuste (overfitting).
* Realizar validación (por ejemplo mediante hold-out o cross-validation) para asegurar que el modelo generaliza.

### 7. Evaluación y ajuste

* Evaluar el modelo sobre el conjunto de test o validación usando métricas adecuadas (por ejemplo, RMSE, Accuracy, F1-score).
* Analizar errores, identificar qué está funcionando mal (por ejemplo, bias, varianza, datos insuficientes).
* Ajustar el modelo o volver a fases anteriores (datos/preprocesamiento) si es necesario. Es un proceso iterativo.

### 8. Despliegue y mantenimiento

* Una vez satisfechos con el rendimiento, implementar el modelo en un entorno real o de producción para que realice predicciones en “nuevos” datos.
* Supervisa el modelo en producción: detecta cambios en los datos (“data drift” o “concept drift”), rendimiento decreciente o fallos operativos.
* Actualizar o retrenar el modelo periódicamente para mantener su relevancia.

**Fuente:**  
1. https://www.geeksforgeeks.org/machine-learning/supervised-machine-learning/ "Supervised Machine Learning? - GeeksforGeeks".
2. https://www.geeksforgeeks.org/machine-learning/unsupervised-learning/ "What is Unsupervised Learning? - GeeksforGeeks".
3. https://www.geeksforgeeks.org/machine-learning/machine-learning-lifecycle/ "Machine Learning Lifecycle - GeeksforGeeks".

</div>