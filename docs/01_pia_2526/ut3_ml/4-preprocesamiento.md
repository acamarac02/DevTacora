---
title: "Preprocesamiento de Datos"
sidebar_position: 4
toc_max_heading_level: 4
description: "Introducción al Preprocesamiento de Datos en Machine Learning. Qué es, por qué se realiza después del EDA, principales pasos para limpiar, transformar y preparar los datos antes del modelado utilizando pandas y scikit-learn."
keywords: [Preprocesamiento, Machine Learning, pandas, scikit-learn, limpieza de datos, escalado, codificación, preparación de datos]
---

<div class="justify-text">

El **Preprocesamiento de Datos** es la **segunda etapa del proceso de Machine Learning**, y comienza justo después de haber realizado el **Análisis Exploratorio de Datos (EDA)**.  
Si en el EDA analizamos y comprendemos los datos, en el preprocesamiento el objetivo es **prepararlos adecuadamente** para que los algoritmos de aprendizaje automático puedan trabajar con ellos de forma correcta y eficiente.

Durante esta fase, se realizan todas las tareas necesarias para **limpiar, transformar y estandarizar** los datos.  
Esto incluye, por ejemplo, rellenar valores nulos, eliminar duplicados, codificar variables categóricas o escalar las numéricas.

<div class="hidden-summary">

## Introducción

</div>

### ¿Por qué es esencial tras el EDA?

El EDA nos permite descubrir **problemas o irregularidades** en el dataset: valores perdidos, outliers, tipos de datos incorrectos o variables irrelevantes.  
El preprocesamiento es la fase donde **se corrigen esos problemas** y se dejan los datos listos para el modelado.


| Etapa | Objetivo principal | Tipo de tareas |
|--------|--------------------|----------------|
| **EDA** | Comprender los datos y detectar patrones o errores. | Análisis descriptivo, visualización, detección de nulos y outliers. |
| **Preprocesamiento** | Corregir, transformar y preparar los datos para el modelo. | Limpieza, imputación, codificación, escalado, selección de variables. |

💬 **Ejemplo:**
En el Titanic, durante el EDA descubrimos que hay valores nulos en `Age` y `Cabin`, y que `Fare` tiene outliers.  
En el preprocesamiento, decidiremos **cómo rellenar esos nulos**, **si eliminar o ajustar los outliers**, y **cómo convertir las variables categóricas** (como `Sex` o `Embarked`) a formato numérico.

---

### Objetivos del preprocesamiento

El objetivo final es dejar el dataset:

* **Limpio:** sin errores, duplicados ni valores faltantes.  
* **Coherente:** con tipos de datos correctos y valores representativos.  
* **Preparado:** con todas las variables transformadas en un formato numérico adecuado para los modelos de Machine Learning.

En otras palabras, buscamos que los datos sean **de calidad y comparables entre sí**, para que el modelo aprenda de forma fiable.

---

### Herramientas que usaremos

En Python, las principales herramientas para el preprocesamiento son:

* **`pandas`** → para limpiar, transformar y manipular los datos.  
* **`scikit-learn (sklearn.preprocessing)`** → para aplicar transformaciones automáticas como imputación, codificación y escalado.  

Estas librerías se complementan y permiten llevar a cabo todo el flujo de preparación de datos antes de entrenar el modelo.

---

## Paso 1. Operaciones antes de la división

Antes de separar el dataset en conjuntos de entrenamiento (*train*) y prueba (*test*), debemos realizar una **limpieza estructural básica**.  
Este paso no modifica el contenido estadístico de los datos, sino que se asegura de que el dataset sea **coherente, entendible y correctamente tipado**.

Estas operaciones se hacen **antes de dividir** porque afectan por igual a todos los registros y no implican ningún tipo de aprendizaje sobre los valores de los datos (no calculan medias, ni modas, ni escalados).

---

### Paso 1.1 Limpieza estructural

El objetivo de la limpieza estructural es **asegurar que el dataset esté bien formado**:
* Quitar columnas que no aportan información al modelo.
* Comprobar que los tipos de datos son correctos.
* Corregir formatos o errores de escritura en las variables.

A continuación veremos cada una de estas operaciones aplicadas al dataset **Titanic**.

#### Eliminación de columnas irrelevantes

