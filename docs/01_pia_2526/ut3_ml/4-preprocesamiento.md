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
* Comprobar que los tipos de datos son correctos.
* Corregir formatos o errores de escritura en las variables.

A continuación veremos cada una de estas operaciones aplicadas al dataset **Titanic**.

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

:::danger Nota importante sobre el orden EDA → Preprocesamiento

Los pasos **1.1 (Corrección de tipos y normalización de categorías)** y **1.2 (Eliminación de columnas irrelevantes o duplicadas)** pueden realizarse **durante el EDA**, antes de generar gráficos univariantes y bivariantes.
Esto permite obtener **gráficos limpios y coherentes**, evitando categorías duplicadas (“male”, “Male”, “ male ”), tipos incorrectos o columnas que no aportan valor visual.

Sin embargo, **todos los pasos restantes del preprocesamiento** (tratamiento de valores imposibles, imputación, codificación, escalado, feature engineering…) **deben realizarse únicamente después de completar el EDA**, cuando ya se ha comprendido la estructura y los problemas del dataset.

:::

---

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

Podemos usar condiciones simples para **detectar valores imposibles** y corregirlos o eliminarlos. En nuestro caso, vamos a sustituirlos por valores vacíos, que más tarde se imputarán.

```python
# Ejemplo: eliminar edades imposibles
df.loc[(df["Age"] < 0) | (df["Age"] > 120), "Age"] = np.nan

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

X_train["Embarked"] = imputer_cat.fit_transform(X_train[["Embarked"]]).ravel()
X_test["Embarked"]  = imputer_cat.transform(X_test[["Embarked"]]).ravel()
```

Esto rellena los valores nulos con la **categoría más frecuente** de los pasajeros en *train*.

---

### Paso 3.2 Codificación de variables categóricas

Los modelos de Machine Learning **no pueden trabajar directamente con texto**, por lo que todas las variables categóricas deben convertirse a valores numéricos. 

Para ello existen dos técnicas principales: **Label Encoding** y **One-Hot Encoding**. Cada una se usa en situaciones distintas y genera tipos de columnas diferentes.

---

#### ¿Cómo elegir entre Label y One-Hot?

| Tipo de variable          | Ejemplo             | Codificación recomendada           |
| ------------------------- | ------------------- | ---------------------------------- |
| **Ordinal** (tiene orden) | Clase del Titanic   | Label Encoding                     |
| **Nominal** (sin orden)   | Sexo, puerto        | One-Hot Encoding                   |
| **Muchísimas categorías** | Códigos únicos, IDs | Ninguna (mejor eliminar o agrupar) |

---

#### Label Encoding (para variables *ordinales*)

Vamos a suponer que en el Titanic la columna **Pclass** no viniera como números `1, 2, 3`, sino como texto:

```text
"1st", "2nd", "3rd"
```

Es una variable **categórica ordinal** (hay un orden claro: 1st < 2nd < 3rd), así que aquí **sí tiene sentido** usar **Label Encoding**.

La idea es la misma que con los nulos:

👉 **Ajustamos (fit) solo con `X_train`** y después **aplicamos (transform) a `X_train` y `X_test`**.

```python
from sklearn.preprocessing import LabelEncoder

encoder_pclass = LabelEncoder()

# Ajustamos el encoder SOLO con los datos de train
encoder_pclass.fit(X_train["Pclass"])

# Transformamos train y test con el mismo mapeo aprendido
X_train["Pclass_encoded"] = encoder_pclass.transform(X_train["Pclass"])
X_test["Pclass_encoded"]  = encoder_pclass.transform(X_test["Pclass"])
```

Si las clases fueran, por ejemplo:

```text
["1st", "2nd", "3rd"]
```

el encoder podría aprender algo como:

```text
"1st" -> 0
"2nd" -> 1
"3rd" -> 2
```

Y las nuevas columnas quedarían así:

| Pclass | Pclass_encoded |
| ------ | -------------- |
| 1st    | 0              |
| 3rd    | 2              |
| 2nd    | 1              |

💡 **Importante:**

