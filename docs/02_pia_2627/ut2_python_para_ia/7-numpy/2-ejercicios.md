---
title: "📝 Ejercicios Prácticos"
sidebar_position: 2
description: "Relación de ejercicios prácticos sobre NumPy (creación de arrays, slicing 2D, indexación booleana, operaciones por ejes y preprocesamiento de datos)."
keywords: [Python, NumPy, ejercicios, arrays, slicing, boolean indexing, axis, normalizacion, binarizacion]
---

<div class="justify-text">


## Ejercicio 1: Creación e inspección de arrays
* Crea un vector unidimensional con números enteros del 10 al 50 (ambos inclusive) distribuidos a intervalos de 5 en 5.
* Crea una matriz bidimensional de ceros de 3 filas por 4 columnas con tipo de dato flotante (`float`) y modifica la segunda fila completa para que contenga únicamente unos.
* Genera una matriz de 4 filas por 3 columnas rellena con números enteros aleatorios entre 1 y 20.
* Imprime por pantalla cada uno de los arrays junto con sus propiedades principales: forma (`shape`), número de dimensiones (`ndim`) y tipo de dato (`dtype`).

---

## Ejercicio 2: Indexación, slicing bidimensional y vistas en memoria
* Crea una matriz de 4 filas por 5 columnas que contenga los números enteros del 1 al 20 ordenados secuencialmente.
* Extrae y muestra por pantalla las siguientes selecciones:
  * El elemento ubicado en la tercera fila y cuarta columna.
  * La submatriz central de 2 filas por 3 columnas (filas de la 1 a la 2 y columnas de la 1 a la 3).
  * La última columna completa de la matriz original.
* Modifica la submatriz central asignando el valor `0` a todos sus elementos y comprueba mediante una impresión por pantalla que los cambios se reflejan en la matriz original (demostrando el concepto de *view* o vista).

---

## Ejercicio 3: Operaciones vectorizadas y filtrado booleano
* Crea un array unidimensional con 15 temperaturas simuladas (valores flotantes comprendidos entre 15.0 y 40.0 grados Celsius).
* Convierte todas las temperaturas a grados Fahrenheit mediante una operación vectorizada ($F = C \times 1.8 + 32$).
* Utiliza indexación booleana para extraer en un nuevo array únicamente las temperaturas en Celsius estrictamente superiores a 30.0 grados.
* Aplica un umbral (*thresholding*) sobre el array original sustituyendo cualquier valor superior a 35.0 grados por el límite máximo `35.0`.

---

## Ejercicio 4: Normalización Min-Max de un vector de datos
* Dado el siguiente array con lecturas continuas registradas por un sensor industrial:
  `[120.0, 450.0, 300.0, 890.0, 620.0, 150.0, 980.0, 410.0, 230.0, 750.0]`
* Obtén el valor mínimo y el valor máximo del conjunto de datos haciendo uso de las funciones de NumPy.
* Aplica la fórmula de normalización Min-Max para escalar todas las lecturas al rango continuo $[0, 1]$:
  $$x_{\text{norm}} = \frac{x - x_{\text{min}}}{x_{\text{max}} - x_{\text{min}}}$$
* Muestra el array resultante por pantalla y comprueba formalmente que su valor mínimo es `0.0` y su valor máximo es `1.0`.

---

## Ejercicio 5: Análisis estadístico multivariante por ejes
* Dada la matriz de calificaciones de 4 estudiantes (filas) en 5 asignaturas (columnas):
  ```python
  notas = np.array([
      [8.5, 7.0, 9.0, 6.5, 8.0],
      [5.0, 6.5, 5.5, 7.0, 6.0],
      [9.0, 9.5, 10.0, 8.5, 9.0],
      [6.0, 4.0, 7.0, 5.5, 5.0]
  ])
  ```
* Calcula y muestra la nota media global de todo el grupo.
* Calcula la nota media de cada asignatura utilizando el eje correspondiente (`axis=0`) e indica el índice de la asignatura con la nota promedio más alta.
* Calcula la nota media de cada estudiante utilizando el eje correspondiente (`axis=1`) y muestra un array booleano indicando qué estudiantes han alcanzado un promedio igual o superior a 7.0.

---

## Ejercicio 6: Preprocesamiento y binarización de una imagen en escala de grises
En visión artificial, una imagen digital monocromática (en escala de grises) no es más que una **matriz bidimensional de números**, donde cada celda o píxel representa la cantidad de luz:
* `0` representa ausencia de luz (**negro absoluto**).
* `255` representa la máxima intensidad de luz (**blanco puro**).
* Los valores intermedios (del 1 al 254) representan diferentes tonos de gris (cuanto mayor es el número, más claro o brillante es el píxel).

A partir de esta idea, realiza los siguientes pasos:
* Simula una imagen en escala de grises creando una matriz de 5 filas por 5 columnas con números enteros aleatorios entre 0 y 255.
* **Calcula el brillo medio global:** Como cada número indica la intensidad lumínica de un píxel, el "brillo medio" consiste simplemente en la **media aritmética de todos los números de la matriz** (representa la iluminación promedio de toda la imagen).
* Genera una nueva matriz binaria aplicando un proceso de **binarización**: los píxeles con una intensidad estrictamente superior al brillo medio deben tomar el valor de intensidad máxima `255` (blanco) y los inferiores o iguales el valor `0` (negro). *(Pista: Investiga el método `np.where()` de NumPy, que permite asignar valores en función de si se cumple o no una condición lógica de forma vectorizada).*
* Aplana la matriz binarizada para convertirla en un vector de características unidimensional 1D y muestra por pantalla su forma final.

</div>
