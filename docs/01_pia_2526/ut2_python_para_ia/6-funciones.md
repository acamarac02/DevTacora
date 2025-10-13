---
title: "Programación funcional"
sidebar_position: 5
description: "Qué son las funciones, cómo se definen, cómo se llaman, tipos de argumentos y valores de retorno en Python. Uso de funciones lambda, funciones de orden superior como map, filter y reduce, decoradores y gestores de contexto (context managers) en Python."
keywords: [Python, programación funcional, lambda, map, filter, reduce, decoradores, context managers]
---

<div class="justify-text">

Una **función** es un **bloque de código reutilizable** que realiza una tarea específica.
Permiten **organizar** el código, **evitar repeticiones** y hacerlo **más legible y mantenible**.

Podemos imaginarlas como **“máquinas”**: reciben datos (entradas), hacen algo con ellos y devuelven un resultado (salida).

```
ENTRADA → [ FUNCIÓN ] → SALIDA
```

## Funciones

Las funciones se definen con la palabra clave `def`, seguida de un nombre, paréntesis (con o sin parámetros) y dos puntos.
El **cuerpo** de la función se escribe indentado (normalmente 4 espacios).

```python
def saludar():
    print("Hola, mundo!")
```

Para **ejecutarla**, se llama por su nombre seguido de paréntesis:

```python
saludar()
# Salida: Hola, mundo!
```

---

### Parámetros y argumentos

Los **parámetros** son los **nombres de variables** que aparecen entre paréntesis en la definición de la función. Actúan como **“variables locales”** que recibirán un valor cuando se llame a la función.

```python
def saludar_persona(nombre):
    print(f"Hola, {nombre}!")
```

Los **argumentos** son los **valores reales** que pasamos a la función cuando la llamamos.

```python
saludar_persona("Ana")
# Salida: Hola, Ana!
```

#### Varios parámetros

Podemos definir funciones con varios parámetros, separados por comas.

```python
def presentar(nombre, edad):
    print(f"Me llamo {nombre} y tengo {edad} años.")
```

```python
presentar("Luis", 20)
# Salida: Me llamo Luis y tengo 20 años.
```

---

### Valores de retorno (`return`)

Una función puede **devolver un valor** usando la palabra clave `return`.
Esto permite **guardar el resultado** en una variable o usarlo en una expresión.

```python
def sumar(a, b):
    return a + b
```

```python
resultado = sumar(5, 3)
print(resultado)   # 8
```

:::warning Importante
Cuando una función ejecuta `return`, **termina inmediatamente** y devuelve el valor indicado. Esto implica que el código que hay debajo nunca se ejecutará.

```python
def sumar(a, b):
    return a + b
    print("Este mensaje va después del return") # Esta línea nunca llega a ejecutarse
```
:::

#### Funciones que devuelven varios valores

En Python, una función puede **devolver varios valores a la vez** separándolos con comas.
Internamente, Python los agrupa en una **tupla**, aunque no sea necesario escribir los paréntesis.

```python
def operaciones(a, b):
    suma = a + b
    resta = a - b
    producto = a * b
    return suma, resta, producto
```

```python
resultados = operaciones(5, 3)
print(resultados)
# (8, 2, 15)
```

En este caso, `resultados` es una **tupla** con los tres valores.

También podemos **desempaquetar** los valores directamente en variables separadas:

```python
s, r, p = operaciones(5, 3)
print(f"Suma: {s}, Resta: {r}, Producto: {p}")
# Suma: 8, Resta: 2, Producto: 15
```


#### Funciones que no devuelven nada

Si no se usa `return`, la función devuelve implícitamente `None`.

```python
def saludo():
    print("Hola!")

x = saludo()    # Ejecuta la función
print(x)        # None
```

---

### Tipos de parámetros

Python permite distintos tipos de parámetros según la flexibilidad que queramos.


#### 1. Posicionales (los más comunes)

Los argumentos se pasan en el **mismo orden** que los parámetros.

```python
def resta(a, b):
    return a - b

print(resta(10, 5))   # 5
```


#### 2. Nombrados (keyword arguments)

Se puede indicar el nombre del parámetro al llamar la función.
Esto permite **cambiar el orden** o **hacer el código más claro**.

```python
def resta(a, b):
    return a - b

print(resta(b=2, a=8))   # 6
```


#### 3. Valores por defecto

Podemos asignar un **valor predeterminado** a un parámetro, que se usa si no se pasa argumento.

