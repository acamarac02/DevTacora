---
title: "3. Mi Primer Proyecto Flutter"
sidebar_position: 4
description: "Tutorial paso a paso para crear un proyecto en Android Studio, analizar su estructura y realizar una demo interactiva del contador."
---

En esta lección el alumno tendrá su primer contacto con el SDK de Flutter. Aprenderá a configurar y crear un proyecto desde Android Studio, analizará su estructura de archivos y desarrollará una demo interactiva personalizada a partir de la app de contador por defecto.

## Objetivos de Aprendizaje
* Crear y configurar correctamente un nuevo proyecto de Flutter en Android Studio.
* Comprender la anatomía de directorios y archivos de un proyecto de Flutter.
* Experimentar con la interactividad y los ciclos rápidos de desarrollo (*Hot Reload* y *Hot Restart*).

## Contenidos de la Lección

### Tutorial de Creación de Proyecto
* **Asistente de Android Studio:** Configuración paso a paso (SDK path, package name, lenguajes nativos Kotlin/Swift y plataformas seleccionadas).
* **Configuración del Entorno:** Elección de emulador, simulador o dispositivo físico para la ejecución inicial.

### Anatomía del Proyecto
* **Estructura de Directorios:** Rol de `lib/`, `pubspec.yaml`, `android/`, `ios/` y `.gitignore`.
* **Punto de Entrada:** Análisis de `lib/main.dart`, la función `main()` y el método `runApp()`.

### Hot Reaload vs. Hot Restart
* **Ciclo de Desarrollo Veloz:** Funcionamiento técnico y diferencias prácticas entre la inyección de código JIT (*Hot Reload*) y el restablecimiento del estado (*Hot Restart*).

### Demo Práctica: El Contador Personalizado
* **El Widget de Entrada:** Análisis superficial de `StatelessWidget` y el uso de `MaterialApp` y `Scaffold`.
* **Interactividad Inicial:** Introducción al widget de contador dinámico (`StatefulWidget`).
* **Personalización:** Modificar estilos visuales con `ThemeData` y añadir funcionalidad interactiva extra (como un botón de decremento o reinicio del contador).

### Reto de la Lección
* **Tu primer despliegue:** Ejecutar el proyecto en un emulador, realizar la personalización estética del contador y verificar de forma visual cómo funciona la recarga de UI instantánea sin perder el estado acumulado.
