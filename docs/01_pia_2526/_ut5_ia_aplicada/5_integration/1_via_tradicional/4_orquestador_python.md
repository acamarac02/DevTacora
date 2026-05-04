---
title: Orquestador del Bot en Python
sidebar_position: 4
description: Desarrollo del script principal que une Telegram, RAG y Gemini.
---

El verdadero potencial de un asistente virtual surge cuando conectamos su interfaz de usuario (Telegram) con su cerebro (el modelo de lenguaje) y su memoria externa (la base de datos vectorial). 

En esta sección programaremos el archivo `bot.py`, que actuará como el director de orquesta de nuestra aplicación integrando todas las piezas.

## Gestión de Estados en Conversaciones

Cuando interactúas con un bot, esperas que recuerde el contexto de la conversación. En desarrollos complejos se utilizan máquinas de estado (como el `ConversationHandler` de `python-telegram-bot`). Sin embargo, para nuestro bot de consultas RAG, utilizaremos un enfoque directo basado en eventos:
1. El bot escucha un mensaje de texto del usuario.
2. Dispara una función asíncrona que realiza la consulta en la base de datos.
3. Envía el contexto recuperado a la IA y responde al usuario.

## Prompt Engineering en Contextos RAG

Para que Gemini responda basándose *únicamente* en la información de nuestro archivo `conocimiento.txt`, debemos construir un **Prompt** estructurado. Si solo le pasamos la duda del usuario, el modelo tirará de su conocimiento general y podría inventar datos (**alucinación**).

El prompt debe incluir:
- **El rol del bot:** Instrucciones sobre cómo debe comportarse.
- **El contexto recuperado:** Los fragmentos de texto que ChromaDB ha considerado relevantes.
- **La pregunta original.**
- **Control de límites (Mitigación de alucinaciones):** Una instrucción explícita que le diga al modelo qué responder si la respuesta no está en el contexto proporcionado (ej. *"Si la información no está en el contexto, responde: 'No tengo esa información'"*).

---

## Creación del Orquestador (`bot.py`)

Crea un archivo llamado `bot.py` en la raíz de tu proyecto y sigue estos pasos para construir el código.

:::info[Requisitos previos]
Asegúrate de tener tu entorno virtual activo y haber ejecutado previamente `ingesta_rag.py` para tener generada la carpeta `chroma_db/`.
:::

:::warning[¡Cuidado con las credenciales!]
El `TELEGRAM_TOKEN` y la `GEMINI_API_KEY` **nunca deben escribirse directamente en el código**. Si lo haces y subes el archivo a un repositorio público como GitHub, cualquiera podría robar tus claves y hacer un uso malintencionado.

Por seguridad, estas variables se guardan a nivel de sistema o en un archivo oculto llamado **`.env`** en la raíz de tu proyecto:
```text
TELEGRAM_TOKEN=tu_token_de_telegram
GEMINI_API_KEY=tu_clave_api_de_gemini
```
La librería `python-dotenv` se encargará de cargar estas claves de forma transparente y segura.
:::

### Importación de librerías y configuración

Lo primero es importar los módulos necesarios para manejar las variables de entorno, la conexión con Telegram, la búsqueda en ChromaDB y las llamadas a la API de Gemini.

```python
import os
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from google import genai

# Cargamos las variables de entorno
load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not TELEGRAM_TOKEN or not GEMINI_API_KEY:
    raise ValueError("Faltan las claves TELEGRAM_TOKEN o GEMINI_API_KEY en el archivo .env")

# Constante para el ID del modelo (estilo Gemini 2.5 API)
MODEL_ID = "models/gemini-2.5-flash"

# Inicializamos el cliente de Gemini
client = genai.Client(api_key=GEMINI_API_KEY)

# Cargamos la base de datos vectorial (ChromaDB)
DIRECTORIO_DB = "./chroma_db"
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
)
vectorstore = Chroma(persist_directory=DIRECTORIO_DB, embedding_function=embeddings)
```

### Lógica de búsqueda y generación (RAG)

Esta función auxiliar se encargará de recibir la duda del usuario, buscar en la base de datos y generar la respuesta final con Gemini, siguiendo las reglas que ya vimos para los prompts extendidos.

