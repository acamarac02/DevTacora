---
title: "Funciones y Programación Funcional"
sidebar_position: 6
description: "Declaración de funciones, parámetros, retornos, Type Hinting, funciones lambda, uso conceptual de decoradores y gestores de contexto en Python."
keywords: [Python, funciones, type hinting, lambda, map, filter, decoradores, context managers]
---

<div class="justify-text">

Una **función** es un **bloque de código reutilizable** que realiza una tarea específica.
Permiten **organizar** el código, **evitar repeticiones** y hacerlo **más legible y mantenible**.

Podemos imaginarlas como **“máquinas”**: reciben datos (entradas), hacen algo con ellos y devuelven un resultado (salida).

```
ENTRADA → [ FUNCIÓN ] → SALIDA
```

---

## Declaración de Funciones

Las funciones se definen con la palabra clave `def`, seguida de un nombre, paréntesis (con o sin parámetros) y dos puntos.
El **cuerpo** de la función se escribe indentado (normalmente 4 espacios).

```python
def saludar():
    print("Hola, mundo!")
```

Para **ejecutarla**, se llama por su nombre seguido de paréntesis:

```python
saludar()  # Salida: Hola, mundo!
```

---

### Parámetros y Argumentos

Los **parámetros** son los **nombres de variables** que aparecen entre paréntesis en la definición de la función.
Los **argumentos** son los **valores reales** que pasamos a la función cuando la llamamos.

```python
def presentar(nombre, edad):
    print(f"Me llamo {nombre} y tengo {edad} años.")

presentar("Luis", 20)
# Salida: Me llamo Luis y tengo 20 años.
```

---

### Tipado Estático Moderno: Type Hinting

En versiones modernas de Python (y muy especialmente en frameworks como **FastAPI** o **Pydantic**), se utiliza el **Type Hinting** (anotaciones de tipo).
Indica qué tipo de datos espera recibir cada parámetro y qué tipo de datos devolverá la función.

Sintaxis:
```python
def nombre_funcion(parametro1: tipo, parametro2: tipo) -> tipo_retorno:
    ...
```

Ejemplo:
```python
def calcular_area_rectangulo(base: float, altura: float) -> float:
    """Calcula el área de un rectángulo dados su base y altura."""
    return base * altura

# El código funciona igual, pero VS Code y FastAPI entienden perfectamente los tipos
area: float = calcular_area_rectangulo(5.0, 3.2)
print(area)  # 16.0
```

:::tip ¿POR QUÉ USAR TYPE HINTING EN IA?
1. **Validación automática**: Frameworks web de IA como **FastAPI** usan estas anotaciones para validar los datos que llegan por HTTP automáticamente.
2. **Autocompletado en VS Code**: Permite que el editor sugiera los métodos y atributos correctos del tipo de dato sin cometer errores de sintaxis.
:::

---

### Valores de retorno (`return`)

Una función puede **devolver un valor** usando la palabra clave `return`.

```python
def sumar(a: int, b: int) -> int:
    return a + b

resultado = sumar(5, 3)
print(resultado)   # 8
```

:::warning Importante
Cuando una función ejecuta `return`, **termina inmediatamente** y devuelve el valor indicado. El código que haya debajo nunca se ejecutará.
:::

#### Funciones que devuelven varios valores

En Python, una función puede **devolver varios valores a la vez** separándolos con comas.
Internamente, Python los agrupa y devuelve en una **tupla**:

```python
def evaluar_modelo(y_true: list, y_pred: list) -> tuple:
    precision = 0.95
    recall = 0.90
    f1 = 0.92
    return precision, recall, f1

# Desempaquetado directo en variables individuales
p, r, f = evaluar_modelo([], [])
print(f"Precisión: {p}, Recall: {r}, F1: {f}")
```

---

### Tipos de parámetros

#### 1. Posicionales y nombrados (keyword arguments)

```python
def dividir(numerador: float, denominador: float) -> float:
    return numerador / denominador

# Argumentos posicionales (el orden importa)
print(dividir(10, 2))  # 5.0

# Argumentos nombrados (el orden NO importa)
print(dividir(denominador=2, numerador=10))  # 5.0
```

#### 2. Valores por defecto

```python
def clasificar_texto(texto: str, umbral: float = 0.75) -> str:
    # Si no se especifica umbral, tomará 0.75 por defecto
    return "Aceptado" if len(texto) >= 10 else "Rechazado"

print(clasificar_texto("Hola"))                 # Rechazado
print(clasificar_texto("Texto largo de prueba")) # Aceptado
```

#### 3. Parámetros variables (`*args` y `**kwargs`)

* `*args` captura argumentos posicionales adicionales en una **tupla**.
* `**kwargs` captura argumentos nombrados adicionales (`clave=valor`) en un **diccionario**.

