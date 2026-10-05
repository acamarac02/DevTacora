---
draft: true
title: "Sesión 7: Feature Engineering y Selección de Características"
sidebar_position: 7
description: "Creación de nuevas variables basadas en conocimiento de dominio (ratios, temporales, binning) y selección de características mediante filtros estadísticos."
keywords: ["feature engineering", "seleccion de variables", "SelectKBest", "VarianceThreshold", "mutual_info", "ratios", "dominio"]
---

<div class="justify-text">

# Sesión 7: Feature Engineering y Selección de Características

**Duración estimada:** 2 horas (120 minutos)  
**Bloque:** Bloque 4 — Feature Engineering y Selección de Características  
**Entorno de trabajo:** Jupyter Notebook (`.ipynb`) en VS Code / Google Colab  
**Objetivo de la sesión:** Transformar el conocimiento de negocio adquirido durante el EDA en nuevas variables con alto poder predictivo (ingeniería de características) y aplicar filtros estadísticos para eliminar variables redundantes o carentes de varianza previa al modelado.

---

## ⏱️ Distribución de la Sesión

* **00:00 - 00:20 (20 min) — Píldora Teórica:** La diferencia entre datos brutos e información predictiva, creación de ratios/temporales y métodos de selección con Scikit-learn (`VarianceThreshold`, `SelectKBest`).
* **00:20 - 01:45 (85 min) — Reto Práctico:** «Diseño de 2 variables de impacto y criba estadística de ruido».
* **01:45 - 02:00 (15 min) — Cierre y Puesta en Común:** Demostración de cómo una variable sintética bien diseñada supera en correlación con el target a todas las columnas originales.

---

## 📚 Guion de Contenidos a Desarrollar en los Apuntes

### 1. ¿Qué es el Feature Engineering?
* Andrew Ng: *«El machine learning aplicado es básicamente feature engineering»*.
* Los algoritmos aprenden combinaciones matemáticas, pero facilitarle relaciones lógicas directas simplifica enormemente el aprendizaje del modelo y reduce el sobreajuste.
* La regla de oro: **No inventar columnas a ciegas; derivarlas de hipótesis de negocio contrastadas en el EDA.**

### 2. Patrones Comunes de Creación de Características
* **Ratios y proporciones relativas:**
  * En lugar de darle al modelo `deuda_total` e `ingreso_anual` por separado, crear `ratio_endeudamiento = deuda_total / (ingreso_anual + 1)`.
  * En comercio electrónico: `gasto_medio_por_pedido = gasto_total / total_pedidos`.
* **Transformaciones temporales:**
  * Un modelo no puede ingerir un string `"2026-10-04"`.
  * Extraer componentes cíclicos: `dia_semana`, `mes`, `es_fin_de_semana`.
  * Calcular diferencias de tiempo acumuladas: `antiguedad_cliente_dias = (fecha_corte - fecha_alta).dt.days`.
* **Discretización (*Binning*):**
  * Agrupar variables continuas en tramos lógicos (ej. tramos de edad: Joven, Adulto, Senior) mediante `pd.cut` o `KBinsDiscretizer` cuando la relación con el target cambia de forma discontinua.

### 3. El Peligro del Exceso de Variables: La Maldición de la Dimensionalidad
* Añadir variables sin criterio diluye la densidad de los datos en el espacio euclídeo, incrementa el tiempo de cómputo y aumenta el riesgo de que el modelo aprenda correlaciones espurias (ruido).
* Necesidad de aplicar **Selección de Características (Feature Selection)**.

### 4. Filtros Estadísticos en Scikit-learn
* **Eliminación por baja varianza (`VarianceThreshold`):**
  * Si una columna tiene el mismo valor en el 99.9% de las filas, no aporta ninguna señal predictiva:
    ```python
    from sklearn.feature_selection import VarianceThreshold

    selector_var = VarianceThreshold(threshold=0.01)
    X_train_var = selector_var.fit_transform(X_train_num)
    ```
* **Selección supervisada univariante (`SelectKBest`):**
  * Evalúa la relación estadística individual de cada característica con el target $y$ y conserva las $k$ mejores:
    * **Para Clasificación:** `f_classif` (ANOVA F-test) o `mutual_info_classif` (información mutua, capaz de captar relaciones no lineales).
    * **Para Regresión:** `f_regression` o `mutual_info_regression`.
  * Inspección de variables seleccionadas:
    ```python
    from sklearn.feature_selection import SelectKBest, mutual_info_classif

    selector = SelectKBest(score_func=mutual_info_classif, k=10)
    X_train_kbest = selector.fit_transform(X_train, y_train)

    # Conocer qué columnas se conservaron
    mascara = selector.get_support()
    ```

---

## 💻 Ejercicio / Reto Práctico: «Ingeniería de Hipótesis y Criba Estadística»

### Enunciado del Reto
Los alumnos deben crear nuevas variables en `X_train` (y replicar la misma lógica en `X_test`), evaluar su aportación y realizar una criba con Scikit-learn.

### Tareas a Realizar por el Alumno:
1. **Diseño de dos nuevas características con sentido de negocio:**
   * Crear al menos un **ratio** o combinación matemática entre dos numéricas.
   * Crear al menos una **transformación temporal o de agrupación lógica**.
   * Escribir un bloque Markdown justificando la hipótesis que motivó la creación de cada variable.
2. **Validación visual de la nueva variable:**
   * Realizar un gráfico bivariante contra el target para comprobar si la nueva variable ofrece una separación superior a las columnas brutas de origen.
3. **Criba de características con `SelectKBest`:**
   * Aplicar `SelectKBest` para seleccionar las 8 características más informativas.
   * Extraer e imprimir el ranking de puntuaciones (`selector.scores_`).
   * Redactar una conclusión: ¿Se colaron las nuevas variables creadas en el Top 8?

---

## 🔍 Criterios Docentes y Errores Habituales a Prevenir

:::tip Conexión con la UT4
Aclara a los alumnos que la selección de características también puede realizarse más adelante de forma intrínseca mediante la importancia de variables de modelos basados en árboles (Random Forest) o coeficientes L1 (Lasso). En esta unidad sentamos las bases de los métodos de filtrado rápido independientes del modelo.
:::

</div>
