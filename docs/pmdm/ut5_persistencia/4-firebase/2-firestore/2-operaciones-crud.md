---
sidebar_position: 2
sidebar_label: Operaciones CRUD
title: Operaciones CRUD
---

<div class="justify-text">

En este apartado vamos a estudiar la sintaxis de las operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en **Firestore** utilizando **Java**. Trabajaremos con un modelo basado en un **tablón de anuncios**, donde los usuarios pueden publicar anuncios con contenido y una fecha.  

---

## 🔹 Inicializar Firestore  
Antes de empezar, asegúrate de **inicializar Firestore** en tu **Activity, Fragment o Repository** para poder acceder a la base de datos.  

```java
FirebaseFirestore db = FirebaseFirestore.getInstance();
```
Esta instancia (`db`) nos permitirá acceder a **colecciones y documentos** dentro de Firestore.

Si la app debe funcionar sin conexión puedes añadir la configuración para el **modo offline**:

```java
FirebaseFirestoreSettings settings = new FirebaseFirestoreSettings.Builder()
        .setPersistenceEnabled(true) // Habilita almacenamiento en caché
        .build();
db.setFirestoreSettings(settings);
```
Esto permite que Firestore almacene datos en caché y los sincronice cuando haya conexión a Internet.  


## 🔹 Modelo de datos (Clase Java)
Creamos la clase `Anuncio` para representar un documento en la colección `anuncios/` en Firestore.  

```java
public class Anuncio {
    private String id;
    private String contenido;
    private long fecha;
    private String uidAutor;

    // Constructor vacío requerido por Firestore
    public Anuncio() {}

    public Anuncio(String contenido, long fecha, String uidAutor) {
        this.contenido = contenido;
        this.fecha = fecha;
        this.uidAutor = uidAutor;
    }

    // Getters y Setters
}
```

---

## 🔹 Crear (Añadir un nuevo anuncio)  

Si queremos insertar un anuncio con un ID generado por nosotros:  
```java
public void addAnuncio(Anuncio anuncio) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios") // Accede a la colección "anuncios"
        .document(anuncio.getId()) // Se usa un ID personalizado
        .set(anuncio) // Guarda el objeto en Firestore
        .addOnSuccessListener(aVoid -> Log.d("Firestore", "Anuncio agregado correctamente")) // Se ejecuta si el anuncio se agregó correctamente
        .addOnFailureListener(e -> Log.e("Firestore", "Error al agregar anuncio", e)); // Se ejecuta si se ha producido un error
}
```

Si queremos que Firestore genere el **ID automáticamente**:  

```java
public void addAnuncioAutoId(Anuncio anuncio) {
    // Generar un nuevo ID para el documento en Firestore
    String idGenerado = db.collection("anuncios").document().getId();

    // Asignar el ID generado al anuncio antes de guardarlo
    anuncio.setId(idGenerado);

    // Insertar el anuncio con el ID generado
    db.collection("anuncios").document(idGenerado)
        .set(anuncio)
        .addOnSuccessListener(aVoid -> Log.d("Firestore", "Anuncio agregado con ID: " + idGenerado))
        .addOnFailureListener(e -> Log.e("Firestore", "Error al agregar anuncio", e));
}
```

Una vez que Firestore guarda el anuncio, el `documentReference` contiene el **ID generado automáticamente**, que se puede recuperar con `.getId()`.

---

## 🔹 Leer (Obtener anuncios)
Firestore permite realizar consultas avanzadas para **leer, filtrar, ordenar y paginar datos**. Estas consultas se ejecutan en **segundo plano**, evitando bloquear la interfaz de usuario.

### 📌 Estructura básica de las consultas
1. Obtener una instancia de `FirebaseFirestore db`  
2. Seleccionar una colección con `db.collection("nombreColeccion")`  
3. (Opcional) Filtrar los documentos con `.whereEqualTo()`, `.whereGreaterThan()`, etc.  
4. (Opcional) Ordenar los resultados con `.orderBy()`  
5. (Opcional) Limitar o paginar la consulta con `.limit()` y `.startAfter()`  
6. Ejecutar la consulta con `.get()`  
7. Manejar el resultado en `addOnSuccessListener()` y errores en `addOnFailureListener()`  


