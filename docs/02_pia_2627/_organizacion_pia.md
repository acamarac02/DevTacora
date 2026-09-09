# Organización Semanal del Curso (2026-2027) — Planificación Ajustada

Esta planificación distribuye las **200 horas lectivas** del módulo de **Programación de Inteligencia Artificial (PIA)** a lo largo de las semanas reales del calendario académico de Extremadura, iniciando el **5 de octubre de 2026** y finalizando el **27 de mayo de 2027**.

Esta versión del calendario ha sido optimizada para:
1. **Adelantar y finalizar la UT3 antes del 16 de diciembre de 2026**, garantizando que todos los trabajos evaluables del primer trimestre se entreguen antes de esa fecha límite.
2. **Priorizar el desarrollo de APIs (Flask / FastAPI) y Docker en la UT1 (15 h)**. Se ha condensado drásticamente la sintaxis básica de Python (ya que los alumnos conocen Java/JS) a 5 horas, dejando 5 horas completas para el diseño de APIs REST y 4 horas para la contenedorización con Docker.
3. **Condensar la UT2 (15 h)** para evitar extenderse en elementos simples de preprocesamiento (como el uso aislado de imputadores).
4. **Implementar una estructura de Aprendizaje Cooperativo (Flipped Classroom)** en la UT3, donde el profesor imparte fundamentos/métricas y los alumnos investigan, exponen y demuestran en código los algoritmos por grupos, consolidándolos después sobre sus datasets.
5. **Expandir las unidades de IA Generativa y Agentes** (UT7 a 39 h y UT8 a 25 h) en el tercer trimestre, aprovechando las horas liberadas de la fase inicial.

---

## Resumen del Calendario y Horas por Evaluación

| Trimestre / Evaluación | Semanas Lectivas | Fechas Aproximadas | Horas Totales | Unidades de Trabajo (UT) |
|---|---|---|---|---|
| **1ª Evaluación** | 11 semanas | 5 oct - 15 dic | **66 h** | UT0, UT1, UT2, UT3 |
| **2ª Evaluación** | 12 semanas | 16 dic - 18 mar (Resuelve tras Navidad) | **73 h** | UT4, UT5, UT6 (Inicio) |
| **3ª Evaluación** | 9 semanas | 30 mar - 27 may (Resuelve tras S. Santa) | **61 h** | UT6 (Fin), UT7, UT8 |
| **Total Curso** | **32 semanas lectivas** | **5 oct - 27 may** | **200 h** | **UT0 a UT8** |

---

## Detalle Semanal

### 📅 Primer Trimestre (1ª Evaluación) — 66 Horas Mapeadas (Límite: 15 de Diciembre)

#### Semana 1 (05/10/2026 a 08/10/2026) — 7 horas lectivas
* **UT0 — Introducción a la IA (2 h):** 
  * *Lunes (2h):* Presentación de la asignatura. Historia, evolución, áreas principales y casos de uso prácticos en la industria.
* **UT1 — Python para IA (Flask/FastAPI + Docker) (5 h):** 
  * *Martes (2h):* **Bloque 0 (Python básico y Ecosistema).** Sesión de motivación en local: clonar y ejecutar un script de 5 líneas con Hugging Face. Configuración de VS Code y entorno local (Python, `venv`).
  * *Miércoles (2h):* **Bloque 0 cont.** Sintaxis condensada de Python (condicionales, bucles rápidos, `range`, `enumerate`, `zip`) y colecciones nativas (listas, tuplas, conjuntos, diccionarios, slicing y comprehensions).
  * *Jueves (1h):* **Bloque 0 cont.** Funciones y POO básica (clases, `__init__`, herencia), y gestión de dependencias (`pip`, `requirements.txt`).

