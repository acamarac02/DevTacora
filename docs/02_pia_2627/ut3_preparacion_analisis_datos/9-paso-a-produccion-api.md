---
draft: true
title: "Paso a Producción"
sidebar_position: 9
toc_max_heading_level: 4
description: "Tutorial guiado de paso a producción: entrenamiento de un modelo KNN en Jupyter, serialización de artefactos con joblib y despliegue de una API REST con FastAPI integrando el preprocesador y el modelo."
keywords: ["FastAPI", "produccion", "despliegue", "KNN", "joblib", "Pipeline", "ColumnTransformer", "Machine Learning", "inferencia"]
---

<div class="justify-text">

En la sesión anterior conseguimos un hito fundamental: condensar todo el preprocesamiento de datos (imputación, escalado dual con `StandardScaler` y `RobustScaler`, y codificación categórica) en un único objeto `ColumnTransformer` serializado con `joblib`.

Sin embargo, un preprocesador por sí solo no resuelve el problema del negocio: **necesitamos un modelo entrenado capaz de generar predicciones y un canal para que cualquier aplicación (web, app móvil o CRM) pueda consultarlo en tiempo real**.

El objetivo de este tutorial guiado es completar el ciclo de vida del dato aprendiendo a:
1. **Entrenar un modelo de Machine Learning baseline** (K-Nearest Neighbors) directamente sobre la matriz final que obtuvimos de nuestro pipeline.
2. **Exportar tanto el preprocesador como el modelo entrenado** en archivos binarios independientes mediante `joblib`.
3. **Extraer la lógica determinista** a un script Python modular (`preprocesamiento.py`).
4. **Construir una API REST en FastAPI** que conecte todas las piezas: recibirá los datos brutos de un cliente en formato JSON, ejecutará la limpieza y el pipeline, calculará la predicción con el modelo y devolverá una respuesta estructurada con la probabilidad de abandono.

---

## Parte 1: Entrenamiento y exportación en el Notebook

Para esta primera parte, retomamos nuestro notebook de la sesión anterior (**`3_pipeline_columntransformer.ipynb`**). 

Al final del **Paso 4** obtuvimos dos matrices procesadas en formato DataFrame:
* `X_train_final`: Matriz de entrenamiento de 480 filas y 22 columnas limpias.
* `X_test_final`: Matriz de evaluación de 120 filas y 22 columnas limpias.

Y disponemos de las variables objetivo originales: `y_train` e `y_test`.

### 1.1. Entrenamiento, inferencia y evaluación del modelo KNN

En la siguiente unidad (UT4) analizaremos a fondo los fundamentos teóricos y matemáticos de los modelos de clasificación. Por ahora, utilizaremos un clasificador sencillo e intuitivo de Scikit-learn: **K-Nearest Neighbors (`KNeighborsClassifier`)**.

Este algoritmo predice si un cliente abandonará el banco buscando a los **$k$ clientes más similares** (vecinos más cercanos) en el espacio euclídeo de 22 dimensiones. Como nuestras variables están correctamente escaladas con `StandardScaler` y `RobustScaler`, las distancias calculadas por KNN serán justas y homogéneas.

Para entender con total claridad cada fase, dividiremos este trabajo en **3 celdas consecutivas** en el notebook:

#### Entrenamiento del modelo

Instanciamos el clasificador con $k=5$ vecinos y lo entrenamos sobre la matriz `X_train_final` que obtuvimos del `ColumnTransformer`:

```python
from sklearn.neighbors import KNeighborsClassifier

# 1. Instanciamos el clasificador KNN con 5 vecinos
knn = KNeighborsClassifier(n_neighbors=5)

# 2. Entrenamos el modelo con los datos procesados de entrenamiento
print("--> Entrenando modelo KNeighborsClassifier...")
knn.fit(X_train_final, y_train)
print("✅ Modelo entrenado con éxito.")
```

