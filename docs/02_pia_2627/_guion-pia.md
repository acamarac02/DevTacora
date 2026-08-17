Yo dejaría definitivamente las **200 horas** así:

# Estructura definitiva

| UT      | Unidad                             |     Horas | Entorno Principal |
| ------- | ---------------------------------- | --------: | ----------------- |
| **UT0** | Introducción a la IA               |   **2 h** | Aula (Teoría)     |
| **UT1** | Python para IA                     |  **20 h** | VS Code (Local)   |
| **UT2** | Preparación y análisis de datos    |  **25 h** | Ambos             |
| **UT3** | Machine Learning                   |  **35 h** | Ambos             |
| **UT4** | Deep learning                      |  **30 h** | Google Colab      |
| **UT5** | Computer Vision                    |  **20 h** | VS Code (Local)   |
| **UT6** | NLP y Transformers                 |  **20 h** | Ambos             |
| **UT7** | LLMs e IA Generativa               |  **28 h** | VS Code (Local)   |
| **UT8** | RAG y Agentes                      |  **20 h** | VS Code (Local)   |
|         | **TOTAL**                          | **200 h** |                   |

---

# UT0 — Introducción a la IA

## 2 horas

### Entorno de trabajo principal
* **Aula / Presentación (Teoría):** Se fundamenta la base conceptual histórica y la taxonomía del módulo.

### Bloque único — 2 h
* Historia y evolución de la IA.
* Áreas principales (aprendizaje supervisado, no supervisado, PLN, visión por computador, voz).
* Casos de uso reales e impacto de la IA en la industria contemporánea.

---

# UT1 — Python para IA

## 20 horas

### Entorno de trabajo principal
* **VS Code (Local):** Es indispensable trabajar en un entorno local para configurar variables de entorno, gestionar el ciclo de puertos de FastAPI y utilizar Docker Desktop.

### Bloque 0 — Python para IA — 12 h

*Como los alumnos ya dominan Java y JavaScript, la transición sintáctica será rápida. Se prioriza la configuración profesional del entorno y la motivación práctica.*

* **Sesión inicial de motivación (Día 1):** Antes de profundizar en la sintaxis, realizar una práctica guiada rápida: clonar un repositorio y ejecutar en VS Code un script de 5 líneas con un pipeline de Hugging Face para realizar clasificación de imágenes o análisis de sentimiento. Esto genera un efecto interactivo inmediato.
* **Configuración del entorno local:** VS Code, instalación de Python local, creación de entornos virtuales con `venv`, uso del gestor de paquetes `pip` y uso de `requirements.txt`.

#### Python básico
* Sintaxis e indentación
* Variables y tipos de datos
* Strings y F-strings
* `None`
* Operadores y condicionales
* Bucles (`range`, `enumerate`, `zip`)

#### Estructuras de datos
* `list`, `tuple`, `dict` y `set`
* Slicing
* List comprehensions y Dictionary comprehensions

#### Funciones y POO
* Parámetros (valores por defecto, `*args`, `**kwargs`)
* Retorno y expresiones Lambda
* POO básica (clases, objetos, constructor `__init__`, métodos e herencia)

#### Introducción muy básica a datos
* Qué son NumPy, Pandas y Matplotlib (breve aproximación sintáctica; la manipulación profunda y análisis se traslada a la UT2).

---

## Bloque 1 — Ciclo de vida de una aplicación de IA — 1 h

**Teoría exclusivamente.**

```text
Problema
 ↓
Datos
 ↓
EDA
 ↓
Preprocesamiento
 ↓
Feature Engineering
 ↓
Modelo
 ↓
Optimización
 ↓
Evaluación
 ↓
API
 ↓
Docker
 ↓
Deploy
```

Este esquema será el **mapa conceptual de todo el curso**.

---

## Bloque 2 — FastAPI — 4 h