#### Semana 2 (12/10/2026 a 15/10/2026) — 5 horas lectivas
* **UT1 — Python para IA (Flask/FastAPI + Docker) (5 h):**
  * *Lunes (0h):* **FESTIVO NACIONAL (Día de la Hispanidad)** — Sin clases.
  * *Martes (2h):* **Bloque 1 (Ciclo de vida - 1h):** Explicación del flujo de un proyecto de IA (Datos → EDA → Pipeline → Modelo → API → Docker → Deploy). **Bloque 2 (APIs con Flask/FastAPI - 1h):** Conceptos HTTP y arquitectura REST (GET/POST, JSON).
  * *Miércoles (2h):* **Bloque 2 cont.** Creación de endpoints y enrutamiento con Flask/FastAPI. Validación estricta con Pydantic.
  * *Jueves (1h):* **Bloque 2 cont.** Generación y testeo interactivo de documentación OpenAPI / Swagger.

#### Semana 3 (19/10/2026 a 22/10/2026) — 7 horas lectivas
* **UT1 — Python para IA (Flask/FastAPI + Docker) (5 h):**
  * *Lunes (2h):* **Bloque 2 cont. (1h):** Práctica integradora: crear una pasarela de datos HTTP en Flask/FastAPI. **Bloque 3 (Dockerización - 1h):** Conceptos de contenedor vs. imagen y escritura del Dockerfile para la API creada.
  * *Martes (2h):* **Bloque 3 cont.** Comandos esenciales de Docker (`build`, `run`), mapeo de puertos y gestión de variables de entorno locales.
  * *Miércoles (1h):* **Bloque 3 cont.** Contenedorización de la API de Flask/FastAPI en local y prueba de consumo desde cliente externo. *Fin de la UT1 (15h totales)*.
* **UT2 — Preparación y análisis de datos (2 h):**
  * *Miércoles (1h cont.):* **Bloque 1 (Entender el dataset y Pandas).** Conceptos de features, target y división Train/Test split.
  * *Jueves (1h):* Carga e inspección de datasets reales con Pandas (`read_csv`, `head`, `info`, `describe`).

#### Semana 4 (26/10/2026 a 29/10/2026) — 7 horas lectivas
* **UT2 — Preparación y análisis de datos (7 h):**
  * *Lunes (2h):* Indexación condicional, filtrados complejos, agrupamientos (`groupby`) y fusiones (`merge`) de datos con Pandas.
  * *Martes (2h):* **Bloque 2 (EDA).** Análisis Exploratorio de Datos. Estadística descriptiva básica en Colab.
  * *Miércoles (2h):* Visualizaciones rápidas de distribuciones de datos: histogramas, boxplots y mapas de calor de correlaciones lineales con Seaborn/Matplotlib.
  * *Jueves (1h):* Detección y limpieza práctica de duplicados, valores nulos lógicos y outliers.

#### Semana 5 (02/11/2026 a 05/11/2026) — 5 horas lectivas
* **UT2 — Preparación y análisis de datos (5 h):**
  * *Lunes (0h):* **FESTIVO AUTONÓMICO (Traslado de Todos los Santos)** — Sin clases.
  * *Martes (2h):* **Bloque 3 (Preprocesamiento).** Imputación ágil de nulos (`SimpleImputer`), escalado de variables (`StandardScaler`, `MinMaxScaler`) y codificación de categóricas (`OneHotEncoder`).
  * *Miércoles (2h):* Comprensión y prevención del **Data Leakage** (Fuga de datos). **Bloque 4 (Feature Engineering - 1h):** Creación de variables lógicas.
  * *Jueves (1h):* **Bloque 4 cont.** Selección de variables rápida usando filtros estadísticos (`VarianceThreshold`, `SelectKBest`).

#### Semana 6 (09/11/2026 a 12/11/2026) — 7 horas lectivas
* **UT2 — Preparación y análisis de datos (1 h):**
  * *Lunes (1h):* **Bloque 5 (Pipelines).** Orquestación de transformaciones mediante `Pipeline` y `ColumnTransformer` en scikit-learn. Cierre y exportación del pipeline de preprocesamiento. *Fin de la UT2 (15h totales)*.
