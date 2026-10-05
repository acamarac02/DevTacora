---
draft: true
title: "Sesión 6: Preprocesamiento II: Codificación Categórica y Outliers"
sidebar_position: 6
description: "Codificación de variables cualitativas con OneHotEncoder y OrdinalEncoder, gestión de categorías desconocidas en producción y técnicas de recorte de outliers."
keywords: ["OneHotEncoder", "OrdinalEncoder", "handle_unknown", "categoricas", "outliers", "winsorizing", "np.hstack"]
---

<div class="justify-text">

# Sesión 6: Preprocesamiento II: Codificación Categórica y Outliers

**Duración estimada:** 2 horas (120 minutos)  
**Bloque:** Bloque 3 — Preprocesamiento y Prevención de Data Leakage  
**Entorno de trabajo:** Jupyter Notebook (`.ipynb`) en VS Code / Google Colab  
**Objetivo de la sesión:** Transformar variables cualitativas (texto/categorías) en representaciones numéricas procesables por algoritmos de Machine Learning, blindar el preprocesamiento ante categorías desconocidas en inferencia y experimentar la complejidad de ensamblar manualmente matrices de datos transformadas.

---

## ⏱️ Distribución de la Sesión

* **00:00 - 00:20 (20 min) — Píldora Teórica:** Nominales vs. Ordinales, `OneHotEncoder` con `handle_unknown='ignore'`, y la trampa de usar números arbitrarios para categorías sin orden.
* **00:20 - 01:45 (85 min) — Reto Práctico:** «Codificación de variables, simulación de categorías nuevas en test y unión manual de matrices».
* **01:45 - 02:00 (15 min) — Cierre y Reflexión:** Evidenciar el «código espagueti» generado al unir matrices numéricas y categóricas a mano (preparando el terreno para los Pipelines de la Sesión 8).

---

## 📚 Guion de Contenidos a Desarrollar en los Apuntes

### 1. La Necesidad de Codificar Variables Cualitativas
* Los algoritmos de Machine Learning operan mediante operaciones algebraicas sobre matrices. No pueden calcular productos escalares sobre strings como `"Madrid"` o `"Frecuente"`.
* La distinción crucial aprendida en el EDA:
  * **Variables Nominales:** Sin orden intrínseco (ej. tipo de dispositivo, país, género).
  * **Variables Ordinales:** Con jerarquía lógica demostrable (ej. nivel de satisfacción: `Bajo` < `Medio` < `Alto`).

### 2. `OneHotEncoder` de Scikit-learn
* **Mecanismo:** Crea una columna binaria (0 o 1) por cada valor único de la categoría.
* **Parámetros clave de producción:**
  * `sparse_output=False`: Para devolver arrays densos de NumPy fáciles de inspeccionar en clase.
  * `handle_unknown='ignore'`: **Parámetro vital en ingeniería de IA.** Si entra un registro en test o en la API de producción con una categoría nunca vista durante el entrenamiento (ej. una ciudad nueva), el codificador le asignará todos ceros en lugar de lanzar una excepción fatal (`ValueError`) que tumbe el servicio.
  * `drop='first'`: Evita la trampa de la multicolinealidad (*dummy variable trap*) en modelos lineales descartando la primera columna de referencia.

### 3. `OrdinalEncoder` y Cuándo NO Usarlo
* **Uso correcto:** Declarar explícitamente la secuencia ordenada:
  ```python
  from sklearn.preprocessing import OrdinalEncoder

  orden_estudios = [['Primaria', 'Secundaria', 'Grado', 'Master', 'Doctorado']]
  encoder_ord = OrdinalEncoder(categories=orden_estudios)
  ```
* **El error común:** Usar `LabelEncoder` o `OrdinalEncoder` sin orden sobre variables nominales (ej. `Coche=0`, `Moto=1`, `Camión=2`). El algoritmo interpretará falsamente que un camión es el doble de un coche o que está numéricamente más cerca de una moto.

### 4. Tratamiento Limpio de Outliers: Truncado (Clipping / Winsorizing)
* Cuando el EDA demostró que los valores extremos son datos reales y no queremos eliminarlos para no perder observaciones:
* **Técnica de *Clipping*:** Recortar los valores más allá del percentil 1 y 99 o de los límites del IQR ($Q_1 - 1.5\text{IQR}$, $Q_3 + 1.5\text{IQR}$):
  ```python
  limite_inf = X_train['ingresos'].quantile(0.01)
  limite_sup = X_train['ingresos'].quantile(0.99)
  X_train['ingresos_clipped'] = X_train['ingresos'].clip(limite_inf, limite_sup)
  ```

### 5. La Fricción del Ensamble Manual
* Mostrar a los alumnos cómo unir la matriz numérica escalada y la matriz categórica codificada:
  ```python
  import numpy as np

  # Fusión manual de bloques transformados
  X_train_final = np.hstack([X_train_num_scaled, X_train_cat_encoded])
  X_test_final = np.hstack([X_test_num_scaled, X_test_cat_encoded])
  ```
* Analizar los problemas de este enfoque:
  * Se pierden los nombres de las columnas de Pandas.
  * Requiere gestionar manualmente decenas de variables intermedias.
  * Es altamente susceptible a errores humanos si cambia el orden de las columnas en producción.

---

## 💻 Ejercicio / Reto Práctico: «Codificación y Prueba de Estrés en Producción»

### Enunciado del Reto
Completar el preprocesamiento de `X_train` y `X_test` aplicando la codificación categórica apropiada y probando la robustez del código.

### Tareas a Realizar por el Alumno:
1. **Imputación y codificación categórica:**
   * Imputar nulos en columnas categóricas con `SimpleImputer(strategy='most_frequent')` o `'constant', fill_value='Desconocido'`.
   * Aplicar `OneHotEncoder(handle_unknown='ignore')` sobre las nominales.
   * Aplicar `OrdinalEncoder(categories=...)` sobre al menos una variable ordinal del dataset especificando el orden lógico.
2. **La prueba de fuego (Simulación de producción):**
   * Crear un registro sintético nuevo que represente a un cliente de una región/categoría jamás vista en el entrenamiento.
   * Ejecutar `.transform()` con el codificador y verificar que no genera error y codifica la nueva categoría con ceros en todas las columnas dummies.
3. **Unión de la matriz final:**
   * Unir las variables numéricas procesadas en la Sesión 5 con las categóricas procesadas hoy mediante `np.hstack`.
   * Comprobar que las dimensiones finales `(n_filas, n_características)` coinciden en `X_train_final` y `X_test_final`.

---

## 🔍 Criterios Docentes y Errores Habituales a Prevenir

:::tip Intencionalidad didáctica
Permite conscientemente que los alumnos experimenten lo tedioso que resulta mantener `X_train_num_imputed`, `X_train_num_scaled`, `X_train_cat_encoded` y luego ensamblarlos. Esa frustración controlada es la palanca psicológica que hará que en la Sesión 8 adopten los Pipelines con entusiasmo.
:::

</div>
