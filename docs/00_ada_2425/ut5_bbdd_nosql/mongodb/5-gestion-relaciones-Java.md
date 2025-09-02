---
sidebar_position: 5
sidebar_label: Gestión de relaciones en Java
title: Mapeo y gestión de relaciones en Java
---

<div class="justify-text">
# Mapeo y gestión de relaciones en Java

Cuando utilizas el conector oficial de **MongoDB para Java (mongodb-driver-sync)**, el mapeo de relaciones no se realiza de manera automática como en frameworks como JPA o Morphia. En su lugar, debes trabajar directamente con los datos de MongoDB y **gestionar las relaciones manualmente**. Esto implica diseñar tus POJOs y estructurar los documentos MongoDB adecuadamente para reflejar esas relaciones.

Vamos a ver la gestión de las diferentes relaciones y opciones de modelado mediante el ejercicio de los Personajes. Supongamos que tenemos estas colecciones:

```json title="Colección Personajes"
{
  "_id": 1,
  "nombre": "Caballero oscuro",
  "arma": {
       "nombre": "Espada Larga",
       "descripcion": "Una espada con filo brillante y equilibrada."
     },
  "habilidades": 201,
  "debilidades_ids": [301, 302]
}
```

```json title="Colección Habilidades"
   {
     "_id": 201,
     "nombre": "Fuerza Sobrehumana",
     "descripcion": "Incrementa la fuerza física.",
     "personajes_ids": [1, 3]
   }
```

```json title="Colección Debilidades"
{
  "_id": 301,
  "nombre": "Fobia al fuego",
  "descripcion": "El personaje teme al fuego"
}
{
  "_id": 302,
  "nombre": "Miedo a las alturas",
  "descripcion": "El personaje teme a las alturas"
}
```

El Personaje es la entidad principal, pues nuestros casos de uso giran en torno a ella. En resumen, tenemos las siguientes relaciones:
- 1:1 entre Personaje y Arma. Se ha decidido embeber el arma dentro del personaje.
- 1:N entre Personaje y Habilidad, de forma que un Personaje tiene una Habilidad y una Habilidad la pueden tener varios personajes. Se ha optado por usar referencias para mantener ambas entidades independientes. Además, se ha hecho bidireccional la relación.
- N:M entre Personaje y Debilidad. Se ha decidido referenciar las habilidades desde el Personaje.

## Mapeo de la relación 1:1 embebida

Vamos a ver cómo modelar la relación **Personaje - Arma (1:1 Embebido)** y cómo realizar las operaciones CRUD. Cuando la relación es **embebida**, significa que la entidad principal (en este caso, **Personaje**) contiene directamente los datos de la entidad relacionada (**Arma**) como parte de su estructura, en lugar de usar referencias o almacenarla en una colección separada. Esto se representa en el código creando un atributo en la clase principal cuya **tipo de dato es la clase del objeto embebido**.

En este caso:
- Personaje tiene un atributo `arma` que es de tipo Arma.
- Los datos de Arma se almacenan como un subdocumento dentro del documento de Personaje en la base de datos MongoDB.

### Definir los POJOs

La clase `Arma` será un subdocumento dentro del documento de `Personaje`. Este es el modelo del arma:

```java title="model.Arma"
public class Arma {
    private String nombre;
    private String descripcion;

    // Constructores (obligatorio tener siempre en el de por defecto para la serialización)

    // Getters y setters
}
```

La clase `Personaje` contiene el subdocumento `Arma` embebido:

```java
public class Personaje {
    private ObjectId id;
    private String nombre;
    private Arma arma; // Relación 1:1 embebida

    // Constructores

    // Getters y setters
}
```

### Operaciones CRUD

Estas operaciones las incluiremos en la clase `PersonajesRepository`, que sigue el patrón `Singleton` que vimos en apartados anteriores.

#### **2.1. Crear un Personaje con un Arma**
Para insertar un personaje con un arma embebida:

```java title="database.PersonajesRepository"
public void insertarPersonaje(Personaje personaje) {
    personajesCollection.insertOne(personaje);
}
```

