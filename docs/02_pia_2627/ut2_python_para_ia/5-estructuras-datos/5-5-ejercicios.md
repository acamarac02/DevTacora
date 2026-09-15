---
title: "Ejercicios Prácticos"
sidebar_position: 5
description: "Relación de ejercicios prácticos sobre estructuras de datos nativas en Python (listas, tuplas, conjuntos y diccionarios)."
keywords: [Python, estructuras de datos, ejercicios, listas, diccionarios, sets, tuplas]
---

<div class="justify-text">

## 📝 Ejercicios Prácticos: Estructuras de Datos

### Ejercicio 1: Estadísticas de temperaturas (Listas)
* Pide 5 temperaturas en °C al usuario y guárdalas en una lista.
* Muestra por pantalla:
  * La temperatura más alta y la más baja.
  * La media aritmética de las temperaturas.
  * La lista ordenada de menor a mayor.

---

### Ejercicio 2: Conversión a Fahrenheit (List Comprehensions)
* Dada una lista con 5 temperaturas en grados Celsius, genera una nueva lista con sus equivalentes en grados Fahrenheit ($F = C \times 1.8 + 32$).
* Realiza la transformación en una sola línea utilizando una **comprensión de listas** (*list comprehension*).

---

### Ejercicio 3: Verificación e inmutabilidad (Tuplas)
* Solicita al usuario los nombres de 3 ciudades y guárdalos en una tupla.
* Muestra si la ciudad `"Madrid"` está o no presente en la tupla.
* Intenta modificar una de las ciudades de la tupla directamente mediante asignación (por ejemplo, `ciudades[0] = "Barcelona"`) e indica qué tipo de error o excepción genera Python.

---

### Ejercicio 4: Eliminación de duplicados (Sets)
* Pide 6 números enteros al usuario (pudiendo repetir algunos valores) y almacénalos en una lista.
* Convierte la lista en un conjunto (`set`) para eliminar los elementos duplicados.
* Muestra los elementos únicos resultantes y la cantidad exacta de duplicados que fueron eliminados.

---

### Ejercicio 5: Consulta de catálogo de productos (Diccionarios)
* Crea un diccionario inicial con 3 productos y sus respectivos precios en euros (ejemplo: `"pan": 1.20`, `"leche": 0.95`, `"huevos": 2.30`).
* Pide al usuario el nombre de un producto a consultar.
* Si el producto existe en el catálogo, muestra su precio. Si no existe, muestra un aviso indicando que el producto no está disponible.

---

### Ejercicio 6: Generador de vocabulario (Dict Comprehensions)
* Solicita una frase al usuario y divídela en palabras.
* Utiliza una **comprensión de diccionario** (*dict comprehension*) para construir un diccionario donde cada palabra sea la clave y su valor asociado sea su cantidad de letras.

---

### Ejercicio 7: Registro y filtrado de calificaciones (Estructuras Compuestas)
* Crea una lista de diccionarios donde cada elemento represente a un estudiante con las claves `"nombre"` y `"nota"`.
* Recorre la lista de estudiantes e imprime:
  * El promedio general de la clase.
  * Los nombres de los estudiantes aprobados (nota mayor o igual a 5.0).
  * El estudiante con la nota más alta.

</div>
