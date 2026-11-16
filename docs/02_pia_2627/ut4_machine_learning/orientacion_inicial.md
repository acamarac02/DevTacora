
En este documento se explica cómo quiero impartir la UT4. Machine Learning.
Partimos del aprendizaje del EDA y preprocesamiento en la unidad anterior.

# Secciones
Este tema va a estar dividido en 2 secciones:

- Aprendizaje supervisado:
    - Clasificación
    - Regresión
- Aprendizaje no supervisado

# Sección aprendizaje supervisado: clasificación

Sesión 1:
- Conceptos básicos
- Métricas (accuracy, matriz de confusión, precision, recall, F1) - Los más complejos, precision y recall explicarlos con un gráfico o imagen. Me gusta como lo explican en ApuntesClasificacion.pdf (aunque no es necesario que lo expliques tan complejo como ahí pero si que se entiende bien que variando el threshold cambia precision y recall. Según problema, nos interesa aumentar uno u otro (ej. detección de cancer es preferible dar falsos postivos antes de que se nos escapen))
- Detección de over/underfitting en nuestro modelo
- Analiza si debería explicar algo más en esta sesión que no se vaya a cubrir con las siguientes sesiones y que sea fundamental en clasificación

Realización del ejercicio Practica_1_Introduccion.ipynb (quizá hay que añadirle más métricas)

Sesión 2-8: PROYECTO 1.
Cada pareja de alumnos deberá estudiar el funcionamiento de un modelo de clasificación y hacerse "experto" en él.

Modelos a estudiar (son 9 grupos, quizá alguno tiene que repetir o dime si merece la pena estudiar algún modelo más):
- Regresión logística (binaria y multiclase)
- KNN
- Decision Tree
- Random Forest
- Gradient Boosting
- SVM
- XGBoost

Cada grupo deberá estudiar de su modelo elegido y elaborar una documentación (presentación):
- Conceptos teóricos (funcionamiento interno, sin entrar en conceptos matemáticos)
- Hiperparámetros fundamentales
- Atributos útiles que se pueden consultar a partir del modelo entrenado
- Necesidades de preprocesamiento: requiere escalado, sensible a outliers, otros conceptos...

Esos conceptos teóricos deben ser expuestos en una presentación. ¿Duración de la presentación?
Importante de cara a la evaluación de esta parte teórica:
- Preferencia de contenido resumido pero importante a mucha paja textual
- Dominio del tema por parte del alumno en la presentación
- Completitud de la información aportada (hasta cierto punto, hay modelos muy complejos)

También tendrán que preparar dos JupyterNotebook: clasificación binaria y multiclase (creo que es mejor que les diga yo con qué dataset probar para que todos lleguen a los mismos resultados y que no requiera preprocesamiento):
- Carga del dataset
- División en train/test
- Entreno del modelo mostrando los hiperparámetros estudiados (valores que ellos consideren, de momento sin GridSearch)
- Mostrar atributos útiles
- Predicciones con nuevos datos
- Análisis over/underfitting
- Evaluación y métricas
- Conclusiones de las métricas obtenidas

Sesión 9-12:
- Ajuste de hiperparámetros (GridSearch) y Cross Validation

PROYECTO 2. Trabajo individual: Pipeline completo de clasificación

Buscar un dataset (el mismo para todos los alumnos) que no sea muy complejo pero que tenga algo de preprocesamiento. El año pasado cree un titanic_sucio.csv. No se si utilizar ese o quizá otro dataset que me recomiendes.

Entregar un JupyterNotebook con:
- EDA (más sencillo que lo enseñado, hacer bucle para los gráficos y realizar tabla resumen)
- Preprocesamiento obligatorio con Pipelines
- Entrenamiento de diferentes modelos y para cada uno:
    - Análisis over/underfitting
    - Métricas
- Tabla resumen modelo, hiperparámetros seleccionados y métricas
- Selección del mejor modelo

# Sección aprendizaje supervisado: regresión

Sesión 1:
- Conceptos teóricos regresión
- Métricas
- Breve repaso modelos (características que varíen con respecto a clasificación Regresión Lineal (mencionar polinómica, etc))

Siguientes sesiones: PROYECTO 3. Trabajo individual: Pipeline completo de regresión

Misma lógica que el proyecto anterior pero con regresión.

# Sección aprendizaje no supervisado

Pendiente de revisar