---
title: "Diccionarios"
sidebar_position: 4
description: "Los diccionarios en Python son colecciones de pares clave-valor, fundamentales en la gestión de datos e IA."
keywords: [Python, estructuras de datos, diccionarios, dict]
---

<div class="justify-text">

Los **diccionarios (`dict`)** son una de las estructuras más potentes de Python. Almacenan información en formato de **pares clave-valor**.

* Las **claves deben ser únicas** e inmutables (habitualmente cadenas de texto o números).
* Los **valores pueden ser de cualquier tipo** (números, listas, otros diccionarios, etc.).
* Se definen mediante llaves `{}` separando las claves de los valores con dos puntos `:`.

:::tip USO EN INTELIGENCIA ARTIFICIAL
En IA y desarrollo web (FastAPI/Flask), los diccionarios son omnipresentes:
* Representan datos en formato **JSON** transmitidos por las APIs.
* Almacenan **hiperparámetros de modelos** (ej. `{"learning_rate": 0.001, "epochs": 10}`).
* Se usan para crear **vocabularios** en Procesamiento del Lenguaje Natural (PLN) mapeando palabras a identificadores numéricos (`{"hola": 101, "mundo": 102}`).
:::

### Crear un diccionario

```python
vacio = {}

config_modelo = {
    "nombre": "Clasificador_Sentimiento",
    "version": 1.0,
    "capas": [64, 32, 1],
    "activo": True
}
```

También se puede usar el constructor `dict()`:

```python
persona = dict(nombre="Ana", edad=25, ciudad="Madrid")
```

### Longitud de un diccionario

Se calcula con `len()` (devuelve la cantidad de pares clave-valor).

```python
print(len(config_modelo))  # 4
```

### Acceder a los elementos

Se accede por su **clave**, no por posición numérica:

```python
print(config_modelo["nombre"])  # Clasificador_Sentimiento
```

#### Uso seguro del método `.get()`
Si intentas acceder a una clave que no existe con corchetes `dict["clave_inexistente"]`, Python lanzará un error `KeyError`.
Para evitarlo, utiliza el método `.get()`:

```python
# Devuelve None en lugar de dar error si la clave no existe
print(config_modelo.get("batch_size"))  # None

# Permite definir un valor por defecto si la clave no está
print(config_modelo.get("batch_size", 32))  # 32
```

### Añadir y modificar elementos

```python
# Si la clave no existe, se añade
config_modelo["batch_size"] = 64

# Si la clave ya existe, se actualiza su valor
config_modelo["version"] = 1.1
```

### Comprobar si una clave existe

```python
print("version" in config_modelo)     # True
print("accuracy" not in config_modelo) # True
```

### Eliminar elementos

* `pop(clave)` → elimina la clave y devuelve su valor.
* `del dict[clave]` → elimina la clave indicada.
* `clear()` → vacía el diccionario por completo.

```python
modelo_borrado = config_modelo.pop("version")
print(config_modelo)

del config_modelo["activo"]
```

### Obtener claves, valores y pares

#### 1) `.keys()` → lista/vista con las claves
```python
print(list(config_modelo.keys()))
```

#### 2) `.values()` → lista/vista con los valores
```python
print(list(config_modelo.values()))
```

#### 3) `.items()` → lista de tuplas `(clave, valor)`
Es la forma idónea de recorrer un diccionario mediante un bucle `for`:

```python
metricas = {"accuracy": 0.95, "loss": 0.12, "f1_score": 0.94}

for clave, valor in metricas.items():
    print(f"Métrica {clave}: {valor}")
```

### Comprensiones de Diccionarios (Dict Comprehensions)

Al igual que con las listas, es posible construir diccionarios de forma concisa utilizando comprensiones.

Sintaxis:
```python
{clave: valor for elemento in iterable if condicion}
```

Ejemplos:

#### 1) Crear un vocabulario mapeando palabras a su longitud
```python
palabras = ["python", "inteligencia", "datos"]
longitudes = {p: len(p) for p in palabras}

print(longitudes)  # {'python': 6, 'inteligencia': 12, 'datos': 5}
```

#### 2) Filtrar métricas por umbral
```python
metricas = {"precision": 0.92, "recall": 0.45, "accuracy": 0.88}

# Filtrar solo aquellas métricas aprobadas (>= 0.50)
aprobadas = {k: v for k, v in metricas.items() if v >= 0.50}
print(aprobadas)  # {'precision': 0.92, 'accuracy': 0.88}
```

</div>

