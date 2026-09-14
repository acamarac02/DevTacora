---
sidebar_position: 4
sidebar_label: Gestión de Subcolecciones
title: Gestión de Subcolecciones
---


En este apartado vamos a estudiar cómo trabajar con **subcolecciones** en **Firestore**. Trabajaremos con un modelo basado en un **tablón de anuncios**, donde cada anuncio puede tener una **subcolección de comentarios**.

---

## Estructura en Firestore
En Firestore, podemos almacenar **subcolecciones** dentro de documentos para organizar los datos de forma más estructurada.

```plaintext
/anuncios (colección)
   ├── anuncio_001 (documento)
   │      ├── contenido: "Primer anuncio"
   │      ├── fecha: 1707551200
   │      ├── emailAutor: "usuario@example.com"
   │
   │      /comentarios (subcolección)
   │           ├── comentario_001 (documento)
   │           │      ├── id: "abc123"
   │           │      ├── comentario: "Buen anuncio"
   │           │      ├── emailUsuarioAutor: "comentador@example.com"
```
Cada **anuncio** tiene una **subcolección de "comentarios"**, donde se almacenan los comentarios relacionados con el anuncio. 

:::info IMPORTANTE
Por este motivo, **todas las operaciones** sobre la **subcolección** de comentarios deben partir de la referencia al documento del **anuncio** correspondiente. En otras palabras, antes de acceder a la subcolección `"comentarios"`, primero debes obtener el **documento del anuncio** con `db.collection("anuncios").document(anuncioId)`.
:::

---

## Modelo de datos 
Creamos la clase `Comentario` para representar los documentos dentro de la subcolección `comentarios/`.

```java
public class Comentario {
    private String id;
    private String comentario;
    private String emailUsuarioAutor;

    // Constructor vacío requerido por Firestore
    public Comentario() {}

    public Comentario(String id, String comentario, String emailUsuarioAutor) {
        this.id = id;
        this.comentario = comentario;
        this.emailUsuarioAutor = emailUsuarioAutor;
    }

    // Getters y setters
}
```

---

## Crear (Añadir un nuevo comentario)
Para añadir un comentario dentro de la **subcolección "comentarios"** de un anuncio, usamos `document(anuncioId).collection("comentarios")`:

```java
public void addComentario(String anuncioId, Comentario comentario) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    // Generar un ID para el comentario
    String idGenerado = db.collection("anuncios").document(anuncioId)
                          .collection("comentarios").document().getId();
    
    // Asignar el ID generado al comentario
    comentario = new Comentario(idGenerado, comentario.getComentario(), comentario.getEmailUsuarioAutor());

    // Guardar el comentario en Firestore dentro de la subcolección "comentarios"
    db.collection("anuncios").document(anuncioId)
        .collection("comentarios").document(idGenerado)
        .set(comentario)
        .addOnSuccessListener(aVoid -> Log.d("Firestore", "Comentario agregado con ID: " + idGenerado))
        .addOnFailureListener(e -> Log.e("Firestore", "Error al agregar comentario", e));
}
```

🔍 **Explicación**  
- **`document(anuncioId).collection("comentarios")`** → Accede a la subcolección del anuncio.  
- **`document().getId()`** → Firestore genera un ID único para el comentario.  
- **`set(comentario)`** → Guarda el comentario dentro de la subcolección.  

---

## Leer (Obtener comentarios de un anuncio)
Podemos obtener todos los comentarios de un anuncio ordenados por ID.

```java
public void getComentarios(String anuncioId) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios").document(anuncioId)
        .collection("comentarios")
        .orderBy("id") // Ordena por ID ascendente
        .get()
        .addOnSuccessListener(queryDocumentSnapshots -> {
            for (DocumentSnapshot document : queryDocumentSnapshots) {
                Comentario comentario = document.toObject(Comentario.class);
                Log.d("Firestore", "Comentario: " + comentario.getComentario());
            }
        })
        .addOnFailureListener(e -> Log.e("Firestore", "Error al obtener comentarios", e));
}
```

🔍 **Explicación**  
- **Accedemos a la subcolección con `document(anuncioId).collection("comentarios")`**.  
- **Ordenamos los resultados con `.orderBy("id")`**.  
- **Convertimos cada documento a un objeto `Comentario` con `.toObject(Comentario.class)`**.  

:::info LECTURA EN TIEMPO REAL
También puedes implementar la lectura en tiempo real utilizando los mismos métodos que explicamos en el documento anterior.
:::

---

## Actualizar un comentario
Podemos actualizar un comentario modificando su contenido sin alterar los demás campos.

```java
public void updateComentario(String anuncioId, String comentarioId, String nuevoTexto) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios").document(anuncioId)
        .collection("comentarios").document(comentarioId)
        .update("comentario", nuevoTexto)
        .addOnSuccessListener(aVoid -> Log.d("Firestore", "Comentario actualizado correctamente"))
        .addOnFailureListener(e -> Log.e("Firestore", "Error al actualizar comentario", e));
}
```

🔍 **Explicación**  
- **Accedemos a la subcolección "comentarios" dentro del anuncio con `document(anuncioId).collection("comentarios").document(comentarioId)`**.  
- **Solo se actualiza el campo `"comentario"` sin modificar los demás datos**.  

---

## Eliminar un comentario
Podemos eliminar un comentario usando su ID.

```java
public void deleteComentario(String anuncioId, String comentarioId) {
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    db.collection("anuncios").document(anuncioId)
        .collection("comentarios").document(comentarioId)
        .delete()
        .addOnSuccessListener(aVoid -> Log.d("Firestore", "Comentario eliminado correctamente"))
        .addOnFailureListener(e -> Log.e("Firestore", "Error al eliminar comentario", e));
}
```

🔍 **Explicación**  
- **Ubicamos el comentario con `document(anuncioId).collection("comentarios").document(comentarioId)`**.  
- **Llamamos a `.delete()` para eliminarlo de Firestore**.  

---

:::info TIPS PARA LA CREACIÓN DE SUBCOLECCIONES
En **Firestore**, no se puede hacer una consulta que **recorra todas las subcolecciones "comentarios"** sin indicar el documento **padre** (`anuncioId`).  

❌ **No puedes hacer esto:**  
```java
db.collection("comentarios").get(); // Error: Firestore no admite consultas directas a subcolecciones sin su documento padre.
```
✔️ **Solo puedes consultar comentarios dentro de un anuncio específico:**  
```java
db.collection("anuncios").document(anuncioId).collection("comentarios").get();
```

📌 **Si necesitas acceder a todos los comentarios de todos los anuncios, Firestore recomienda tener una colección principal `"comentarios"` donde los almacenes con un campo `anuncioId` (documento referenciado) que indique a qué anuncio pertenece cada comentario.**  

```plaintext
/comentarios (colección principal)
   ├── comentario_001 (documento)
   │      ├── anuncioId: "anuncio_001"
   │      ├── comentario: "Buen anuncio"
   │      ├── emailUsuarioAutor: "comentador@example.com"
```
Esto permitiría consultas como:

```java
db.collection("comentarios")
    .whereEqualTo("anuncioId", anuncioId)
    .get();
```
:::



