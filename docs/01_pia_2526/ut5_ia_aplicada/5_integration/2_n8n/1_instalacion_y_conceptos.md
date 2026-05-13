---
title: Instalación y Conceptos Básicos de n8n
sidebar_position: 1
description: Despliegue de n8n con Docker y fundamentos de la herramienta Low-Code.
---

En el desarrollo de Inteligencia Artificial no todo es picar código. Muchas veces necesitamos conectar APIs, bases de datos y servicios de forma ágil. Aquí es donde entra **n8n**, una potente herramienta de automatización **Low-Code** que nos permite crear flujos de trabajo visuales.

## ¿Qué es n8n y su arquitectura de Nodos?

**n8n** es una plataforma de código abierto que permite automatizar tareas conectando diferentes aplicaciones mediante un lienzo visual. 

Su arquitectura se basa en **Nodos**. Cada nodo es una pequeña "caja negra" que realiza una acción específica (enviar un correo, consultar una base de datos, hacer una petición HTTP). Los datos fluyen de izquierda a derecha a través de conexiones entre estos nodos.

### Conceptos Clave para dominar n8n

*   **Triggers (Disparadores)**: Son los nodos iniciales. Definen *cuándo* empieza a ejecutarse el flujo. Puede ser una hora concreta (Cron), la llegada de un mensaje de Telegram, o una petición externa (Webhook).
*   **Actions (Acciones)**: Son los nodos intermedios y finales. Realizan operaciones con los datos recibidos (ej. llamar a la API de OpenAI o Gemini).
*   **Data Mapping (Mapeo de Datos)**: Es el proceso de coger la salida en formato **JSON** de un nodo anterior y usarla como entrada en el siguiente mediante variables visuales.

---

## Despliegue de n8n con Docker

Gracias a los conceptos que vimos en la sección anterior, levantar n8n en tu equipo local es cuestión de segundos utilizando Docker.

:::info[Requisitos previos]
Asegúrate de tener Docker Desktop instalado y corriendo en tu ordenador.
:::

## Paso previo: Obtener una URL pública (Túnel)

Para que Telegram pueda enviar mensajes a tu n8n local, necesitas una dirección `https` fija. Utilizaremos **ngrok** para crear un túnel seguro con un **dominio permanente gratuito**. **Haz esto antes de crear el contenedor de n8n.**

