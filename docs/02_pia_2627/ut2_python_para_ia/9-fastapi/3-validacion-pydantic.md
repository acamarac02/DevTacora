---
title: "Validación con Pydantic"
sidebar_position: 3
description: "Modelado y validación de datos en FastAPI mediante Pydantic v2, uso de BaseModel y Field, control de tipos y endpoints POST para inferencia."
keywords: [FastAPI, Pydantic, BaseModel, Field, POST, validacion, JSON, schema, IA]
---

<div class="justify-text">

En el despliegue de servicios web de Inteligencia Artificial, es necesario validar la estructura e integridad de los datos que envía el cliente antes de procesarlos.

Un modelo de *Machine Learning* espera valores numéricos en tipos y rangos determinados. Si una petición incluye valores incompatibles (como texto en campos numéricos o valores ausentes), el intérprete de Python generará excepciones no controladas.

FastAPI resuelve esta necesidad integrando de forma nativa **Pydantic**, la librería estándar para definición de esquemas y validación de datos en Python.

---

## 1. ¿Qué es Pydantic y cómo funciona `BaseModel`?

Pydantic permite definir la **"forma" y las reglas exactas** que debe cumplir un paquete de datos mediante clases de Python que heredan de `BaseModel`.

```python
from pydantic import BaseModel

class SolicitudCredito(BaseModel):
    nombre: str
    edad: int
    ingresos_mensuales: float
    tiene_aval: bool = False  # Valor por defecto opcional
```

Al definir esta clase, Pydantic se encarga automáticamente de:
* **Comprobar los tipos:** Verifica que `edad` sea un entero, `ingresos_mensuales` un número con decimales, etc.
* **Coerción inteligente de datos:** Si el cliente envía `"35"` (texto), Pydantic lo convertirá automáticamente a `35` (entero). Si el valor es incompatible (por ejemplo `"treinta y cinco"`), rechazará la petición.
* **Documentación automática:** Swagger UI leerá este modelo y creará un formulario interactivo con un JSON de ejemplo para que cualquiera pueda probarlo.

---

## 2. Validaciones avanzadas con `Field` y campos opcionales

Además de verificar el tipo de dato, en proyectos de IA es habitual imponer **reglas de dominio** (por ejemplo, que la edad no sea negativa o que un porcentaje esté entre 0 y 100).

Para ello utilizamos la función `Field` de Pydantic junto con el sistema de tipado estándar de Python.

---

### Campos obligatorios frente a campos opcionales

Por defecto, cualquier atributo declarado en un modelo Pydantic es **obligatorio**. Si el cliente envía un JSON donde falta dicho campo, la petición es rechazada con un código `422`.

Para indicar que un campo es **opcional**, se combina el tipo con `None` utilizando el operador de unión `|` (estándar desde Python 3.10) y asignando `None` como valor por defecto:

```python
from pydantic import BaseModel, Field

class Solicitud(BaseModel):
    # Campo obligatorio: no tiene valor por defecto
    usuario_id: int
    
    # Campo opcional sin restricciones: toma None si el cliente no lo envía
    observaciones: str | None = None
    
    # Campo opcional con validación de rango numérico
    descuento_aplicado: float | None = Field(default=None, ge=0.0, le=1.0)
    
    # Campo con valor por defecto predeterminado (no requiere None)
    notificaciones_activas: bool = Field(default=True)
```

---

### Listado de validaciones más frecuentes con `Field`

A continuación se detallan los parámetros más utilizados según el tipo de dato:

#### 1. Validaciones para números (`int`, `float`)

| Parámetro | Significado | Ejemplo | Descripción |
| :--- | :--- | :--- | :--- |
| **`gt`** | Mayor que estricto ($>$) | `Field(gt=0)` | El número debe ser estrictamente positivo. |
| **`ge`** | Mayor o igual ($\ge$) | `Field(ge=18)` | Por ejemplo, para exigir mayoría de edad. |
| **`lt`** | Menor que estricto ($<$) | `Field(lt=100)` | El número debe ser estrictamente menor que 100. |
| **`le`** | Menor o igual ($\le$) | `Field(le=1.0)` | Habitual para acotar probabilidades o ratios entre 0 y 1. |
| **`multiple_of`** | Múltiplo de | `Field(multiple_of=5)` | El valor debe ser múltiplo exacto del número indicado. |

#### 2. Validaciones para cadenas de texto (`str`)

| Parámetro | Significado | Ejemplo | Descripción |
| :--- | :--- | :--- | :--- |
| **`min_length`** | Longitud mínima | `Field(min_length=3)` | Evita textos vacíos o con longitud insuficiente. |
| **`max_length`** | Longitud máxima | `Field(max_length=100)` | Limita la longitud máxima de caracteres aceptados. |
| **`pattern`** | Expresión regular | `Field(pattern=r"^[A-Z]{3}-\d{4}$")` | Obliga a que el texto cumpla un formato o patrón específico. |

#### 3. Metadatos y documentación en Swagger UI

