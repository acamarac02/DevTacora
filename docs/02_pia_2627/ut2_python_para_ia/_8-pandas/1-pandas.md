---
title: "Pandas"
sidebar_position: 1
description: "Introducción a Pandas, la librería esencial para manipular y analizar datos en Python"
keywords: [Python, Pandas, DataFrame, análisis de datos, IA, Machine Learning, datos tabulares]
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
| **Pandas** | DataFrame | Datos heterogéneos (numéricos, texto, fechas…) | Nombres de columnas e índices | Análisis y manipulación de datos tabulares |

---

## DataFrames

El **DataFrame** es la estructura de datos **fundamental y más utilizada de Pandas**.
Podemos imaginarlo como una **tabla bidimensional**, similar a una hoja de cálculo de Excel o una tabla de base de datos SQL:

* Cada **columna** representa una variable o característica (*feature*) con su propio nombre y tipo de dato. Internamente, cada columna individual es tratada como una **Serie** de Pandas (`pd.Series`).
* Cada **fila** representa una **muestra u observación** (*sample*) y posee un **índice** numérico o etiqueta.
* Cada **celda** contiene un valor individual.

Los DataFrames permiten manejar datos **heterogéneos** (combinando números, textos, fechas y valores ausentes en una misma tabla) de forma extraordinariamente eficiente.
En proyectos de IA y ciencia de datos, los DataFrames son el **punto de partida habitual** para cargar, explorar y transformar datasets antes de alimentar a modelos de *machine learning*.

---

### Creación y carga de DataFrames

En la práctica existen dos formas habituales de disponer de un DataFrame: **crearlo en memoria** a partir de un diccionario de Python o **cargarlo directamente desde un archivo externo** (la forma más común en proyectos de Inteligencia Artificial).

#### 1. A partir de un diccionario de listas

Cada clave del diccionario define el **nombre de una columna**, y su lista asociada contiene los **valores de las filas**. Resulta muy útil para pruebas rápidas o pequeños conjuntos de datos:

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

---

#### 2. Lectura directa desde un archivo CSV (`pd.read_csv()`)

En proyectos reales de IA y *machine learning*, prácticamente toda la información procede de archivos externos, siendo el formato **CSV (Comma-Separated Values)** el estándar por excelencia.

Pandas permite cargar un fichero CSV en una sola línea de código mediante `pd.read_csv()`. Puedes descargar el archivo de ejemplo [aquí](../0-datasets/ventas.csv).

```python
import pandas as pd

# Cargar un archivo CSV en un DataFrame
df = pd.read_csv("ventas.csv")

# Mostrar las primeras filas
print(df.head())
```

Salida:

```
   id tienda   ciudad  ventas
0   1      A   Madrid     200
1   2      B   Madrid     300
2   3      A  Sevilla     250
3   4      B  Sevilla     400
4   5      A  Sevilla     150
```

##### Parámetros habituales de `pd.read_csv()`

| Parámetro   | Descripción                                                                 | Ejemplo                       |
| ----------- | --------------------------------------------------------------------------- | ----------------------------- |
| `sep`       | Delimitador del archivo (por defecto `","`, pero puede ser `";"`, `"\t"`…). | `sep=";"`                     |
| `header`    | Fila que contiene los nombres de las columnas (por defecto `0`).            | `header=0`                    |
| `index_col` | Columna a utilizar como índice del DataFrame.                               | `index_col="id"`              |
| `usecols`   | Lista con únicamente las columnas que se desean cargar (ahorra memoria).    | `usecols=["tienda","ventas"]` |
| `encoding`  | Codificación del archivo (`utf-8`, `latin-1`...).                           | `encoding="utf-8"`            |

---

### Exploración inicial del DataFrame

Una vez creado o cargado el dataset, el primer paso en cualquier flujo de IA consiste en **inspeccionar su estructura, dimensiones y estadísticas básicas**:

```python
print(df.shape)       # Tupla con las dimensiones: (número de filas, columnas)
print(df.columns)     # Lista con los nombres de las columnas
print(df.head(3))     # Primeras 3 filas (por defecto 5)
print(df.tail(2))     # Últimas 2 filas
print(df.info())      # Tipos de datos por columna y recuento de valores no nulos
print(df.describe())  # Resumen estadístico de las columnas numéricas (media, mín, máx...)
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

📊 Estas funciones son esenciales para **conocer la distribución de los datos**, detectar posibles valores atípicos y confirmar que los tipos de datos son correctos antes de realizar cualquier modelado.

---

### Acceso a los datos

El procedimiento dependerá de si queremos acceder a los datos por fila, por columna o a celdas concretas combinando ambas dimensiones.

#### Acceso a columnas

Podemos acceder a una columna de la siguiente forma:

```python
print(df["nombre"])   # Método más común
```

Salida:

```
0      Ana
1     Luis
2    Marta
3    Jorge
Name: nombre, dtype: object
```

👉 Cada columna individual devuelta es una **Serie de Pandas** (unidimensional).

También podemos obtener un subconjunto con varias columnas pasando una lista:

```python
print(df[["nombre", "nota"]])
```

---

#### Acceso a filas y rangos (`.loc` e `.iloc`)

Pandas ofrece dos operadores fundamentales para acceder a filas:

* `.iloc[]` (*integer-location*) → selección por **posición numérica** (índice 0, 1, 2... idéntico a las listas de Python y arrays de NumPy).
* `.loc[]` (*label-location*) → selección por **etiqueta de índice** o mediante **condiciones booleanas**.

##### 1. Selección de filas individuales

```python
print(df.iloc[0])  # Primera fila por posición numérica
print(df.loc[2])   # Fila cuya etiqueta de índice es 2
```

Salida:

```
nombre    Marta
edad          25
nota         9.1
Name: 2, dtype: object
```

##### 2. Selección de rangos de filas con *slicing* (`.iloc[:2]`)

Al igual que en Python y NumPy, podemos usar la sintaxis de corte `[inicio:fin]` con `.iloc` para obtener un rango continuo de filas:

```python
# Obtenemos las dos primeras filas (posiciones 0 y 1, excluyendo la posición 2)
dos_primeras = df.iloc[:2]
print(dos_primeras)
```

Salida:

```
  nombre  edad  nota
