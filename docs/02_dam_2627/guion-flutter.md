---
sidebar_position: 2
---

# Guión de Apuntes y Archivos (Semanas 1-24)

Este documento sirve como hoja de ruta para saber qué archivos Markdown y carpetas debes crear a lo largo del curso en Docusaurus para alojar los contenidos teóricos y prácticos de cada semana. 

Según la complejidad del tema, la estructura variará:
* **Temas sencillos:** Se explicarán en un único archivo Markdown (por ejemplo, `1_dart_basico.md`).
* **Temas complejos:** Se organizarán en una subcarpeta específica que contendrá un archivo `teoria.md` (para explicar los conceptos teóricos) y uno o varios archivos `demo.md` (para la práctica guiada o el reto).

---

## 📂 UT1: Introducción a Dart y Flutter (Semanas 1-3)
*Enfoque: Fundamentar las bases del lenguaje y configurar la estructura de desarrollo inicial.*

* ### Semana 1: Introducción a Dart I
  * **Fichero:** `docs/02_dam_2627/ut1_introduccion_dart_flutter/1_dart_basico.md`
  * **Tipo:** Fichero único (Complejidad Baja).
  * **Contenido:**
    * Concepto y origen de Dart.
    * Variables, tipos de datos básicos e inferencia.
    * Null Safety básico (`?`, `!`, `??`).
    * Estructuras de control y definición de funciones básicas.
    * *Reto:* Ejercicios prácticos de lógica en DartPad.

* ### Semana 2: Introducción a Dart II
  * **Fichero:** `docs/02_dam_2627/ut1_introduccion_dart_flutter/2_dart_avanzado.md`
  * **Tipo:** Fichero único (Complejidad Media).
  * **Contenido:**
    * Programación Orientada a Objetos: Clases, constructores con nombre, propiedades *getters* y *setters*.
    * Herencia, clases abstractas e interfaces en Dart.
    * Introducción a la asincronía: `Future`, `async` y `await`.
    * *Reto:* Crear un modelo de datos orientado a objetos y simular una carga de datos retardada con `Future.delayed()`.

* ### Semana 3: Hola Mundo en Flutter
  * **Fichero:** `docs/02_dam_2627/ut1_introduccion_dart_flutter/3_hola_mundo_flutter.md`
  * **Tipo:** Fichero único (Complejidad Baja).
  * **Contenido:**
    * ¿Qué es un widget? (La idea de que todo en Flutter es un widget).
    * Estructura de ficheros del proyecto (`pubspec.yaml`, carpeta `lib`, `main.dart`).
    * Hot Reload vs Hot Restart (Cuándo usar cada uno).
    * *Reto:* Crear la primera app Flutter con Android Studio, modificar textos y el color del tema.

---

## 📂 UT2: Construcción de Interfaces con Widgets (Semanas 4-7)
*Enfoque: Maquetación estática de vistas y primeros pasos con estados reactivos.*

* ### Semana 4: Widgets Estructurales y Texto
  * **Fichero:** `docs/02_dam_2627/ut2_widgets_interfaces/1_widgets_basicos.md`
  * **Tipo:** Fichero único (Complejidad Baja).
  * **Contenido:**
    * El widget `Scaffold` (AppBar, body, FloatingActionButton).
    * Dar formato a textos con `Text` y `TextStyle`.
    * Uso de `Container` como caja (margin, padding, borders, decoration).
    * *Reto:* Crear una vista de login/bienvenida estática utilizando contenedores y textos con estilos personalizados.

* ### Semana 5: Layouts y Distribución
  * **Fichero:** `docs/02_dam_2627/ut2_widgets_interfaces/2_layouts.md`
  * **Tipo:** Fichero único (Complejidad Baja).
  * **Contenido:**
    * Distribución vertical y horizontal: `Column` y `Row`.
    * Propiedades de alineación (`mainAxisAlignment`, `crossAxisAlignment`).
    * Manejo de espacios dinámicos: `Spacer`, `Expanded` y `Flexible`.
    * Apilamiento de widgets: `Stack` y `Positioned`.
    * *Reto:* Maquetar una tarjeta de perfil de usuario o ficha técnica de un producto adaptativa.

* ### Semana 6: Listas y Elementos Repetitivos
  * **Fichero:** `docs/02_dam_2627/ut2_widgets_interfaces/3_listas.md`
  * **Tipo:** Fichero único (Complejidad Media).
  * **Contenido:**
    * La problemática del desbordamiento de pantalla.
    * Listas de scroll simples: `SingleChildScrollView` y `ListView`.
    * Listas optimizadas en memoria: `ListView.builder` y reciclaje de celdas.
    * Estructura de elementos: El widget `ListTile`.
    * *Reto:* Pintar una lista de elementos dinámica a partir de un array de datos ficticios en memoria.