* HTTP y arquitectura REST (GET, POST, JSON)
* Creación de endpoints (Request y Response)
* Validación de datos y tipado con Pydantic
* Documentación interactiva automática con Swagger (`/docs`)
* Construcción de la primera API de ejemplo

---

## Bloque 3 — Docker — 3 h

* Conceptos básicos: Imagen vs. Contenedor
* Escritura de un Dockerfile optimizado para Python
* Comandos esenciales: `build` y `run`
* Configuración de puertos y variables de entorno

**Resultado del bloque:**
```text
FastAPI → Docker → API REST
```

---

# UT2 — Preparación y análisis de datos

## 25 horas

### Entorno de trabajo principal
* **Ambos (Google Colab + VS Code):** Se utiliza Google Colab para la exploración visual de datos (EDA) por su facilidad para renderizar gráficos de Seaborn y documentar descubrimientos de forma ágil. Se utiliza VS Code para escribir scripts de preprocesamiento limpios, clases personalizadas de transformación y la orquestación de Pipelines de scikit-learn.

### Flujo metodológico
```text
Dataset
 ↓
EDA
 ↓
Preprocessing
 ↓
Feature Engineering
 ↓
Pipeline
 ↓
Dataset preparado
```

---

## Bloque 1 — Entender el dataset — 3 h

* Anatomía de un dataset (Observaciones, Features, Target)
* Tipos de variables (Numéricas, categóricas, ordinales, nominales)
* División de datos: Train/Test split

### Pandas esencial
* Lectura de datos (`read_csv`, etc.)
* Inspección básica (`head`, `info`, `describe`, `shape`, `dtypes`)
* Selección, filtrado y ordenación (`sort_values`)
* Agrupaciones (`groupby`) y combinación de datasets (`merge`)

---

## Bloque 2 — EDA (Análisis Exploratorio de Datos) — 7 h

* **Estadística descriptiva:** Media, mediana, moda, percentiles, varianza y desviación típica.
* **Visualización de distribuciones:** Histogramas, boxplots y gráficos de dispersión.
* **Análisis de relaciones:** Matriz de correlación y scatter plots.
* **Detección de problemas en datos reales:** Valores nulos/ausentes, duplicados, outliers, inconsistencias y errores de formato.
* **Herramientas de visualización:** Matplotlib y Seaborn.
* **Práctica:** Limpieza de un dataset real que contiene problemas deliberados.

---

## Bloque 3 — Preprocesamiento — 6 h

* **Missing values:** Eliminación e imputación táctica (`SimpleImputer`).
* **Escalado de variables numéricas:** `StandardScaler`, `MinMaxScaler` y `RobustScaler`.
* **Codificación de variables categóricas:** `OneHotEncoder` y `OrdinalEncoder`.
* **Data Leakage (Fuga de datos):** Comprensión teórica y práctica de por qué es un error grave realizar transformaciones antes del Train/Test split.

---

## Bloque 4 — Feature Engineering — 5 h

* Creación de nuevas variables útiles (extracciones temporales de fechas, combinaciones matemáticas y binning)
* Selección de características de entrada (*Feature Selection*):
  * Filtros basados en correlación
  * `VarianceThreshold`
  * `SelectKBest`

---

## Bloque 5 — Pipelines — 4 h

Integración ordenada de todo el flujo en scikit-learn:
```text
Datos → Imputer → Scaler → Encoder → Feature Engineering → Modelo
```

* Clases clave: `Pipeline` y `ColumnTransformer`.
* **Regla metodológica obligatoria:**
  * ❌ Incorrecto: Escalar todo el dataset y luego dividir en Train/Test.
  * ✅ Correcto: Dividir primero, entrenar (`fit`) el pipeline solo con Train, y aplicar (`transform`) en Test.
* **Mini-proyecto:** Preparar y transformar completamente un dataset real, exportando el pipeline resultante sin entrenar todavía ningún modelo complejo.

---

# UT3 — Machine Learning

## 35 horas

