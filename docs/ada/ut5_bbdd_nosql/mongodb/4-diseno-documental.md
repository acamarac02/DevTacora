---
sidebar_position: 4
sidebar_label: Diseño documental
title: Diseño documental y relaciones entre documentos
---

<div class="justify-text">

En este apartado estudiaremos qué criterios debemos tener en cuenta a la hora de diseñar nuestras bases de datos documentales, con el objetivo de garantizar la eficiencia en el acceso a los datos.

:::warning
Ten en cuenta que este apartado lo explicaremos de forma superficial y habrá aspectos muy importantes en el diseño a los que nosotros no daremos mucha importancia.
:::

## 1. Metodología de diseño de bases de datos documentales

El diseño de bases de datos documentales en MongoDB difiere significativamente de los modelos relacionales tradicionales, ya que se basa en la flexibilidad de los documentos JSON/BSON para modelar datos de manera más natural y eficiente. Para lograr un diseño óptimo, se deben considerar aspectos como la estructura de los documentos, la indexación, las consultas y el patrón de acceso a los datos.

A continuación, se presentan las principales fases de diseño en una base de datos documental, como MongoDB:

### 1.1. Análisis de Requisitos y Modelo de Datos
Antes de diseñar la estructura de los documentos, es fundamental entender los requisitos del sistema, incluyendo:
- **Casos de uso:** Cómo se accederán y manipularán los datos. Se deben definir las consultas más frecuentes y operaciones críticas para optimizar el modelo de datos. Por ejemplo, en un e-commerce, las búsquedas de productos deben ser rápidas, mientras que las actualizaciones de inventario pueden ejecutarse en segundo plano.
- **Volumen de datos:** Estimación del tamaño y el crecimiento de la base de datos. Bases de datos con documentos grandes pueden requerir fragmentación (**sharding**) para evitar problemas de rendimiento.
- **Frecuencia de consultas y escrituras:** Identificación de las operaciones más comunes:
    - **Lectura intensiva**: Optimizar índices y evitar consultas innecesarias.
    - **Escritura intensiva**: Usar referencias en lugar de documentos embebidos si los datos cambian con frecuencia.
    - **Balanceado**: Analizar estrategias para distribuir la carga.
- **Escalabilidad:** Consideración del rendimiento y la replicación de los datos. Es importante definir si se necesita **escalabilidad vertical** (mejorar un solo servidor) o **horizontal** (sharding). También se recomienda el uso de réplicas para garantizar disponibilidad y distribuir datos geográficamente.

### 1.2. Elección entre Modelado Embebido o Normalizado
MongoDB permite dos enfoques principales para representar datos:
- **Modelado Embebido:** Datos relacionados se almacenan en el mismo documento. Esto es ideal para consultas rápidas y datos que no cambian con frecuencia.
- **Modelado Referenciado (Normalizado):** Se utilizan referencias a otros documentos. Es útil cuando los datos relacionados son grandes o se reutilizan en múltiples lugares.

La decisión de usar una u otra dependerá de:
- **Frecuencia de acceso:** Si los datos se consultan juntos con frecuencia, conviene embebidos.
- **Tamaño del documento:** Documentos demasiado grandes pueden afectar el rendimiento. Ten en cuenta que el tamaño máximo de cada documento en MongoDB es de 16MB.
- **Manejo de actualizaciones:** Si se actualizan con frecuencia, una estructura referenciada puede ser mejor.

### 1.3. Indexación y Optimización de Consultas
El uso de índices es crucial en MongoDB para mejorar el rendimiento. Algunas estrategias incluyen:
- **Índices en campos frecuentemente consultados.**
- **Índices compuestos para consultas con múltiples criterios.**
- **Índices de texto para búsquedas en grandes volúmenes de datos.**
- **Índices geoespaciales en datos de ubicación.**

### 1.4. Estrategias de Particionamiento y Replicación
Cuando la base de datos crece, es necesario distribuir la carga:
- **Replicación:** Proporciona alta disponibilidad duplicando datos en múltiples servidores.
- **Sharding:** Distribuye datos en múltiples nodos para manejar grandes volúmenes de información.