Algunos campos no aportan información útil para el modelo o pueden incluso introducir ruido.  
Ejemplos típicos son identificadores únicos (`PassengerId`) o campos con texto libre (`Name`, `Ticket`, `Cabin`).

Estas columnas **no ayudan a predecir la supervivencia**, por lo que es recomendable eliminarlas antes del modelado.

```python
# Seleccionamos las columnas relevantes (features) y la variable objetivo (target)
features = ['Pclass', 'Sex', 'Age', 'Fare', 'SibSp', 'Parch', 'Embarked']
target = 'Survived'

X = df[features].copy()  # Hacemos una copia para modificar más adelante (rellenar nulos, codificar, etc.)
y = df[target]
```

💡 **Explicación teórica:**

* Los **identificadores** (como `PassengerId`) son únicos por fila, por lo que no aportan patrones comunes al modelo.
* Las columnas **de texto libre** (como `Name` o `Ticket`) contienen información no estructurada difícil de procesar sin técnicas de *Feature Engineering* avanzadas (como procesamiento de texto), que no vamos a abordar.
* **Cabin** tiene la mayoría de sus valores nulos, por lo que se elimina también.

💬 **Conclusión:**

> Al eliminar variables irrelevantes, reducimos el ruido y simplificamos el modelo sin perder información útil.

---

#### Corrección de tipos de datos

Los tipos de datos son fundamentales.
Pandas puede leer columnas con el tipo incorrecto (por ejemplo, números como texto o fechas como `object`), lo que puede generar errores en el análisis y el modelado.

Podemos revisar los tipos con:

```python
df.info()
```

Si detectamos alguna columna con tipo erróneo, podemos convertirla usando `astype()`.

Ejemplo: supongamos que una columna numérica ha sido leída como texto (`object`):

```python
# Convertir una columna a tipo numérico
df["Fare"] = df["Fare"].astype(float)
```

💡 **Explicación teórica:**

* Los modelos de Machine Learning requieren que **las variables numéricas sean realmente numéricas**, no cadenas de texto.
* Asegurar los tipos correctos evita errores posteriores en imputación, escalado o codificación.

💬 **Conclusión:**

> Revisar y corregir los tipos de datos garantiza que todas las columnas se comporten como se espera en las transformaciones posteriores.

---

#### Normalización de formatos y categorías

En las variables categóricas o de texto, a veces encontramos **errores de formato**:

* Espacios en blanco (`" S "` en lugar de `"S"`).
* Mayúsculas/minúsculas mezcladas (`"Male"` vs `"male"`).
* Valores mal escritos (`"Southampton"` vs `"southampton"`).

Estos errores de formato los veriamos al ejecutar `unique()` sobre una variable categórica o al generar gráficos sobre ellas. A continuación se muestra un ejemplo donde metemos una dato erróneo en Titanic para estudiar cómo solucionarlo:

```python
# Crear una nueva fila con "Male" como sexo para que podamos ver el error
nueva_fila = {
    "PassengerId": 9999,
    "Survived": 0,
    "Pclass": 3,
    "Name": "Smith, Mr. John",
    "Sex": "Male",
    "Age": 32,
    "SibSp": 0,
    "Parch": 0,
    "Ticket": "A/5 9999",
    "Fare": 7.25,
    "Cabin": "",
    "Embarked": "S"
}

# Añadir la fila al DataFrame
df = pd.concat([df, pd.DataFrame([nueva_fila])], ignore_index=True)

# Mostrar los valores únicos de la columna 'Sex'
print(df["Sex"].unique())
```

La salida obtenida en este caso sería:

```python
array(['male', 'female', 'Male'], dtype=object)
```

Estos detalles pueden hacer que el modelo interprete **dos valores iguales como distintos**, lo que distorsiona la codificación posterior.

Ese problema anterior se solucionaría pasando a minúsculas todos los valores:

```python
# Normalizar los valores de la columna 'Sex'
# Pasamos a minúsculas y, de paso, eliminamos posibles espacios
df["Sex"] = df["Sex"].str.lower().str.strip()

# Verificar que se ha corregido
print(df["Sex"].unique())
```

Salida esperada:

```python
array(['male', 'female'], dtype=object)
```

Si aparecieran errores tipográficos, se pueden reemplazar manualmente:

```python
# Ejemplo: sustituir valores incorrectos (si los hubiera)
df["Embarked"].replace({"SOUTHAMPTON": "S", "CHERBOURG": "C", "QUEENSTOWN": "Q"}, inplace=True)
```

