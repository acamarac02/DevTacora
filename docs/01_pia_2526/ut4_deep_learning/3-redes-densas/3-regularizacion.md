---
title: "Regularización y Overfitting"
sidebar_position: 3
description: "Técnicas fundamentales para combatir el sobreajuste en redes neuronales: Early Stopping, Dropout, L2 y Batch Normalization."
keywords: [regularización, overfitting, sobreajuste, early stopping, dropout, batch normalization, keras, tensorflow]
---

En los apartados anteriores hemos visto cómo diseñar arquitecturas tanto para problemas de regresión como de clasificación. Al monitorizar el entrenamiento con TensorBoard, es muy probable que te hayas topado con un fenómeno recurrente: el **Overfitting** (sobreajuste).

Las redes neuronales densas son modelos con una capacidad de aprendizaje masiva (a menudo tienen miles o cientos de miles de parámetros). Si las dejamos entrenar el tiempo suficiente sin control, tenderán a "memorizar" los datos de entrenamiento exactos en lugar de aprender los patrones generales que subyacen en ellos.

![Gráfico EDA](../0-img/overfitting-tensorboard.png)

En este apartado veremos cómo utilizar técnicas de **Regularización**, cuyo objetivo principal es restringir, penalizar o aplicar "ruido" a la red para forzarla a generalizar mejor en datos que nunca ha visto.

---

## 1. El Diagnóstico del Overfitting

Sabemos que nuestra arquitectura sufre de overfitting cuando observamos una divergencia clara en el panel "Time Series" de TensorBoard:

*   La pérdida en el conjunto de entrenamiento (`loss`) sigue bajando acercándose a cero.
*   La pérdida en el conjunto de validación (`val_loss`) llega a un punto mínimo, se estanca o, lo que es peor, **empieza a subir**.

![Gráfico EDA](../0-img/tensorboard-loss.png)

En el momento en que la curva de validación empieza a empeorar, cada nueva época de entrenamiento está perjudicando activamente al modelo final. Nuestro objetivo con las siguientes técnicas es "cerrar la brecha" (gap) entre estas dos curvas.

---

## 2. Parada Temprana (Early Stopping)

Es la técnica de regularización más recomendada, sencilla y efectiva. Si sabemos matemáticamente que el modelo empezará a empeorar a partir de cierta época, ¿por qué no pedimos a Keras que detenga el entrenamiento exactamente en ese punto?

El **Early Stopping** monitoriza una métrica (normalmente `val_loss`) e interrumpe el bucle de entrenamiento automáticamente si dicha métrica deja de mejorar después de un número determinado de épocas de "paciencia".

### Implementación en Keras
Se implementa como un objeto *Callback* (igual que vimos con TensorBoard), que luego le pasamos al método `.fit()` en forma de lista:

```python
from tensorflow.keras import callbacks

early_stopping = callbacks.EarlyStopping(
    monitor='val_loss', # Métrica que queremos vigilar
    patience=10,        # Cuántas épocas esperar sin mejora antes de detenerse
    restore_best_weights=True # ¡Crítico! Nos quedamos con los pesos del punto óptimo
)

# Añadimos el callback a la lista junto al callback de TensorBoard (si lo tenemos)
model.fit(
    X_train, y_train,
    epochs=500, # Podemos establecer un límite enorme; el Early Stopping lo parará antes
    validation_data=(X_valid, y_valid),
    callbacks=[early_stopping, tensorboard_callback]
)
```

:::tip La importancia crítica de `restore_best_weights`
Imagina que en la época 40 el modelo alcanzó su mejor (mínimo) valor de `val_loss`. Como hemos configurado una paciencia de 10 épocas, el entrenamiento continuará, pero al no mejorar, se detendrá en la época 50. 
Si **NO** activamos `restore_best_weights=True`, el modelo final en memoria almacenará los pesos de la época 50 (donde ya había empezado a empeorar fuertemente). Al ponerlo a `True`, consideramos esa "paciencia" como una simple ventana de exploración, y Keras "rebobina" y recupera automáticamente los pesos de la época 40 por nosotros. ¡Nunca lo olvides!
:::

---

## 3. Dropout (Deserción)

El **Dropout** es posiblemente la innovación en regularización más popular y replicada del Deep Learning moderno. Su funcionamiento conceptual es sorprendentemente simple pero increíblemente efectivo: consiste en **"apagar" u omitir aleatoriamente un porcentaje de las neuronas** durante cada paso de actualización (*batch*) del entrenamiento.

Al desconectar neuronas al azar, la red se da cuenta de que no puede depender de manera absoluta en ninguna conexión específica o característica individual, ya que podrían fallar o desaparecer en cualquier momento. Esto obliga a la red a "distribuir" el conocimiento, forzando a que las neuronas vecinas aprendan representaciones redundantes y robustas.

