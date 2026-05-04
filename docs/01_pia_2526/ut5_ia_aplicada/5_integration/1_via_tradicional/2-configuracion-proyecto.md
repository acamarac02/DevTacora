---
title: Configuración del Proyecto
sidebar_position: 2
description: Estructura de carpetas, entorno virtual y dependencias para el proyecto integrador.
---

## Organización del Proyecto

Para que no haya líos, **todo irá dentro de la misma carpeta de proyecto**. No necesitas crear entornos ni carpetas separadas para cada script. La estructura final de tu espacio de trabajo será esta:

```text
mi_bot_ia/
├── .venv/                  # Entorno virtual (compartido)
├── requirements.txt        # Librerías necesarias
├── conocimiento.txt        # Tu documento de texto con información
├── chroma_db/              # Carpeta con los vectores (se crea sola)
├── ingesta.py              # Script para el RAG
└── bot.py                  # Script para Telegram
```

:::info[¿Cuántas veces ejecuto el RAG?]
El script `ingesta.py` **solo se ejecuta una vez** al principio para crear la base de datos. Una vez generada la carpeta `chroma_db`, no necesitas volver a ejecutarlo a menos que cambies el contenido de `conocimiento.txt`.
:::

---

## Preparación del Entorno

Para no ensuciar tu instalación global de Python, es fundamental trabajar dentro de un **Entorno Virtual**. Así aislamos las librerías de este proyecto.

### 1. Crear y Activar el Entorno Virtual

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# Crear el entorno virtual (se creará una carpeta llamada .venv)
python -m venv .venv
```

Ahora debes activarlo según tu sistema operativo:

* **En Windows (PowerShell):**
  ```powershell
  .venv\Scripts\activate
  ```
* **En Linux / macOS:**
  ```bash
  source .venv/bin/activate
  ```

:::warning[¡Cuidado con la versión de Python!]
Librerías pesadas de Machine Learning como `torch` y `sentence-transformers` **no son compatibles con Python 3.13** (la versión más reciente). Para este proyecto integrador, es obligatorio usar **Python 3.10, 3.11 o 3.12**.
:::

### 2. Instalar Dependencias


Crea un archivo llamado `requirements.txt` en la raíz del proyecto y añade las librerías necesarias:

```text
# --- Orquestación del RAG (LangChain) ---
langchain
langchain-community
langchain-chroma
langchain-text-splitters

numpy<2.0.0
torch>=2.0.0
sentence-transformers
transformers<4.45.0
google-genai



# --- Interfaz del Bot y Variables de Entorno ---
python-telegram-bot
python-dotenv
```

:::tip
En proyectos reales es buena práctica fijar las versiones de las librerías (ej: `langchain==0.1.0`) para evitar que futuras actualizaciones rompan tu código.
:::

Una vez guardado el archivo, instala todo de golpe ejecutando:

```bash
pip install -r requirements.txt
```
