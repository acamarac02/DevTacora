---
title: "Pandas"
sidebar_position: 11
description: "Introducción a Pandas, la librería esencial para manipular y analizar datos en Python"
keywords: [Python, Pandas, DataFrame, Series, análisis de datos, IA, Machine Learning, datos tabulares]
---

<div class="justify-text">

Pandas es una de las **librerías más potentes y utilizadas** en el ecosistema científico de Python. Su objetivo principal es facilitar el **análisis, la manipulación y la limpieza de datos**, tareas fundamentales antes de aplicar cualquier modelo de **machine learning o deep learning**.

Mientras que **NumPy** trabaja con datos **numéricos homogéneos** (arrays de números del mismo tipo), Pandas introduce estructuras **más flexibles y expresivas**, capaces de manejar **datos tabulares** (como hojas de cálculo o bases de datos) con **etiquetas** en filas y columnas.

## Conceptos básicos

### Importancia de Pandas en la IA

En proyectos de **inteligencia artificial y machine learning**, la información no suele llegar en forma de arrays numéricos limpios.
Normalmente trabajamos con **datos reales**, que provienen de fuentes heterogéneas como ficheros CSV, hojas de cálculo, bases de datos o APIs, y que contienen **mezclas de números, textos, fechas y valores faltantes**.

Ahí es donde **Pandas** se convierte en una herramienta esencial: actúa como un **puente entre los datos crudos y los modelos de aprendizaje automático**.
Permite **cargar, limpiar, transformar y analizar** la información de manera eficiente, utilizando estructuras de datos optimizadas (`Series` y `DataFrame`), que facilitan el paso posterior a NumPy o a bibliotecas de IA como **scikit-learn**, **TensorFlow** o **PyTorch**.

#### 🧠 Ejemplo: Análisis de un conjunto de datos antes de entrenar un modelo

Imagina que queremos construir un modelo de IA para **predecir el precio de viviendas**.
Disponemos de un archivo CSV con miles de registros que contienen información como:

* Superficie del inmueble (`m2`)
* Número de habitaciones
* Barrio
* Precio de venta

Antes de entrenar cualquier modelo, necesitamos **entender y preparar** esos datos.
Con Pandas podemos hacerlo en solo unas líneas:

```python
import pandas as pd

# Cargar el conjunto de datos desde un archivo CSV
datos = pd.read_csv("viviendas.csv")

# Mostrar las primeras filas
print(datos.head())

# Calcular estadísticas básicas de las columnas numéricas
print(datos.describe())

# Ver cuántos valores faltan por columna
print(datos.isna().sum())
```



📊 **Salida de `head()` (primeras 5 filas):**

```
      m2  habitaciones  barrio   precio
0  120.0            3  Centro   250000
1   85.0            2  Norte    185000
2   60.0            1  Este     120000
3  150.0            4  Oeste    310000
4   90.0            2  Centro   195000
```

**Estadísticas básicas (`describe()`):**

```
                m2  habitaciones        precio
count     5.000000      5.000000       5.000000
mean     101.0          2.4       212000.0
std       33.17          1.14       72594.3
min       60.0           1.0       120000.0
max      150.0           4.0       310000.0
```

**Valores faltantes (`isna().sum()`):**

```
m2              0
habitaciones    0
barrio          0
precio          0
dtype: int64
```

👉 En solo tres pasos hemos:

1. **Leído** los datos directamente desde un fichero.
2. **Explorado** su estructura y estadísticas.
3. **Detectado valores ausentes**, algo fundamental antes del entrenamiento.

Pandas permite realizar estas tareas de forma **rápida, legible y escalable**, sin necesidad de bucles o estructuras complejas.
Por eso es una **herramienta indispensable en las primeras fases del flujo de trabajo de IA**, cuando transformamos los datos reales en información lista para ser utilizada por modelos de machine learning.


---

### Relación entre Pandas y NumPy

Pandas se construye **sobre NumPy**, aprovechando sus arrays para realizar cálculos numéricos de forma eficiente.

La principal diferencia es que Pandas añade **etiquetas e información estructurada** a los datos:

* En **NumPy**, trabajas con arrays indexados por posición numérica (`a[0, 1]`).
* En **Pandas**, puedes usar etiquetas para acceder a los datos (`df["nombre"]`, `df.loc["fila1"]`).

Esto hace que el código sea **más legible, expresivo y cercano a cómo pensamos los datos en tablas** (como en una hoja de cálculo o base de datos).

👉 En resumen:

| Librería | Estructura principal | Tipo de datos | Acceso por | Ideal para |
|-----------|----------------------|----------------|-------------|-------------|
| **NumPy** | Array (`ndarray`) | Datos numéricos homogéneos | Índices numéricos | Cálculos científicos y matriciales |
| **Pandas** | DataFrame / Series | Datos heterogéneos (numéricos, texto, fechas…) | Etiquetas (nombres de columnas o índices) | Análisis y manipulación de datos tabulares |

---

### Estructuras principales de Pandas

Pandas introduce **dos estructuras de datos principales** que amplían las capacidades de NumPy:

1. `Series`: es una **columna unidimensional** con **etiquetas asociadas** (índices).  
2. `DataFrame`: es una **tabla bidimensional** (como una hoja de Excel o una tabla SQL), donde:
    * Cada **columna** es una `Series`.
    * Cada **fila** tiene su propio **índice**.
    * Las columnas pueden contener **tipos de datos diferentes** (números, texto, booleanos…).

---

## Series

Una **Serie** (`pd.Series`) es la estructura más simple de Pandas: un **array unidimensional con etiquetas**, que combina la eficiencia de los arrays de **NumPy** con la flexibilidad de las listas o diccionarios de Python.

Cada elemento de una Serie tiene **dos componentes**:

* un **valor** (el dato en sí),
* un **índice** (una etiqueta asociada al valor).

Esto permite acceder a los datos **por posición o por nombre**, algo muy útil cuando trabajamos con información tabular o registros etiquetados.

---

### Creación de Series

Podemos crear una Serie a partir de **listas**, **arrays de NumPy** o **diccionarios de Python**.

#### A partir de una lista

```python
import pandas as pd

edades = pd.Series([18, 22, 30, 25])
print(edades)
```

Salida:

```
0    18
1    22
2    30
3    25
dtype: int64
```

👉 Pandas crea automáticamente un **índice numérico** empezando en `0`, igual que en las listas.

---

#### A partir de un array de NumPy

```python
import numpy as np

valores = np.array([10, 20, 30, 40])
serie = pd.Series(valores)
print(serie)
```

Salida:

```
0    10
1    20
2    30
3    40
dtype: int64
```

📘 Esto demuestra cómo Pandas puede **integrar directamente datos de NumPy**, manteniendo toda su potencia numérica.

---

#### A partir de un diccionario

Si usamos un diccionario, las **claves se convierten en el índice** y los **valores en los datos**:

```python
precios = pd.Series({'manzana': 0.85, 'plátano': 0.60, 'pera': 0.90})
print(precios)
```

Salida:

```
manzana    0.85
plátano    0.60
pera       0.90
dtype: float64
```

👉 Este formato es muy útil para representar datos **con etiquetas significativas**, como columnas de un dataset real.

---

#### Índices y acceso a elementos

El índice de una Serie puede personalizarse:

```python
alumnos = pd.Series([8.5, 7.0, 9.2], index=['Ana', 'Luis', 'Marta'])
print(alumnos)
```

Salida:

```
Ana      8.5
Luis     7.0
Marta    9.2
dtype: float64
```

Podemos acceder a los elementos de dos formas:

```python
print(alumnos[0])        # Por posición
# 8.5

print(alumnos['Marta'])  # Por etiqueta
# 9.2
```

---

### Propiedades de una Serie

Las Series tienen propiedades útiles para inspeccionar su contenido:

```python
print(alumnos.values)   # Valores (array de NumPy)
print(alumnos.index)    # Índices
print(alumnos.dtype)    # Tipo de dato
print(alumnos.shape)    # Dimensión
```

Salida:

```
[8.5 7.  9.2]
Index(['Ana', 'Luis', 'Marta'], dtype='object')
float64
(3,)
```

👉 Observa que los valores se almacenan internamente como un **array NumPy**, lo que permite realizar operaciones vectorizadas.

---

