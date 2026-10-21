---
title: "📝 Ejercicios Prácticos"
sidebar_position: 2
description: "Relación de ejercicios prácticos sobre Pandas (DataFrames, limpieza de datos, transformaciones y lectura/escritura de archivos CSV)."
keywords: [Python, Pandas, ejercicios, DataFrame, limpieza de datos, csv, preprocesamiento, filtrado]
---

<div class="justify-text">

## Ejercicio 1: Creación, exploración y tipado de un DataFrame
Crea un DataFrame llamado `empleados` a partir de la siguiente información:

| Nombre | Edad | Departamento | Salario |
| ------ | ---- | ------------ | ------- |
| Ana    | 28   | Ventas       | 2300    |
| Luis   | 35   | IT           | 2800    |
| Marta  | 40   | RRHH         | 3000    |
| Jorge  | 30   | IT           | 2500    |
| Sara   | 27   | Ventas       | 2200    |

A partir de este conjunto de datos:
* Muestra por pantalla las 3 primeras filas del DataFrame y consulta su resumen informativo con los métodos correspondientes.
* Imprime los tipos de datos asignados a cada columna.
* Convierte el tipo de dato de la columna `Edad` a un formato entero más eficiente (`int32`) y comprueba el cambio.
* Selecciona y muestra en una nueva vista únicamente las columnas `Nombre` y `Salario`.
* Filtra y muestra únicamente los empleados que pertenecen al departamento `"IT"`.

---

## Ejercicio 2: Indexación, selección y cálculo de nuevas características
Tomando como base el DataFrame `empleados` del ejercicio anterior:
* Accede y muestra de forma individual el salario asignado a la empleada **Marta**.
* Muestra las dos primeras filas del DataFrame empleando selección por posición o etiqueta.
* Añade una nueva columna calculada llamada `Bonus` cuyo valor corresponda al **10% del salario** de cada trabajador.
* Muestra el DataFrame con la nueva columna añadida.
* Elimina la columna `Bonus` del DataFrame y comprueba que la estructura vuelve a su estado original.

---

## Ejercicio 3: Limpieza y tratamiento de datos imperfectos
Crea un DataFrame llamado `productos` con información de inventario que contiene registros incompletos y repetidos:

```python
import pandas as pd
import numpy as np

productos = pd.DataFrame({
    "Producto": ["Portátil", "Ratón", "Teclado", "Monitor", "Monitor", "Portátil"],
    "Precio": [850.0, 25.0, 45.0, np.nan, 210.0, 850.0],
    "Stock": [10, 200, 150, 50, 50, 10]
})
```

Realiza las siguientes operaciones de limpieza de datos:
* Identifica y muestra por pantalla el número total de valores nulos por columna, así como la cantidad total de filas duplicadas en el DataFrame.
* Imputa (rellena) los valores ausentes en la columna `Precio` sustituyéndolos por el precio medio del resto de productos.
* Elimina las filas duplicadas del DataFrame manteniendo solo la primera ocurrencia de cada registro.
* Renombra todas las columnas para que estén escritas completamente en minúsculas (`producto`, `precio`, `stock`).
* Convierte la columna `stock` a tipo flotante (`float64`) y muestra el DataFrame limpio final.

---

## Ejercicio 4: Análisis, filtrado y persistencia con archivos CSV
En este ejercicio trabajarás con el archivo de datos [consumo_energia.csv](../0-datasets/consumo_energia.csv), que registra el consumo eléctrico mensual (en kWh) de diversas estaciones:

```csv
Estacion,Ciudad,Consumo,Mes
A,Madrid,420,Enero
B,Madrid,390,Enero
A,Sevilla,510,Febrero
B,Sevilla,470,Febrero
C,Valencia,520,Enero
A,Madrid,460,Febrero
C,Sevilla,440,Enero
B,Valencia,480,Febrero
A,Valencia,500,Febrero
C,Madrid,410,Enero
```

Escribe un script que realice las siguientes tareas:
* Carga el archivo `consumo_energia.csv` en un DataFrame y muestra su dimensión (`shape`) y sus primeras 5 filas (`head()`).
* Calcula y muestra por pantalla el **consumo promedio global**, el **consumo máximo** y el **consumo mínimo** registrado en todo el dataset.
* Filtra y muestra únicamente los registros correspondientes al mes de `"Febrero"` cuyo consumo sea superior a `450` kWh.
* Identifica y muestra la fila del registro que tiene el consumo más alto de todo el archivo (*pista: investiga el método `.idxmax()`*).
* Crea una nueva columna calculada llamada `Consumo_Ajustado` multiplicando el consumo original por un factor de `0.8` (reducción del 20%).
* Guarda el DataFrame resultante con la nueva columna en un nuevo fichero CSV llamado `consumo_ajustado.csv` sin incluir el índice numérico.

---

## Ejercicio 5: Modificación condicional y ordenación de datos
Utilizando el DataFrame `empleados` del primer ejercicio:
* Añade una columna llamada `Evaluacion` con una puntuación entera del 1 al 10 para cada empleado (puedes definirlas manualmente o generarlas con NumPy).
* Muestra por pantalla aquellos empleados con una evaluación igual o superior a 8.
* Muestra el empleado que ha obtenido la puntuación de evaluación más alta de la plantilla.
* Aplica una política salarial creando una nueva columna `Subida_salarial` (*pista: puedes apoyarte en `np.where()`*):
  * Para empleados con evaluación igual o superior a 8: la subida será de un **7%** (`0.07`).
  * Para empleados con evaluación inferior a 8: la subida será de un **3%** (`0.03`).
* Calcula el salario final resultante de cada empleado (`Salario * (1 + Subida_salarial)`), asegurándote de almacenar el valor con **dos decimales**, y muestra el listado ordenado de mayor a menor salario final empleando `sort_values()`.

</div>