```python
def saludar(nombre="invitado"):
    print(f"Hola, {nombre}!")

saludar()          # Hola, invitado!
saludar("Marta")   # Hola, Marta!
```


#### 4. Parámetros variables (`*args` y `**kwargs`)

A veces no sabemos cuántos argumentos recibirá la función.

##### `*args` → varios argumentos posicionales

Si no sabemos cuántos argumentos vamos a pasar a nuestra función, podemos crear una función que acepte un número arbitrario de argumentos añadiendo un asterisco * antes del nombre del parámetro.

```python
def sumar_todo(*numeros):
    total = 0
    for num in numeros:
        total = total + num
    return total

print(sumar_todo(1, 2, 3, 4))  # 10
```

:::info
También puedes mezclar los tipos de parámetros.
```python
def generar_grupos(nombre_grupo, *miembros, ciudad = "Cáceres"):
    print(f"El grupo se llama {nombre_grupo} y pertenece a la de ciudad de {ciudad}")
    print("Los miembros son:")
    for miembro in miembros:
        print(miembro)

# ciudad debe ir nombrado para evitar que lo incluya como parte de los argumentos posicionales "miembros"
generar_grupos("Equipo 1", "Pedro", "Ana", "Juan", ciudad = "Madrid")
```

:::

##### `**kwargs` → varios argumentos nombrados

A veces no sabemos **qué cantidad de argumentos con nombre** (`clave=valor`) se van a pasar a una función.
En esos casos, podemos usar `**kwargs` (*keyword arguments*), que **recoge todos los argumentos nombrados adicionales** en un **diccionario**.

La palabra `kwargs` es una convención (viene de *keyword arguments*), pero podrías usar cualquier nombre después de los dos asteriscos `**`.

```python
def mostrar_info(**datos):
    for clave, valor in datos.items():
        print(f"{clave}: {valor}")

mostrar_info(nombre="Ana", edad=22, ciudad="Madrid")
```

Salida:

```
nombre: Ana
edad: 22
ciudad: Madrid
```

👉 Internamente, `**datos` se convierte en un **diccionario**:

```python
{
  "nombre": "Ana",
  "edad": 22,
  "ciudad": "Madrid"
}
```

Por eso podemos recorrerlo con `.items()` para acceder a las **claves** y **valores**.

##### 🔹 Diferencias `*args` y `*kwargs`

| Característica     | `*args`                 | `**kwargs`                            |
| ------------------ | ----------------------- | ------------------------------------- |
| Captura            | Argumentos posicionales | Argumentos nombrados (clave=valor)    |
| Tipo de estructura | Tupla                   | Diccionario                           |
| Ejemplo            | `sumar_todo(1,2,3)`     | `mostrar_info(nombre="Ana", edad=22)` |

Ambos pueden combinarse en una misma función:

```python
def registrar_usuario(*roles, **datos):
    print("Roles:", roles)
    print("Datos:", datos)

registrar_usuario("admin", "editor", nombre="Luis", activo=True)
```

Salida:

```
Roles: ('admin', 'editor')
Datos: {'nombre': 'Luis', 'activo': True}
```

---

### Documentación: Docstrings

Podemos incluir un **comentario descriptivo** dentro de la función usando **triple comillas**.
Se llama **docstring** y explica qué hace la función.

```python
def area_rectangulo(base, altura):
    """Calcula el área de un rectángulo a partir de su base y altura."""
    return base * altura
```

Para consultar la documentación de una función:

```python
help(area_rectangulo)
```

---

### Variables locales y globales

Las variables **definidas dentro** de una función **solo existen en su interior**:
a eso se le llama **ámbito local** (*scope*).

```python
def ejemplo():
    x = 10   # variable local
    print(x)

ejemplo()
# print(x)  # ❌ Error: x no está definida fuera
```

Si necesitas usar una variable **declarada fuera** (global) dentro de una función, se puede acceder, pero **no modificar** a menos que se use `global`.

```python
contador = 0

def incrementar():
    global contador
    contador += 1

incrementar()
print(contador)   # 1
```

:::warning CUIDADO CON LAS VARIABLES GLOBALES
Las **variables globales** pueden causar errores difíciles de detectar, ya que cualquier función puede modificarlas y alterar el comportamiento del programa sin que te des cuenta.

✅ **Buena práctica:** usa **parámetros** y **valores de retorno** para pasar información entre funciones en lugar de depender de variables globales.
:::

---

### Buenas prácticas

