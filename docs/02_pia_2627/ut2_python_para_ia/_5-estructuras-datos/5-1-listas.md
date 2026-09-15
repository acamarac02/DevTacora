---
title: "Listas"
sidebar_position: 1
description: "Las listas en Python son colecciones ordenadas y modificables (mutables), que permiten elementos de cualquier tipo"
keywords: [Python, estructuras de datos, listas]
---

<div class="justify-text">

Las **listas** son una de las estructuras de datos más importantes en Python. Permiten guardar secuencias ordenadas de elementos y modificarlos cuando se necesite.

* Son colecciones **ordenadas y modificables** (mutables).
* Permiten elementos de cualquier tipo (números, cadenas, incluso otras listas o diccionarios).
* Se definen con corchetes `[]`.

:::tip USO EN INTELIGENCIA ARTIFICIAL
En IA y Ciencia de Datos, las listas se usan constantemente para almacenar secuencias de tokens, lotes de datos (*batches*), listas de predicciones o historiales de métricas de entrenamiento.
:::

### Cómo crear una lista

```python
lista_vacia = [] 
numeros = [1, 2, 3, 4, 5]
mixta = [1, "Hola", True, 3.5]
```


### Acceso a elementos con índices positivos

Los índices empiezan en `0` para el primer elemento.

```python
nombres = ["Ana", "Luis", "Marta"]
print(nombres[0])   # Ana
print(nombres[1])   # Luis
```


### Acceso con índices negativos

Los índices negativos cuentan desde el final.

```python
print(nombres[-1])  # Marta (último elemento)
print(nombres[-2])  # Luis
```

### Acceso con bucles

```python
for nombre in nombres:
    print(nombre)
```


### Desempaquetado de listas

El **desempaquetado** permite **asignar varios valores de una lista (o de cualquier iterable)** directamente a varias variables en una sola línea.

```python
valores = [10, 20, 30]
a, b, c = valores
print(a, b, c)  
# 10 20 30
```

#### 🔹 Ignorar valores con `_`

Si no te interesa un valor de la lista, puedes descartarlo usando el **guion bajo `_`**.

```python
valores = [1, 2, 3]
a, _, c = valores
print(a, c)  # 1 3
```


#### 🔹 Desempaquetado extendido con `*`

Cuando no sabes cuántos elementos hay o quieres agrupar varios en una sola variable, puedes usar `*`.

```python
valores = [10, 20, 30, 40, 50]

a, *medio, b = valores
print(a)      # 10
print(medio)  # [20, 30, 40]
print(b)      # 50
```


### Slicing (rebanado)

El **slicing** permite obtener **sublistas** (o subsecuencias en general, porque también funciona en strings y tuplas).
La sintaxis es:

```
lista[inicio:fin:paso]
```

* **inicio** → índice desde el que empieza (incluido).
* **fin** → índice hasta el que llega (excluido).
* **paso** → salto entre elementos (por defecto es 1).


```python
nombres = ["Ana", "Luis", "Marta", "Juan", "Lucía"]

print(nombres[0:2])   # ['Ana', 'Luis']
print(nombres[1:4])   # ['Luis', 'Marta', 'Juan']
print(nombres[:3])    # ['Ana', 'Luis', 'Marta']   (inicio implícito en 0)
print(nombres[2:])    # ['Marta', 'Juan', 'Lucía'] (fin implícito en último)
print(nombres[:])     # ['Ana', 'Luis', 'Marta', 'Juan', 'Lucía'] (copia completa)

# El tercer parámetro controla el salto entre elementos.
print(nombres[::2])   # ['Ana', 'Marta', 'Lucía'] (de dos en dos)
print(nombres[1::2])  # ['Luis', 'Juan'] (empieza en 1 y salta de dos en dos)

# Se pueden usar índices negativos para contar desde el final.
print(nombres[-3:])   # ['Marta', 'Juan', 'Lucía']
print(nombres[:-2])   # ['Ana', 'Luis', 'Marta']
```

### Modificar listas

Como son mutables, se pueden cambiar elementos.

```python
nombres[1] = "Lucía"
print(nombres)  # ['Ana', 'Lucía', 'Marta']
```

### Comprobar si un elemento está en la lista

```python
print("Ana" in nombres)       # True
print("Pedro" not in nombres) # True
```

### Añadir elementos

* `append(x)` → añade un elemento al final de la lista.
* `extend(iterable)` → añade **todos los elementos** de otra lista o colección al final.
* `insert(i, x)` → inserta un elemento en una posición concreta.

```python
nombres = ["Ana", "Lucía"]

# append: añade 1 elemento
nombres.append("Juan")
print(nombres)  # ['Ana', 'Lucía', 'Juan']

# extend: une otra lista al final
nuevos = ["Pedro", "Elena"]
nombres.extend(nuevos)
print(nombres)  # ['Ana', 'Lucía', 'Juan', 'Pedro', 'Elena']

# insert: inserta en una posición
nombres.insert(1, "Marta")
print(nombres)  # ['Ana', 'Marta', 'Lucía', 'Juan', 'Pedro', 'Elena']
```

### Eliminar elementos

* `remove(x)` → elimina la primera aparición del valor.
* `pop(i)` → elimina y devuelve el valor en la posición indicada (último por defecto).
* `del lista[i]` → elimina el valor en la posición.
* `clear()` → vacía la lista por completo.

```python
nombres.remove("Pedro")
print(nombres)

nombres.pop(0)  # elimina 'Ana'
print(nombres)

del nombres[-1] # elimina el último
print(nombres)

nombres.clear()
print(nombres)  # []
```

### Copiar una lista

En Python, si hacemos una asignación directa (`lista2 = lista1`), **no se crea una nueva lista**, sino que ambas variables apuntan al mismo objeto en memoria.

Las formas correctas de realizar una copia independiente son con el método `.copy()` o con la función `list()`:

```python
lista1 = [1, 2, 3]
lista2 = lista1.copy()
lista3 = list(lista1)
```

### Ordenar listas

Python ofrece dos formas principales de ordenar:

#### 1) `lista.sort()`

* Es un **método** propio de las listas.
* Ordena la **lista original** (*in-place*).
* No devuelve una lista nueva (devuelve `None`).

```python
numeros = [4, 2, 9, 1]
numeros.sort()
print(numeros)   # [1, 2, 4, 9]

# Orden descendente
numeros.sort(reverse=True)
print(numeros)   # [9, 4, 2, 1]
```

#### 2) `sorted(iterable)`

* Es una **función integrada** que funciona con cualquier iterable.
* Devuelve una **nueva lista ordenada** y deja intacta la lista original.

```python
numeros = [4, 2, 9, 1]
ordenados = sorted(numeros)

print("Original:", numeros)    # [4, 2, 9, 1]
print("Ordenados:", ordenados) # [1, 2, 4, 9]
```

### Comprensiones de listas (List Comprehensions)

Las **comprensiones de listas** permiten crear listas nuevas a partir de una secuencia en una sola línea, de forma concisa y legible.

Sintaxis:

```python
[expresion for elemento in iterable if condicion]
```

Ejemplos:

```python
# Lista de cuadrados
cuadrados = [x**2 for x in range(5)]
print(cuadrados)  # [0, 1, 4, 9, 16]

# Filtrar números pares
pares = [x for x in range(10) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8]

# Transformar textos
palabras = ["hola", "python", "ia"]
mayusculas = [p.upper() for p in palabras]
print(mayusculas)  # ['HOLA', 'PYTHON', 'IA']
```

</div>

