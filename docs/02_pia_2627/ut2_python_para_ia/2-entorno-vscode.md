---
title: "Puesta en marcha del entorno local (VS Code)"
sidebar_position: 2
description: "Configuración del entorno de desarrollo local con VS Code, instalación de Python 3.12, gestión de entornos virtuales (venv), paquetes (pip) y primera sesión práctica con Hugging Face."
keywords: [VS Code, Python, venv, pip, requirements.txt, entorno local, Hugging Face]
---

<div class="justify-text">

# 2. Puesta en marcha del entorno local (VS Code)

Para desarrollar aplicaciones de Inteligencia Artificial profesionales, es imprescindible trabajar en un **entorno de desarrollo local**. Esto nos permite gestionar variables de entorno, controlar versiones de librerías mediante **entornos virtuales (`venv`)**, depurar aplicaciones web (APIs) y contenedorizar nuestras soluciones con **Docker**.

---

## 1. Configuración del entorno de desarrollo

Para poner a punto nuestro ordenador necesitaremos tres componentes clave:

### A) Instalación de Python 3.12
1. Descarga e instala **Python 3.12** (o superior) desde el sitio oficial [python.org](https://www.python.org/).
2. **IMPORTANTE en Windows:** Durante la instalación, marca expresamente la casilla **"Add python.exe to PATH"**.

:::info EN LOS ORDENADORES DEL CENTRO
Los equipos del aula ya disponen de Python previamente instalado y configurado en el sistema. Si estás trabajando en los ordenadores del centro, **no es necesario instalar ninguna versión adicional**, puedes continuar directamente con el apartado B.
:::

### B) Visual Studio Code y Extensiones recomendadas
Instala **VS Code** e incluye las siguientes extensiones esenciales desde el panel lateral (*Extensions* / `Ctrl+Shift+X`):
* **Python** (desarrollada por Microsoft): proporciona autocompletado, depuración y detección de errores.

---

## 2. Entornos virtuales (`venv`)

Un **entorno virtual** es un directorio aislado que contiene una instalación propia de Python y un conjunto independiente de librerías. 

:::tip VERSIÓN RECOMENDADA EN LA INDUSTRIA DE IA (PYTHON 3.12)
En el sector de la Inteligencia Artificial, la versión de referencia recomendada es **Python 3.12**. Las librerías de IA avanzadas (como PyTorch o TensorFlow) requieren binarios compilados que tardan meses en adaptarse a versiones recién lanzadas o experimentales (como Python 3.14). Usar **Python 3.12** garantiza máxima compatibilidad y estabilidad.
:::

### Comprobar la versión de Python instalada
Antes de crear el entorno, puedes consultar qué versión tienes activa:
* **En Windows:**
  ```cmd
  python --version
  py --list
  ```
* **En macOS / Linux:**
  ```bash
  python3 --version
  ```

---

### Creación y activación del entorno virtual

Desde la terminal integrada de VS Code (`Ctrl + ~` o `Terminal > New Terminal`), dentro de la carpeta de tu proyecto:

1. **Crear el entorno virtual** (convencionalmente llamado `venv` o `.venv`):
   * **En Windows (usando la versión por defecto o forzando 3.12):**
     ```cmd
     python -m venv venv
     ```
     *(Si tienes varias versiones instaladas en Windows y quieres forzar Python 3.12: `py -3.12 -m venv venv`)*
   * **En macOS / Linux (usando la versión por defecto o forzando 3.12):**
     ```bash
     python3 -m venv venv
     ```
     *(Si quieres forzar una versión concreta instalada en Mac/Linux: `python3.12 -m venv venv`)*

2. **Activar el entorno virtual**:
   * **En macOS / Linux:**
     ```bash
     source venv/bin/activate
     ```
   * **En Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **En Windows (Git Bash / CMD):**
     ```bash
     source venv/Scripts/activate
     ```

   *Sabrás que está activado porque verás la etiqueta `(venv)` al inicio de la línea de comandos de tu terminal.*

3. **Seleccionar el intérprete en VS Code**:
   * Presiona `Ctrl + Shift + P` (o `Cmd + Shift + P` en Mac).
   * Escribe y selecciona: **`Python: Select Interpreter`**.
   * Elige el intérprete correspondiente al entorno creado: `./venv/bin/python` o `.\venv\Scripts\python.exe`.

   :::info ¿Por qué es necesario este paso?
   Al seleccionar el intérprete del entorno virtual, le indicamos a VS Code dónde están las librerías instaladas en este proyecto concreto. Esto permite que el editor active el **autocompletado** y evita falsos avisos de error como *"Import could not be resolved"*.
   :::

4. **Desactivar y borrar un entorno virtual**:
   * **Desactivar:** Para salir del entorno virtual activo en la terminal, ejecuta:
     ```bash
     deactivate
     ```
   * **Borrar el entorno virtual:** Dado que un entorno virtual es simplemente un directorio en tu proyecto, para eliminarlo basta con borrar la carpeta `venv`:
     * **En macOS / Linux:**
       ```bash
       rm -rf venv
       ```
     * **En Windows (PowerShell o CMD):**
       ```cmd
       rmdir /s /q venv
       ```
     * *(O haciendo clic derecho sobre la carpeta `venv` en el explorador de archivos de VS Code y seleccionando **Delete / Eliminar**).*

---

## 3. Gestión de dependencias con `pip` y `requirements.txt`

El gestor de paquetes de Python es **`pip`**. 

### Comandos esenciales
* **Instalar una librería:**
  ```bash
  pip install nombre_libreria
  ```
* **Ver qué librerías hay instaladas:**
  ```bash
  pip list
  ```
* **Guardar las dependencias del proyecto:**
  ```bash
  pip freeze > requirements.txt
  ```
* **Instalar todas las dependencias en un entorno nuevo:**
  ```bash
  pip install -r requirements.txt
  ```

---

## 4. Prueba del entorno local

### Objetivo de la práctica
El objetivo de esta actividad práctica es comprobar que tu entorno local en VS Code (la instalación de Python, el entorno virtual `venv`, el gestor `pip` y la selección del intérprete) está correctamente configurado y listo para funcionar de extremo a extremo, ejecutando una inferencia real de Inteligencia Artificial en tu propia máquina.

### Tecnologías utilizadas
* **Hugging Face:** Es la plataforma y ecosistema líder a nivel mundial en Inteligencia Artificial para alojar, compartir y colaborar con modelos preentrenados de código abierto (tanto de texto como de imagen, audio o vídeo).
* **`transformers`:** Es la librería oficial de Python creada por Hugging Face. Permite descargar e interactuar con modelos de lenguaje de última generación mediante una API de alto nivel.
* **PyTorch (`torch`):** Es el motor de cálculo de aprendizaje profundo (*Deep Learning*) que utiliza `transformers` de fondo para ejecutar las operaciones matemáticas del modelo.

### ¿Qué hace el código?
El script que vas a ejecutar realiza un **análisis de sentimiento** (*sentiment-analysis*):
1. Importa la función `pipeline` de la librería `transformers`.
2. Descarga e inicializa en memoria un modelo preentrenado especializado en clasificar texto.
3. Analiza la frase de entrada que le proporcionemos.
4. Muestra por pantalla el resultado del diagnóstico (**POSITIVE** o **NEGATIVE**) junto a la probabilidad o nivel de certeza alcanzado (*score*).

---

### Paso 1: Instalar dependencias mediante `requirements.txt`
Para garantizar que las versiones sean 100% compatibles entre sí, crearemos un archivo `requirements.txt` en la raíz de nuestro proyecto con las versiones mínimas garantizadas:

1. Crea el archivo `requirements.txt` en VS Code e incluye las 3 librerías del tri-stack estándar de IA (restringiendo `numpy` a la rama 1.x para evitar incompatibilidades de C-API):
   ```text
   numpy<2
   transformers==4.44.2
   torch==2.2.2
   ```

2. Ejecuta la instalación desde la terminal con el entorno virtual `(venv)` activado:
   ```bash
   pip install -r requirements.txt
   ```

### Paso 2: Crear el archivo `app.py`
Crea un nuevo archivo llamado `app.py` en VS Code y escribe el siguiente código:

```python
from transformers import pipeline

# Cargar un pipeline preentrenado de análisis de sentimiento
clasificador = pipeline("sentiment-analysis")

# Analizar un texto de prueba (el modelo por defecto está optimizado en inglés)
texto = "Python and FastAPI make building AI projects incredibly easy and fun."
resultado = clasificador(texto)

print(f"Texto analizado: '{texto}'")
print(f"Resultado: {resultado}")
```

### Paso 3: Ejecutar el script
Ejecuta el archivo desde la terminal integrada de VS Code:

* En Windows:
  ```cmd
  python app.py
  ```
* En macOS / Linux:
  ```bash
  python3 app.py
  ```

*En la primera ejecución, la librería descargará automáticamente el modelo preentrenado desde Hugging Face y mostrará el análisis de sentimiento por consola.*

</div>