:::info diferencias entre sharding y réplicas
La **diferencia clave entre sharding y uso de réplicas** en MongoDB radica en su propósito y funcionamiento:  

- El **objetivo del sharding** es distribuir los datos en múltiples servidores (nodos) para mejorar el rendimiento y la capacidad de almacenamiento. Los datos se dividen en **fragmentos (shards)** y cada fragmento se almacena en un nodo diferente. 
- El **objetivo de las réplicas** es garantizar **alta disponibilidad y tolerancia a fallos** mediante copias de los datos en varios servidores. Un **nodo primario** recibe todas las escrituras y sincroniza los datos con uno o más **nodos secundarios**. Si el primario falla, uno de los secundarios se convierte en el nuevo primario automáticamente.  

**Diferencias Clave**
| Característica | Sharding | Réplicas |
|--------------|---------|---------|
| **Propósito** | Escalar almacenamiento y rendimiento | Asegurar disponibilidad y recuperación ante fallos |
| **Estructura** | Datos distribuidos en múltiples servidores | Múltiples copias de los mismos datos |
| **Escalabilidad** | Horizontal (añadiendo más servidores) | No escala el almacenamiento, solo la disponibilidad |
| **Casos de uso** | Bases de datos grandes y con alto tráfico | Sistemas que requieren alta disponibilidad y redundancia |

En sistemas grandes, **sharding y réplicas se pueden combinar**, asegurando escalabilidad y disponibilidad al mismo tiempo.
:::

---

## 2. Modelado de Relaciones en MongoDB
En bases de datos relacionales, las relaciones entre entidades se gestionan con claves foráneas y tablas intermedias. En MongoDB, las relaciones se pueden modelar de diversas formas, según la naturaleza de los datos y las consultas esperadas.

### 2.1. Relación 1:1
Un personaje tiene estrictamente una arma asociada, lo que se puede modelar de las siguientes formas:

#### Opciones de Modelado

1. **Embebido en el mismo documento**
   En este caso, los datos del **Arma** se almacenan directamente dentro del documento del **Personaje**. Esto es útil cuando los datos del arma son pequeños y siempre se necesitan al acceder al personaje.

   ```json title="Colección Personajes"
   {
     "_id": 1,
     "nombre": "Caballero oscuro",
     "arma": {
       "id": 101,
       "nombre": "Espada Larga",
       "descripcion": "Una espada con filo brillante y equilibrada."
     }
   }
   ```

   **Ventajas:**
   - Mejora el rendimiento en consultas porque toda la información del personaje y su arma se obtiene en una sola operación.
   - Ideal para datos que siempre se acceden juntos.

   **Desventajas:**
   - Si los datos del arma son grandes o se actualizan frecuentemente, esto puede generar problemas, como aumentar el tamaño del documento y complicar las actualizaciones.

2. **Referencia a otro documento**
   Aquí, el documento del **Personaje** contiene solo una referencia al documento del **Arma** a través de un campo `arma_id`. El documento del **Arma** se almacena en su propia colección.
   ```json title="Colección Personajes"
   {
     "_id": 1,
     "nombre": "Caballero Oscuro",
     "arma_id": 101
   }
   ```

   ```json title="Colección Armas"
   {
     "_id": 101,
     "nombre": "Espada Larga",
     "descripcion": "Una espada con filo brillante y equilibrada."
   }
   ```

   **Ventajas:**
   - Útil cuando los datos del arma son grandes, se comparten entre diferentes personajes o se actualizan con frecuencia.
   - Reduce el tamaño del documento del personaje.

   **Desventajas:**
   - Requiere realizar consultas adicionales para obtener los datos del arma, lo que puede afectar el rendimiento si los datos se consultan frecuentemente.

#### Cuándo elegir cada opción

- **Embebido.**  Úsalo si:
  - Los datos del arma son pequeños y siempre se necesitan al consultar al personaje.
  - Las actualizaciones del arma son poco frecuentes.

- **Referenciado.** Úsalo si:
  - Los datos del arma son grandes o compartidos por varios personajes.
  - Las armas se actualizan frecuentemente o tienen su propio ciclo de vida independiente del personaje. 

En este caso, como el arma es única para cada personaje y casi siempre se accede junto al personaje, el modelado **embebido** sería ideal.

