---
title: Archivos de Texto Plano y CSV
sidebar_position: 3
description: Lectura y escritura de archivos de texto plano y procesamiento de datos tabulares (CSV) utilizando Java NIO.2 y try-with-resources.
keywords: [ficheros de texto, csv, nio2, readalllines, split, try-with-resources, utf8]
---

<div class="justify-text">

Los archivos de texto plano son el formato más extendido para almacenar información legible por personas: archivos de configuración, registros de actividad (*logs*), volcados de datos y archivos tabulares (**CSV**).

En este tema aprenderemos a leer y escribir texto en disco utilizando las utilidades de **Java NIO.2**, garantizando la liberación segura de recursos del sistema operativo mediante **`try-with-resources`** y procesando archivos CSV extrayendo sus columnas mediante bucles y división por campos (`split`).

---

## La Codificación de Caracteres: UTF-8

Un archivo de texto no guarda letras directamente, sino números binarios que representan caracteres según una tabla de conversión. Si un archivo se escribe con una codificación (ej. `ISO-8859-1` en Windows clásico) y se lee con otra (ej. `UTF-8` en Linux o macOS), aparecen los temidos caracteres corruptos como `Ã±` o símbolos extraños (*mojibake*).

En el desarrollo de software actual, el estándar universal indiscutible es **UTF-8**:
* Representa cualquier carácter de cualquier idioma (alfabeto latino, tildes, eñes, caracteres asiáticos, emojis).
* En Java se encuentra definido como constante estática en `java.nio.charset.StandardCharsets.UTF_8`.

:::tip UTF-8 por defecto en Java moderno
A partir de **Java 18**, la máquina virtual de Java utiliza **UTF-8 como codificación predeterminada en todas las plataformas**. No obstante, en código profesional se recomienda explicitar siempre el juego de caracteres en los métodos de lectura y escritura para garantizar la portabilidad total entre entornos.
:::

---

## Gestión Segura de Recursos

Cada vez que abrimos un flujo de lectura o escritura hacia un archivo, la máquina virtual de Java le solicita al sistema operativo un **descriptor de archivo** (*file handle*). Este descriptor es un recurso finito:

* Si el programa no cierra el flujo tras utilizarlo, se produce una **fuga de recursos** (*resource leak*).
* El archivo queda **bloqueado por el sistema operativo**, impidiendo que otros procesos o la propia aplicación puedan renombrarlo, moverlo o borrarlo.
* Si se abren miles de archivos sin cerrarlos, el sistema operativo denegará nuevas aperturas lanzando un error del tipo *"Too many open files"*.

<div class="flex justify-center" style={{ display: 'flex', justifyContent: 'center' }}>

```mermaid
flowchart TD
    Inicio["Apertura del flujo de archivo"] --> BloqueTry["Ejecución del bloque try"]
    BloqueTry --> Decision{"¿Ocurre una excepción?"}
    Decision -- "No (éxito)" --> CierreAuto["Java ejecuta close() automáticamente"]
    Decision -- "Sí (error)" --> CierreAuto
    CierreAuto --> Fin["Recurso liberado en el SO sin bloqueos"]
```

</div>

### Control y Cierre Automático de Recursos

Para resolver este problema de raíz, Java dispone de la sentencia **`try-with-resources`**. Cualquier recurso que implemente la interfaz `java.lang.AutoCloseable` (como los flujos abiertos con `Files.lines()` o flujos de bytes) puede declararse dentro de los paréntesis del `try`:

```java
// El flujo 'lineas' se cerrará SIEMPRE al salir del bloque, ocurra o no una excepción
try (Stream<String> lineas = Files.lines(rutaArchivo, StandardCharsets.UTF_8)) {
    lineas.forEach(linea -> {
        System.out.println(linea);
    });
} catch (IOException e) {
    System.err.println("Error al leer el archivo: " + e.getMessage());
}
```

:::info Adiós al bloque `finally` manual
Antes de la llegada de `try-with-resources`, los desarrolladores debían invocar manualmente el método `close()` dentro de un bloque `finally`, lo que requería anidar nuevos bloques `try-catch` para capturar posibles excepciones al cerrar el recurso. Con `try-with-resources` el compilador de Java inyecta ese cierre automático de forma limpia y garantizada.
:::

---

## Estrategias de Lectura de Texto Plano

Java NIO.2 ofrece dos estrategias principales para leer texto plano. La elección de una u otra depende fundamentalmente del **tamaño del archivo** y de la memoria RAM disponible:

```mermaid
flowchart TD
    subgraph Memoria["Enfoque 1: Carga Completa en Memoria"]
        A1["Archivo en disco"] -->|"Volcado total en memoria"| A2["Memoria RAM (Lista completa de líneas)"]
    end
    subgraph Streaming["Enfoque 2: Lectura Línea a Línea (Streaming)"]
        B1["Archivo en disco"] -->|"Línea a línea bajo demanda"| B2["Procesamiento con forEach"]
    end
```

