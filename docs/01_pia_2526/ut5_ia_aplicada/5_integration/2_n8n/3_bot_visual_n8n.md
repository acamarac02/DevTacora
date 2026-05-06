---
title: Bot de Telegram Visual
sidebar_position: 3
description: Desarrollo del orquestador RAG utilizando el nodo AI Agent de n8n.
---

En la sección anterior creamos el "cerebro" (la base de datos con nuestro conocimiento). Ahora vamos a crear el "cuerpo": un bot de Telegram que reciba preguntas, consulte esa base de datos y responda de forma inteligente. 

Si en Python escribimos un orquestador (`bot.py`), aquí usaremos un nodo especial llamado **AI Agent**, que hará de director de orquesta de forma visual.

## Diferencias clave: Python vs n8n

| Concepto | Vía Tradicional (Python) | Vía Low-Code (n8n) |
| :--- | :--- | :--- |
| **Escucha de mensajes** | Librería `python-telegram-bot` (Polling) | Nodo **Telegram Trigger** (Webhook) |
| **Búsqueda RAG** | `vectorstore.similarity_search()` | Nodo **Vector Store Tool** |
| **Memoria** | Gestión manual o hilos | Nodo **Window Buffer Memory** |
| **Orquestación** | Función `generar_respuesta_rag()` | Nodo **AI Agent** |

---

## Tutorial Paso a Paso: El Orquestador Visual

### 1. El Disparador: Telegram Trigger

El flujo debe activarse cada vez que un usuario escriba a nuestro bot.

1.  Añade el nodo **Telegram Trigger** > **On message**.
2.  Configura tus credenciales con el `Telegram Token` que obtuviste de @BotFather.
3.  Asegúrate de que la opción **Trigger On** incluya `message`.

<img src={require('../0-img/telegram-trigger.png').default} style={{ display: 'block', margin: '0 auto' }} width="600" alt="Configuración AI Agent" />

### 2. El Cerebro: AI Agent

Este es el nodo más potente de n8n. Es capaz de decidir qué herramientas usar para responder a una pregunta.

1.  Añade el nodo **AI Agent** y conéctalo al nodo de Telegram.
2.  **Configuración crítica del Agente**:
    *   **Agent**: Selecciona 👉 **Tools Agent**.
    *   **Source for Prompt**: Cámbialo de *Connected Chat Trigger* a 👉 **Define below**.
    *   **Prompt (User Message)**: Borra el contenido y arrastra desde el nodo de Telegram el campo `text`. Debería quedar algo como `{{ $json.message.text }}`. (Si no haces esto, el agente no leerá tus mensajes).
3.  **Configura el mensaje de sistema (System Message)**:
    Haz clic en **Add Option** > **System Message** y pega estas reglas estructuradas (las mismas que definimos en el bot hecho con Python):
    > Eres un asistente que responde preguntas usando SOLO la información del contexto proporcionado por tus herramientas.
    > 
    > REGLAS IMPORTANTES:
    > - No inventes datos que no estén en el contexto.
    > - Si la respuesta no se encuentra en el contexto, responde exactamente: "No tengo esa información".
    > - Responde de forma breve y directa.

La configuración deberá quedar así:

<img src={require('../0-img/config-ai-agent.png').default} style={{ display: 'block', margin: '0 auto' }} alt="Configuración AI Agent" />

Nuestros nodos ahora tendrán el siguiente aspecto:

<img src={require('../0-img/config-ai-agent-nodos.png').default} style={{ display: 'block', margin: '0 auto' }} width="600" alt="Configuración AI Agent" />

### 3. Conectando los Recursos (Herramientas, Memoria y Modelo)

El nodo AI Agent tiene varios conectores circulares en su parte inferior. Vamos a "enchufar" lo que necesita:

#### A. El Modelo (Chat Model)
Conecta el puerto **Chat Model** al nodo **Google Gemini Chat Model**. 
*   Configura tu API Key de Gemini.
*   Modelo: `gemini-3.1-flash-lite-preview` (es rápido y económico).

#### B. La Memoria (Memory)
Conecta el puerto **Memory** al nodo **Simple Memory**. Esto permite que el bot recuerde los mensajes anteriores de la conversación (el "contexto"). 

1.  **Session ID**: Cámbialo de *Connected Chat Trigger* a 👉 **Define below**. (Si no haces esto, te dará error).
2.  **Session Key**: Arrastra desde el nodo de Telegram el campo `chat.id` (quedará algo como `{{ $json.message.chat.id }}`). Esto es vital para que el bot no mezcle las conversaciones de distintos usuarios.
3.  **Context Window Length**: Déjalo en `5`. Recordará los últimos 5 mensajes.

