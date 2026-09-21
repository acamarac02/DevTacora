---
title: "Conjuntos (Sets)"
sidebar_position: 3
description: "Los conjuntos en Python son colecciones no ordenadas y sin elementos duplicados."
keywords: [Python, estructuras de datos, conjuntos, sets]
---

<div class="justify-text">

Los **conjuntos (sets)** son colecciones **no ordenadas** y **sin elementos duplicados**.
Se definen con llaves `{}` o con la función `set()`.

* **No permiten elementos duplicados**: si se intenta añadir un elemento repetido, Python lo ignora.
* **No se pueden acceder por índice**: no existe la posición `0` o `1` porque no mantienen un orden garantizado.

:::tip USO EN INTELIGENCIA ARTIFICIAL
En IA y procesamiento de datos, los conjuntos tienen dos usos principales fundamentales:
1. **Eliminar duplicados de un dataset**: convertir una lista con elementos repetidos a un conjunto mediante `set(lista)`.
2. **Búsquedas de pertenencia ultra-rápidas ($O(1)$)**: comprobar si un elemento existe en un conjunto (`elemento in mi_set`) es inmensamente más rápido que buscarlo en una lista.
:::

### Crear un conjunto

```python
vacio = set()             # conjunto vacío (⚠️ {} crea un diccionario)
numeros = {1, 2, 3, 4}
frutas = {"manzana", "platano", "naranja"}
```

### Longitud de un conjunto

```python
print(len(numeros))  # 4
```

### Usos Prácticos Clave

#### 1) Eliminar duplicados de una lista

```python
lista_con_duplicados = ["spam", "ham", "spam", "egg", "spam"]
lista_limpia = list(set(lista_con_duplicados))

print(lista_limpia)  # ['spam', 'ham', 'egg'] (sin duplicados)
```

#### 2) Comprobar pertenencia rápida (`in`)

```python
vocabulario_conocido = {"python", "inteligencia", "artificial", "datos"}

# La búsqueda en un set es instantánea (O(1))
print("python" in vocabulario_conocido)  # True
print("java" in vocabulario_conocido)    # False
```

### Añadir y eliminar elementos

* `add(x)` → añade un elemento al conjunto.
* `remove(x)` → elimina un valor (da error si no existe).
* `discard(x)` → elimina un valor (NO da error si no existe).
* `clear()` → vacía el conjunto por completo.

```python
numeros = {1, 2, 3}

numeros.add(4)
print(numeros)  # {1, 2, 3, 4}

numeros.remove(2)
print(numeros)  # {1, 3, 4}

numeros.discard(99) # No falla aunque 99 no esté
```

### Operaciones básicas entre conjuntos

#### 1) Unión (`|` o `.union()`)
Une todos los elementos de ambos conjuntos sin repetir.

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)  # {1, 2, 3, 4, 5}
```

#### 2) Intersección (`&` o `.intersection()`)
Devuelve solo los elementos que coinciden en ambos conjuntos.

```python
print(a & b)  # {3}
```

</div>