### Operaciones vectorizadas y estadísticas

Podemos aplicar operaciones **directamente sobre toda la Serie**, igual que en NumPy:

```python
print(alumnos + 1)     # Suma 1 a todas las notas
print(alumnos * 2)     # Duplica cada valor
```

Salida:

```
Ana      9.5
Luis     8.0
Marta   10.2
dtype: float64
```

Y también funciones estadísticas integradas:

```python
print(alumnos.mean())   # Media
print(alumnos.max())    # Máximo
print(alumnos.min())    # Mínimo
```

Salida:

```
8.233333333333333
9.2
7.0
```

📊 En IA, estas operaciones son muy comunes para **analizar variables individuales** (por ejemplo, la edad media de los clientes o el valor promedio de un sensor).

---

### Filtrado y condiciones lógicas

Podemos filtrar los valores de una Serie usando **condiciones booleanas**, igual que en NumPy:

```python
print(alumnos[alumnos > 8])
```

Salida:

```
Ana      8.5
Marta    9.2
dtype: float64
```

También pueden combinarse condiciones con `&` (*and*) y `|` (*or*):

```python
print(alumnos[(alumnos >= 7) & (alumnos < 9)])
```

Salida:

```
Luis    7.0
Ana     8.5
dtype: float64
```

👉 Este tipo de filtrado se utiliza constantemente en análisis de datos y preparación de datasets, por ejemplo, para **seleccionar muestras válidas o descartar valores anómalos** antes del entrenamiento de un modelo.

---

:::tip EJERCICIO SERIES: Análisis de consumo energético

Imagina que un sistema IoT ha registrado el **consumo eléctrico (en kWh)** de un edificio inteligente durante cinco días consecutivos.
Queremos analizar estos datos con Pandas.

1. Crea una Serie llamada `consumo` con las siguientes etiquetas y los valores generados aleatoriamente entre 27 y 40. Una posible salida sería:

    | Día       | Consumo (kWh) |
    | --------- | ------------- |
    | Lunes     | 34.5          |
    | Martes    | 29.8          |
    | Miércoles | 31.2          |
    | Jueves    | 40.1          |
    | Viernes   | 37.6          |


2. Muestra:

   * El consumo medio de la semana.
   * Qué días superaron el consumo medio.
   * Cuál fue el **día de mayor consumo**.
   * Incrementa todos los valores un 10% (simulando una predicción de aumento de demanda).
:::

---

## DataFrames

Un **DataFrame** es la estructura de datos **más importante y versátil de Pandas**.
Podemos imaginarlo como una **tabla**, similar a una hoja de cálculo de Excel o una tabla de base de datos:

* Cada **columna** es una **Serie** (con su propio tipo de dato).
* Cada **fila** representa una **observación o registro**.
* Cada **celda** contiene un valor individual.

Los DataFrames permiten manejar datos **heterogéneos** (números, textos, fechas, booleanos…) de forma eficiente y estructurada.
En proyectos de IA y ciencia de datos, los DataFrames son el **punto de partida habitual** para analizar y preparar conjuntos de datos antes de alimentar a modelos de *machine learning*.

---

### Creación de DataFrames

#### A partir de un diccionario de listas

Cada clave del diccionario se convierte en el **nombre de una columna**, y los valores (listas) en las **filas** correspondientes.

```python
import pandas as pd

datos = {
    "nombre": ["Ana", "Luis", "Marta", "Jorge"],
    "edad": [23, 21, 25, 22],
    "nota": [8.5, 7.2, 9.1, 6.8]
}

df = pd.DataFrame(datos)
print(df)
```

Salida:

```
  nombre  edad  nota
0    Ana    23   8.5
1   Luis    21   7.2
2  Marta    25   9.1
3  Jorge    22   6.8
```

📘 En IA, este formato es muy común al **importar datasets** en los que cada columna representa una característica (*feature*) y cada fila, una muestra.

---

#### A partir de una lista de diccionarios

Cada elemento de la lista representa una **fila del DataFrame**:

```python
personas = [
    {"nombre": "Ana", "edad": 23, "nota": 8.5},
    {"nombre": "Luis", "edad": 21, "nota": 7.2},
    {"nombre": "Marta", "edad": 25, "nota": 9.1},
]
df = pd.DataFrame(personas)
print(df)
```

