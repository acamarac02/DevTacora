---
sidebar_position: 2
sidebar_label: Insertar y eliminar elementos
title: Insertar y eliminar elementos
---

<div class="justify-text">

Vamos a estudiar cómo añadir animales a nuestra base de datos usando un Floating Action Button. Además, añadiremos un nuevo campo a nuestros animales: su imagen. Dicha imagen se seleccionará desde la galería del dispositivo y se almacenará en la base de datos. Por último, veremos cómo eliminar un animal al deslizar a izquierda o derecha un elemento del RecyclerView.

## Insertar elementos

En este apartado implementaremos un **Floating Action Button (FAB)** en la pantalla principal de la aplicación, que permitirá a los usuarios acceder rápidamente al fragmento para insertar nuevos animales.

### Floating Action Button (FAB)  
El **Floating Action Button (FAB)** es un botón circular que flota sobre la interfaz de usuario con el objetivo de proporcionar una experiencia intuitiva par el usuario y consistente con las directrices de **Material Design**. Este botón se usa generalmente para **acciones principales o más frecuentes** en una pantalla (como añadir, crear o iniciar algo nuevo).  

#### 1. Agregar dependencias
Comenzamos añadiendo las **dependencias** necesarias. Si estás usando una versión reciente de Android Studio, **Material Design** ya debería estar incluido. Si no, añade la siguiente dependencia:
```groovy title="build.gradle (Module: app)"
implementation ("com.google.android.material:material:1.10.0")
```

:::info
Recuerda **sincronizar** el proyecto (`Sync Now`) después de añadir la dependencia.  
:::

---

#### 2. Modificar el layout del Fragment 
Vamos a modificar el layout del fragmento `AnimalesFragment` para incluir el FAB.  

```xml title="fragment_animales.xml"
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".AnimalesFragment">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerViewAnimales"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        android:scrollbars="vertical" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fabAgregarAnimal"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:srcCompat="@android:drawable/ic_input_add"
        android:layout_gravity="bottom|end"
        android:layout_margin="16dp"
        android:contentDescription="Agregar Animal" />
</FrameLayout>
```

**Explicación:**
- **`FloatingActionButton`**: Es el botón flotante que añade la acción de agregar un nuevo animal.  
- **`app:srcCompat="@android:drawable/ic_input_add"`**: Icono del botón. Usamos el propio recurso que ofrece Android con el símbolo "+".  
- **`android:layout_gravity="bottom|end"`**: Coloca el FAB en la esquina inferior derecha.  
- **`android:layout_margin="16dp"`**: Añade margen alrededor del botón.  

### Gestión de la navegación
Ahora, implementemos la funcionalidad para que el FAB lleve a una pantalla de añadir animales.

#### 1. Crear el fragmento y la navegación
Tu grafo de navegación deberá ser similar al siguiente:

![UT4. Grafo navegación añadir animal](/img/pmdm/ut4/2-grafo-nav-add-animal.png)

#### 2. Añadir Listener al FAB
Gestiona la navegación al nuevo Fragment desde el Listener del botón flotante:

```java title="AnimalesFragment.java"
public class AnimalesFragment extends Fragment {

    private NavController navController;

    ...

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        ...

        navController = Navigation.findNavController(view);
        binding.fabAgregarAnimal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                navController.navigate(R.id.action_animalesFragment_to_anadirAnimalFragment);
            }
        });

    }
}
```

### Fragment para añadir animales  
El layout del Fragment puede ser similar al siguiente:  
```xml title="fragment_anadir_animal.xml"
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/editNombre"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Nombre del Animal" />

    <EditText
        android:id="@+id/editDescripcion"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Descripción" />

    <Button
        android:id="@+id/btnGuardar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Guardar"
        android:layout_marginTop="16dp" />
</LinearLayout>
```

En el código Java del Fragment añadiremos la lógica necesaria para recuperar el texto de los dos campos y guardar el animal en la base de datos cuando se pulse el botón Guardar.
```java title="AnadirAnimalFragment.java"
public class AnadirAnimalFragment extends Fragment {

    private FragmentAnadirAnimalBinding binding;
    private AnimalViewModel animalViewModel;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return (binding = FragmentAnadirAnimalBinding.inflate(inflater, container, false)).getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        animalViewModel = new ViewModelProvider(requireActivity()).get(AnimalViewModel.class);
        binding.btnGuardar.setOnClickListener(v -> anadirAnimal());
    }

    private void anadirAnimal() {
        String nombre = binding.editNombre.getText().toString();
        String descripcion = binding.editDescripcion.getText().toString();

        // Guardamos en la base de datos
        // Deberías asegurarte que los campos obligatorios estén rellenos
        Animal nuevoAnimal = new Animal(nombre, descripcion);
        animalViewModel.insertarAnimal(nuevoAnimal);

        Toast.makeText(requireActivity(), "Animal añadido con éxito", Toast.LENGTH_SHORT);

        // Volvemos al fragment anterior
        requireActivity().getSupportFragmentManager().popBackStack();
    }
}
```