### Entorno de trabajo principal
* **Ambos (Google Colab + VS Code):** Google Colab se emplea para probar diferentes algoritmos iterativamente, graficar métricas de comparación e implementar optimizaciones de hiperparámetros de manera visual. VS Code se utilizará para el proyecto final de la unidad, empaquetando el mejor modelo obtenido en una estructura limpia de producción.

### Metodología de aprendizaje
> **Cada modelo se enseña → se entrena → se evalúa → se optimiza → se compara.**

---

## Bloque 1 — Introducción a ML — 2 h

* Definición de Machine Learning
* Aprendizaje supervisado vs. No supervisado
* Taxonomía básica: Clasificación, Regresión y Clustering

---

## Bloque 2 — Clasificación — 14 h

### 2.1 Regresión logística
* Fundamento matemático intuitivo, probabilidades y límites de decisión (*decision boundary*).
* Evaluación de modelos de clasificación:
  * Métricas: Accuracy, Precision, Recall, F1-Score.
  * Herramientas de diagnóstico: Matriz de confusión, curvas ROC y métrica ROC-AUC.
* Optimización de hiperparámetros: Cross-validation, `GridSearchCV` y `RandomizedSearchCV`.

### 2.2 KNN (K-Nearest Neighbors)
* Conceptos de distancia y número de vecinos.
* Sensibilidad al escalado y optimización de hiperparámetros.

### 2.3 Decision Trees (Árboles de decisión)
* Conceptos de nodo, entropía, impureza de Gini y profundidad.
* Control del sobreajuste mediante hiperparámetros (`max_depth`, `min_samples_split`).

### 2.4 Random Forest
* Concepto de ensamble, Bagging, Bootstrap y selección aleatoria de features.
* Parámetros clave: `n_estimators`, `max_features` y `min_samples_leaf`.

### 2.5 Gradient Boosting / XGBoost
* Concepto de boosting e iteración sobre clasificadores débiles.
* Parámetros clave: `learning_rate` y `n_estimators`.

### 2.6 SVM (Support Vector Machines)
* Concepto de margen máximo, vectores de soporte y truco del kernel.

---

## Bloque 3 — Regresión — 9 h

* **Algoritmos principales:** Regresión Lineal (con regularización Ridge y Lasso), KNN Regressor, Árboles de Regresión, Random Forest Regressor y XGBoost.
* **Evaluación de regresores:** MAE, MSE, RMSE y coeficiente de determinación R².
* Comparación sistemática de algoritmos de regresión sobre un mismo problema.

---

## Bloque 4 — Aprendizaje No Supervisado — 6 h

* **K-Means:** Centroides y optimización del número de clusters (método del codo y Silhouette Score).
* **DBSCAN:** Agrupación basada en densidad, parámetros de proximidad (`eps`) y manejo del ruido.
* **Clustering Jerárquico:** Dendrogramas y agrupaciones estructurales.

---

## Bloque 5 — Proyecto de integración ML — 4 h

Desarrollo y entrega de un flujo completo:
```text
Dataset → EDA → Preprocesamiento → Pipeline → Selección de Modelos → Tuning → Evaluación → API (FastAPI) → Docker
```

---

# UT4 — Deep learning

## 30 horas

### Entorno de trabajo principal
* **Google Colab:** Se recomienda enfáticamente por el acceso simplificado y gratuito a aceleración por hardware (GPU), fundamental para reducir los tiempos de entrenamiento de redes neuronales profundas y de transferencia de aprendizaje.

* **Nota de alineación con la industria:** Se utilizará Keras 3 como interfaz de programación intuitiva de alto nivel, pero se vinculará teóricamente con PyTorch, que actúa como el backend dominante del sector.

---

## Bloque 1 — Fundamentos de redes neuronales — 4 h

* Neurona artificial (perceptrón), pesos, sesgo (bias) y funciones de activación (ReLU, Sigmoide, Softmax, Tanh).
* Procesos de Forward Propagation, cálculo de la función de pérdida (Loss) y optimizadores.

