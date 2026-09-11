---
sidebar_position: 3
sidebar_label: Integración en Android
title: Integración de Supabase Storage en Android
---

<div class="justify-text">

**Supabase Storage** es un servicio que expone una **API RESTful** para gestionar archivos en la nube. Proporciona una serie de **endpoints HTTP** que permiten **subir, descargar, eliminar y administrar archivos** dentro de los **buckets**.

Las interacciones con Supabase Storage se hacen mediante **solicitudes HTTP** a través de **Retrofit** u otro cliente HTTP. A continuación se desglosan las principales operaciones:  

| Operación  | Método HTTP | Endpoint de Supabase Storage |
|------------|------------|----------------------------------|
| **Subir archivo** | `POST` | `/storage/v1/object/{bucket}/{filename}` |
| **Obtener URL de archivo** | `GET` | `/storage/v1/object/public/{bucket}/{filename}` |
| **Eliminar archivo** | `DELETE` | `/storage/v1/object/{bucket}/{filename}` |
| **Listar archivos** | `GET` | `/storage/v1/bucket/{bucket}/objects` |
 

:::info ¿QUÉ PASA CON LAS ACTUALIZACIONES?
En Supabase Storage, **no existe una operación directa de actualización** (UPDATE) de archivos. Sin embargo, podemos actualizar una imagen siguiendo este flujo:
1. Eliminar la imagen antigua usando DELETE `/storage/v1/object/{bucket}/{filename}`
2. Subir la nueva imagen con el mismo nombre de archivo usando POST `/storage/v1/object/{bucket}/{filename}`
:::


**Retrofit** es una biblioteca de Android que facilita las solicitudes HTTP a APIs RESTful. Dado que Supabase Storage expone una API REST, **es necesario usar una herramienta como Retrofit para comunicarnos con él**. Adicionalmente, utilizaremos la librería **OkHttp** para configuración avanzada de las comunicaciones en red.   

### Agregar las dependencias al proyecto  

Para trabajar con **Supabase Storage**, debemos agregar las siguientes dependencias en el archivo `build.gradle` (Module: app):  

```gradle
dependencies {
    // Retrofit para realizar peticiones HTTP
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'

    // OkHttp para manejo avanzado de solicitudes HTTP
    implementation 'com.squareup.okhttp3:okhttp:4.9.3'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.9.3'

    // Glide para cargar imágenes desde Supabase Storage
    implementation 'com.github.bumptech.glide:glide:4.12.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.12.0'
}
```

🔹 **Retrofit** se utilizará para gestionar la comunicación con la API de Supabase.  
🔹 **OkHttp** nos permitirá interceptar y registrar solicitudes HTTP.  
🔹 **Glide** será usado para descargar y mostrar imágenes desde Supabase Storage.

:::info DEPENDENCIA SUPABASE
A diferencia de Firebase, **Supabase no requiere la instalación de dependencias** en tu proyecto. En su lugar, proporciona una **API RESTful** con la que puedes interactuar para gestionar la base de datos, autenticación, almacenamiento y otras funcionalidades. Esto significa que la integración con Supabase se realiza mediante **peticiones HTTP**, por lo que puedes usar herramientas como **Retrofit** en Android para comunicarte con sus servicios.
:::

---

### Configurar la conexión con Supabase

Para conectarnos a **Supabase Storage**, necesitamos configurar la **URL base de Supabase** y el **API Key**. Creamos una clase para gestionar la conexión con Supabase utilizando Retrofit.

:::info URL BASE Y API KEY
Recuerda que en el apartado **Configuración Inicial** estudiamos de dónde obtener la URL base y la API Key.
:::

#### 🔹 **Configurar el cliente de Retrofit para Supabase**  

```java
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SupabaseClient {

    private static Retrofit retrofit = null;
    private static final String BASE_URL = "https://<tu-supabase-url>.supabase.co/";

    public static Retrofit getClient() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}
```

🔹 Reemplaza `<tu-supabase-url>` por la URL de tu proyecto en Supabase.  

---

### Configurar la API de Supabase Storage 

Creamos una **interfaz en Retrofit** para gestionar la subida y descarga de archivos en Supabase:

```java
import okhttp3.MultipartBody;
import retrofit2.Call;
import retrofit2.http.Header;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface SupabaseStorageApi {

    @Multipart
    @POST("storage/v1/object/{bucket}/{fileName}")
    Call<Void> uploadImage(
            @Header("Authorization") String authToken,
            @Path("bucket") String bucket,
            @Path("fileName") String fileName,
            @Part MultipartBody.Part file
    );

    @DELETE("storage/v1/object/{bucket}/{fileName}")
    Call<Void> deleteImage(
            @Header("Authorization") String authToken,
            @Path("bucket") String bucket,
            @Path("fileName") String fileName
);


}
```