---

#### A partir de un array de NumPy

Podemos combinar **NumPy** y **Pandas** fácilmente:

```python
import numpy as np

valores = np.array([[1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]])

df = pd.DataFrame(valores, columns=["A", "B", "C"])
print(df)
```

Salida:

```
   A  B  C
0  1  2  3
1  4  5  6
2  7  8  9
```

👉 Esto es muy útil cuando generamos datos con NumPy (por ejemplo, simulaciones o resultados de sensores) y queremos analizarlos o etiquetarlos con Pandas.

---

### Exploración inicial

Una vez creado el DataFrame, existen métodos muy útiles para **inspeccionar su contenido**:

```python
print(df.head())      # Primeras 5 filas
print(df.tail(2))     # Últimas 2 filas
print(df.info())      # Información general
print(df.describe())  # Estadísticas numéricas
```

**Ejemplo de salida (`df.describe()`):**

```
            edad      nota
count   4.000000  4.000000
mean   22.750000  7.900000
std     1.707825  1.031091
min    21.000000  6.800000
max    25.000000  9.100000
```

📊 Estas funciones son esenciales para **conocer la estructura y distribución** de los datos, detectar valores extremos o confirmar tipos de variables antes de entrenar un modelo.

---

### Acceso a los datos

El procedimiento dependerá si queremos acceder a los datos por fila o por columna.

#### Acceso a columnas

Podemos acceder a una columna de la siguiente forma:

```python
print(df["nombre"])   # Método más común (hay otras formas)
```

Salida:

```
0      Ana
1     Luis
2    Marta
3    Jorge
Name: nombre, dtype: object
```

👉 Cada columna es en realidad una **Serie de Pandas**.

También podemos obtener varias columnas a la vez pasando una lista:

```python
print(df[["nombre", "nota"]])
```

---

#### Acceso a filas

Pandas ofrece dos formas principales de acceder a filas:

* `.loc[]` → por **etiqueta** o nombre de índice.
* `.iloc[]` → por **posición numérica**.

```python
print(df.loc[2])   # Fila con etiqueta 2
print(df.iloc[0])  # Primera fila
```

Salida:

```
nombre    Marta
edad          25
nota         9.1
Name: 2, dtype: object
```

---

### Selección condicional y filtrado múltiple

Al igual que hacíamos en NumPy, podemos aplicar condiciones para **filtrar registros** fácilmente:

```python
print(df[df["nota"] > 8])
```

Salida:

```
  nombre  edad  nota
0    Ana    23   8.5
2  Marta    25   9.1
```

También se pueden combinar condiciones con operadores lógicos:

```python
print(df[(df["edad"] > 21) & (df["nota"] >= 8)])
```

👉 Esto resulta muy útil para seleccionar subconjuntos de datos, como “estudiantes mayores de 21 con nota destacada”.

---

### Añadir y eliminar registros

#### Añadir columnas

Podemos crear una nueva columna directamente:

```python
df["aprobado"] = df["nota"] >= 5
print(df)
```

Salida:

```
  nombre  edad  nota  aprobado
0    Ana    23   8.5      True
1   Luis    21   7.2      True
2  Marta    25   9.1      True
3  Jorge    22   6.8      True
```

También se pueden añadir columnas calculadas:

```python
df["nota_ajustada"] = df["nota"] * 1.05
```

---

#### Eliminar columnas o filas

Para eliminar una columna, usamos `drop()` con `axis=1`:

```python
df = df.drop("nota_ajustada", axis=1)
```

Para eliminar filas por índice:

```python
df = df.drop(3, axis=0)  # Elimina la fila con índice 3
```

👉 Todas estas operaciones devuelven **una nueva copia del DataFrame**; si se quiere modificar el original, se añade el parámetro `inplace=True`.

---

## Modificación y limpieza básica

En la práctica, los conjuntos de datos rara vez llegan “limpios”.
Antes de analizar o entrenar modelos de IA, es habitual tener que **renombrar columnas**, **corregir tipos de datos**, **tratar valores nulos** o **eliminar duplicados**.

Pandas incluye múltiples herramientas para realizar estas tareas de manera sencilla y eficiente.