### Implementación en Keras
En lugar de configurarlo al compilar, el Dropout se añade directamente como una capa intermedia más dentro de nuestra arquitectura `Sequential`. Esta capa especial afecta exclusivamente a las salidas de la capa inmediatamente anterior:

```python
from tensorflow.keras import layers

model = tf.keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=[n_features]),
    
    # Apagamos el 30% de las neuronas de la capa anterior aleatoriamente
    layers.Dropout(0.3), 
    
    layers.Dense(64, activation='relu'),
    
    # Podemos aplicar varios Dropouts en la red (suelen ponerse después de las Dense)
    layers.Dropout(0.2),
    
    layers.Dense(1, activation='sigmoid') # Capa de salida (estas NUNCA llevan Dropout)
])
```

:::important El Dropout solo actúa en Fase de Entrenamiento
Keras gestiona internamente el ciclo de vida del modelo de forma inteligente. Reconoce que el Dropout solo debe actuar activamente introduciendo ese ruido durante el ajuste de pesos (`.fit()`). 
Cuando pasamos a la fase de evaluación del modelo (`.evaluate()`) o lanzamos predicciones reales (`.predict()`), **el Dropout se desactiva de manera transparente y automática**. Otorga a la red su 100% de fuerza conjunta y ajusta la escala matemática interna de sus salidas para compensar la reaparición sorpresiva de esas neuronas que faltaban.
:::

---

## 4. Regularización de Pesos (L1 y L2)

A diferencia del Dropout, que altera las rutas computacionales dinámicamente, L1 y L2 son penalizaciones directas incluidas en la Función de Pérdida final que se intenta optimizar. Añaden un castigo matemático proporcional a la magnitud (*tamaño*) de los pesos de nuestra red.

*   **L1 (Lasso):** Castiga la suma "absoluta" de los pesos, con un efecto colateral característico: fuerza la dispersión, obligando activamente a que muchos de los pesos terminen siendo puramente o matemáticamente **cero**. Es idóneo si sospechamos con antelación que disponemos de un volumen muy alto de parámetros sin ninguna aportación de valor predictivo.
*   **L2 (Ridge):** Castiga la suma de los valores de los pesos en su forma cuadrática. En este caso no suele reducir valores de peso a cero, pero desincentiva brutalmente que exista cualquier peso en particular con un tamaño desorbitado y empuja, como objetivo, a obtener arquitecturas densas en las que todos los pesos estén repartidos equitativamente y cercanos a la franja del 0.

### Implementación en Keras
Se inyecta como un flag o parámetro de configuración explícito dentro de la propia declaración de la capa de neuronas subyacente que queremos regularizar:

```python
from tensorflow.keras import regularizers

model = tf.keras.Sequential([
    # Penalizamos que los parámetros asuman un peso inmensamente grande aplicando L2
    layers.Dense(64, activation='relu', kernel_regularizer=regularizers.l2(0.01)),
    layers.Dense(1)
])
```

---

## 5. Batch Normalization (Normalización por Lotes)

:::note Diferencias fundamentales en terminología
Es imprescindible recordar que la capa especial de *Batch Normalization* no tiene absolutamente nada en común con configurar en Keras nuestro tamaño de lote en el `.fit()` (`batch_size=32`).
:::

Tal y como aprendimos durante la exploración de modelos tradicionales de ML de la necesidad casi obligatoria del preprocesamiento y estandarización a nuestros datos iniciales pre-capa de entrada, el **Batch Normalization** tiene exactamente la misma labor. De forma sencilla, actúa como un "StandardScaler" intercalado que estandariza forzosamente para que devuelva medias 0 y desviaciones típicas 1 a **las salidas intermedias** ocultas entre las capas.

La ventaja competitiva de su incorporación se centra de facto en acelerar desproporcionadamente tiempos de aprendizaje (más convergencia y curvas menos vibrantes en modelos masivos muy extendidos hacia el fondo de las capas). Secundariamente arrastra en este proceso un sutil componente colateral y aleatorio que restringe levemente al modelo aportando cierto porcentaje extra de resiliencia final que sirve también y amortigua un minúsculo porcentaje del overfitting general.

### Implementación en Keras
Difiere tradicionalmente según las modas de la época. Para redes fully-connected se recomienda intercalarla o anteceder a la fase posterior, o incluso en mitad de separaciones (interrumpiendo separadamente un activation call).

```python
model = tf.keras.Sequential([
    layers.Dense(64, activation='relu'),
    layers.BatchNormalization(), # Escala en línea pura este lote específico 
    layers.Dense(32, activation='relu'),
    layers.Dense(1)
])
```

---

## 6. Mejores Prácticas: ¿Cuándo y cómo combinarlas?

