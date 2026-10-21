---
title: "Primeros pasos con FastAPI"
sidebar_position: 2
description: "Creación de un servidor básico con FastAPI, ejecución con Uvicorn en modo recarga, uso de Swagger UI y gestión de parámetros de ruta y consulta."
keywords: [FastAPI, Uvicorn, Swagger, OpenAPI, GET, endpoints, path parameters, query parameters]
---

<div class="justify-text">

En este capítulo crearemos una primera API con FastAPI, la ejecutaremos en local con **Uvicorn** y utilizaremos su **documentación interactiva automática**.

---

## 1. Creación de la primera API (`app.py`)

Crea un archivo llamado `app.py` en tu espacio de trabajo y añade el siguiente código:

```python
from fastapi import FastAPI

# 1. Instanciamos la aplicación FastAPI
app = FastAPI(
    title="API de Introducción a la IA",
    description="Servicio web para consultar el estado del sistema y realizar pruebas de endpoints",
    version="1.0.0"
)

# 2. Definimos nuestro primer endpoint (Ruta raíz)
@app.get("/")
def ruta_raiz():
    """
    Endpoint principal de bienvenida.
    Devuelve un mensaje en formato JSON.
    """
    return {
        "mensaje": "¡Bienvenido a la API de Inteligencia Artificial!",
        "version": "1.0.0",
        "estado": "operativo"
    }

# 3. Endpoint de comprobación de salud del servicio (Health Check)
@app.get("/health")
def estado_servicio():
    return {
        "estado": "OK",
        "memoria_disponible": "85%",
        "modelos_cargados": 0
    }
```

### ¿Qué hace este código?
1. `app = FastAPI(...)`: Crea el núcleo de nuestra aplicación web.
2. `@app.get("/")`: Es un **decorador** que le indica a FastAPI: *"Cuando alguien haga una petición HTTP con el método GET a la ruta raíz `/`, ejecuta la función `ruta_raiz()` y devuelve su resultado en formato JSON"*.
3. En Python tradicional retornaríamos un diccionario; FastAPI se encarga de convertir ese diccionario en una respuesta HTTP en formato **JSON** automáticamente.

---

## 2. Ejecutar el servidor con Uvicorn

Para poner en marcha nuestro servidor, abrimos la terminal integrada de VS Code en la misma carpeta donde se encuentra `app.py` y ejecutamos el siguiente comando:

```bash
uvicorn app:app --reload
```

### Desglose del comando:
* `app`: Hace referencia al nombre del archivo Python (`app.py`).
* `app`: Hace referencia al nombre de la variable que contiene la instancia `app = FastAPI()`.
* `--reload`: **Modo desarrollo activo**. Cada vez que modifiques el código de `app.py` y pulses `Ctrl + S`, el servidor detectará los cambios y se reiniciará automáticamente en menos de un segundo sin que tengas que parar y arrancar manualmente la terminal.

En la terminal aparecerá una salida similar a esta:

```text
INFO:     Will watch for changes in these directories: ['/mi-proyecto']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started re-loader process [PID 12345]
INFO:     Started server process [PID 12346]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

Si abres tu navegador web e introduces la dirección **`http://127.0.0.1:8000`** (o `http://localhost:8000`), verás en pantalla el JSON devuelto por la función:

```json
{
  "mensaje": "¡Bienvenido a la API de Inteligencia Artificial!",
  "version": "1.0.0",
  "estado": "operativo"
}
```

---

## 3. Documentación Swagger UI (`/docs`)

Una característica destacada de FastAPI es la generación automática de **documentación interactiva** a partir de las definiciones de tipos y rutas del código.

Con el servidor en marcha, abre en tu navegador:

👉 **`http://127.0.0.1:8000/docs`**

Verás la interfaz de **Swagger UI**:

```
+-------------------------------------------------------------+
| API de Introducción a la IA                         v1.0.0  |
| Servicio web para consultar el estado del sistema...        |
| [ OpenAPI specification ]                                   |
+-------------------------------------------------------------+
| default                                                     |
|                                                             |
| [GET] /               Endpoint principal de bienvenida.     |
| [GET] /health         Estado servicio                       |
+-------------------------------------------------------------+
```

### ¿Cómo probar un endpoint desde Swagger?
1. Haz clic sobre cualquiera de las rutas (por ejemplo `[GET] /health`).
2. Pulsa en el botón superior derecho que dice **"Try it out"**.
3. Pulsa el botón azul **"Execute"**.
4. Justo debajo verás la respuesta real que ha devuelto el servidor: el código de estado (`200 OK`) y el cuerpo JSON resultante.

:::info Documentación técnica
FastAPI también proporciona una vista alternativa de documentación técnica pensada para lectura en **`http://127.0.0.1:8000/redoc`**.
:::

---

## 4. Parámetros de ruta (*Path Parameters*)

En ocasiones queremos que la propia URL contenga un dato dinámico, por ejemplo el identificador numérico de un modelo o de un usuario registrado (`/modelos/1`, `/modelos/2`).

Añade este nuevo endpoint a tu `app.py`:

```python
@app.get("/modelos/{modelo_id}")
def obtener_informacion_modelo(modelo_id: int):
    """
    Devuelve la información de un modelo según su identificador numérico.
    """
    catalogo = {
        1: {"nombre": "Clasificador_Clientes", "algoritmo": "RandomForest", "precision": 0.92},
        2: {"nombre": "Detector_Anomalias", "algoritmo": "IsolationForest", "precision": 0.88}
    }
    
    if modelo_id in catalogo:
        return {"encontrado": True, "modelo": catalogo[modelo_id]}
    
    return {"encontrado": False, "mensaje": "Modelo no disponible en el catálogo"}
```

### El tipado en FastAPI:
Observa que hemos anotado el parámetro como entero: `modelo_id: int`.
* Si entras a `http://127.0.0.1:8000/modelos/1`, FastAPI convierte automáticamente el string `"1"` de la URL en el número entero `1`.
* Si intentas acceder a `http://127.0.0.1:8000/modelos/texto_invalido`, FastAPI detecta que no es un entero y responde automáticamente con un error **`422 Unprocessable Entity`**, explicando con exactitud en qué punto falló la petición sin que el servidor se caiga.

---

## 5. Parámetros de consulta (*Query Parameters*)

Los parámetros de consulta son aquellos que se añaden al final de la URL tras el carácter `?` y se separan con `&` (por ejemplo: `http://127.0.0.1:8000/predicciones?limite=5&orden=desc`).

Se definen como argumentos de la función de Python que **no** forman parte de la ruta del decorador:

```python
@app.get("/predicciones/")
def consultar_historial(limite: int = 10, categoria: str = "general"):
    """
    Simula la consulta de predicciones con paginación y filtro opcional.
    """
    return {
        "limite_solicitado": limite,
        "categoria_filtro": categoria,
        "total_registros": 45
    }
```

* Si llamas a `/predicciones/`, tomará los valores por defecto (`limite=10`, `categoria="general"`).
* Si llamas a `/predicciones/?limite=20&categoria=finanzas`, tomará los valores indicados en la URL.

En el siguiente capítulo se aborda cómo recibir estructuras de datos en formato JSON mediante peticiones **`POST`** y validarlas utilizando **Pydantic**.

</div>