> **¿Qué ha ocurrido internamente?**  
> Al invocar `.fit()`, el algoritmo ha memorizado las 22 coordenadas y la etiqueta real (`0`: Permanece, `1`: Abandona) de cada uno de los 480 clientes de entrenamiento.


#### Inferencia con un cliente simulado y análisis de la respuesta

Antes de evaluar el modelo en masa sobre el conjunto de test, vamos a comprobar qué devuelve cuando le consultamos por un único cliente. Utilizaremos el DataFrame `df_cliente` que generamos al final del Paso 5 con la función `transformar_cliente_nuevo()`:

```python
# 1. Predicción de la etiqueta de clase binaria (0 o 1)
prediccion = knn.predict(df_cliente)

# 2. Estimación de probabilidades para cada clase [P(clase 0), P(clase 1)]
probabilidades = knn.predict_proba(df_cliente)

print(f"Predicción de clase: {prediccion[0]} ({'Abandona' if prediccion[0] == 1 else 'Permanece'})")
print(f"Vector de probabilidades: {probabilidades[0]}")
print(f"Probabilidad de que abandone el banco: {probabilidades[0][1]:.2%}")
```

#### Salida obtenida por pantalla:

```text
Predicción de clase: 0 (Permanece)
Vector de probabilidades: [0.8 0.2]
Probabilidad de que abandone el banco: 20.00%
```

:::tip 🔍 Análisis de lo que nos devuelve la inferencia
Scikit-learn proporciona dos métodos complementarios para predecir:
1. **`knn.predict(df_cliente)` $\rightarrow$ `0 (Permanece)`:** Devuelve directamente la etiqueta binaria ganadora. Como la probabilidad de permanecer supera el umbral estándar del $50\%$ ($0.5$), el modelo dictamina que el cliente no se marchará.
2. **`knn.predict_proba(df_cliente)` $\rightarrow$ `[0.8, 0.2]`:** Devuelve la distribución de probabilidad para cada clase `[P(Permanece), P(Abandona)]`. Como hemos configurado $k=5$ vecinos, estos valores tienen una lectura matemática inmediata: de los 5 clientes históricos más similares a este nuevo cliente, **4 permanecieron en el banco (80%) y solo 1 canceló su cuenta (20%)**.
3. **¿Por qué esto es vital para la API?** En producción, a un gestor de cuentas no le basta con un sí/no rotundo. Saber que el riesgo de fuga es de solo un $20\%$ le indica que este cliente es estable y fidelizado, evitando que el banco gaste recursos comerciales innecesarios en ofrecerle promociones urgentes.
:::

#### Celda 3: Evaluación con Accuracy y Matriz de Confusión

Ahora que sabemos cómo responde el modelo ante un cliente individual, medimos su rendimiento global evaluándolo sobre los 120 clientes de `X_test_final` que el modelo jamás ha visto. 

Calculamos el porcentaje global de acierto (**Accuracy**) y visualizamos los aciertos y fallos en un gráfico con **`ConfusionMatrixDisplay`**:

```python
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, ConfusionMatrixDisplay

# 1. Generamos predicciones para todo el conjunto de prueba
y_pred = knn.predict(X_test_final)

# 2. Calculamos la tasa de acierto global (Accuracy)
acc = accuracy_score(y_test, y_pred)
print(f"Exactitud global (Accuracy) en Test: {acc:.4f} ({acc*100:.1f} %)\n")

# 3. Representamos la Matriz de Confusión de forma gráfica
fig, ax = plt.subplots(figsize=(5, 4))
ConfusionMatrixDisplay.from_predictions(
    y_test, 
    y_pred, 
    display_labels=['Permanece (0)', 'Abandona (1)'],
    cmap='Blues',
    ax=ax
)
plt.title('Matriz de Confusión - KNN')
plt.grid(False)
plt.show()
```