Ejemplo de uso del método:
```java title="Main"
// Dejamos que MongoDB autogenere los ids
Arma arma = new Arma("Espada Larga", "Una espada con filo brillante y equilibrada.");
Personaje personaje = new Personaje("Caballero oscuro", arma);
PersonajesRepository.getInstance().insertarPersonaje(personaje);
```


#### **2.2. Leer un Personaje con su Arma**
Para consultar un personaje y su arma:

```java title="database.PersonajesRepository"
// Recupera todos los personajes
public void obtenerPersonajes() {
    try (MongoCursor<Personaje> cursor = personajesCollection.find().iterator()) {
        System.out.println("Personajes encontrados:");
        while (cursor.hasNext()) {
            System.out.println(cursor.next());
        }
    }
}

// Recupera un solo personaje
public Personaje obtenerPersonaje(String nombre) {
    Personaje personaje = personajesCollection.find(Filters.eq("nombre", nombre)).first();
    if (personaje != null) {
        System.out.println("Personaje encontrado: " + personaje);
    } else {
        System.out.println("No se encontró el personaje con nombre: " + nombre);
    }
    return personaje;
}
```

#### **3.3. Actualizar el Arma de un Personaje**
Para actualizar el arma embebida en un personaje, en primer lugar debemos recuperar el personaje que el usuario quiere actualizar. Si existe, actualizamos el valor del nombre del arma y guardamos la actualización en base de datos. 

Recuerda que la relación la gestionamos nosotros, por lo que buscaremos el personaje con id indicado y le setteamos el arma.

```java title="database.PersonajesRepository"
public void actualizarNombreArma(String nombrePersonaje, String nuevoNombreArma) {
    Personaje personaje = obtenerPersonaje(nombrePersonaje);
    if (personaje != null) {
        // Recuperamos el arma y actualizamos el nombre
        Arma arma = personaje.getArma();
        arma.setNombre(nuevoNombreArma);
        // Insertamos el cambio en BBDD
        personajesCollection.updateOne(
            Filters.eq("_id", personaje.getId()),
            Updates.set("arma", arma)
        );
    }
}
```

#### **3.4. Eliminar un Personaje**
Para eliminar un personaje completo (incluido su arma):

```java title="database.PersonajesRepository"
public void eliminarPersonaje(String nombre) {
    personajesCollection.deleteOne(Filters.eq("nombre", nombre));
}
```

---

## Mapeo de la relación 1\:N bidireccional

Vamos a modelar la relación **Personaje - Habilidad (1:N Bidireccional)** y ver cómo realizar las operaciones CRUD. En este caso, un **Personaje** tiene una única habilidad asociada, y una **Habilidad** puede estar relacionada con varios personajes. Con fines didácticos, vamos a hacer esta relación bidirecional, es decir, utilizando referencias en ambas entidades, para que cada lado de la relación pueda acceder al otro.

En este caso:
- **Personaje** tiene un atributo `habilidadId` que referencia a la habilidad asociada.
- **Habilidad** tiene un atributo `personajesIds` que almacena una lista de IDs de los personajes que la poseen.

### Definir los POJOs

#### **1.1. Clase Habilidad**
La clase `Habilidad` representa la habilidad que puede estar asociada a uno o varios personajes:
```java title="model.Habilidad"
public class Habilidad {
    private ObjectId id;
    private String nombre;
    private String descripcion;
    private List<ObjectId> personajesIds; // Referencia a los personajes que poseen esta habilidad

    // Constructores (por defecto y parametrizado)
    
    // Getters y setters
}
```

#### **1.2. Clase Personaje**
La clase `Personaje` contiene un atributo `habilidadId` que referencia a la habilidad asociada:
```java title="model.Personaje"
public class Personaje {
    private ObjectId id;
    private String nombre;
    private ObjectId habilidadId; // Referencia a la habilidad asociada

    // Constructores (por defecto y parametrizado)
    
    // Getters y setters
}
```

### Operaciones CRUD

