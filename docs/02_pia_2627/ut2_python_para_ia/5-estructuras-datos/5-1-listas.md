---
title: "Listas"
sidebar_position: 1
description: "Las listas en Python son colecciones ordenadas y modificables (mutables), que permiten elementos de cualquier tipo"
keywords: [Python, estructuras de datos, listas]
---

* Son colecciones **ordenadas y modificables** (mutables).
* Permiten elementos de cualquier tipo (números, cadenas, incluso otras listas).
* Se definen con corchetes `[]`.


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

# El tercer parámetro controla el **salto** entre elementos.
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
print("Ana" in nombres)     # True
print("Pedro" not in nombres) # True
```

### Añadir elementos

* Con `append()`: al final de la lista.
* Con `insert(i, x)`: en una posición concreta.

```python
nombres.append("Juan")
print(nombres)  # ['Ana','Lucía','Marta','Juan']

nombres.insert(1, "Pedro")
print(nombres)  # ['Ana','Pedro','Lucía','Marta','Juan']
```

### Eliminar elementos

* `remove(x)` → elimina el valor.
* `pop(i)` → elimina y devuelve el valor en la posición (último por defecto).
* `del lista[i]` → elimina el valor en la posición.
* `clear()` → vacía la lista.

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

En Python, si hacemos una asignación directa (lista2 = lista1), **no se crea una nueva lista**, sino que ambas variables apuntan al mismo objeto en memoria.

Las formas correctas de realizar una copia de una lista en Python son con el método `.copy()` o con el constructor `list()`.

```python
lista1 = [1, 2, 3]
lista2 = lista1.copy()
lista3 = list(lista1)
```

### Ordenar listas

Python ofrece **dos formas** principales de ordenar:


#### 1) `lista.sort()`

* Es un **método** de las listas.
* Ordena la **lista original** → la modifica en el sitio (*in-place*).
* **No devuelve nada** (`None`).

Ejemplo:

```python
numeros = [4, 2, 9, 1]
numeros.sort()
print(numeros)   # [1, 2, 4, 9]
```

Si queremos orden descendente:

```python
numeros.sort(reverse=True)
print(numeros)   # [9, 4, 2, 1]
```

#### 2) `sorted(iterable)`

* Es una **función integrada** (no solo de listas, sirve para cualquier iterable: tuplas, cadenas, diccionarios…).
* Devuelve una **nueva lista ordenada** y deja intacto el iterable original.

Ejemplo:

```python
numeros = [4, 2, 9, 1]
ordenados = sorted(numeros)

print("Original:", numeros)    # [4, 2, 9, 1]
print("Ordenados:", ordenados) # [1, 2, 4, 9]
```

También permite ordenar descendente:

```python
ordenados = sorted(numeros, reverse=True)
print(ordenados)  # [9, 4, 2, 1]
```

### Comprensiones (comprehension)

Las **comprensiones de listas** permiten crear listas nuevas a partir de una secuencia (o cualquier iterable) en una sola línea, de forma concisa y legible.

Sintaxis:

```
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

# Transformar texto
palabras = ["Hola", "Python", "IA"]
longitudes = [len(p) for p in palabras]
print(longitudes)  # [4, 6, 2]
```