```python
def entrenar_modelo(nombre_modelo: str, *metricas, **hyperparametros):
    print(f"Modelo: {nombre_modelo}")
    print(f"Métricas solicitadas: {metricas}")  # Tupla
    print(f"Hiperparámetros: {hyperparametros}") # Diccionario

entrenar_modelo("ResNet50", "accuracy", "loss", lr=0.001, epochs=10)
```

**Salida:**
```text
Modelo: ResNet50
Métricas solicitadas: ('accuracy', 'loss')
Hiperparámetros: {'lr': 0.001, 'epochs': 10}
```

---

### Documentación: Docstrings

Explicación formal del propósito de la función encerrada en triple comilla:

```python
def preprocesar_prompt(prompt: str) -> str:
    """
    Limpia espacios sobrantes y convierte el prompt a minúsculas.
    
    Args:
        prompt (str): Texto de entrada del usuario.
        
    Returns:
        str: Texto saneado.
    """
    return prompt.strip().lower()
```

---

## Funciones Lambda (Anónimas)

Las **funciones lambda** son funciones pequeñas y anónimas que se definen en una sola línea.

Sintaxis:
```python
lambda argumentos: expresión
```

Ejemplo:
```python
doble = lambda x: x * 2
print(doble(5))   # 10

# Equivalente tradicional:
def doble(x):
    return x * 2
```

Se utilizan frecuentemente como funciones desechables para transformar o filtrar elementos en listas.

---

## Funciones de Orden Superior (`map`, `filter`)

Una **función de orden superior** es aquella que recibe otra función como argumento o devuelve una función.

### `map()`
Aplica una función a cada elemento de una lista o secuencia:

```python
numeros = [1, 2, 3, 4, 5]
cuadrados = list(map(lambda x: x**2, numeros))
print(cuadrados)  # [1, 4, 9, 16, 25]
```

### `filter()`
Filtra los elementos que cumplen una condición booleana (`True`):

```python
scores = [0.95, 0.42, 0.88, 0.31, 0.79]
altos = list(filter(lambda s: s >= 0.75, scores))
print(altos)  # [0.95, 0.88, 0.79]
```

---

## Decoradores (`@`)

Un **decorador** es una instrucción especial que comienza por el símbolo `@` y se coloca **justo encima** de la definición de una función.

> **Idea clave:** Un decorador añade una funcionalidad o comportamiento extra a una función existente **sin necesidad de modificar su código interno**.

:::important ENFOQUE DIDÁCTICO
En este curso **no necesitaremos programar decoradores desde cero**, pero sí es fundamental **aprender a identificarlos y usarlos**, ya que son la pieza central de frameworks como **FastAPI** y la programación orientada a objetos en Python.
:::

### Ejemplos comunes de uso de decoradores

#### 1. Rutas en FastAPI (Creación de APIs Web)
En FastAPI, indicamos qué función debe responder a una petición HTTP usando un decorador:

```python
# El decorador @app.get("/") le indica a FastAPI que esta función
# responderá cuando un usuario visite la raíz de la API Web.
@app.get("/")
def inicio():
    return {"mensaje": "Servidor de IA activo"}
```

#### 2. Métodos de clase en POO (`@staticmethod` y `@classmethod`)
En programación orientada a objetos, se usan decoradores integrados de Python para cambiar el comportamiento de los métodos:

```python
class ProcesadorTexto:
    
    @staticmethod
    def limpiar(texto: str) -> str:
        return texto.strip().lower()
```

#### 3. Propiedades (`@property`)
Permiten acceder a un método como si fuera un atributo simple de lectura:

```python
class ModeloIA:
    def __init__(self, exactitud: float):
        self._exactitud = exactitud
        
    @property
    def exactitud_porcentaje(self) -> str:
        return f"{self._exactitud * 100:.1f}%"
```

---

## Gestores de Contexto: El bloque `with`

El bloque `with` (gestor de contexto) permite manejar recursos externos (archivos, conexiones, sesiones) asegurando que **se liberen o cierren automáticamente al terminar**, incluso si ocurre un error durante la ejecución.

Sintaxis general:
```python
with recurso as variable:
    # Operaciones con el recurso
```

### Ejemplo clásico: Lectura y escritura de ficheros

```python
# Al salir del bloque 'with', Python cierra el archivo automáticamente
with open("dataset.txt", "w", encoding="utf-8") as archivo:
    archivo.write("Línea 1: Datos de entrenamiento\n")
    archivo.write("Línea 2: Datos de prueba\n")

print("Archivo escrito y cerrado correctamente.")
```

### Ejemplo en Inteligencia Artificial (PyTorch / Inference Context)
En librerías avanzadas de IA como PyTorch, `with` se usa para desactivar el cálculo de gradientes durante la inferencia para ahorrar memoria RAM/VRAM:

```python
# Desactiva el cálculo de gradientes temporalmente durante la predicción
with torch.no_grad():
    prediccion = modelo(datos_entrada)
```

</div>