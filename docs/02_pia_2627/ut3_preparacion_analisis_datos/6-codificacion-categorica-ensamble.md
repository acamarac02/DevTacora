---
draft: true
title: "Preprocesamiento II: Rama Categórica y Ensamble Manual"
sidebar_position: 6
description: "Tratamiento integral de variables cualitativas con Scikit-learn: imputación de texto, codificación con OneHotEncoder y OrdinalEncoder, blindaje ante categorías desconocidas y ensamble manual de matrices."
keywords: ["OneHotEncoder", "OrdinalEncoder", "handle_unknown", "categoricas", "imputacion categorica", "ensamble", "np.hstack"]
---

<div class="justify-text">

# Preprocesamiento II: Rama Categórica y Ensamble Manual

**Duración estimada:** 2 horas (120 minutos)  
**Bloque:** Bloque 3 — Preprocesamiento y Prevención de Data Leakage  
**Entorno de trabajo:** Jupyter Notebook (`.ipynb`) en VS Code / Google Colab  
**Objetivo de la sesión:** Transformar variables cualitativas (texto/categorías) en representaciones numéricas algebraicamente procesables mediante técnicas de imputación y codificación nominal u ordinal, blindar el pipeline ante categorías desconocidas en producción (`handle_unknown='ignore'`) y experimentar la fricción y complejidad de ensamblar manualmente las ramas numérica y categórica mediante `np.hstack`.

---

## ⏱️ Distribución de la Sesión

* **00:00 - 00:25 (25 min) — Píldora Teórica:** Imputación de variables cualitativas, Nominales vs. Ordinales, `OneHotEncoder` vs. `OrdinalEncoder`, la regla sagrada de **no escalar variables dummy** y gestión de categorías desconocidas en producción (`handle_unknown='ignore'`).
* **00:25 - 01:40 (75 min) — Reto Práctico:** «Imputación categórica, codificación, simulación de categorías nuevas en test y unión manual de matrices».
* **01:40 - 02:00 (20 min) — Cierre y Reflexión:** Evidenciar la fragilidad y el «código espagueti» generado al ensamblar arrays de NumPy a mano, preparando el terreno y la necesidad técnica de los *Pipelines* y *ColumnTransformer* (Sesión 8).

---

## 📚 Guion de Contenidos a Desarrollar en los Apuntes

### 1. La Necesidad de Codificar Variables Cualitativas
* Los modelos de Machine Learning no operan con cadenas de texto; realizan operaciones de álgebra lineal (multiplicaciones de matrices y productos escalares).
* La distinción crucial validada en el EDA:
  * **Variables Nominales:** Sin orden intrínseco ni relación de jerarquía (ej. país, canal de captación, estado civil).
  * **Variables Ordinales:** Con jerarquía lógica demostrable (ej. nivel educativo: `Primaria` < `Secundaria` < `Grado` < `Master`).

### 2. Imputación de Variables Categóricas con `SimpleImputer`
* **Estrategias principales:**
  * `strategy='most_frequent'`: Sustituye nulos por la moda de `X_train`. Indicada cuando la ausencia es puramente aleatoria.
  * `strategy='constant'`, `fill_value='Desconocido'`: Crea explícitamente una nueva categoría que preserva la señal de información del valor ausente.

### 3. Codificación Ordinal con `OrdinalEncoder`
* **Uso correcto:** Declarar explícitamente la lista de listas con el orden de las categorías:
  ```python
  from sklearn.preprocessing import OrdinalEncoder

  orden_estudios = [['Primaria', 'Secundaria', 'Grado', 'Master', 'Doctorado']]
  encoder_ord = OrdinalEncoder(categories=orden_estudios)
  ```
* **El error clásico a desterrar:** Usar `LabelEncoder` o asignar enteros arbitrarios (`0, 1, 2`) a variables nominales (ej. `Coche=0`, `Moto=1`, `Camión=2`). El algoritmo asumirá falsamente que un camión vale el doble que un coche o que está numéricamente más próximo a una moto.