---

## Bloque 2 — Creación de modelos con TensorFlow/Keras — 6 h

* Arquitectura de datos: Tensores, dimensiones (shapes) e introducción al cálculo en GPU.
* API Secuencial y API Funcional.
* Capas básicas (`Dense`, `Input`).
* Ciclo clásico de Keras: `compile()`, `fit()`, `evaluate()` y `predict()`.

---

## Bloque 3 — Entrenamiento y Regularización — 6 h

* Batch size, épocas, Learning Rate y algoritmos de optimización (Adam, SGD).
* Backpropagation y validación.
* Diagnóstico de problemas: Overfitting vs. Underfitting.
* Soluciones prácticas: Dropout, EarlyStopping, regularizadores L1/L2 y BatchNormalization.

---

## Bloque 4 — TensorBoard y experimentación — 3 h

* Monitoreo y registro de curvas de pérdida y precisión en tiempo real.
* Comparación de experimentos y ajuste fino de hiperparámetros.

---

## Bloque 5 — Redes Neuronales Convolucionales (CNN) — 6 h

* Capas de convolución, filtros, feature maps, padding, stride y Pooling.
* Aplanado de datos (`Flatten`) y arquitectura típica de una CNN para clasificación de imágenes.

---

## Bloque 6 — Transfer Learning — 5 h

* Reutilización de arquitecturas preentrenadas (MobileNet, EfficientNet).
* Estrategias: Extracción de características (*Feature Extraction*) y ajuste fino (*Fine-tuning*).

**Proyecto práctico:** Clasificador de imágenes empaquetado en una API REST Dockerizada:
```text
Keras (Saved Model) → API REST (FastAPI) → Contenedor (Docker)
```

---

# UT5 — Computer Vision

## 20 horas

### Entorno de trabajo principal
* **VS Code (Local):** OpenCV requiere interactuar de forma directa con periféricos de hardware local (como la cámara web del ordenador) y mostrar flujos gráficos interactivos. Además, la inferencia y entrenamiento local de YOLO se integra mejor en un entorno de desarrollo local.

---

## Bloque 1 — OpenCV — 3 h

* Lectura, manipulación y guardado de imágenes y vídeo.
* Operaciones fundamentales: espacios de color (BGR/RGB), redimensionado, recorte y aplicación de filtros básicos.
* Detección de bordes (Threshold y Contours).

---

## Bloque 2 — Data Augmentation — 2 h

* Técnicas de distorsión para robustecer modelos: Rotación, Zoom, Flip y alteración de brillo.
* Estrategias de aplicación en proyectos con pocos datos.

---

## Bloque 3 — Detección de Objetos con YOLO — 8 h

* Diferencia entre clasificación de imágenes y detección de objetos.
* Conceptos clave: Bounding Boxes, confianza, IoU (Intersection over Union) y NMS (Non-Maximum Suppression).
* Etiquetado de datasets personalizados.
* Entrenamiento básico, Fine-tuning e inferencia en tiempo real en flujos de vídeo.

---

## Bloque 4 — Segmentación — 2 h

* Concepto de segmentación semántica vs. segmentación de instancias.
* Uso práctico de máscaras para recortar objetos exactos.

---

## Bloque 5 — OCR (Reconocimiento Óptico de Caracteres) — 5 h

* Detección y lectura de textos en documentos e imágenes.
* Estructuración y extracción de información de campos clave.

**Proyecto práctico de la unidad:** Sistema automatizado de procesamiento y digitalización de facturas/documentos físicos.

---

# UT6 — NLP y Transformers

## 20 horas

### Entorno de trabajo principal
* **Ambos (Google Colab + VS Code):** Google Colab se empleará para realizar las pruebas de tokenización y ejecutar el fine-tuning rápido de modelos Transformers utilizando recursos de GPU en la nube. VS Code se utilizará para programar la lógica del servicio web de clasificación.