💡 **Explicación teórica:**

* La **homogeneización de categorías** es clave para que el modelo reconozca correctamente las clases.
* Si dos valores equivalentes se escriben distinto, el modelo los tratará como categorías diferentes.

💬 **Conclusión:**

> Antes de codificar las variables categóricas, debemos garantizar que todas las categorías estén escritas de forma uniforme.

---

### Paso 1.2 Duplicados

En muchos datasets reales, especialmente cuando los datos provienen de distintas fuentes o se han unido varios ficheros, es frecuente encontrar **filas duplicadas**.  
Estas duplicidades pueden provocar que el modelo **aprenda varias veces la misma información**, generando sesgos o influyendo en las estadísticas de forma incorrecta.

Por eso, un paso básico de la limpieza estructural consiste en **detectar y eliminar los registros duplicados** antes de seguir con el preprocesamiento.

En el Análisis Exploratorio de Datos ya estudiamos cómo consultar los duplicados:

```python
# Comprobar si hay filas duplicadas en el dataset
df.duplicated().sum()
````

Salida esperada (en el Titanic original):

```python
0
```

💡 **Explicación teórica:**

* Si el resultado es `0`, significa que **no hay filas duplicadas exactas**.
* Si devuelve un número mayor que `0`, indica cuántos registros están repetidos completamente.

Podemos ver cuáles son esas filas duplicadas con:

```python
# Mostrar las filas duplicadas (si las hubiera)
df[df.duplicated()]
```

Si detectamos registros repetidos, se eliminan fácilmente con `drop_duplicates()`:

```python
# Eliminar filas duplicadas
df = df.drop_duplicates()
```

💡 **Explicación teórica:**

* Por defecto, `drop_duplicates()` elimina las filas repetidas **manteniendo la primera aparición**.
* Este método elimina duplicados considerando **todas las columnas**.


### Paso 1.3 Outliers y errores evidentes

Los **outliers** (valores atípicos) son datos que se alejan mucho del resto de observaciones. A veces son simplemente **casos reales extremos** (por ejemplo, una tarifa muy alta en primera clase), pero otras veces se deben a **errores de registro o introducción de datos** (por ejemplo, una edad de 250 años).

En esta fase inicial del preprocesamiento, **no buscamos eliminar todos los valores extremos**, sino **detectar y corregir solo los claramente imposibles o erróneos**.

Una forma sencilla de detectar outliers es mediante un **boxplot (diagrama de caja)**. Por ejemplo, si introducimos un registro nuevo con una edad de 250 años, podríamos ver lo siguiente: 

![Gráfico EDA](./0-img/boxplot-valor-erroneo.png)

No todos los outliers deben eliminarse. Algunos son **casos reales válidos**, y eliminarlos podría distorsionar el modelo.
Por eso, antes de borrar nada, conviene preguntarse:

> ¿Este valor es posible en el contexto del dataset?

Veamos ejemplos:

```python
# Revisar valores máximos en columnas numéricas
df[["Age", "Fare"]].max()
```

Posible salida:

```
Age     80.0
Fare    512.3292
dtype: float64
```

💡 **Interpretación:**

* Una edad de 80 años es realista (no hay problema).
* Una tarifa de más de 500 también puede ser válida para pasajeros de primera clase.
* Pero si encontráramos una edad de **250 años** o un valor negativo en la tarifa (`Fare = -10`), serían claramente errores de registro.

Podemos usar condiciones simples para **detectar valores imposibles** y corregirlos o eliminarlos.

```python
# Ejemplo: eliminar edades imposibles
df = df[df["Age"] <= 100]

