Yo dejaría definitivamente las **200 horas** así:

# Estructura definitiva

| UT      | Unidad                             |     Horas | Entorno Principal |
| ------- | ---------------------------------- | --------: | ----------------- |
| **UT0** | Introducción a la IA               |   **2 h** | Aula (Teoría)     |
| **UT1** | Python para IA (Flask/FastAPI + Docker) | **15 h** | VS Code (Local)   |
| **UT2** | Preparación y análisis de datos    |  **15 h** | Ambos             |
| **UT3** | Machine Learning                   |  **34 h** | Ambos             |
| **UT4** | Deep learning                      |  **30 h** | Google Colab      |
| **UT5** | Computer Vision                    |  **20 h** | VS Code (Local)   |
| **UT6** | NLP y Transformers                 |  **20 h** | Ambos             |
| **UT7** | LLMs e IA Generativa               |  **39 h** | VS Code (Local)   |
| **UT8** | RAG y Agentes                      |  **25 h** | VS Code (Local)   |
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

# UT1 — Python para IA (Flask/FastAPI + Docker)

## 15 horas (Enfoque Práctico Condensado)

### Entorno de trabajo principal
* **VS Code (Local):** Es indispensable trabajar en un entorno local para configurar variables de entorno, gestionar el ciclo de puertos de las APIs (Flask / FastAPI) y utilizar Docker Desktop.

### Bloque 0 — Python básico y Ecosistema — 5 h

*Dado que los alumnos provienen de conocer Java y JavaScript, la sintaxis básica, operadores y estructuras de control se condensan al máximo para centrar el esfuerzo en APIs y contenedorización.*

* **Sesión inicial de motivación (Día 1):** Antes de profundizar en la sintaxis, realizar una práctica guiada rápida: clonar un repositorio y ejecutar en VS Code un script de 5 líneas con un pipeline de Hugging Face para realizar clasificación de imágenes o análisis de sentimiento. Esto genera un efecto interactivo inmediato.
* **Configuración del entorno local:** VS Code, instalación de Python local, creación de entornos virtuales con `venv`, uso del gestor de paquetes `pip` y uso de `requirements.txt`.
* **Sintaxis y POO Condensada:**
  * Variables, tipos de datos primarios, strings y f-strings.
  * Condicionales y bucles rápidos (`range`, `enumerate`, `zip`).
  * Estructuras de datos clave (`list`, `tuple`, `dict`, comprehensions).
  * Funciones (parámetros y lambdas) y POO básica (clases, `__init__`, métodos e herencia).
  * Introducción sintáctica muy básica a NumPy, Pandas y Matplotlib (su uso real se traslada a la UT2).

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

## Bloque 2 — APIs con Flask / FastAPI — 5 h

* Conceptos HTTP y arquitectura REST (GET, POST, JSON).
* Creación de endpoints y enrutamiento con Flask y FastAPI.
* Validación estricta de esquemas de datos y tipado con Pydantic.
* Generación y consumo de documentación Swagger/OpenAPI.
* Práctica: Construcción de una API que actúe como pasarela y reciba/devuelva JSON.

---

## Bloque 3 — Dockerización de APIs — 4 h

* Conceptos básicos: Imagen vs. Contenedor.
* Escritura de un Dockerfile optimizado para Python (Flask/FastAPI).
* Comandos esenciales de Docker: `build` y `run`.
* Mapeo de puertos, configuración de volúmenes y gestión de variables de entorno locales.

**Resultado del bloque:**
```text
Flask / FastAPI → Docker → API REST
```

---

# UT2 — Preparación y análisis de datos

## 15 horas (Unidad Condensada)

### Entorno de trabajo principal
* **Ambos (Google Colab + VS Code):** Se utiliza Google Colab para la exploración visual de datos (EDA) por su facilidad para renderizar gráficos de Seaborn y documentar descubrimientos de forma ágil. Se utiliza VS Code para escribir scripts de preprocesamiento limpios, clases personalizadas de transformación y la orquestación de Pipelines de scikit-learn.

