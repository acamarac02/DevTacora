---
title: "Introducción a las API REST"
sidebar_position: 1
description: "Conceptos fundamentales sobre APIs REST: qué son, cómo funcionan, métodos HTTP, códigos de estado, JSON y razones para consumir APIs desde Android."
keywords: [API, REST, HTTP, JSON, Status Codes, Android, Cliente-Servidor, Backend, Peticiones, Programación Móvil]
---

<div class="justify-text">

:::info PROYECTO 2
**Lee atentamente el tema completo y realiza el proyecto 2: Consumo de API REST.**
:::

Una **API REST** (Representational State Transfer) es un conjunto de reglas y estándares para crear **servicios web** que permiten a diferentes sistemas comunicarse entre sí a través de internet de forma sencilla y escalable. REST se basa en principios arquitectónicos diseñados para sistemas distribuidos y utiliza los **protocolos HTTP**, que son fundamentales en la web.

**REST** no es una tecnología concreta, sino un **estilo arquitectónico** que sigue un conjunto de principios:

* **Recursos identificables**: 
    Un recurso representa algo sobre lo que puedes realizar operaciones (crear, leer, actualizar, eliminar).
    Cada elemento accesible a través de la API es un **recurso**.
    Ejemplos:

    * `pokemon`
    * `ability`
    * `type`

    Cada recurso se identifica mediante una URL única.

* **Stateless (sin estado)**: Cada petición HTTP funciona de manera independiente.
    El servidor **no recuerda** lo que pasó en peticiones anteriores.
    Esto simplifica el diseño y mejora la escalabilidad.

* **Métodos bien definidos**
    Las operaciones se realizan usando los métodos estándar del **protocolo HTTP** (GET, POST, PUT, DELETE…).

* **Representaciones intercambiables**
    Los datos se transmiten en diferentes formatos.
    El más común es **JSON**, por ser ligero, legible y fácil de mapear en la mayoría de lenguajes de programación. 

---

## Métodos HTTP principales

Los métodos HTTP definen la intención de una petición.

| Método     | Uso                         | Ejemplo                |
| ---------- | --------------------------- | ---------------------- |
| **GET**    | Consultar datos             | Obtener un Pokémon     |
| **POST**   | Crear datos                 | Crear un usuario nuevo |
| **PUT**    | Actualizar un dato completo | Actualizar un perfil   |
| **PATCH**  | Actualizar parcialmente     | Cambiar solo la foto   |
| **DELETE** | Eliminar un recurso         | Borrar un comentario   |



:::tip ¿Por qué las APIs públicas suelen ser solo de lectura (GET)?

Porque permitir POST/PUT/DELETE abriría la puerta a:

* manipulación de datos
* spam
* destrucción de recursos

Por eso APIs como **PokeAPI**, **OpenWeather** o **Rick and Morty API** solo permiten **GET**.
:::

---

## Códigos de estado HTTP

Las respuestas de una API incluyen un **status code**, que indica si la operación fue correcta o hubo algún problema.

Los códigos más habituales son:

* **200 OK** → Todo ha ido bien
* **201 Created** → Recurso creado
* **400 Bad Request** → Problema en la petición
* **401 Unauthorized** → Falta autenticación (generalmente *API key*)
* **404 Not Found** → El recurso no existe
* **500 Internal Server Error** → Error en el servidor

---

## Ventajas del uso de API REST vs acceso directo del cliente a BBDD

Cuando una app Android (cliente) necesita información externa (Pokémons, tiempo, usuarios…), no accede a una base de datos directamente. En su lugar, lo más correcto es hacerlo a través de **una API REST que actúa como intermediaria**.

Esto ofrece las siguientes ventajas:

* **Abstracción de la base de datos**: La app no necesita conocer detalles técnicos de la base de datos (como el tipo, su esquema, o credenciales); solo interactúa con los endpoints de la API.

* **Seguridad**: Exponer directamente una base de datos al cliente es una mala práctica porque compromete la seguridad de la información. Una API actúa como intermediaria y puede validar, filtrar y controlar las operaciones.

* **Escalabilidad**: Si el backend cambia (nueva BD, nuevos endpoints), la app puede mantenerse igual.

* **Compatibilidad**: La misma API puede ser usada por distintas apps (Android, iOS, web).

La arquitectura general del sistema sería:

![Consumo API REST](./0-img/consumo-api-rest.png)

---

## Peticiones síncronas vs asíncronas

En Android **nunca debemos bloquear el hilo principal (Main Thread)** con operaciones de red.
El Main Thread es el encargado de actualizar la interfaz y responder a las acciones del usuario.
Si lo bloqueamos mientras esperamos una respuesta del servidor, la app se congela, aparece el mensaje **“La aplicación no responde (ANR)”** y la experiencia del usuario empeora gravemente.

Para evitar esto existen dos formas de ejecutar peticiones:

* **Síncrono** 
    * La ejecución **se detiene** hasta recibir la respuesta del servidor. ❌
    * Bloquean el hilo actual, por lo que en Android **nunca deben hacerse en el hilo principal**.