# Ejemplo: corregir tarifas negativas (si existieran)
# Esto aprende de datos, se debería hacer después de dividir en train y test
df.loc[df["Fare"] < 0, "Fare"] = df["Fare"].median()
```

💡 **Explicación teórica:**

* Usamos **filtros lógicos** (`df["Age"] <= 100`) para quedarnos solo con valores válidos.
* Si un valor erróneo es aislado y no queremos eliminar la fila completa, podemos **reemplazarlo** por un valor representativo (por ejemplo, la mediana).

:::warning CUIDADO CON EL TRATAMIENTO DE LOS OUTLIERS
Si lo que queremos es **corregir datos**, como el caso de la tarifa que se explicaba antes, habría que hacerlo **después de dividir en train y test**.
:::

---

## Paso 2. División en *train/test*

Una vez que el dataset está limpio a nivel **estructural** (sin duplicados, sin columnas irrelevantes, sin tipos incorrectos y sin errores evidentes), estamos listos para el paso más importante del flujo de Machine Learning: la **división en conjuntos de entrenamiento y prueba**.

Este paso es fundamental para construir modelos fiables y evaluar su rendimiento de forma justa.

:::info ¿Por qué dividir antes de “aprender” parámetros?

Cada vez que aplicamos una técnica de preprocesamiento que **aprende algo de los datos**, como calcular la **mediana** para imputar nulos, determinar las **categorías** para One-Hot Encoding, calcular la **media y desviación** para escalar, estamos extrayendo **información estadística** del dataset.

Si hacemos esta extracción **antes** de dividir, estaríamos utilizando **información del futuro** (del conjunto de test) para preparar nuestros datos. Esto se llama **data leakage** (*filtración de datos*), y provoca:

* modelos que parecen más precisos de lo que realmente son,  
* una evaluación injusta,  
* generalización mucho peor en datos nuevos.

💡 **Regla de oro del preprocesamiento:**

> Todo lo que **aprende parámetros** debe ajustarse **solo con los datos de entrenamiento**, y luego aplicarse a los datos de prueba sin volver a aprender nada.
:::

---

### Paso 2.1. Separar las features y target

Antes de dividir, debemos indicar:
* qué columnas vamos a usar para predecir → **X** (features) 
* qué columna queremos predecir → **y** (target)

Ejemplo con Titanic:

```python
# Seleccionamos las columnas relevantes (features) y la variable objetivo (target)
# En EDA ya dejamos claro que Name, Cabin, etc. no eran útiles
features = ['Pclass', 'Sex', 'Age', 'Fare', 'SibSp', 'Parch', 'Embarked']
target = 'Survived'

X = df[features].copy()
y = df[target]
```

💡 **Explicación teórica:**

* `X` contiene todas las variables que el modelo utilizará como entrada.
* `y` contiene únicamente la variable que queremos predecir.
* Usamos `.copy()` para evitar modificar el DataFrame original cuando realicemos transformaciones posteriores.

Supongamos que nuestro Dataframe (variable `df`) contiene:

```
   Survived  Pclass     Sex   Age   Fare  SibSp  Parch Embarked
0         0       3    male  22.0   7.25      1      0        S
1         1       1  female  38.0  71.28      1      0        C
2         1       3  female  26.0   7.92      0      0        S
```

Después de aplicar el código anterior, la variable `X` sería un Dataframe con el contenido:

``` 
   Pclass     Sex   Age   Fare  SibSp  Parch Embarked
0       3    male  22.0   7.25      1      0        S
1       1  female  38.0  71.28      1      0        C
2       3  female  26.0   7.92      0      0        S
```

Y la variable `y` sería una Serie con la variable objetivo correspondiente a cada fila de X.

```
0    0
1    1
2    1
Name: Survived, dtype: int64
```

---

### Paso 2.2. División del dataset

La función `train_test_split` de scikit-learn permite dividir el dataset de forma aleatoria en:

* **train** → usado para entrenar (ajustar) el modelo.
* **test** → usado para evaluar el rendimiento final del modelo.

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,       # el 20% para test, 80% para train
    random_state=42,     # fija la aleatoriedad para reproducir resultados
    stratify=y           # mantiene la proporción de clases en train y test
)
```

💡 **Explicación de los parámetros:**

* **`test_size=0.2`**
  Usamos un 20% para test. Es estándar para muchos problemas y datasets medianos.

* **`random_state=42`**
  Asegura que todos obtengamos exactamente la misma división.
  Si no lo pones, cada ejecución divide el dataset de forma distinta.

* **`stratify=y`**
  Muy importante cuando el target tiene clases desbalanceadas (por ejemplo, supervivencia en Titanic).
  Genera train y test con la **misma proporción de clases** que el dataset original.
  Ejemplo: si el Titanic tiene un 38% de supervivientes y un 62% de fallecidos, ambos conjuntos mantendrán esa proporción.


## Paso 3. Operaciones después de la división