### Flujo metodológico
```text
Dataset → EDA → Preprocessing → Feature Engineering → Pipeline → Dataset preparado
```

---

## Bloque 1 — Entender el dataset y Pandas esencial — 2 h

* Anatomía de un dataset (Observaciones, Features, Target) y divisiones del conjunto (Train/Test split).
* Carga y manipulación ágil en Pandas (`read_csv`, `head`, `info`, `describe`, `shape`).
* Indexaciones condicionales, filtrados, agrupamientos (`groupby`) y fusiones (`merge`).

---

## Bloque 2 — EDA (Análisis Exploratorio de Datos) — 4 h

* Estadística descriptiva (media, mediana, percentiles, desviación típica).
* Visualización rápida de distribuciones mediante Seaborn y Matplotlib: histogramas, boxplots y mapas de calor de correlaciones lineales.
* Detección de problemas en datasets reales: valores ausentes, duplicados y outliers.

---

## Bloque 3 — Preprocesamiento y Data Leakage — 4 h

* **Missing values:** Tratamiento ágil e imputación rápida empleando `SimpleImputer` (evitando extenderse demasiado).
* **Escalados y transformaciones:** Uso guiado de `StandardScaler`, `MinMaxScaler` y codificaciones categóricas (`OneHotEncoder`, `OrdinalEncoder`).
* **Data Leakage (Fuga de datos):** Comprensión teórica e importancia de realizar las transformaciones únicamente tras el Train/Test split.

---

## Bloque 4 — Feature Engineering y Selection — 3 h

* Creación de variables lógicas (temporales, binning).
* Selección de características de entrada usando filtros estadísticos (`VarianceThreshold`, `SelectKBest`).

---

## Bloque 5 — Orquestación de Pipelines — 2 h

* Integración del preprocesamiento mediante las clases `Pipeline` y `ColumnTransformer` en scikit-learn.
* **Mini-proyecto de unidad:** Exportar un pipeline completo de transformación de datos sin entrenar todavía ningún modelo complejo, asegurando la limpieza metodológica del flujo.

---

# UT3 — Machine Learning

## 34 horas (Estructura de Aprendizaje Cooperativo / Flipped Classroom)

### Entorno de trabajo principal
* **Ambos (Google Colab + VS Code):** Se utiliza Google Colab para el análisis rápido de algoritmos, visualización de fronteras de decisión y ejecución iterativa de búsquedas de hiperparámetros. VS Code se utilizará para el proyecto final de la unidad, empaquetando el mejor modelo obtenido en una estructura limpia de producción.

### Metodología de aprendizaje
* **Flipped Classroom:** El profesor expone las bases del tipo de problema y las métricas comunes a todos los modelos. Después, los alumnos por parejas o grupos investigan un modelo asignado, preparan una presentación de su funcionamiento interno y realizan una demostración práctica en código al resto de compañeros.
* **Consolidación:** Posteriormente, cada grupo aplica el resto de modelos a su dataset seleccionado para optimizarlos, evaluarlos y compararlos de forma global.

---

## UT3.1 — Regresión — 14 h

### Fase 1: Fundamentos teóricos y métricas comunes — 3 h
* Explicación del problema de regresión y funciones de pérdida.
* Conceptos de predicción lineal y no lineal.
* Métricas comunes de evaluación: MAE (Mean Absolute Error), MSE (Mean Squared Error), RMSE (Root Mean Squared Error) y coeficiente de determinación R².

### Fase 2: Aprendizaje cooperativo (Exposiciones de alumnos) — 6 h
* Repartición de modelos en grupos para su investigación, presentación y demo práctica en código:
  1. **Regresión Lineal** ordinaria y regularización (**Ridge** y **Lasso**).
  2. **KNN Regressor** (cálculos de distancia e hiperparámetro `k`).
  3. **Árboles de Decisión** para regresión.
  4. **Ensembles de Regresión** (Random Forest Regressor y Gradient Boosting / XGBoost).
  5. **SVR (Support Vector Regression)** y truco del kernel.