* ### Semana 7: Stateless vs Stateful Widgets e Interactividad
  * **Carpeta:** `docs/02_dam_2627/ut2_widgets_interfaces/semana_7_interactividad/`
  * **Tipo:** Carpeta compartida (Complejidad Alta - Cambio de paradigma).
  * **Archivos:**
    * `teoria.md`: Concepto del ciclo de vida de los widgets, diferencia teórica entre widgets inmutables (Stateless) y mutables (Stateful), cómo funciona la recarga de pantalla tras llamar a `setState()`.
    * `demo.md`: Ejercicio guiado de conversión de Stateless a Stateful. Implementación de una lista donde se pueden marcar tareas como completadas (cambio de icono y estilo dinámico).

---

## 📂 UT3: Navegación y Flujo de la Aplicación (Semanas 8-9)
*Enfoque: Gestión de pantallas y paso de parámetros entre ellas de forma profesional.*

* ### Semana 8: Navegación Básica e Imperativa
  * **Fichero:** `docs/02_dam_2627/ut3_navegacion_estructuras/1_navigator_imperativo.md`
  * **Tipo:** Fichero único (Complejidad Media).
  * **Contenido:**
    * Navegación clásica por pila: `Navigator.push`, `Navigator.pop`.
    * Uso de `MaterialPageRoute`.
    * Paso de parámetros simples por constructor e interceptar el retorno de datos.
    * Estructuras globales: `Drawer` (menú lateral) y `TabBar` con `TabBarView`.
    * *Reto:* Añadir una pantalla de detalle de producto y navegar a ella enviando los datos del elemento seleccionado.

* ### Semana 9: Navegación Declarativa Profesional con GoRouter
  * **Carpeta:** `docs/02_dam_2627/ut3_navegacion_estructuras/semana_9_gorouter/`
  * **Tipo:** Carpeta compartida (Complejidad Alta - Enrutamiento Profesional).
  * **Archivos:**
    * `teoria.md`: Por qué la industria prefiere la navegación declarativa (GoRouter) frente a Navigator 1.0 (especialmente para multiplataforma/web). Configuración inicial de GoRouter en el objeto principal.
    * `demo.md`: Configuración de rutas declarativas con nombres (`GoRoute`), paso de parámetros mediante URL (`pathParameters`) y querys, y diseño de una navegación tipo Master-Detail profesional.

---

## 📂 UT4: Entrada de Datos y Formularios (Semanas 10-11)
*Enfoque: Captura de entradas de usuario y validación de datos segura.*

* ### Semana 10: Campos de Entrada y Controladores
  * **Fichero:** `docs/02_dam_2627/ut4_formularios_entradas/1_entradas_basicas.md`
  * **Tipo:** Fichero único (Complejidad Baja).
  * **Contenido:**
    * Capturar texto: El widget `TextField`.
    * Controladores de texto: `TextEditingController` (lectura, escritura y limpieza).
    * Modificadores de teclado (tipo de input, acción del botón enter).
    * *Reto:* Crear una vista de chat simple donde al escribir en un input y pulsar "enviar" se limpie la caja y se añada a una lista local.

* ### Semana 11: Validación y Controles Avanzados
  * **Fichero:** `docs/02_dam_2627/ut4_formularios_entradas/2_formularios_validaciones.md`
  * **Tipo:** Fichero único (Complejidad Media).
  * **Contenido:**
    * El widget `Form` y su clave global `GlobalKey<FormState>`.
    * Validación integrada en campos de texto: `TextFormField`.
    * Otros tipos de entrada: `Checkbox`, `Switch`, `DropdownButton` y selectores de fecha (`showDatePicker`).
    * *Reto:* Diseñar un formulario de registro completo con validación (correo no vacío, longitud de contraseña) que deshabilite o muestre un mensaje de error si los datos son incorrectos.

---

## 📂 UT5: Arquitectura Profesional: BLoC/Cubit y APIs REST (Semanas 12-16)
*Enfoque: Separación de responsabilidades, gestión de estado escalable y consumo de datos remotos.*

* ### Semanas 12-13: Gestión de Estado Profesional con Cubit
  * **Carpeta:** `docs/02_dam_2627/ut5_estado_servicios/semanas_12_13_cubit/`
  * **Tipo:** Carpeta compartida (Complejidad Alta - 2 Semanas de Proyecto).
  * **Archivos:**
    * `teoria.md`: Problemas de escalabilidad de `setState`. El patrón BLoC (Business Logic Component). Qué es un Cubit y cómo funciona (Estados e Inmutabilidad).
    * `demo.md`: Paso a paso para integrar `flutter_bloc`. Crear un Cubit para gestionar una lista de tareas (añadir, eliminar y cambiar estado). Uso de `BlocProvider`, `BlocBuilder` y `BlocListener`.