* **UT3 — Machine Learning (6 h) — [BLOQUE DE REGRESIÓN]**
  * *Lunes (1h cont.):* **Fase 1 (Conceptos):** Introducción al aprendizaje supervisado de regresión y funciones de pérdida.
  * *Martes (2h):* **Fase 1 cont.:** Explicación y cálculo matemático intuitivo de las métricas comunes: MAE, MSE, RMSE y R².
  * *Miércoles (2h):* **Fase 2 (Flipped Classroom - Preparación):** Presentación de la metodología. División de los alumnos por grupos y asignación de los modelos a investigar. Búsqueda de información y preparación del código de demo local (Colab / VS Code).
  * *Jueves (1h):* **Fase 2 (Flipped Classroom - Exposiciones):** Exposición del **Grupo 1: Regresión Lineal con regularización (Ridge y Lasso)**. Explicación del funcionamiento interno y demo práctica.

#### Semana 7 (16/11/2026 a 19/11/2026) — 7 horas lectivas
* **UT3 — Machine Learning (7 h) — [BLOQUE DE REGRESIÓN]**
  * *Lunes (2h):* **Fase 2 cont. (Exposiciones):** Exposición del **Grupo 2: KNN Regressor** y del **Grupo 3: Árboles de Decisión para Regresión**.
  * *Martes (2h):* **Fase 2 cont. (Exposiciones):** Exposición del **Grupo 4: Ensambles (Random Forest y XGBoost Regressor)** y del **Grupo 5: SVR (Support Vector Regression)**.
  * *Miércoles (2h):* **Fase 3 (Consolidación):** Laboratorio práctico: Cada grupo aplica de forma cruzada todos los algoritmos de regresión expuestos por sus compañeros a su propio dataset, ajustando hiperparámetros.
  * *Jueves (1h):* **Fase 3 cont.:** Comparación final de métricas obtenidas por los modelos de regresión y selección del mejor estimador.

#### Semana 8 (23/11/2026 a 26/11/2026) — 7 horas lectivas
* **UT3 — Machine Learning (7 h) — [BLOQUE DE CLASIFICACIÓN]**
  * *Lunes (2h):* **Fase 1 (Conceptos):** Bases de los problemas de clasificación, umbrales de decisión y probabilidad. Métricas comunes: Accuracy, Precision, Recall, F1-Score y matriz de confusión.
  * *Martes (2h):* **Fase 1 cont.:** Curvas ROC, métrica ROC-AUC. Fundamentos de Validación Cruzada (*Cross-validation*) y búsquedas sistemáticas (`GridSearchCV`, `RandomizedSearchCV`). Repartición de modelos de clasificación en grupos de trabajo.
  * *Miércoles (2h):* **Fase 2 (Flipped Classroom - Exposiciones):** Exposición del **Grupo 1: Regresión Logística** y del **Grupo 2: KNN Classifier**.
  * *Jueves (1h):* **Fase 2 cont. (Exposiciones):** Exposición del **Grupo 3: Árboles de Decisión para Clasificación**.

#### Semana 9 (30/11/2026 a 03/12/2026) — 7 horas lectivas
* **UT3 — Machine Learning (7 h) — [BLOQUE DE CLASIFICACIÓN]**
  * *Lunes (2h):* **Fase 2 cont. (Exposiciones):** Exposición del **Grupo 4: Random Forest Classifier** y del **Grupo 5: XGBoost Classifier**.
  * *Martes (2h):* **Fase 2 cont. (Exposiciones):** Exposición del **Grupo 6: SVM (Support Vector Machines) para Clasificación**.
  * *Miércoles (2h):* **Fase 3 (Consolidación):** Laboratorio práctico: Los grupos aplican todos los algoritmos clasificadores sobre sus respectivos conjuntos de datos utilizando GridSearchCV para optimizar hiperparámetros.
  * *Jueves (1h):* **Fase 3 cont.:** Visualización de métricas comparativas: curvas de precisión-recall, curvas ROC y análisis de las matrices de confusión de cada modelo.

