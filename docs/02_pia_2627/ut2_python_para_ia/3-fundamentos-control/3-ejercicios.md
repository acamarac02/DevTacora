---
title: "📝 Ejercicios Prácticos"
sidebar_position: 3
description: "Relación de ejercicios prácticos sobre sintaxis básica, fundamentos de Python y estructuras de control."
keywords: [Python, ejercicios, sintaxis, condicionales, bucles, control de flujo]
---

<div class="justify-text">

Relación de ejercicios prácticos para consolidar los conceptos de **Fundamentos de Python** (variables, cadenas, operadores) y **Estructuras de Control** (condicionales y bucles).

:::info ORGANIZACIÓN Y EJECUCIÓN DE LOS EJERCICIOS
Crea una carpeta dentro de tu proyecto en VS Code llamada `ejercicios_sesion1/`.
Resuelve cada ejercicio en un archivo separado `.py` numerado (por ejemplo: `ej01_conversor.py`, `ej02_analizador.py`, etc.).

Para ejecutar un ejercicio individual desde la terminal integrada de VS Code:
* En **macOS / Linux**: `python3 ejercicios_sesion1/ej01_conversor.py`
* En **Windows**: `python ejercicios_sesion1/ej01_conversor.py`
:::

---

## Bloque 1: Fundamentos de Python

### Ejercicio 1: Conversor de temperatura y cálculo de descuento
* Pide al usuario una temperatura en grados Celsius y el precio de un producto.
* Muestra la temperatura convertida a Fahrenheit ($F = C \times 1.8 + 32$) redondeada a 2 decimales.
* Muestra el precio final del producto tras aplicar un descuento del 15%.

---

### Ejercicio 2: Analizador de cadenas y verificación de URL
* Solicita al usuario su nombre completo y la dirección URL de un sitio web.
* Muestra el nombre en mayúsculas, en minúsculas y la cantidad total de caracteres.
* Comprueba si la URL comienza por `"https://"` e imprime `True` o `False`.

---

### Ejercicio 3: Recorte de cadena y dígito de control bancario
* Pide un número de cuenta entero de 8 dígitos.
* Muestra los primeros 4 dígitos de la cuenta.
* Calcula su dígito de control hallando el resto de dividir el número entre `11` ($11 - \text{resto}$). Si el resultado es `10` pasa a ser `1`, y si es `11` pasa a ser `0`.

---

## Bloque 2: Estructuras de Control

### Ejercicio 4: Tarificador de entradas de cine
* El precio estándar de una entrada es de 8€.
* El precio se reduce a 5€ si cumple al menos una de estas condiciones: es miércoles, el usuario es menor de 12 años o mayor de 65 años.
* Pide al usuario su edad y el día de la semana, e indica el precio final a pagar.

---

### Ejercicio 5: Tabla de multiplicar y suma acumulada
* Pide un número entero positivo $N$.
* Muestra su tabla de multiplicar del 1 al 10.
* Calcula la suma de todos los números enteros desde `1` hasta $N$ e imprime el resultado total.

---

### Ejercicio 6: Contador de vocales y detector de palíndromos
* Solicita una palabra al usuario.
* Cuenta cuántas vocales (a, e, i, o, u) contiene la cadena.
* Comprueba si la palabra es un palíndromo (se lee igual de izquierda a derecha que de derecha a izquierda) e imprime el resultado.

---

### Ejercicio 7: Validación de contraseña
* Solicita repetidamente una contraseña al usuario hasta que cumpla todas estas condiciones:
  * Tener al menos 8 caracteres.
  * Contener al menos una letra mayúscula.
  * Contener al menos un número.
* Muestra un mensaje de éxito cuando la contraseña sea aceptada.

---

### Ejercicio 8: Detector de números primos
* Solicita un número entero mayor que 1.
* Determina e indica si el número es primo (divisible únicamente por 1 y por sí mismo).

---

### Ejercicio 9: Patrón de triángulo ASCII
* Solicita un entero $N$ (altura del triángulo).
* Imprime un triángulo de asteriscos `*` disminuyendo un asterisco por fila hasta llegar a 1.
* Ejemplo para $N = 4$:
  ```
  ****
  ***
  **
  *
  ```

---

## Bloque 3: Aplicación a Inteligencia Artificial

### Ejercicio 10: Filtrado de predicciones por umbral de confianza
* Pide al usuario un umbral de confianza (ejemplo: `0.75`).
* Solicita repetidamente puntuaciones de probabilidad (números decimales entre 0.0 y 1.0) hasta que se introduzca la palabra `"fin"`.
* Para cada valor introducido, indica si la predicción es `"Aceptada"` (mayor o igual al umbral) o `"Rechazada"`.

---

### Ejercicio 11: Limpieza y saneamiento de prompts
* Solicita una frase de entrada simulando un prompt para un modelo de lenguaje (LLM).
* Limpia los espacios innecesarios al inicio y al final, reemplaza los tabuladores por espacios simples y comprueba si el texto supera los 50 caracteres para mostrar una advertencia de longitud.

</div>