### Carga Completa en Memoria

Para archivos pequeños o medianos (de unos pocos kilobytes o megabytes), la forma más rápida y cómoda es volcar todo el contenido directamente en memoria:

* **`Files.readString(Path ruta)`**: Lee todo el archivo y lo devuelve como un único `String`.
* **`Files.readAllLines(Path ruta)`**: Lee todas las líneas y las devuelve almacenadas en una lista `List<String>`.

Como devuelve una lista estándar de Java, se puede recorrer con un bucle `for` tradicional:

```java
Path ruta = Path.of("datos", "usuarios.txt");

try {
    // Lectura completa como lista de cadenas
    List<String> lineas = Files.readAllLines(ruta, StandardCharsets.UTF_8);
    
    // Recorrido clásico con bucle for
    for (String linea : lineas) {
        System.out.println(linea);
    }
} catch (IOException e) {
    System.err.println("Error de lectura: " + e.getMessage());
}
```

:::warning Peligro en archivos gigantes
Si intentas leer un archivo de logs de varios gigabytes con `Files.readAllLines()`, Java intentará cargarlo entero en la memoria RAM, lo que provocará irremediablemente un error fatal **`OutOfMemoryError`**.
:::

---

### Lectura en Flujo Continuo

Cuando el archivo es muy grande o no conocemos su tamaño, la mejor alternativa es **`Files.lines(Path ruta)`**, que va leyendo las líneas del disco una a una bajo demanda en lugar de cargarlas todas a la vez en la memoria.

Para procesar cada línea utilizamos el método **`forEach`**, colocando nuestro código dentro de las llaves `{ ... }`:

```java
Path ruta = Path.of("datos", "servidor_acceso.log");

// IMPORTANTE: Files.lines() implementa AutoCloseable, por lo que debe abrirse en un try-with-resources
try (Stream<String> lineas = Files.lines(ruta, StandardCharsets.UTF_8)) {
    lineas.forEach(linea -> {
        // Imprimimos directamente cada línea leída del archivo:
        System.out.println(linea);
    });
} catch (IOException e) {
    System.err.println("Error procesando el archivo: " + e.getMessage());
}
```

---

## Estrategias de Escritura de Texto Plano

Para escribir texto plano en disco disponemos de dos métodos de conveniencia de la clase `Files`:

### Métodos de Escritura

* **`Files.writeString(Path ruta, CharSequence texto, OpenOption... opciones)`**: Escribe una única cadena de texto en el archivo.
* **`Files.write(Path ruta, Iterable<? extends CharSequence> lineas, OpenOption... opciones)`**: Escribe una colección de líneas (por ejemplo, un `List<String>`), añadiendo automáticamente el salto de línea al final de cada una.

### Opciones de Apertura

El tercer parámetro opcional permite controlar el comportamiento de la escritura mediante el enumerado `java.nio.file.StandardOpenOption`:

| Opción | Comportamiento |
| :--- | :--- |
| `CREATE` | Crea el archivo si no existe previamente. |
| `CREATE_NEW` | Crea el archivo solo si NO existe. Si ya existía, lanza excepción. |
| `TRUNCATE_EXISTING` | **Comportamiento por defecto**. Si el archivo existe, borra todo su contenido previo y escribe desde cero. |
| `APPEND` | Conserva el contenido existente y añade el nuevo texto al final del archivo. |

#### Ejemplo de Sobreescritura vs. Anexión (*Append*)

```java
Path ruta = Path.of("datos", "registro.txt");

try {
    // 1. Sobreescribir el archivo (o crearlo si no existe)
    Files.writeString(ruta, "Primera línea de inicio\n", 
                      StandardOpenOption.CREATE, 
                      StandardOpenOption.TRUNCATE_EXISTING);

    // 2. Añadir nuevas líneas al final sin borrar lo anterior (APPEND)
    List<String> nuevasLineas = List.of("Evento 1 registrado", "Evento 2 registrado");
    Files.write(ruta, nuevasLineas, 
                StandardOpenOption.CREATE, 
                StandardOpenOption.APPEND);

} catch (IOException e) {
    System.err.println("Error durante la escritura: " + e.getMessage());
}
```

---

## Demo Completa: Lectura y Escritura de Texto Plano

Para consolidar las estrategias de lectura y escritura de texto plano, implementamos una demo completa que crea un archivo de registro (*log*), añade nuevos eventos sin sobreescribir y lee los datos usando tanto carga completa en memoria como lectura línea a línea:

```java title="src/es/iesagora/ada/ficheros/DemoTextoPlano.java"
package es.iesagora.ada.ficheros;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.stream.Stream;

public class DemoTextoPlano {

    public static void main(String[] args) {
        System.out.println("=== MANEJO DE ARCHIVOS DE TEXTO PLANO ===");

        Path carpeta = Path.of("datos_texto");
        Path archivoLog = carpeta.resolve("sistema.log");

        try {
            // PASO 1: Asegurar que la carpeta existe
            if (Files.notExists(carpeta)) {
                Files.createDirectories(carpeta);
            }

            // PASO 2: Escribir encabezado inicial sobrescribiendo si existía
            Files.writeString(archivoLog, "=== REGISTRO DEL SISTEMA ===\n", 
                              StandardCharsets.UTF_8, 
                              StandardOpenOption.CREATE, 
                              StandardOpenOption.TRUNCATE_EXISTING);
            System.out.println("1. Archivo inicial creado.");

            // PASO 3: Añadir eventos al final sin borrar lo anterior (APPEND)
            List<String> eventos = List.of(
                    "[INFO] Servidor iniciado correctamente",
                    "[INFO] Conexión establecida con el servicio",
                    "[WARN] Tiempo de respuesta elevado en consulta",
                    "[INFO] Tarea programada ejecutada con éxito"
            );
            Files.write(archivoLog, eventos, StandardCharsets.UTF_8, 
                        StandardOpenOption.CREATE, 
                        StandardOpenOption.APPEND);
            System.out.println("2. Eventos añadidos con APPEND.");

            // PASO 4: Lectura completa en memoria con bucle for clásico
            System.out.println("\n3. Lectura completa con Files.readAllLines():");
            List<String> lineasMemoria = Files.readAllLines(archivoLog, StandardCharsets.UTF_8);
            for (String linea : lineasMemoria) {
                System.out.println("   > " + linea);
            }

            // PASO 5: Lectura en flujo continuo línea a línea con Files.lines()
            System.out.println("\n4. Lectura línea a línea con Files.lines():");
            try (Stream<String> lineasFlujo = Files.lines(archivoLog, StandardCharsets.UTF_8)) {
                lineasFlujo.forEach(linea -> {
                    System.out.println("   [Stream] " + linea);
                });
            }

        } catch (IOException e) {
            System.err.println("Error en las operaciones de texto plano: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

---

## Procesamiento de Archivos Tabulares: CSV

Un caso muy particular e importante de archivo de texto plano es el formato **CSV** (*Comma-Separated Values*). Es un estándar universal para almacenar datos tabulares (filas y columnas) en texto simple:

* **Cada fila** del archivo representa un registro independiente.
* **Cada columna** está separada por un delimitador de texto (típicamente una coma `,` o un punto y coma `;`).
* **Primera fila (cabecera)**: Habitualmente contiene los títulos o nombres de los campos.

```text
id,nombre,precio,stock,disponible
1,Teclado Mecanico,79.99,15,true
2,Raton Ergonomico,34.50,40,true
```

### División de Campos con `split()` e Ignorado de Cabecera

Para extraer la información de cada columna al leer un archivo CSV en Java, aplicamos dos técnicas sencillas:

1. **Ignorar la cabecera**: Al recorrer la lista de líneas con un bucle `for` tradicional, comenzamos la variable contadora en `i = 1` en vez de `i = 0`. De este modo, la primera línea (que contiene nombres de columnas y no datos) no se procesa.
2. **Dividir los valores de la fila con `split()`**: El método `linea.split(",")` divide el texto en cada aparición de la coma y devuelve un array de cadenas `String[]`. Cada posición del array corresponde a una columna:

```mermaid
flowchart TD
    Linea["Línea de texto: 1,Teclado Mecanico,79.99,15,true"]
    Linea -->|"linea.split"| Array["Array de cadenas campos"]
    Array --> Col0["campos(0): ID"]
    Array --> Col1["campos(1): Nombre"]
    Array --> Col2["campos(2): Precio"]
    Array --> Col3["campos(3): Stock"]
    Array --> Col4["campos(4): Disponible"]
```

```java
// Ejemplo básico de extracción por columnas como texto
String linea = "1,Teclado Mecanico,79.99,15,true";
String[] campos = linea.split(",");

String id = campos[0].trim();
String nombre = campos[1].trim();
String precio = campos[2].trim();
String stock = campos[3].trim();
String disponible = campos[4].trim();