### Fase 3: Práctica de consolidación — 5 h
* Aplicación práctica guiada sobre el dataset elegido por cada grupo. Cada equipo entrena, optimiza hiperparámetros y compara todos los demás algoritmos de regresión sobre sus propios datos, documentando los resultados.

---

## UT3.2 — Clasificación — 15 h

### Fase 1: Fundamentos teóricos y métricas comunes — 3 h
* Concepto de clasificación (binaria y multiclase). Umbral de decisión y probabilidad.
* Métricas de evaluación esenciales: Accuracy, Precision, Recall, F1-Score y diagnóstico mediante la Matriz de Confusión.
* Curvas de decisión ROC y métrica ROC-AUC.
* Introducción conceptual a la Validación Cruzada (*Cross-validation*) y búsquedas de hiperparámetros (`GridSearchCV` y `RandomizedSearchCV`).

### Fase 2: Aprendizaje cooperativo (Exposiciones de alumnos) — 6 h
* Repartición de modelos en grupos para su investigación, presentación y demo práctica en código:
  1. **Regresión Logística** (probabilidades y sigmoid).
  2. **KNN Classifier** (fronteras de decisión y vecinos).
  3. **Árboles de Decisión** (impureza de Gini y entropía).
  4. **Random Forest Classifier** (Bagging y Bootstrap).
  5. **XGBoost Classifier** (Weak Learners y Boosting secuencial).
  6. **SVM (Support Vector Machines)** para clasificación.

### Fase 3: Práctica de consolidación — 6 h
* Aplicación práctica sobre el dataset del grupo. Entrenamiento, búsqueda exhaustiva de hiperparámetros con `GridSearchCV` de todos los modelos y comparación sistemática mediante curvas ROC y matrices de confusión.

---

## UT3.3 — Aprendizaje No Supervisado (Clustering) — 5 h

### Fase 1: Fundamentos y Flipped classroom — 3 h
* Concepto de clustering y ausencia de variable target.
* Repartición de algoritmos en grupos para su investigación, presentación y demo práctica:
  1. **K-Means:** Centroides, optimización por distancia euclídea, método del codo y Silhouette Score.
  2. **DBSCAN:** Densidad de puntos, proximidad (`eps`), número mínimo de muestras y detección de ruido.
  3. **Clustering Jerárquico:** Distancia entre clusters y dendrogramas.

### Fase 2: Evaluación y Cierre de la 1ª Evaluación — 2 h
* **Proyecto de Integración Final:** Aplicación del clustering seleccionado sobre el dataset y empaquetado del mejor pipeline final entrenado dentro de un servicio Flask/FastAPI dockerizado, dejándolo listo para su despliegue y entrega final antes del 16 de diciembre.

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
Keras (Saved Model) → API REST (Flask/FastAPI) → Contenedor (Docker)
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

## 39 horas (Unidad Ampliada)

### Entorno de trabajo principal
* **VS Code (Local):** El desarrollo de integraciones complejas con APIs de LLM, el manejo de variables de entorno de forma segura (`.env`) y la validación estructurada de datos con Pydantic requieren el uso de un entorno local e interactivo.

---

## Bloque 1 — Fundamentos de los LLMs — 6 h

* Concepto de LLMs autorregresivos.
* Ciclo de tokens, embeddings y ventana de contexto.
* Diferencia entre Pre-entrenamiento, Instruction Tuning e inferencia.
* Hiperparámetros de generación: Temperatura y muestreo (sampling).

---

## Bloque 2 — Integración de APIs de LLMs — 8 h

* Llamadas a APIs y gestión de variables de entorno seguras.
* Estructuración del contexto: System Prompt, User Prompt e historial de conversación.
* Manejo de streaming de respuestas y control de cuotas/límites de uso.