* ✅ **Nombres descriptivos** → usa verbos si la función hace algo (`calcular_media`, `mostrar_menu`).
* ✅ **Una sola tarea por función** → evita funciones que hagan demasiadas cosas.
* ✅ **Evita duplicar código** → si algo se repite, conviértelo en función.
* ✅ **Usa `return` para devolver datos**, no solo `print`.
* ✅ **Documenta** las funciones con docstrings y comenta el código cuando sea necesario.

---

### Ejemplo completo

```python
def calcular_precio_final(precio, iva=21, descuento=0):
    """
    Calcula el precio final de un producto.
    - precio: precio base (float)
    - iva: porcentaje de IVA (por defecto 21)
    - descuento: porcentaje de descuento (por defecto 0)
    Devuelve el precio total.
    """
    precio_con_iva = precio * (1 + iva / 100)
    precio_final = precio_con_iva * (1 - descuento / 100)
    return round(precio_final, 2)

# Uso
p1 = calcular_precio_final(100)
p2 = calcular_precio_final(100, iva=10, descuento=5)

print(p1, p2)   # 121.0 104.5
```

---

## Funciones lambda

Las **funciones lambda** son **funciones anónimas** (sin nombre), definidas en una sola línea con la palabra clave `lambda`.

Sintaxis:

```
lambda argumentos: expresión
```

Ejemplo básico:

```python
doble = lambda x: x * 2
print(doble(5))   # 10
```

➡️ Es equivalente a:

```python
def doble(x):
    return x * 2
```

Las lambdas se usan cuando necesitamos **funciones cortas y desechables**, por ejemplo, dentro de `map`, `filter` o `sorted`.

Ejemplo con varias variables:

```python
suma = lambda a, b: a + b
print(suma(3, 4))   # 7
```

Y pueden incluir expresiones lógicas:

```python
mayor = lambda a, b: a if a > b else b
print(mayor(8, 5))  # 8
```

---

## Funciones de orden superior

En Python (y en otros lenguajes funcionales), una **función de orden superior** es simplemente una **función que trabaja con otras funciones**.
Concretamente, cumple **al menos una** de estas dos condiciones:

1. **Recibe una o más funciones como argumento.**
2. **Devuelve una función como resultado.**

En otras palabras, las *higher-order functions* tratan las funciones **como datos**: pueden recibirlas, devolverlas o combinarlas.

Python incluye varias **funciones que aceptan otras funciones** como argumento.
Las más comunes en programación funcional son: **`map()`**, **`filter()`** y **`reduce()`**.

---

### `map()`

Aplica una función a **cada elemento** de un iterable y devuelve un **iterador** con los resultados.

Sintaxis:

```python
map(función, iterable)
```

Ejemplo:

```python
numeros = [1, 2, 3, 4, 5]
dobles = map(lambda x: x * 2, numeros)
lista_dobles = list(dobles)
print(lista_dobles)   # [2, 4, 6, 8, 10]
```

También puedes usar una función ya definida:

```python
def cuadrado(x):
    return x**2

numeros = [1, 2, 3, 4]
resultado = list(map(cuadrado, numeros))
print(resultado)  # [1, 4, 9, 16]
```

---

### `filter()`

Filtra los elementos de un iterable **según una condición booleana**.

Sintaxis:

```python
filter(función, iterable)
```

Ejemplo:

```python
numeros = [1, 2, 3, 4, 5, 6]
pares = filter(lambda x: x % 2 == 0, numeros)
print(list(pares))   # [2, 4, 6]
```

La función debe devolver `True` o `False` para cada elemento.

---

### `reduce()`

Aplica una función de forma **acumulativa** sobre los elementos de un iterable, **reduciéndolo a un solo valor**. Para hacerlo, **va aplicando una función binaria** (una función que toma dos argumentos) **de manera acumulativa**:

* Toma los dos primeros elementos
* Aplica la función
* Luego combina el resultado con el siguiente elemento
* Y así sucesivamente hasta llegar al final

Por eso, **la función que se pasa a `reduce()` siempre debe aceptar dos parámetros**:
* uno representa el **acumulador** (el resultado parcial hasta el momento)
* y el otro el **nuevo elemento** de la lista.

Está en el módulo `functools`, por lo que debe importarse.

Sintaxis:

```python
from functools import reduce
reduce(función, iterable[, valor_inicial])
```

Ejemplo:

```python
from functools import reduce

numeros = [1, 2, 3, 4]
producto = reduce(lambda x, y: x * y, numeros)
print(producto)  # 24
```

#### Cómo lo interpreta Python:

1. Toma los dos primeros elementos: `1` y `2`:  
    → ejecuta `lambda x, y: x * y` → `1 * 2 = 2`