System.out.println("Producto #" + id + ": " + nombre + " | Precio: " + precio + " €");
```

:::tip ¿Por qué usar `.trim()`?
En muchos archivos CSV pueden aparecer espacios accidentales alrededor de las comas (por ejemplo: `"1, Teclado , 79.99"`). Aplicar `.trim()` a cada campo elimina los espacios en blanco sobrantes a los extremos antes de imprimir o utilizar el valor.
:::

---

### Demo Completa: Procesamiento de un Archivo CSV

Para poner en práctica la lectura de un archivo CSV real, procesaremos un catálogo de productos informáticos.

:::info Descarga del archivo de ejemplo
Puedes descargar el archivo de datos para realizar la prueba en tu proyecto:
* 📥 **<a href="/DevTacora/recursos/ada_ut2/catalogo_productos.csv" download="catalogo_productos.csv">Descargar catalogo_productos.csv</a>**

Coloca el archivo descargado dentro de una carpeta llamada `datos_csv` en la raíz de tu proyecto Java (o en la misma carpeta desde donde ejecutes el programa).
:::

El archivo `catalogo_productos.csv` contiene los siguientes registros:

```text title="datos_csv/catalogo_productos.csv"
id,nombre,precio,stock,disponible
1,Teclado Mecanico,79.99,15,true
2,Raton Ergonomico,34.50,40,true
3,Monitor 27 Pulgadas,199.90,0,false
4,Auriculares Inalambricos,59.00,12,true
5,Webcam Full HD,45.20,0,false
6,Microfono USB,68.00,8,true
7,Alfombrilla XL,18.50,25,true
```

A continuación se muestra el programa completo que lee el archivo CSV existente, ignora la fila de cabecera, extrae las columnas mediante `split(",")` y muestra todos los productos por pantalla recorriendo las líneas con un bucle `for`:

```java title="src/es/iesagora/ada/ficheros/DemoLecturaCsv.java"
package es.iesagora.ada.ficheros;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class DemoLecturaCsv {

    public static void main(String[] args) {
        System.out.println("=== LECTURA Y PROCESAMIENTO DE ARCHIVO CSV ===");

        Path rutaCsv = Path.of("datos_csv", "catalogo_productos.csv");
        String separador = ",";

        // Comprobamos si el archivo existe antes de intentar leerlo
        if (Files.notExists(rutaCsv)) {
            System.err.println("El archivo no existe en la ruta: " + rutaCsv.toAbsolutePath());
            System.err.println("Descarga 'catalogo_productos.csv' y colócalo en la carpeta 'datos_csv'.");
            return;
        }

        try {
            // PASO 1: Leer todas las líneas del archivo CSV
            List<String> lineas = Files.readAllLines(rutaCsv, StandardCharsets.UTF_8);
            System.out.println("Líneas leídas en total (incluyendo cabecera): " + lineas.size());

            // PASO 2: Procesar los datos fila a fila
            // Empezamos en i = 1 para omitir la cabecera (nombres de columnas en i = 0)
            System.out.println("\n--- LISTADO COMPLETO DE PRODUCTOS ---");

            for (int i = 1; i < lineas.size(); i++) {
                String linea = lineas.get(i);

                // Evitamos procesar líneas vacías
                if (linea.isBlank()) {
                    continue;
                }

                // PASO 3: Trocear la línea en columnas según el separador
                String[] campos = linea.split(separador);

                // Extraemos cada valor por su posición de columna directamente como texto
                String id = campos[0].trim();
                String nombre = campos[1].trim();
                String precio = campos[2].trim();
                String stock = campos[3].trim();
                String disponible = campos[4].trim();

                // PASO 4: Mostrar la información formateada por consola
                System.out.println("Producto #" + id + ": " + nombre);
                System.out.println("   Precio     : " + precio + " €");
                System.out.println("   Stock      : " + stock + " unidades");
                System.out.println("   Disponible : " + disponible);
                System.out.println("   -----------------------------------");
            }

        } catch (IOException e) {
            System.err.println("Error leyendo el archivo CSV: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

:::info Para reflexionar: ¿Y si tuviéramos que manipular estos datos en el resto de la aplicación?
En este ejemplo hemos leído las columnas directamente como texto suelto (`String`) y las hemos impreso por pantalla. 

Sin embargo, plantéate las siguientes cuestiones:
* ¿Qué ocurriría si tuviéramos que ordenar los productos por precio, calcular el valor total del inventario o buscar si hay stock suficiente en varias partes de nuestra aplicación?
* ¿Es cómodo y seguro seguir manejando arrays de cadenas como `campos[2]` o variables sueltas por todo el código?
:::

:::tip ¿Cuándo usar una librería externa como OpenCSV?
Para archivos CSV estándar y sencillos, el método `split(separador)` es rápido, no requiere dependencias adicionales y permite entender claramente el funcionamiento de los datos delimitados. Si en el futuro un campo de texto contiene comas dentro del propio valor entre comillas (por ejemplo, `"Calle Mayor, 14, 2ºB"`), entonces es cuando se justifica utilizar un analizador sintáctico especializado como **OpenCSV** o **Apache Commons CSV**.
:::

</div>