### 📌  Obtener un anuncio por ID
```java
public void getAnuncioById(String anuncioId) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios").document(anuncioId)
        .get()
        .addOnSuccessListener(documentSnapshot -> {
            if (documentSnapshot.exists()) {
                Anuncio anuncio = documentSnapshot.toObject(Anuncio.class);
                Log.d("Firestore", "Anuncio encontrado: " + anuncio.getContenido());
            } else {
                Log.d("Firestore", "No se encontró el anuncio");
            }
        })
        .addOnFailureListener(e -> Log.e("Firestore", "Error al obtener el anuncio", e));
}
```
#### 🔍 **Explicación**  
- Se obtiene la referencia de Firestore con `FirebaseFirestore.getInstance()`  
- Accedemos a la colección `"anuncios"`  
- Buscamos un documento específico por su ID (`anuncioId`) con `.document(anuncioId).get()`  
- Si el documento existe, convertimos los datos a un objeto `Anuncio` con `.toObject(Anuncio.class)`. Observa que este método solo devuelve un anuncio.  
- Si el documento no existe, se muestra un mensaje en los logs  


### 📌 Obtener todos los anuncios
```java
public void getAllAnuncios() {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios")
        .get()
        .addOnSuccessListener(queryDocumentSnapshots -> {
            for (DocumentSnapshot document : queryDocumentSnapshots) {
                Anuncio anuncio = document.toObject(Anuncio.class);
                Log.d("Firestore", "Anuncio: " + anuncio.getContenido());
            }
        })
        .addOnFailureListener(e -> Log.e("Firestore", "Error al obtener los anuncios", e));
}
```
#### 🔍 Explicación  
- Consulta todos los documentos de la colección `"anuncios"` con `.get()`  
- Los resultados se devuelven en un `QuerySnapshot`  
- Se recorren los documentos con un `for` y se convierten en objetos `Anuncio` con `.toObject(Anuncio.class)`  

---

### 📌 Filtrado de datos  

Firestore permite filtrar documentos con **operadores de consulta** como:  
- **`whereEqualTo("campo", valor)`** → Filtrar por un valor exacto  
- **`whereGreaterThan("campo", valor)`** → Filtrar valores mayores a un número  
- **`whereLessThan("campo", valor)`** → Filtrar valores menores a un número  
- **`whereArrayContains("campo", valor)`** → Buscar un valor dentro de un array  


#### **📌 Obtener anuncios de un usuario específico**
```java
public void getAnunciosByAutor(String uidAutor) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios")
        .whereEqualTo("uidAutor", uidAutor)
        .get()
        .addOnSuccessListener(queryDocumentSnapshots -> {
            for (DocumentSnapshot document : queryDocumentSnapshots) {
                Anuncio anuncio = document.toObject(Anuncio.class);
                Log.d("Firestore", "Anuncio de " + uidAutor + ": " + anuncio.getContenido());
            }
        })
        .addOnFailureListener(e -> Log.e("Firestore", "Error al filtrar anuncios", e));
}
```
#### 🔍 **Explicación**  
- Filtra anuncios donde `"uidAutor"` sea igual al `uidAutor` proporcionado  
- Solo devuelve los anuncios creados por ese usuario  


#### 📌 Obtener anuncios publicados después de una fecha específica
```java
public void getAnunciosDesdeFecha(long fechaMinima) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios")
        .whereGreaterThan("fecha", fechaMinima)
        .get()
        .addOnSuccessListener(queryDocumentSnapshots -> {
            for (DocumentSnapshot document : queryDocumentSnapshots) {
                Anuncio anuncio = document.toObject(Anuncio.class);
                Log.d("Firestore", "Anuncio reciente: " + anuncio.getContenido());
            }
        })
        .addOnFailureListener(e -> Log.e("Firestore", "Error en la consulta", e));
}
```
#### 🔍 **Explicación**  
- Filtra anuncios donde `"fecha"` sea mayor que `fechaMinima` usando `.whereGreaterThan()`   

---

### 📌 Ordenado de datos  

Firestore permite ordenar resultados con `.orderBy()`.  
- **`orderBy("campo", Query.Direction.ASCENDING)`** → Orden ascendente  
- **`orderBy("campo", Query.Direction.DESCENDING)`** → Orden descendente  


#### **📌 Ordenar anuncios por fecha (más recientes primero)**
```java
public void getAnunciosOrdenados() {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios")
        .orderBy("fecha", Query.Direction.DESCENDING)
        .get()
        .addOnSuccessListener(queryDocumentSnapshots -> {
            for (DocumentSnapshot document : queryDocumentSnapshots) {
                Anuncio anuncio = document.toObject(Anuncio.class);
                Log.d("Firestore", "Anuncio: " + anuncio.getContenido() + " - Fecha: " + anuncio.getFecha());
            }
        })
        .addOnFailureListener(e -> Log.e("Firestore", "Error al ordenar los anuncios", e));
}
```