:::info en el documento embebido, ¿por qué el personaje es la entidad principal?
Técnicamente, **se podría modelar al Arma como colección principal y guardar al Personaje embebido dentro de ella**, pero esta no sería la mejor práctica para la mayoría de los casos de uso. 
- Si el acceso principal en tu aplicación se enfoca en obtener un arma y su portador (Personaje), este diseño permite recuperar toda la información con una única consulta.
- Si la aplicación necesita consultar principalmente personajes y sus datos, este diseño dificulta la consulta, ya que los personajes estarían embebidos dentro de las armas, lo que requeriría recorrer todos los documentos de armas para buscar un personaje específico.
- En la mayoría de los escenarios, el Personaje suele ser la entidad principal y el arma es un atributo del personaje. Este diseño invierte esa lógica natural, lo que podría confundir el diseño de la aplicación.
- Este diseño se vuelve complejo y poco práctico cuando el Personaje necesita gestionar múltiples relaciones con otras entidades (como habilidades, debilidades, etc.)
:::

### 2.2. Relación 1\:N (Uno a Muchos)
Para modelar la relación **1:N (Uno a Muchos)** entre **Personaje** y **Habilidad** en MongoDB (donde un **Personaje** tiene una habilidad, pero una habilidad puede ser compartida por múltiples personajes), y **siendo Personaje la entidad principal**, se pueden utilizar las siguientes estrategias:

#### Opciones de Modelado

1. **Embebido (cuando la habilidad está estrechamente ligada al personaje y no se comparte)** - No es nuestro caso pero vamos a ver cómo representarlo.  
   En este caso, la información de la **Habilidad** se almacena directamente dentro del documento del **Personaje**. Esto es adecuado cuando la habilidad es específica de un personaje y no es compartida con otros.

   ```json title="Colección Personaje"
   {
     "_id": 1,
     "nombre": "Cabellero oscuro",
     "arma_id": 101,
     "habilidad": {
       "id": 201,
       "nombre": "Fuerza Sobrehumana",
       "descripcion": "Incrementa la fuerza física."
     }
   }
   ```

   **Ventajas:**
   - Consulta eficiente, ya que toda la información del personaje y su habilidad se encuentra en un único documento.
   - Simplicidad en el diseño si la habilidad no se comparte entre personajes.

   **Desventajas:**
   - No es adecuado si una habilidad es compartida por varios personajes, ya que habría duplicación de datos (mismos datos de habilidad almacenados en múltiples documentos).

2. **Referenciado con ID en el documento del personaje (cuando las habilidades se comparten entre personajes)**  
   Aquí, el documento del **Personaje** incluye una referencia (`habilidad_id`) al documento correspondiente de **Habilidad**, que se almacena en su propia colección. Esto es útil si las habilidades son reutilizables entre múltiples personajes.

   ```json title="Colección Personajes"
   {
     "_id": 1,
     "nombre": "Caballero oscuro",
     "arma_id": 101,
     "habilidad_id": 201
   }
   ```

   ```json title="Colección Habilidades"
   {
     "_id": 201,
     "nombre": "Fuerza Sobrehumana",
     "descripcion": "Incrementa la fuerza física."
   }
   ```

   **Ventajas:**
   - No hay duplicación de datos, ya que la habilidad se almacena una sola vez y se puede compartir entre múltiples personajes.
   - Es fácil actualizar o modificar una habilidad sin afectar otros documentos.

   **Desventajas:**
   - Requiere una consulta adicional para recuperar los datos completos de la habilidad (por ejemplo, usando una operación `lookup` en una agregación).


#### Cuándo elegir cada opción

- **Embebido:**
  - Si cada habilidad es única y específica para un personaje. (No es nuestro caso)
  - Si la habilidad no cambia con frecuencia y no se comparte entre personajes.

- **Referenciado:**
  - Si las habilidades son reutilizables y pueden ser compartidas entre múltiples personajes.
  - Si las habilidades tienen su propio ciclo de vida (por ejemplo, se pueden modificar, eliminar o consultar independientemente de los personajes).