#### **2.1. Crear un Personaje con su Habilidad**
Para insertar un personaje con una habilidad referenciada, podemos recuperar la habilidad por medio del nombre. Una vez recuperada, debemos asociar la habilidad al personaje y actualizar la lista de personajes en la habilidad:

```java title="database.PersonajesRepository"
public void insertarHabilidad(Habilidad habilidad) {
    habilidadesCollection.insertOne(habilidad);
}

// Recupera una habilidad
public Habilidad obtenerHabilidad(String nombre) {
    Habilidad habilidad = habilidadesCollection.find(Filters.eq("nombre", nombre)).first();
    return habilidad;
}

public void insertarPersonajeConHabilidad(Personaje personaje, String nombreHabilidad) {
    Habilidad habilidad = obtenerHabilidad(nombreHabilidad);
    if (habilidad != null) {
        // Establecemos el id de la habilidad al personaje
        personaje.setHabilidadId(habilidad.getId());

        // Insertamos el personaje y recuperamos el id con el que se insertó
        InsertOneResult result = personajesCollection.insertOne(personaje);
        BsonValue idPersonajeInsertado = result.getInsertedId();

        // Actualizamos la lista de personajes en la habilidad asociada
        habilidadesCollection.updateOne(
            Filters.eq("_id", habilidad.getId()),
            Updates.addToSet("personajesIds", idPersonajeInsertado)
        );
    } else {
        // Insertamos el personaje
        personajesCollection.insertOne(personaje);
    }
}
```

**Ejemplo de uso:**
```java title="Main"
Habilidad nuevaHabilidad = new Habilidad("Fuerza Sobrehumana", "Incrementa la fuerza física.");
PersonajesRepository.getInstance().insertarHabilidad(nuevaHabilidad);

// Crear un nuevo personaje
Arma arma = new Arma("Espada Larga", "Una espada con filo brillante y equilibrada.");
Personaje personaje = new Personaje("Caballero oscuro", arma);

// Insertar el personaje con la habilidad recién creada
PersonajesRepository.getInstance().insertarPersonajeConHabilidad(personaje, "Fuerza Sobrehumana");
```

#### **2.2. Leer un Personaje con su Habilidad**
Para recuperar un personaje y su habilidad asociada, se consulta primero al personaje y luego se recupera la habilidad referenciada:

```java title="database.PersonajesRepository"
// Recuperar un personaje con su habilidad
public void obtenerPersonajeConHabilidad(String nombrePersonaje) {
    Personaje personaje = personajesCollection.find(Filters.eq("nombre", nombrePersonaje)).first();
    if (personaje != null) {
        Habilidad habilidad = habilidadesCollection.find(Filters.eq("_id", personaje.getHabilidadId())).first();
        System.out.println("Personaje encontrado: " + personaje);
        if (habilidad != null) {
            System.out.println("Habilidad asociada: " + habilidad);
        }
    } else {
        System.out.println("No se encontró el personaje con nombre: " + nombrePersonaje);
    }
}
```

#### **2.3. Actualizar la Habilidad de un Personaje**
Si queremos actualizar la habilidad de un personaje, debemos:
1. Remover al personaje de la lista de personajes en la habilidad anterior.
2. Asignar la nueva habilidad al personaje.
3. Añadir al personaje a la lista de personajes en la nueva habilidad.

```java title="database.PersonajesRepository"
public void actualizarHabilidadPersonaje(String nombrePersonaje, ObjectId nuevaHabilidadId) {
    // Recuperar el personaje
    Personaje personaje = personajesCollection.find(Filters.eq("nombre", nombrePersonaje)).first();
    if (personaje != null) {
        // Eliminar el personaje de la lista de la habilidad anterior
        habilidadesCollection.updateOne(
            Filters.eq("_id", personaje.getHabilidadId()),
            Updates.pull("personajesIds", personaje.getId())
        );

        // Actualizar la habilidad del personaje
        personajesCollection.updateOne(
            Filters.eq("_id", personaje.getId()),
            Updates.set("habilidadId", nuevaHabilidadId)
        );

        // Añadir el personaje a la nueva habilidad
        habilidadesCollection.updateOne(
            Filters.eq("_id", nuevaHabilidadId),
            Updates.addToSet("personajesIds", personaje.getId())
        );
    } else {
        System.out.println("No se encontró el personaje con nombre: " + nombrePersonaje);
    }
}
```

