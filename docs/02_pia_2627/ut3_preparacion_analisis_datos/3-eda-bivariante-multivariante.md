---
draft: true
title: "Sesión 3: EDA Bivariante, Multivariante y Relación con el Target"
sidebar_position: 3
description: "Identificación del poder predictivo de las variables frente al target, matrices de correlación (y sus trampas) y detección de colinealidad."
keywords: ["EDA bivariante", "target", "correlacion", "heatmap", "crosstab", "colinealidad", "data leakage"]
---

<div class="justify-text">

# Sesión 3: EDA Bivariante, Multivariante y Relación con el Target

**Duración estimada:** 2 horas (120 minutos)  
**Bloque:** Bloque 2 — EDA Detective: De la Hipótesis a la Evidencia  
**Entorno de trabajo:** Jupyter Notebook (`.ipynb`) en VS Code / Google Colab  
**Objetivo de la sesión:** Evaluar qué características aportan verdadera señal predictiva sobre la variable objetivo ($y$), comparar subpoblaciones, interpretar matrices de correlación sin caer en sus trampas matemáticas y detectar redundancias entre variables predictoras (multicolinealidad).

---

## ⏱️ Distribución de la Sesión

* **00:00 - 00:20 (20 min) — Píldora Teórica:** ¿Qué hace que una variable sea útil para predecir? Visualización bivariante orientada al target y las limitaciones del coeficiente de Pearson.
* **00:20 - 01:45 (85 min) — Reto Práctico:** «El interrogatorio al Target: Identificando a los sospechosos con mayor poder predictivo».
* **01:45 - 02:00 (15 min) — Cierre y Puesta en Común:** Debate: ¿Qué variables son candidatas inmediatas a ser eliminadas por aportar solo ruido o redundancia?

---

## 📚 Guion de Contenidos a Desarrollar en los Apuntes

### 1. El Objetivo Supremo del EDA en Machine Learning Supervisado
* El dataset no es un fin turístico; el objetivo es **aprender a predecir $y$ a partir de $X$**.
* Pregunta clave que debe guiar cada celda: *«Si yo conozco el valor de la columna $X_i$, ¿cambia significativamente la probabilidad o el valor de $y$?»*.
* Si la distribución de $X_i$ es exactamente la misma cuando $y=0$ que cuando $y=1$, esa variable **no discrimina** (es candidata a no aportar nada al modelo).

### 2. Cruzando Variables contra el Target
* **Variable Numérica vs. Target Categórico:**
  * Boxplots o violinplots comparativos: `sns.boxplot(data=df_train, x='target', y='num_feature')`.
  * Histogramas/KDE superpuestos con `hue='target'`: `sns.kdeplot(data=df_train, x='num_feature', hue='target', common_norm=False)`.
  * Qué buscar: Desplazamiento de medianas y separación de densidades (a mayor separación, mayor poder predictivo).
* **Variable Categórica vs. Target Categórico:**
  * La trampa de mirar frecuencias absolutas vs. relativas.
  * Tablas de contingencia normalizadas por fila:
    ```python
    pd.crosstab(X_train['categoria'], y_train, normalize='index') * 100
    ```
  * Gráficos de barras apiladas de porcentajes o `sns.barplot` mostrando la tasa de incidencia del target por categoría.
* **Variable Numérica vs. Target Continuo (Regresión):**
  * Gráficos de dispersión (`sns.scatterplot`) con línea de tendencia (`sns.regplot`).

### 3. Matrices de Correlación y Multivariante: Cuidado con las Trampas
* **La trampa del Heatmap de correlación:**
  * El coeficiente de correlación de Pearson solo mide relaciones **estrictamente lineales**.
  * Una variable con relación parabólica perfecta con el target puede tener correlación de Pearson $\approx 0$.
  * Explicar visualmente el cuarteto de Anscombe o ejemplos de relaciones no lineales.
* **Multicolinealidad entre predictoras:**
  * Correlaciones muy altas ($|r| > 0.85$) entre dos variables de entrada (ej. `horas_estudio` y `minutos_estudio`, o `ingresos_brutos` e `ingresos_netos`).
  * Por qué perjudica a modelos lineales como regresión logística/lineal (inestabilidad de coeficientes) y cómo justificar la eliminación de una de ellas.
* **Detección temprana de Data Leakage:**
  * Si una variable tiene una correlación de $0.99$ con el target, suele ser una fuga de información encubierta (ej. `motivo_baja` en un problema de abandono).

---

## 💻 Ejercicio / Reto Práctico: «El Interrogatorio al Target»

### Enunciado del Reto
Utilizando `X_train` e `y_train`, los alumnos deben auditar las relaciones bivariantes y encontrar las señales predictivas más prometedoras.

### Tareas a Realizar por el Alumno:
1. **Identificación del Top 3 de variables predictoras:**
   * Cruzar al menos 3 numéricas y 3 categóricas contra el target.
   * Seleccionar las 3 variables que muestran una separación de clases o correlación más evidente.
   * Redactar para cada una el bloque **V-H-A**:
     * **V:** ¿Qué relación espero encontrar?
     * **H:** ¿Qué porcentaje o desplazamiento de medianas observo?
     * **A:** ¿La conservamos con alta prioridad? ¿Requiere alguna transformación específica?
2. **Auditoría de Multicolinealidad:**
   * Calcular la matriz de correlación entre variables numéricas con `X_train.corr()` y renderizar un mapa de calor (`sns.heatmap(annot=True, cmap='coolwarm', vmin=-1, vmax=1)`).
   * Identificar si existen variables redundantes y proponer cuál descartar en el preprocesamiento justificando la elección.
3. **Alerta de Fuga de Información:**
   * Revisar si alguna variable sospechosa se correlaciona de forma casi idéntica con el target y determinar si se trata de un dato que no estaría disponible en el momento de realizar la inferencia en producción.

---

## 🔍 Criterios Docentes y Errores Habituales a Prevenir

:::danger Error clásico a erradicar
Presentar un heatmap gigante de 30 variables como única evidencia de análisis bivariante sin comentar nada más. Forzar al alumno a interpretar parejas concretas de variables y a razonar el significado de negocio de la relación.
:::

</div>