:::info ¿Qué pasaría si Habilidad (N) fuese la entidad principal?
Si **Habilidad** fuese la entidad principal y los personajes dependieran de las habilidades, podríamos modelar la relación de varias formas dependiendo de cómo se accede y se actualizan los datos. Esto implicaría que cada habilidad conoce a los personajes que la poseen.

**Opciones de Modelado**

#### 1. **Embebido: Los personajes se almacenan como un array dentro de cada habilidad**
En este modelo, cada documento de **Habilidad** contendrá un array con la información básica de los personajes que poseen esa habilidad.

```json title="Colección Habilidades"
{
  "_id": 201,
  "nombre": "Fuerza Sobrehumana",
  "descripcion": "Incrementa la fuerza física.",
  "personajes": [
    { "id": 1, "nombre": "Caballero oscuro", "arma_id": 101 },
    { "id": 2, "nombre": "Duende feroz", "arma_id": 102 }
  ]
}
```

**Ventajas:**
- Consulta eficiente si el acceso se centra en la habilidad y los personajes relacionados.
- Toda la información está contenida en un único documento.

**Desventajas:**
- Si los datos de los personajes cambian frecuentemente, la actualización de los subdocumentos puede ser costosa.
- No es adecuado si el número de personajes por habilidad crece mucho, ya que los documentos de habilidad pueden volverse muy grandes.

#### 2. **Referenciado: Los personajes son referenciados por ID dentro de cada habilidad**
En este modelo, cada documento de **Habilidad** incluye un array de IDs de los personajes que poseen esa habilidad. Los datos completos de los personajes se almacenan en una colección separada.

```json title="Colección Habilidades"
{
  "_id": 201,
  "nombre": "Fuerza Sobrehumana",
  "descripcion": "Incrementa la fuerza física.",
  "personajes_ids": [1, 2]
}
```

```json title="Colección Personajes"
{
  "_id": 1,
  "nombre": "Caballero oscuro",
  "arma_id": 101
}
{
  "_id": 2,
  "nombre": "Duende feroz",
  "arma_id": 102
}
```

**Ventajas:**
- Permite manejar un gran número de personajes asociados a una habilidad sin sobrecargar el documento de habilidad.
- Actualizar información del personaje no requiere modificar los documentos de habilidad.
- Más flexible si los personajes necesitan ser consultados o gestionados de forma independiente.

**Desventajas:**
- Consultar una habilidad con todos sus personajes requiere múltiples consultas (o un `lookup` en una agregación).

:::

### 2.3. Relación N\:M (Muchos a Muchos)
Para modelar la relación **N:M (Muchos a Muchos)** entre **Personaje** y **Debilidad** (donde un **Personaje** puede tener múltiples debilidades y cada **Debilidad** puede estar asociada a múltiples personajes), y considerando que **Personaje** es la entidad principal, podemos usar varios enfoques en MongoDB:

#### Opciones de Modelado

#### 1. **Embebido**
En este modelo, cada **Personaje** contiene un array embebido con las debilidades que tiene.

```json title="Colección Personajes"
{
  "_id": 1,
  "nombre": "Caballero oscuro",
  "arma_id": 101,
  "habilidades": [201],
  "debilidades": [
    { "id": 301, "nombre": "Fobia al fuego", "descripcion": "El personaje teme al fuego" },
    { "id": 302, "nombre": "Miedo a las alturas", "descripcion": "El personaje teme a las alturas" }
  ]
}
{
  "_id": 2,
  "nombre": "Duende feroz",
  "arma_id": 102,
  "habilidades": [201],
  "debilidades": [
    { "id": 301, "nombre": "Fobia al fuego", "descripcion": "El personaje teme al fuego" },
    { "id": 304, "nombre": "Miedo a las plantas", "descripcion": "El personaje teme a las plantas" }
  ]
}
```

**Ventajas:**
- Toda la información del personaje (incluyendo sus debilidades) está contenida en un solo documento.
- Consulta eficiente cuando el acceso se centra en los personajes.

**Desventajas:**
- Se produce duplicidad de datos (desnormalización), pudiendo llevar a inconsistencia de datos.
- Las actualizaciones de una debilidad compartida requerirían modificar múltiples documentos de personajes.

Esta solución no es recomendable.