#### **2.4. Eliminar un Personaje y su Referencia en Habilidad**
Para eliminar un personaje, debemos remover su referencia de la lista de personajes en la habilidad correspondiente:

```java title="database.PersonajesRepository"
public void eliminarPersonajeConHabilidad(String nombrePersonaje) {
    // Recuperar el personaje
    Personaje personaje = personajesCollection.find(Filters.eq("nombre", nombrePersonaje)).first();
    if (personaje != null) {
        // Eliminar el personaje de la lista en la habilidad
        habilidadesCollection.updateOne(
            Filters.eq("_id", personaje.getHabilidadId()),
            Updates.pull("personajesIds", personaje.getId())
        );

        // Eliminar el personaje
        personajesCollection.deleteOne(Filters.eq("_id", personaje.getId()));
        System.out.println("Personaje eliminado con éxito.");
    } else {
        System.out.println("No se encontró el personaje con nombre: " + nombrePersonaje);
    }
}
```

---

## Mapeo de la relación N\:M

En esta relación, un **Personaje** puede tener varias **Debilidades** y una **Debilidad** la pueden tener varios **Personajes**. No obstante, esta relación no la haremos bidireccional, es decir, las **Debilidades** no almacenan información sobre los personajes que las tienen. Esto simplifica la estructura de las colecciones, ya que únicamente el **Personaje** mantiene una lista de referencias a sus debilidades.

En este caso:
- **Personaje** tiene un atributo `debilidadesIds`, que es una lista de referencias a las debilidades asociadas.
- **Debilidad** no tiene un atributo relacionado con los personajes.

### Definir los POJOs

#### **1.1. Clase Debilidad**
La clase `Debilidad` representa las debilidades que pueden estar asociadas a uno o más personajes, pero no tienen información de ellos:
```java title="model.Debilidad"
public class Debilidad {
    private ObjectId id;
    private String nombre;
    private String descripcion;

    // Constructores (por defecto y parametrizado)
    
    // Getters y setters
}
```

#### **1.2. Clase Personaje**
La clase `Personaje` contiene un atributo `debilidadesIds` que referencia a las debilidades asociadas:
```java title="model.Personaje"
import java.util.List;

public class Personaje {
    private ObjectId id;
    private String nombre;
    private Arma arma; // Relación 1:1 embebida
    private ObjectId habilidadId; // Referencia a la habilidad asociada
    private List<ObjectId> debilidadesIds; // Lista de referencias a las debilidades asociadas

    // Constructores (por defecto y parametrizado)
    
    // Getters y setters
}
```

---

### Operaciones CRUD

#### **2.1. Asociar Debilidades a un Personaje**
Para asociar una o más debilidades a un personaje:
1. Actualizamos la lista de `debilidadesIds` en el personaje.
2. No se realiza ningún cambio en la colección de **Debilidades**, ya que la relación no es bidireccional.

```java title="database.PersonajesRepository"
// Recupera una debilidad
public Debilidad obtenerDebilidad(String nombre) {
    return debilidadesCollection.find(Filters.eq("nombre", nombre)).first();
}

public void asociarDebilidadesAPersonaje(String nombrePersonaje, List<String> nombresDebilidades) {
    // Recuperar el personaje
    Personaje personaje = obtenerPersonaje(nombrePersonaje);
    if (personaje != null) {
        for (String nombreDebilidad : nombresDebilidades) {
            // Recuperar la debilidad
            Debilidad debilidad = obtenerDebilidad(nombreDebilidad);
            if (debilidad != null) {
                // Agregar la referencia de la debilidad al personaje
                personajesCollection.updateOne(
                    Filters.eq("_id", personaje.getId()),
                    Updates.addToSet("debilidadesIds", debilidad.getId())
                );
            } else {
                System.out.println("No se encontró la debilidad con nombre: " + nombreDebilidad);
            }
        }
        System.out.println("Debilidades asociadas al personaje con éxito.");
    } else {
        System.out.println("No se encontró el personaje con nombre: " + nombrePersonaje);
    }
}
```