#### Semana 10 (07/12/2026 a 10/12/2026) — 3 horas lectivas
* **UT3 — Machine Learning (3 h) — [BLOQUE NO SUPERVISADO]**
  * *Lunes (0h):* **FESTIVO NACIONAL (Traslado de la Constitución)** — Sin clases.
  * *Martes (0h):* **FESTIVO NACIONAL (Inmaculada Concepción)** — Sin clases.
  * *Miércoles (2h):* **Fase 1 (Conceptos y Flipped):** Fundamentos del aprendizaje no supervisado y clustering. Exposición del **Grupo 1: K-Means** (centroides, distancia euclídea, codo y silueta) y del **Grupo 2: DBSCAN** (densidad y ruido).
  * *Jueves (1h):* **Fase 1 cont.:** Exposición del **Grupo 3: Clustering Jerárquico** (dendrogramas).

#### Semana 11 (14/12/2026 a 17/12/2026) — 7 horas lectivas (Límite de Entrega)
* **UT3 — Machine Learning (4 h):**
  * *Lunes (2h):* **Fase 2 (Proyecto de Cierre):** Laboratorio de integración final. Los alumnos empaquetan el pipeline preprocesado y el mejor clasificador/regresor final dentro de un servidor Flask o FastAPI Dockerizado.
  * *Martes (2h):* **Presentaciones y defensa final de los Proyectos de ML.** Entrega de los repositorios ordenados (código estructurado, Dockerfile y README.md) antes de finalizar el día. *Fin de la UT3 (34h totales) e hito de entrega de la 1ª Evaluación*.
* **UT4 — Deep learning (3 h):**
  * *Miércoles (2h):* Introducción a las redes neuronales artificiales, perceptrón simple, pesos, bias y Forward Propagation.
  * *Jueves (1h):* Funciones de activación comunes (Sigmoide, Tanh, ReLU, Softmax).

---

### 📅 Segundo Trimestre (2ª Evaluación) — 73 Horas Mapeadas

#### Semana 12 (21/12/2026 a 24/12/2026) — 4 horas lectivas
* **UT4 — Deep learning (4 h):**
  * *Lunes (2h):* Retropropagación (*Backpropagation*) y optimización de gradientes.
  * *Martes (2h):* Conceptos tensoriales: dimensiones, arrays en GPU y API Secuencial de Keras.
  * *Miércoles (0h):* **VACACIONES DE NAVIDAD** — Sin clases.
  * *Jueves (0h):* **VACACIONES DE NAVIDAD** — Sin clases.

#### 🎄 Semana 13 y Semana 14 — VACACIONES DE NAVIDAD
* *Periodo de descanso vacacional (del 23 de diciembre de 2026 al 7 de enero de 2027, ambos inclusive).*

#### Semana 15 (11/01/2027 a 14/01/2027) — 7 horas lectivas
* **UT4 — Deep learning (7 h):**
  * *Lunes (2h):* Declaración de modelos funcionales en Keras mediante la API Funcional.
  * *Martes (2h):* Compilación e inicialización de modelos (`compile()`, `fit()`).
  * *Miércoles (2h):* Optimización básica: selección de optimizadores avanzados (Adam, SGD) y tamaño de lote (*batch size*).
  * *Jueves (1h):* Diagnóstico de curvas de pérdida y precisión en Keras.

#### Semana 16 (18/01/2027 a 21/01/2027) — 7 horas lectivas
* **UT4 — Deep learning (7 h):**
  * *Lunes (2h):* Regularización de redes profundas: Dropout y penalizaciones L1/L2.
  * *Martes (2h):* Callbacks esenciales en Keras: detención temprana (`EarlyStopping`) y guardado automático de checkpoints.
  * *Miércoles (2h):* Capas de BatchNormalization para optimizar tiempos de entrenamiento.
  * *Jueves (1h):* Instrumentación y seguimiento gráfico de entrenamientos con TensorBoard.

