---
title: "Programación Orientada a Objetos"
sidebar_position: 9
description: "Qué es la POO, sus conceptos principales (clases, objetos, atributos, métodos, herencia) y por qué es importante para librerías como scikit-learn, TensorFlow o Keras."
keywords: [Python, POO, clases, objetos, herencia, métodos, atributos, OOP, IA]
---

<div class="justify-text">

La **Programación Orientada a Objetos (POO)** es un **paradigma de programación** en el que el código se organiza en **“objetos”**.  
Un **objeto** combina dos cosas:

* **Datos** → que describen su estado (por ejemplo, el nombre o la edad de un alumno).  
* **Comportamientos** → que definen lo que puede hacer (por ejemplo, mostrar su nota o aprobar una asignatura).

En lugar de tener el código y los datos separados (como en la programación tradicional), la POO los agrupa en **una misma estructura coherente**.  
Esto facilita crear programas **más organizados, fáciles de mantener y de ampliar**.

Por ejemplo, un objeto `Perro` podría tener:

* **Datos (atributos):** nombre, raza, edad  
* **Comportamientos (métodos):** ladrar(), comer(), dormir()

La Programación Orientada a Objetos es la base de cómo están construidas muchas librerías modernas de **Inteligencia Artificial** como `scikit-learn`, `TensorFlow` o `Keras`.

---

## Ventajas de la POO

* 🔹 **Reutilización del código** → una vez creada una clase, se puede usar muchas veces.  
* 🔹 **Modularidad** → cada parte del programa es independiente (más fácil de probar y mejorar).  
* 🔹 **Mantenibilidad** → si cambias una clase, el resto del código apenas se ve afectado.  
* 🔹 **Abstracción** → puedes usar un objeto sin preocuparte por los detalles internos de cómo funciona.  
* 🔹 **Escalabilidad** → muy útil para proyectos grandes, como los de IA, donde hay muchos componentes conectados.

---

## POO en la IA

En librerías como **scikit-learn**, los modelos se crean a partir de **clases** (por ejemplo, `LinearRegression`, `DecisionTreeClassifier`, `KMeans`), que representan **objetos con métodos** como `fit()`, `predict()` o `score()`.

Por ejemplo:

```python
from sklearn.linear_model import LinearRegression

modelo = LinearRegression()   # crear un objeto (instancia)
modelo.fit(X_train, y_train)  # entrenar el modelo
predicciones = modelo.predict(X_test)
```

En este código:

* `LinearRegression` es una **clase**.
* `modelo` es un **objeto** (instancia de esa clase).
* `fit()` y `predict()` son **métodos** (funciones internas del objeto).

Por eso, entender la POO te ayudará a **entender mejor cómo funcionan las librerías de IA** y cómo crear tus propias estructuras reutilizables.

---

## Conceptos básicos

### Clase

Una **clase** es un **molde o plantilla** que define cómo serán los objetos que creemos a partir de ella: qué datos tendrán (**atributos**) y qué podrán hacer (**métodos**).

```python
class Perro:
    def __init__(self, nombre, edad, raza): # Constructor, en él definimos los atributos
        self.nombre = nombre    # atributo de instancia
        self.edad = edad
        self.raza = raza

    def ladrar(self):
        print(f"{self.nombre} dice: ¡Guau!")
```

:::info ¿Qué es `self`?
`self` representa **al propio objeto** que se está creando o usando. Gracias a él, cada método puede acceder a los **atributos y métodos del mismo objeto**.

Por ejemplo, en el constructor:

```python
self.nombre = nombre
```

el self indica que el valor del parámetro `nombre` debe guardarse **dentro del objeto**, como un atributo llamado `nombre`.

**Siempre hay que poner self como primer parámetro del constructor y de cualquier método de instancia.**
:::

---

### Objeto (instancia)

Un **objeto** es un **ejemplar concreto** de una clase.

```python
mi_perro = Perro("Pipo", 2, "Bodeguero")
mi_perro.ladrar()
# Pipo dice: ¡Guau!
```

Cada objeto tiene sus **propios valores** de los atributos (`nombre`, `edad`, `raza`), aunque todos comparten la misma estructura definida en la clase.

| Concepto | Clase | Objeto |
|-----------|--------|--------|
| **Representa...** | El **molde o plantilla** a partir del cual se crean los objetos. | Un **ejemplar concreto** creado a partir de la clase. |
| **Qué es** | Una **definición genérica** (describe cómo será un perro). | Un **perro real con datos propios**. |
| **Imagen** | ![Ejemplo clase](./0-img/ejemplo_clase.webp) | ![Ejemplo objeto](./0-img/ejemplo_objeto.jpg) Pipo, 2 años, bodeguero |


---

### Constructor

El método `__init__()` es un **constructor**: se ejecuta automáticamente al **crear un nuevo objeto**.
Sirve para inicializar los atributos con valores.

```python
class Coche:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo
```

```python
mi_coche = Coche("Tesla", "Model 3")
print(mi_coche.marca)   # Tesla
```

---

### Atributos y métodos