* `fit` aprende qué categorías existen y en qué orden las codifica → **solo en X_train**.
* `transform` aplica ese mismo mapeo a **X_train y X_test**.
* Genera **una única columna numérica**, que conserva el orden natural de la variable (`1st < 2nd < 3rd`).

---

#### One-Hot Encoding (para variables *nominales*)

En el Titanic, columnas como **Sex** o **Embarked** contienen categorías que **no tienen un orden**:

```text
Sex:       "male", "female"
Embarked:  "S", "C", "Q"
```

Cuando las categorías **no tienen jerarquía**, no podemos asignarles números como 0, 1, 2 porque el modelo podría interpretar erróneamente que uno “vale más” que otro.

👉 En estos casos, la técnica correcta es **One-Hot Encoding**.

Esta técnica crea **una columna por cada categoría**, con valores 0/1 indicando si esa fila pertenece a esa categoría.

La idea es la misma que antes:

* Ajustamos (fit) el codificador solo con `X_train`
* Transformamos tanto `X_train` como `X_test` con lo aprendido

**Ejemplo con la columna `Embarked` del Titanic**

Vamos a transformar esta variable nominal en columnas numéricas:

```python
from sklearn.preprocessing import OneHotEncoder

# Empezamos por Embarked
encoder_embarked = OneHotEncoder(handle_unknown="ignore", sparse_output=False)

# Ajustamos SOLO con los datos de train
encoder_embarked.fit(X_train[["Embarked"]])

# Transformamos train y test usando lo aprendido
# embarked_train y embarked_test son arrays numpy, hay que procesarlos más tarde para obtener un DataFrame
embarked_train = encoder_embarked.transform(X_train[["Embarked"]])
embarked_test  = encoder_embarked.transform(X_test[["Embarked"]])

# Convertimos las matrices a DataFrames para verlas mejor y añadirlas posteriormente a nuestro DataFrame completo
embarked_train = pd.DataFrame(embarked_train, 
                              columns=encoder_embarked.get_feature_names_out(["Embarked"]),
                              index=X_train.index)
embarked_test  = pd.DataFrame(embarked_test,
                              columns=encoder_embarked.get_feature_names_out(["Embarked"]),
                              index=X_test.index)
```

Vamos a entender cómo funciona el código anterior. Supongamos que tenemos este DataFrame:


| Embarked |
| -------- |
| S        |
| C        |
| Q        |
| S        |
| C        |


Si aplicamos **One-Hot Encoding**, obtendremos tres nuevas columnas (una por cada categoría):

```
Embarked_C   Embarked_Q   Embarked_S
```

La transformación completa quedaría así:

| Embarked | Embarked_C | Embarked_Q | Embarked_S |
| -------- | ---------- | ---------- | ---------- |
| S        | 0          | 0          | 1          |
| C        | 1          | 0          | 0          |
| Q        | 0          | 1          | 0          |
| S        | 0          | 0          | 1          |
| C        | 1          | 0          | 0          |


💡 **Interpretación rápida:**

* Cada categoría se convierte en una columna.
* El valor 1 indica la categoría correspondiente de esa fila.
* Solo una columna vale 1 porque cada pasajero solo puede embarcar por un puerto.

---

Tras aplicar One-Hot Encoding, en el último paso:

1. Se **eliminan las columnas originales** (`Embarked`, `Sex`, etc.)
2. Se **añaden las columnas generadas** al DataFrame

Ejemplo:

```python
# Eliminamos columnas categóricas originales, sustituyéndolas por las nuevas generadas
X_train = pd.concat([X_train.drop(columns=["Embarked"]), embarked_train], axis=1)
X_test  = pd.concat([X_test.drop(columns=["Embarked"]), embarked_test], axis=1)
```

---

### Paso 3.3. Feature Engineering básico

El **Feature Engineering** consiste en crear nuevas variables (features) que puedan aportar información adicional al modelo.  
En esta fase del curso solo veremos **transformaciones sencillas y muy intuitivas**, sin técnicas avanzadas.

El objetivo es mejorar la capacidad predictiva del modelo utilizando información que ya existe en el dataset, pero combinada de forma más útil.

#### Creación de variables intuitivas

A veces, combinar varias columnas puede generar una nueva variable con más significado que las originales por separado.

