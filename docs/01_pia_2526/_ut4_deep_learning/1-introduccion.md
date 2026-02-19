---
title: "Introducción"
sidebar_position: 1
description: "Qué es el Deep Learning, por qué surge y cómo se diferencia del Machine Learning tradicional. Contexto y aplicaciones reales."
keywords: [Deep Learning, redes neuronales, inteligencia artificial, machine learning, CNN, redes profundas, IA aplicada]
---

El **Deep Learning** es una de las áreas más potentes y revolucionarias de la Inteligencia Artificial actual.  
Gracias a él existen los asistentes de voz, el reconocimiento facial, los traductores automáticos y los modelos generativos como los chatbots modernos.

En esta unidad vamos a entender qué es, por qué surge y qué aprenderás a lo largo del bloque.

---

## Deep Learning

El **Deep Learning (aprendizaje profundo)** es una rama del *Machine Learning* basada en **redes neuronales artificiales con múltiples capas**.

Se llama *deep* (profundo) porque los modelos están formados por varias capas que permiten aprender representaciones cada vez más complejas de los datos.

En lugar de programar manualmente qué características debe usar el modelo, el Deep Learning:

- Aprende automáticamente las representaciones.
- Descubre patrones complejos.
- Escala muy bien con grandes cantidades de datos.

---

### Representación en capas

Una red neuronal profunda está formada por **varias capas conectadas entre sí**.
Cada capa recibe información, la transforma y la envía a la siguiente.

![Arquitectura capas](./0-img/nn-architecture.png)

La clave del Deep Learning es que **cada capa aprende un nivel distinto de representación**.

En lugar de trabajar directamente con los datos originales, el modelo va construyendo versiones cada vez más abstractas y útiles de esa información.

Es como si cada capa respondiera a la pregunta:

> “¿Qué puedo extraer de lo que he recibido para que la siguiente capa lo entienda mejor?”

---

### Un ejemplo intuitivo (imágenes)

Imagina que queremos que el modelo reconozca un gato en una imagen.

Cuando una red neuronal procesa datos:

1. **Primera capa** → detecta patrones muy simples
   No entiende “gatos”.
   Solo identifica cosas básicas como:

   * Bordes
   * Cambios de color
   * Líneas horizontales o verticales

2. **Capas intermedias** → combinan esos patrones
   Empiezan a reconocer estructuras más complejas:

   * Esquinas
   * Formas
   * Texturas
   * Partes como “orejas” o “ojos”

3. **Última capa** → toma una decisión
   Utiliza toda la información anterior para concluir:

   * “Es un gato”
   * “No es un gato”


El poder del Deep Learning no está en una sola capa,
sino en la **composición de muchas transformaciones pequeñas**.

---

### ¿Por qué necesitamos Deep Learning?

El Machine Learning tradicional funciona muy bien con:

- Datos estructurados (tablas)
- Problemas con pocas variables
- Relaciones relativamente simples

Pero empieza a fallar cuando trabajamos con:

- Imágenes
- Audio
- Texto
- Grandes volúmenes de datos
- Patrones altamente no lineales

El Deep Learning surge para resolver estos problemas.

---

## Machine Learning vs Deep Learning

Aunque el Deep Learning forma parte del Machine Learning, no son exactamente lo mismo. El Deep Learning es un **subcampo** dentro del Machine Learning que utiliza un tipo concreto de modelos: las redes neuronales profundas.

El **Machine Learning tradicional** agrupa una gran variedad de algoritmos como la regresión lineal, los árboles de decisión, las máquinas de soporte vectorial (SVM) o el KNN. Estos modelos aprenden patrones a partir de los datos, pero normalmente trabajan con variables que ya han sido preparadas y definidas previamente. Funcionan especialmente bien cuando los datos están organizados en tablas, con columnas claras y significativas (por ejemplo: edad, ingresos, número de compras, etc.). En muchos problemas de negocio y análisis predictivo siguen siendo la opción más eficiente y práctica.

El **Deep Learning**, en cambio, se basa específicamente en redes neuronales con múltiples capas. Su principal diferencia es que no necesita que un humano defina manualmente qué características son importantes: puede aprender directamente a partir de datos más complejos como imágenes, audio o texto. Gracias a su estructura profunda, es capaz de construir representaciones internas cada vez más abstractas, lo que le permite resolver problemas que serían muy difíciles de abordar con modelos tradicionales.

Veamos las diferencias clave:


