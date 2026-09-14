---
title: "Tips generales"
sidebar_position: 1
description: "Colección de trucos y buenas prácticas para trabajar con modelos de clasificación y regresión: escalado, preparación de datos, representaciones gráficas, manejo de etiquetas, matrices de confusión y otros detalles útiles para evitar errores comunes."
keywords: [tips, machine learning, escalado, confusion matrix, clases, scikit-learn, clasificación, preprocesamiento]
---

En este apartado se incluirá buenas prácticas para trabajar con modelos de Machine Learning y `scikit-learn`.

## TIP 1. Mantener dos versiones del dataset: normal y escalado

En clasificación es muy común combinar modelos que **sí necesitan escalado** (como *Logistic Regression*, KNN, SVM…) con modelos que **no lo necesitan** (como *Decision Tree* y *Random Forest*).

Para evitar problemas, lo mejor es **no sobreescribir X_train y X_test**. En su lugar, crea **copias escaladas** y conserva los datos originales.

---

### Paso 1. Mantener los datos originales sin tocar

Esto permite usar directamente **DecisionTreeClassifier** o **RandomForestClassifier**, que **no requieren escalado**. Para evitar modificaciones accidentales sobre X_train y X_test, podemos crear una copia:

```python
# Dejamos los datos originales tal cual
X_train_sin_escalar = X_train.copy()
X_test__sin_escalar_ = X_test.copy()
```

Si consultamos `X_train_sin_escalar` sobre el dataset Titanic encontraremos algo así:

```python
X_train_sin_escalar.head(10)
```

| Index | Pclass | Age | Fare     | Embarked_C | Embarked_Q | Embarked_S | Sex_female | Sex_male | FamilySize |
|-------|--------|-----|----------|------------|------------|------------|------------|----------|------------|
| 1021  | 3      | 32.0| 8.0500   | 0.0        | 0.0        | 1.0        | 0.0        | 1.0      | 1          |
| 318   | 1      | 31.0| 164.8667 | 0.0        | 0.0        | 1.0        | 1.0        | 0.0      | 3          |
| 924   | 3      | 28.0| 23.4500  | 0.0        | 0.0        | 1.0        | 0.0        | 1.0      | 4          |
| 652   | 3      | 21.0| 8.4333   | 0.0        | 0.0        | 1.0        | 0.0        | 1.0      | 1          |
| 1189  | 1      | 30.0| 45.5000  | 0.0        | 0.0        | 1.0        | 0.0        | 1.0      | 1          |
| 1249  | 3      | 28.0| 7.7500   | 0.0        | 1.0        | 0.0        | 0.0        | 1.0      | 1          |
| 897   | 3      | 30.0| 7.6292   | 0.0        | 1.0        | 0.0        | 1.0        | 0.0      | 1          |
| 1266  | 1      | 45.0| 262.3750 | 1.0        | 0.0        | 0.0        | 1.0        | 0.0      | 1          |
| 1109  | 1      | 50.0| 211.5000 | 1.0        | 0.0        | 0.0        | 1.0        | 0.0      | 3          |
| 855   | 3      | 18.0| 9.3500   | 0.0        | 0.0        | 1.0        | 1.0        | 0.0      | 2          |

---

### Paso 2. Crear versiones escaladas para modelos que lo necesiten

Aquí solo escalamos las columnas numéricas y generamos nuevas variables, en el caso del Titanic:

```python
from sklearn.preprocessing import StandardScaler

# Columnas numéricas que queremos escalar
num_cols = ["Pclass", "Age", "Fare", "FamilySize"]

# Creamos el escalador
scaler = StandardScaler()

# Ajustamos SOLO con train y transformamos ambos
X_train_scaled = X_train.copy()
X_test_scaled = X_test.copy()

X_train_scaled[num_cols] = scaler.fit_transform(X_train_scaled[num_cols])
X_test_scaled[num_cols] = scaler.transform(X_test_scaled[num_cols])
```

Si consultamos `X_train_escaled` sobre el dataset Titanic encontraremos algo así:

```python
X_train_escaled.head(10)
```