En el Titanic, las columnas:

* `SibSp` → número de hermanos/esposos a bordo  
* `Parch` → número de padres/hijos a bordo  

por separado aportan información, pero **juntas pueden representar mejor el tamaño del grupo familiar**.

Creamos una nueva columna:

```python
# Crear tamaño familiar
X_train["FamilySize"] = X_train["SibSp"] + X_train["Parch"] + 1
X_test["FamilySize"]  = X_test["SibSp"] + X_test["Parch"] + 1
```

¿Por qué sumamos 1?

👉 Para incluir al propio pasajero en el tamaño total de la familia.

Ejemplo:

| SibSp | Parch | FamilySize |
| ----- | ----- | ---------- |
| 1     | 0     | 2          |
| 0     | 0     | 1          |
| 3     | 1     | 5          |

💡 **Interpretación:**
Los grupos más grandes tenían, en general, menor probabilidad de sobrevivir, por lo que esta variable puede ayudar al modelo.

---

#### Eliminación de variables redundantes

Una vez que hemos creado una nueva variable derivada de otras dos, es posible que las variables originales **ya no sean necesarias** o aporten información duplicada.

En este nivel básico, la regla que seguiremos será:

👉 **Si la nueva variable resume bien la información, podemos eliminar las columnas que la generaron.**

Por ejemplo, tras crear `FamilySize`, podríamos eliminar `SibSp` y `Parch` para evitar redundancia:

```python
X_train = X_train.drop(columns=["SibSp", "Parch"])
X_test  = X_test.drop(columns=["SibSp", "Parch"])
```

Esto hace el dataset más compacto y claro para el modelo.

---

### Paso 3.4. Escalado y normalización de variables numéricas

Tras imputar valores nulos y codificar las variables categóricas, el siguiente paso es **escalar o normalizar las variables numéricas**.  
Este proceso es fundamental en muchos modelos de Machine Learning, especialmente aquellos que son sensibles a la magnitud de los valores (por ejemplo, KNN, regresión logística, redes neuronales, SVM…).

En un dataset como el Titanic, algunas columnas numéricas tienen escalas muy distintas:

| Variable | Rango aproximado |
|----------|------------------|
| `Age`    | 0 – 80           |
| `Fare`   | 0 – 512          |
| `SibSp`  | 0 – 8            |

Si no escalamos estas variables:

* Los modelos podrían **dar más importancia** a las columnas con valores más grandes (`Fare`).
* La distancia entre puntos en modelos basados en distancia (como KNN o clustering) estaría **sesgada**.
* El entrenamiento podría tardar más y converger peor.

➡️ **Escalar no cambia la forma de los datos**, pero sí su rango, para que todas las variables “jueguen en igualdad de condiciones”.

:::info Nota avanzada (Paso previo sobre los outliers)

En algunas variables **muy sesgadas**, como `Fare` en el Titanic, los valores altos son mucho mayores que los valores típicos.  
Esto produce una distribución con **cola larga**, que puede afectar a ciertos modelos o a algunos métodos de escalado (por ejemplo, MinMaxScaler).

![Gráfico EDA](./0-img/boxplot-fare.png)

En análisis más avanzados existe la posibilidad de aplicar **transformaciones matemáticas** como:

* `log()` → reduce el impacto de los valores muy grandes  
* `sqrt()` → suaviza moderadamente la distribución  
* Transformaciones más complejas como **Box-Cox** o **Yeo-Johnson**

Estas transformaciones no eliminan outliers reales, sino que simplemente **reducen su influencia** para modelos muy sensibles a distribuciones sesgadas.

Sin embargo, estas técnicas pertenecen a un nivel más avanzado de *Feature Engineering*.  
En este curso inicial **no son necesarias** y no las aplicaremos, ya que los modelos que veremos funcionan correctamente sin esta complejidad adicional.
:::

---

#### Métodos más utilizados

Aquí veremos los dos escaladores que se usan en la mayoría de proyectos:

- **StandardScaler** → distribuye con media = 0 y desviación estándar = 1  
- **MinMaxScaler** → lleva todos los valores al rango [0, 1]

Ambos se utilizan **después** del *train/test split*, tras las imputaciones necesarias y antes de entrenar el modelo.

