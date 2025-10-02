---
title: "Estructuras de datos"
sidebar_position: 5
description: "Listas, tuplas, conjuntos y diccionarios en Python, así como comprensiones, iteradores y generadores."
keywords: [Python, estructuras de datos, listas, tuplas, conjuntos, diccionarios, comprensiones, iteradores, generadores]
---

Las **estructuras de datos** permiten **guardar, organizar y manipular colecciones de información**. En Python existen varias estructuras básicas integradas en el lenguaje, muy utilizadas en programación y especialmente útiles en Inteligencia Artificial y Ciencia de Datos.

---

## Listas

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

---

## 🔹 2. Tuplas

* Son colecciones **ordenadas pero inmutables**.
* Se definen con paréntesis `()`.

Ejemplo:

```python
coordenada = (10, 20)
print(coordenada[0])  # 10
```

Características:

* Una vez creadas, **no se pueden modificar** (no se añaden ni eliminan elementos).
* Son más rápidas que las listas y se suelen usar para datos fijos.
* Pueden desempacarse fácilmente:

  ```python
  x, y = coordenada
  ```

---

## 🔹 3. Conjuntos (sets)

* Colecciones **no ordenadas y sin duplicados**.
* Se definen con llaves `{}` o con la función `set()`.

Ejemplo:

```python
colores = {"rojo", "azul", "verde", "rojo"}
print(colores)   # {'rojo','azul','verde'}
```

Operaciones típicas:

* Unión: `set1 | set2`
* Intersección: `set1 & set2`
* Diferencia: `set1 - set2`
* Diferencia simétrica: `set1 ^ set2`

👉 Muy útiles cuando nos interesa saber si un elemento existe, o cuando trabajamos con conjuntos matemáticos.

---

## 🔹 4. Diccionarios

* Colecciones **no ordenadas** de pares clave → valor.
* Se definen con llaves `{}`.

Ejemplo:

```python
persona = {"nombre": "Ana", "edad": 25}
print(persona["nombre"])   # Ana
persona["ciudad"] = "Madrid"  # añadir clave
```

Operaciones típicas:

* `dic.keys()` → devuelve todas las claves.
* `dic.values()` → devuelve los valores.
* `dic.items()` → devuelve pares (clave, valor).
* `get(clave, valor_por_defecto)` → acceso seguro.

👉 Son la estructura más flexible de Python, base de los **DataFrames de Pandas**.

---

## 🔹 5. Comprensiones

Las **comprensiones** permiten crear listas, sets o diccionarios en **una sola línea**, de manera clara y eficiente.

Ejemplos:

* Lista con cuadrados del 0 al 4:

  ```python
  cuadrados = [x**2 for x in range(5)]
  ```
* Conjunto con letras de una palabra:

  ```python
  letras = {c for c in "python"}
  ```
* Diccionario con números y sus cuadrados:

  ```python
  dic = {x: x**2 for x in range(5)}
  ```

👉 Son muy usadas en Python por su **legibilidad y rendimiento**.

---

## 🔹 6. Iteradores

Un **iterador** es un objeto que nos permite recorrer una secuencia elemento a elemento.

* Todas las estructuras vistas (listas, tuplas, sets, diccionarios) son **iterables**.
* Podemos convertirlas en iteradores con `iter()`, y avanzar con `next()`.

Ejemplo:

```python
lista = [1, 2, 3]
it = iter(lista)
print(next(it))  # 1
print(next(it))  # 2
```

👉 Los iteradores son la base de los bucles `for` en Python.

---

## 🔹 7. Generadores

Un **generador** es una función que produce valores **de uno en uno**, usando la palabra clave `yield`.

* No guarda toda la colección en memoria, lo que los hace más eficientes para manejar datos grandes.

Ejemplo:

```python
def cuenta_regresiva(n):
    while n > 0:
        yield n
        n -= 1

for x in cuenta_regresiva(3):
    print(x)
```

Salida:

```
3
2
1
```

👉 Los generadores son muy útiles en IA cuando manejamos **datasets grandes** que no caben en memoria.

---

✅ **En resumen:**

* **Listas** → colecciones ordenadas y mutables.
* **Tuplas** → colecciones ordenadas e inmutables.
* **Sets** → no ordenados, sin duplicados.
* **Diccionarios** → pares clave → valor.
* **Comprensiones** → crean estructuras de forma compacta.
* **Iteradores y generadores** → permiten recorrer y producir datos de forma eficiente.