#### Semana 17 (25/01/2027 a 28/01/2027) — 7 horas lectivas
* **UT4 — Deep learning (7 h):**
  * *Lunes (2h):* Fundamentos de imágenes digitales y limitaciones de capas densas. Introducción a redes neuronales convolucionales (CNN).
  * *Martes (2h):* Capas de Convolución 2D: filtros de extracción, kernels de paso, padding y stride.
  * *Miércoles (2h):* Capas de Pooling (MaxPooling2D), aplanamiento de características (Flatten) y acoplamiento a densas.
  * *Jueves (1h):* Implementación de una arquitectura CNN de clasificación de imágenes en Google Colab.

#### Semana 18 (01/02/2027 a 04/02/2027) — 7 horas lectivas
* **UT4 — Deep learning (2 h):**
  * *Lunes (2h):* Transfer Learning en clasificación de imágenes: MobileNet/EfficientNet, Fine-tuning de capas avanzadas y exportación de modelos. *Fin de la UT4 (30h totales)*.
* **UT5 — Computer Vision (5 h):**
  * *Martes (2h):* Introducción a OpenCV: carga y manipulación física de imágenes, BGR/RGB, redimensionado de píxeles y recortes de ROI.
  * *Miércoles (2h):* Binarizaciones de imagen (*Thresholding*), filtros de desenfoque y detección clásica de bordes/contornos.
  * *Jueves (1h):* Captura de flujos de vídeo dinámicos interactuando localmente con cámaras web.

#### Semana 19 (08/02/2027 a 11/02/2027) — 3 horas lectivas
* **UT5 — Computer Vision (3 h):**
  * *Lunes (0h):* **FESTIVO DE CARNAVAL (Lunes de Carnaval)** — Sin clases.
  * *Martes (0h):* **FESTIVO DE CARNAVAL (Martes de Carnaval)** — Sin clases.
  * *Miércoles (2h):* Data Augmentation en Visión Artificial: transformaciones espaciales, rotaciones y variaciones lumínicas.
  * *Jueves (1h):* Detección de objetos: bounding boxes, confianza, métrica IoU y supresión de no máximos (NMS).

#### Semana 20 (15/02/2027 a 18/02/2027) — 7 horas lectivas
* **UT5 — Computer Vision (7 h):**
  * *Lunes (2h):* Arquitectura YOLO (You Only Look Once). Comparación teórica de rendimiento e inferencia básica.
  * *Martes (2h):* Etiquetado de un conjunto de datos personalizado usando herramientas visuales locales.
  * *Miércoles (2h):* Ajuste fino (*Fine-tuning*) de un detector YOLO en local o Google Colab.
  * *Jueves (1h):* Inferencia y detección de objetos sobre flujos de vídeo en tiempo real.

#### Semana 21 (22/02/2027 a 25/02/2027) — 7 horas lectivas
* **UT5 — Computer Vision (5 h):**
  * *Lunes (2h):* Segmentación semántica e individualización de instancias. Máscaras y recortes geométricos.
  * *Martes (2h):* Reconocimiento Óptico de Caracteres (OCR). Laboratorio: lectura de textos estructurados y procesamiento de facturas en local.
  * *Miércoles (1h):* Empaquetado en API de inferencia de visión (YOLO/OCR) en local y contenedorización con Docker. *Fin de la UT5 (20h totales)*.
* **UT6 — NLP y Transformers (2 h):**
  * *Miércoles (1h cont.):* Introducción al Procesamiento del Lenguaje Natural (PLN). Tokenización y limpieza básica (Stopwords, Lemmatization).
  * *Jueves (1h):* Representación numérica clásica: Bag of Words y TF-IDF.