| Tipo         | Descripción                                     | Ejemplo                    |
| ------------- | ----------------------------------------------- | -------------------------- |
| **Atributo** | Variable que guarda datos del objeto.           | `self.nombre`, `self.edad` |
| **Método**   | Función dentro de la clase que define acciones. | `def ladrar(self): ...`    |

Los **atributos** almacenan la información de cada objeto (sus características),  
mientras que los **métodos** indican qué puede hacer ese objeto (sus acciones).

```python
class Estudiante:
    def __init__(self, nombre, nota):
        self.nombre = nombre
        self.nota = nota

    def mostrar_info(self):
        print(f"{self.nombre} tiene una nota de {self.nota}")
```

```python
alumno = Estudiante("Ana", 9.2)
alumno.mostrar_info()
# Ana tiene una nota de 9.2
```

---

#### Acceso y modificación de atributos

Una vez creada la instancia, se pueden **consultar y cambiar los valores de los atributos** directamente,
igual que si fueran variables normales:

```python
alumno = Estudiante("Ana", 9.2)
print(alumno.nombre)   # accedemos al atributo

alumno.nota = 9.8      # modificamos el atributo
alumno.mostrar_info()  # Ana tiene una nota de 9.8
```

Esto es **totalmente válido y la forma más común en Python**, incluso en librerías de IA como *scikit-learn* o *TensorFlow*,
donde los atributos de los modelos (por ejemplo `coef_`, `weights`, `layers`, etc.) se acceden directamente.

:::info Visibilidad de los atributos (convenciones)

Python no tiene modificadores de acceso estrictos (`public`, `private`...),
pero se usan guiones bajos para **indicar la intención**:

| Notación     | Significado                            | Ejemplo         |
| ------------ | -------------------------------------- | --------------- |
| `atributo`   | Público (puede usarse libremente)      | `alumno.nombre` |
| `_atributo`  | Protegido (uso interno o en subclases) | `alumno._nota`  |
| `__atributo` | Privado (ocultado por Python)          | `alumno.__dni`  |

En la práctica, **casi siempre se usan atributos públicos**, especialmente en proyectos de IA.
La encapsulación (ocultar o proteger atributos) se reserva para casos más avanzados.
:::

---

#### Valores por defecto en los atributos

En algunos casos, queremos que un objeto pueda crearse **aunque no se indiquen todos los valores**.  
Para ello, podemos asignar **valores por defecto** a los parámetros del constructor (`__init__`).

```python
class Estudiante:
    def __init__(self, nombre, nota=5.0, curso="1º IA"):
        self.nombre = nombre
        self.nota = nota
        self.curso = curso

    def mostrar_info(self):
        print(f"{self.nombre} ({self.curso}) tiene una nota de {self.nota}")
```

De esta forma, el constructor puede llamarse **con o sin algunos argumentos**:

```python
# Se pasan todos los parámetros
alumno1 = Estudiante("Ana", 9.2, "2º IA")

# Se omiten los que tienen valor por defecto
alumno2 = Estudiante("Luis")  

alumno1.mostrar_info()  # Ana (2º IA) tiene una nota de 9.2
alumno2.mostrar_info()  # Luis (1º IA) tiene una nota de 5.0
```

:::info
✅ Esto permite crear objetos **más flexibles** sin necesidad de definir varios constructores,
ya que en Python **solo puede existir un método `__init__` por clase**.
:::

---

### Método especial: `__str__`

Python tiene varios **métodos con doble guion bajo (`__`)**, llamados **“métodos mágicos”** o **“dunder methods”** (de *double underscore*).
Permiten definir **comportamientos personalizados**.

El método especial `__str__()` define **cómo se muestra un objeto al convertirlo en texto**, por ejemplo al usar `print()`.

```python
class Perro:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

    def __str__(self):
        return f"El perro {self.nombre} tiene {self.edad} años"

p = Perro("Pipo", 2)
print(p)   # El perro Pipo tiene 2 años
```

Sin `__str__`, Python mostraría algo como `<__main__.Perro object at 0x0000023AB...>`.

---

### Documentación con *docstring*

Una **docstring** es una **cadena de texto entre comillas triples (`""" ... """`)** que se coloca justo debajo de la definición de una clase o método.  
Sirve para **documentar qué hace** y **cómo se usa**, y se puede consultar con la función `help()`.

```python
class Estudiante:
    """Representa a un estudiante con nombre y nota."""

    def __init__(self, nombre, nota):
        """Inicializa el estudiante con su nombre y nota."""
        self.nombre = nombre
        self.nota = nota

    def mostrar_info(self):
        """Muestra por pantalla el nombre y la nota del estudiante."""
        print(f"{self.nombre} tiene una nota de {self.nota}")
```

Podemos ver la documentación con:

```python
help(Estudiante)
```

:::tip Buenas prácticas

* Usa **docstrings cortas y claras**, que expliquen *qué hace* la clase o método.
* No repitas el código en palabras; describe su **propósito o uso**.
* Las docstrings son muy útiles para **entender clases complejas** en librerías de IA como *scikit-learn* o *TensorFlow*.

:::


</div>