2. Luego usa ese resultado (`2`) como primer parámetro (`x`) y el siguiente elemento de la lista (`3`) como segundo (`y`):  
    → `2 * 3 = 6`

3. Repite con el resultado (`6`) y el siguiente (`4`):  
    → `6 * 4 = 24`

🎯 Resultado final: `24`


#### Con valor inicial (útil para definir un acumulador):

Si proporcionas un **valor inicial**, `reduce()` empezará la acumulación desde ese valor.
Ese valor actúa como **primer acumulador** antes de empezar a recorrer el iterable.

```python
suma = reduce(lambda acc, x: acc + x, numeros, 10)
print(suma)   # 20 (10 + 1 + 2 + 3 + 4)
```

---

## Decoradores (Decorators)

Un **decorador** es una **función que recibe otra función como argumento y devuelve una nueva función**, normalmente una versión “mejorada” o “modificada” de la original.

En otras palabras:

> Un decorador **envuelve** una función para añadirle comportamiento extra **sin modificar su código original**.

Se usa con la sintaxis `@nombre_decorador` justo **encima** de la función a decorar.

Esto permite añadir funcionalidades como:

* Mostrar mensajes antes o después de ejecutar una función.
* Medir tiempos de ejecución.
* Controlar acceso o validar permisos.
* Registrar logs (mensajes de depuración).
* Evitar repetir código en varias funciones.

---

### Sintaxis básica

El decorador **recibe una función**, pero no la ejecuta inmediatamente.
En su interior define otra función (normalmente llamada `wrapper`, “envoltorio”) que **envuelve el comportamiento original** y añade el nuevo código.

La estructura general es:

```python
def decorador(funcion_original):
    def wrapper():
        # Código que se ejecuta ANTES de la función original
        ...
        funcion_original()  # llamada a la función original
        # Código que se ejecuta DESPUÉS de la función original
        ...
    return wrapper  # devolvemos la nueva función
```

#### 🧠 Explicación paso a paso

1. `decorador` es una función que recibe otra función (`funcion_original`).
2. Dentro de `decorador`, definimos una **nueva función** (`wrapper`) que añade algo antes y/o después de la original.
3. `decorador` devuelve `wrapper`, no la ejecuta.
4. Cuando Python ve `@decorador` encima de una función, **sustituye la función original por el resultado del decorador**.

:::info Un decorador es una función de orden superior
Un decorador es un tipo especial de **Higher-Order Function**, diseñado específicamente para envolver otra función y alterar o ampliar su comportamiento sin cambiar su código original.
:::

---

### Ejemplo básico

En el siguiente ejemplo se crea un decorador que muestra un mensaje antes y después de ejecutar la función principal.

```python
def decorador(func):
    def wrapper():
        print("Antes de ejecutar la función...")
        func()
        print("Después de ejecutar la función...")
    return wrapper

@decorador
def saludar():
    print("¡Hola, mundo!")

saludar()
```

Salida:

```
Antes de ejecutar la función...
¡Hola, mundo!
Después de ejecutar la función...
```

---

### Ejemplo de función con parámetros

Para que el decorador funcione con cualquier función (que reciba o no argumentos), usamos `*args` y `**kwargs`.

```python
def decorador(func):
    def wrapper(*args, **kwargs):
        print("Llamando a la función...")
        resultado = func(*args, **kwargs)  # ejecuta la función original
        print("Ejecución completada.")
        return resultado
    return wrapper

@decorador
def sumar(a, b):
    return a + b

print(sumar(3, 4))
```

Salida:

```
Llamando a la función...
Ejecución completada.
7
```

✅ Ahora el decorador sirve para **cualquier función**, sin importar el número de parámetros.

---

### Decoradores anidados

Puedes aplicar **varios decoradores** sobre una misma función.
Se ejecutan de abajo hacia arriba (el más cercano a la función es el primero en aplicarse).

```python
@decorador1
@decorador2
def mi_funcion():
    ...
```

---

### Ejemplo práctico: tiempo de ejecución

```python
import time

def medir_tiempo(func):
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = func(*args, **kwargs)
        fin = time.time()
        print(f"Tiempo de ejecución: {fin - inicio:.4f} segundos")
        return resultado
    return wrapper

@medir_tiempo
def tarea_pesada():
    suma = 0
    for i in range(10**6):
        suma += i
    return suma

tarea_pesada()
```

Salida:

```
Tiempo de ejecución: 0.0462 segundos
```


</div>