#### Semana 22 (01/03/2027 a 04/03/2027) — 7 horas lectivas
* **UT6 — NLP y Transformers (7 h):**
  * *Lunes (2h):* Conceptos de embeddings de texto, distancias semánticas y cálculo de similitud mediante coseno.
  * *Martes (2h):* Limitaciones de redes secuenciales recurrentes y surgimiento del mecanismo de autoatención (*self-attention*).
  * *Miércoles (2h):* Estructura base del Transformer: codificador (Encoder) y decodificador (Decoder). Modelos BERT y GPT.
  * *Jueves (1h):* El ecosistema Hugging Face: descargas del Model Hub y uso interactivo de tokenizadores locales.

#### Semana 23 (08/03/2027 a 11/03/2027) — 7 horas lectivas
* **UT6 — NLP y Transformers (7 h):**
  * *Lunes (2h):* Uso de la abstracción `pipeline` de Hugging Face para Sentiment Analysis y NER.
  * *Martes (2h):* Laboratorio: Fine-tuning básico de un modelo clasificador de textos usando GPU en la nube.
  * *Miércoles (2h):* **Lanzamiento del Mini-Proyecto: Clasificador de Tickets de Soporte.** Definición de datos de entrada, etiquetas y estructuración.
  * *Jueves (1h):* Laboratorio: Carga de datos y entrenamiento del clasificador en Colab.

#### Semana 24 (15/03/2027 a 18/03/2027) — 7 horas lectivas
* **UT6 — NLP y Transformers (4 h):**
  * *Lunes (2h):* Laboratorio: Exportación del modelo entrenado y programación del módulo de inferencia en VS Code.
  * *Martes (2h):* Cierre y entrega del mini-proyecto clasificador en Flask/FastAPI Dockerizado. *Fin de la 2ª Evaluación*.
* **UT7 — LLMs e IA Generativa (3 h):**
  * *Miércoles (2h):* Fundamentos de los LLMs autorregresivos, embeddings semánticos y ventana de contexto.
  * *Jueves (1h):* Hiperparámetros de control de generación: Temperatura y técnicas de muestreo (sampling).

#### ⛪ Semana 25 — VACACIONES DE SEMANA SANTA
* *Periodo de descanso vacacional (del 20 al 29 de marzo de 2027, ambos inclusive).*

---

### 📅 Tercer Trimestre (3ª Evaluación) — 61 Horas Mapeadas

#### Semana 26 (29/03/2027 a 01/04/2027) — 5 horas lectivas
* **UT7 — LLMs e IA Generativa (5 h):**
  * *Lunes (0h):* **FESTIVO NACIONAL (Lunes de Pascua)** — Sin clases.
  * *Martes (2h):* APIs comerciales (OpenAI, Anthropic): flujo de peticiones estructuradas y gestión segura de API keys.
  * *Miércoles (2h):* Definición del contexto de conversación: System Prompt, User Prompt e historial de chat.
  * *Jueves (1h):* Streaming de respuestas y control de límites de consumo.

#### Semana 27 (05/04/2027 a 08/04/2027) — 7 horas lectivas
* **UT7 — LLMs e IA Generativa (7 h):**
  * *Lunes (2h):* Prompt Engineering avanzado: Few-shot prompting, restricciones semánticas y plantillas de prompts.
  * *Martes (2h):* Métodos empíricos para la evaluación de prompts de forma consistente.
  * *Miércoles (2h):* Salidas estructuradas (Structured Outputs): limitaciones del texto plano y uso del formato JSON.
  * *Jueves (1h):* Validación de salidas de LLMs usando esquemas de Pydantic.

#### Semana 28 (12/04/2027 a 15/04/2027) — 7 horas lectivas
* **UT7 — LLMs e IA Generativa (7 h):**
  * *Lunes (2h):* Laboratorio: Construcción de un script en local que procesa PDFs crudos y extrae esquemas tipados JSON vía Pydantic.
  * *Martes (2h):* Function Calling: teoría de la habilitación de herramientas lógicas para LLMs.
  * *Miércoles (2h):* Mapeo de parámetros y esquemas JSON Schema para la definición de funciones locales.
  * *Jueves (1h):* Orquestación local: ejecución en Python de la función detectada e inyección al modelo.