```python
def generar_respuesta_rag(pregunta_usuario: str) -> str:
    # 1. Buscar los fragmentos más relevantes en ChromaDB
    docs = vectorstore.similarity_search(pregunta_usuario, k=3)
    contexto = "\n\n".join([doc.page_content for doc in docs])
    
    # 2. Diseñar el prompt (siguiendo la estructura que enseñamos)
    prompt_completo = f"""
Eres un asistente que responde preguntas usando SOLO la información del contexto proporcionado.

REGLAS IMPORTANTES:
- No inventes datos que no estén en el contexto.
- Si la respuesta no se encuentra en el contexto, responde exactamente: "No tengo esa información".
- Responde de forma breve y directa.

CONTEXTO:
\"\"\"{contexto}\"\"\"

PREGUNTA:
{pregunta_usuario}

RESPUESTA:
"""

    # 3. Generar la respuesta usando Gemini
    response = client.models.generate_content(
        model=MODEL_ID,
        contents=prompt_completo,
    )
    
    return response.text
```

### Handlers de Telegram
 
Definimos qué hará el bot cuando el usuario interactúe con él mediante comandos o mensajes. 

En la librería `python-telegram-bot`, todas las funciones encargadas de responder a eventos (los *handlers*) deben ser **asíncronas (`async`)** y reciben obligatoriamente dos parámetros:
- **`update` (de tipo `Update`)**: Representa la acción que acaba de ocurrir en Telegram. Nos da acceso a datos vitales: el texto escrito (`update.message.text`), el nombre del usuario (`update.effective_user.first_name`) y el canal para responder en el mismo chat (`update.message.reply_text`).
- **`context` (de tipo `ContextTypes.DEFAULT_TYPE`)**: Sirve para gestionar el estado interno del framework. Permite almacenar datos de sesión del usuario o disparar trabajos en segundo plano. Aunque en bots básicos no lo utilices directamente, su presencia en la firma del método es indispensable.

```python
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Responde al comando /start"""
    usuario = update.effective_user.first_name
    await update.message.reply_text(
        f"¡Hola, {usuario}! Soy tu asistente inteligente. Hazme cualquier consulta sobre el temario."
    )

async def responder(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Procesa el mensaje del usuario mediante RAG"""
    # Enviamos un mensaje temporal indicando que estamos procesando
    mensaje_espera = await update.message.reply_text("🤖 Buscando en mi base de conocimiento...")
    
    try:
        pregunta = update.message.text
        respuesta = generar_respuesta_rag(pregunta)
        
        # Editamos el mensaje anterior con la respuesta final
        await mensaje_espera.edit_text(respuesta)
        
    except Exception as e:
        await mensaje_espera.edit_text("⚠️ Ha ocurrido un error al procesar tu consulta.")
        print(f"Error en el orquestador: {e}")
```

### Ejecución del Bot

Por último, configuramos la función principal (`main()`) que pone en marcha la aplicación y gestiona las conexiones. Para estructurar la lógica, utilizamos varios componentes clave:

- **`ApplicationBuilder().token(TOKEN).build()`**: Inicializa la infraestructura del bot inyectándole el Token del `.env`.
- **`app.add_handler(...)`**: Añade "escuchadores" que reaccionan a las interacciones del usuario.
- **`CommandHandler("start", start)`**: Captura los comandos (mensajes que empiezan por barra inclinada `/`). En este caso, mapea `/start` a la función de bienvenida.
- **`MessageHandler(filters.TEXT & ~filters.COMMAND, responder)`**: El capturador de texto libre.
  - `filters.TEXT`: Filtra para que solo entren cadenas de texto.
  - `~filters.COMMAND`: La virgulilla (`~`) actúa como operador **NOT**. Significa: *"Pasa los mensajes de texto, excepto si son comandos"*. De esta forma, si un alumno pone `/ayuda`, no se enviará a Gemini por error.
- **`app.run_polling()`**: Mantiene la aplicación corriendo y preguntando activamente a los servidores de Telegram si hay nuevas notificaciones pendientes.

```python
def main():
    # Construimos la aplicación de Telegram
    app = ApplicationBuilder().token(TELEGRAM_TOKEN).build()

    # Registramos los comandos y manejadores de mensajes
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, responder))

    print("🚀 Bot de Telegram en marcha...")
    app.run_polling()

if __name__ == "__main__":
    main()
```

---

## Ejecución del Proyecto

Una vez guardado el archivo `bot.py`, abre tu terminal y ejecútalo:

```bash
python bot.py
```

Si todo es correcto, verás el mensaje `🚀 Bot de Telegram en marcha...`. Dirígete a Telegram, busca a tu bot y hazle preguntas basadas en `conocimiento.txt`. ¡Tu orquestador RAG está completamente operativo!