Una vez que ya tenemos nuestros conjuntos **X_train, X_test, y_train y y_test**, comienza la fase más importante del preprocesamiento:   todas las transformaciones que **aprenden parámetros** deben realizarse **ajustándose únicamente al train**, y luego aplicarse al test.

El objetivo principal en esta fase es:

> **Aprender parámetros con train → aplicar esos mismos parámetros a test.**

Esto evita el **data leakage** y garantiza que el modelo se evalúa de forma justa.


:::tip Nota clave: lo que ocurre a partir de aquí

Una vez dividido el dataset, **todas las transformaciones que aprendan información del conjunto** (imputación, codificación, escalado…) deben seguir esta estructura:

```python
# EJEMPLO DE FLUJO CORRECTO (imputación como ejemplo)
imputer = SimpleImputer(strategy="median")

X_train["Age"] = imputer.fit_transform(X_train[["Age"]])  # aprende la mediana solo con train
X_test["Age"]  = imputer.transform(X_test[["Age"]])        # aplica lo aprendido al test
```

💡 **Por qué es tan importante:**

* `fit` (entrenar) → solo en **train**
* `transform` (aplicar) → en **train** y **test**

⚠️ Nunca debe llamarse `fit` con los datos de **test**.

**Ejemplo visual para entenderlo**

Imagina que tenemos esta columna de edades antes de dividir:

```
[20, 30, 40, 80]
```

Después del *train/test split*, queda así:

Train (lo que el modelo puede ver al aprender):

```
[20, 30, 40]
```

Test (datos nuevos que simulan el futuro):

```
[80]
```

Si hacemos:

```python
imputer.fit(X_train[["Age"]])
```

El imputador **aprende la mediana de train**, que es:

```
mediana(train) = 30
```

Y después aplicamos:

```python
imputer.transform(X_test[["Age"]])
```

→ El imputador usa **solo la mediana aprendida (30)**, sin mirar el valor 80 del futuro.


**¿Qué pasaría si hiciéramos `fit` también con test?**

Estaríamos calculando la mediana así:

```
mediana([20, 30, 40, 80]) = 35
```

Es decir, el imputador está usando información del test para aprender. Esto es **data leakage** (filtración de datos). El modelo estaría “viendo el futuro” y la evaluación ya no sería realista.

:::

---

### Paso 3.1 Tratamiento de valores nulos (post-split)

Ya vimos en EDA que podíamos ver los nulos con la instrucción:

```python
X_train.isnull().sum()
```

Las estrategias de tratamiento más comunes son:

* **Eliminar filas o columnas** con demasiados nulos (poco habitual aquí, porque ya hicimos la limpieza estructural antes del split).
* **Imputar valores faltantes** usando:
  * Media
  * Mediana (más robusta)
  * Moda (para categóricas)

---

#### Imputación para variables numéricas

En Titanic, la columna `Age` tiene valores nulos, así que usaremos `SimpleImputer` con la **mediana**, que suele funcionar mejor que la media en datos sesgados.

```python
from sklearn.impute import SimpleImputer

# Imputador para columnas numéricas con estrategia de mediana
imputer_num = SimpleImputer(strategy="median")

# Ajustamos (fit) SOLO con train
X_train["Age"] = imputer_num.fit_transform(X_train[["Age"]])

# Transformamos test con lo aprendido
X_test["Age"] = imputer_num.transform(X_test[["Age"]])
```

💡 **Explicación:**

* `fit_transform()` aprende la mediana de Age en train → la aplica al propio train.
* `transform()` aplica esa misma mediana al test, sin recalcular nada.

:::info ¿Media o mediana? Decisión según la distribución

Para decidir si debemos imputar con **media** o **mediana**, es importante observar **la forma de la distribución**. En el caso de la edad en el Titanic, vemos que **no tiene forma de campana simétrica** (no es una distribución normal).  
Hay muchos valores concentrados entre 15 y 35 años, y luego la cola se alarga hacia la derecha.

Esto significa que la variable está **sesgada** (asimétrica), y por tanto **la media estaría demasiado influida por los valores altos**. En cambio, la **mediana** es más robusta y representa mejor el valor central real.

Por eso, en este caso, **la estrategia recomendada es usar la mediana** para imputar los valores nulos de `Age`.

![Gráfico EDA](./0-img/histograma-edad.png)

:::

---

#### Imputación para variables categóricas

