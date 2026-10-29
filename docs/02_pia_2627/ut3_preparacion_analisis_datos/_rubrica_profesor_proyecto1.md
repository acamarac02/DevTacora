# Rúbrica Detallada y Guía de Calificación para el Docente

## Proyecto 1: Despliegue de un sistema de predicción de abandono bancario

> **Documento interno para el profesorado.** Este archivo contiene los criterios de corrección pormenorizados, la ponderación analítica y los indicadores de logro para evaluar el Proyecto 1 de la Unidad de Trabajo 3 (Preparación y Análisis de Datos). No se publica en el portal de producción para los alumnos.

---

### 1. Consideraciones de corrección (Parte guiada vs. Trabajo autónomo)

El proyecto evalúa la integración de las dos últimas sesiones de la unidad ([Sesión 8](8-pipelines-columntransformer.md) y [Sesión 9](9-paso-a-produccion-api.md)). Durante las sesiones prácticas los alumnos disponen de explicaciones paso a paso de algunos bloques, mientras que otros deben ser desarrollados o adaptados completamente por ellos.

La ponderación de la nota refleja esta distinción:

* **Partes con plantilla o guiadas (30% de la nota total):** 
  * Construcción base del pipeline en el notebook (20%).
  * Estructura básica de carpetas y dependencias (5%).
  * Configuración básica de FastAPI (`lifespan`, servidor de estáticos) (5%).
* **Partes de desarrollo autónomo o asistido por IA (70% de la nota total):**
  * Modelado completo y validaciones de `schemas.py` en Pydantic (20%).
  * Lógica de inferencia de negocio y formateo de la respuesta en `main.py` (15%).
  * Implementación y diseño del frontend web dinámico (`index.html`, `styles.css`, `app.js`) (20%).
  * Despliegue efectivo y operativo en la nube con URL pública activa (15%).

---

### 2. Tabla analítica de evaluación

| Criterio | Peso | Excelente (9 - 10) | Adecuado (5 - 8) | Insuficiente (0 - 4) |
| :--- | :---: | :--- | :--- | :--- |
| **1. Pipeline y Modelo en Notebook (`.ipynb`)** | **20%** | • Aplica correctamente `StandardScaler` (edad, ingresos) y `RobustScaler` (saldo_cuenta).<br/>• Configura `OrdinalEncoder` con orden explícito y `OneHotEncoder` con `drop='first'`.<br/>• Protege estrictamente contra la fuga de datos (`fit` únicamente en train, `transform` en test).<br/>• Entrena el clasificador KNN y obtiene las métricas requeridas (accuracy y visualización de matriz de confusión).<br/>• Exporta correctamente `preprocesador_banca.joblib` y `modelo_knn.joblib`. | • El pipeline funciona y clasifica, pero tiene inconsistencias menores (ej. escalador único para todas las numéricas o mal orden en ordinales).<br/>• Se calculan las métricas pero la matriz de confusión no se grafica o faltan etiquetas claras.<br/>• Artefactos exportados pero con avisos de sobreescritura o advertencias. | • El notebook no se ejecuta secuencialmente.<br/>• Hay fuga de datos crítica (ajusta transformadores antes del `train_test_split`).<br/>• No exporta los dos archivos `.joblib` o están corruptos.<br/>• No calcula las métricas solicitadas. |
| **2. Modelado de Esquemas Pydantic (`schemas.py`)**<br/>*(Trabajo propio del alumno)* | **20%** | • Crea `ClienteInput` y `PrediccionOutput` con tipado riguroso (`str`, `int`, `float`).<br/>• Implementa validaciones lógicas con `Field` (ej. `edad: ge=18, le=100`, `ingresos: gt=0`, `num_productos: ge=1`).<br/>• Incorpora descripciones semánticas y ejemplos representativos en el schema (`json_schema_extra` o `model_config`) para la documentación interactiva Swagger. | • Los dos esquemas existen y tipan los campos básicos.<br/>• Faltan validaciones de rango en algunos campos numéricos o no se incluyen ejemplos ilustrativos para Swagger.<br/>• Validación puramente básica sin aprovechar las capacidades de Pydantic v2. | • No crea el archivo `schemas.py` o deja el código dentro de `main.py`.<br/>• Errores graves de tipado que hacen fallar las peticiones POST.<br/>• Esquemas incompletos con campos ausentes respecto a los requeridos por el preprocesador. |
| **3. Arquitectura del Backend e Inferencia (`main.py` y `preprocesamiento.py`)** | **20%** | • Gestiona el ciclo de vida de la aplicación con `@asynccontextmanager` (`lifespan`), cargando los `.joblib` en memoria una sola vez al arrancar.<br/>• Convierte el payload JSON en DataFrame y ejecuta de forma transparente `preparar_datos_crudos`.<br/>• Aplica `preprocesador.transform()` y `modelo.predict_proba()`.<br/>• Mapea con lógica coherente el nivel de riesgo (`Bajo`, `Medio`, `Alto`) y la recomendación de negocio.<br/>• Maneja adecuadamente errores y excepciones HTTP. | • La inferencia funciona y devuelve la respuesta requerida.<br/>• La carga de artefactos no aprovecha `lifespan` (los carga en cada petición) provocando lentitud innecesaria.<br/>• La asignación de riesgo o la recomendación es estática o presenta alguna inconsistencia lógica menor. | • La API no arranca o falla en tiempo de ejecución al invocar `/predict`.<br/>• Modifica erróneamente el preprocesador provocando desajuste de columnas (`Feature names seen at fit time, yet now missing`).<br/>• Formato JSON de respuesta no cumple el contrato de la interfaz. |
| **4. Frontend Web e Integración Asíncrona**<br/>*(Trabajo propio / asistido con IA)* | **20%** | • Interfaz web moderna, usable y responsive integrada en `templates/` y `static/`.<br/>• Formulario con todos los campos necesarios organizados en secciones legibles.<br/>• El código JavaScript intercepta el formulario, envía la petición asíncrona mediante `fetch` al endpoint `/predict` y gestiona estados (cargando/error).<br/>• Muestra los resultados de forma visual e intuitiva (badge con código de color según nivel de riesgo, barra de porcentaje de fuga y recomendación). | • Interfaz funcional que envía datos y muestra la respuesta, pero con diseño plano o sin adaptación responsive.<br/>• No implementa retroalimentación visual de carga o la gestión de errores es pobre (se queda bloqueado si la API falla).<br/>• No diferencia colores por nivel de riesgo. | • No existe frontend web o la página no se sirve desde `/`.<br/>• Formulario roto que no comunica con la API o arroja errores de JavaScript en consola al pulsar enviar.<br/>• No renderiza los datos calculados por el modelo. |
| **5. Despliegue en la Nube y Disponibilidad de la URL**<br/>*(Trabajo propio en producción)* | **15%** | • Aplicación desplegada en un proveedor cloud (Render, Railway, Hugging Face, etc.) y completamente accesible de forma pública.<br/>• La URL facilitada carga el frontend en `/` y Swagger UI en `/docs` sin fallos.<br/>• La inferencia en la nube funciona en tiempo real sin agotar la memoria del contenedor.<br/>• Se adjunta documentación clara en `despliegue.md` con captura de pantalla funcional. | • La aplicación está desplegada y accesible, pero sufre de lentitud extrema o caídas intermitentes por mala gestión de memoria.<br/>• Faltan enlaces a recursos estáticos en producción (rutas relativas rotas en producción pero no en local).<br/>• Documentación de despliegue escueta o sin captura de pantalla. | • La URL no funciona, devuelve `502 Bad Gateway`, `CrashLoop` o no es pública.<br/>• El despliegue falló por incompatibilidad de dependencias (ej. versión de `scikit-learn` errónea) y no se resolvió.<br/>• No se aporta URL ni archivo de despliegue. |
| **6. Organización del Proyecto, Entorno y Buenas Prácticas** | **5%** | • Archivo `.zip` perfectamente estructurado con carpetas limpias.<br/>• `requirements.txt` riguroso especificando `scikit-learn==1.6.1` para evitar desajustes de deserialización.<br/>• Ausencia total de carpetas pesadas del entorno virtual (`venv/`, `.venv/`) y cachés (`__pycache__/`).<br/>• Código limpio, legible y comentado. | • Estructura general correcta con algún archivo desubicado o dependencias sin versiones fijadas.<br/>• Se incluyeron ficheros residuales menores (`.DS_Store`, cachés temporales) sin afectar la ejecución. | • Proyecto desorganizado, faltan módulos clave en el `.zip`.<br/>• Se incluye la carpeta `venv` haciendo el archivo excesivamente pesado.<br/>• Incompatibilidad de versiones en `requirements.txt`. |