### Renombrar columnas

El método `rename()` permite **cambiar el nombre de una o varias columnas**.
Recibe un diccionario donde las claves son los nombres actuales y los valores los nuevos.

```python
import pandas as pd

df = pd.DataFrame({
    "nombre": ["Ana", "Luis", "Marta"],
    "edad": [23, 21, 25],
    "nota": [8.5, 7.2, 9.1]
})

df = df.rename(columns={"nota": "puntuacion"})
print(df)
```

Salida:

```
  nombre  edad  puntuacion
0    Ana    23         8.5
1   Luis    21         7.2
2  Marta    25         9.1
```

👉 Esta operación es muy común cuando los datasets provienen de **fuentes externas** (por ejemplo, CSVs con nombres poco descriptivos).

---

### Reemplazar valores

Para sustituir valores específicos, utilizamos `replace()`.
Funciona tanto con valores individuales como con listas o diccionarios.

```python
df["nombre"] = df["nombre"].replace("Luis", "Luis M.")
print(df)
```

Salida:

```
  nombre  edad  puntuacion
0    Ana    23         8.5
1  Luis M.  21         7.2
2  Marta    25         9.1
```

También puede emplearse para **reemplazar varios valores a la vez**:

```python
df["edad"] = df["edad"].replace({21: 22, 25: 26})
```

---

### Cambiar tipos de datos

Pandas detecta automáticamente los tipos de cada columna (`int`, `float`, `object`, etc.), pero a veces es necesario **convertirlos manualmente**, por ejemplo para cálculos numéricos o modelos que no aceptan texto.

Se usa el método `astype()`:

```python
df["edad"] = df["edad"].astype(float)
print(df.dtypes)
```

Salida:

```
nombre         object
edad          float64
puntuacion    float64
dtype: object
```

📘 Este paso es fundamental antes del modelado: los algoritmos de aprendizaje automático requieren tipos numéricos homogéneos (por ejemplo, `float32` en TensorFlow).

---

### Detección y tratamiento de valores nulos

Los valores ausentes o desconocidos (`NaN`) son muy frecuentes en datasets reales.
Pandas ofrece varias funciones para **identificarlos, eliminarlos o sustituirlos**.

#### Detección de nulos

```python
import numpy as np

df.loc[1, "puntuacion"] = np.nan   # Simulamos un valor faltante
print(df)
```

```
  nombre  edad  puntuacion
0    Ana  23.0        8.5
1  Luis M. 22.0        NaN
2  Marta  26.0        9.1
```

Podemos comprobar qué valores son nulos:

```python
print(df.isna())       # True/False por celda
print(df.isna().sum()) # Conteo por columna
```

Salida:

```
   nombre   edad  puntuacion
0   False  False       False
1   False  False        True
2   False  False       False

nombre        0
edad          0
puntuacion    1
dtype: int64
```

---

#### Sustituir valores nulos

Para rellenar los nulos, usamos `fillna()`:

```python
df["puntuacion"] = df["puntuacion"].fillna(df["puntuacion"].mean())
print(df)
```

Salida:

```
  nombre  edad  puntuacion
0    Ana    23.0     8.5
1  Luis M.  22.0     8.8
2  Marta    26.0     9.1
```

👉 En este caso, se ha sustituido el valor faltante por la **media de la columna**, una técnica de imputación común en preprocesamiento. Más adelante estudiaremos las diferentes técnicas que existen y cual aplicar según el caso.

---

#### Eliminar filas o columnas con nulos

Si queremos **eliminar registros incompletos**, usamos `dropna()`:

```python
df = df.dropna()
```

O bien eliminar columnas con valores ausentes:

```python
df = df.dropna(axis=1)
```

---

### Duplicados

Otra fuente habitual de problemas son los **registros duplicados**, especialmente en datasets recopilados de distintas fuentes.

Podemos detectarlos con `duplicated()`:

```python
print(df.duplicated())
```

Y eliminarlos con `drop_duplicates()`:

```python
df = df.drop_duplicates()
```

Si solo queremos considerar algunas columnas para definir duplicados:

```python
df = df.drop_duplicates(subset=["nombre"])
```

---

### Resumen rápido

