---
draft: true
title: "Guía Didáctica y Metodología de la UT3"
sidebar_position: 0
description: "Estructura general, temporalización (15 horas) y metodología docente para la UT3: Preparación y análisis de datos."
keywords: ["UT3", "guia docente", "EDA", "preprocesamiento", "machine learning", "pipelines", "metodologia"]
---

<div class="justify-text">

# UT3. Preparación y análisis de datos

**Duración total:** 15 horas lectivas  
**Ubicación temporal:** 1ª Evaluación (Antesala directa a la UT4: Machine Learning clásico)  
**Entorno de trabajo:** Híbrido progresivo — Jupyter Notebooks (`.ipynb`) en VS Code / Colab para exploración y análisis visual, evolucionando hacia scripts modulares de Python (`.py`) y serialización (`.joblib`) para puesta en producción.

---

## 🎯 Justificación y Enfoque Pedagógico

En proyectos reales de Inteligencia Artificial, entre el **70% y el 80% del tiempo** de ingeniería se invierte en comprender, limpiar y preparar los datos. Los modelos de Machine Learning no poseen sentido común: si se les alimenta con datos erróneos, sesgados o mal escalados, generarán predicciones deficientes (**«Garbage In, Garbage Out»**).

### El problema identificado en cursos anteriores
El error formativo más común en el EDA (Análisis Exploratorio de Datos) es convertir la sesión en una **«galería de gráficos aislados»**: los alumnos aprenden la sintaxis de `sns.histplot` o `sns.boxplot`, generan decenas de celdas visuales inconexas, pero **no extraen conclusiones ni saben qué hacer con las columnas** a la hora de entrenar un modelo.

### Principios metodológicos de este curso

1. **La regla «No Graph Without Markdown» (Fórmula V-H-A):**  
   Ninguna visualización se da por válida sin un bloque Markdown inferior estructurado en tres puntos:
   * **V (Visualización):** ¿Qué pregunta o hipótesis estamos validando?
   * **H (Hallazgo):** ¿Qué patrón, asimetría, valor extremo o sesgo se observa en los datos?
   * **A (Acción):** ¿Qué decisión técnica de preprocesamiento se tomará al respecto?
2. **Datasets con trampas del mundo real:**  
   Se evitarán datasets limpios «de juguete» (tipo Iris o Wine). Se utilizará un dataset unificado con anomalías premeditadas (nulos encubiertos como `-1` o `999`, valores atípicos absurdos, erratas de tipado categórico y potencial *Data Leakage*).
3. **El EDA como «hoja de ruta» del Preprocesamiento:**  
   El EDA es el diagnóstico médico; el preprocesamiento es el tratamiento. El alumno aprende que solo se transforma lo que previamente se ha diagnosticado.
4. **Preprocesamiento primero a mano, luego automatizado con Pipelines:**  
   Se enseñan primero los estimadores individuales de Scikit-learn (`SimpleImputer`, `StandardScaler`, `OneHotEncoder`) para afianzar el contrato `fit()` vs. `transform()` y el peligro del *Data Leakage*. Una vez comprendido el coste del código manual repetitivo, se introduce el `ColumnTransformer` y `Pipeline` como la solución arquitectónica limpia.
5. **Estructura fija de cada sesión:**  
   * **20 minutos:** Píldora teórica guiada y demostración docente de un concepto clave.
   * **Resto de la sesión (60-100 min):** Reto práctico autónomo/por parejas sobre el dataset de trabajo, cerrando con puesta en común de conclusiones.

---

## 🗺️ Mapa de Sesiones y Temporalización (15 Horas)

| Sesión | Archivo | Bloque Temático | Horas | Formato Principal |
| :---: | :--- | :--- | :---: | :--- |
| **S1** | `1-ciclo-vida-anatomia-datos.md` | Ciclo de Vida y Anatomía del Dataset | 2 h | Notebook (`.ipynb`) |
| **S2** | `2-eda-univariante.md` | EDA Univariante y Distribuciones | 2 h | Notebook (`.ipynb`) |
| **S3** | `3-eda-bivariante-multivariante.md` | EDA Bivariante y Relación con el Target | 2 h | Notebook (`.ipynb`) |
| **S4** | `4-calidad-datos-anomalias.md` | Auditoría de Calidad: Outliers y Nulos | 1 h | Notebook (`.ipynb`) |
| **S5** | `5-preprocesamiento-imputacion-escalado.md` | Preprocesamiento I: Imputación y Escalado | 2 h | Notebook (`.ipynb`) |
| **S6** | `6-codificacion-categorica-outliers.md` | Preprocesamiento II: Categóricas y Outliers | 2 h | Notebook (`.ipynb`) |
| **S7** | `7-feature-engineering-seleccion.md` | Feature Engineering y Selección de Features | 2 h | Notebook (`.ipynb`) |
| **S8** | `8-pipelines-columntransformer.md` | Pipelines de Scikit-learn y Producción | 2 h | Notebook $\rightarrow$ Script `.py` |

---

## 📦 Entregable de la Unidad (Proyecto Mini-Integrador)

Al finalizar la UT3, cada alumno habrá construido un artefacto completo dividido en dos partes:
1. **Informe Forense de Datos (Notebook):** Diagnóstico EDA justificado con hipótesis, gráficos y la tabla de decisiones de preprocesamiento.
2. **Pipeline de Producción (`prepare_data.py` + `pipeline.joblib`):** Código modular limpio que recibe datos brutos y devuelve la matriz lista para entrenar los modelos de la UT4, exportado mediante `joblib`.

</div>