---

## Añadir imagen del animal
Nuestra aplicación tiene como nuevo requisito el almacenamiento de la imagen de cada animal. Dicha imagen debe seleccionarla el usuario desde su galería cuando vaya a crear el animal.

Para guardar la foto de un animal elegido desde la galería, puedes almacenar la imagen de dos maneras en la base de datos:  

1. **Ruta del Archivo (URI)** – Guarda solo la ruta de la imagen. Recomendado por eficiencia pero tiene el inconveninente de que cuando seleccionas una imagen desde la galería (como Google Fotos), la URI que se obtiene es temporal y privada para la sesión de la actividad.
2. **Imagen en Base64 o Blob** – Guarda la imagen directamente en la base de datos (no recomendado para imágenes grandes).

Lo más adecuado sería **copiar la imagen** seleccionada desde la URI temporal al **almacenamiento interno o externo privado de tu aplicación**. No obstante, para seguir trabajando Room, la almacenaremos en la base de datos.

### Modificar la Entidad (`Animal`)  

Agregaremos un nuevo campo `foto` para guardar la imagen. Un `BLOB` de base de datos se corresponde con un array de bytes en Java.  

```java title="Animal.java"
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "animal")
public class Animal {

    @PrimaryKey(autoGenerate = true)
    private int id;
    private String nombre;
    private String descripcion;
    private byte[] foto;

    // Constructor
    public Animal(String nombre, String descripcion, byte[] foto) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.foto = foto;
    }
}
```

### Actualizar la Base de Datos

Cuando ya has ejecutado la aplicación, la base de datos estará creada y puede contener información. En aplicaciones de producción, se realizan **migraciones** de la base de datos, de forma que Room se encarga automáticamente, y de forma transparente al usuario, de añadir esos nuevos campos a la base de datos.

En nuestras aplicaciones sencillas, bastaría con desinstalar la app del dispositivo y volver a intalarla para que se destruya la base de datos y vuelva a crearse, sin necesidad de implementar migraciones. No obstante, a continuación se explica **cómo realizar una migración**. Ten en cuenta que este proceso es más complejo y problemático en aplicaciones en producción.

```java title="AnimalDatabase.java"
// Actualizamos la versión de la base de datos
@Database(entities = {Animal.class}, version = 2)
public abstract class AnimalDatabase extends RoomDatabase {
    public abstract AnimalDao animalDao();
    private static volatile AnimalDatabase instance;

    // Definimos una variable que contiene la modificación que hay que hacer en la base de datos
    // En este caso, añadir el campo foto de tipo BLOB
    static final Migration MIGRATION_1_2 = new Migration(1, 2) {
        @Override
        public void migrate(SupportSQLiteDatabase database) {
            database.execSQL("ALTER TABLE animal ADD COLUMN foto BLOB");
        }
    };

    public static AnimalDatabase getInstance(final Context context) {
        if (instance == null) {
            synchronized (AnimalDatabase.class) {
                if (instance == null) {
                    instance = Room.databaseBuilder(
                                    context.getApplicationContext(),
                                    AnimalDatabase.class,
                                    "animal_database"
                            )
                            .addMigrations(MIGRATION_1_2) // Añadimos la constante creada como nueva migración
                            .build();
                }
            }
        }
        return instance;
    }
}
```

### Actualizar el layout para elegir foto de la galería 

Añade un botón y/o `ImageView` para seleccionar la imagen.  

**Layout (fragment_anadir_animal.xml):**  
```xml title="fragment_anadir_animal.xml"
<Button
    android:id="@+id/btnSeleccionarFoto"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Seleccionar Foto" />

<ImageView
    android:id="@+id/imagenAnimal"
    android:layout_width="200dp"
    android:layout_height="200dp"
    android:layout_gravity="center"
    android:scaleType="centerCrop"
    android:src="@drawable/ic_add_photo" />
```

### Implementar la lógica en el Fragment