| Parámetro | Significado | Ejemplo | Descripción |
| :--- | :--- | :--- | :--- |
| **`default`** | Valor por defecto | `Field(default=0)` | Valor asignado si el cliente no envía el campo en el JSON. |
| **`description`** | Descripción técnica | `Field(description="...")` | Aparece como texto explicativo en `/docs`. |
| **`examples`** | Ejemplo para Swagger | `Field(examples=[25.5])` | Autocompleta el formulario de prueba en `/docs`. |

---

### Ejemplo integrador

```python
from pydantic import BaseModel, Field

class DatosPaciente(BaseModel):
    # Campo obligatorio con restricción de longitud
    nombre: str = Field(min_length=2, max_length=50, description="Nombre del paciente")
    
    # Campos numéricos acotados en rangos válidos
    edad: int = Field(ge=0, le=120, description="Edad en años")
    presion_arterial: float = Field(gt=0.0, description="Presión sistólica")
    
    # Campo con valor por defecto
    fumador: bool = Field(default=False, description="Indica si es fumador habitual")
    
    # Campo opcional: admite texto o None si no se especifica
    alergias: str | None = Field(default=None, description="Alergias conocidas o None")
```

---

## 3. Creación de un endpoint `POST` para recibir datos

A diferencia del método `GET` (que solo consulta), el método **`POST`** se utiliza para enviar información en el cuerpo de la petición (*Request Body*) con el objetivo de procesarla o realizar un cálculo.

Observa cómo se integra el modelo Pydantic directamente en la función del endpoint:

```python
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="Servicio de Evaluación Médica")

# 1. Definimos el esquema de los datos que esperamos recibir
class DatosPaciente(BaseModel):
    nombre: str
    edad: int = Field(ge=0, le=120)
    glucosa: float = Field(gt=0)
    fumador: bool = False

# 2. Definimos el endpoint POST
@app.post("/evaluar-riesgo")
def evaluar_riesgo(paciente: DatosPaciente):
    """
    Recibe los datos del paciente y calcula una estimación de riesgo.
    """
    # Accedemos a los datos validados como atributos normales del objeto
    nivel_riesgo = "Bajo"
    
    # Lógica de cálculo (en unidades posteriores aquí llamaremos al modelo de IA)
    if paciente.glucosa > 140 or (paciente.edad > 50 and paciente.fumador):
        nivel_riesgo = "Alto"
    elif paciente.glucosa > 100:
        nivel_riesgo = "Moderado"
        
    return {
        "paciente": paciente.nombre,
        "glucosa_registrada": paciente.glucosa,
        "diagnostico_estimado": nivel_riesgo,
        "requiere_atencion": nivel_riesgo == "Alto"
    }
```

### ¿Qué ocurre internamente cuando llega una petición a este endpoint?
1. FastAPI intercepta la petición HTTP y lee el cuerpo JSON.
2. Pasa los datos a `DatosPaciente`. Si el JSON no cumple las restricciones (por ejemplo, si falta el campo `glucosa` o se envía `edad: -5`), FastAPI frena la ejecución y devuelve un código **`422 Unprocessable Entity`** con un mensaje explicativo detallado:
   ```json
   {
     "detail": [
       {
         "loc": ["body", "edad"],
         "msg": "Input should be greater than or equal to 0",
         "type": "greater_than_equal"
       }
     ]
   }
   ```
3. Si los datos son válidos, ejecuta la función pasando el objeto `paciente` completamente limpio y listo para operar.

---

## 4. Tipar también la respuesta con `response_model`

Del mismo modo que exigimos una estructura estricta a los datos que entran, es una excelente práctica definir también un modelo Pydantic para los datos que **salen** de la API:

```python
# Esquema de salida
class ResultadoEvaluacion(BaseModel):
    paciente: str
    diagnostico_estimado: str
    requiere_atencion: bool

# Asignamos el esquema de respuesta en el decorador
@app.post("/evaluar-riesgo", response_model=ResultadoEvaluacion)
def evaluar_riesgo(paciente: DatosPaciente):
    ...
```

Ventajas de usar `response_model`:
* **Filtrado automático de datos internos:** Si la función maneja internamente variables intermedias del cálculo o datos privados que no deben exponerse al cliente, FastAPI descarta automáticamente cualquier clave que no esté declarada en el modelo de salida.
* **Documentación en Swagger:** La interfaz interactiva muestra con exactitud qué campos y tipos va a recibir el cliente en la respuesta HTTP.

:::info Filtrado de campos con response_model
Si dentro de la función de Python devuelves un diccionario con claves adicionales no declaradas en la clase:

```python
return {
    "paciente": paciente.nombre,
    "diagnostico_estimado": "Bajo",
    "requiere_atencion": False,
    "pesos_internos_calculo": [0.45, 0.88],  # Variable interna de cálculo
    "id_servidor": "SRV-01"                  # Dato de infraestructura interna
}
```

FastAPI serializará la respuesta descartando `pesos_internos_calculo` y `id_servidor`. El cliente web recibirá únicamente los campos definidos en `ResultadoEvaluacion`, evitando la exposición involuntaria de variables intermedias.
:::

---

En el siguiente capítulo se integran estos componentes en una aplicación completa con backend en FastAPI, control de **CORS** y consumo desde una interfaz web con **HTML y JavaScript**.

</div>
