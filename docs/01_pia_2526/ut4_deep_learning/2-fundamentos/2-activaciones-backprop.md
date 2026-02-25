---
title: "Funciones de activación y Backpropagation"
sidebar_position: 2
description: "Entendiendo el motor de las redes neuronales: cómo la no linealidad y el ajuste de errores permiten que la IA aprenda patrones complejos."
keywords: [funciones de activación, relu, sigmoid, softmax, backpropagation, descenso por gradiente, optimizadores, redes neuronales]
---

En el apartado anterior vimos cómo una neurona simple puede aprender una relación lineal (como Celsius a Fahrenheit). Pero, ¿qué ocurre cuando el problema no es una línea recta? ¿Cómo hace una red para aprender a reconocer un gato o predecir el precio de una vivienda con cientos de variables?

En esta sección vamos a descubrir:
* **El "pegamento" de las redes**: Las funciones de activación.
* **El cerebro del entrenamiento**: El algoritmo de Backpropagation.
* **La brújula**: El descenso por gradiente y los optimizadores.

:::info Vídeo recomendado

Para reforzar visualmente la explicación de backpropagation y funciones de activación, te recomiendo ver el siguiente vídeo:

https://www.youtube.com/watch?v=_0wdproot34&t=2s

Explica de forma clara cómo se propaga el error en una red neuronal y cómo se aplican las derivadas mediante la regla de la cadena.
:::


---

## ¿Por qué necesitamos funciones de activación?

Si recordamos el perceptrón, su cálculo era una suma ponderada: $salida = \sum(x_i w_i) + b$. Esto es, esencialmente, una operación lineal.

### El problema de la linealidad

Imagina que construyes una red neuronal con 100 capas de profundidad, pero **no utilizas** funciones de activación. Matemáticamente, la combinación de muchas funciones lineales sigue siendo una función lineal. 

> **Dicho de otro modo:** Sin funciones de activación, una red neuronal ultra-compleja de mil capas tiene la misma capacidad de aprendizaje que una simple Regresión Lineal. No importa cuántas neuronas añadas; solo podrías dibujar líneas rectas.

### Introduciendo la "no linealidad"

El mundo real no es lineal. Para que una red neuronal pueda aprender patrones complejos (como curvas, bordes en una imagen o estructuras de lenguaje), necesitamos algo que "rompa" esa linealidad.

Las **funciones de activación** se encargan de esto:
* Deciden si una neurona debe "dispararse" (activarse) o no.
* Transforman la suma ponderada en algo más complejo.
* Permiten que la red aprenda **formas curvas y patrones intrincados** en los datos.


Al aplicar una función de activación a la salida de cada neurona, permitimos que la red se convierta en un **aproximador universal**, capaz de representar prácticamente cualquier relación matemática entre la entrada y la salida.

## Catálogo de funciones de activación más comunes

Para que la red neuronal pueda aprender relaciones complejas, necesitamos aplicar diferentes "filtros" matemáticos a la salida de las neuronas. Estas son las funciones de activación más utilizadas en la actualidad:

### ReLU (Rectified Linear Unit)

Es el estándar de la industria para las **capas ocultas**. Su fórmula es $f(x) = \max(0, x)$.

![Gráfica](../0-img/fa-relu.png)

* **Funcionamiento**: Si la entrada es positiva, la deja pasar exactamente como está; si es negativa, la convierte en cero.
* **Por qué se usa**: Es extremadamente rápida de calcular. Además, ayuda a que los modelos grandes aprendan más rápido porque no "aplana" los valores positivos (evita la saturación).
* **Riesgo**: Existe el problema de la "muerte de neuronas" si muchas entradas se vuelven negativas y se quedan bloqueadas en cero.

### Sigmoide (Sigmoid) 🔗

Esta función toma cualquier número y lo "aplasta" para que quepa en el rango entre **0 y 1**.

![Gráfica](../0-img/fa-sigmoid.png)

* **Interpretación**: Ese valor entre 0 y 1 se puede leer directamente como una **probabilidad** (por ejemplo, 0.85 = 85% de probabilidad).
* **Uso ideal**: Casi exclusivamente en la **capa de salida** de problemas donde la respuesta es "Sí o No" (clasificación binaria).
* **Limitación**: En capas profundas es problemática porque sus extremos son muy planos, lo que hace que el aprendizaje sea lentísimo (problema del gradiente desvaneciente).

### Tanh (Tangente hiperbólica)

Es una versión "estirada" de la sigmoide que va de **-1 a 1**.

![Gráfica](../0-img/fa-tanh.png)