| Función                              | Descripción                           | Ejemplo                        | Resultado            |
| ------------------------------------ | ------------------------------------- | ------------------------------ | -------------------- |
| `rename()`                           | Cambiar nombres de columnas o índices | `df.rename(columns={"a":"A"})` | Columna renombrada   |
| `replace()`                          | Sustituir valores                     | `df["col"].replace(0, np.nan)` | Valores reemplazados |
| `astype()`                           | Cambiar tipo de datos                 | `df["edad"].astype(float)`     | Tipo actualizado     |
| `isna()` / `fillna()`                | Detectar / rellenar valores nulos     | `df.fillna(0)`                 | Nulos sustituidos    |
| `dropna()`                           | Eliminar filas o columnas con nulos   | `df.dropna(axis=0)`            | Datos limpios        |
| `duplicated()` / `drop_duplicates()` | Detectar / eliminar duplicados        | `df.drop_duplicates()`         | Sin repeticiones     |


📘 **En resumen:**
Estas operaciones forman parte de la **fase básica de limpieza de datos**, imprescindible antes de cualquier análisis o entrenamiento.
Dominar estas funciones permite **preparar los datasets de manera rápida y fiable**, garantizando que los modelos de IA trabajen con datos consistentes y sin errores.

---

## Operaciones y funciones útiles

Una vez que los datos están limpios y organizados en un **DataFrame**, Pandas permite realizar **operaciones matemáticas, estadísticas y transformaciones** de forma rápida y vectorizada, sin necesidad de bucles.

Estas funciones son esenciales en la **fase de análisis exploratorio de datos (EDA)**, donde se busca obtener información general antes de aplicar técnicas de modelado o aprendizaje automático.


### Operaciones aritméticas y estadísticas

Pandas hereda de NumPy la capacidad de aplicar operaciones **elemento a elemento** sobre columnas numéricas.

```python
import pandas as pd

df = pd.DataFrame({
    "temperatura": [20, 22, 25, 23, 21],
    "humedad": [65, 70, 60, 72, 68]
})
```

#### Operaciones aritméticas

```python
print(df["temperatura"] + 1)    # Aumentar en 1 grado
print(df["humedad"] / 100)      # Convertir a proporción
```

Salida:

```
0    21
1    23
2    26
3    24
4    22
Name: temperatura, dtype: int64
```

👉 Estas operaciones se aplican **a toda la columna** (vectorización), lo que las hace muy rápidas incluso con miles de registros.

---

#### Operaciones estadísticas básicas

Pandas incluye numerosas funciones estadísticas integradas:

```python
print("Media temperatura:", df["temperatura"].mean())
print("Máximo humedad:", df["humedad"].max())
print("Desviación estándar:", df["temperatura"].std())
print("Suma total humedad:", df["humedad"].sum())
```

Salida:

```
Media temperatura: 22.2
Máximo humedad: 72
Desviación estándar: 1.92
Suma total humedad: 335
```

📘 En IA, estas métricas ayudan a **resumir y entender la distribución** de los datos antes del entrenamiento (por ejemplo, detectar valores extremos o sesgos en las variables).

---

### Aplicación de funciones con `map()`

Además de las operaciones básicas, Pandas permite aplicar **funciones personalizadas** sobre una columna. Por ejemplo, podemos convertir temperaturas de °C a °F o pasar textos a minúsculas.


```python
df["temperatura_F"] = df["temperatura"].map(lambda x: x * 1.8 + 32)
print(df)
```

Salida:

```
   temperatura  humedad  temperatura_F
0           20       65           68.0
1           22       70           71.6
2           25       60           77.0
3           23       72           73.4
4           21       68           69.8
```

---

### Agrupaciones simples (`groupby()`)

Una de las herramientas **más potentes** de Pandas es `groupby()`.
Permite **dividir un DataFrame en grupos** según una o varias columnas categóricas (por ejemplo, *tienda*, *ciudad* o *producto*), para luego **calcular estadísticas o resúmenes** sobre cada grupo.

En otras palabras, `groupby()` en Pandas equivale a la operación `GROUP BY` en **SQL**.


#### Concepto básico

El flujo lógico de un `groupby()` puede entenderse como tres pasos:

1. **Dividir (split):** agrupar el DataFrame según una o varias columnas.
2. **Aplicar (apply):** ejecutar una operación sobre cada grupo (por ejemplo, `mean()`, `sum()`, `count()`…).
3. **Combinar (combine):** juntar los resultados en una nueva estructura.

🔹 Sintaxis general:

```python
df.groupby("columna_agrupar")["columna_numerica_calculo"].función()
```

Ejemplo:

```python
ventas.groupby("tienda")["ventas"].mean()
```

---

#### Ejemplo práctico

Supongamos el siguiente DataFrame con información de ventas por tienda y ciudad:

```python
import pandas as pd

ventas = pd.DataFrame({
    "tienda": ["A", "B", "A", "B", "A", "C"],
    "ventas": [200, 300, 250, 400, 150, 350],
    "ciudad": ["Madrid", "Madrid", "Sevilla", "Sevilla", "Sevilla", "Madrid"]
})
print(ventas)
```

Salida:

```
  tienda  ventas   ciudad
0      A     200   Madrid
1      B     300   Madrid
2      A     250  Sevilla
3      B     400  Sevilla
4      A     150  Sevilla
5      C     350   Madrid
```

#### Agrupar por una columna

Si queremos conocer la **media de ventas por tienda**, podemos agrupar por el nombre de la tienda:

```python
media_ventas = ventas.groupby("tienda")["ventas"].mean()
print(media_ventas)
```

Salida:

```
tienda
A    200.0
B    350.0
C    350.0
Name: ventas, dtype: float64
```

📘 Cada grupo se identifica por el valor de la columna `tienda`.
La función `mean()` calcula la media dentro de cada grupo.

---

#### Otras funciones comunes con `groupby()`

Además de `mean()`, se pueden aplicar muchas funciones estadísticas:

| Función           | Descripción           |
| ----------------- | --------------------- |
| `sum()`           | Suma total del grupo  |
| `mean()`          | Media aritmética      |
| `count()`         | Número de elementos   |
| `min()` / `max()` | Valor mínimo / máximo |
| `median()`        | Mediana               |
| `std()`           | Desviación estándar   |

Ejemplo:

```python
ventas.groupby("tienda")["ventas"].sum()
```

Salida:

```
tienda
A    600
B    700
C    350
Name: ventas, dtype: int64
```

👉 Esto indica las **ventas totales** por tienda, combinando los registros repetidos.

---

#### Agrupar por más de una columna

También podemos agrupar por **dos o más columnas** para obtener combinaciones únicas, igual que en SQL:

```python
ventas_ciudad = ventas.groupby(["ciudad", "tienda"])["ventas"].sum()
print(ventas_ciudad)
```

Salida:

```
ciudad   tienda
Madrid   A    200
         B    300
         C    350
Sevilla  A    400
         B    400
Name: ventas, dtype: int64
```

🔹 El resultado tiene un **índice jerárquico** (*MultiIndex*), donde primero se agrupa por ciudad y luego por tienda.
Esto es muy útil para comparar resultados entre regiones o categorías.

---

#### Obtener varias estadísticas a la vez

También podemos obtener **múltiples estadísticas simultáneamente** usando `.agg()` (de *aggregate*):

```python
resumen = ventas.groupby("tienda")["ventas"].agg(["mean", "sum", "count"])
print(resumen)
```

Salida:

```
         mean  sum  count
tienda
A        200   600      3
B        350   700      2
C        350   350      1
```

👉 `agg()` permite aplicar varias funciones a la vez, generando un resumen completo por grupo.

---

### Ordenación de datos (`sort_values()`, `sort_index()`)

#### Ordenar por valores

```python
print(ventas.sort_values(by="ventas", ascending=False))
```

Salida:

```
  tienda  ventas   ciudad
3      B     400  Sevilla
1      B     300   Madrid
2      A     250  Sevilla
0      A     200   Madrid
4      A     150  Sevilla
```

#### Ordenar por índice

```python
print(ventas.sort_index())
```

👉 Esto ordena las filas según su **índice numérico o etiqueta**, útil tras concatenaciones o reindexaciones.

---

## Carga y guardado de datos