* ### Semanas 14-16: Consumo de APIs REST y Estados Asíncronos
  * **Carpeta:** `docs/02_dam_2627/ut5_estado_servicios/semanas_14_16_apis/`
  * **Tipo:** Carpeta compartida (Complejidad Alta - 3 Semanas de Proyecto).
  * **Archivos:**
    * `teoria_dio.md`: El cliente HTTP **Dio**. Peticiones GET/POST/PUT/DELETE. Mapeo automático de JSON a modelos de datos de Dart.
    * `teoria_estados_asincronos.md`: Concepto de estados de carga (`InitialState`, `LoadingState`, `SuccessState`, `ErrorState`) dentro de la lógica del Cubit.
    * `demo_api.md`: Configurar una API de pruebas (ej. JSONPlaceholder). Integrar las llamadas de Dio en el Cubit para actualizar los estados de carga. Implementación de una interfaz con `RefreshIndicator` (para recarga táctil), `CircularProgressIndicator` y manejo de errores visible al usuario con `SnackBar`.

---

## 📂 UT6: Persistencia Local, Autenticación y APIs Externas (Semanas 17-21)
*Enfoque: Almacenamiento local ligero y relacional, autenticación segura con JWT y despliegue de APIs en Docker.*

* ### Semana 17: Preferencias de Usuario
  * **Fichero:** `docs/02_dam_2627/ut6_persistencia_datos/1_preferencias_usuario.md`
  * **Tipo:** Fichero único (Complejidad Media).
  * **Contenido:**
    * Guardado clave-valor persistente con `shared_preferences`.
    * *Reto:* Crear una pantalla de ajustes para guardar la configuración de tema (oscuro/claro) e idioma de la aplicación.

* ### Semanas 18-19: Base de Datos Relacional y Caché Local (SQLite)
  * **Carpeta:** `docs/02_dam_2627/ut6_persistencia_datos/semanas_18_19_sqlite/`
  * **Tipo:** Carpeta compartida (Complejidad Alta - 2 Semanas de Proyecto).
  * **Archivos:**
    * `teoria.md`: SQLite en dispositivos móviles, operaciones CRUD SQL en Dart con el paquete `sqflite`. Estructuración del Patrón Repositorio para independizar el origen de datos.
    * `demo.md`: Implementar la caché local SQLite. Al iniciar, la aplicación lee los datos locales persistidos, permitiendo el uso offline.

* ### Semanas 20-21: Consumo de API Rest con BBDD Externa y JWT (Docker)
  * **Carpeta:** `docs/02_dam_2627/ut6_persistencia_datos/semanas_20_21_jwt_docker/`
  * **Tipo:** Carpeta compartida (Complejidad Alta - 2 Semanas de Proyecto).
  * **Archivos:**
    * `teoria_jwt_docker.md`: Concepto de autenticación basada en tokens JWT. Despliegue local de la API REST externa con Docker y acceso desde la app Flutter.
    * `teoria_interceptores.md`: Configurar interceptores de red en el cliente HTTP Dio para inyectar automáticamente el Bearer token JWT en peticiones autenticadas.
    * `demo.md`: Implementación completa de inicio de sesión con JWT, guardado persistente del token en local y acceso a rutas de datos protegidas de la base de datos externa.

---

## 📂 UT7: Integración Nativa y Compilación (Semanas 22-24)
*Enfoque: Integrar sensores de hardware y preparar aplicaciones para lanzamiento al mercado real.*

* ### Semana 22: Acceso a Cámara y Galería
  * **Carpeta:** `docs/02_dam_2627/ut7_proyectos_avanzados/semana_22_camara/`
  * **Tipo:** Carpeta compartida (Complejidad Media - Proyecto Corto).
  * **Archivos:**
    * `teoria.md`: El sistema de permisos en iOS y Android. Configuración del `Info.plist` y `AndroidManifest.xml`. Uso del paquete `image_picker`.
    * `demo.md`: Permitir que el usuario se tome una fotografía con la cámara o seleccione una imagen de la galería de su dispositivo y la renderice en la pantalla como su foto de perfil.

* ### Semana 23: Firma y Compilación de Producción
  * **Fichero:** `docs/02_dam_2627/ut7_proyectos_avanzados/1_compilacion_firmas.md`
  * **Tipo:** Fichero único (Complejidad Media).
  * **Contenido:**
    * Cambiar el nombre e icono de la aplicación (usando `flutter_launcher_icons`).
    * Proceso de firmas: Creación de un KeyStore de firmas para Android.
    * Generar archivos binarios optimizados: comandos `flutter build apk` y `flutter build appbundle`.

* ### Semana 24: Cierre del Curso y Presentaciones
  * **Fichero:** `docs/02_dam_2627/ut7_proyectos_avanzados/2_cierre_proyectos.md`
  * **Tipo:** Fichero único (Complejidad Baja).
  * **Contenido:**
    * Buenas prácticas de rendimiento: evitar repintados innecesarios y uso de `const`.
    * Introducción a Flutter DevTools (análisis de CPU, consumo de memoria y red).
    * Rúbricas finales de entrega y consejos de publicación en tiendas de apps.