Ejemplo con `Embarked`:

```python
# Imputador para columnas categóricas, quedándose con la categoría más frecuente
imputer_cat = SimpleImputer(strategy="most_frequent")

X_train["Embarked"] = imputer_cat.fit_transform(X_train[["Embarked"]])
X_test["Embarked"]  = imputer_cat.transform(X_test[["Embarked"]])
```

Esto rellena los valores nulos con la **categoría más frecuente** de los pasajeros en *train*.

---

### Paso 3.2 Codificación de variables categóricas

Los modelos de Machine Learning **no pueden trabajar directamente con texto**, por lo que todas las variables categóricas deben convertirse a valores numéricos. 

Para ello existen dos técnicas principales: **Label Encoding** y **One-Hot Encoding**. Cada una se usa en situaciones distintas y genera tipos de columnas diferentes.

---

#### 🔢 Label Encoding (para variables *ordinales*)

El **Label Encoding** convierte cada categoría en un número entero. Es útil **solo cuando las categorías tienen un orden lógico**, es decir, una jerarquía natural. Por ejemplo:

* Talla de ropa: `S < M < L < XL`
* Nivel de educación: `Primaria < Secundaria < Universidad`
* Clase en Titanic: `1st < 2nd < 3rd`


**No se debe usar cuando las categorías no tienen orden**, porque el modelo entendería erróneamente que un valor “vale más” que otro.

**Ejemplo pequeño**

```python
from sklearn.preprocessing import LabelEncoder

enc = LabelEncoder()

sizes = ["S", "M", "L", "S", "XL", "M"]
encoded = enc.fit_transform(sizes)

print(encoded)
```

Posible salida:

```
[0 1 2 0 3 1]
```

### 📌 ¿Qué columnas genera?

Genera **una sola columna numérica**, en la que cada categoría es reemplazada por un número entero.

Por ejemplo:

| Talla | Encoded |
| ----- | ------- |
| S     | 0       |
| M     | 1       |
| L     | 2       |
| XL    | 3       |

---

## 🎛️ One-Hot Encoding (para variables *nominales*)

El **One-Hot Encoding** transforma cada categoría en una columna nueva, con valores 0/1 (presencia o ausencia).
Es la opción correcta cuando **las categorías NO tienen orden**.

### ✔️ Cuándo usarlo

Cuando las categorías son simplemente nombres y **no existe jerarquía**:

* Sexo: `male`, `female`
* Puerto de embarque: `S`, `C`, `Q`
* Tipo de producto: `A`, `B`, `C`

### ❌ Cuándo NO usarlo

Cuando la variable tiene demasiadas categorías (cientos o miles), porque genera muchas columnas.

### 🔍 Ejemplo pequeño

```python
import pandas as pd

df = pd.DataFrame({"Embarked": ["S", "C", "Q", "S"]})
encoded = pd.get_dummies(df, columns=["Embarked"])

encoded
```

Salida:

```
   Embarked_C  Embarked_Q  Embarked_S
0           0           0           1
1           1           0           0
2           0           1           0
3           0           0           1
```

### 📌 ¿Qué columnas genera?

El One-Hot crea **una columna por categoría**, con 1 si la fila pertenece a esa categoría y 0 si no.

Por ejemplo, a partir de:

```
Embarked
S
C
Q
S
```

Se obtiene:

| Embarked_C | Embarked_Q | Embarked_S |
| ---------- | ---------- | ---------- |
| 0          | 0          | 1          |
| 1          | 0          | 0          |
| 0          | 1          | 0          |
| 0          | 0          | 1          |

---

## 🧠 ¿Cómo elegir entre Label y One-Hot?

| Tipo de variable          | Ejemplo             | Codificación recomendada           |
| ------------------------- | ------------------- | ---------------------------------- |
| **Ordinal** (tiene orden) | Clase del Titanic   | Label Encoding                     |
| **Nominal** (sin orden)   | Sexo, puerto        | One-Hot Encoding                   |
| **Muchísimas categorías** | Códigos únicos, IDs | Ninguna (mejor eliminar o agrupar) |

---

## 🧩 Ejemplo real con Titanic

**Sex** → no tiene orden → `One-Hot Encoding`
**Embarked** → tampoco → `One-Hot Encoding`
**Pclass** → sí tiene orden (1 < 2 < 3) → `Label Encoding` opcional, aunque muchos modelos la aceptan directamente como número

