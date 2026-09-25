---
title: "📝 Ejercicios Prácticos"
sidebar_position: 4
description: "Relación de ejercicios prácticos sobre funciones, type hinting, módulos y manejo de excepciones en Python."
keywords: [Python, ejercicios, funciones, type hinting, modulos, excepciones, try except]
---

<div class="justify-text">

## Ejercicio 1: Conversor de escalas de temperatura
* Crea una función `convertir_temperatura(valor: float, escala_origen: str, escala_destino: str) -> float`.
* Permite convertir entre Celsius ("C"), Fahrenheit ("F") y Kelvin ("K").
* Si se introduce una escala que no existe, la función debe lanzar una excepción `ValueError` informando al usuario.

---

## Ejercicio 2: Analizador estadístico con parámetros variables
* Crea una función `analizar_numeros(*numeros: float) -> dict`.
* La función debe aceptar cualquier cantidad de números como argumentos posicionales y devolver un diccionario con:
  * La cantidad total de números recibidos.
  * La suma total.
  * El valor máximo y mínimo.
  * La media aritmética.
* Maneja mediante un condicional el caso en que no se reciba ningún número para evitar errores de división entre cero.

---

## Ejercicio 3: Filtrado de palabras con funciones Lambda
* Crea una función `filtrar_palabras_largas(palabras: list[str], longitud_minima: int) -> list[str]`.
* Utiliza una función `lambda` junto con la función de orden superior `filter()` para devolver una nueva lista únicamente con las palabras cuyo número de caracteres sea mayor que la `longitud_minima`.

---

## Ejercicio 4: Lectura segura de ficheros de datos
* Crea una función `leer_dataset(ruta_archivo: str) -> str`.
* Abre y lee el contenido del archivo indicado utilizando un gestor de contexto (`with open(...)`).
* Incluye un bloque de control de excepciones `try / except` para capturar el error `FileNotFoundError` si el archivo no existe en el disco, mostrando un aviso por pantalla en lugar de detener el programa.

---

## Ejercicio 5: Creación de un módulo propio y punto de entrada principal
* Crea un módulo llamado `utilidades_texto.py` con dos funciones tipadas:
  * `limpiar_prompt(texto: str) -> str`: elimina los espacios sobrantes en los extremos y convierte el texto a minúsculas.
  * `contar_palabras(texto: str) -> int`: devuelve la cantidad total de palabras de la frase.
* Crea un segundo archivo llamado `main.py` en el mismo directorio. Importa el módulo `utilidades_texto` y utiliza ambas funciones para procesar una frase introducida por el usuario.
* **Comprobación experimental:**
  1. Añade un mensaje `print()` de prueba al final de `utilidades_texto.py` fuera de cualquier función y **sin usar** `if __name__ == "__main__":`. Ejecuta `main.py` y observa cómo ese mensaje de prueba se imprime automáticamente al importar el módulo.
  2. Envuelve dicho código de prueba dentro del bloque `if __name__ == "__main__":` en `utilidades_texto.py`. Vuelve a ejecutar `main.py` y comprueba que ahora las pruebas locales del módulo ya NO se ejecutan al importar la librería desde `main.py`.


---

## Ejercicio 6: Analizador integrador de texto para PLN
* Crea una función `analizar_texto(texto: str) -> dict`.
* La función debe realizar las siguientes operaciones:
  1. Convertir el texto completo a minúsculas.
  2. Eliminar los signos de puntuación habituales (`, . ; : ! ?`).
  3. Dividir el texto en palabras.
  4. Devolver un diccionario con el total de palabras, la lista o conjunto de palabras únicas y la frecuencia con la que aparece cada palabra.

</div>