:::info Interpretación visual del gráfico
La matriz de confusión enfrenta la realidad (`y_test`) contra lo que predijo el modelo (`y_pred`):
* **Diagonal principal (tonos más oscuros):** Predicciones correctas.
  * *Arriba-Izquierda:* Clientes que permanecieron y el modelo acertó (Verdaderos Negativos).
  * *Abajo-Derecha:* Clientes que se marcharon y el modelo los detectó a tiempo (Verdaderos Positivos).
* **Fuera de la diagonal:** Errores cometidos.
  * *Arriba-Derecha:* Falsas alarmas (el modelo creyó que se iban, pero se quedaron).
  * *Abajo-Izquierda:* Fugas imprevistas (el modelo no las anticipó).
:::

### 1.2. Exportación de los dos artefactos con `joblib`

Para que nuestra API funcione en producción, necesita **dos archivos binarios**:
1. El **preprocesador** (`preprocesador_banca.joblib`): contiene las medianas, modas, desviaciones y codificadores aprendidos.
2. El **modelo predictivo** (`modelo_knn.joblib`): contiene la estructura del clasificador entrenado con los 480 registros de train.

Ejecuta en tu notebook:

```python
import joblib

# Exportamos el ColumnTransformer ajustado (si no lo hiciste en el Paso 4)
joblib.dump(preprocesador, 'preprocesador_banca.joblib')
print("✅ Preprocesador guardado en: preprocesador_banca.joblib")

# Exportamos el modelo entrenado
joblib.dump(knn, 'modelo_knn.joblib')
print("✅ Modelo KNN guardado en: modelo_knn.joblib")
```

---

## Parte 2: Estructura del proyecto en producción

En la UT2 aprendiste a crear APIs con FastAPI organizando tu código en archivos `.py`. En producción **no ejecutamos notebooks de Jupyter**: necesitamos un proyecto estructurado y desacoplado.

### 2.1. Estructura de carpetas completa y modular

Para que nuestro proyecto sea profesional, limpio y escalable (incluyendo tanto el backend de la API como la interfaz web interactiva que servirá al usuario final), organizaremos el código en subcarpetas bien delimitadas:

```text
api_abandono_banca/
├── artifacts/                      # 📦 Modelos y Pipelines serializados (.joblib)
│   ├── preprocesador_banca.joblib  # ColumnTransformer ajustado (imputación + escalados + OHE)
│   └── modelo_knn.joblib           # Modelo clasificador KNeighborsClassifier entrenado
│
├── static/                         # 🌐 Recursos web estáticos del Frontend
│   ├── css/
│   │   └── styles.css              # Hoja de estilos del formulario y tarjetas de riesgo
│   └── js/
│       └── app.js                  # Lógica del cliente web: captura el formulario y llama a la API con fetch()
│
├── templates/                      # 📄 Vistas y maquetación web
│   └── index.html                  # Interfaz de usuario con el formulario de entrada de datos
│
├── schemas.py                      # 📝 Modelos Pydantic
├── preprocesamiento.py             # ⚙️ Módulo determinista con la función preparar_datos_crudos()
├── main.py                         # 🚀 Servidor FastAPI (endpoints /predict, ruta raíz / y montaje de estáticos)
└── requirements.txt                # 📋 Dependencias del entorno de producción
```

#### ¿Qué responsabilidad tiene cada subcarpeta y archivo?

1. **`artifacts/`:** Separa los archivos binarios pesados (`.joblib`) del código fuente. Mueve a esta carpeta los dos archivos `.joblib` generados durante el notebook (`preprocesador_banca.joblib` y `modelo_knn.joblib`).
2. **`templates/`:** Contiene el archivo `index.html`. Esta es la página web que verán los gestores bancarios en su navegador para introducir los datos de un cliente.
3. **`static/` (con `css/` y `js/`):** Aloja los recursos visuales y la lógica del cliente web:
   - En `css/styles.css` definimos los estilos visuales del diseño y los colores de las alertas (verde para riesgo bajo, amarillo para riesgo medio y rojo para riesgo alto).
   - En `js/app.js` programamos el evento `submit` del formulario para recoger los campos, enviarlos mediante `fetch('POST', '/predict')` al backend y actualizar el resultado en el DOM sin recargar la pantalla.
