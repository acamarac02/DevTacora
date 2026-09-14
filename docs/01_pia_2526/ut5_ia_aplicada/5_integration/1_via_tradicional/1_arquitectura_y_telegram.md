---
title: Creación del Bot en Telegram
sidebar_position: 1
description: Tutorial paso a paso para dar de alta un bot en Telegram usando @BotFather.
---

El primer paso práctico es dar de alta nuestro bot en los servidores de Telegram. Para ello usaremos a **@BotFather**, el bot oficial para crear otros bots.

### Paso 1: Iniciar conversación con BotFather
1. Abre tu aplicación de Telegram.
2. En el buscador, escribe `@BotFather` (asegúrate de que tenga el check azul de cuenta verificada).
3. Pulsa en **Iniciar** o escribe `/start`.

### Paso 2: Crear el Bot
1. Escribe el comando `/newbot`.
2. Te pedirá un **nombre** para el bot (ej: *Asistente IA PIA*). Este es el nombre que verán los usuarios.
3. Te pedirá un **username** (ej: *MiAsistentePIABot*). 
   :::warning
   El username debe ser único en todo Telegram y terminar obligatoriamente en la palabra `bot`.
   :::

### Paso 3: Guardar el Token de Acceso
Una vez creado, BotFather te responderá con un mensaje de éxito que incluye un texto parecido a este:
`123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`

Este es el **Token HTTP API**. Es la llave maestra para controlar tu bot. 

:::caution
**¡No compartas este token con nadie!** Si alguien lo consigue, podrá controlar tu bot. Guárdalo en un archivo de texto temporal; lo usaremos en el siguiente tema.
:::