Pondremos un Listener sobre el botón que iniciará un **Intent para abrir la galería**. Recuerda que los Intents pueden ser:
-  **Implícito**: no especifica el componente exacto (actividad) que debe manejar la solicitud. En su lugar, describe una acción general (como abrir la galería o compartir contenido) y el sistema busca una actividad que pueda realizar esa acción.
- **Explícito**: especifica una actividad o componente exacto que debe manejar el intent.

En primer lugar, debemos definir un **`ActivityResultLauncher`**, en el que especificaremos qué debe hacer el fragmento cuando se haya cerrado la galería (o cualquier otra aplicación que se haya abierto mediante el Intent). Posteriormente, escucharemos el evento de click sobre el botón "Seleccionar Foto"; cuando se produzca, lanzaremos el Intent para abrir la galería a través del `ActivityResultLauncher` creado anteriormente.

```java title="AnadirAnimalFragment.java"
public class AnadirAnimalFragment extends Fragment {

    // Lanzador que gestiona actividades externas
    private ActivityResultLauncher<Intent> imagePickerLauncher;
    // Atributo que almacena la uri de la imagen
    private byte[] fotoBlob;

    ...

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        animalViewModel = new ViewModelProvider(requireActivity()).get(AnimalViewModel.class);
        binding.btnGuardar.setOnClickListener(v -> anadirAnimal());

        // Indicamos al lanzador qué debe hacer cuando se haya seleccionado la imagen y hayamos vuelto al fragment
        imagePickerLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                new ActivityResultCallback<ActivityResult>() {
                    @Override
                    public void onActivityResult(ActivityResult result) { //  Se ejecuta automáticamente cuando el usuario selecciona una imagen o cancela.
                        // Si se ha seleccionado una imagen, la recuperamos del parámetro del método
                        if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                            Uri imageUri = result.getData().getData();  // URI de la imagen seleccionada
                            fotoBlob = ImageUtils.uriToBlob(requireContext().getContentResolver(), imageUri); // Conseguimos el BLOB a partir de la URI

                            binding.imagenAnimal.setImageBitmap(ImageUtils.blobToBitmap(fotoBlob));  // Muestra la imagen en el ImageView
                            binding.imagenAnimal.setVisibility(View.VISIBLE);
                        }
                    }
                }
        );

        binding.btnSeleccionarFoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Creamos el Intent para abrir la galería (ver documentación en Android Developers)
                Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                // Lanzamos la galería usando el Launcher
                imagePickerLauncher.launch(intent);
            }
        });
    }

    private void anadirAnimal() {
        ...
        // Añadimos el atributo fotoBlob
        Animal nuevoAnimal = new Animal(nombre, descripcion, fotoBlob);
        ...
    }
}
```

Como puedes observar, necesitamos implementar una clase `ImageUtils` para tratar la imagen. La galería nos devuelve la URI de la imagen, que transformamos a array de bytes mediante el método `uriToBlob`. Por otro lado, el `ImageView` no admite directamente un `byte[]`y debemos transformarlo a Bitmap mediante el método `blobToBitmap`.

```java title="ImageUtils.java"
import android.content.ContentResolver;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

public class ImageUtils {

    // Convierte la URI de la imagen a un array de bytes (BLOB)
    public static byte[] uriToBlob(ContentResolver resolver, Uri uri) {
        try {
            InputStream inputStream = resolver.openInputStream(uri);
            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            // Comprimir la imagen (JPEG, 80% de calidad)
            bitmap.compress(Bitmap.CompressFormat.JPEG, 80, outputStream);

            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Convierte un array de bytes (BLOB) a Bitmap
    public static Bitmap blobToBitmap(byte[] blob) {
        return BitmapFactory.decodeByteArray(blob, 0, blob.length);
    }
}
```

### Mostrar la imagen en el Fragmento de detalle  

Para comprobar que funciona correctamente, puedes implementar la pantalla de detalle, mostrando la imagen.

![UT4. Insertar animal con imagen](/img/pmdm/ut4/3-video-insert.gif)

### Consideraciones  
- **Permisos de Almacenamiento (Android 10 o inferior):**  
Si necesitas acceder a la galería en Android 10 o inferior, añade este permiso al `AndroidManifest.xml`:  
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

- **Android 11+ (Scoped Storage):**  
A partir de Android 11, no es necesario el permiso para acceder a imágenes de la galería.  
</div>

## Eliminar animal

Como último requisito, queremos eliminar un animal cuando se deslice hacia derecha o izquierda. ¿Cómo podríamos hacerlo? ¿Dónde habría que poner las instrucciones para eliminarlo de la base de datos?

![UT4. Eliminar animal al deslizar](/img/pmdm/ut4/4-video-eliminar.gif)