Una de las principales ventajas de Pandas es su capacidad para **leer y escribir datos en múltiples formatos**.
En ciencia de datos y aprendizaje automático, los conjuntos de datos suelen almacenarse en **archivos CSV o Excel**, por lo que dominar estas operaciones es esencial para poder **importar, explorar y preparar la información** antes del análisis.


### Lectura de archivos CSV (`read_csv()`)

El formato **CSV (Comma-Separated Values)** es el más habitual para almacenar datos tabulares.
Cada fila representa un registro y las columnas se separan por comas, punto y coma u otros delimitadores.

Pandas permite leer fácilmente este tipo de ficheros con la función `pd.read_csv()`. Puedes descargar el fichero de ejemplo [aquí](./0-datasets/ventas.csv).


```python
import pandas as pd

# Cargar un archivo CSV
df = pd.read_csv("ventas.csv")

# Mostrar las primeras filas
print(df.head())
```

Salida (ejemplo):

```
   id  tienda   ciudad  ventas
0   1       A   Madrid     200
1   2       B   Madrid     300
2   3       A  Sevilla     250
3   4       B  Sevilla     400
4   5       A  Sevilla     150
```

👉 Por defecto, `read_csv()` interpreta que las columnas están separadas por comas, que la primera fila contiene los encabezados y que se usará un índice numérico.

---

### Parámetros importantes de `read_csv()`

Pandas permite adaptar la lectura del fichero con numerosos argumentos.
A continuación se muestran los más usados:

| Parámetro   | Descripción                                                      | Ejemplo                       |
| ----------- | ---------------------------------------------------------------- | ----------------------------- |
| `sep`       | Delimitador del archivo. Puede ser `","`, `";"`, `"\t"`…         | `sep=";"`                     |
| `header`    | Fila que contiene los nombres de las columnas (por defecto `0`). | `header=0`                    |
| `index_col` | Columna a usar como índice del DataFrame.                        | `index_col="id"`              |
| `usecols`   | Lista de columnas a cargar (para ahorrar memoria).               | `usecols=["tienda","ventas"]` |
| `encoding`  | Codificación del archivo (`utf-8`, `latin-1`, etc.).             | `encoding="utf-8"`            |

Ejemplo práctico con varios parámetros:

```python
df = pd.read_csv(
    "ventas.csv",
    sep=";",
    index_col="id",
    usecols=["id", "tienda", "ventas"],
    encoding="utf-8"
)
print(df.head())
```

---

### Exploración rápida tras la carga

Una vez cargado el dataset, conviene **inspeccionar su contenido y estructura**:

```python
print(df.shape)     # Número de filas y columnas
print(df.columns)   # Nombres de columnas
print(df.info())    # Tipos de datos y valores nulos
print(df.describe())# Estadísticas numéricas
```

📘 Estas comprobaciones son el primer paso del flujo de trabajo en IA: garantizan que el dataset se ha leído correctamente y que los tipos de datos son adecuados.

---

### Escritura de DataFrames (`to_csv()`)

Cuando terminamos de limpiar o transformar un DataFrame, podemos **guardar los resultados** nuevamente en un archivo CSV.

```python
# Guardar el DataFrame en un nuevo archivo
df.to_csv("ventas_limpias.csv", index=False)
```

📘 El parámetro `index=False` evita guardar el índice como una columna adicional en el archivo.
Esto es útil cuando el índice no tiene significado en el dataset.

También podemos personalizar el formato de salida:

```python
df.to_csv("ventas_utf8.csv", sep=";", encoding="utf-8")
```

---

### Lectura y escritura en Excel

Además de CSV, Pandas permite trabajar directamente con archivos **Excel** (`.xlsx`, `.xls`).
Esto es muy común en entornos empresariales o cuando los datos provienen de hojas de cálculo.

#### Leer un archivo Excel

```python
df_excel = pd.read_excel("ventas.xlsx", sheet_name="Hoja1")
print(df_excel.head())
```

#### Guardar un DataFrame a Excel

```python
df.to_excel("resultado.xlsx", index=False, sheet_name="Resumen")
```

📘 Estos métodos requieren tener instalado un motor adicional como `openpyxl` (ya incluido en la mayoría de entornos científicos de Python).

</div>