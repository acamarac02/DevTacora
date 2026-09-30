---
title: "Programación Orientada a Objetos"
sidebar_position: 1
description: "Conceptos fundamentales de la POO en Python: clases, objetos, constructor __init__, self, atributos, métodos y uso en librerías de IA como scikit-learn."
keywords: [Python, POO, clases, objetos, init, self, métodos, atributos, scikit-learn]
---

<div class="justify-text">

La **Programación Orientada a Objetos (POO)** es un **paradigma de programación** en el que el código se organiza en **“objetos”**.  
Un **objeto** combina dos aspectos clave:

* **Datos (Atributos)** → describen su estado (por ejemplo, el nombre, la edad o el rol de un usuario).  
* **Comportamientos (Métodos)** → definen las acciones que puede realizar (por ejemplo, calcular una media o realizar una predicción).

En lugar de tener el código y los datos separados, la POO los agrupa en **estructuras independientes y reutilizables**.

```
[ OBJETO ] = Datos (Atributos) + Acciones (Métodos)
```

La Programación Orientada a Objetos es la base sobre la que están construidas la mayoría de librerías modernas de **Inteligencia Artificial y Ciencia de Datos** como `scikit-learn`, `TensorFlow` o `PyTorch`.

---

## Ventajas de la POO

* 🔹 **Reutilización de código** → una vez creada una clase, se pueden instanciar múltiples objetos a partir de ella.  
* 🔹 **Modularidad** → cada clase gestiona su propia lógica interna de forma independiente.  
* 🔹 **Mantenibilidad** → modificar el funcionamiento de una clase no altera el resto del programa.  
* 🔹 **Abstracción** → permite utilizar un modelo u objeto sin necesidad de conocer la complejidad de sus algoritmos internos.

---

## Uso de la POO en Inteligencia Artificial

En librerías de IA como **scikit-learn**, los modelos de aprendizaje automático son **clases** (por ejemplo, `LinearRegression`, `DecisionTreeClassifier`, `KMeans`).  
Para utilizarlos, creamos **objetos (instancias)** y llamamos a sus **métodos** principales:

```python
from sklearn.linear_model import LinearRegression

# 1. Crear un objeto (instancia de la clase)
modelo = LinearRegression()

# 2. Llamar a métodos de la instancia
modelo.fit(X_train, y_train)           # Entrenar el modelo
predicciones = modelo.predict(X_test)  # Realizar predicciones
```

En este código:
* `LinearRegression` es la **clase** (la plantilla).
* `modelo` es el **objeto** (la instancia concreta).
* `fit()` y `predict()` son los **métodos** de la clase.

---

## Conceptos Fundamentales

### 1. Clase

Una **clase** es el **molde o plantilla** que define qué datos tendrán los objetos (**atributos**) y qué acciones podrán realizar (**métodos**).

```python
class Perro:
    def __init__(self, nombre: str, edad: int, raza: str):
        # Atributos de instancia
        self.nombre: str = nombre
        self.edad: int = edad
        self.raza: str = raza

    def ladrar(self) -> None:
        print(f"{self.nombre} dice: ¡Guau!")
```

:::info ¿Qué representa `self`?
`self` hace referencia **al propio objeto concreto** que se está creando o utilizando en ese momento.
Permite que cada método pueda acceder y modificar los atributos específicos de esa instancia.

* En la definición del constructor: `self.nombre = nombre` guarda el parámetro dentro de la instancia.
* **El parámetro `self` debe ser siempre el primer parámetro del constructor y de los métodos de instancia.**
:::

---

### 2. Objeto (Instancia)

Un **objeto** es un **ejemplar concreto** creado a partir de una clase.

```python
mi_perro = Perro("Pipo", 2, "Bodeguero")
mi_perro.ladrar()  # Pipo dice: ¡Guau!
```

Cada objeto mantiene sus **propios valores independientes** en los atributos (`nombre`, `edad`, `raza`), aunque todos compartan la misma estructura definida en la clase.