---

### 📌 Paginación  

Firestore no admite **paginación automática**, pero se puede hacer con:  
- **`.limit(n)`** → Define la cantidad de documentos por página  
- **`.startAfter(documento)`** → Salta documentos y empieza después de uno en específico  


#### **📌 Obtener los primeros 10 anuncios ordenados por fecha, saltando los 5 primeros**
```java
public void getFirstPage() {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios")
        .orderBy("fecha", Query.Direction.DESCENDING)
        .startAfter(5)
        .limit(10) // Obtiene solo 10 documentos
        .get()
        .addOnSuccessListener(queryDocumentSnapshots -> {
            for (DocumentSnapshot document : queryDocumentSnapshots) {
                Anuncio anuncio = document.toObject(Anuncio.class);
                Log.d("Firestore", "Anuncio: " + anuncio.getContenido());
            }
        })
        .addOnFailureListener(e -> Log.e("Firestore", "Error en la consulta paginada", e));
}
```

---

## 🔹 Actualizar datos  

### 📌 Actualizar campos específicos

Si solamente quieres actualizar campos concretos, puedes utilizar el método update especificando como primer parámetro el nombre del campo y como segundo el nuevo valor que se debe almacenar en dicho campo.

```java
public void updateAnuncioParcial(String anuncioId, String nuevoContenido, long nuevaFecha) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios").document(anuncioId)
        .update("contenido", nuevoContenido, "fecha", nuevaFecha) // Solo actualiza estos dos campos
        .addOnSuccessListener(aVoid -> Log.d("Firestore", "Anuncio actualizado parcialmente"))
        .addOnFailureListener(e -> Log.e("Firestore", "Error al actualizar el anuncio", e));
}
```

### 📌 Actualizar varios campos
Si deseas actualizar varios campos también puedes usar **`.set(anuncio)`** en lugar de `.update()`, con la opción `merge(true)` para no perder datos existentes. Este método recibe como primer parámetro el objeto completo y como segundo la opción de actualización: `SetOptions.merge()`.

```java
public void updateAnuncio(Anuncio anuncio) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios").document(anuncio.getId())
        .set(anuncio, SetOptions.merge()) // Actualiza solo los campos existentes
        .addOnSuccessListener(aVoid -> Log.d("Firestore", "Anuncio actualizado correctamente"))
        .addOnFailureListener(e -> Log.e("Firestore", "Error al actualizar el anuncio", e));
}
```
#### 🔍 **Explicación**  
- `.set(anuncio, SetOptions.merge())`** → Reemplaza los campos que existen en `Anuncio`, pero **mantiene otros datos del documento sin borrar nada.  
- Si no usas `SetOptions.merge()`, Firestore sobrescribirá todo el documento y eliminará cualquier campo que no esté en `Anuncio`.  


### 📌 ¿Cuándo usar `.update()` y cuándo usar `.set()`?  

| Método  | ¿Reemplaza todo el documento? | ¿Requiere un objeto completo? | ¿Borra campos no incluidos? | Uso recomendado |
|---------|------------------------------|------------------------------|-----------------------------|----------------|
| **`.update()`** | ❌ No | ❌ No, solo los campos especificados | ❌ No | Cuando solo necesitas modificar un campo específico. |
| **`.set(..., SetOptions.merge())`** | ✅ Sí (solo los campos existentes) | ✅ Sí, se pasa un objeto completo | ❌ No | Cuando quieres actualizar varios campos sin perder datos previos. |
| **`.set()` (sin `merge`)** | ✅ Sí | ✅ Sí | ✅ Sí, borra todo lo que no esté en el nuevo objeto | Cuando quieres sobrescribir completamente el documento. |

---

## 🔹 Eliminar datos  

Si quieres eliminar un anuncio concreto, puedes filtrar por el id del anuncio y llamar al método `delete`.
```java
public void deleteAnuncio(String anuncioId) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios").document(anuncioId)
        .delete()
        .addOnSuccessListener(aVoid -> Log.d("Firestore", "Anuncio eliminado correctamente"))
        .addOnFailureListener(e -> Log.e("Firestore", "Error al eliminar anuncio", e));
}
```

</div>