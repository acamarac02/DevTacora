---
draft: true
title: "Sesión 4: Calidad del Dato, Detección de Anomalías y Plan de Limpieza"
sidebar_position: 4
description: "Auditoría de valores ausentes explícitos y encubiertos, detección estadística de outliers (IQR) y redacción del Plan de Preprocesamiento."
keywords: ["calidad del dato", "nulos encubiertos", "outliers", "IQR", "duplicados", "plan de limpieza"]
---

<div class="justify-text">

# Sesión 4: Calidad del Dato, Detección de Anomalías y Plan de Limpieza

**Duración estimada:** 1 hora (60 minutos)  
**Bloque:** Bloque 2 — EDA Detective: De la Hipótesis a la Evidencia (Cierre de Bloque)  
**Entorno de trabajo:** Jupyter Notebook (`.ipynb`) en VS Code / Google Colab  
**Objetivo de la sesión:** Localizar problemas de calidad del dato que no se aprecian a simple vista (nulos encubiertos, ceros biológicamente o físicamente imposibles, outliers extremos y duplicados), cerrando la fase de exploración con la **Tabla de Diagnóstico y Plan de Preprocesamiento**.

---

## ⏱️ Distribución de la Sesión

* **00:00 - 00:20 (20 min) — Píldora Teórica:** Nulos encubiertos, la regla del IQR para outliers y cómo estructurar el plan de acción de preprocesamiento.
* **00:20 - 00:50 (30 min) — Reto Práctico:** «Caza de gazapos: Encontrando las 5 trampas ocultas en los datos».
* **00:50 - 01:00 (10 min) — Cierre y Consolidación:** Verificación colectiva de la tabla de acciones antes de pasar al código de Scikit-learn en la siguiente sesión.

---

## 📚 Guion de Contenidos a Desarrollar en los Apuntes

### 1. Los Tres Fantasmas de la Calidad del Dato

#### A. Valores Ausentes: Explícitos vs. Encubiertos
* **Ausentes explícitos:** `NaN`, `None`, reconocidos directamente por Pandas (`df.isna().sum()`).
* **Ausentes encubiertos (La trampa):**
  * Valores numéricos centinela: `-1`, `999`, `-9999` (muy comunes en exportaciones de bases de datos heredadas o COBOL).
  * Ceros imposibles: Glucosa $= 0$, Presión arterial $= 0$, Altura $= 0$.
  * Textos comodín: `"Desconocido"`, `"?"`, `"N/A"`, `"None"`, `"null"`.
* Cómo convertirlos a `np.nan` antes de cualquier imputación: `df['col'].replace({'?': np.nan, 999: np.nan})`.

#### B. Detección Estadística de Valores Atípicos (Outliers)
* **La regla del Rango Intercuartílico (IQR de Tukey):**
  $$\text{IQR} = Q_3 - Q_1$$
  $$\text{Límite Inferior} = Q_1 - 1.5 \times \text{IQR}, \quad \text{Límite Superior} = Q_3 + 1.5 \times \text{IQR}$$
* **¿Error de medición o evento extremo legítimo?**
  * Si la edad es $230 \rightarrow$ Error manifiesto.
  * Si el saldo bancario es $2.000.000 \text{€} \rightarrow$ Cliente real adinerado. No se borra a la ligera: requiere decisiones conscientes (recorte o escalado robusto).

#### C. Duplicados
* Duplicados de fila completa (`df.duplicated().sum()`).
* Duplicados lógicos o de clave primaria: dos filas distintas con el mismo identificador de usuario (`user_id`).

---

### 2. El Artefacto de Cierre del EDA: El «Plan de Preprocesamiento»
* Al terminar el EDA, el alumno **no pasa directamente a programar**. Debe plasmar una tabla de prescripción técnica:

| Columna | Tipo de Dato | Problema Detectado en EDA | Acción Técnica Decidida |
| :--- | :--- | :--- | :--- |
| `edad` | Numérica | Nulos encubiertos con `999` y 5% de NaN | Reemplazar 999 por NaN $\rightarrow$ Imputar con mediana |
| `salario` | Numérica | Asimetría positiva y outliers reales | Imputar con mediana $\rightarrow$ Escalar con `RobustScaler` |
| `ciudad` | Categórica | 120 categorías (alta cardinalidad) | Agrupar ciudades raras en `'Otras'` $\rightarrow$ `OneHotEncoder` |
| `tarifa` | Categórica | Niveles ordenados (`Baja`, `Media`, `Alta`) | `OrdinalEncoder` respetando el orden lógico |

---

## 💻 Ejercicio / Reto Práctico: «Caza de Gazapos y Plan de Limpieza»

### Enunciado del Reto
El dataset de prácticas contiene al menos **5 trampas introducidas intencionadamente**. El alumno debe descubrirlas, justificarlas estadísticamente y redactar la tabla de prescripción técnica completa.

### Tareas a Realizar por el Alumno:
1. **Auditoría de ceros y centinelas:**
   * Localizar columnas numéricas con ceros o valores negativos ilógicos.
   * Documentar cuántos registros representan sobre el total de filas de `X_train`.
2. **Detección de outliers con IQR:**
   * Crear una función en Python que reciba una columna numérica de `X_train` y devuelva el porcentaje de registros fuera de los bigotes de Tukey.
   * Decidir si se trata de anomalías que deben eliminarse, transformarse o mantenerse.
3. **Redacción de la Tabla de Preprocesamiento:**
   * Crear una tabla en Markdown que recoja todas las columnas del dataset y la acción técnica que se aplicará en las siguientes sesiones.

---

## 🔍 Criterios Docentes y Errores Habituales a Prevenir

:::tip Importancia pedagógica
Esta sesión actúa como **bisagra**: conecta la observación visual de las sesiones 2 y 3 con la ingeniería de datos de las sesiones 5 y 6. Ningún alumno debe escribir una sola línea de código en la Sesión 5 sin tener aprobada previamente su tabla de preprocesamiento de la Sesión 4.
:::

</div>