#### Semana 29 (19/04/2027 a 22/04/2027) — 7 horas lectivas
* **UT7 — LLMs e IA Generativa (7 h):**
  * *Lunes (2h):* Laboratorio práctico: LLM interactuando localmente con bases de datos para responder consultas del usuario.
  * *Martes (2h):* Introducción a modelos Open Source locales y su relevancia estratégica.
  * *Miércoles (2h):* Orquestación de inferencia local: instalación, configuración y ejecución de **Ollama** en local.
  * *Jueves (1h):* Inferencia interactiva local con modelos ligeros de código abierto (`Llama 3.1 8B` o `Phi-3`).

#### Semana 30 (26/04/2027 a 29/04/2027) — 7 horas lectivas
* **UT7 — LLMs e IA Generativa (7 h):**
  * *Lunes (2h):* Laboratorio de Ollama: Conexión del servidor local de Ollama con código Python local para estructurar salidas.
  * *Martes (2h):* Optimización de modelos Open Source: conceptos de cuantización de pesos.
  * *Miércoles (2h):* Introducción teórica al ajuste fino eficiente de parámetros (PEFT / LoRA).
  * *Jueves (1h):* Caso práctico de comparación de rendimiento de modelos comerciales vs. locales. *Fin de la UT7 (39h totales)*.

#### Semana 31 (03/05/2027 a 06/05/2027) — 7 horas lectivas
* **UT8 — RAG y Agentes (7 h):**
  * *Lunes (2h):* Limitaciones de los modelos de lenguaje estáticos: alucinaciones y obsolescencia temporal. Introducción conceptual al flujo RAG.
  * *Martes (2h):* Particionamiento de documentos (*chunking*) y solapamientos lógicos (*overlap*). Generación de embeddings densos de fragmentos.
  * *Miércoles (2h):* Bases de datos vectoriales locales: conceptos de almacenamiento persistente en **Chroma DB**.
  * *Jueves (1h):* Indexación de vectores locales y búsquedas por similitud cromática.

#### Semana 32 (10/05/2027 a 13/05/2027) — 7 horas lectivas
* **UT8 — RAG y Agentes (7 h):**
  * *Lunes (2h):* **Implementación de RAG Nativo:** Programación del flujo en Python puro interactuando directamente con el cliente local de Chroma DB y el SDK del LLM (Ollama).
  * *Martes (2h):* Pruebas y depuración local del RAG nativo: análisis de la relevancia de los fragmentos inyectados.
  * *Miércoles (2h):* Introducción y orquestación de flujos RAG ágiles mediante frameworks de abstracción: **LangChain** o **LlamaIndex**.
  * *Jueves (1h):* Laboratorio: Construcción de un chatbot corporativo sobre manuales de mantenimiento persistidos localmente.

#### Semana 33 (17/05/2027 a 20/05/2027) — 7 horas lectivas
* **UT8 — RAG y Agentes (7 h):**
  * *Lunes (2h):* Fundamentos de Agentes Inteligentes autónomos. Bucles de ejecución de agentes (*Agent Loop*) y almacenamiento de memoria.
  * *Martes (2h):* Diseño e implementación de un Agente resolutivo local dotado de herramientas (búsqueda RAG, calculadora, llamada a API).
  * *Miércoles (2h):* Depuración del agente y prevención de bucles recursivos infinitos (*Guardrails*).
  * *Jueves (1h):* Empaquetado y dockerización local de la aplicación del agente.

#### Semana 34 (24/05/2027 a 27/05/2027) — 4 horas lectivas
* **UT8 — RAG y Agentes (4 h):**
  * *Lunes (2h):* **Cierre de proyectos prácticos finales.** Demostraciones de agentes resolutivos desplegados en contenedores locales.
  * *Martes (2h):* Evaluación final y revisión de portafolios prácticos de los alumnos. *Fin de la UT8 (25h totales) y fin del curso*.