4. **`schemas.py`:** Módulo independiente donde definiremos las clases de validación de datos con Pydantic (`ClienteInput` y `PrediccionOutput`).
5. **`preprocesamiento.py`:** Módulo independiente que aloja la función `preparar_datos_crudos(df_entrada)`.
6. **`main.py`:** El cerebro del backend en FastAPI: importa los módulos locales, carga los artefactos en memoria al arrancar (`lifespan`), sirve los archivos estáticos y la web, y expone el endpoint `/predict`.
7. **`requirements.txt`:** Lista las librerías necesarias para ejecutar la aplicación en cualquier servidor:
   ```text title="requirements.txt"
   fastapi>=0.110.0
   uvicorn>=0.28.0
   scikit-learn==1.6.1
   pandas>=2.2.0
   numpy>=1.26.0
   joblib>=1.3.0
   pydantic>=2.6.0
   ```

:::warning Compatibilidad de versiones de Scikit-Learn (Google Colab vs Local)
Es muy importante fijar **`scikit-learn==1.6.1`** tanto en `requirements.txt` como en el entorno virtual local (`pip install scikit-learn==1.6.1`). 

Google Colab utiliza por defecto la versión 1.6.1. Si en tu máquina local instalas una versión distinta (por ejemplo 1.7 o posterior), `joblib.load()` fallará con errores de deserialización como `AttributeError: Can't get attribute '_RemainderColsList'` o avisos de incompatibilidad de versión al intentar reconstruir el `ColumnTransformer`.
:::

### 2.2. ¿Por qué necesitamos `preprocesamiento.py`?

Como vimos en la sesión 8:
* `preprocesador_banca.joblib` almacena los objetos de Scikit-learn (`SimpleImputer`, `StandardScaler`, `RobustScaler`, etc.).
* Sin embargo, **los archivos `.joblib` no pueden almacenar funciones personalizadas de Pandas** como el filtrado de centinelas (`-999` $\to$ `NaN`), correcciones tipográficas o cálculo de ratios (`ratio_saldo_ingresos`).

Por lo tanto, creamos el archivo **`preprocesamiento.py`** que contendrá exactamente la función que diseñamos y validamos en el notebook:

```python title="preprocesamiento.py"
import numpy as np
import pandas as pd

def preparar_datos_crudos(df_entrada: pd.DataFrame) -> pd.DataFrame:
    """
    Aplica las reglas deterministas de negocio sobre datos crudos:
    - Descarte de identificadores y columnas sin uso en inferencia.
    - Conversión de centinelas a np.nan.
    - Limpieza tipográfica de cadenas de texto.
    - Feature Engineering: cálculo de ratios y tramos.
    """
    df = df_entrada.copy()

    # 1. Descarte de columnas no utilizables en inferencia
    columnas_descarte = ['id_cliente', 'salario_mensual_aprox', 'comentarios_cliente', 'motivo_cancelacion']
    df = df.drop(columnas_descarte, errors='ignore')

    # 2. Sanitización de centinelas numéricos a NaN
    if 'edad' in df.columns:
        df.loc[(df['edad'] <= 0) | (df['edad'] > 120), 'edad'] = np.nan
    if 'ingresos_anuales' in df.columns:
        df.loc[df['ingresos_anuales'] <= 0, 'ingresos_anuales'] = np.nan
    if 'saldo_cuenta' in df.columns:
        df['saldo_cuenta'] = df['saldo_cuenta'].replace(-999, np.nan)

    # 3. Limpieza tipográfica y centinelas categóricos a NaN
    if 'tipo_cuenta' in df.columns:
        df['tipo_cuenta'] = df['tipo_cuenta'].astype(str).str.strip().str.capitalize()
        df['tipo_cuenta'] = df['tipo_cuenta'].replace({'Desconocido': np.nan, '?': np.nan, 'Nan': np.nan})

    if 'canal_preferido' in df.columns:
        df['canal_preferido'] = df['canal_preferido'].astype(str).str.strip()
        df['canal_preferido'] = df['canal_preferido'].replace({'???': np.nan, 'Nan': np.nan})

    if 'nivel_estudios' in df.columns:
        df['nivel_estudios'] = df['nivel_estudios'].astype(str).str.strip().replace({'Nan': np.nan, 'nan': np.nan})

    # 4. Feature Engineering (Variables derivadas de negocio)
    if 'saldo_cuenta' in df.columns and 'ingresos_anuales' in df.columns:
        df['ratio_saldo_ingresos'] = df['saldo_cuenta'] / (df['ingresos_anuales'] + 1)

    if 'saldo_cuenta' in df.columns and 'num_productos' in df.columns:
        df['saldo_por_producto'] = df['saldo_cuenta'] / df['num_productos']

    if 'edad' in df.columns:
        limites_edad = [0, 30, 55, 120]
        etiquetas_edad = ['Joven', 'Adulto', 'Senior']
        df['grupo_edad'] = pd.cut(df['edad'], bins=limites_edad, labels=etiquetas_edad).astype(str)

    if 'antiguedad_meses' in df.columns:
        df['antiguedad_anios'] = df['antiguedad_meses'] / 12.0
        df = df.drop(columns=['antiguedad_meses'])

    return df
```