---

#### StandardScaler (escalado estándar)

El `StandardScaler` transforma cada variable numérica para que tenga:

* **Media = 0**
* **Desviación estándar = 1**

Matemáticamente:

```
valor_escalado = (valor - media) / desviación_estándar
```

**¿Cuándo usar StandardScaler?**

✔ **Para casi todos los modelos clásicos de Machine Learning.**

Porque:
* Centra los datos (media=0), lo cual ayuda al entrenamiento.
* No obliga a tener datos en un rango fijo.
* Funciona bien incluso si las variables no están “perfectamente distribuidas”.

**Ejemplo con Titanic**

```python
from sklearn.preprocessing import StandardScaler

# ¡IMPORTANTE! Seleccionamos solo las columnas numéricas que queremos escalar (por ahora seleccionaremos todas)
num_cols = ["Pclass", "Age", "Fare", "SibSp", "Parch"]

# Creamos el escalador
scaler = StandardScaler()

# Ajustamos el escalador SOLO con los datos de train (fit)
X_train[num_cols] = scaler.fit_transform(X_train[num_cols])

# Aplicamos la transformación a test (transform)
X_test[num_cols] = scaler.transform(X_test[num_cols])
```

Tras esto, cada columna quedará escalada, por ejemplo:


| Variable | Antes | Después |
| -------- | ----- | ------- |
| Age      | 22    | -0.73   |
| Age      | 38    | 1.22    |
| Fare     | 512   | 4.11    |
| Parch    | 0     | -0.45   |


💡 **Interpretación:**

* Valores negativos → menores que la media
* Valores positivos → mayores que la media

---

#### MinMaxScaler (normalización 0–1)

El `MinMaxScaler` transforma cada variable numérica para que todos sus valores queden dentro del rango:

* **Mínimo = 0**
* **Máximo = 1**

Matemáticamente:

```
valor_escalado = (valor - min) / (max - min)
```

Es decir, cada valor se reescala proporcionalmente según el valor mínimo y máximo de la columna.

---

**¿Cuándo usar MinMaxScaler?**

✔ **Cuando queremos que todos los valores queden entre 0 y 1.**  
✔ Útil en modelos que funcionan mejor con entradas normalizadas en un rango fijo, como:
* Redes neuronales
* Modelos que trabajan con activaciones entre 0 y 1   

❌ **No es ideal si hay valores extremos muy altos (outliers reales).** En esos casos, un único valor muy grande puede hacer que casi todos los demás queden muy cerca de 0 tras escalar.

**Ejemplo con Titanic**

Vamos a escalar las mismas columnas numéricas que antes:

```python
from sklearn.preprocessing import MinMaxScaler

# Seleccionamos las columnas numéricas que queremos escalar
num_cols = ["Pclass", "Age", "Fare", "SibSp", "Parch"]

# Creamos el escalador
scaler = MinMaxScaler()

# Ajustamos el escalador SOLO con los datos de train (fit)
X_train[num_cols] = scaler.fit_transform(X_train[num_cols])

# Aplicamos la transformación a test (transform)
X_test[num_cols] = scaler.transform(X_test[num_cols])
```

Tras esto, cada columna quedará normalizada al rango 0–1. Por ejemplo:

| Variable | Antes | Después |
| -------- | ----- | ------- |
| Age      | 22    | 0.28    |
| Age      | 38    | 0.54    |
| Fare     | 512   | 1.00    |
| Parch    | 0     | 0.00    |


💡 **Interpretación:**

* **0** representa el valor mínimo visto en *train*.
* **1** representa el valor máximo visto en *train*.
* El resto de valores quedan en posiciones proporcionales dentro del intervalo 0–1.

:::info Nota sobre MinMaxScaler
Aunque MinMaxScaler funciona bien en muchos casos, recuerda que si existe un valor extremadamente alto (como una tarifa de 500), el resto de valores quedarán muy cerca de 0.
Por eso, aunque es útil, suele utilizarse menos que StandardScaler en problemas clásicos.
:::

---

#### Resumen StandardScaler vs MinMaxScaler

