---
title: "Módulos e importaciones"
sidebar_position: 6
description: "Cómo funcionan los módulos en Python, cómo importar funciones o librerías, y cómo organizar el código en varios archivos."
keywords: [Python, módulos, import, librerías, from, alias, paquetes, organización de código]
---

<div class="justify-text">

Un **módulo** en Python es simplemente un **archivo `.py`** que contiene código:
funciones, clases, variables o incluso código ejecutable.

👉 Sirve para **organizar el programa en partes reutilizables**.
En lugar de tener todo el código en un solo archivo, puedes dividirlo en módulos temáticos (por ejemplo, `matematicas.py`, `utils.py`, etc.).


## Ejemplo simple

Supón que tienes un archivo `saludos.py` con este contenido:

```python
def hola(nombre):
    print(f"Hola, {nombre}!")

def adios(nombre):
    print(f"Adiós, {nombre}!")
```

Y otro archivo `main.py` donde quieres usar esas funciones:

```python
import saludos

saludos.hola("Ana")
saludos.adios("Luis")
```

Salida:

```
Hola, Ana!
Adiós, Luis!
```

➡️ Python ejecuta el archivo `saludos.py` una sola vez y luego puedes acceder a sus funciones mediante el **nombre del módulo** (`saludos.función`).

---

## Cómo funcionan las importaciones

Python busca los módulos en una lista de rutas llamada `sys.path`.
Por defecto incluye:

* el directorio actual
* las rutas del sistema
* y las librerías instaladas (como `math`, `functools`, `random`, etc.)

---

## Tipos de importación

### 1️⃣ Importar todo el módulo

```python
import math

print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.1415926535
```

💡 Usar el **nombre del módulo** (prefijo) mejora la legibilidad y evita conflictos.

---

### 2️⃣ Importar solo lo que necesitas

Si solo necesitas una función o variable específica:

```python
from math import sqrt, pi

print(sqrt(9))   # 3.0
print(pi)        # 3.1415926535
```

⚠️ En este caso, **ya no necesitas** escribir `math.` delante.
Pero cuidado: si importas muchos elementos así, puedes tener **colisiones de nombres**.

---

### 3️⃣ Importar con alias

Puedes usar un **alias** (nombre corto o personalizado) con la palabra clave `as`:

```python
import numpy as np
import matplotlib.pyplot as plt
from functools import reduce as rd

print(rd(lambda a,b: a+b, [1,2,3]))  # 6
```

Esto es muy habitual en ciencia de datos (por ejemplo, `np`, `pd`, `plt`).

---

### 4️⃣ Importar todo (⚠️ No recomendado)

```python
from math import *
print(sin(pi / 2))   # 1.0
```

Aunque funciona, **no se recomienda**, porque:

* ensucia el espacio de nombres,
* puede sobrescribir variables sin darte cuenta,
* y dificulta saber de dónde viene cada función.

---

## Módulos estándar de Python

Python incluye una enorme biblioteca estándar lista para usar (sin instalar nada).
Algunos de los más comunes son:

| Módulo       | Uso principal                                    |
| ------------ | ------------------------------------------------ |
| `math`       | Funciones matemáticas (raíz cuadrada, seno, pi…) |
| `random`     | Números aleatorios                               |
| `datetime`   | Fechas y horas                                   |
| `os`         | Sistema operativo, rutas, carpetas               |
| `sys`        | Acceso a variables y entorno del intérprete      |
| `functools`  | Herramientas funcionales (como `reduce`)         |
| `statistics` | Estadísticas básicas (media, mediana, varianza…) |
| `json`       | Leer y escribir datos en formato JSON            |
| `re`         | Expresiones regulares                            |

---

## Buenas prácticas con importaciones

✅ Coloca todos los `import` **al principio del archivo**, antes de cualquier código.

✅ Agrúpalos por secciones:

1. Librerías estándar (`math`, `os`, `sys`, …)
2. Librerías externas (como `numpy`, `pandas`, `matplotlib`)
3. Módulos propios del proyecto.

✅ Usa alias cortos y reconocibles (`np`, `pd`, `plt`).

✅ No uses `from módulo import *`.

✅ Si un módulo tiene el mismo nombre que una variable tuya, renómbralo o usa alias.

</div>