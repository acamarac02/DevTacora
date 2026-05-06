---
title: Ingesta de Datos y RAG
sidebar_position: 3
description: Procesamiento de documentos y almacenamiento en ChromaDB.
---



Como ya viste en la sección de Hugging Face, un sistema RAG necesita una base de conocimiento para poder responder. El proceso para preparar esta información (Indexación) sigue 4 pasos clave:

1. **Carga:** Leer el archivo de texto o PDF.
2. **Chunking:** Dividir el texto en trozos pequeños para no saturar la memoria del modelo.
3. **Vectorización:** Convertir cada trozo en un vector numérico (Embedding).
4. **Almacenamiento:** Guardar esos vectores en una base de datos especializada (**ChromaDB**).

:::important
A diferencia de las pruebas rápidas en memoria, aquí necesitamos que la base de datos se guarde en el disco duro (**Persistencia**). Así, nuestro bot de Telegram podrá consultarla sin tener que volver a procesar los documentos cada vez que se encienda.
:::

---

## Tutorial: Construyendo el RAG desde Cero

A continuación, tienes el script completo para procesar un documento (por ejemplo, `normativa.txt`) y guardarlo en una base de datos vectorial persistente.


Crea un archivo llamado `ingesta.py` y añade el siguiente código:

```python
import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma

# 1. Configurar rutas

DIRECTORIO_DB = "./chroma_db"
ARCHIVO_CONOCIMIENTO = "conocimiento.txt"


def iniciar_ingesta():
    # Verificar que el archivo de conocimiento existe
    if not os.path.exists(ARCHIVO_CONOCIMIENTO):
        print(f"❌ Error: Crea primero el archivo '{ARCHIVO_CONOCIMIENTO}' con la información para el bot.")
        return

    print("📂 Cargando documento...")
    # Cargamos el archivo de texto plano
    loader = TextLoader(ARCHIVO_CONOCIMIENTO, encoding="utf-8")
    documentos = loader.load()

    print("✂️ Dividiendo texto en fragmentos (Chunks)...")
    # Dividimos en trozos de 1000 caracteres con un solapamiento de 200
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n\n", "\n", ". ", " ", ""]
    )
    chunks = text_splitter.split_documents(documentos)
    print(f"✅ Texto dividido en {len(chunks)} fragmentos.")

    print("🧠 Generando embeddings y guardando en ChromaDB...")
    # Usamos un modelo multilingüe ligero para generar los vectores
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    )

    # Creamos la base de datos vectorial y la persistimos en la carpeta indicada
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=DIRECTORIO_DB
    )
    
    print(f"🚀 ¡RAG creado con éxito! Guardado en: {DIRECTORIO_DB}")

if __name__ == "__main__":
    iniciar_ingesta()
```

### ¿Qué está pasando en el código?

1. **`TextLoader`**: Lee el archivo de texto crudo.
2. **`RecursiveCharacterTextSplitter`**: Es el splitter más inteligente. Intenta dividir por párrafos (`\n\n`), luego por líneas (`\n`) y finalmente por palabras, asegurando que no rompemos frases por la mitad.
3. **`HuggingFaceEmbeddings`**: Descarga automáticamente el modelo `paraphrase-multilingual-MiniLM-L12-v2`, ideal para entender español sin coste alguno.
4. **`Chroma.from_documents`**: Toma los textos, los pasa por el modelo de embeddings y guarda los vectores resultantes en la carpeta `./chroma_db`.

---

## Ponlo a prueba

1. Crea un archivo llamado `conocimiento.txt` en la misma carpeta del proyecto. Para hacer las pruebas, puedes **<a href="/DevTacora/conocimiento.txt" download="conocimiento.txt">descargar aquí nuestro archivo conocimiento.txt de ejemplo</a>**.

2. Pega dentro la información que quieras que el bot sepa (o usa directamente el archivo descargado).

3. Ejecuta el script:
   ```bash
   python ingesta.py
   ```
4. Verás que se crea una nueva carpeta llamada `chroma_db`. ¡Ese es el cerebro de tu bot!