Construir correctamente y ajustar por primera vez hiperparámetros se siente más como intuición artística. Especialmente para quienes inician proyectos, surge rápidamente una duda clave frente a las variables disponibles: ¿Cuándo empleo cuál, y bajo qué criterios? Aquí está tu mapa guía sobre estas técnicas fundado sobre estándares del sector corporativo de datos de esta época.

1.  **Regla maestra universal constante: Early Stopping.**
    *   **Cuándo usarlo:** **SIEMPRE**. Literalmente, siempre. Nunca restará calidad a la red. Te protege ante tu propio olvido salvando la calidad de los pesos máximos del overfitting pasivo si exageras tus límites.
2.  **Si evidencias visualmente el Overfitting: Dropout.**
    *   **Cuándo usarlo:** Ante un diagnóstico transparente por observación en la curva remarcada de `val_loss` que deambula lejos de la zona de confort del conjunto nativo de `loss` interno.
    *   **Consejo Base:** Ensayos escalonados e incrementales. Entra directamente sumergiendo tasas controladas de castigo modesto inicial (`layers.Dropout(0.2)`). Escala de un máximo extremo hasta ratios del 50% si el dolor a posteriori continúa latente.
3.  **Para un modelo rígido, largo y bloqueado: Batch Normalization.**
    *   **Cuándo usarlo:** Si el aprendizaje se traba, y arrancar el `.fit()` no consigue más que gráficas completamente desbocadas con picos caóticos. Aporta estabilización masiva e impone paz inmediata a modelos reacios.
4.  **¿L1 y L2 (Weight Decays) en redes profundas generales?**
    *   **Cuándo usarlas:** Salvo que estemos adaptando arquitectos en particular, hoy en día se hallan en posición puramente marginal debido a la gigantesca y versátil competencia del esquema de simple exclusión del *Dropout*.  Basta conocer que existen, pero resérvalos excepcionalmente como arma extra contra un modelo al que una capa normal extrema de un factor superior al 50% en *dropout* le rompa o incapacite sus lógicas conjuntas de aprendizaje final.
5.  **¿Añadir y engrosarlas en la red libremente fusionando técnicas?**
    *   **¡Luz Roja! Cuidado absoluto.** Por reflejo asumimos equivocadamente sumar capas de *Dropout* entrelazadas activamente frente a capas puras de *Batch Normalization*. Paradójicamente (y por evidencias en investigación técnica directa) chocan radicalmente y empobrecen dramáticamente su función debido a que cada una le miente o trastoca la distribución base pre-modificada con la que intenta predecir o calibrar el anterior componente.
    *   **Protocolo Base recomendatorio de progreso escalable:**
        1. Encendido inicial con Early Stopping.
        2. Detectado el desbalance: Inclusión escalable en porcentajes controlados de capas de separación (Dropout).
        3. ¿Resultados sin solventar o no convergen?  Intercambia. Descarta los porcentajes agresivos perjudiciales y en este otro experimento diferente, substituye de golpe el componente y ensaya insertando *Batch Normalization* para obligar a empujar la estabilización desde otro camino distinto a las bajas estadísticas.

---

## 7. Caso Práctico: Comparativa en TensorBoard

La asimilación e internalización definitiva de regularizadores abstractos resulta siempre imprecisa leyéndolos bajo textos que puramente operables mediante demostraciones reales visualizando contrastes dinámicos.

En las correspondientes tutorías adjuntas que realizaremos, someteremos esto al escenario final práctico, trazando el experimento explícito bajo estas directrices:

1.  **El "Gran Memorizador Descontrolado":** Levantaremos un diseño intencionadamente saturado en exceso para el pequeño desafío (una red de más de 6 capas apiladas con cientos de neuronas por tramo). Procederemos a entrenarlo sin limitación. Registraremos la gráfica resultante donde veremos qué significa descaradamente forzar un memorizado puro con "Overfitting" fulminante hacia los datos internos desde cero sin importar reevaluaciones nuevas a la muestra apartada de monitorización local.
2.  **El Sistema Penalizado y Corregido (Regularizado):** Copiaremos integral y ciegamente el volumen arquitectónico inicial anterior agregando los correctores: Introducción activa en capas de Dropout intermedio para desactivar ese comportamiento de dependencias directas de memoria. Por fin, envolveremos el proceso blindado aplicando su Early Stopping correspondiente.
3.  **Estudio Clínico Final Combinado:** Sobre nuestro servidor gráfico uniremos interponiendo las firmas estadísticas y en el punto concreto donde originalmente la estructura de red del experimento de partida sufría sin fin un desajuste y destrozos contundentes de rendimiento se convertirá a tiempo total, al aplicar penalizaciones, como una progresión lineal equilibrada que garantiza y retiene la valía predictiva del conjunto sin destruir el resultado a aplicar exteriormente.
