---
sidebar_position: 3
sidebar_label: Lectura en Tiempo Real
title: Lectura en Tiempo Real
---

<div class="justify-text">

Firestore ofrece la posibilidad de **sincronizar datos en tiempo real** utilizando `SnapshotListener`. Esto permite que nuestra aplicación se actualice automáticamente cada vez que haya cambios en la base de datos, sin necesidad de hacer consultas manuales repetidas.

`SnapshotListener` es un **escuchador en tiempo real** que se suscribe a una colección o documento en Firestore y **se activa automáticamente** cuando los datos cambian.

✅ **Ventajas de `SnapshotListener`:**  
- 🔄 **Sincronización en vivo:** La UI de la app se actualiza en tiempo real sin que el usuario tenga que hacer "pull-to-refresh".  
- ⚡ **Eficiencia:** Se evitan consultas repetitivas porque Firestore solo envía los cambios.  
- 🔔 **Eventos automáticos:** Detecta cambios en documentos y notifica a la app instantáneamente.  

🚨 **Precaución:** `SnapshotListener` **se mantiene activo hasta que se elimine**, lo que puede generar consumo innecesario de recursos si no se gestiona correctamente.

---

## 🔹 Escuchar cambios en la colección de Anuncios
Vamos a crear un **escuchador en tiempo real** para que nuestra app reciba actualizaciones automáticas cuando se agregue, modifique o elimine un anuncio.

### 📌 Código: Escuchar todos los anuncios en tiempo real
```java
public void listenForAnunciosUpdates() {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios")
        .addSnapshotListener((queryDocumentSnapshots, e) -> {
            if (e != null) {
                Log.e("Firestore", "Error al escuchar cambios en anuncios", e);
                return;
            }

            if (queryDocumentSnapshots != null) {
                for (DocumentChange dc : queryDocumentSnapshots.getDocumentChanges()) {
                    Anuncio anuncio = dc.getDocument().toObject(Anuncio.class);

                    switch (dc.getType()) {
                        case ADDED:
                            Log.d("Firestore", "Nuevo anuncio: " + anuncio.getContenido());
                            break;
                        case MODIFIED:
                            Log.d("Firestore", "Anuncio modificado: " + anuncio.getContenido());
                            break;
                        case REMOVED:
                            Log.d("Firestore", "Anuncio eliminado: " + anuncio.getContenido());
                            break;
                    }
                }
            }
        });
}
```

### 🔍 Explicación del código
1️⃣ **`db.collection("anuncios")`** → Se suscribe a la colección `anuncios`.  
2️⃣ **`addSnapshotListener(...)`** → Se añade un **escuchador en tiempo real**.  
3️⃣ **`if (e != null) {...}`** → Maneja errores en caso de que la conexión falle.  
4️⃣ **`queryDocumentSnapshots.getDocumentChanges()`** → Devuelve los cambios que ocurrieron en la colección.  
5️⃣ **Se recorren los cambios con un `for` y `switch`:**  
   - 🔹 **`ADDED`** → Cuando se añade un nuevo anuncio.  
   - 🔹 **`MODIFIED`** → Cuando se edita un anuncio existente.  
   - 🔹 **`REMOVED`** → Cuando se elimina un anuncio.  

:::info TEN EN CUENTA QUE...
Dentro del switch deberás realizar las operaciones oportunas: añadir el nuevo anuncio a tu lista del RecyclerView cuando la operación es ADD, eliminarla si es MODIFIED...
:::

---

## 🔹 Escuchar un solo anuncio en tiempo real
Si en lugar de escuchar todos los anuncios queremos **monitorear un anuncio específico**, podemos usar este código:

```java
public void listenForAnuncio(String anuncioId) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios").document(anuncioId)
        .addSnapshotListener((documentSnapshot, e) -> {
            if (e != null) {
                Log.e("Firestore", "Error al escuchar cambios en el anuncio", e);
                return;
            }

            if (documentSnapshot != null && documentSnapshot.exists()) {
                Anuncio anuncio = documentSnapshot.toObject(Anuncio.class);
                Log.d("Firestore", "Anuncio actualizado: " + anuncio.getContenido());
            } else {
                Log.d("Firestore", "El anuncio ha sido eliminado");
            }
        });
}
```

### 🔍 Explicación del código
1️⃣ `db.collection("anuncios").document(anuncioId)` → Se suscribe a un solo documento.  
2️⃣ Cada vez que el documento cambia, `addSnapshotListener` se activa automáticamente.  
3️⃣ Si el `documentSnapshot.exists()`, significa que el anuncio aún existe y se actualiza la UI.  
4️⃣ Si `documentSnapshot == null` o `!exists()`, significa que el anuncio fue eliminado.  

---

## 🔹 Detener `SnapshotListener`
Como `SnapshotListener` se mantiene activo en todo momento, es importante **eliminarlo cuando ya no sea necesario** (por ejemplo, cuando el usuario cambia de pantalla o cierra la app).

Para ello, almacenamos el listener en una variable y lo detenemos manualmente:

```java
// Variable de tu Fragment
private ListenerRegistration anunciosListener;

// Aquí iniciamos la escucha
// Puedes llamar a este método en el onViewCreated de tu Fragment
public void startListening() {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    anunciosListener = db.collection("anuncios")
        .addSnapshotListener((queryDocumentSnapshots, e) -> {
            if (e != null) {
                Log.e("Firestore", "Error al escuchar cambios", e);
                return;
            }
            
            for (DocumentSnapshot document : queryDocumentSnapshots) {
                Anuncio anuncio = document.toObject(Anuncio.class);
                Log.d("Firestore", "Anuncio actualizado: " + anuncio.getContenido());
            }
        });
}

// Aquí eliminamos la escucha
public void stopListening() {
    if (anunciosListener != null) {
        anunciosListener.remove(); // Desactiva el escuchador
        Log.d("Firestore", "Listener eliminado");
    }
}
```

### 🔍 Explicación del código
1. Guardamos el `SnapshotListener` en la variable `anunciosListener`.  
2. Cuando ya no necesitamos escuchar cambios, llamamos `anunciosListener.remove()`. 

:::info RECOMENDACIÓN

Se recomienda ejecutar `stopListening()` en **`onStop()`** de una `Activity` o `Fragment` para liberar recursos:

```java
@Override
protected void onStop() {
    super.onStop();
    stopListening();
}
```
:::

</div>