| Concepto | Clase | Objeto |
| :--- | :--- | :--- |
| **Definición** | La **plantilla o molde** genérico. | Un **ejemplar concreto** con datos reales. |
| **Ejemplo** | La clase `Estudiante`. | El alumno `Ana` con nota `9.2`. |

---

### 3. El Constructor (`__init__`)

El método `__init__()` es el **constructor** de la clase. Se ejecuta **automáticamente** cada vez que se instancia un nuevo objeto y sirve para inicializar sus atributos.

```python
class Coche:
    def __init__(self, marca: str, modelo: str):
        self.marca: str = marca
        self.modelo: str = modelo

# Invocación automática de __init__
mi_coche = Coche("Tesla", "Model 3")
print(mi_coche.marca)  # Tesla
```

---

### 4. Atributos y Métodos

* **Atributo**: Variable asociada a un objeto que guarda su información.
* **Método**: Función definida dentro de la clase que realiza acciones utilizando sus atributos.

```python
class Estudiante:
    def __init__(self, nombre: str, nota: float):
        self.nombre: str = nombre
        self.nota: float = nota

    def mostrar_info(self) -> None:
        print(f"Estudiante: {self.nombre} | Nota: {self.nota}")

    def ha_aprobado(self) -> bool:
        return self.nota >= 5.0
```

```python
alumno = Estudiante("Ana", 9.2)
alumno.mostrar_info()          # Estudiante: Ana | Nota: 9.2
print(alumno.ha_aprobado())    # True
```

---

### Acceso y Modificación de Atributos

En Python, los atributos de un objeto se pueden **consultar y modificar directamente** mediante la notación de punto (`objeto.atributo`):

```python
alumno = Estudiante("Ana", 4.5)

# Modificar el atributo directamente
alumno.nota = 6.0
print(alumno.ha_aprobado())  # True
```

:::info CONVENCIÓN DE VISIBILIDAD
En Python no existen modificadores de acceso estrictos (como `public` o `private` en Java/C#). Por convención:
* `atributo`: Atributo público (forma habitual en desarrollo con Python e IA).
* `_atributo`: Atributo pensado para uso interno dentro de la clase o sus subclases.
:::

---

### Parámetros por Defecto en el Constructor

Es habitual asignar valores por defecto en el método `__init__` para permitir instanciar objetos con o sin ciertos argumentos:

```python
class Estudiante:
    def __init__(self, nombre: str, nota: float = 5.0, curso: str = "1º IA"):
        self.nombre: str = nombre
        self.nota: float = nota
        self.curso: str = curso

    def mostrar_info(self) -> None:
        print(f"{self.nombre} ({self.curso}) - Nota: {self.nota}")

# Instanciación con valores por defecto
estudiante_defecto = Estudiante("Luis")
estudiante_defecto.mostrar_info()  # Luis (1º IA) - Nota: 5.0
```

---

### El Método Especial `__str__`

El método especial `__str__()` define **cómo debe representarse el objeto al convertirlo en texto** (por ejemplo, al pasarlo a la función `print()` o a un *f-string*).

```python
class Perro:
    def __init__(self, nombre: str, edad: int):
        self.nombre: str = nombre
        self.edad: int = edad

    def __str__(self) -> str:
        return f"Perro(Nombre: {self.nombre}, Edad: {self.edad} años)"

p = Perro("Pipo", 2)
print(p)  # Perro(Nombre: Pipo, Edad: 2 años)
```

Sin el método `__str__`, al imprimir un objeto se mostraría su dirección de memoria interna (ej. `<__main__.Perro object at 0x7f... >`).

---

### Documentación de Clases (Docstrings)

Las clases y sus métodos deben documentarse utilizando triple comilla (`""" ... """`) justo debajo de su cabecera:

```python
class ModeloPrediccion:
    """Clase para almacenar las predicciones y métricas de un modelo IA."""

    def __init__(self, nombre_modelo: str):
        """Inicializa el modelo con su nombre identificativo."""
        self.nombre_modelo: str = nombre_modelo
        self.metricas: dict = {}

    def registrar_metrica(self, nombre: str, valor: float) -> None:
        """Registra una nueva métrica obtenida tras el entrenamiento."""
        self.metricas[nombre] = valor
```

</div>