* **Asíncrono** 
    * Se lanzan en segundo plano. ✔️
    * La app **sigue funcionando** mientras llega la respuesta. Podemos aprovechar el tiempo de espera para mostrar una barra de carga.
    * Cuando el servidor responde, recibimos un **callback** con los datos o el error.


Librerías como **Retrofit** realizan las peticiones de manera asíncrona por defecto mediante el método `enqueue()`, que:

* ejecuta la solicitud en un hilo de trabajo, es decir, fuera del hilo principal
* notifica el resultado en un callback sin bloquear la interfaz

Esto permite que la app sea fluida, segura y responda siempre al usuario.

---

## Formatos de intercambio: JSON

JSON es el estándar más utilizado. En Java, de la respuesta recibida debemos **recoger los datos que sean necesarios** en nuestra aplicación y **mapearlos en una clase**. El proceso de mapeo lo realiza directamente la librería Gson pero **es el desarrollador quien debe definir correctamente las clases** para que el mapeo se haga bien.

JSON consta de las siguientes estructuras:

* **Objetos `{ }`** → pares clave/valor
* **Arrays `[ ]`** → listas ordenadas
* **Valores**: string, número, booleano, null

---

### Mapeo JSON a Java (manual)

Vamos a analizar los diferentes casos que nos podemos encontrar.

#### Mapeo de objetos

Para mapear un objeto JSON a Java, se debe definir una clase que contenga los campos equivalentes a las claves del objeto JSON, y el tipo de estos campos debe ser del mismo tipo que los valores del objeto.
El nombre de la clase puede ser cualquiera (usar un nombre representativo del objeto), pero el nombre de los campos debe coincidir con las claves del objeto JSON.

Supongamos que tenemos el siguiente **JSON**:

```json
{
  "nombre": "Juan",
  "edad": 22, 
  "nota": 7.75,
  "matriculado": true
}
```

**Clase Java** correspondiente:

```java
public class Estudiante {
    private String nombre;
    private int edad;
    private float nota;
    private boolean matriculado;

    // getters...
}
```

Si una clave contiene otro objeto, debemos crear una clase para ese objeto también (objetos anidados dentro de otros objetos):

Ejemplo de **JSON**:

```json
{
  "nombre_estudiante": "Juan",
  "curso": {
    "nombre": "DAM",
    "aula": 12
  }
}
```

**Clases Java** correspondientes:

```java
public class Estudiante {
    @SerializedName("nombre_estudiante")
    private String nombreEstudiante;
    private Curso curso;
}
```

```java
public class Curso {
    private String nombre;
    private int aula;
}
```

:::tip ¿Para qué sirve `@SerializedName`?
La anotación `@SerializedName` permite indicar que un atributo Java se corresponde con una clave del JSON cuyo nombre es diferente.  
Es útil cuando la API devuelve claves con guiones bajos (`nombre_estudiante`), mayúsculas, o nombres poco adecuados para Java.  
Gracias a esta anotación, puedes usar nombres idiomáticos en Java (camelCase) sin perder la correspondencia con el JSON original.
:::

---

#### Mapeo de arrays

Para mapear listas JSON a Java, se debe crear una List con el tipo adecuado a los elementos de la lista:

**JSON** de ejemplo:

```json
{
  "estudiantes": [ 6.5, 7.75, 4.1, 9.95 ]
}
```

La clase **Java** correspondiente será:

```java
public class Boletin {
    List<Integer> notas;
}
```

Los elementos de una lista pueden ser objetos (todos tienen que ser de la misma clase, es decir, tener la misma estructura):

**JSON** de ejemplo:

```json
{
  "estudiantes": [
    { "nombre": "Juan" },
    { "nombre": "Paco" },
    { "nombre": "Pedro" }
  ]
}
```

**Clases Java** correspondientes:

```java
public class Curso {
    private List<Estudiante> estudiantes;
}
```

```java
public class Estudiante {
    private String nombre;
}
```

---

### Mapeo JSON a Java (automático)

Aunque es importante saber hacerlo manualmente, existen herramientas que **generan las clases Java automáticamente** a partir de un JSON. Esto evita errores y ahorra mucho tiempo cuando el JSON es grande o cuando una API devuelve muchas estructuras anidadas.

1. **jsonschema2pojo**
   👉 [https://www.jsonschema2pojo.org/](https://www.jsonschema2pojo.org/)

   * Permite pegar un JSON y generar clases automáticamente en Java, Kotlin, C#, etc.
   * Soporta anotaciones para Gson (`@SerializedName`) o Jackson.
   * Muy útil cuando las respuestas son complejas o largas.
   * **Importante:** debes pegar *solo la parte del JSON que realmente necesites mapear*, no la respuesta completa de la API.
     * Si pegas el JSON entero, generará **muchas clases innecesarias** que no vas a usar.
     * En Android solo debes mapear los atributos que necesiten tus pantallas o tu lógica.


</div>