0    Ana    23   8.5
1   Luis    21   7.2
```

:::tip
`df.iloc[:2]` es especialmente útil cuando queremos extraer una muestra fija de registros por su posición física en el DataFrame, sin depender de los nombres que tengan sus índices.
:::

---

#### Acceso simultáneo a filas y columnas

Tanto `.iloc` como `.loc` permiten especificar filas y columnas al mismo tiempo usando la sintaxis `[filas, columnas]`:

* **Por posición (`.iloc[filas, columnas]`)**:
  ```python
  # Primeras 2 filas y 2 primeras columnas
  print(df.iloc[:2, :2])
  ```

* **Por etiqueta o condición (`.loc[filas, columnas]`)**:
  ```python
  # Valor de la columna 'nota' para la fila con índice 2
  print(df.loc[2, "nota"])  # 9.1
  ```

---

#### Filtrado y extracción de un valor escalar (`.loc` con `.values[0]`)

Una operación muy habitual en preprocesamiento y consultas de datos consiste en buscar un registro por el valor de una columna y extraer un dato concreto como un valor numérico o texto individual (no como una Serie).

Por ejemplo, para obtener directamente la nota de Marta:

```python
nota_marta = df.loc[df["nombre"] == "Marta", "nota"].values[0]
print(nota_marta)
# 9.1
```

**¿Cómo funciona esta instrucción desgranada paso a paso?**

1. **Condición sobre las filas (`df["nombre"] == "Marta"`)**:  
   Crea una máscara booleana (`[False, False, True, False]`) que filtra únicamente la fila o filas donde la columna `nombre` coincida con `"Marta"`.
2. **Selección de la columna destino (`"nota"`)**:  
   Al pasarse como segundo argumento a `.loc[filas, columnas]`, Pandas extrae únicamente la columna indicada para las filas que cumplieron la condición.
3. **¿Qué devuelve hasta aquí?**:  
   Devuelve un objeto `Series` de Pandas que aún incluye el índice y metadatos:
   ```text
   2    9.1
   Name: nota, dtype: float64
   ```
4. **Extracción del dato primitivo (`.values[0]`)**:  
   * `.values` convierte la Serie resultante en su array subyacente de NumPy: `array([9.1])`.
   * `[0]` accede a la primera posición de ese array, extrayendo directamente el valor escalar (`9.1` como float de Python) para poder operar o imprimirlo limpiamente sin la cabecera de la Serie.

*(Alternativamente, también se suele usar `.iloc[0]` sobre la Serie resultante o el método `.item()` si sabemos que el resultado es un único valor).*


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

Supongamos que nuestro dataset contiene un valor ausente (`NaN`), por ejemplo en la puntuación del segundo registro:

```text
    nombre  edad  puntuacion
0      Ana  23.0         8.5
1  Luis M.  22.0         NaN
2    Marta  26.0         9.1
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

### Ordenación de datos (`sort_values()`)

Podemos ordenar las filas del DataFrame en función de los valores de una columna mediante `sort_values()`:

```python
# Ordenar de mayor a menor temperatura (orden descendente)
print(df.sort_values(by="temperatura", ascending=False))
```

Salida:

```
   temperatura  humedad  temperatura_F
2           25       60           77.0
3           23       72           73.4
1           22       70           71.6
4           21       68           69.8
0           20       65           68.0
```

📘 **Nota:** Por defecto el parámetro `ascending` es `True` (orden ascendente de menor a mayor). Indicando `ascending=False` se ordena de mayor a menor.

---

## Guardado y exportación de datos

Cuando terminamos de limpiar, transformar o calcular nuevas características en un DataFrame, el último paso habitual consiste en **guardar los resultados** en un archivo en disco para utilizarlos posteriormente en el entrenamiento de modelos de Machine Learning.

### Escritura en archivos CSV (`to_csv()`)

El método `to_csv()` permite exportar cualquier DataFrame a un archivo CSV:

```python
# Guardar el DataFrame limpio en un nuevo archivo
df.to_csv("ventas_limpias.csv", index=False)
```

📘 **Recomendación:** El parámetro `index=False` evita que Pandas guarde el índice numérico por defecto como una columna adicional en el fichero, lo cual es la práctica estándar en ciencia de datos para mantener el dataset limpio.

También es posible personalizar el delimitador o la codificación si fuera necesario:

```python
df.to_csv("ventas_exportadas.csv", sep=";", encoding="utf-8", index=False)
```

---

### Lectura y guardado en archivos Excel (opcional)

Pandas también permite interactuar con hojas de cálculo **Excel** (`.xlsx`, `.xls`):

* **Lectura:** `df_excel = pd.read_excel("ventas.xlsx", sheet_name="Hoja1")`
* **Escritura:** `df.to_excel("resumen.xlsx", sheet_name="Datos", index=False)`

📘 *Nota:* Trabajar con archivos Excel requiere tener instalada la librería complementaria `openpyxl`. En entornos de producción y pipelines de IA, se prefiere siempre el formato CSV por su ligereza, rapidez y universalidad.

</div>