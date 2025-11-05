---
title: "Primer modelo de ML: Titanic"
sidebar_position: 2
description: "Primer ejemplo práctico de aprendizaje automático utilizando el dataset del Titanic y el algoritmo KNN. Compararemos un flujo básico y otro completo siguiendo las fases del ciclo de ML."
keywords: [Machine Learning, Titanic, KNN, clasificación, scikit-learn, Python, preprocesamiento, EDA]
---

<div class="justify-text">

En este primer ejemplo práctico vamos a **construir un modelo de clasificación** que prediga **si un pasajero del Titanic sobrevivió o no** utilizando el algoritmo **K-Nearest Neighbors (KNN)**.

Nuestro objetivo no es aún obtener la máxima precisión, sino **comprender la estructura completa de un proyecto de ML** y **visualizar la diferencia** entre:

1. Un modelo básico sin apenas preparación (sin EDA ni preprocesamiento).  
2. Un modelo completo siguiendo correctamente el **flujo de trabajo de ML**.


## Material disponible

A continuación puedes descargar los dos notebooks que utilizaremos:

| Notebook | Descripción | Enlace |
|-----------|--------------|--------|
| **TitanicBasico.ipynb** | Versión mínima: se carga el dataset y se entrena un modelo KNN sin preprocesamiento ni análisis previo. | [Descargar cuaderno](./0-datasets/TitanicSencillo.ipynb) |
| **TitanicCompleto.ipynb** | Implementa el flujo completo: EDA, limpieza de datos, imputación de nulos, codificación de variables, escalado y entrenamiento del modelo KNN. | [Descargar cuaderno](./0-datasets/TitanicCompleto.ipynb) |

📂 **Dataset:** [`titanic.csv`](./0-datasets/titanic.csv)

---

## Contexto del problema

El **conjunto de datos del Titanic** es un clásico en aprendizaje automático. Cada fila representa un pasajero e incluye información como:

| Columna | Descripción |
|----------|--------------|
| `Survived` | Variable objetivo (1 = sobrevivió, 0 = no sobrevivió) |
| `Pclass` | Clase del billete (1ª, 2ª o 3ª) |
| `Sex` | Sexo del pasajero |
| `Age` | Edad |
| `SibSp` | Número de hermanos/esposos a bordo |
| `Parch` | Número de padres/hijos a bordo |
| `Fare` | Tarifa pagada |
| `Embarked` | Puerto de embarque (C = Cherbourg, Q = Queenstown, S = Southampton) |

> 📚 **Fuente del dataset:** [Titanic – Kaggle (Brendan45774)](https://www.kaggle.com/datasets/brendan45774/test-file)

---

## Qué hace KNN

El algoritmo [**K-Nearest Neighbors (KNN)**](https://www.geeksforgeeks.org/machine-learning/k-nearest-neighbours/) clasifica una muestra nueva comparándola con sus **K vecinos más cercanos** en el espacio de características.

- Si la mayoría de los vecinos pertenecen a la clase “1” (sobrevive), el nuevo ejemplo se clasifica como 1.  
- Si la mayoría pertenecen a “0” (no sobrevive), el resultado será 0.  

💡 Es un método **basado en distancias**, por lo que **requiere escalar correctamente los datos numéricos**.  
En el *notebook completo*, esto se hace con `StandardScaler`, mientras que en el *notebook básico* **no se escala nada**, afectando la precisión del modelo.


---

## Titanic Básico vs Titanic Completo

| Aspecto | TitanicBasico | TitanicCompleto |
|----------|----------------|----------------|
| Exploración de datos (EDA) | ❌ No se realiza | ✅ Análisis de nulos, correlaciones y tipos |
| Preprocesamiento | ❌ No se imputan ni codifican variables | ✅ Limpieza, imputación y codificación adecuadas |
| Escalado | ❌ No se normalizan los datos | ✅ Se aplica `StandardScaler` |
| Resultados | 🔻 Menor precisión, posibles errores | 🟢 Mejor rendimiento y generalización |
| Aprendizaje pedagógico | Sirve para **entender errores comunes** | Muestra **cómo se hace correctamente** |

### Resumen de resultados

Las métricas de evaluación nos permiten determinar las diferencias entre ambos modelos:

| Modelo | Accuracy aproximada | Observaciones |
|---------|---------------------|----------------|
| TitanicBasico | ~0.65 | Datos sin limpiar ni escalar → modelo inestable |
| TitanicCompleto | ~0.81 | Datos bien preprocesados → modelo más preciso y robusto |

---

## Conclusión

> La **calidad del preprocesamiento** es tan importante como el propio algoritmo.

Un modelo simple (como KNN) puede ofrecer **resultados excelentes** si seguimos un **flujo de trabajo profesional**, mientras que un modelo mal preparado puede fracasar incluso con buenos algoritmos.

---

## Actividad práctica: EDA con el dataset Heart Disease

Tu reto consiste en **repetir el mismo proceso que has realizado con el Titanic**, pero aplicándolo al dataset [`heart_disease.csv`](./0-datasets/heart_disease.csv). Puedes obtener más información de este dataset [aquí](https://www.kaggle.com/datasets/redwankarimsony/heart-disease-data).

:::info Objetivos de la tarea

Explorar y visualizar los datos para comprender las variables y sus relaciones. Concéntrate especialmente en la fase de **Análisis Exploratorio de Datos (EDA)**.

🔍 **Qué debes hacer:**
- Carga el dataset y revisa su estructura (`.info()`, `.describe()`, valores nulos, tipos de datos…).  
- Genera **gráficas** que te ayuden a interpretar los patrones:
  - Histogramas o `countplot` para distribuciones.  
  - Boxplots para detectar outliers.  
  - Mapas de calor (`heatmap`) para correlaciones.  
  - Scatterplots o pairplots para relaciones entre variables.
- Describe en tus conclusiones **qué relaciones interesantes** has encontrado entre las variables y el target (`heart_disease` = 1 si hay enfermedad, 0 si no).
- Indica qué features sí utilizarías para entrenar tu modelo, cuáles no y por qué.

🧠 **Opcional (para quien quiera ir más allá):**

Si te animas, intenta aplicar también:
- Preprocesamiento (imputación, escalado, codificación si fuera necesario).  
- Entrenamiento de un modelo simple (por ejemplo, KNN o Logistic Regression).  
- Evaluación básica del modelo (accuracy o matriz de confusión).

> En esta actividad no se trata de obtener la mayor precisión, sino de **entender los datos y visualizar patrones**.

:::

</div>