---

### 2.3. Creación del módulo `schemas.py`

En la UT2 aprendiste a modelar y blindar entradas de datos con **Pydantic** utilizando clases que heredan de `BaseModel` y restricciones de tipo y rango con `Field`.

Para mantener una arquitectura limpia y profesional, **no escribiremos las clases de datos dentro de `main.py`**. Tu tarea es crear el archivo **`schemas.py`** en la raíz del proyecto bancario implementando los dos modelos que gobernarán el intercambio de datos:

#### 1. `ClienteInput` — Esquema de Entrada
Representa los datos crudos que introduce un usuario en el formulario web o que envía un cliente externo en formato JSON. 

Determina qué datos debería recibir nuestro sistema para hacer una predicción y cuáles no son necesarios. Añade las validaciones que consideres oportunas, teniendo en cuenta los datos que has extraído del EDA.

#### 2. `PrediccionOutput` — Esquema de Salida
Representa la respuesta estructurada que devuelve la API tras ejecutar la inferencia:
* `id_cliente` (`str`): El código del cliente analizado.
* `abandono` (`int`): Predicción binaria (`0` para permanecer, `1` para abandono).
* `probabilidad_abandono` (`float`): Probabilidad estimada de fuga (número decimal entre $0.0$ y $1.0$).
* `nivel_riesgo` (`Literal["Bajo", "Medio", "Alto"]` o `str`): Clasificación operativa del riesgo.
* `accion_recomendada` (`str`): Sugerencia comercial para el gestor bancario.

---

## Parte 3: Construcción de la API en FastAPI (`main.py`)

En la UT2 aprendiste la sintaxis básica de FastAPI, cómo levantar el servidor con Uvicorn y cómo validar entradas mediante esquemas de Pydantic. 

En esta sesión nos centraremos **exclusivamente en las novedades y adaptaciones que exige conectar un pipeline de Scikit-learn y un modelo predictivo**.

### 3.1. Las 3 adaptaciones clave para servir modelos con Pipelines

1. **Carga en memoria durante el arranque (Patrón Lifespan):**  
   Cargar un archivo `.joblib` desde el disco duro tarda varios milisegundos. Si hiciéramos `joblib.load()` dentro de la función de predicción, la API sería lenta y consumiría CPU innecesariamente en cada petición. Los modelos y pipelines **se cargan una sola vez al iniciar la aplicación** y se mantienen residentes en la memoria RAM.
