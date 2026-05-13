---
title: Ingesta RAG con Simple Vector Store en n8n
sidebar_position: 2
description: Creación de un pipeline de datos rápido utilizando el nodo Simple Vector Store integrado en n8n.
---

En la vía tradicional picamos código en Python para trocear y guardar conocimiento. Ahora vamos a replicar esa misma lógica (**RAG**) utilizando únicamente la interfaz visual de **n8n**.

## Tutorial Paso a Paso: Creando el flujo de Ingesta

### 1. Preparar el archivo y el Disparador

Para que n8n pueda leer nuestro conocimiento, primero debemos "entregárselo" a través del volumen de Docker que configuramos en la instalación.

1.  **En tu ordenador**: Localiza la carpeta que vinculaste al contenedor (la "Host Path" de la instalación). 
2.  **Copia** tu archivo `conocimiento.txt` dentro de esa carpeta. 

:::tip[Cómo subir el archivo al contenedor]
La forma más fiable de "inyectar" tu archivo de conocimiento dentro de n8n es utilizando la terminal (PowerShell, CMD o Terminal de Linux). Ejecuta este comando desde la carpeta donde tengas tu archivo `.txt`:

```bash
docker cp conocimiento.txt n8n_pia:/home/node/.n8n-files/conocimiento.txt
```
*(Recuerda sustituir `n8n_pia` por el nombre que le dieras a tu contenedor).*
:::

**En el lienzo de n8n**: 
1. Añade el nodo **"When clicking 'Execute workflow'"**.
2. Conéctalo a un nuevo nodo llamado **"Read/Write Files from disk"**.
    *   **Action**: Selecciona **Read from disk**.
    *   **File Path**: `/home/node/.n8n-files/conocimiento.txt`.

<div style={{ textAlign: 'center' }}>
  <img src={require('../0-img/paso1-tutorial.png').default} width="400" alt="Paso 1 tutorial" />
</div>

### 2. El Nodo Vector Store (Simple)

1.  Conecta la salida del nodo anterior a un nuevo nodo: **Simple Vector Store**.
2.  En el menú de **Actions**, selecciona: 👉 **Add documents to vector store**.
3.  Configúralo así:
    *   **Memory Key**: `vector_store_key`.
    *   **Embedding Batch Size**: `200`.
    *   **Clear Store**: **Actívalo**.

<div style={{ textAlign: 'center' }}>
  <img src={require('../0-img/paso2-tutorial.png').default} width="600" alt="Configuración Simple Vector Store" />
</div>

### 3. Cargar y Trocear el Documento (AI)

Desde el conector redondo inferior llamado **Document** del nodo Vector Store:
1.  Busca y añade el nodo **Default Data Loader**.
2.  Configúralo así para que detecte el archivo:
    *   **Type of Data**: `Binary`.
    *   **Mode**: `Load All Input Data`.
    *   **Data Format**: `Automatically Detect by Mime Type`.
    *   **Text Splitting**: Selecciona **Custom**.

Desde el conector **Text Splitting** del nodo **Default Data Loader**:
1.  Selecciona **Recursive Character Text Splitter**.
2.  Configura los valores de troceado:
    - **Chunk Size**: `1000`.
    - **Chunk Overlap**: `200`.

:::info[¿Por qué usamos este troceador?]
El nodo **Recursive Character Text Splitter** es mucho más inteligente que el método simple. Intenta dividir el texto respetando párrafos y frases completas, evitando cortar palabras por la mitad. Esto es vital para que la IA entienda bien el contexto de cada fragmento cuando lo consulte.
:::

<div style={{ textAlign: 'center' }}>
  <img src={require('../0-img/paso3-tutorial.png').default} width="700" alt="Configuración Recursive Character Text Splitter" />
</div>

### 4. La Inteligencia de los Embeddings (Gemini)

Desde el conector **Embeddings** del nodo Vector Store:
1.  Busca y añade el nodo **Google Gemini Embeddings**.
2.  Configura tu `API Key` de Gemini en las credenciales.
3.  Asegúrate de que el modelo seleccionado sea `embedding-001`.

<div style={{ textAlign: 'center' }}>
  <img src={require('../0-img/paso4-tutorial.png').default} width="700" alt="Configuración Google Gemini Embeddings" />
</div>

---

## Ejecución y Verificación

1.  Haz clic en el botón inferior **"Execute workflow"**.
2.  Verás cómo los nodos se iluminan en verde. n8n leerá el archivo del disco, el Loader lo convertirá en texto, el Splitter lo troceará y Gemini generará los vectores para guardarlos en la memoria.
3.  Si haces clic en el nodo **Simple Vector Store**, podrás ver en la pestaña de salida (*Output*) los fragmentos indexados.
