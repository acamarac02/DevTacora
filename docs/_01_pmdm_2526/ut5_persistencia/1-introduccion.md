---
sidebar_position: 1
sidebar_label: Introducción
title: Introducción
---

<div class="justify-text">

# Introducción

<div className="hidden-summary">
Breve descripción de las tecnologías que estudiaremos.
</div>

## SQLite
**SQLite** es un **sistema de gestión de bases de datos relacional (RDBMS)** ligero, autónomo y sin servidor. A diferencia de otros sistemas de bases de datos como MySQL o PostgreSQL, SQLite se implementa como una **biblioteca** que se integra directamente en la aplicación. No necesita un proceso de servidor independiente para funcionar.

### Características clave
1. **Sin servidor**: No existe un proceso de servidor en segundo plano. SQLite lee y escribe directamente en archivos en disco.  

2. **Ligero**: El binario de SQLite pesa solo unos cientos de kilobytes.

3. **Soporta transacciones ACID** (Atomicidad, Consistencia, Aislamiento y Durabilidad): Esto significa que garantiza integridad de los datos incluso en caso de fallos del sistema o apagones.  

4. **Almacenamiento en un solo archivo**: Toda la base de datos (tablas, índices y datos) se almacena en **un único archivo en el disco**.  

5. **Altamente Portable**: Funciona en casi cualquier sistema operativo (Android, iOS, Windows, macOS, Linux, etc.), siendo además el sistema de bases de datos predeterminado para muchas plataformas, incluyendo Android.  

6. **Lenguaje SQL Completo**: Soporta la mayoría de las características del estándar **SQL-92**, incluyendo **joins, subconsultas, triggers y views**.  

7. **Escalable**: Aunque está diseñado para aplicaciones ligeras, puede manejar bases de datos de **hasta terabytes de tamaño**. Sin embargo, su rendimiento es óptimo en aplicaciones con **lecturas frecuentes y escrituras ligeras.**  

### ¿Por qué Android usa SQLite?  
- **Ligero y rápido**, lo que es crucial para dispositivos móviles.  
- **Sin configuración**: Se puede integrar fácilmente en aplicaciones.  
- **Local y autónomo**: Las bases de datos están dentro de la propia app, facilitando la sincronización de datos.  

## Room

**Room** es una biblioteca de persistencia de datos que forma parte de Android Jetpack. Proporciona una capa de abstracción sobre **SQLite**, facilitando el acceso a la base de datos y reduciendo la cantidad de código repetitivo. El objetivo principal de Room es ofrecer una **API** robusta y flexible que permita la manipulación de datos de forma sencilla, manteniendo las ventajas de rendimiento y escalabilidad de SQLite. Además, se integra perfectamente con el ciclo de vida de Android, LiveData y RxJava, lo que facilita la construcción de aplicaciones reactivas y modernas.

Room proporciona una capa de acceso a datos (DAO - Data Access Object) permitiendo mapear clases Java (**Entities**) a tablas de SQLite. Su funcionamiento es muy similar a los ORMs (Object Relational Mapping) estudiados en Acceso a Datos, como JDBC, pero es importante aclarar que **Room no es un ORM** completo en el sentido tradicional: no mapea automáticamente las relaciones complejas entre tablas ni proporciona características avanzadas como carga diferida (lazy loading) o caché de objetos.

### Características clave
- **Simplificación del acceso a bases de datos:** Room genera automáticamente el código necesario para las consultas SQL y la manipulación de datos, reduciendo los errores.
- **Seguridad en tiempo de compilación:** Room verifica las consultas SQL durante la compilación, lo que ayuda a evitar errores comunes en la sintaxis.
- **Integración con LiveData y RxJava:** Permite observar los cambios en la base de datos y responder de manera reactiva.
- **Migraciones fáciles:** Room facilita la gestión de cambios en el esquema de la base de datos a lo largo del tiempo.
- **Anotaciones para definir entidades y consultas:** Room utiliza anotaciones de Java para definir las estructuras de las tablas y las operaciones de acceso a datos, lo que hace que el código sea más claro y conciso.

### Componentes
Room está formado por tres componentes principales:
1. **Entidad (Entity):** Representa una tabla en la base de datos.
2. **DAO (Data Access Object):** Contiene los métodos para acceder a la base de datos.
3. **Base de Datos (Database):** Define la configuración de la base de datos y sirve como el punto principal de acceso a los datos persistidos.

---

## SharedPreferences
**SharedPreferences** es una API de Android que permite almacenar y recuperar pequeños conjuntos de datos en formato clave-valor de manera persistente. Se utiliza principalmente para **guardar configuraciones, preferencias del usuario o datos ligeros** que deben persistir incluso cuando la aplicación se cierra. Almacena los datos en archivos XML en el directorio privado de la aplicación, seguiendo un **formato clave-valor**, similar a un diccionario o `HashMap`.

:::warning
La API **DataStore** es el sustituto moderno de SharedPreferences, ofreciendo mejoras en seguridad y almacenamiento asíncrono (sin bloqueo del hilo principal). No obstante, está diseñado principalmente para Kotlin porque aprovecha **Kotlin Coroutines y Flow**, que no existen de forma nativa en Java.
:::

### Principales usos
A continuación se destacan los principales usos de la API SharedPreferences:
1. **Guardar configuraciones del usuario**: Tema oscuro, idioma, notificaciones.  
2. **Almacenar estados simples**: Última pestaña abierta, preferencias de sonido.  
3. **Guardar tokens de sesión o credenciales ligeras**: Aunque **no es recomendable para datos sensibles** como contraseñas.  
4. **Seguimiento de primeros accesos**: Mostrar pantallas de bienvenida solo una vez.  

---

## ¿Cuándo usar cada tipo de persistencia?
La elección del método de persistencia en Android depende de la naturaleza de los datos, su volumen, y cuánto tiempo necesitan ser retenidos. Puedes usar la siguiente guía como referencia:
- **SharedPreferences**: Para datos pequeños, simples y no sensibles (clave-valor).
- **Room (SQlite)**: Para datos estructurados y cuando tengas grandes volúmenes de datos.
- **Bundle / ViewModel**: Para datos temporales durante la ejecución, como cambios de configuración, envío de datos entre Activities y Fragments, etc.

</div>