2. **Esquema Pydantic con tipos flexibles:**  
   Los datos que introduce un usuario en la web pueden llegar con valores opcionales (`None`), formatos mixtos o errores tipográficos. Pydantic se encarga de tipar la entrada y nuestro código previo la sanea.
3. **El flujo de inferencia en 4 pasos:**
   $$\text{JSON (Pydantic)} \xrightarrow{\text{1. DataFrame}} \text{Pandas} \xrightarrow{\text{2. Limpieza previa}} \text{preparar\_datos} \xrightarrow{\text{3. Pipeline}} \text{Array 22 cols} \xrightarrow{\text{4. Modelo}} \text{Predicción}$$

### 3.2. Código completo de `main.py`

Crea el archivo **`main.py`** con el siguiente contenido:

```python title="main.py"
import os
from contextlib import asynccontextmanager
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Importamos la función determinista y los esquemas Pydantic desde nuestros módulos locales
from preprocesamiento import preparar_datos_crudos
from schemas import ClienteInput, PrediccionOutput

# Variables globales para almacenar los artefactos en memoria RAM
artefactos = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gestiona el ciclo de vida de la aplicación:
    Carga el preprocesador y el modelo una sola vez al arrancar el servidor desde 'artifacts/'.
    """
    ruta_prep = os.path.join("artifacts", "preprocesador_banca.joblib")
    ruta_modelo = os.path.join("artifacts", "modelo_knn.joblib")

    if not os.path.exists(ruta_prep) or not os.path.exists(ruta_modelo):
        raise RuntimeError("❌ Error crítico: No se encuentran los archivos .joblib en 'artifacts/'.")

    print("--> Cargando artefactos en memoria RAM...")
    artefactos['preprocesador'] = joblib.load(ruta_prep)
    artefactos['modelo'] = joblib.load(ruta_modelo)
    print("✅ Artefactos listos para servir inferencias.")

    yield
    # Limpieza al apagar el servidor
    artefactos.clear()

# Inicializamos la aplicación FastAPI con el gestor de ciclo de vida
app = FastAPI(
    title="API de Predicción de Abandono de Clientes",
    description="Microservicio para evaluar el riesgo de fuga de clientes integrando ColumnTransformer y KNeighborsClassifier.",
    version="1.0.0",
    lifespan=lifespan
)

# Configuración de CORS para admitir peticiones desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montaje de la carpeta de recursos estáticos (CSS, JS)
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

# Endpoint para servir la interfaz web del gestor bancario
@app.get("/", tags=["Frontend"])
def servir_frontend():
    """
    Sirve el formulario web interactivo desde la carpeta templates/.
    """
    ruta_html = os.path.join("templates", "index.html")
    if os.path.exists(ruta_html):
        return FileResponse(ruta_html)
    return {"mensaje": "API de Banca activa. Visita /docs para la documentación interactiva de Swagger."}

# ============================================================================
# Endpoint de inferencia: El corazón del despliegue
# ============================================================================

@app.post("/predict", response_model=PrediccionOutput, tags=["Inferencia"])
def predecir_abandono(cliente: ClienteInput):
    """
    Recibe los datos crudos de un cliente y ejecuta el pipeline completo de predicción:
    1. Conversión de JSON Pydantic a DataFrame de Pandas (1 fila).
    2. Limpieza previa determinista (preparar_datos_crudos).
    3. Preprocesamiento automatizado con ColumnTransformer (.transform).
    4. Inferencia con el modelo (.predict y .predict_proba).
    """
    try:
        # Paso 1: Convertimos la entrada a un diccionario y luego a DataFrame de 1 fila
        datos_dict = cliente.model_dump()
        df_crudo = pd.DataFrame([datos_dict])

        # Paso 2: Ejecutamos la función de limpieza previa y Feature Engineering
        df_saneado = preparar_datos_crudos(df_crudo)

        # Paso 3: Aplicamos el pipeline cargado (imputación + escalados + OHE)
        preprocesador = artefactos['preprocesador']
        X_inferencia = preprocesador.transform(df_saneado)

        # Paso 4: Predecimos con el clasificador
        modelo = artefactos['modelo']
        prediccion_clase = int(modelo.predict(X_inferencia)[0])
        probabilidades = modelo.predict_proba(X_inferencia)[0]
        prob_abandono = float(probabilidades[1])  # Probabilidad de clase 1 (abandono)

        # Paso 5: Regla de negocio para determinar el nivel de riesgo y la acción
        # Esto nos lo tendrían que decir desde el departamento de negocio
        if prob_abandono >= 0.70:
            riesgo = "Alto"
            accion = "Contacto telefónico prioritario por el gestor de cuentas y oferta de fidelización."
        elif prob_abandono >= 0.40:
            riesgo = "Medio"
            accion = "Envío de encuesta de satisfacción y campaña informativa sobre ventajas en comisiones."
        else:
            riesgo = "Bajo"
            accion = "Sin acción requerida. Cliente fidelizado."

        # Retornamos la respuesta según el esquema Pydantic PrediccionOutput
        return PrediccionOutput(
            id_cliente=cliente.id_cliente,
            abandono=prediccion_clase,
            probabilidad_abandono=round(prob_abandono, 4),
            nivel_riesgo=riesgo,
            accion_recomendada=accion
        )

    except Exception as e:
        # Captura cualquier fallo inesperado y devuelve un código HTTP 500 explicativo
        raise HTTPException(
            status_code=500, 
            detail=f"Error durante el procesamiento de la inferencia: {str(e)}"
        )
```