---

### 3. Lista de chequeo rápido para el profesor

1. **Notebook (`.ipynb`):**
   - [ ] ¿Hay dos ramas de escalado (`StandardScaler` para edad/ingresos y `RobustScaler` para saldo)?
   - [ ] ¿El `fit` del pipeline se hace exclusivamente sobre `X_train`?
   - [ ] ¿Se muestra el gráfico de `ConfusionMatrixDisplay` junto con el Accuracy?
   - [ ] ¿Se generaron `preprocesador_banca.joblib` y `modelo_knn.joblib`?

2. **Backend y Schemas (`schemas.py`, `main.py`, `preprocesamiento.py`):**
   - [ ] ¿`schemas.py` valida rangos con `Field(..., gt=..., le=...)`?
   - [ ] ¿`main.py` utiliza `@asynccontextmanager` para cargar los modelos una sola vez?
   - [ ] ¿La respuesta clasifica adecuadamente el riesgo en función de la probabilidad (ej. `<0.3` Bajo, `0.3-0.6` Medio, `>0.6` Alto)?

3. **Frontend (`templates/`, `static/`):**
   - [ ] ¿La ruta raíz `GET /` devuelve la interfaz web?
   - [ ] ¿El formulario envía los tipos numéricos correctos (enteros y floats, no strings)?
   - [ ] ¿La interfaz muestra la predicción sin recargar la página?

4. **Despliegue:**
   - [ ] ¿La URL abre en el navegador sin login requerido?
   - [ ] ¿Al enviar una predicción devuelve resultado en menos de 3-5 segundos?

---

### 4. Penalizaciones directas recomendadas

* **Fuga de datos (*data leakage*) en el notebook:** -2.0 puntos sobre la nota del notebook.
* **Inclusión del entorno virtual (`venv/`) en el archivo ZIP:** -1.0 punto sobre la nota final.
* **Versión no fijada de `scikit-learn` que cause error 500 al levantar el servidor:** -1.5 puntos.
* **Código de `schemas.py` sin separar en su propio archivo:** -1.0 punto.
