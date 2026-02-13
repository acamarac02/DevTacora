---
title: "Funciones de activación y Backpropagation"
sidebar_position: 2
description: "Cómo una red neuronal introduce no linealidad y cómo aprende realmente mediante descenso por gradiente y backpropagation."
keywords: [función de activación, ReLU, sigmoid, tanh, softmax, gradiente, descenso por gradiente, backpropagation, vanishing gradient]
---

En el apartado anterior entendimos:

- Qué calcula una neurona
- Qué son los pesos y el sesgo
- Cómo se mide el error
- Qué es el learning rate

Ahora vamos a responder dos preguntas fundamentales:

1. ¿Cómo puede una red neuronal modelar relaciones complejas?
2. ¿Cómo sabe la red qué pesos debe modificar para aprender?

Este tema se divide en dos grandes bloques:

- 🔵 **Funciones de activación** → permiten romper la linealidad.
- 🔴 **Backpropagation y descenso por gradiente** → explican cómo aprende la red.

---

# 🔵 BLOQUE 1 — Funciones de activación

## El problema de la linealidad

Recordemos la fórmula básica de una neurona:

$$
z = \sum x_i w_i + b
$$

Si apilamos muchas neuronas pero todas hacen solo esta operación lineal, el resultado final sigue siendo una función lineal.

👉 La composición de funciones lineales sigue siendo lineal.

Eso significa que, sin algo más, una red con muchas capas sería equivalente a una simple regresión lineal.

Necesitamos introducir **no linealidad**.

---

## ¿Qué es una función de activación?

Una función de activación se aplica después de la suma ponderada:

$$
z = \sum x_i w_i + b
$$
$$
a = f(z)
$$

Su objetivo es:

- Introducir no linealidad
- Permitir que la red modele patrones complejos
- Hacer que múltiples capas tengan sentido matemático

Sin funciones de activación, no existiría el deep learning tal como lo conocemos.

---

## Sigmoid

La función sigmoid transforma cualquier número real en un valor entre 0 y 1.

\[
\sigma(x) = \frac{1}{1 + e^{-x}}
\]

- Rango: (0, 1)
- Se puede interpretar como probabilidad
- Fue muy utilizada en las primeras redes neuronales

Problema:

En valores muy grandes o muy pequeños, su derivada se aproxima a 0.  
Esto provoca el **vanishing gradient** en redes profundas.

---

## Tanh

La función tangente hiperbólica es similar a sigmoid pero centrada en 0.

- Rango: (-1, 1)
- Centrada en cero
- Suele comportarse mejor que sigmoid

Aun así, también puede sufrir problemas de gradiente en redes profundas.

---

## ReLU

ReLU (Rectified Linear Unit) es actualmente la activación más utilizada en deep learning.

\[
ReLU(x) = \max(0, x)
\]

Ventajas:

- Muy simple computacionalmente
- Derivada sencilla
- Reduce el problema del vanishing gradient

Problema:

- Puede producir el fenómeno conocido como **dying ReLU** si una neurona queda siempre en valores negativos.

Aun así, es el estándar en capas ocultas.

---

## Softmax (en capa de salida)

En problemas de clasificación multiclase se usa softmax en la capa final.

Convierte un conjunto de valores en probabilidades cuya suma es 1.

Se usa junto con la función de pérdida **Categorical Cross-Entropy**.

---

## Idea clave del bloque

Las funciones de activación permiten que una red neuronal deje de ser un simple modelo lineal y pueda representar relaciones complejas.

Sin activaciones no hay profundidad real.

---

# 🔴 BLOQUE 2 — Backpropagation y Descenso por Gradiente

Ya sabemos representar cosas complejas.

Ahora necesitamos entender cómo aprende la red.

---

## Recordatorio: queremos minimizar la pérdida

Durante el entrenamiento:

1. La red hace una predicción.
2. Calculamos la pérdida.
3. Ajustamos los pesos.

Pero surge una pregunta clave:

👉 ¿Cómo sabe la red cuánto debe modificar cada peso?

---

## Intuición del gradiente

Imagina que la función de pérdida es una montaña.

- Cada punto representa una combinación de pesos.
- La altura representa el error.
- Queremos bajar hasta el mínimo.

El **gradiente** indica la dirección de mayor subida.

Si queremos minimizar la pérdida, debemos movernos en la dirección contraria al gradiente.

Esto es el **descenso por gradiente**.

---

## ¿Qué es una derivada?

La derivada mide cuánto cambia una función si modificamos ligeramente una variable.

En nuestro caso:

- ¿Cuánto cambia la pérdida si modifico un peso?
- ¿Ese cambio aumenta o reduce el error?

La derivada nos da esa información.

---

## ¿Qué es backpropagation?

Backpropagation es el algoritmo que permite calcular de forma eficiente todas las derivadas necesarias en una red neuronal.

Se basa en la **regla de la cadena**.

En lugar de calcular derivadas de forma aislada, el error se propaga desde la salida hacia atrás.

Proceso conceptual:

1. Forward pass → calcular predicción.
2. Calcular la pérdida.
3. Calcular el gradiente en la salida.
4. Propagar el error hacia atrás.
5. Actualizar pesos.

---

## Regla de la cadena (idea intuitiva)

En una red profunda:

- Un peso de una capa inicial afecta indirectamente a la salida.
- La pérdida depende de múltiples operaciones encadenadas.

La regla de la cadena permite descomponer esa dependencia en pequeños pasos.

Por eso el error puede propagarse hacia atrás capa por capa.

---

## Ciclo completo de aprendizaje

Podemos resumir todo el proceso así:

```

Entrada
↓
Pesos + Sesgo
↓
Activación
↓
Salida
↓
Cálculo de pérdida
↓
Gradiente
↓
Backpropagation
↓
Actualización de pesos
↓
Repetir

```

Ese ciclo se repite durante muchas épocas hasta minimizar la pérdida.

---

## Vanishing y Exploding Gradient

En redes profundas pueden aparecer dos problemas:

### Vanishing gradient
El gradiente se vuelve muy pequeño al propagarse hacia atrás.  
Las primeras capas apenas aprenden.

Es común con sigmoid y tanh.

### Exploding gradient
El gradiente se vuelve demasiado grande.  
Los pesos se actualizan de forma inestable.

ReLU ayuda a mitigar el problema del gradiente que se desvanece.

---

# Conexión final

Ahora ya entiendes:

- Cómo una red puede representar funciones complejas (activaciones).
- Cómo ajusta sus parámetros para minimizar el error (backpropagation).
- Por qué el learning rate es importante.
- Por qué la elección de la activación influye en el aprendizaje.

A partir de aquí, cuando entrenemos redes más profundas, ya no serán una caja negra.

Sabremos qué está ocurriendo internamente.

---

:::info Vídeo recomendado

Para reforzar visualmente la explicación de backpropagation, te recomiendo ver el siguiente vídeo:

https://www.youtube.com/watch?v=_0wdproot34&t=2s

Explica de forma extremadamente clara cómo se propaga el error en una red neuronal y cómo se aplican las derivadas mediante la regla de la cadena.
:::
```






Contenido teórico:
* Funciones activación
* Backpropagation

Seguir vídeo: https://www.youtube.com/watch?v=_0wdproot34&t=2s

Jugar con Tensorflow playgroung