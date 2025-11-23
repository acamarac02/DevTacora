



## 1. Introducción

* Qué es Random Forest
* Por qué surge (solución al sobreajuste de los árboles)
* Analogía intuitiva: *“varios árboles votando”*

## 2. Dataset de ejemplo

* Presentación breve del dataset elegido
* Por qué es adecuado para aprender Random Forest

## 3. ¿Por qué usar Random Forest?

* Ventajas frente a un solo árbol
* Robustez
* Reduce sobreajuste
* Mejor generalización
* “Promedio” de muchos modelos débiles

## 4. Funcionamiento del modelo

* Bagging (Bootstrap Aggregation)
* Sampling aleatorio de datos
* Sampling aleatorio de features
* "Cada árbol ve un mundo diferente"
* El bosque vota la clase final → votación mayoritaria

(Ilustración simple del flujo)

## 5. Hiperparámetros principales

* `n_estimators` (nº árboles)
* `max_depth`
* `max_features`
* `min_samples_split`
* `min_samples_leaf`
* `bootstrap`
* Consejos prácticos para elegirlos

## 6. Overfitting y underfitting en Random Forest

* Cómo detectarlo
* Diferencias respecto a un único árbol
* Reglas prácticas de interpretación

## 7. Métricas de evaluación

* Accuracy
* Matriz de confusión
* Classification Report
* OOB Score (si lo activas)

## 8. Importancia de las variables

* `.feature_importances_`
* Por qué en Random Forest es más estable que en un solo árbol
* Gráfico de importancia

## 9. Ejemplo en Python paso a paso

* Entrenamiento básico
* Comparación con Decision Tree
* Visualización rápida de parámetros
* Evaluación en train/test
* Interpretación de resultados

## 10. Ajuste de hiperparámetros (GridSearchCV)

* Diccionario básico recomendado
* Cómo obtener el mejor modelo
* Advertencias (tiempo, nº de árboles)

## 11. Comparación final

* Árbol individual vs Random Forest
* Cuándo usar uno u otro

## 12. Actividad de seguimiento

* EDA + entrenamiento Random Forest
* Ajuste de hiperparámetros
* Comparación con KNN y Decision Tree
* Conclusiones
Breast Cancer Wisconsin