| Aspecto                           | Machine Learning tradicional                                                                                                                 | Deep Learning                                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Ingeniería de características** | Requiere que el humano diseñe manualmente las variables relevantes (feature engineering). Gran parte del trabajo está en preparar los datos. | Aprende automáticamente las características directamente a partir de los datos crudos, reduciendo la necesidad de diseño manual. |
| **Tipo de datos**                 | Funciona especialmente bien con datos estructurados (tablas con columnas numéricas o categóricas).                                           | Destaca en datos no estructurados como imágenes, audio, texto o vídeo.                                                           |
| **Complejidad del modelo**        | Modelos relativamente simples y más interpretables (regresión, árboles, SVM, etc.).                                                          | Redes neuronales profundas con múltiples capas y gran número de parámetros.                                                      |
| **Interpretabilidad**             | Más fácil de entender y explicar por qué toma una decisión.                                                                                  | Más difícil de interpretar; actúa como un modelo más “caja negra”.                                                               |
| **Coste computacional**           | Entrenamiento rápido y menor necesidad de recursos.                                                                                          | Alto coste computacional; suele requerir GPU y más tiempo de entrenamiento.                                                      |
| **Cantidad de datos necesaria**   | Puede funcionar correctamente con conjuntos de datos pequeños o medianos.                                                                    | Mejora significativamente cuando dispone de grandes volúmenes de datos.                                                          |
| **Escalabilidad del rendimiento** | El rendimiento mejora hasta cierto punto al añadir más datos.                                                                                | Suele seguir mejorando a medida que aumentan los datos y la capacidad del modelo.                                                |
| **Casos típicos de uso**          | Predicción en negocio, scoring, análisis financiero, problemas tabulares.                                                                    | Visión artificial, procesamiento de lenguaje natural, reconocimiento de voz, sistemas generativos.                               |

:::tip CONCLUSIÓN
Deep Learning no sustituye al Machine Learning clásico. Es una herramienta más potente para ciertos tipos de problemas, especialmente cuando los datos son complejos y abundantes.
:::

:::warning ¿Entonces el Deep Learning elimina el preprocesamiento?

No. Las redes neuronales **no eliminan la necesidad de hacer EDA ni preprocesamiento**.

Aunque el Deep Learning puede aprender automáticamente representaciones complejas en imágenes, texto o audio, en datasets tabulares sigue siendo necesario:

- Imputar valores nulos  
- Convertir variables categóricas a formato numérico  
- Escalar o normalizar variables  
- Revisar la calidad de los datos  

En datasets tabulares (como Titanic), el trabajo de preparación de datos sigue siendo fundamental, y en muchos casos los modelos clásicos pueden funcionar igual o incluso mejor que una red neuronal.

El Deep Learning reduce la necesidad de *feature engineering manual* en problemas complejos, pero **no sustituye el análisis ni la limpieza de datos**.
:::



---

## ¿Dónde se usa hoy el Deep Learning?

Algunos ejemplos reales:

- 🔍 Reconocimiento facial  
- 🚗 Vehículos autónomos  
- 🎤 Asistentes de voz  
- 🤖 Chatbots y modelos de lenguaje  
- 🏥 Diagnóstico médico mediante imágenes  
- 📦 Detección de objetos en tiempo real  

En prácticamente cualquier sistema moderno basado en IA avanzada encontrarás redes neuronales profundas.

---

## ¿Qué vamos a aprender en esta unidad?

En este bloque aprenderemos, paso a paso, cómo construir y entrenar modelos de Deep Learning desde cero hasta su uso en aplicaciones reales.

Primero veremos los **fundamentos**: qué es una red neuronal, cómo procesa la información y qué significa realmente “entrenar” un modelo. Entenderemos la lógica que hay detrás de su aprendizaje.

Después trabajaremos con **redes densas**, aplicándolas a problemas de regresión y clasificación. Analizaremos cómo evaluar su rendimiento y qué ocurre cuando el modelo se ajusta demasiado a los datos (sobreajuste), así como las técnicas básicas para evitarlo.

A continuación entraremos en **visión artificial**, donde aprenderemos a trabajar con imágenes utilizando redes convolucionales (CNN). También veremos técnicas como el *data augmentation* y el *transfer learning*, fundamentales cuando los datos son limitados.

Por último, abordaremos la parte práctica de **producción**, viendo cómo exportar un modelo entrenado y prepararlo para integrarlo en una aplicación real.

El objetivo no es solo entender la teoría, sino ser capaces de construir, entrenar y utilizar redes neuronales en proyectos reales.