---

## Bloque 3 — Prompt Engineering — 6 h

* Técnicas avanzadas: Few-shot prompting, restricciones semánticas y plantillas de prompts.
* Métodos sistemáticos para la evaluación de la calidad de los prompts.

---

## Bloque 4 — Structured Outputs (Salidas estructuradas) — 7 h

* Garantía de esquemas estructurados usando Pydantic en las respuestas de los LLMs.
* Extracción y tipado automático de datos complejos a formato JSON.

```text
Documento PDF → Inferencia LLM → Esquema Pydantic → Aplicación de negocio
```

---

## Bloque 5 — Function Calling / Tool Calling — 7 h

* Habilitación de herramientas para que el LLM decida autónomamente cuándo y cómo usarlas.

```text
Usuario → LLM → Identificación de Tool → Ejecución Python local → Retorno de datos → Respuesta final
```
* Prácticas: APIs externas de consulta de stock y consultas básicas a bases de datos relacionales.

---

## Bloque 6 — Modelos Open Source y Ejecución Local — 5 h

* Uso prioritario de **Ollama** para orquestar y ejecutar modelos de lenguaje locales (Llama 3.1, Phi-3).
* Esto permite evitar la dependencia exclusiva de APIs de pago externas, facilitando un entorno de laboratorio gratuito, seguro y sin conexión a internet.
* Introducción conceptual a la cuantización de modelos y técnicas de adaptación de bajo rango (LoRA/PEFT).

---

# UT8 — RAG y Agentes

## 25 horas (Unidad Ampliada)

### Entorno de trabajo principal
* **VS Code (Local):** Es la mejor opción para interactuar con bases de datos vectoriales persistidas en disco de forma local (como Chroma DB), gestionar flujos interactivos de entrada/salida y crear agentes automatizados que ejecuten código del sistema.

---

## Bloque 1 — RAG (Retrieval-Augmented Generation) — 10 h

* Limitaciones de los modelos estáticos: Alucinaciones y corte temporal de conocimiento.
* Arquitectura técnica del flujo RAG:
```text
Documentos locales → Chunking (y solapamiento) → Embeddings → Base de Datos Vectorial → Recuperación (Retrieval) → Prompt Contextualizado → LLM
```

---

## Bloque 2 — Vector Databases — 3 h

* Manejo de la base de datos vectorial local **Chroma DB**.
* Conceptos de indexación de vectores, búsqueda de similitud y filtrado por metadatos.
* Mención y diferencias conceptuales con FAISS, Qdrant y Pinecone.

---

## Bloque 3 — Implementación de RAG — 7 h

* **Aproximación inicial "Nativa":** Para asegurar la comprensión técnica, los alumnos programarán primero un flujo RAG completo utilizando Python puro y conectando directamente la API del LLM con el cliente local de Chroma DB.
* **Aproximación con Frameworks:** Una vez asentada la lógica subyacente, se presentará el uso de herramientas de abstracción como **LangChain** o **LlamaIndex** para agilizar y robustecer las implementaciones.
* **Proyecto:** Chatbot documental capaz de citar fuentes exactas y declinar respuestas si no constan en el contexto provisto.

---

## Bloque 4 — Agentes Inteligentes — 5 h

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
│   └── main.py              # Endpoints construidos en Flask o FastAPI
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
* **UT3:** Pipeline de datos + Clasificador ML → Flask/FastAPI → Docker.
* **UT4:** Pipeline de imágenes + CNN Keras → Flask/FastAPI → Docker.
* **UT5:** Procesamiento de vídeo/imágenes + YOLO → Flask/FastAPI → Docker.
* **UT6/UT7:** Procesamiento de texto + Modelos Locales (Ollama) → Flask/FastAPI → Docker.
* **UT8:** Orquestación de Agentes y RAG → Flask/FastAPI → Docker.
