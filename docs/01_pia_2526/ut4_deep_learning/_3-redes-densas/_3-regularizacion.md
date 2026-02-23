

Conceptos:
* Overfitting
* Dropout
* L2
* Batch normalization
* Comparar modelos con y sin regularización (Tensorboard?)

Actividad seguimiento: aplicar regularización a los ejercicios de clasificación y regresión


## Evitando la memorización: Early Stopping

Cuando entrenamos una red neuronal, corremos el riesgo de que aprenda "demasiado bien" los datos de entrenamiento, hasta el punto de memorizar el ruido en lugar del patrón general. A esto se le llama **Overfitting** (sobreajuste).

### ¿Cómo detectarlo?
Lo veremos claramente en las gráficas de pérdida (Loss) que nos muestra TensorBoard o el historial de entrenamiento:

*   La pérdida en **Train** sigue bajando indefinidamente.
*   La pérdida en **Validation** deja de bajar y empieza a subir.

Ese punto de inflexión es donde el modelo empieza a memorizar.

### La solución más sencilla: Early Stopping
En lugar de intentar adivinar cuántas épocas necesita el modelo (¿100? ¿200? ¿500?), usamos una técnica llamada **Early Stopping** (parada temprana).

Funciona así:
1.  Monitorizamos la pérdida de validación en cada época.
2.  Si la pérdida de validación no mejora durante un número determinado de épocas (paciencia), **paramos el entrenamiento automáticamente**.
3.  Restauramos los pesos del modelo al punto donde consiguió el mejor resultado.

Es una forma muy eficaz y sencilla de evitar el sobreajuste sin complicar la arquitectura del modelo.

```python
# 1. Definir el callback
early_stopping = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss',    # Monitorizamos el error de validación
    patience=10,           # Si no mejora tras 10 épocas, paramos
    restore_best_weights=True  # Al parar, recuperamos los mejores pesos
)

# 2. Entrenar el modelo con el callback
history = model.fit(
    X_train, y_train,
    epochs=500, # Podemos poner muchas épocas, el callback parará cuando deba
    validation_data=(X_valid, y_valid),
    callbacks=[early_stopping],
    verbose=0
)
```