#### 2. **Referenciado en arrays**
En este modelo, cada documento de **Personaje** contiene un array de IDs que referencia los documentos de **Debilidad**, almacenados en su propia colección.

```json title="Colección Personajes"
{
  "_id": 1,
  "nombre": "Caballero oscuro",
  "arma_id": 101,
  "habilidades": [201],
  "debilidades_ids": [301, 302]
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

**Ventajas:**
- Las debilidades son reutilizables entre múltiples personajes.
- Las actualizaciones en los datos de una debilidad se reflejan automáticamente en todos los personajes relacionados.
- Reduce el tamaño de los documentos de los personajes.

**Desventajas:**
- Requiere consultas adicionales para obtener los detalles de las debilidades (por ejemplo, con una operación `lookup`).

#### 3. **Colección intermedia (para relaciones dinámicas con metadatos adicionales)**
Este modelo utiliza una colección intermedia para representar la relación **N:M** entre **Personaje** y **Debilidad**. La colección intermedia puede almacenar información adicional, como cuándo se detectó la debilidad o el nivel de impacto de la debilidad en el personaje.

```json title="Colección Personajes"
{
  "_id": 1,
  "nombre": "Caballero oscuro",
  "arma_id": 101,
  "habilidades": [201]
}
```

```json title="Colección Debilidades"
{
  "_id": 301,
  "nombre": "Fobia al fuego",
  "descripcion": "El personaje teme al fuego"
}
```

```json title="Colección Intermedia Personaje_Debilidad"
{
  "personaje_id": 1,
  "debilidad_id": 301,
  "fecha_deteccion": "2025-01-01",
  "nivel_impacto": "Alto"
}
{
  "personaje_id": 1,
  "debilidad_id": 302,
  "fecha_deteccion": "2025-01-10",
  "nivel_impacto": "Moderado"
}
```

**Ventajas:**
- Permite almacenar información adicional sobre la relación entre el personaje y la debilidad.
- Es altamente flexible y escalable.
- Las debilidades y personajes pueden ser gestionados de forma independiente.

**Desventajas:**
- Las consultas pueden ser más complejas, ya que implican múltiples colecciones.

#### Cuándo elegir cada opción

- **Embebido:**
  - Si las debilidades son pocas.
  - Si las consultas siempre están centradas en los personajes y sus detalles.
  - La relación entre personajes y debilidades es estática y no cambia con frecuencia.

- **Referenciado:**
  - Si las debilidades son compartidas entre personajes.
  - Si las debilidades tienen valor independiente y necesitan ser gestionadas o consultadas fuera del contexto del personaje.

- **Colección intermedia:**
  - Si necesitas almacenar metadatos adicionales sobre la relación (por ejemplo, el nivel de impacto de la debilidad en cada personaje).
  - Si las consultas involucran tanto a los personajes como a las debilidades de manera flexible.

--- 

### Resumen práctico

| **Criterio**              | **Embebido**                                 | **Referenciado**                            |
|---------------------------|---------------------------------------------|--------------------------------------------|
| **Relación**              | 1:1 o pequeña 1:N                           | Grande 1:N o N:M                           |
| **Acceso conjunto**       | Datos siempre se acceden juntos             | Datos se acceden por separado              |
| **Frecuencia de cambio**  | Datos no cambian frecuentemente             | Datos cambian frecuentemente               |
| **Independencia**         | Datos dependen del documento principal      | Datos son independientes                   |
| **Tamaño de datos**       | Datos pequeños                              | Datos grandes                              |
| **Consultas cruzadas**    | No son necesarias                           | Son frecuentes                             |

---

### Reglas generales para tomar decisiones
1. **¿Los datos relacionados son independientes?**
   - Si **sí**, usa referenciado.
   - Si **no**, usa embebido.

2. **¿Cuántos datos relacionados hay?**
   - Si **pocos**, usa embebido.
   - Si **muchos**, usa referenciado.

3. **¿Qué tan frecuentemente se consultan juntos?**
   - Si **siempre**, usa embebido.
   - Si **a veces**, usa referenciado.

4. **¿Los datos cambian frecuentemente?**
   - Si **sí**, usa referenciado.
   - Si **no**, usa embebido.

5. **¿Los datos son reutilizables por otros documentos?**
   - Si **sí**, usa referenciado.
   - Si **no**, usa embebido.

## Ejercicios
### Ejercicio 1: Misiones

Partiendo del ejercicio Misiones que realizamos en el tema anterior, determina el diseño de la base de datos si utilizaramos MongoDB en vez de MySQL. Justifica las decisiones que has tomado en cuanto a las relaciones, teniendo en cuenta las normas descritas anteriormente y los casos de uso de nuestro programa.

Define las colecciones que debemos crear y haz un ejemplo de documento JSON para cada una de ellas.

Puedes descargar el enunciado en este [enlace](../files/Ejercicio%20relaciones.%20Misiones.pdf).

#### Solución

**Análisis inicial:**
- La mayoría de casos de uso están centrados en las Misiones (3 - 7). Esta será la entidad principal.
- Necesitamos tener acceso fácil a los usuarios para insertarlos y cambiar su nombre de usuario.
- Necesitamos tener acceso fácil a las recompensas para mostrarlas en el caso de uso 3.

**Relación N:M Jugador - Misión:**
1. **¿Desde el jugador necesito saber las misiones?** No, no hay ningún caso de uso

2. **¿Desde las misiones necesito saber las misiones?** Sí, casos de uso 5 y 7

3. **¿Los datos relacionados son independientes?** Si **sí**, usa referenciado.

4. **¿Cuántos datos relacionados hay?** Si **muchos**, usa referenciado.

5. **¿Qué tan frecuentemente se consultan juntos?** Si **siempre**, usa embebido.

6. **¿Los datos cambian frecuentemente?** Si **sí**, usa referenciado. (Podemos asignar y rechazar misiones a los Jugadores)

7. **¿Los datos son reutilizables por otros documentos?** Si **no**, usa embebido. La otra entidad, Recompensa no necesita saber nada de los Jugadores.

Analizando las respuestas, es preferible el **uso de referenciado**, de forma que la Misión almacena la lista de Jugadores asignados.

**Relación 1:N Misión - Recompensa:** 

Una misión tiene asignada una recompensa pero una recompensa puede estar en varias misiones.

1. **¿Desde la misión necesito saber las recompensas?** Sí, caso de uso 7.

2. **¿Desde las recompensas necesito saber las misiones?** Sí, caso de uso 8. ¿Relación bidireccional?

3. **¿Los datos relacionados son independientes?** Si **sí**, usa referenciado. En el caso de uso 8 tengo que mostrar las recompensas.

4. **¿Cuántos datos relacionados hay?** Si **pocos** (desde el punto de vista de Misión), usa embebido. Si **muchos** (desde el punto de vista de Recompensa), usa referenciado.

5. **¿Qué tan frecuentemente se consultan juntos?** Si **a veces**, usa referenciado.

6. **¿Los datos cambian frecuentemente?** Si **sí**, usa referenciado. (Podemos cambiar las recompensas de las misiones)

7. **¿Los datos son reutilizables por otros documentos?** Si **no**, usa embebido. La otra entidad, Jugador no necesita saber nada de las Recompensas.

Si analizamos las respuestas, **es preferible el referenciado**, teniendo Misión la referencia de la Recompensa asignada. Además, podemos hacer la relación bidireccional, teniendo Recompensa una lista de las Misiones en la que está asignada.

:::warning CUIDADO CON LAS RELACIONES BIDIRECCIONALES
Podemos hacer relaciones bidireccionales, pero siendo conscientes que hay que tener mucho cuidado en las actualizaciones de la relación, modificando los valores en ambas colecciones; en caso contrario, podemos producir inconsistencia de datos.
Si la opción 8 se va a ejecutar con poca frecuencia, podemos hacer la relación unidireccional y soportar las consultas de unión a la hora de mostrar las misiones que tienen asignadas esa recompensa.
:::

**Ejemplos de documentos:**

```json title="Colección Jugadores"
{
  "_id": "j1",  // Identificador único del jugador
  "nombre": "Juan Pérez"
}
```

```json title="Colección Misiones"
{
  "_id": "m1",  // Identificador único de la misión
  "nombre": "Salvar la aldea",
  "descripcion": "Rescatar a los aldeanos de los enemigos.",
  "recompensa_id": "r1",  // Referencia a la recompensa asociada
  "jugadores_ids": ["j1", "j2"]  // Referencias a los jugadores asignados
}
```

```json title="Colección Recompensas"
{
  "_id": "r1",  // Identificador único de la recompensa
  "nombre": "Espada legendaria",
  "descripcion": "Una poderosa espada mágica.",
  "misiones_ids": ["m1", "m3"]  // Referencias a las misiones que otorgan esta recompensa
}
```


### Ejercicio 2: Stardam Valley (v2)

Realiza el mismo proceso que en el ejercicio anterior para la base de datos de Stardam Valley v2.

### Ejercicio 3: Gestión de Pedidos de una Tienda

La tienda de sofás **"Tapizados Ágora"** necesita diseñar una base de datos NoSQL para gestionar la información relacionada con su catálogo de productos, clientes, pedidos y entregas.

#### Información a gestionar
La empresa necesita almacenar los siguientes datos:

1. De los **Clientes** conocemos:
   - Identificador único del cliente.
   - Nombre y apellidos.
   - Correo electrónico.
   - Dirección(es) (pueden tener múltiples direcciones, por ejemplo, casa y oficina). De cada dirección conocemos código postal, calle y número.

2. **Sofás (Productos):**
   - Nombre del modelo (e.g., "Sofá Relax 3000").
   - Descripción (e.g., "Un sofá reclinable con tapizado de cuero").
   - Precio.
   - Stock disponible.

3. Por cada **Pedido** que realicen los clientes almacenaremos:
   - Fecha del pedido.
   - Productos solicitados (cantidad, modelo).
   - Precio total del pedido.
   - Estado del pedido (pendiente, en preparación, enviado, entregado).
   - Dirección de entrega asociada al cliente.

4. Por último, almacenaremos los estados de las **entregas** de los pedidos:
   - Fecha estimada de entrega.
   - Transportista asignado.
   - Estado de la entrega (pendiente, en tránsito, entregado).


#### Casos de uso

La aplicación Java que vamos a desarrollar ofrecerá las siguientes opciones:

1. **Consulta del catálogo de productos:**
   - Mostrar a los clientes los modelos de sofás disponibles, su descripción, precios, y stock.
   - Permitirá búsquedas por nombre, tapiz o rango de precios.

2. **Gestión de pedidos:**
   - Al crear un pedido, se debe guardar la información del cliente, los productos seleccionados, la cantidad solicitada y el total del pedido. También se iniciará la entrega en estado pendiente.
   - Permitir consultar el estado del pedido en cualquier momento.

3. **Consulta del historial de pedidos del cliente:**
   - Mostrar todos los pedidos realizados por un cliente, con los detalles de cada pedido (fecha, sofás comprados, precio de cada sofá, total). También se deberá mostrar el nombre, correo y direcciones del cliente.

4. **Seguimiento de entregas:**
   - Consultar la fecha estimada de entrega y el estado del envío de un pedido.
   - Registrar actualizaciones sobre el estado de una entrega.

5. **Control del stock:**
   - Reducir automáticamente el stock de los productos al registrar un pedido.
   - Mostrar los sofás con bajo stock para reposición.

6. **Gestión de precios:**
  - Modificar el precio de los productos.

#### Tareas a realizar

Diseña la base de datos utilizando un enfoque NoSQL y justificando si se usarán documentos embebidos, referencias o colecciones intermedias para cada tipo de relación. Crea un fichero JSON de ejemplo para cada colección que crees.

<div class="hidden-summary">

#### Solución

**Entidades**: Cliente, Dirección, Pedido, Producto y Entrega.

**Relaciones**: 
  - Cliente - (1:N) - Dirección
  - Cliente - (1:N) - Pedido
  - Pedido - (N:M) - Producto
  - Pedido - (1:1) - Entrega

**Entidades principales**: Pedido y Producto. (La mayoría de operaciones se realizan sobre estas dos entidades)

Comenzamos a valorar las relaciones:

**Cliente - (1:N) - Dirección**:
1. **¿Los datos relacionados son independientes?** Si **no**, usa embebido.

2. **¿Cuántos datos relacionados hay?** Si **pocos**, usa embebido. (Se entiende que una persona no tendrá más de 5 direcciones)

3. **¿Qué tan frecuentemente se consultan juntos?** Si **siempre**, usa embebido.

4. **¿Los datos cambian frecuentemente?** Si **no**, usa embebido.

5. **¿Los datos son reutilizables por otros documentos?** Si **sí**, usa referenciado.

Conclusión: **EMBEBIDO**.

**Cliente - (1:N) - Pedido**:
1. **¿Los datos relacionados son independientes?** Si **sí**, usa referenciado.

2. **¿Cuántos datos relacionados hay?** Si **muchos**, usa referenciado.

3. **¿Qué tan frecuentemente se consultan juntos?** Si **a veces**, usa referenciado.

4. **¿Los datos cambian frecuentemente?** Si **sí**, usa embebido. (No será con frecuencia pero un usuario puede actualizar su correo, dirección... Nos interesa independencia)

5. **¿Los datos son reutilizables por otros documentos?** Si **no**, usa embebido.

Conclusión: **REFERENCIADO**. ¿Bidireccional o unidireccional?
- ¿El cliente necesita saber sus pedidos? Caso de uso 3
- ¿El pedido necesita conocer el cliente que lo ha realizado? Igual que en SQL, la entidad N es la que debería tener la referencia de la entidad 1.
Se puede hacer bidireccional o guardar solo en el pedido el id del cliente.

**Pedido - (N:M) - Producto**:
1. **¿Los datos relacionados son independientes?** Si **sí**, usa referenciado.

2. **¿Cuántos datos relacionados hay?** Si **muchos**, usa referenciado.

3. **¿Qué tan frecuentemente se consultan juntos?** Si **a veces**, usa referenciado.

4. **¿Los datos cambian frecuentemente?** Si **sí**, usa referenciado. (Se puede actualizar stock, precio...)

5. **¿Los datos son reutilizables por otros documentos?** Si **no**, usa embebido.

Conclusión: **REFERENCIADO**. No tiene sentido que sea bidireccional. El pedido contendrá la lista de productos elegidos.

**Pedido - (1:1) - Entrega**:
1. **¿Los datos relacionados son independientes?** Si **no**, usa embebido.

2. **¿Cuántos datos relacionados hay?** Si **pocos**, usa embebido.

3. **¿Qué tan frecuentemente se consultan juntos?** Si **a veces**, usa referenciado.

4. **¿Los datos cambian frecuentemente?** Si **sí**, usa referenciado.

5. **¿Los datos son reutilizables por otros documentos?** Si **no**, usa embebido.

Conclusión: **EMBEBIDO**

```json title="Colección Cliente"
{
  "_id": "c1",
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "direcciones": [
    { "codigoPostal": "28001", "calle": "Calle Mayor", "numero": 5 },
    { "codigoPostal": "28002", "calle": "Avenida Sol", "numero": 12 }
  ]
}
```

```json title="Colección Pedido"
{
  "_id": "p1",
  "fecha": "2023-01-15",
  "cliente_id": "c1",
  "direccion_entrega": { "codigoPostal": "28001", "calle": "Calle Mayor", "numero": 5 },
  "productos": [
    { "producto_id": "s1", "cantidad": 2, "precio": 300 },
    { "producto_id": "s2", "cantidad": 1, "precio": 500 }
  ],
  "precioTotal": 800.0,
  "estado": "pendiente",
  "entrega": {
    "fechaEstimada": "2023-01-20",
    "transportista": "DHL",
    "estado": "pendiente"
  }
}
```

:::info
En la colección pedido se ha vuelto a incluir la **dirección** del cliente porque, a futuro, el cliente puede cambiar su dirección pero el pedido ya se entregó. También se ha incluido el **precio de cada producto** por el mismo motivo, porque los productos pueden cambiar de precio con el tiempo pero nos interesa saber cuánto le costó al cliente.
:::

```json title="Colección Catálogo"
{
  "_id": "s1",
  "nombre": "Sofá Relax 3000",
  "descripcion": "Un sofá reclinable con tapizado de cuero",
  "precio": 400.0,
  "stock": 10
}
```
</div>

</div>