* **Ventaja sobre la sigmoide**: Al estar centrada en el **cero**, los datos que salen de ella tienen una media cercana a cero, lo que suele facilitar que la siguiente capa aprenda mejor.
* **Uso**: Se usa en capas ocultas cuando queremos que el modelo sea capaz de manejar valores negativos con facilidad.

### Softmax

A diferencia de las anteriores, Softmax no mira a una sola neurona, sino a **todo el grupo** de neuronas de la capa de salida.

![Gráfico EDA](../0-img/fa-softmax.png)

* **Lógica**: Toma todas las puntuaciones de salida y las convierte en una **distribución de probabilidad** que suma 100% (o 1.0).
* **Uso**: Es obligatoria en la capa de salida para problemas de **clasificación multiclase** (por ejemplo, decidir si una imagen es un gato, perro o pájaro).


### Comparativa

| Función | Fórmula simplificada | Rango | Aplicación Típica |
| --- | --- | --- | --- |
| **ReLU** |  $$f(x) = \max(0, x)$$  | $[0, \infty)$ | Capas ocultas (General) |
| **Sigmoide** | $$f(x) = \frac{1}{1 + e^{-x}}$$ | $(0, 1)$ | Salida binaria (Probabilidad) |
| **Tanh** | $$f(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$$ | $(-1, 1)$ | Capas ocultas específicas |
| **Softmax** | $$f(x_i) = \frac{e^{x_i}}{\sum e^{x_j}}$$ | $(0, 1)$ | Salida multiclase (Excluyente) |

---

## ¿Cómo aprende la red? El descenso por gradiente

Una vez que la red ha dado una respuesta (gracias a sus pesos, sesgos y funciones de activación), comparamos ese resultado con el valor real usando la **función de pérdida (Loss Function)**. Si el error es alto, hay que ajustar los pesos. Pero, ¿hacia dónde los movemos?

### Analogía del arquero: ¿Qué estamos corrigiendo?

Imagina que estás aprendiendo a disparar con un arco. No eres un experto, así que la primera vez que disparas, el resultado es un poco caótico.

El proceso del arquero sería algo similar a:

1. **El Disparo (Forward Propagation):** Te preparas, ajustas la tensión de la cuerda, inclinas el brazo y sueltas la flecha. La flecha vuela y aterriza en algún lugar.
2. **La Medida del Error (Loss Function):** Miras dónde cayó la flecha en relación con el centro de la diana. Si cayó 20 cm a la derecha y 10 cm arriba, esa distancia es tu "error".
3. **La Reflexión (Backpropagation):** Aquí es donde ocurre la magia. No solo dices "fallé", sino que piensas: *"Si la flecha se fue a la derecha, ¿qué causó eso?"*. Tal vez fue la presión de tus dedos o la posición de tu hombro. Vas "hacia atrás", desde el error hasta tus movimientos iniciales, para entender qué corregir.
4. **El Ajuste (Optimizer):** La próxima vez, decides tensar un poco menos o mover el brazo un milímetro a la izquierda. No cambias todo drásticamente, haces un ajuste pequeño.

El error de nuestra red (la distancia al centro de la diana) se debe a dos factores:

* **El Sesgo (Bias) 🎯**: Es la distancia entre el centro de la diana y el lugar donde suelen caer las flechas. Si el arquero siempre dispara demasiado a la izquierda, tiene un **sesgo alto**. En nuestra red, esto significa que el modelo es demasiado simple (underfitting) y no alcanza a entender la complejidad de los datos.
* **La Varianza (Variance) 📈**: Es la dispersión de las flechas. Si el arquero dispara y las flechas quedan muy lejos unas de otras, tiene una **varianza alta**. En la red, esto ocurre cuando el modelo es demasiado sensible a pequeñas variaciones (ruido) del entrenamiento (overfitting).

> **El objetivo del entrenamiento**: El Descenso por Gradiente es el proceso de ajustar la técnica del arquero tras cada disparo para que sea preciso (bajo sesgo) y constante (baja varianza).

![Gráfica](../0-img/arquero.png)

### La analogía de la montaña con niebla

¿Cómo sabe el arquero qué corregir? Imagina que estás en la cima de una montaña y hay una niebla tan espesa que no ves nada. Tu objetivo es llegar al **valle** (el punto donde el error es mínimo).

1. Como no ves el camino, tanteas con el pie el terreno a tu alrededor.
2. Buscas la dirección en la que el suelo **baja más rápido**.
3. Das un paso pequeño en esa dirección (el tamaño del paso es el **Learning Rate**).
4. Repites el proceso hasta que sientes que el suelo ya no baja más.

![Gráfico EDA](../0-img/descenso-gradiente.png)



### El Gradiente como brújula

En matemáticas, el **gradiente** es un vector que nos indica la dirección de máxima subida. Como nosotros queremos **bajar** el error, seguimos la dirección opuesta al gradiente.

* Si el gradiente es positivo: el peso debe disminuir.
* Si el gradiente es negativo: el peso debe aumentar.

![Gráfica](../0-img/descenso-gradiente-2.png)

:::warning ACLARACIÓN DESCENSO DE GRADIENTE
 El descenso por gradiente no nos dice cuánto error hay (eso lo dice la función de pérdida), nos dice **hacia dónde caminar** para que el error baje en la siguiente iteración.

 Para más información puedes leer este artículo de [codificandobits](https://codificandobits.com/blog/el-gradiente-descendente/)
:::

---

## Backpropagation: El arte de repartir culpas

El **Backpropagation** (o propagación hacia atrás) es el corazón del aprendizaje en las redes neuronales. Es el proceso matemático que permite "repartir las culpas" del error entre todos los pesos y sesgos de la red para que el **descenso por gradiente** sepa exactamente qué ajustar.

Si el descenso por gradiente es nuestra brújula para bajar la montaña, el **Backpropagation** es el mecanismo que nos dice cuánto contribuyó cada parte de nuestra red a que termináramos en el lugar equivocado.

### El flujo de la información: Forward vs. Backward

Para entender el Backpropagation, hay que visualizar el viaje de los datos en dos sentidos:

1. **Forward Pass (Hacia adelante)**: Los datos entran, se multiplican por los pesos, pasan por las funciones de activación y generan una predicción.
2. **Cálculo del Error**: Comparamos la predicción con el valor real usando la función de pérdida.
3. **Backward Pass (Hacia atrás)**: El error viaja en sentido contrario, desde la salida hasta la entrada, calculando la responsabilidad de cada neurona en ese fallo.

### ¿Quién tiene más culpa?

Imagina que el arquero falla el tiro por 10 cm. El Backpropagation analiza la "cadena de mando" hacia atrás:

* ¿Fue culpa de la tensión del arco (capa de salida)?
* ¿Fue culpa de la postura del brazo (capa oculta)?
* ¿O fue culpa de cómo colocó los pies al principio (capa de entrada)?

Matemáticamente, esto se hace mediante la **Regla de la Cadena**. Esta regla permite calcular cómo cambia el error total cuando movemos un peso específico en el medio de la red.

> **En resumen**: El Backpropagation calcula el **gradiente** (la dirección del ajuste) para cada peso individual de la red, permitiendo que el optimizador sepa si debe subirlo o bajarlo ligeramente.

---

### Experimentación Práctica: Google Colab

Para asentar estos conceptos, hemos preparado un cuaderno interactivo donde puedes ver al "arquero" en acción.

👉 **Puedes abrir el cuaderno aquí:**
[Demo descenso gradiente](../0-colab/demo_descenso_gradiente.ipynb)

**¿Para qué sirve este laboratorio?**

* **Visualizar la "Montaña del Error" 🏔️**: Verás cómo la función de pérdida crea una pendiente que la red debe bajar.
* **Ajustar el paso (Learning Rate) 👣**: Puedes cambiar el `lr` para ver qué pasa si el arquero da pasos muy cortos o demasiado largos.
* **Entender la ReLU 🛤️**: Observarás por qué la gráfica se vuelve plana a la izquierda (el error es constante) y cómo eso afecta al aprendizaje.

**Anatomía de nuestra mini-red**

* **1 Neurona de Entrada ():** Es el punto donde la red recibe el dato inicial (en nuestro caso, el número ).
* **1 Neurona Oculta:** Aquí es donde ocurre la primera transformación. La entrada se multiplica por el **Peso 1 ()** y luego pasa por la función de activación **ReLU**.
* **1 Neurona de Salida:** El resultado de la neurona oculta se multiplica por el **Peso 2 ()** para darnos la **Predicción** final.

Trabajar con una sola neurona nos permite ver con total claridad la relación matemática entre el **peso** y el **error**. En una red real con millones de neuronas, esta "montaña de error" tendría millones de dimensiones, pero la lógica de bajar hacia el valle sigue siendo la misma.

---

## Optimizadores: El ritmo del aprendizaje

Si el **Backpropagation** nos da la dirección (el gradiente) y el **Learning Rate** define el tamaño del paso, los **Optimizadores** son algoritmos que deciden cómo aplicar esos ajustes de forma inteligente para llegar al valle del error lo más rápido posible sin "tropezar".

### ¿Por qué necesitamos un optimizador?

En el ejemplo del Colab, vimos que si el paso es muy grande, el peso puede rebotar de un lado a otro. Un optimizador ayuda a suavizar ese movimiento. Su función principal es gestionar la **velocidad** y la **inercia** del descenso.

* **Inercia (Momentum) ⚽**: Imagina una bola bajando la montaña. Si la pendiente es muy pronunciada, la bola gana velocidad. El optimizador usa esto para atravesar zonas planas o pequeños baches que podrían detener a un arquero que va paso a paso.
* **Adaptabilidad 🧠**: No todos los pesos necesitan cambiar a la misma velocidad. Algunos necesitan pasos grandes al principio y otros pasos minúsculos para ajustar la precisión final.

### Tipos comunes de Optimizadores

Existen varios "estilos" de descenso, pero estos son los más utilizados:

| Optimizador | Características | Analogía |
| --- | --- | --- |
| **SGD** (Stochastic Gradient Descent) | El más básico. Actualiza los pesos con cada grupo de datos. | Un caminante con brújula que da pasos constantes. |
| **Adam** (Adaptive Moment Estimation) | El estándar actual. Combina inercia y pasos adaptables para cada peso. | Un explorador con GPS que corre en las bajadas y camina con cuidado al llegar al destino. |
| **RMSprop** | Muy bueno para redes que trabajan con secuencias (como texto). | Un corredor que ajusta su velocidad según lo accidentado que sea el terreno. |

> **Nota técnica:** En la mayoría de los proyectos modernos, se empieza usando **Adam** por defecto, ya que suele encontrar el valle del error de forma más eficiente que el resto.

---

### Laboratorio Comparativo: SGD vs. Adam

En este experimento, enfrentamos al optimizador más básico contra el estándar de la industria. El objetivo es observar cómo la **inercia** y la **adaptabilidad** cambian la forma en que una red encuentra la solución.

**¿Qué observar en este Colab?**

* **La "Memoria" de Adam 🧠**: Nota cómo Adam acumula velocidad. Si el error es grande durante varios pasos, Adam "se confía" y acelera, lo que puede provocar que se pase de largo (overshoot) antes de frenar.
* **La Constancia de SGD 🐢**: Observa que SGD es mucho más previsible. Sus pasos dependen solo de la pendiente actual, lo que lo hace más lento pero a veces más estable en problemas simples.
* **El rebasamiento (Overshoot) 🎢**: Fíjate en los valores negativos de Adam. ¿Por qué sigue avanzando hacia la izquierda si el error ya era cero? Es la inercia de sus pasos anteriores intentando estabilizarse.

---

## Problemas Comunes en el Entrenamiento

Incluso con el mejor optimizador, el aprendizaje puede fallar por factores matemáticos o de configuración. Aquí los tres más importantes:

### Gradientes Explosivos y Desvanecientes

Ocurre cuando el gradiente, al viajar hacia atrás por las capas, se vuelve extremadamente grande o casi cero.

* **Explosivos**: El ajuste es tan violento que los pesos "explotan" (se vuelven `NaN` o infinitos). La red se vuelve inestable.
* **Desvanecientes (Vanishing)**: El ajuste es tan minúsculo que las capas profundas dejan de aprender. Es como intentar mover una montaña con un soplido.

### Sobreajuste (Overfitting)

La red se vuelve tan buena memorizando los datos de entrenamiento que pierde la capacidad de generalizar. Es como un alumno que memoriza las respuestas del examen pero no entiende la materia: si le cambias una coma, suspende.

### Mínimos Locales y Mesetas (Plateaus)

A veces el "arquero" se queda atrapado en un pequeño valle que no es el punto más bajo de la montaña (mínimo local) o en una zona tan plana que no sabe hacia dónde seguir bajando. Aquí es donde **Adam** brilla gracias a su "inercia" para seguir avanzando.

![Gráfica](../0-img/mesetas.png)

---

## Actividad de Seguimiento: Jugando en el Laboratorio de Neuronas

Para entender cómo interactúan todas las piezas que hemos estudiado, entra en [TensorFlow Playground](https://playground.tensorflow.org/) y realiza el siguiente experimento guiado.

### El Objetivo

Configurar una red neuronal capaz de clasificar el conjunto de datos **"Circular"** (el que tiene un círculo azul dentro de un anillo naranja) con el menor error posible.

### Instrucciones de Configuración

1. **Datos**: Selecciona el dataset circular (arriba a la izquierda).
2. **Arquitectura**: Empieza con una red muy simple: **1 capa oculta con 2 neuronas**. Si no es suficiente, prueba con problemas más complejos.
3. **El "Pegamento" (Activación)**: Cambia entre las diferentes.
4. **La Brújula (Learning Rate)**: Configúralo en **0.03**. Ve cambiando el valor hasta conseguir que se separen correctamente los datos.

