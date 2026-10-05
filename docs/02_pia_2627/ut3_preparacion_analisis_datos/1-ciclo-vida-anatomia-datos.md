---
draft: true
title: "Sesión 1: Ciclo de Vida de ML y Anatomía de los Datos"
sidebar_position: 1
description: "El ciclo de vida de un proyecto de Machine Learning, la regla 'Garbage In, Garbage Out', la matriz de características y la división Train/Test sagrada."
keywords: ["ciclo de vida ML", "train test split", "features", "target", "preparacion de datos", "data leakage"]
---

<div class="justify-text">

# Sesión 1: Ciclo de Vida de ML y Anatomía de los Datos

**Duración estimada:** 2 horas (120 minutos)  
**Bloque:** Bloque 1 — El Ciclo de Vida y la Anatomía del Dataset  
**Entorno de trabajo:** Jupyter Notebook (`.ipynb`) en VS Code / Google Colab  
**Objetivo de la sesión:** Comprender las etapas de un proyecto de Machine Learning, interiorizar el principio de «Garbage In, Garbage Out», diferenciar variables predictoras y variable objetivo, y ejecutar la partición Train/Test como paso innegociable previo a cualquier exploración.

---

## ⏱️ Distribución de la Sesión

* **00:00 - 00:20 (20 min) — Píldora Teórica:** Explicación del ciclo de vida de ML, el rol de los datos y demostración del split Train/Test.
* **00:20 - 01:45 (85 min) — Reto Práctico:** «Auditoría de un dataset desconocido: Ficha técnica y blindaje del conjunto de test».
* **01:45 - 02:00 (15 min) — Cierre y Puesta en Común:** Debate grupal sobre por qué no podemos explorar el conjunto de test.

---

## 📚 Guion de Contenidos a Desarrollar en los Apuntes

### 1. El Ciclo de Vida de un Proyecto de Machine Learning
* El flujo completo desde la perspectiva de ingeniería del software y ciencia de datos:
  $$\text{Problema de Negocio} \rightarrow \text{Adquisición} \rightarrow \mathbf{EDA} \rightarrow \mathbf{Preprocesamiento} \rightarrow \text{Modelado} \rightarrow \text{Evaluación} \rightarrow \text{Despliegue (API/Docker)}$$
* Conexión con lo aprendido en la UT2: Recordar que una API FastAPI y un contenedor Docker de nada sirven si el modelo predice basura.
* La regla de oro: **«Garbage In, Garbage Out»** (la calidad del dato es el techo de cristal de cualquier modelo).

### 2. Anatomía de una Matriz de Datos
* **Unidad de análisis (fila / observación):** ¿Qué representa exactamente cada registro? (un cliente, una transacción, un sensor por minuto).
* **Matriz de características ($X$):** Variables numéricas, categóricas, textuales, temporales.
* **Vector objetivo ($y$ / Target):**
  * Tarea supervisada de **Regresión:** target continuo (ej. precio en euros, temperatura).
  * Tarea supervisada de **Clasificación:** target discreto (ej. binario: churn sí/no; multiclase: tipo de incidencia A/B/C).

### 3. La Regla de Oro: Partición Train / Test antes de tocar nada
* ¿Por qué nunca se analiza ni transforma el dataset completo junto?
* El concepto de **Data Snooping / Fuga de información (Data Leakage):** si tomas decisiones de imputación o escalado con información del test set, el modelo sobrestimará su rendimiento en producción.
* El procedimiento estándar en Scikit-learn:
  ```python
  from sklearn.model_selection import train_test_split

  X = df.drop(columns=['target'])
  y = df['target']

  X_train, X_test, y_train, y_test = train_test_split(
      X, y, test_size=0.2, random_state=42, stratify=y  # si es clasificación
  )
  ```
* Cuándo utilizar partición estratificada (`stratify=y`) y por qué es vital en clases desbalanceadas.

---

## 💻 Ejercicio / Reto Práctico: «Auditoría Forense y Blindaje de Test»

### Enunciado del Reto
Se proporciona a los alumnos un dataset de negocio con anomalías (por ejemplo, `telco_churn_raw.csv` o `credit_risk_raw.csv`). Antes de escribir cualquier código de gráficos o transformaciones, deben actuar como auditores y cumplimentar la **Ficha Técnica Inicial del Dataset**.

### Tareas a Realizar por el Alumno:
1. **Inspección dimensional y tipos:**
   * Cargar el dataset con Pandas.
   * Identificar número de filas y columnas (`shape`).
   * Describir en una frase qué representa cada fila (unidad de observación).
   * Identificar tipos de datos nativos con `df.dtypes` y detectar discrepancias (ej. números almacenados como `object` por caracteres ocultos).
2. **Identificación de $X$ e $y$:**
   * Señalar con justificación cuál es la variable objetivo y qué tipo de problema predictivo representa (clasificación binaria, multiclase o regresión).
   * Separar $X$ e $y$.
3. **Partición controlada Train/Test:**
   * Ejecutar la partición (80% train, 20% test, `random_state=42`).
   * En caso de clasificación, verificar que las proporciones del target se mantienen idénticas en ambos conjuntos (`value_counts(normalize=True)`).
   * **El blindaje:** Guardar `X_test` e `y_test` sin tocar. A partir de este momento, **todo el EDA de las siguientes sesiones se realizará exclusivamente sobre `X_train` e `y_train`**.

---

## 🔍 Criterios Docentes y Errores Habituales a Prevenir

:::danger Error clásico a erradicar
Hacer `df.describe()` o buscar valores nulos antes de separar el test set. Explicar a los alumnos que en un entorno profesional, el test set simula el «futuro» y en el mundo real no puedes ver los datos del futuro mientras exploras el pasado.
:::

* **Evaluación del ejercicio:** El alumno no solo entrega el notebook ejecutado, sino una celda Markdown introductoria con la ficha técnica completa y la justificación de la semilla y la estratificación.

</div>