---

## Parte 4: Puesta en marcha y prueba de la API

### 4.1. Arrancar el servidor

Abre tu terminal en la carpeta `api_abandono_banca/` donde residen los archivos y ejecuta:

```bash
uvicorn main:app --reload --port 8000
```

En la consola verás los mensajes informativos confirmando la carga de los artefactos en memoria:

```text
INFO:     Started server process [12345]
--> Cargando artefactos en memoria RAM...
✅ Artefactos listos para servir inferencias.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

### 4.2. Probar la API de forma interactiva con Swagger UI

Abre tu navegador y accede a:

👉 **`http://127.0.0.1:8000/docs`**

Despliega el endpoint **`POST /predict`**, pulsa en **"Try it out"** y pulsa el botón azul **"Execute"** con un JSON de ejemplo.

#### Respuesta devuelta por la API:

```json
{
  "id_cliente": "CLI-8492",
  "abandono": 1,
  "probabilidad_abandono": 0.8,
  "nivel_riesgo": "Alto",
  "accion_recomendada": "Contacto telefónico prioritario por el gestor de cuentas y oferta de fidelización."
}
```

---

## Parte 5: Desarrollo del front

Una vez que la API está operativa y los endpoints responden correctamente en Swagger UI, el último paso para completar el producto mínimo viable (MVP) es construir una **interfaz gráfica (Frontend)**. 

El usuario final de este sistema no es un científico de datos ni un desarrollador que haga peticiones `curl` o use Swagger, sino un **gestor comercial o analista de la entidad bancaria**. Este gestor necesita una pantalla intuitiva donde introducir los datos de un cliente y obtener al instante el veredicto del modelo junto con las recomendaciones de retención.

La interfaz debe integrarse en la estructura del proyecto FastAPI, similar a como hicimos en la UT2. La interfaz debe contar con un formulario que permita al usuario introducir los datos que requiere nuestro modelo (y, por tanto, nuestra API). Cuando el usuario le de al botón de Calcular, la interfaz debe enviar una petición al endpoint `/predict` y mostrar la respuesta en la web en un formato claro y legible.


Para el desarrollo de esta interfaz (HTML, CSS y JavaScript) **está permitido y recomendado el uso de herramientas de Inteligencia Artificial Generativa**.

---

## Parte 6: Despliegue en la nube

Utiliza cualquier servicio de Hosting gratuito en la nube (Render, Railway, Modal, etc.) para desplegar tu API.