:::tip[Mejora respecto a Python]
Si te fijas, en el código de Python nuestro bot no tenía memoria (cada pregunta era aislada). En n8n, añadir esta funcionalidad profesional es tan sencillo como conectar este nodo. ¡Ahora podrás preguntarle cosas como "¿puedes resumirme lo anterior?" y el bot sabrá qué responder!
:::

#### C. La Herramienta de Conocimiento (Tool)
Este es el paso crítico para el RAG. En las versiones actuales de n8n, el propio nodo de base de datos se convierte en una herramienta.

1.  Añade el nodo **Simple Vector Store** y conéctalo al puerto **Tool** del **AI Agent**.
2.  Dentro del **Simple Vector Store**, configura el **Operation Mode**:
    *   Selecciona: 👉 **Retrieve Documents (As Tool for AI Agent)**.
    *   Pon una descripción como: `Útil para buscar CUALQUIER información sobre el curso, incluyendo temarios de los módulos, profesores, horarios de clase, asistencia, normas del aula y criterios de evaluación.`
3.  **Añade los Embeddings al buscador**:
    *   Verás que el nuevo nodo tiene un conector llamado **Embedding**.
    *   Conéctale un nodo **Google Gemini Embeddings**. ¡Sin esto, el buscador no sabrá cómo comparar la pregunta con los documentos!

:::important[La "Llave" de la memoria]
Aunque tengas dos nodos de Vector Store en el lienzo (uno para guardar y otro para buscar), ambos deben tener exactamente la misma **Memory Key** (ej. `vector_store_key`). Esto es lo que hace que ambos compartan la misma base de datos en la memoria de n8n.
:::

#### D. El Envío de Respuesta
Ahora que el agente ha generado una respuesta, ¡tenemos que enviarla de vuelta al usuario!

1.  Conecta la salida del nodo **AI Agent** a un nuevo nodo de **Telegram**.
2.  Configura la acción como **Send a text message**.
3.  **Chat ID**: Haz clic en el icono de expresión (o arrastra) el campo `message.chat.id` del nodo Trigger inicial. Debería quedar algo como `{{ $('Telegram Trigger').item.json.message.chat.id }}`.
4.  **Text**: Arrastra el campo `output` que genera el nodo AI Agent. Debería quedar algo como `{{ $json.output }}`.
5.  **Parse Mode (Crítico)**: Haz clic en **Add Field** > **Parse Mode** y selecciona 👉 **HTML**. 
    *(Esto es vital para evitar errores 400 si el bot responde con asteriscos o caracteres especiales).*

¡Ahora el ciclo está completo!

<img src={require('../0-img/telegram-trigger-completo.png').default} style={{ display: 'block', margin: '0 auto' }} alt="Configuración AI Agent" />

---

## Estado final

Tu lienzo de n8n debería tener este aspecto:

<img src={require('../0-img/estado-final-n8n.png').default} style={{ display: 'block', margin: '0 auto' }} alt="Estado final n8n" />

---


## Ejecución y Prueba en Vivo

1.  Pulsa el botón **"Execute Workflow from When clicking Execute Workflow"** en n8n. De esta forma, se realizará la ingesta de datos, la creación de los embeddings y la carga en el Vector Store.
2. Pulsa el botón **Execute Workflow from Telegram Trigger**. El workflow se quedará esperando un mensaje desde el bot de Telegram.
3.  Abre Telegram y escribe a tu bot.
4.  Verás cómo n8n recibe el mensaje en tiempo real, el agente "piensa", consulta la herramienta de Vector Store y te devuelve la respuesta basada en tu archivo `conocimiento.txt`.

:::tip[¿Cómo sé si está funcionando?]
Si haces clic en el nodo **AI Agent** después de ejecutarlo, podrás ver los "pensamientos" del agente en la pestaña **Output**. Verás un mensaje que dice algo como *"I will use the buscador_conocimiento tool to find information..."*. Eso significa que el RAG está funcionando perfectamente.
:::

<img src={require('../0-img/bot-telegram-funcionando.jpeg').default} style={{ display: 'block', margin: '0 auto' }} width="300" alt="Bot funcionando" />

---

## Exportar el Workflow

Una vez que tu bot funciona correctamente, es importante exportarlo para poder entregarlo o usarlo en otro ordenador.

1.  Haz clic en el botón de los **tres puntos (`...`)** en la esquina superior derecha del lienzo.
2.  Selecciona la opción **Download**.
3.  Se descargará un archivo `.json` que contiene toda la lógica de tus nodos.

:::tip[Truco rápido]
También puedes seleccionar todos los nodos (`Ctrl + A`), copiarlos (`Ctrl + C`) y pegarlos directamente en un archivo de texto o en otro lienzo de n8n.
:::

---

## PROYECTO 5: Potenciando al Agente de n8n

El objetivo de este proyecto es mejorar las funcionalidades que ofrece la demo básica que hemos preparado del bot con n8n.