🔹 Se usa `@Multipart` para enviar archivos a Supabase.  
🔹 Se requiere un **bucket** y el **nombre del archivo** en la URL.  
🔹 Se debe enviar la API Key en el encabezado `Authorization`.  

:::info DECLARACIÓN DE MÉTODOS
En esta clase debes implementar todos los métodos que necesites para conectarte a Supabase. Si tu proyecto requiere eliminar imágenes, deberás definir el método DELETE correspondiente.
:::

---

## Subir Archivos a Supabase desde Android  

A continuación, se muestra un ejemplo para subir imágenes a Supabase:

```java
private static final String API_KEY = "<TU_API_KEY>"; // Reemplaza con tu API Key

// Recibe por parámetro el fichero de la imagen
public LiveData<String> uploadImage(File imageFile) {
    // LiveData en el que devolveremos la URL pública de la imagen generada
    MutableLiveData<String> liveDataUrl = new MutableLiveData<>();

    // Crear el cuerpo de la petición para enviar a Supabase (en él se envía el fichero)
    RequestBody requestFile = RequestBody.create(MediaType.parse("image/*"), imageFile);
    MultipartBody.Part body = MultipartBody.Part.createFormData("file", imageFile.getName(), requestFile);

    // Llamada a la API de Supabase
    // Param 1: Tu API KEY (Autenticación)
    // Param 2: nombre de tu bucket
    // Param 3: nombre con el que se creará el fichero en Supabase
    // Param 4: cuerpo de la petición (imagen)
    Call<Void> call = storageApi.uploadImage("Bearer " + API_KEY, "anuncios", imageFile.getName(), body);

    // Enviamos la petición
    call.enqueue(new Callback<Void>() {
        @Override
        public void onResponse(Call<Void> call, Response<Void> response) {
            if (response.isSuccessful()) {
                // Si todo va bien, recuperamos la URL pública de la imagen en Supabase
                // Esta URL será la que guardemos en nuestra base de datos
                String fileUrl = response.raw().request().url().toString();
                // Almacenamos el valor en el LiveData
                liveDataUrl.postValue(fileUrl);
            } else {
                // Si no se ha podido completar la petición, devolvemos null
                liveDataUrl.postValue(null);
            }
        }

        @Override
        public void onFailure(Call<Void> call, Throwable t) {
            // Si no se ha podido completar la petición, devolvemos null
            liveDataUrl.postValue(null);
        }
    });

    // Devolvemos el LiveData con la URL de nuestra imagen
    return liveDataUrl;
}
```

---

## Eliminar imágenes de Supabase desde Android  

Para eliminar una imagen almacenada en Supabase, debemos realizar una **petición DELETE** a la API de Supabase Storage, indicando el **nombre del bucket** y el **nombre del archivo** que queremos eliminar.  

A continuación, se muestra un método para eliminar una imagen a partir de su **URL pública**:

```java
private static final String API_KEY = "<TU_API_KEY>"; // Reemplaza con tu API Key

// Método para eliminar una imagen de Supabase a partir de su URL pública
public LiveData<Boolean> deleteImage(String fileUrl) {
    MutableLiveData<Boolean> resultLiveData = new MutableLiveData<>();

    // Extraer el nombre del archivo de la URL pública
    String fileName = obtenerNombreArchivo(fileUrl);
    if (fileName == null) {
        resultLiveData.postValue(false);
        return resultLiveData;
    }

    // Llamada a la API de Supabase para eliminar la imagen
    Call<Void> call = storageApi.deleteImage("Bearer " + API_KEY, "anuncios", fileName);

    call.enqueue(new Callback<Void>() {
        @Override
        public void onResponse(Call<Void> call, Response<Void> response) {
            if (response.isSuccessful()) {
                resultLiveData.postValue(true);
            } else {
                resultLiveData.postValue(false);
            }
        }

        @Override
        public void onFailure(Call<Void> call, Throwable t) {
            resultLiveData.postValue(false);
        }
    });

    return resultLiveData;
}

// Método auxiliar para extraer el nombre del archivo de la URL pública
private String obtenerNombreArchivo(String fileUrl) {
    try {
        Uri uri = Uri.parse(fileUrl);
        return uri.getLastPathSegment(); // Obtiene el último segmento de la URL (nombre del archivo)
    } catch (Exception e) {
        return null;
    }
}
```

🔍 **Explicación del código**  

✅ **Extrae el nombre del archivo** desde la URL pública con `obtenerNombreArchivo(fileUrl)`.  
✅ **Realiza una petición `DELETE`** a Supabase Storage para eliminar el archivo.  
✅ **Devuelve un `LiveData<Boolean>`** indicando si la eliminación fue exitosa (`true`) o fallida (`false`).  

</div>