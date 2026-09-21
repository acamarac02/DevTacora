---
title: "Módulos e importaciones"
sidebar_position: 7
description: "Cómo funcionan los módulos en Python, cómo importar funciones o librerías, uso de alias y la estructura if __name__ == '__main__'."
keywords: [Python, módulos, import, librerías, from, alias, paquetes, main]
---

<div class="justify-text">

Un **módulo** en Python es simplemente un **archivo `.py`** que contiene código:
funciones, clases, variables o incluso código ejecutable.

👉 Sirve para **organizar el programa en partes reutilizables**.
En lugar de tener todo el código en un solo archivo, puedes dividirlo en módulos temáticos (por ejemplo, `calculos.py`, `procesador_texto.py`, `main.py`).


## Ejemplo simple de módulo

Supón que tienes un archivo `saludos.py` con este contenido:

```python
def hola(nombre: str) -> None:
    print(f"Hola, {nombre}!")

def adios(nombre: str) -> None:
    print(f"Adiós, {nombre}!")
```

Y otro archivo `main.py` en la misma carpeta donde quieres usar esas funciones:

```python
import saludos

saludos.hola("Ana")
saludos.adios("Luis")
```

Salida:
```text
Hola, Ana!
Adiós, Luis!
```

---

## Tipos de Importación

### 1. Importar todo el módulo

```python
import math

print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.1415926535
```

### 2. Importar funciones o clases específicas

```python
from math import sqrt, pi

print(sqrt(9))   # 3.0
print(pi)        # 3.1415926535
```

### 3. Importar con Alias (`as`)

Puedes asignar un nombre corto o estándar a la librería importada. Esto es un estándar absoluto en **Ciencia de Datos e IA**:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

### 4. Evitar `from modulo import *`
No se recomienda importar con asterisco `*`, ya que introduce variables invisibles en tu archivo que pueden causar colisiones y dificultan saber de dónde proviene cada función.

---

## Punto de Entrada Principal: `if __name__ == "__main__":`

Cuando ejecutas un archivo Python directamente desde la terminal (por ejemplo, `python3 main.py`), Python asigna automáticamente el valor `"__main__"` a la variable especial `__name__`.

Sin embargo, si ese archivo es **importado** por otro módulo (`import main`), la variable `__name__` tomará el nombre del propio archivo (ej. `"main"`).

### ¿Por qué se utiliza?

Permite que un archivo funcione **como un script ejecutable directamente** y, al mismo tiempo, **como un módulo importable** sin que su código de prueba se ejecute solo al importarlo.

```python
# Fichero: calculos.py

def sumar(a: float, b: float) -> float:
    return a + b

# Este bloque SOLO se ejecutará si corres "python calculos.py" directamente.
# Si otro archivo hace "import calculos", este bloque NO se ejecutará.
if __name__ == "__main__":
    print("--- Pruebas locales del módulo calculos ---")
    resultado = sumar(4.0, 5.5)
    print(f"Resultado de prueba: {resultado}")
```

---

## Módulos Estándar más Usados en IA

Python incluye una amplia biblioteca estándar sin necesidad de instalar nada externo:

| Módulo | Uso Principal |
| :--- | :--- |
| `math` | Operaciones matemáticas básicas (raíz cuadrada, potencia, constantes). |
| `random` | Generación de números aleatorios y muestras (ej. sembrar semillas `random.seed()`). |
| `os` y `pathlib` | Gestión de rutas de ficheros, carpetas del sistema operativo y variables de entorno. |
| `json` | Lectura y escritura de ficheros de datos JSON. |
| `sys` | Configuración del intérprete Python y argumentos de terminal (`sys.argv`). |
| `datetime` | Manejo de fechas, horas y temporizadores. |

---

## Buenas Prácticas

✅ Coloca todos los `import` **al principio del archivo**, antes de cualquier otra instrucción.  
✅ Ordena las importaciones en tres grupos separados por una línea en blanco:
1. Módulos estándar de Python (`os`, `json`, `math`).
2. Librerías externas de terceros (`numpy`, `pandas`, `fastapi`).
3. Módulos propios de tu proyecto (`utils.py`, `modelo.py`).

</div>