---

💬 **Conclusión:**

> Usa **Label Encoding** solo cuando las categorías tienen un orden real.
> Usa **One-Hot Encoding** cuando las categorías no tienen jerarquía, como `Sex` o `Embarked` en Titanic.
> Ambos métodos permiten que los modelos trabajen correctamente con variables categóricas.



</div>







# 🧩 ÍNDICE REVISADO — *Preprocesamiento de Datos en Machine Learning (Nivel Intermedio)*

## Introducción

* Qué es el preprocesamiento y por qué es esencial tras el EDA.
* Diferencia entre EDA y preprocesamiento.
* Objetivo: dejar los datos limpios, coherentes y listos para entrenar el modelo.
* Herramientas principales: `pandas` y `sklearn.preprocessing`.

---

## Índice del tema — Preprocesamiento (reestructurado por fases)

### Paso 1. Operaciones **antes** de la división (*pre-split*)
* Objetivo: dejar el dataset **coherente y limpio** a nivel estructural.
* 1.1 Limpieza estructural
  - Eliminar columnas irrelevantes (IDs, texto libre sin uso).
  - Corrección de **tipos de datos** (`object` → `int`, `float`, `datetime`).
  - Normalización básica de formatos (espacios, mayúsculas/minúsculas, categorías mal escritas).
* 1.2 Duplicados
  - Detección: `df.duplicated()`
  - Eliminación: `drop_duplicates()`
* 1.3 Outliers y errores **evidentes**
  - Detección visual (boxplot) y sentido común.
  - Acción: corregir o eliminar solo los **imposibles** (no tratamiento estadístico aún).

---

### Paso 2. **División** en *train/test*
* Por qué dividir antes de “aprender” parámetros (evitar **data leakage**).
* Separar `X` (features) y `y` (target).
* `train_test_split` (proporción, `random_state`, `stratify` cuando aplique).
* Nota: A partir de aquí, todo lo que **aprende** algo de los datos se **ajusta en train** y se **aplica a test**.

---

### Paso 3. Operaciones **después** de la división (*post-split*)
* Objetivo: **aprender** parámetros con *train* y **transformar** *test* con los mismos.

* 3.1 Valores nulos
  - Detección: `isnull().sum()`, `info()`.
  - Estrategias:
    - Eliminación de filas/columnas con demasiados nulos (si procede).
    - **Imputación** (media, mediana, moda) con `SimpleImputer`.
    - Imputación condicional (por grupos) cuando tenga sentido.
  - Ejemplo con Titanic y `SimpleImputer`.

* 3.2 Codificación de variables categóricas
  - Cuándo usar **Label Encoding** (ordinales).
  - Cuándo usar **One-Hot Encoding** (nominales).
  - Implementación con `OneHotEncoder` o `pandas.get_dummies()` (manteniendo la lógica *fit* en train y *transform* en test).

* 3.3 Escalado y normalización de variables numéricas
  - **StandardScaler** (media 0, desviación 1).
  - **MinMaxScaler** (0 a 1).
  - Aplicación correcta: `.fit()` en *train*, `.transform()` en *test*.

* 3.4 (Opcional y simple) Feature Engineering básico
  - Creación de variables intuitivas (e.g., `FamilySize`).
  - Eliminación de variables redundantes tras crear nuevas.

---

### Paso 4. Preparación final del dataset
* Revisión rápida de coherencia tras transformaciones.
* Conjunto listo para el modelado.
* Exportación: `to_csv` (dataset limpio y, si aplica, versiones transformadas).

---

### Ejemplo completo: *Preprocesamiento Titanic*
* Aplicación paso a paso con código y breves conclusiones por bloque.

---

### Actividad de seguimiento: *Preprocesamiento Employee Attrition*
* Dataset: `employee.csv`
* Tareas:
  - **Antes del split:** limpieza estructural, duplicados, outliers imposibles.
  - **Split train/test.**
  - **Después del split:** imputación con `SimpleImputer`, codificación, escalado, FE básico.
  - Exportación del dataset limpio.
* Entregable: cuaderno de Google Colab.

---

> 💡 **Regla de oro:** Todo lo que **aprende parámetros** de los datos (medias, modas, categorías, escalas…) **se ajusta con *train*** y **se aplica a *test*** sin volver a aprender.