| Index | Pclass    | Age       | Fare       | Embarked_C | Embarked_Q | Embarked_S | Sex_female | Sex_male | FamilySize |
|-------|-----------|-----------|------------|------------|------------|------------|------------|----------|------------|
| 1021  | 0.839462  | 0.201613  | -0.465260  | 0.0        | 0.0        | 1.0        | 0.0        | 1.0      | -0.548532  |
| 318   | -1.561949 | 0.121620  | 2.481205   | 0.0        | 0.0        | 1.0        | 1.0        | 0.0      | 0.737724   |
| 924   | 0.839462  | -0.118360 | -0.175906  | 0.0        | 0.0        | 1.0        | 0.0        | 1.0      | 1.380852   |
| 652   | 0.839462  | -0.678314 | -0.458058  | 0.0        | 0.0        | 1.0        | 0.0        | 1.0      | -0.548532  |
| 1189  | -1.561949 | 0.041626  | 0.238397   | 0.0        | 0.0        | 1.0        | 0.0        | 1.0      | -0.548532  |
| 1249  | 0.839462  | -0.118360 | -0.470897  | 0.0        | 1.0        | 0.0        | 0.0        | 1.0      | -0.548532  |
| 897   | 0.839462  | 0.041626  | -0.473166  | 0.0        | 1.0        | 0.0        | 1.0        | 0.0      | -0.548532  |
| 1266  | -1.561949 | 1.241526  | 4.313311   | 1.0        | 0.0        | 0.0        | 1.0        | 0.0      | -0.548532  |
| 1109  | -1.561949 | 1.641493  | 3.357409   | 1.0        | 0.0        | 0.0        | 1.0        | 0.0      | 0.737724   |
| 855   | 0.839462  | -0.918294 | -0.440834  | 0.0        | 0.0        | 1.0        | 1.0        | 0.0      | 0.094596   |


Ahora tienes **dos versiones**:

* `X_train_sin_escalar` y `X_test_sin_escalar` → sin escalar
* `X_train_scaled` y `X_test_scaled` → escaladas

---

### Paso 3. Usar cada una según el modelo

#### Logistic Regression 
Este modelo necesita usar datos **escalados**, por lo que trabajaremos con las variables `X_train_escaled` e `X_test_escaled`.    
Ejemplo muy básico:

```python
from sklearn.linear_model import LogisticRegression

lr = LogisticRegression(...)
lr.fit(X_train_scaled, y_train)
pred_lr = lr.predict(X_test_scaled)
```

---

##### Decision Tree
Este modelo no requiere que los datos estén escalados y, además, si queremos interpretar bien el árbol, es mejor que no lo estén, así que usamos los datos **sin escalar**.    
Ejemplo muy básico:

```python
from sklearn.tree import DecisionTreeClassifier

tree = DecisionTreeClassifier(...)
tree.fit(X_train_sin_escalar, y_train)
pred_tree = tree.predict(X_test_sin_escalar)
```

---

## Tip 2. Usar `model.classes_` para etiquetar correctamente los gráficos

Cuando trabajamos con clasificación binaria (como **Titanic**), los modelos suelen usar **0 y 1** como etiquetas internas:

* `0` → *no sobrevive*
* `1` → *sobrevive*

Si representamos ciertos gráficos, como la matriz de confusión con estos números, es más difícil de interpretar.

Por eso es mejor **cambiar las etiquetas mostradas en el eje X/Y** del gráfico para que aparezcan textos como:

* “No sobrevive”
* "Sobrevive"

Pero para hacerlo bien necesitamos saber **en qué orden el modelo maneja internamente las clases**, y eso se obtiene con:

```python
model.classes_
```

Donde la variable `model` es tu modelo entrenado.

Por ejemplo:

```python
print(model.classes_)
# Resultado: array([0, 1])
```

Esto nos dice el orden en que debemos pasar nuestras etiquetas personalizadas, es decir, primero el "No sobrevive" (0) y después "Sobrevive" (1).

---

### Ejemplo matriz de confusión SIN etiquetas personalizadas (menos intuitiva)

```python
from sklearn.metrics import confusion_matrix
from sklearn.metrics import ConfusionMatrixDisplay

cm = confusion_matrix(y_test, pred)

plt.figure(figsize=(6,4))
sns.heatmap(cm,
            annot=True,
            fmt="d",
            cmap="Blues")

plt.xlabel("Predicción")
plt.ylabel("Valor real")
plt.title("Matriz de confusión")
plt.show()
```

Este gráfico mostrará **0** y **1**, lo cual es correcto pero **menos claro** para su interpretación.

![Gráfico EDA](../0-img/matriz-confusion-sin-eti.png)

---

### Matriz de confusión CON etiquetas personalizadas (recomendado)

Primero consultamos el orden de clases que usa el modelo:

```python
print(model.classes_)
```

Supongamos que devuelve:

```
array([0, 1])
```

Entonces podemos asignar nuestras etiquetas manuales siguiendo ese orden:

```python
labels = ["No sobrevivió", "Sobrevivió"]  # mismo orden que model.classes_
```

Y ahora generamos la matriz rotulada:

```python
# Generamos la matriz especificando el orden de las etiquetas
cm = confusion_matrix(y_test, y_pred, labels=best_model.classes_)

# Representación en heatmap
plt.figure(figsize=(6,4))
sns.heatmap(cm,
            annot=True,
            fmt="d",
            cmap="Blues",
            xticklabels=labels,
            yticklabels=labels)

plt.xlabel("Predicción")
plt.ylabel("Valor real")
plt.title("Matriz de confusión")
plt.show()
```

![Gráfico EDA](../0-img/matriz-confusion.png)