1. **Registro**: Crea una cuenta en [ngrok.com](https://ngrok.com/) y obtén tu **Authtoken**.
2. **Configuración inicial**: Abre tu terminal y configura tu token:
   ```bash
   ngrok config add-authtoken TU_TOKEN_AQUÍ
   ```
3. **Lanzar el túnel**:
   Usa el siguiente comando sustituyendo tu dominio:
   ```bash
   ngrok http 5678
   ```
4. **Copia y guarda** la URL que empieza por `https://...` (ej: `https://1234-56.ngrok-free.dev`). La usaremos en el siguiente paso.

:::tip[¿Cómo volver a conectar otro día?]
Si cierras la terminal o apagas el PC, solo tienes que volver a ejecutar el comando del paso 4, indicando la url. Si olvidas cuál era tu dominio, puedes verlo siempre en tu [Dashboard de ngrok](https://dashboard.ngrok.com/domains). ¡Tu URL no cambiará nunca!
```bash
ngrok http 5678 --domain tu-dominio-elegido.ngrok-free.dev
```
:::

---

## Instalación de n8n con Docker

Una vez que tengas tu URL de ngrok, elige una de estas dos opciones para instalar n8n.

### Opción A: Mediante la interfaz visual de Docker Desktop

1. Abre **Docker Desktop**.
2. Utiliza la barra de búsqueda superior y escribe `n8nio/n8n`.
3. Localiza la imagen oficial y haz clic en el botón azul **Run**.
4. Despliega el menú **Optional settings** para configurar el entorno:
   - **Container Name**: Escribe `n8n_pia`.
   - **Ports** (Host Port): Escribe `5678`.
   - **Volumes** (Host Path): Crea un volumen llamado `n8n_data` y asígnalo a la ruta del contenedor `/home/node/.n8n-files`.
   - **Environment Variables**: Para que Telegram funcione en local, necesitamos una URL pública. Usaremos una variable llamada `WEBHOOK_URL`.
     - **Key**: `WEBHOOK_URL`
     - **Value**: *(Aquí pondremos la URL que nos dé nuestro túnel externo)*.

:::important[Importante: Túneles externos]
Como n8n ya no ofrece un servicio de túnel propio, usaremos herramientas externas como **Localtunnel** o **ngrok** para que Telegram pueda comunicarse con nuestro ordenador. 
:::

5. Pulsa **Run**. n8n estará disponible en `http://localhost:5678`.

---


:::tip[¿Qué es un Volumen en Docker?]
Por defecto, los contenedores son **efímeros**. Si el contenedor se apaga o borra, todo lo que hay dentro desaparece. Un volumen es una carpeta segura en tu ordenador físico que se conecta con el contenedor para que tus flujos, usuarios y contraseñas de n8n no se borren nunca.
:::

### Opción B: Mediante la Terminal

Si prefieres usar la línea de comandos, abre tu terminal favorita y ejecuta:

```bash
docker run -d --name n8n_pia -p 5678:5678 -e WEBHOOK_URL=https://<tu-url>.ngrok-free.dev -v n8n_data:/home/node/.n8n-files n8nio/n8n
```

*(Este comando descarga la imagen, activa el túnel para que funcionen los Webhooks de Telegram y protege tus archivos en un volumen seguro).*

---

## Configuración Inicial

1.  Una vez ejecutado el comando, abre tu navegador web y entra en `http://localhost:5678`.
    *(Nota: Usamos localhost para entrar al editor, la URL de ngrok es solo para que Telegram se comunique con n8n).*
2.  Te aparecerá un asistente para crear tu cuenta de administrador local. Rellena tus datos (nombre, email y contraseña).
3.  ¡Listo! Ya estás dentro del lienzo de trabajo (*Canvas*) de n8n.

### Opción A: Mediante Docker Desktop (Visual)

1. Abre **Docker Desktop**.
2. En la barra de búsqueda superior, escribe `n8nio/n8n`.
3. Localiza la imagen oficial y haz clic en el botón azul **Run**.
4. Despliega el menú **Optional settings** para configurar el entorno:
   - **Container Name**: Escribe `n8n_pia`.
   - **Ports** (Host Port): Escribe `5678`.
   - **Volumes** (Host Path): Crea un volumen llamado `n8n_data` y asígnalo a la ruta del contenedor `/home/node/.n8n-files`.
   - **Environment Variables**: Añade la URL que guardaste en el paso previo:
     - **Key**: `WEBHOOK_URL`
     - **Value**: `https://tu-url-de-ngrok.app`

   <div style={{ textAlign: 'center' }}>
     <img src={require('../0-img/nuevo-contenedor.png').default} width="500" alt="Nuevo contenedor" />
   </div>

5. Pulsa **Run**. n8n estará disponible en `http://localhost:5678`.

---

## Tu primer flujo básico de prueba

Para validar que todo está operativo, vamos a crear un flujo muy simple:

1.  Haz clic en el botón **"+"** del centro del lienzo.
2.  Busca y añade el nodo **"When clicking 'Execute workflow'"** (nodo manual).
3.  Conecta su salida arrastrando la flecha hacia un nuevo nodo llamado **"Code"**.
4.  En el nodo de código, selecciona el modo `JavaScript` y deja el código por defecto (que devuelve datos de prueba).
5.  Pulsa en el botón inferior **"Test workflow"**. 

<div style={{ textAlign: 'center' }}>
  <img src={require('../0-img/primer-workflow.png').default} width="500" alt="Primer workflow" />
</div>

Verás cómo los nodos se iluminan en verde, indicando que los datos han fluido correctamente. ¡Ya tienes tu servidor de automatizaciones preparado para la IA!