### 4. Codificación Nominal con `OneHotEncoder`
* **Mecanismo:** Genera una columna binaria (0 o 1) por cada valor único de la variable categórica.
* **Parámetros clave para entornos reales:**
  * `sparse_output=False`: Devuelve arrays densos de NumPy para facilitar la inspección visual en clase.
  * `handle_unknown='ignore'`: **Parámetro vital de producción.** Si durante el test o en la API de inferencia entra una categoría nunca vista en el entrenamiento (ej. una ciudad nueva), el codificador le asignará todos ceros en lugar de lanzar una excepción fatal (`ValueError`) que tumbe el servicio.
  * `drop='first'` o `drop='if_binary'`: Evita la trampa de la multicolinealidad (*dummy variable trap*) en modelos lineales y ahorra espacio de memoria.

### 5. Regla de Oro: ¿Por qué NUNCA se escalan las Dummies?
* Las variables resultantes de un One-Hot Encoding ya están naturalmente acotadas en $\{0, 1\}$.
* Si se aplica `StandardScaler` sobre una columna dummy:
  * Se destruye su significado booleano directo (deja de ser "0 = No, 1 = Sí").
  * Se destruye la esparcidad de la matriz (*sparsity*).
  * Se introducen valores continuos artificiales (ej. $-0.32$ y $+2.45$).
* El escalado pertenece **única y exclusivamente a la rama numérica continua** (Sesión 5).

### 6. La Fricción del Ensamble Manual de Matrices
* Cómo integrar la rama numérica escalada de la Sesión 5 con la rama categórica codificada de hoy:
  ```python
  import numpy as np

  # Fusión manual de bloques procesados
  X_train_final = np.hstack([X_train_num_scaled, X_train_cat_encoded])
  X_test_final = np.hstack([X_test_num_scaled, X_test_cat_encoded])
  ```
* **Problemas y riesgos de este enfoque artesanal:**
  1. Se pierden por completo los nombres de las columnas de Pandas (se transforma en un array bidimensional anónimo).
  2. Requiere mantener decenas de variables intermedias (`X_train_num_imp`, `X_train_num_scaled`, etc.).
  3. Es extremadamente frágil si cambia el orden o número de las columnas en producción.
  4. Obliga a serializar (`joblib.dump`) 4 o 5 transformadores independientes por separado.

---

## 💻 Ejercicio / Reto Práctico: «Codificación, Prueba de Estrés y Ensamble»

### Enunciado del Reto
Completar el preprocesamiento de `X_train` y `X_test` abordando todas las variables cualitativas, simulando un fallo típico de producción y uniendo el resultado con la matriz numérica obtenida en la Sesión 5.

### Tareas a Realizar por el Alumno:
1. **Imputación cualitativa:**
   * Tratar nulos en variables categóricas con `SimpleImputer` (`strategy='most_frequent'` o `'constant'`).
2. **Codificación estructurada:**
   * Aplicar `OrdinalEncoder` con orden explícito sobre variables ordinales.
   * Aplicar `OneHotEncoder(handle_unknown='ignore')` sobre variables nominales.
3. **La prueba de fuego en producción (Estrés con categoría desconocida):**
   * Crear un registro sintético de test con una categoría inexistente en el conjunto de entrenamiento.
   * Comprobar que `.transform()` codifica dicha fila sin errores asignando ceros en todas las columnas dummies correspondientes.
4. **Ensamble manual de la matriz final:**
   * Unir mediante `np.hstack` la matriz numérica tratada en la Sesión 5 (`X_num_scaled`) con las categóricas codificadas (`X_cat_encoded`).
   * Verificar rigurosamente que las dimensiones finales `(n_filas, n_columnas)` coinciden entre `X_train_final` y `X_test_final`.

---

## 🔍 Criterios Docentes y Errores Habituales a Prevenir

:::tip Intencionalidad didáctica
Permite conscientemente que los alumnos experimenten lo engorroso que resulta mantener tantas variables intermedias y ensamblarlas con `np.hstack`. Esa frustración controlada es la palanca psicológica necesaria para que en la Sesión 8 adopten `ColumnTransformer` y `Pipeline` con entusiasmo.
:::

:::danger Error crítico de evaluación
Usar `LabelEncoder` sobre variables explicativas o aplicar `StandardScaler` sobre la salida de `OneHotEncoder`. Ambos fallos deben corregirse de forma inmediata.
:::

</div>
