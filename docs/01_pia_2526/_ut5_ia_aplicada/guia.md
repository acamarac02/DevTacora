
Al terminar, el alumno debería poder:

* Usar modelos fundacionales (LLMs y visión)
* Adaptarlos a un problema real
* Integrarlos en una aplicación
* Entender riesgos y limitaciones
* Construir un mini-producto funcional

No entender matemáticamente los transformers.
Entender cómo se usan profesionalmente.

---

# 🧠 Estructura propuesta (6–7 semanas)

---

# 🔵 BLOQUE 1 — Modelos fundacionales y Transformers (1 semana)

## Objetivo

Entender qué son y por qué lo han cambiado todo.

### Contenido

* Qué es un modelo fundacional
* Qué es un Transformer (conceptual)
* Self-attention (intuición, no fórmulas)
* Diferencia CNN / RNN / Transformer
* Qué es un LLM
* Ecosistema actual (Open-source vs APIs)

### Demo práctica

```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
classifier("I love AI")
```

Que vean que pueden usar un transformer en 3 líneas.

---

# 🟢 BLOQUE 2 — Hugging Face en profundidad (1 semana)

## Objetivo

Aprender a usar modelos preentrenados de forma profesional.

### Contenido

* Qué es Hugging Face
* Model hub
* Pipelines
* Tokenizers
* Cargar modelos específicos
* Fine-tuning ligero (si da tiempo)

### Práctica

* Clasificación de texto con BERT
* NER (reconocimiento de entidades)
* Resumen automático

Aquí empiezan a sentirse “IA real”.

---

# 🟣 BLOQUE 3 — LLMs y Chatbots (1–2 semanas)

## Objetivo

Construir sistemas con LLMs.

### Contenido

* Qué es un LLM
* Prompt engineering
* Temperature, top_p
* Context window
* Limitaciones (alucinaciones)

### Parte práctica

* Usar API (OpenAI o modelo open-source)
* Crear un chatbot básico
* Añadir memoria simple
* RAG básico (opcional si son fuertes)

Ejemplo:

* Chatbot para FAQs de un documento PDF

Aquí el módulo sube mucho de nivel.

---

# 🔴 BLOQUE 4 — Visión aplicada: YOLO (1 semana)

Muy buena idea meter YOLO.

## Objetivo

Detección de objetos real en tiempo real.

### Contenido

* Qué es detección vs clasificación
* Bounding boxes
* YOLO (concepto)
* Casos reales (seguridad, tráfico, industria)

### Práctica

* Usar YOLO preentrenado
* Detectar objetos en imagen o vídeo

Aquí conectas con Deep Learning anterior.

---

# 🟡 BLOQUE 5 — Integración en aplicaciones (1 semana)

Este bloque es CLAVE.

Sin esto, todo queda en notebooks.

## Contenido

* FastAPI
* Crear API que use modelo
* Endpoint que reciba texto o imagen
* Conectar frontend simple

Opcional:

* Streamlit para prototipo rápido

Mensaje clave:

> “La IA vive dentro de aplicaciones.”

---

# ⚫ BLOQUE 6 — Proyecto final integrador (1–2 semanas)

Aquí es donde todo se conecta.

Proyectos posibles:

* Chatbot con documentos (RAG)
* Detector de objetos en tiempo real con API
* Sistema de clasificación + API + frontend
* App que use LLM para generar contenido

Debe incluir:

* Modelo
* API
* Interfaz mínima
* Documentación

Eso les da perfil profesional real.

---

# 📊 Resumen estructural

```
IA Aplicada
│
├── 1. Transformers y modelos fundacionales
├── 2. Hugging Face y modelos preentrenados
├── 3. LLMs y chatbots
├── 4. YOLO y visión aplicada
├── 5. Integración con APIs
└── 6. Proyecto final
```