---

## Bloque 1 — NLP clásico — 3 h

* Procesos básicos: Tokenización, Stopwords, Stemming y Lemmatization.
* Representación numérica clásica: Bag of Words (BoW) y TF-IDF.

---

## Bloque 2 — Embeddings — 4 h

* Concepto de representaciones vectoriales densas.
* Cálculo de similitudes vectoriales utilizando la similitud del coseno.

---

## Bloque 3 — Arquitectura Transformer — 6 h

* Limitaciones de las redes recurrentes tradicionales.
* El mecanismo de atención y autoatención (*self-attention*).
* Estructura del Transformer (Encoder y Decoder).
* Modelos representativos: BERT y GPT.

---

## Bloque 4 — Hugging Face Ecosystem — 5 h

* Descarga de modelos desde el Model Hub.
* Uso de Tokenizers y pipelines preconstruidos para tareas comunes:
  * Análisis de sentimiento
  * Clasificación de textos
  * Reconocimiento de entidades nombradas (NER)
* Ajuste fino (*Fine-tuning*) básico para tareas de clasificación de texto.

---

## Bloque 5 — Proyecto práctico — 2 h

**Clasificador automático de tickets de soporte técnico:**
```text
Ticket entrante → Inferencia Transformer → Asignación de Categoría, Prioridad y Departamento
```

---

# UT7 — LLMs e IA Generativa

## 28 horas

### Entorno de trabajo principal
* **VS Code (Local):** El desarrollo de integraciones complejas con APIs de LLM, el manejo de variables de entorno de forma segura (`.env`) y la validación estructurada de datos con Pydantic requieren el uso de un entorno local e interactivo.

---

## Bloque 1 — Fundamentos de los LLMs — 4 h

* Concepto de LLMs autorregresivos.
* Ciclo de tokens, embeddings y ventana de contexto.
* Diferencia entre Pre-entrenamiento, Instruction Tuning e inferencia.
* Hiperparámetros de generación: Temperatura y muestreo (sampling).

---

## Bloque 2 — Integración de APIs de LLMs — 6 h

* Llamadas a APIs y gestión de variables de entorno seguras.
* Estructuración del contexto: System Prompt, User Prompt e historial de conversación.
* Manejo de streaming de respuestas y control de cuotas/límites de uso.

---

## Bloque 3 — Prompt Engineering — 4 h

* Técnicas avanzadas: Few-shot prompting, restricciones explícitas de salida y plantillas de prompts.
* Métodos sistemáticos para la evaluación de la calidad de los prompts.

---

## Bloque 4 — Structured Outputs (Salidas estructuradas) — 5 h

* Garantía de esquemas estructurados usando Pydantic en las respuestas de los LLMs.
* Extracción y tipado automático de datos complejos a formato JSON.

```text
Documento PDF → Inferencia LLM → Esquema Pydantic → Aplicación de negocio
```

---

## Bloque 5 — Function Calling / Tool Calling — 5 h

* Habilitación de herramientas para que el LLM decida autónomamente cuándo y cómo usarlas.

```text
Usuario → LLM → Identificación de Tool → Ejecución Python local → Retorno de datos → Respuesta final
```
* Prácticas: APIs externas de consulta de stock y consultas básicas a bases de datos relacionales.

---

## Bloque 6 — Modelos Open Source y Ejecución Local — 4 h

* Uso prioritario de **Ollama** para orquestar y ejecutar modelos de lenguaje locales (Llama 3.1, Phi-3).
* Esto permite evitar la dependencia exclusiva de APIs de pago externas, facilitando un entorno de laboratorio gratuito, seguro y sin conexión a internet.
* Introducción conceptual a la cuantización de modelos y técnicas de adaptación de bajo rango (LoRA/PEFT).

---

# UT8 — RAG y Agentes

## 20 horas

