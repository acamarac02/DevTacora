---
title: 'Proyecto: Potenciando al Agente de n8n'
sidebar_position: 4
description: Proyecto práctico para mejorar las capacidades de un agente de n8n mediante la integración de herramientas como Wikipedia y APIs externas.
---

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
