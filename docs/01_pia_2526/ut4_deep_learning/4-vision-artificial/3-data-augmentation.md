---
title: "Data Augmentation"
sidebar_position: 3
description: "Cómo combatir el overfitting expandiendo artificialmente tu dataset mediante transformaciones de imagen."
keywords: [data augmentation, aumento de datos, overfitting, regularización, Keras, preprocessing layers]
---

En los apartados anteriores vimos cómo funcionan las CNN y cómo pueden identificar patrones. Sin embargo, las redes profundas tienen un "defecto": son **extremadamente hambrientas de datos**. 

Si entrenamos un modelo complejo con un dataset pequeño, la red acabará memorizando las fotos concretas en lugar de aprender los conceptos generales. Esto es lo que conocemos como **Overfitting** (sobreajuste).

---

## 1. Preprocesamiento Base: Unificando la Entrada

Antes de hablar de "aumentar" los datos, debemos asegurar que todos nuestros datos tengan el mismo formato. En un proyecto real, las imágenes pueden venir de diferentes cámaras, móviles o internet, cada una con una resolución distinta.

Las redes neuronales convolucionales requieren que la entrada sea **fija** (ej: todas las imágenes deben ser de 180x180 píxeles).

### Resizing y Rescaling
Para que la red aprenda mejor, solemos aplicar tres pasos en este orden:

1.  **Resizing**: Ajusta el tamaño de la imagen (ej: 180x180). Tip: usa `crop_to_aspect_ratio=True` para no distorsionar.
2.  **Rescaling**: Comprime los píxeles de [0, 255] al rango [0, 1] o [-1, 1].

---

## 2. El Problema: El Overfitting y la Escasez de Datos

Cuando una red neuronal tiene millones de parámetros pero solo unos pocos miles de imágenes para entrenar, ocurre lo siguiente:
*   La red detecta detalles irrelevantes (ej: una mancha específica en el fondo de una foto de un perro).
*   En el entrenamiento obtenemos un 99% de acierto, pero en validación/test el resultado es pobre.
*   El modelo no es capaz de **generalizar**.

**Data Augmentation** es una de las técnicas de regularización más potentes en visión artificial para solucionar esto sin necesidad de salir a la calle a sacar miles de fotos nuevas.

---

## 3. ¿Qué es el Data Augmentation?

Consiste en **generar nuevas muestras de entrenamiento a partir de las existentes**, aplicándoles transformaciones aleatorias que no cambian el significado de la imagen (la etiqueta).

Si a una foto de un gato le aplicamos una rotación de 10 grados, **sigue siendo un gato**. Para la red neuronal, sin embargo, es un conjunto de píxeles totalmente nuevo que debe aprender a clasificar.

---

## 4. Técnicas de Transformación Comunes

### 4.1. Transformaciones Geométricas
Son las más utilizadas ya que alteran la posición de los objetos:
*   **Horizontal / Vertical Flip**: Voltear la imagen como en un espejo. (Cuidado: en dígitos como el "7", un flip horizontal lo convierte en algo irreconocible, pero en fotos de perros es perfecto).
*   **Rotation**: Rotar la imagen un número aleatorio de grados.
*   **Zoom**: Acercar o alejar la imagen aleatoriamente.
*   **Width/Height Shift**: Desplazar la imagen horizontal o verticalmente.
*   **Shear**: Aplicar una distorsión de "cizalla" (inclinar el objeto).

### 4.2. Transformaciones de Color y Brillo
Ayudan a que el modelo sea robusto a las condiciones ambientales:
*   Cambiar el brillo (*brightness*).
*   Ajustar el contraste o la saturación.
*   Añadir ruido aleatorio.

![Gráfico Data Augmentation](../0-img/data-augmentation-examples.png)

---

## 5. Implementación Moderna en Keras (Preprocessing Layers)

Tradicionalmente se usaba `ImageDataGenerator`, pero la forma moderna y recomendada en TensorFlow 2.x es usar **Capas de Preprocesamiento**. Se añaden directamente al modelo como si fueran capas `Conv2D`.

```python
from tensorflow.keras import layers, models

data_augmentation = models.Sequential([
  layers.RandomFlip("horizontal"),
  layers.RandomRotation(0.1),
  layers.RandomZoom(0.1),
])

# Se integra al principio del modelo
model = models.Sequential([
  # 1. Capas de Preprocesamiento Base
  layers.Resizing(180, 180, crop_to_aspect_ratio=True),
  layers.Rescaling(1/255.0),

  # 2. Capas de Data Augmentation (solo activas en entrenamiento)
  data_augmentation, 
  
  # 3. Resto de la arquitectura CNN
  layers.Conv2D(32, (3, 3), activation='relu'), # Ya no hace falta input_shape aquí
  layers.MaxPooling2D((2, 2)),
  # ...
])
```

:::tip
**¿Esto ocurre en el disco?**  
No. Las transformaciones se calculan **en memoria y en tiempo real** (normalmente en la GPU) mientras el modelo está entrenando. El dataset original en el disco no cambia.

**¿Y en la fase de test?**  
Keras es inteligente: estas capas de "Random" **solo se activan durante el entrenamiento**. Al usar `model.evaluate()` o `model.predict()`, las capas se desactivan automáticamente para no alterar las imágenes de prueba.
:::
---

## 6. Impacto en la Generalización

Al usar Data Augmentation, la curva de pérdida (*loss*) de entrenamiento bajará más despacio (porque el problema se ha vuelto "más difícil" al variar las imágenes), pero la curva de validación se mantendrá mucho más cerca de la de entrenamiento.

**Resultado:** Un modelo más robusto, menos propenso al overfitting y capaz de reconocer objetos en ángulos o posiciones que nunca vio exactamente igual en el dataset original.

---

## 7. Demo: Clasificador de Perros y Gatos

Para ver esto en acción, utilizaremos un dataset clásico de Kaggle: **Dogs vs Cats**. Es un dataset donde las imágenes tienen diferentes tamaños, luces y fondos, lo que lo hace ideal para aplicar estas técnicas.

👉 **[Abrir Cuaderno: Perros vs Gatos con Data Augmentation](../0-colab/perros_gatos_data_augmentation.ipynb)**

---

## Actividad Sugerida: El Reto de las Manos

¿Recuerdas el dataset de **Fashion MNIST**? Aunque las prendas suelen estar centradas, podrías probar lo siguiente:

1.  Recupera tu mejor modelo de Fashion MNIST.
2.  Crea una pequeña secuencia de Data Augmentation que incluya `RandomRotation(0.05)` y `RandomZoom(0.05)`.
3.  Entrena de nuevo y compara las gráficas de Accuracy/Loss con y sin aumento de datos.
4.  **Reflexión**: ¿Ha mejorado la precisión final? ¿Cómo ha afectado al tiempo de entrenamiento?