Esta actividad está orientada a evaluar de forma parcial la consecución de los siguientes resultados de aprendizaje del módulo de Programación de Inteligencia Artificial:

* **RA3.** Evalúa las mejoras en los negocios integrando convergencia tecnológica.
* **RA4.** Evalúa modelos de automatización industrial y de negocio relacionándolos con los resultados esperados por las empresas.

Para ello se emplearán los criterios de evaluación asociados a ellos, tal y como se recogen en el Real Decreto 279/2021.

El proyecto se realizará de forma **individual**. 

La copia de proyectos entre alumnos o el uso de IA supondrá la calificación de 0.

### Parte 1: Wikipedia

¿Qué pasa si el usuario pregunta algo que no está en el `conocimiento.txt` pero es cultura general? 

1.  Añade una segunda herramienta al puerto **Tool** del AI Agent: el nodo **Wikipedia**.
2.  Vuelve a preguntar al bot algo genérico (ej: "¿Quién fue Alan Turing?").
3.  Observa en n8n cómo el agente, al no encontrarlo en la base de datos local, decide automáticamente consultar la Wikipedia para responderte. ¡Has creado un agente multi-herramienta sin escribir una sola línea de código!


### Parte 2: Mensaje de espera

En el bot de Telegram con código que hicimos, cuando el agente está pensando, el usuario recibe un mensaje de espera, que después es reemplazado por el mensaje del agente. Crea esto en n8n.


### Parte 3: Mensaje de Bienvenida (`/start`)

Implementa un saludo inicial:
1. Usa un nodo **If** para detectar si el texto del mensaje es `/start`.
2. Si es así, envía un mensaje de bienvenida amable explicando qué puede hacer el bot.
3. Si no es `/start`, el flujo debe continuar normalmente hacia el Agente.

### Parte 4: Consultando una API externa (PokeAPI)

Como reto final, vamos a convertir nuestro bot en un auténtico experto multidisciplinar. Queremos que, además de saber sobre el curso y de cultura general, pueda consultar datos técnicos de Pokémon en tiempo real usando la [PokeAPI](https://pokeapi.co/).

Para lograrlo, ten en cuenta estas **pistas**:

1.  **El Nodo Conector**: Para que el Agente pueda usar una API necesitarás conectar a Tool un nodo que permita realizar **peticiones HTTP**.
2.  **La Descripción es la clave**: Recuerda que la IA no ve tus nodos, solo lee sus descripciones. Debes redactar una descripción precisa en la herramienta que le explique al Agente cómo debe comportarse, por ejemplo:
    > Usa esta herramienta cuando el usuario pregunte por un Pokémon concreto. Debes pasarle como parámetro el nombre del pokemon en minúsculas. El parámetro se llamará pokemonName.
3.  **Haciendo la petición**: Dentro de la herramienta, tendrás que realizar una consulta web. Si quiero recuperar los datos de Pikachu, ¿qué url debo usar? 
    > `https://pokeapi.co/api/v2/pokemon/pikachu`
    
    Si quiero consultar los datos de Bulbasaur: 
    > `https://pokeapi.co/api/v2/pokemon/bulbasaur`
    
    Y así con cualquier Pokemon
4.  **Recuperando el dato de la IA**: Para construir la URL de la API (ej: `https://pokeapi.co/api/v2/pokemon/NOMBRE`), necesitarás una expresión especial de n8n que capture lo que la IA ha extraído en la variable `pokemonName` que indicábamos en la descripción de la herramienta. Investiga cómo usar la función `{{$fromAI('...')}}`.

**El objetivo final**: Si le preguntas al bot *"¿Qué tipo es Pikachu?"*, el Agente debería ser capaz de decidir por sí mismo que debe dejar de mirar tus apuntes y consultar la API externa para darte la respuesta.


### Rúbrica de Calificación

| Ítem | Peso | Descripción |
| :--- | :--- | :--- |
| **Bot Funcional** | 20% | El flujo base funciona correctamente (Ingesta + Agente + Telegram). |
| **Integración Wikipedia** | 5% | El agente consulta Wikipedia cuando no encuentra datos locales. |
| **Mensaje de Espera** | 15% | El bot envía un "Escribiendo..." antes de la respuesta del agente. |
| **Gestión de Mensajes** | 20% | El bot elimina o actualiza el mensaje de espera al entregar la respuesta final. |
| **Bienvenida (/start)** | 20% | El bot detecta el comando inicial y saluda correctamente usando lógica de nodos. |
| **API de Pokémon** | 20% | El bot consulta la PokeAPI externa y devuelve la información formateada. |

### Entrega 

* **Plazo máximo**: lunes 18 de mayo a las 23:59
* **Entrega**: fichero del workflow en formato *.json*. 
