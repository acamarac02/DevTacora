---
draft: true
---

# Draft de Estructura y Programación: UT2 — Python para IA (Flask/FastAPI + Docker)

**Duración total:** 34 horas lectivas  
**Entorno principal:** VS Code (Local) + Docker Desktop  
**Enfoque pedagógico:** Práctico, progresivo y orientado a la ingeniería de IA. Evitar conceptos complejos o abstractos que no vayan a ser utilizados durante el resto del módulo.

---

## Esquema de Contenidos por Sesión

### 🟢 Bloque 1: Sintaxis y Fundamentos de Python (Sesiones 1 a 3)

#### **Sesión 1: Introducción, Entorno Local, Fundamentos y Estructuras de Control**
* **Contenidos:**
  * Introducción a Python 3.12 y su rol en la IA.
  * Puesta en marcha del entorno local: VS Code, intérprete Python, entorno virtual (`venv`), gestor de paquetes (`pip`) y archivo de dependencias (`requirements.txt`).
  * Fundamentos de sintaxis: variables, tipos de datos primarios (int, float, str, bool), operadores y f-strings.
  * Estructuras de control: condicionales (`if`, `elif`, `else`) y bucles (`for`, `while`, `range()`, `enumerate()`).
* **Criterio de simplicidad (A evitar):** Formateo antiguo de cadenas (`%` o `.format()`), manipulación avanzada de bits.

#### **Sesión 2: Estructuras de Datos Nativas**
* **Contenidos:**
  * Colecciones principales: Listas (`list`), Diccionarios (`dict`), Tuplas (`tuple`) y Conjuntos (`set`).
  * Métodos de uso frecuente (`append`, `extend`, `get`, `keys`, `values`, `items`).
  * Acceso y manipulación mediante *slicing* `[start:stop:step]`.
  * Comprensiones básicas: *list comprehensions* y *dict comprehensions*.
* **Criterio de simplicidad (A evitar):** Operaciones algebraicas complejas con conjuntos o iteradores/generadores personalizados manuales.

#### **Sesión 3: Funciones, Módulos/Imports y Manejo de Excepciones**
* **Contenidos:**
  * Declaración de funciones (`def`), parámetros por defecto y retornos múltiples.
  * Parámetros flexibles (`*args`, `**kwargs`) y funciones anónimas (`lambda`).
  * Módulos e importaciones: organización de archivos, `import` y `from ... import`.
  * Introducción al **Type Hinting** (tipado estático moderno).
  * Manejo de excepciones: estructuras `try`, `except`, `finally`, `else` y bloque `with` (Context Managers).
* **Criterio de simplicidad (A evitar):** Creación de decoradores propios complejos o jerarquías profundas de excepciones personalizadas.

---

### 🟡 Bloque 2: Programación Orientada a Objetos (Sesiones 4 y 5)

#### **Sesión 4: POO Básica**
* **Contenidos:**
  * Conceptos fundamentales: Clases e Instancias.
  * Definición de clases en Python y el método constructor `__init__`.
  * Atributos de instancia, el parámetro `self` y métodos de clase básicos.
* **Criterio de simplicidad (A evitar):** Convenciones complejas de visibilidad privada/protegida (`__variable`).

#### **Sesión 5: POO Avanzada y Modelado de Datos**
* **Contenidos:**
  * Herencia simple: reutilización y extensión de métodos.
  * Métodos decorados: `@classmethod` y `@staticmethod`.
  * Representación limpia con dunder métodos (`__str__`, `__repr__`).
  * Introducción a **DataClasses** / esquemas tipados como puente hacia la validación de datos.
* **Criterio de simplicidad (A evitar):** Herencia múltiple, metaclases (`type`), `__new__` o `__slots__`.

---

### 🔵 Bloque 3: Introducción al Ecosistema Científico (Sesiones 6 y 7)

#### **Sesión 6: NumPy Básico**
* **Contenidos:**
  * Arrays de NumPy (`ndarray` 1D y 2D), creación (`np.array`, `np.zeros`, `np.ones`, `np.arange`).
  * Inspección de forma y dimensiones (`shape`, `ndim`, `dtype`).
  * Indexación, slicing 2D y operaciones vectorizadas elementales (+, -, *, /).
* **Criterio de simplicidad (A evitar):** Álgebra lineal avanzada (`np.linalg`), broadcasting complejo o manipulación de tensores a mano.

#### **Sesión 7: Pandas Básico**
* **Contenidos:**
  * Estructuras de datos principales: `Series` y `DataFrame`.
  * Lectura e inspección de datasets (`read_csv`, `read_json`, `head()`, `info()`, `describe()`).
  * Selección de columnas y filtrado condicional básico (`df[df['col'] > x]`).
* **Criterio de simplicidad (A evitar):** Limpieza de nulos, imputaciones, `groupby` complejo o tablas dinámicas (se tratarán a fondo en la **UT3**).

---

### 🟣 Bloque 4: APIs REST y Contenedorización (Sesiones 8 a 10)

#### **Sesión 8: Arquitectura REST, Protocolo HTTP y FastAPI**
* **Contenidos:**
  * Fundamentos de arquitectura REST y protocolo HTTP (verbos GET/POST, códigos de estado 200/400/404/500 y JSON).
  * Primeros pasos con **FastAPI**: creación del servidor y definición de rutas básicas (`@app.get("/")`, `@app.post("/predict")`).
  * Pruebas de consumo desde clientes HTTP (Postman, Thunder Client en VS Code o cURL).
* **Criterio de simplicidad (A evitar):** Conexiones a bases de datos relacionales con ORMs (SQLAlchemy) o sistemas de autenticación complejas (OAuth2/JWT).

#### **Sesión 9: Pydantic v2 y Autodocumentación con Swagger UI**
* **Contenidos:**
  * Validación estricta de esquemas de datos con **Pydantic v2** (`BaseModel`, tipos de campos y restricciones con `Field`).
  * Integración de modelos Pydantic como cuerpo de petición en FastAPI.
  * Exploración y prueba interactiva de la documentación OpenAPI / Swagger UI en `/docs`.
* **Criterio de simplicidad (A evitar):** Validadores personalizados complejos con dependencias externas o middleware de transformación pesada.

#### **Sesión 10: Despliegue en Docker y Consumo desde Frontend**
* **Contenidos:**
  * Conceptos básicos de contenedorización: Imagen vs Contenedor.
  * Escritura de un `Dockerfile` limpio para Python (`FROM python:3.12-slim`, `COPY`, `RUN pip`, `CMD uvicorn`).
  * Comandos principales: `docker build` y `docker run -p 8000:8000`.
  * Habilitación de **CORS** en FastAPI (`CORSMiddleware`).
  * Consumo del contenedor desde una cliente externo o página web HTML/JS sencilla con `fetch()`.
* **Criterio de simplicidad (A evitar):** Orquestaciones complejas de múltiples servicios con Kubernetes o despliegues en servidores cloud de pago.