Verifica previamente que el servicio sea adecuado para las características de tu proyecto.

---

## PROYECTO 1: Despliegue de un sistema de predicción de abandono bancario

:::important Enunciado del Proyecto 1
Este proyecto constituye la práctica evaluable principal de la **Unidad de Trabajo 3 (Preparación y Análisis de Datos)**. 

El enunciado completo del proyecto está compuesto de forma conjunta por dos documentos de la unidad:
1. **[Sesión 8: Pipelines y ColumnTransformer](8-pipelines-columntransformer.md):** Especificación de la limpieza de datos determinista, tratamiento de valores centinela, ingeniería de variables y diseño de los subpipelines con `ColumnTransformer`.
2. **[Sesión 9: Paso a producción y despliegue de API](9-paso-a-produccion-api.md):** Entrenamiento final del modelo, evaluación de métricas, exportación de artefactos con `joblib`, arquitectura del microservicio en FastAPI, modelado de esquemas Pydantic, inferencia en producción, construcción del frontend y puesta en marcha en la nube.
:::

### 1. Entregables obligatorios

Para superar la entrega del Proyecto 1 deberás subir a la tarea de Evex::

1. **Notebook de Jupyter (`.ipynb`):**
   * Debe contener todo el flujo de trabajo ejecutado secuencialmente y sin errores.

2. **Archivo comprimido (`.zip`) con el proyecto de FastAPI completo:**
   * Debe contener la estructura de directorios lista para ser ejecutada en local.
   * **Importante:** No incluyas carpetas del entorno virtual (`venv/` o `.venv/`) ni cachés (`__pycache__/`) dentro del archivo comprimido `.zip`.

3. **Documento Markdown de despliegue (`despliegue.md` o `README.md`):**
   * **URL pública y activa** de la aplicación desplegada en la nube (Render, Railway, Hugging Face Spaces u otro proveedor similar).
   * Instrucciones breves de uso para probar tanto la interfaz web (`/`) como la documentación interactiva (`/docs`).
   * Captura de pantalla de la interfaz web en producción mostrando una inferencia real.

---

### 2. Rúbrica de evaluación

| Criterio de evaluación | Aspectos clave valorados | Ponderación |
| :--- | :--- | :---: |
| **1. Pipeline y Modelo en Notebook (`.ipynb`)** | Estructura correcta del fichero y código adecuado, con la respuesta a los ejercicios propuestos. | **20%** |
| **2. Modelado de Esquemas Pydantic (`schemas.py`)** | Diseño y codificación  de las clases `ClienteInput` y `PrediccionOutput` con tipado estricto, validadores lógicos y ejemplos para Swagger UI. | **20%** |
| **3. Arquitectura del Backend e Inferencia (`main.py` y `preprocesamiento.py`)** | Carga eficiente de artefactos en memoria mediante `lifespan`, paso de datos por la función determinista, ejecución secuencial de `preprocesador.transform()` y `modelo.predict_proba()`, y lógica de negocio para asignar el nivel de riesgo y la recomendación. | **20%** |
| **4. Frontend Web e Integración Asíncrona** | Creación de la interfaz gráfica (`index.html`, `styles.css`, `app.js`) que capture todos los campos del formulario, realice peticiones asíncronas vía `fetch` a `/predict`, gestione estados (cargando/error) y muestre los resultados con códigos de color de riesgo. | **20%** |
| **5. Despliegue en la Nube y Disponibilidad de la URL** | Publicación de la aplicación completa en un servicio de hosting en la nube (Render, Railway, Hugging Face Spaces, etc.) con URL pública operativa, carga ágil y verificación funcional tanto del frontend como de Swagger UI. | **15%** |
| **6. Estructura del Proyecto, Buenas Prácticas y Entorno** | Organización limpia del proyecto en el archivo `.zip`, código legible y ausencia de archivos residuales (`venv/`, `__pycache__/`). | **5%** |

</div>
