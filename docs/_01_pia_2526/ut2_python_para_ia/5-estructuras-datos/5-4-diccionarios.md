---
title: "Diccionarios"
sidebar_position: 4
description: "Los diccionarios en Python son colecciones de pares clave-valor, que permiten acceder a los valores a través de su clave."
keywords: [Python, estructuras de datos, diccionarios, dict]
---

* Son colecciones de **pares clave-valor**.
* Las **claves son únicas** (no puede haber dos iguales).
* Los valores pueden ser de cualquier tipo.
* Se definen con llaves `{}`, separando clave y valor con `:`.

### Crear un diccionario

Se definen con llaves `{}`.

```python
vacio = {}
persona = {
    "nombre": "Ana",
    "edad": 25,
    "direccion": {
        "ciudad": "Cáceres",
        "cp": "10003"
    }
}
```

También se puede usar el constructor `dict()`:

```python
persona = dict(nombre="Ana", edad=25, ciudad="Madrid")
```

### Longitud de un diccionario

```python
print(len(persona))  # 3
```

### Acceder a elementos

Se accede por la **clave**, no por índice.

```python
print(persona["nombre"])                # Ana
print(persona.get("edad"))              # 25
print(persona["direccion"]["ciudad"])   # Cáceres
```

⚠️ Si la clave no existe, `get()` devuelve `None` en lugar de error.


### Añadir elementos

```python
persona["profesion"] = "Ingeniera"
```

### Modificar elementos

```python
persona["edad"] = 26
```

### Comprobar si una clave existe

```python
print("nombre" in persona)     # True
print("altura" not in persona) # True
```

### Eliminar pares clave-valor

* `pop(clave)` → elimina y devuelve el valor.
* `popitem()` → elimina el último par insertado.
* `del dict[clave]` → elimina la clave indicada.

```python
persona.pop("ciudad")

persona.popitem()  # elimina el último par

del persona["nombre"]
```

### Vaciar un diccionario

```python
persona.clear()
print(persona)  # {}
```

### Eliminar un diccionario

```python
del persona
```


### Copiar un diccionario

* Asignar directamente **no copia**, solo referencia.
* Para copia real:

```python
copia1 = persona.copy()
copia2 = dict(persona)
```

### Obtener claves como lista

```python
claves = list(persona.keys())
print(claves)
```

### Obtener valores como lista

```python
valores = list(persona.values())
print(valores)
```


### Obtener pares clave-valor

El método `.items()` devuelve una **lista de pares (clave, valor)** del diccionario.
Cada elemento devuelto es una tupla con la clave y su valor correspondiente.

```python
persona = {"nombre": "Ana", "edad": 25, "ciudad": "Madrid"}

pares = list(persona.items())
print(pares)
```

**Salida:**

```
[('nombre', 'Ana'), ('edad', 25), ('ciudad', 'Madrid')]
```

También puede recorrerse directamente en un bucle `for`:

```python
for clave, valor in persona.items():
    print(clave, "→", valor)
```

**Salida:**

```
nombre → Ana
edad → 25
ciudad → Madrid
```