| Característica          | StandardScaler               | MinMaxScaler                      |
| ----------------------- | ---------------------------- | --------------------------------- |
| Rango                   | No fijo (puede ser negativo) | Entre 0 y 1                       |
| Usa                     | Media y desviación           | Mínimo y máximo                   |
| Afectado por outliers   | Sí (mucho)                   | Sí (muchísimo)                    |
| Mejor para              | Modelos lineales, KNN, SVM   | Redes neuronales, datos entre 0-1 |

---

#### ¿Debo escalar todas las columnas numéricas?

✔ **Sí**, si usas modelos basados en distancias (KNN, SVM).  
✔ **Sí**, si usas regresión logística o redes neuronales.  
❌ **No es necesario** para árboles de decisión o Random Forest (no les afecta).

---

## Paso 4. Preparación final del dataset

Después de haber realizado todas las tareas de preprocesamiento —limpieza estructural, división en *train/test*, imputación, codificación, escalado y feature engineering— ya tenemos nuestros datos prácticamente listos para entrenar modelos de Machine Learning.

Antes de continuar, es recomendable hacer una **última revisión rápida** para comprobar que todo ha quedado correctamente transformado.

---

### Paso 4.1 Revisión rápida de coherencia

En este punto debemos asegurarnos de que:

✔ **No quedan valores nulos**

```python
X_train.isnull().sum()
X_test.isnull().sum()
```

Si alguna columna sigue teniendo nulos, puede deberse a:

* una codificación incompleta,
* un problema en la imputación,
* o columnas que no se incluyeron en el proceso.

✔ **Todas las columnas son numéricas**

Los modelos clásicos de Machine Learning **solo aceptan variables numéricas**. Debemos asegurarnos de que ya no quedan columnas categóricas sin transformar:

```python
X_train.dtypes
```

En este punto todo debería ser `int`, `float` o `uint8` (en caso de One-Hot Encoding).


✔ **Las columnas de train y test coinciden**

Esto es MUY importante. Si el número o nombre de columnas no coincide entre `X_train` y `X_test`, el modelo no podrá predecir correctamente.

```python
print(X_train.shape)
print(X_test.shape)

print(X_train.columns)
print(X_test.columns)
```

Si no coinciden, normalmente significa que:

* faltó eliminar alguna columna original antes de concatenar,
* hubo categorías presentes en train que no aparecieron en test,
* o se mezclaron escaladores o imputadores incorrectamente.

---

### Paso 4.2 Dataset final listo para el modelado

Cuando se cumple todo los descrito en el paso anterior, **nuestro dataset está preparado para entrenar un modelo.**

A partir de aquí, podemos comenzar con:

* Regresión logística
* Árboles
* Random Forest
* KNN
* SVM
* etc.

---

### Paso 4.3 Guardar los datasets transformados (opcional, pero recomendable)

Es muy habitual guardar las versiones preprocesadas de los datos, especialmente si queremos:

* reutilizarlos,
* compartirlos,
* hacer pruebas con diferentes modelos,
* o evitar repetir todo el proceso de preprocesamiento.

```python
X_train.to_csv("titanic_X_train_preprocessed.csv", index=False)
X_test.to_csv("titanic_X_test_preprocessed.csv", index=False)
y_train.to_csv("titanic_y_train.csv", index=False)
y_test.to_csv("titanic_y_test.csv", index=False)
```

---

## Ejercicio de Titanic

Realiza el preprocesamiento del dataset **Titanic**, pero esta vez con un fichero “ensuciado” a propósito para poder aplicar la mayoría de las técnicas vistas.

Puedes partir del cuaderno que ya tienes de EDA (cuidado, tendrás que volver a ejecutarlo con el nuevo dataset):

👉 [Cuaderno de EDA — Titanic](./0-datasets/EDA_Titanic.ipynb)

📂 Dataset para este ejercicio: [`titanic_sucio.csv`](./0-datasets/titanic_sucio.csv)

Como opción adicional, puedes entrenar un modelo sencillo (por ejemplo, **KNN**) con el dataset ya preprocesado para comprobar que todo el flujo funciona correctamente y que los resultados mejoran con respecto al preprocesamiento sencillo que hacíamos al inicio del tema.

</div>