### Entorno de trabajo principal
* **VS Code (Local):** Es la mejor opción para interactuar con bases de datos vectoriales persistidas en disco de forma local (como Chroma DB), gestionar flujos interactivos de entrada/salida y crear agentes automatizados que ejecuten código del sistema.

---

## Bloque 1 — RAG (Retrieval-Augmented Generation) — 8 h

* Limitaciones de los modelos estáticos: Alucinaciones y corte temporal de conocimiento.
* Arquitectura técnica del flujo RAG:
```text
Documentos locales → Chunking (y solapamiento) → Embeddings → Base de Datos Vectorial → Recuperación (Retrieval) → Prompt Contextualizado → LLM
```

---

## Bloque 2 — Vector Databases — 2 h

* Manejo de la base de datos vectorial local **Chroma DB**.
* Conceptos de indexación de vectores, búsqueda de similitud y filtrado por metadatos.
* Mención y diferencias conceptuales con FAISS, Qdrant y Pinecone.

---

## Bloque 3 — Implementación de RAG — 6 h

* **Aproximación inicial "Nativa":** Para asegurar la comprensión técnica, los alumnos programarán primero un flujo RAG completo utilizando Python puro y conectando directamente la API del LLM con el cliente local de Chroma DB.
* **Aproximación con Frameworks:** Una vez asentada la lógica subyacente, se presentará el uso de herramientas de abstracción como **LangChain** o **LlamaIndex** para agilizar y robustecer las implementaciones.
* **Proyecto:** Chatbot documental capaz de citar fuentes exactas y declinar respuestas si no constan en el contexto provisto.

---

## Bloque 4 — Agentes Inteligentes — 4 h

* Qué es un agente autónomo y diferencia con flujos predefinidos.
* Diseño del bucle de ejecución de agentes (Agent Loop) y persistencia de memoria de conversación.
* **Proyecto práctico:** Agente resolutivo local capaz de buscar en la documentación, hacer cálculos matemáticos y responder al usuario.

---

# Arquitectura de Proyecto Estándar (Evolutiva)

Para garantizar un estándar de calidad profesional, todos los proyectos del curso a partir de la **UT2** deberán organizarse bajo la misma estructura física de directorios. Los estudiantes irán refactorizando e incorporando nuevas piezas sobre este esqueleto a medida que progrese el curso:

```text
proyecto/
│
├── data/                    # Datasets originales y procesados (excluidos en .gitignore)
├── notebooks/               # Cuadernos de experimentación (Google Colab o Jupyter)
│
├── src/                     # Código fuente de lógica de negocio
│   ├── preprocessing.py     # Limpieza de datos, codificaciones y escalados
│   ├── model.py             # Definición y entrenamiento de modelos de IA
│   └── inference.py         # Carga del modelo persistido y pipeline de predicción
│
├── models/                  # Binarios serializados (.pkl, .h5, etc.)
│
├── app/                     # Lógica de la interfaz de servicios
│   └── main.py              # Endpoints construidos en FastAPI
│
├── tests/                   # Pruebas unitarias y de integración
│
├── Dockerfile               # Instrucciones de empaquetado del contenedor
├── requirements.txt         # Dependencias del proyecto
├── .env.example             # Plantilla para variables de entorno requeridas
├── .gitignore               # Exclusiones de archivos pesados y credenciales
└── README.md                # Documentación del proyecto y guía de ejecución
```

De esta manera, el aprendizaje progresa sobre una arquitectura robusta:
* **UT2:** Preprocesamiento → Pipeline de datos estructurado.
* **UT3:** Pipeline de datos + Clasificador ML → FastAPI → Docker.
* **UT4:** Pipeline de imágenes + CNN Keras → FastAPI → Docker.
* **UT5:** Procesamiento de vídeo/imágenes + YOLO → FastAPI → Docker.
* **UT6/UT7:** Procesamiento de texto + Modelos Locales (Ollama) → FastAPI → Docker.
* **UT8:** Orquestación de Agentes y RAG → FastAPI → Docker.
