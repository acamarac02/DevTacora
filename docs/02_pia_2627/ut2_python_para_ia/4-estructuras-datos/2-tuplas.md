---
title: "Tuplas"
sidebar_position: 2
description: "Las tuplas en Python son colecciones ordenadas e inmutables, usadas para almacenar datos que no deben cambiar"
keywords: [Python, estructuras de datos, tuplas]
---

<div class="justify-text">

Las **tuplas** son colecciones **ordenadas e inmutables**.
Esto significa que, una vez creadas, **no se pueden modificar** (no se pueden añadir ni eliminar elementos, ni cambiar su valor).
Se utilizan para representar datos **constantes o que no deben alterarse**.

:::tip USO EN INTELIGENCIA ARTIFICIAL
En IA y aprendizaje automático, las tuplas se utilizan constantemente para representar **dimensiones de matrices o imágenes** (por ejemplo, `forma_imagen = (224, 224, 3)`), **coordenadas**, parámetros de configuración que deben permanecer fijos y para **devolver múltiples valores desde una función**.
:::

:::warning LAS TUPLAS SON COLECCIONES ORDENADAS
Cuando decimos que **las tuplas son "ordenadas"**, significa que **los elementos mantienen el orden en que fueron insertados** y que ese orden no cambia automáticamente.
No es que se ordenen solas (como en matemáticas), sino que **recuerdan el orden original**.
:::

### Crear una tupla

Se definen con paréntesis `()`.

```python
tupla_vacia = tuple()
otra_tupla_vacia = ()
tupla1 = (1, 2, 3)
tupla2 = ("Ana", "Luis", "Marta")
mixta = (1, "Hola", True, 3.5)

# También se puede crear sin paréntesis (tuple packing)
tupla3 = 1, 2, 3
```

👉 Para una tupla de un solo elemento hay que poner una coma final:

```python
tupla_uno = (5,)   # tupla con un único elemento
```


### Longitud de una tupla

Se calcula con `len()`.

```python
nombres = ("Ana", "Luis", "Marta")
print(len(nombres))  # 3
```

### Acceder a elementos de una tupla

Funciona igual que en listas, con índices positivos y negativos.

```python
print(nombres[0])   # Ana
print(nombres[-1])  # Marta
```


### Slicing en tuplas

Las tuplas también admiten slicing.

```python
print(nombres[0:2])  # ('Ana', 'Luis')
print(nombres[:2])   # ('Ana', 'Luis')
print(nombres[1:])   # ('Luis', 'Marta')
print(nombres[::-1]) # ('Marta', 'Luis', 'Ana')
```


### Conversión a listas (para modificarlas)

Como las tuplas son **inmutables**, si queremos cambiarlas debemos convertirlas a lista.

```python
colores = ("rojo", "verde", "azul")
lista_colores = list(colores)
lista_colores[0] = "amarillo"
colores = tuple(lista_colores)
print(colores)  # ('amarillo', 'verde', 'azul')
```


### Comprobar si un elemento está en una tupla

```python
frutas = ("manzana", "pera", "uva")
print("pera" in frutas)        # True
print("plátano" not in frutas) # True
```


### Unir tuplas

Podemos unir tuplas con el operador `+`.

```python
a = (1, 2, 3)
b = (4, 5)
c = a + b
print(c)  # (1, 2, 3, 4, 5)
```

### Eliminar tuplas

No se pueden eliminar elementos individuales de una tupla, pero sí **borrar la tupla entera** con `del`.

```python
tupla = (1, 2, 3)
del tupla
# ahora tupla ya no existe
```

</div>