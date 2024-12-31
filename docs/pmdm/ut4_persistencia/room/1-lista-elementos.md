---
sidebar_position: 1
sidebar_label: Mostrar elementos almacenados
title: Mostrar elementos almacenados
---

<div class="justify-text">

# Mostrar elementos almacenados

En esta primera versión del proyecto, vamos a implementar el RecyclerView para mostrar la lista de animales. Para ello, necesitaremos un método que devuelva todos los animales de la base de datos y otro que inserte un animal. De momento, de cada Animal conocemos el nombre y una breve descripción. El resultado final de esta primera versión será similar a:

![UT4. Primera versión app](/img/pmdm/ut4/1-primera-version-app.png)



## Configuración inicial del proyecto

Crea un nuevo proyecto y añade las dependencias de Room. Recuerda que también puedes dejar que el propio Android Studio las importe cuando vayas a implementar la conexión a base de datos.
 
```groovy title="build.gradle (Module: app)"
implementation("androidx.room:room-runtime:2.5.0")
annotationProcessor("androidx.room:room-compiler:2.5.0")
```

:::info
Deberás añadir más dependencias sobre la marcha, como las del componente Navigation, ViewModel, RecyclerView, etc.
:::

---

## Implementación de los componentes de Room

Room se basa en tres componentes principales que trabajan juntos para gestionar bases de datos SQLite de manera sencilla y eficiente en Android:  

1. **Entidad (`@Entity`)**: Representa una tabla en la base de datos. Cada clase marcada con `@Entity` se convierte en una tabla con columnas que corresponden a los campos de la clase.

2. **DAO (Data Access Object) `@Dao`**: Es la interfaz que define los métodos para acceder a los datos. A través de `@Insert`, `@Query`, `@Delete`, etc., Room genera automáticamente las consultas necesarias.

3. **Base de Datos (`@Database`)**: Define la base de datos, gestionando la creación y actualización de la misma. Sirve como el punto de acceso principal a la base de datos subyacente.


### Componente Entity (Tabla Animal)
Una **Entity** es una clase anotada con `@Entity` que describe la estructura de una tabla en SQLite, teniendo en cuenta las siguientes características:  

- **Nombre de la tabla**: Se puede definir explícitamente usando `tableName`; si no se define este atributo, tomará como nombre el nombre de la clase. 
- **Campos (columnas)**: Cada campo de la clase será una columna en la tabla.  
- **Clave primaria**: Se define con `@PrimaryKey`. Si se especifica `autoGenerate = true`, el valor se generará automáticamente (autoincremental).  
- **Restricciones**: Se pueden agregar valores únicos, claves foráneas, índices, etc.  

Crea un nuevo paquete llamado **"data"** y añade la siguiente clase:

```java title="Animal.java"
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "animal") // tableName es opcional
public class Animal {

    @PrimaryKey(autoGenerate = true)
    private int id;
    private String nombre;
    private String descripcion;

    // Constructor
    public Animal(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}
```

Room se encarga automáticamente de crear una clase en la base de datos con el nombre "animal" y las columnas especificadas.

### Componente DAO (Data Access Object)  

El **DAO (Data Access Object)** es una **interfaz** (o clase abstracta) que define los métodos para interactuar con la base de datos. Room genera automáticamente el código necesario para ejecutar las consultas SQL basadas en las **anotaciones** que apliques. La principal ventaja que ofrece el DAO es la **seguridad de consultas**, ya que Room verifica las consultas SQL en **tiempo de compilación** para evitar errores en tiempo de ejecución.  

Las anotaciones más comunes en el DAO son:

| Anotación        | Descripción                                                |
|------------------|------------------------------------------------------------|
| **@Insert**      | Inserta uno o varios registros.                            |
| **@Update**      | Actualiza registros existentes.                            |
| **@Delete**      | Elimina registros.                                          |
| **@Query**       | Ejecuta cualquier consulta SQL (`SELECT`, `DELETE`, etc.). Generalmente se utiliza para los `SELECT`. |
| **@Transaction** | Asegura que múltiples operaciones se ejecuten como una sola transacción. |


Crea una nueva interfaz dentro del paquete `data`:

```java title="AnimalDao.java"
import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface AnimalDao {

    @Insert
    void insertar(Animal animal);

    @Update
    void actualizar(Animal animal);

    @Delete
    void eliminar(Animal animal);

    @Query("SELECT * FROM animal ORDER BY nombre ASC")
    LiveData<List<Animal>> obtenerTodos();

    @Query("SELECT * FROM animal WHERE nombre = :nombre LIMIT 1")
    LiveData<Animal> buscarPorNombre(String nombre);
}
```
 Explicación:
- `@Dao` define la interfaz que interactúa con la base de datos.  
- `@Insert`, `Update`, `Delete`: inserta, actualiza o elimina el animal recibido por parámetro.  
- `@Query` obtenerTodos(): devuelve en una lista de Animal todos los animales ordenados alfabéticamente.
- `@Query` buscarPorNombre(): devuelve el animal cuyo nombre coincide con el especificado por parámetro. Al igual que estudiamos en JPA, `:nombre` es un parámetro vinculado (bind parameter), de forma que Room reemplaza automáticamente `:nombre` con el valor pasado al método.
-  Cuando la `@Query` devuelve un LiveData directamente desde la consulta, Room se encargará de observar los cambios en la base de datos y actualizar automáticamente la UI cuando los datos cambien.

:::info
Se han incluído, a modo de ejemplo, más métodos de los que nuestra aplicación necesitará en realidad. En tus aplicaciones solo debes implementar los métodos CRUD realmente necesarios.
:::

:::danger
**En las consultas debes especificar el nombre de la tabla y las columnas**, no el nombre de la clase y los atributos. Si utilizaste `tableName` para modificar el nombre de la tabla, como es nuestro caso, deberás utilizar "animal" en la consulta y no "Animal" (nombre de la clase).
:::

### Componente Database 

El componente **`@Database`** en Room es una **clase abstracta** que actúa como el punto de acceso principal a la base de datos SQLite.  
- Debe heredad de **RoomDatabase**
- Es donde se definen las **entidades (tablas)** y las **versiones** de la base de datos.  
- También conecta los **DAO** (Data Access Object) con la base de datos para realizar operaciones como insertar, actualizar y consultar datos.   
- Implementa el **patrón Singleton** para evitar crear múltiples instancias de la base de datos, reduciendo el riesgo de inconsistencias y errores.  
- Maneja las **migraciones**, es decir, la actualización de la estructura de la base de datos cuando cambia el esquema.  

Dentro del paquete `data` crea la siguiente clase:

```java title="AnimalDatabase.java"
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import android.content.Context;

// Anotación para definir la base de datos
@Database(entities = {Animal.class}, version = 1)
public abstract class AnimalDatabase extends RoomDatabase {

    // Método abstracto que expone el DAO
    public abstract AnimalDao animalDao();

    // Singleton - Evita múltiples instancias
    private static AnimalDatabase instance;

    // Método para obtener la instancia de la base de datos
    public static AnimalDatabase getInstance(final Context context) {
        if (instance == null) {
            synchronized (AnimalDatabase.class) {
                if (instance == null) {
                    instance = Room.databaseBuilder(
                            context.getApplicationContext(),
                            AnimalDatabase.class,
                            "animal.db"
                    )
                    .fallbackToDestructiveMigration()  // Manejo de migración
                    .build();
                }
            }
        }
        return instance;
    }
}
```

Explicación:

- **`@Database`**: 
    - Define la **lista de entidades** que forman parte de la base de datos.  
    - Especifica la **versión actual** de la base de datos: Room usa esta información para crear o actualizar la estructura de la base de datos. 
    - Si agregas más tablas en el futuro, debes añadir dichas entidades al array y actualizar el número de versión, de forma que el sistema actualice el esquema de la base de datos. De igual forma, si añades un nuevo atributo a una entidad ya existente, también debes actualizar la versión.
- **`Room.databaseBuilder`** crea la base de datos con:  
  - Contexto de aplicación.  
  - La clase que representa la base de datos (`AnimalDatabase.class`).  
  - El nombre del archivo SQLite (`animal.db`). 
  - `.fallbackToDestructiveMigration()` **destruye y recrea** la base de datos si hay un cambio en el esquema. Debes tener en cuenta que se perderán todos los datos. Para actualizaciones sin pérdida de datos, debes implementar **migraciones personalizadas** (no lo vamos a estudiar).  

---

## Implementación del Repository  

El **Repository** es una clase que actúa como **intermediario** entre la base de datos (a través de Room) y la capa de presentación (como `ViewModel`, `Activity` o `Fragment`). Su función principal es **gestionar el acceso a los datos** de forma organizada y separada, siguiendo el principio de **separación de responsabilidades**.  

En el tema anterior, el `ViewModel` era el encargado de realizar las peticiones a la API. No obstante, lo más correcto es implementar un Repository que se encargue de ello, al igual que vamos a hacer con Room, pues ofrece las siguientes ventajas:

1. **Abstracción de la fuente de datos**:  
   - El Repository proporciona una única fuente de datos para la aplicación.  
   - Puede manejar datos de **múltiples fuentes** (base de datos local, API, archivo, caché, etc.).  

2. **Lógica de negocio centralizada**:  
   - La lógica de obtención de datos se mantiene en el Repository, no en `ViewModel` o `Activity`.  
   - **Las actividades o fragments solo solicitan los datos** al ViewModel y este al Repository, sin importar de dónde provengan.  

3. **Manejo de concurrencia**:  
   - El Repository puede ejecutar consultas en **hilos secundarios** para evitar bloquear el hilo principal (UI).  

4. **Reutilización de código**:  
   - Si varios `ViewModel` necesitan los mismos datos, el Repository proporciona una **única implementación**.  


Crea la siguiente clase en el paquete `data`:

```java title="AnimalRepository.java"
import android.app.Application;

import androidx.lifecycle.LiveData;

import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class AnimalRepository {
    private AnimalDao animalDao;
    private Executor executor;

    public AnimalRepository(Application application) {
        // Inicializamos el DAO de la entity Animal a través de la clase AnimalDatabase
        animalDao = AnimalDatabase.getInstance(application).animalDao();
        // Inicializamos el executor para realizar peticiones en otro hilo
        executor = Executors.newSingleThreadExecutor();
    }

    public void insertar(Animal animal) {
        executor.execute(() -> {
            animalDao.insertar(animal);
        });
    }

    // Devuelve el LiveData que recuperar del DAO
    public LiveData<List<Animal>> obtenerAnimales() {
        return animalDao.obtenerTodos();
    }
}
```
🔹 **Explicación**:  
- El Repository tendrá como atributos el DAO de la `Entity` sobre la que debes operar y un `Executor` para realizar peticiones en un hilo secundario.
- Se debe implementar un método por cada operación que se quiera realizar sobre la base de datos.  
    - Las **operaciones de escritura en la base de datos** pueden tardar más tiempo (acceso a disco, transacciones, etc.). Si se ejecutan en el hilo principal (UI thread), pueden bloquear la interfaz, causando que la app se congele o se cierre por ANR (Application Not Responding). La solución consiste en usar un `Executor` para ejecutar la operación en **segundo plano y no afectar el rendimiento de la UI**.
    - Cuando el **DAO** de Room devuelve un `LiveData` en una consulta (`@Query`), la consulta se ejecuta automáticamente en un **hilo secundario** (background thread), no en el hilo principal (UI thread).

---

## Implementación del ViewModel

El `ViewModel`lo implementaremos de forma similar a lo estudiado en los temas anteriores. En este caso, tendremos como atributo una instancia de `AnimalRepository`, a partir de la cual realizaremos las operaciones sobre la base de datos.
  
```java
import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import java.util.List;

import es.iesagora.demoroom.data.Animal;
import es.iesagora.demoroom.data.AnimalRepository;

public class AnimalViewModel extends AndroidViewModel {

    // Instancia del Repository
    private AnimalRepository animalRepository;

    public AnimalViewModel(@NonNull Application application) {
        super(application);
        // Inicializamos el repository
        animalRepository = new AnimalRepository(application);
    }

    public LiveData<List<Animal>> obtenerAnimales() {
        // Devolvemos el LiveData recibido y pondremos un observador sobre el método en la View
        return animalRepository.obtenerAnimales();
    }

    public void insertarAnimal(Animal animal) {
        animalRepository.insertar(animal);
    }
}
```

## Implementación de la View

Siguiendo los pasos que ya hemos estudiados en los temas anteriores, implementamos `AnimalesFragment` utilizando el componente `Navigation`. En este fragmento, incluiremos un RecyclerView que muestre el nombre de cada animal.

```java title="AnimalesFragment.java"
public class AnimalesFragment extends Fragment {

    FragmentAnimalesBinding binding;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return (binding = FragmentAnimalesBinding.inflate(inflater, container, false)).getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        AnimalViewModel viewModel = new ViewModelProvider(requireActivity()).get(AnimalViewModel.class);

        // Ejecútalo solo la primera vez para tener animales insertados, después coméntalo
        viewModel.insertarAnimal(new Animal("Pipo", "Perro bodeguero que duerme a todas horas."));
        viewModel.insertarAnimal(new Animal("Luna", "Gata traviesa que persigue sombras y juega con pelotas."));
        viewModel.insertarAnimal(new Animal("Roco", "Loro hablador que repite frases divertidas."));
        viewModel.insertarAnimal(new Animal("Nina", "Coneja blanca que adora las zanahorias y salta por toda la casa."));
        viewModel.insertarAnimal(new Animal("Max", "Hamster curioso que corre sin parar en su rueda."));
        viewModel.insertarAnimal(new Animal("Toby", "Tortuga tranquila que disfruta tomar el sol en su terrario."));

        // Establecemos el adaptador
        AnimalesAdapter animalesAdapter = new AnimalesAdapter();
        binding.recyclerViewAnimales.setAdapter(animalesAdapter);

        // Recuperamos la lista de animales
        viewModel.obtenerAnimales().observe(getViewLifecycleOwner(), new Observer<List<Animal>>() {
            @Override
            public void onChanged(List<Animal> animals) {
                animalesAdapter.establecerListaAnimales(animals);
            }
        });
    }

    static class AnimalViewHolder extends RecyclerView.ViewHolder {
        ...
    }

    class AnimalesAdapter extends RecyclerView.Adapter<AnimalViewHolder>{
        List<Animal> listaAnimales;

        ... // No olvides añadir el resto del código necesario para un Adapter

        // Establecemos la lista de animales y notificamos los cambios para actualizar el RecyclerView
        void establecerListaAnimales(List<Animal> listaAnimales){
            this.listaAnimales = listaAnimales;
            notifyDataSetChanged();
        }
    }
}
```

</div>