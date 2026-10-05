---
draft: true
title: "Sesión 2: EDA Univariante y la Fórmula V-H-A"
sidebar_position: 2
description: "Análisis Exploratorio de Datos variable a variable: distribuciones numéricas, cardinalidad categórica y la fórmula obligatoria de análisis V-H-A."
keywords: ["EDA", "univariante", "distribuciones", "asimetria", "cardinalidad", "seaborn", "V-H-A"]
---

<div class="justify-text">

# Sesión 2: EDA Univariante y la Fórmula V-H-A

**Duración estimada:** 2 horas (120 minutos)  
**Bloque:** Bloque 2 — EDA Detective: De la Hipótesis a la Evidencia  
**Entorno de trabajo:** Jupyter Notebook (`.ipynb`) en VS Code / Google Colab  
**Objetivo de la sesión:** Analizar cada característica de forma individual para comprender su rango, forma de distribución y balanceo; erradicar la generación de gráficos vacíos mediante la aplicación estricta del marco metodológico **V-H-A (Visualización - Hallazgo - Acción)**.

---

## ⏱️ Distribución de la Sesión

* **00:00 - 00:20 (20 min) — Píldora Teórica:** La trampa de la «galería de gráficos», presentación del marco **V-H-A** y lectura clínica de distribuciones numéricas y categóricas.
* **00:20 - 01:45 (85 min) — Reto Práctico:** «El informe forense univariante sobre `X_train`».
* **01:45 - 02:00 (15 min) — Cierre y Puesta en Común:** Proyección de 3 notebooks de alumnos para contrastar los hallazgos y las acciones propuestas.

---

## 📚 Guion de Contenidos a Desarrollar en los Apuntes

### 1. El Cambio de Mentalidad: De la Sintaxis al Diagnóstico
* Por qué hacer `df.hist()` de 20 columnas a la vez es una pérdida de tiempo: no hay asimilación mental.
* **La regla de oro de la asignatura: «No Graph Without Markdown»**.
* **El marco V-H-A:**
  ```markdown
  ### Variable: [nombre_columna]
  - **V (Visualización / Pregunta):** ¿Cómo se distribuyen los ingresos de los clientes? ¿Siguen una campana de Gauss o hay asimetría?
  [Celda de código con sns.histplot / sns.boxplot]
  - **H (Hallazgo):** Fuerte asimetría positiva hacia la derecha; el 75% gana menos de 45.000€, pero existen registros aislados de 300.000€. Además, hay 142 registros con valor exacto 0€ (sospechoso de nulo encubierto).
  - **A (Acción para Preprocesamiento):** En la fase de preprocesamiento, sustituiremos los 0€ por NaN y evaluaremos aplicar una transformación logarítmica (`np.log1p`) o un escalador robusto (`RobustScaler`) para mitigar el impacto de la asimetría en modelos sensibles.
  ```

### 2. Diagnóstico de Variables Numéricas
* **Medidas que dialogan entre sí:**
  * Media vs. Mediana: si $\text{media} \gg \text{mediana}$, la distribución está sesgada a la derecha.
  * Desviación típica y rango intercuartílico (IQR).
* **Forma de la distribución:**
  * Simetría / Asimetría (*skewness*).
  * Distribuciones multimodales (¿hay dos poblaciones mezcladas en la misma columna, ej. clientes particulares vs. empresas?).
* **Herramientas de visualización:**
  * `sns.histplot(data=X_train, x='col', kde=True)`: para entender la densidad y la forma.
  * `sns.boxplot(data=X_train, x='col')`: para identificar el rango intercuartílico y candidatos a outliers.

### 3. Diagnóstico de Variables Categóricas
* **Cardinalidad:**
  * Baja cardinalidad (2 a 5 valores): idóneas para One-Hot Encoding.
  * Alta cardinalidad (ej. 200 ciudades o códigos postales): peligro de explosión dimensional en modelos.
* **Desbalanceo y categorías residuales:**
  * Categorías que aparecen menos del 1% de las veces: causantes de sobreajuste o problemas al dividir train/test.
* **Herramientas de visualización:**
  * `sns.countplot(data=X_train, y='col', order=X_train['col'].value_counts().index)`: ordenado por frecuencia para ver claramente la cola larga.

---

## 💻 Ejercicio / Reto Práctico: «El Informe Forense Univariante»

### Enunciado del Reto
Utilizando exclusivamente `X_train` del dataset asignado en la sesión anterior, el alumno debe auditar individualmente **6 variables clave** (3 numéricas y 3 categóricas representativas).

### Tareas a Realizar por el Alumno:
1. **Selección argumentada:** Explicar brevemente en Markdown por qué esas 6 variables parecen a priori las más relevantes según la lógica del problema.
2. **Aplicación estricta de la ficha V-H-A:**  
   Para cada una de las 6 variables:
   * Formular la pregunta previa (**V**).
   * Generar la visualización limpia (ejes rotulados, tamaño adecuado, sin títulos por defecto).
   * Redactar el hallazgo (**H**) cuantificando con números (mínimos, máximos, porcentajes de la moda).
   * Definir la acción recomendada de preprocesamiento (**A**).
3. **Detección de incongruencias lógicas univariantes:**
   * Encontrar si hay edades negativas o mayores a 120 años.
   * Encontrar si hay variables categóricas con categorías duplicadas por espacios en blanco o mayúsculas (`"Particular"`, `"particular"`, `"particular "`).

---

## 🔍 Criterios Docentes y Errores Habituales a Prevenir

:::tip Rúbrica de corrección para el profesor
* **50% de la nota:** Calidad, coherencia y profundidad del análisis en las celdas Markdown (**V-H-A**). Un alumno con un gráfico perfecto pero sin conclusiones obtiene un 0 en ese ejercicio.
* **30% de la nota:** Detección de anomalías o valores sospechosos.
* **20% de la nota:** Calidad sintáctica y estética del código de Seaborn/Matplotlib.
:::

</div>