**Ejemplo de uso:**
```java title="Main"
// Asociar debilidades a un personaje
List<String> nombresDebilidades = List.of("Fobia al fuego", "Miedo a las alturas");
PersonajesRepository.getInstance().asociarDebilidadesAPersonaje("Caballero oscuro", nombresDebilidades);
```


#### **2.2. Leer un Personaje con sus Debilidades**
Para recuperar un personaje junto con sus debilidades, se realiza lo siguiente:
1. Consultar el personaje.
2. Recuperar todas las debilidades referenciadas en su lista `debilidadesIds`.

```java title="database.PersonajesRepository"
public void obtenerPersonajeConDebilidades(String nombrePersonaje) {
    Personaje personaje = personajesCollection.find(Filters.eq("nombre", nombrePersonaje)).first();
    if (personaje != null) {
        System.out.println("Personaje encontrado: " + personaje);
        List<ObjectId> debilidadesIds = personaje.getDebilidadesIds();
        for (ObjectId debilidadId : debilidadesIds) {
            Debilidad debilidad = debilidadesCollection.find(Filters.eq("_id", debilidadId)).first();
            if (debilidad != null) {
                System.out.println("Debilidad: " + debilidad);
            }
        }
    } else {
        System.out.println("No se encontró el personaje con nombre: " + nombrePersonaje);
    }
}
```

**Ejemplo de uso:**
```java title="Main"
// Consultar un personaje con sus debilidades
PersonajesRepository.getInstance().obtenerPersonajeConDebilidades("Caballero oscuro");
```


#### **2.3. Desasociar una Debilidad de un Personaje**
Para desasociar una debilidad de un personaje, simplemente eliminamos la referencia de la debilidad en la lista `debilidadesIds` del personaje.

```java title="database.PersonajesRepository"
public void desasociarDebilidadDePersonaje(String nombrePersonaje, String nombreDebilidad) {
    // Recuperar el personaje
    Personaje personaje = obtenerPersonaje(nombrePersonaje);
    if (personaje != null) {
        // Recuperar la debilidad
        Debilidad debilidad = debilidadesCollection.find(Filters.eq("nombre", nombreDebilidad)).first();
        if (debilidad != null) {
            // Eliminar la referencia de la debilidad en el personaje
            personajesCollection.updateOne(
                Filters.eq("_id", personaje.getId()),
                Updates.pull("debilidadesIds", debilidad.getId())
            );
            System.out.println("Debilidad desasociada del personaje con éxito.");
        } else {
            System.out.println("No se encontró la debilidad con nombre: " + nombreDebilidad);
        }
    } else {
        System.out.println("No se encontró el personaje con nombre: " + nombrePersonaje);
    }
}
```

**Ejemplo de uso:**
```java title="Main"
// Desasociar una debilidad de un personaje
PersonajesRepository.getInstance().desasociarDebilidadDePersonaje("Caballero oscuro", "Fobia al fuego");
```

#### **2.4. Eliminar un Personaje**
Para eliminar un personaje, no es necesario realizar cambios en la colección de debilidades, ya que no almacenan información sobre los personajes.

```java title="database.PersonajesRepository"
public void eliminarPersonaje(String nombrePersonaje) {
    // Eliminar el personaje
    personajesCollection.deleteOne(Filters.eq("nombre", nombrePersonaje));
    System.out.println("Personaje eliminado con éxito.");
}
```

**Ejemplo de uso:**
```java title="Main"
// Eliminar un personaje
PersonajesRepository.getInstance().eliminarPersonaje("Caballero oscuro");
```

## Ejercicio

Implementa el ejercicio de las Misiones utilizando MongoDB como base de datos. Recuerda que en el apartado anterior, Diseño documental, analizamos qué colecciones debíamos crear y cómo íbamos a gestionar las relaciones.

Puedes descargar el enunciado en este [enlace](../files/Ejercicio%20relaciones.%20Misiones.pdf).

</div>