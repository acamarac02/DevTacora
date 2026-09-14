---
title: "Sets"
sidebar_position: 3
description: "Los conjuntos en Python son colecciones no ordenadas, no indexadas y sin elementos duplicados."
keywords: [Python, estructuras de datos, conjuntos, sets]
---

* Son colecciones **no ordenadas** y **no indexadas**.
* **No permiten elementos duplicados**.
* Se definen con llaves `{}` o con la función `set()`.

:::warning LOS SETS SON COLECCIONES NO ORDENADAS
Cuando decimos que los **conjuntos (sets) en Python son *no ordenados*** significa:

* **No mantienen el orden de inserción** de los elementos.
  → A diferencia de las listas, donde el primer elemento que metes se queda en la posición 0, en un conjunto no hay posiciones fijas.
* **No se pueden acceder por índice**, es decir, no puedes hacer `mi_set[0]`.
* Python internamente los guarda de forma que sea muy rápido comprobar si un elemento está dentro (`in`), pero eso implica que el orden no esté garantizado.

Ejemplo:

```python
numeros = {5, 2, 9, 1}
print(numeros)
```

La salida puede ser:

```
{1, 2, 5, 9}
```

o en otro caso:

```
{2, 9, 1, 5}
```

➡️ El orden de los elementos **puede variar** y **no debes confiar en él**.
:::

### Crear un conjunto

Se definen con llaves `{}`.

```python
vacio = set()             # conjunto vacío
numeros = {1, 2, 3, 4}
mixto = {1, "Hola", True, 3.5}
```

⚠️ Ojo: `{}` crea un **diccionario vacío**, no un conjunto.


### Longitud de un conjunto

```python
print(len(numeros))  # 4
```


### Acceder a elementos

No se puede acceder por índice (porque no están ordenados).
Se recorren con un bucle `for`.

```python
for x in numeros:
    print(x)
```


### Comprobar si un elemento está en el conjunto

```python
print(2 in numeros)      # True
print(10 not in numeros) # True
```


### Añadir elementos

* Con `add(x)` → añade un único elemento.
* Con `update(iterable)` → añade varios elementos.

```python
numeros.add(5)
print(numeros)

numeros.update([6, 7, 8])
print(numeros)
```


### Eliminar elementos

* `remove(x)` → elimina un valor (da error si no existe).
* `discard(x)` → elimina un valor (NO da error si no existe).
* `pop()` → elimina y devuelve un elemento aleatorio.

```python
numeros.remove(3)
numeros.discard(10)  # no da error aunque no esté
print(numeros)

x = numeros.pop()
print(x)      # valor eliminado
```


### Vaciar un conjunto

```python
numeros.clear()
print(numeros)  # set()
```

### Eliminar un conjunto

```python
del numeros
```

### Convertir una lista en conjunto

Muy útil para eliminar duplicados.

```python
lista = [1, 2, 2, 3, 4, 4, 5]
conjunto = set(lista)
print(conjunto)  # {1, 2, 3, 4, 5}
```

### Unir conjuntos

* Con el operador `|` o con `union()`.

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)          # {1, 2, 3, 4, 5}
print(a.union(b))     # {1, 2, 3, 4, 5}
```

### Intersección de conjuntos

* Elementos comunes → `&` o `intersection()`.

```python
print(a & b)               # {3}
print(a.intersection(b))   # {3}
```


### Subconjunto y superconjunto

```python
print({1, 2}.issubset(a))    # True
print(a.issuperset({1, 2}))  # True
```

### Diferencia entre conjuntos

* Elementos en `a` que no están en `b`.

```python
print(a - b)           # {1, 2}
print(a.difference(b)) # {1, 2}
```
