---
title: "Tutorial: Pokédex"
sidebar_position: 5
description: "Guía paso a paso para implementar la Pokédex de la PokeAPI utilizando MVVM, Retrofit y un RecyclerView. Incluye diseño del layout, creación del ViewModel, Repository y mapeo del listado de Pokémon."
keywords: [PokeAPI, Pokédex, Retrofit, MVVM, ViewModel, Repository, Android, Lista, RecyclerView, Tutorial]
---

En este tutorial veremos como crear la Pokédex implementando paginación, es decir, cuando el usuario llegue al final del RecyclerView, pediremos a la API que nos devuelva los siguientes x elementos.

![Demo app](./0-img/demo-pokedex-api.gif)

## Tutorial básico

### Paso 1. Punto de partida

Partimos de que ya tienes creados del tutorial anterior: 

* `RetrofitClient`
* `PokemonApi`
* `Resource<T>`
* `PokemonRepository`
* `PokemonViewModel`
* Todo configurado para acceder a la PokeAPI

Ahora **añadiremos solo lo necesario para listar los Pokémon**.

---

### Paso 2. Crear los modelos de la respuesta de Pokédex

La respuesta de `GET /pokemon` tiene esta estructura simplificada, de la que solo nos interesa la lista de objetos `results`:

```json
{
  "count": 1281,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur",    "url": "https://pokeapi.co/api/v2/pokemon/2/" }
  ]
}
```

Creamos dos clases en `model` (`PokedexEntry` se ha creado como clase interna):

```java
public class PokedexResponse {

    private List<PokedexEntry> results;

    public List<PokedexEntry> getResults() { return results; }

    public class PokedexEntry {

        private String name;
        private String url;   // URL al detalle del Pokémon

        public String getName() { return name; }
        public String getUrl() { return url; }

        // (Opcional) método de ayuda para obtener el id desde la URL
        public int getIdFromUrl() {
            // La URL termina en ".../pokemon/1/"
            String[] partes = url.split("/");
            String ultima = partes[partes.length - 1].isEmpty()
                    ? partes[partes.length - 2]
                    : partes[partes.length - 1];
            return Integer.parseInt(ultima);
        }
    }
}
```

> Con `getIdFromUrl()` luego podrás construir URLs de sprites o mostrar `#001`, `#002`, etc., sin hacer otra petición.

---

### Paso 3. Añadir el endpoint en `PokemonApi`

La PokeAPI permite obtener la lista de Pokémon con:

```text
GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
```

Te recomiendo revisar el apartado **Análisis de la PokeAPI** para entender qué son los parámetros *limit*, *offset** y entender qué devuelve la petición.

En tu interfaz `PokemonApi`, añade un nuevo método:

```java
@GET("pokemon")
Call<PokedexResponse> getPokedex(
        @Query("limit") int limit,
        @Query("offset") int offset
);
```

`@Query` sirve para **añadir parámetros a la URL** de la petición.

* `@Query("limit")` → se añade a la URL como `?limit=valor`
* `@Query("offset")` → se añade como `&offset=valor`

Estos parámetros permiten indicar:

* **limit** → cuántos Pokémon queremos obtener.
* **offset** → desde qué posición empezar (0 = Bulbasaur).

Así, usando `getPokedex(151, 0)` la API devuelve los **151 primeros Pokémon de la Pokédex**. 
En este caso, construye una llamada como:

```
https://pokeapi.co/api/v2/pokemon?limit=151&offset=0
```

---

### Paso 4. Ampliar el `Repository` con la consulta de Pokédex

Como explicamos anteriormente, la PokeAPI no devuelve todos los Pokémon en una sola llamada, sino que utiliza un sistema de **paginación**. Por ello, en nuestro `Repository` guardamos estas dos variables:

* `LIMIT_POKEDEX` → fija cuántos Pokémon queremos que lleguen en cada petición (20 en nuestro caso).
* `OFFSET_POKEDEX` → lleva un contador que va aumentando después de cada llamada, para pedir la siguiente “página” de resultados.

Cada vez que llamamos a `getPokedex()`, enviamos a la API el `limit` y el `offset` actual, recibimos una lista de Pokémon y, si todo va bien, aumentamos el `OFFSET_POKEDEX` para la siguiente página.

Esto nos permite cargar la Pokédex **por bloques**, optimizando el rendimiento y permitiendo la paginación infinita en el `RecyclerView` mediante scroll.

En cuanto a métodos, igual que antes, en `PokemonRepository` tenemos que añadir un **callback nuevo** y un **método para cargar la lista**.
El nuevo callback es necesario porque ahora la API no devuelve **un Pokémon**, sino **una lista completa**, y el callback anterior (`PokemonCallback`) solo estaba preparado para enviar un único objeto.
Con un callback específico (`PokedexCallback`), el ViewModel recibe correctamente un `Resource<List<PokedexEntry>>` y podemos gestionar la Pokédex como una colección paginada.

:::info INFO SOBRE LOS CALLBACKS
En este tutorial usamos **un callback por operación** porque cada una devuelve un tipo de dato distinto.  
No es obligatorio hacerlo así, pero ayuda a mantener el código sencillo y evitar mezclas de tipos.  
:::


```java
public class PokemonRepository {

    //highlight-start
    // Limitamos la paginación a 20 pokémon
    private final static int LIMIT_POKEDEX = 20;

    // Variable que se irá incrementando tras cada petición para la paginación
    private int OFFSET_POKEDEX = 0;
    //highlight-end

    private final PokemonApi api;

    public PokemonRepository() {
        api = RetrofitClient.getPokemonApi();
    }

    // Callback para la búsqueda de UN pokemon (ya lo teníamos del tutorial anterior)
    public interface PokemonCallback {
        void onResult(Resource<Pokemon> result);
    }

    //highlight-start
    // Nuevo callback para la lista de la Pokédex
    public interface PokedexCallback {
        // Directamente devolvemos la lista de Pokédex para que sea más sencillo de procesar
        // Por eso está la clase PokedexResponse.PokedexEntry
        void onResult(Resource<List<PokedexResponse.PokedexEntry>> result);
    }
    //highlight-end

    public void getPokemon(String name, PokemonCallback callback) {
        // Código del tutorial anterior...
    }

    //highlight-start
    // Nuevo método para obtener la Pokédex
    public void getPokedex(PokedexCallback callback) {

        // Avisamos de que empieza la carga
        callback.onResult(Resource.loading());

        api.getPokedex(LIMIT_POKEDEX, OFFSET_POKEDEX).enqueue(new Callback<PokedexResponse>() {
            @Override
            public void onResponse(Call<PokedexResponse> call, Response<PokedexResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    // Recuperamos la lista de Pokémon directamente
                    List<PokedexResponse.PokedexEntry> lista = response.body().getResults();
                    callback.onResult(Resource.success(lista));
                } else {
                    callback.onResult(Resource.error("No se pudo cargar la Pokédex"));
                }

                // Incrementamos el offset
                OFFSET_POKEDEX += LIMIT_POKEDEX;
            }

            @Override
            public void onFailure(Call<PokedexResponse> call, Throwable t) {
                callback.onResult(Resource.error("Error de red: " + t.getMessage()));
            }
        });
    }
    //highlight-end
}
```

:::warning ADAPTA TU CÓDIGO A LAS CARACTERÍSTICAS DE TU API
La necesidad de usar **limit**, **offset** y lógica de paginación depende totalmente de cómo esté diseñada cada API.  
La **PokeAPI** organiza su contenido por páginas, así que debemos adaptar nuestro código a este comportamiento.  
En otras APIs los parámetros pueden tener nombres distintos (`page`, `cursor`, `next`, etc.) o incluso no existir paginación.  

➡️ **Revisa siempre la documentación de la API para aplicar el sistema correcto.**
:::


---

### Paso 5. Ampliar el `ViewModel` con un LiveData para la Pokédex

En `PokemonViewModel`, añadimos un `LiveData` nuevo para la lista:

```java
public class PokemonViewModel extends ViewModel {

    private final PokemonRepository repository;
    MutableLiveData<Resource<Pokemon>> informacionPokemon = new MutableLiveData<>();

    //highlight-next-line
    // LiveData para devolver la lista de Pokémon
    MutableLiveData<Resource<List<PokedexResponse.PokedexEntry>>> pokedex = new MutableLiveData<>();

    public PokemonViewModel() {
        repository = new PokemonRepository();
    }

    public void buscarPokemon(String name) {
        // Código del tutorial anterior
    }

    //highlight-start
    public void cargarPokedex() {
        // Lanzamos la petición
        repository.getPokedex(result -> {
            // Publicamos los resultados en el MLiveData
            pokedex.postValue(result);
        });
    }
    //highlight-end
}
```

En el Fragment observaremos este `pokedex` igual que hacías con `informacionPokemon`, reaccionando a `LOADING`, `SUCCESS` y `ERROR`. 

---

### Paso 6. Layout del Fragment de Pokédex y el `ViewHolder`

En el layout añadimos los siguientes componentes:

* `ProgressBar` para el estado `LOADING`
* `LinearLayout` de error para `ERROR`
* `RecyclerView` para la lista (`SUCCESS`)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    tools:context=".PokedexFragment">

    <!-- 🔄 LOADING -->
    <ProgressBar
        android:id="@+id/progressLoadingPokedex"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="16dp"
        android:visibility="gone"/>

    <!-- ❌ ERROR -->
    <LinearLayout
        android:id="@+id/layoutErrorPokedex"
        android:orientation="vertical"
        android:gravity="center"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        android:visibility="gone">

        <TextView
            android:id="@+id/tvErrorPokedex"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="No se pudo cargar la Pokédex"
            android:textStyle="bold"
            android:textSize="18sp"/>
    </LinearLayout>

    <!-- 📋 LISTA DE POKÉMON -->
    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerPokedex"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_marginTop="8dp"
        android:layout_weight="1"
        tools:listitem="@layout/viewholder_pokemon"/>

</LinearLayout>
```

Y un layout sencillo para cada fila `viewholder_pokemon.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="8dp"
    card_view:cardCornerRadius="8dp"
    card_view:cardElevation="4dp">

    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="12dp">

        <TextView
            android:id="@+id/tvPokemonNumber"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginEnd="12dp"
            android:text="#001"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/tvPokemonNameItem"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="bulbasaur"
            android:textSize="16sp" />

    </LinearLayout>
</androidx.cardview.widget.CardView>
```

---

### Paso 7. Crear el `Adapter` para la Pokédex

Creamos `PokedexAdapter` que recibe una lista de `PokedexEntry`:

```java
public class PokemonAdapter extends RecyclerView.Adapter<PokemonAdapter.PokemonViewHolder> {

    // Lista de Pokémon a mostrar
    List<PokedexResponse.PokedexEntry> pokemonList;
    private final LayoutInflater inflater;

    public PokemonAdapter(Context context) {
        this.inflater = LayoutInflater.from(context);
        this.pokemonList = new ArrayList<>();
    }

    @NonNull
    @Override
    public PokemonViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = inflater.inflate(R.layout.viewholder_pokemon, parent, false);
        return new PokemonViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PokemonViewHolder holder, int position) {
        PokedexResponse.PokedexEntry entry = pokemonList.get(position);

        int id = entry.getIdFromUrl();
        String numeroFormateado = String.format("#%03d", id);

        holder.binding.tvPokemonNumber.setText(numeroFormateado);
        holder.binding.tvPokemonNameItem.setText(entry.getName());
    }

    @Override
    public int getItemCount() {
        return pokemonList != null ? pokemonList.size() : 0;
    }

    public void setPokemonList(List<PokedexResponse.PokedexEntry> pokemonList) {
        this.pokemonList = pokemonList;
        notifyDataSetChanged();
    }

    public void addPokemonList(List<PokedexResponse.PokedexEntry> nuevos) {
        // Guardamos el índice donde empieza la nueva inserción
        int inicio = pokemonList.size();

        // Añadimos al final de la lista los nuevos elementos recibidos
        this.pokemonList.addAll(nuevos);

        // Notificamos al RecyclerView que hemos insertado un rango de elementos,
        // para que solo actualice esa parte y no toda la lista (más eficiente).
        notifyItemRangeInserted(inicio, nuevos.size());
    }


    public class PokemonViewHolder extends RecyclerView.ViewHolder {

        private final ViewholderPokemonBinding binding;

        public PokemonViewHolder(@NonNull View itemView) {
            super(itemView);
            binding = ViewholderPokemonBinding.bind(itemView);
        }
    }
}
```

:::info
En este adapter tenemos dos métodos porque nuestra API usa **paginación**:

- `addPokemonList()` → añade solo los nuevos elementos al final de la lista, ideal cuando la API devuelve resultados por páginas (como ocurre con la Pokédex).
- `setPokemonList()` → reemplaza la lista completa y sería suficiente si la API devolviera **todos los Pokémon de una sola vez**, sin paginación. (No se está usando, es para que lo tengas de referencia si tu API no tiene paginación.)

En APIs sin paginación, normalmente solo necesitaríamos `setPokemonList()`.
:::


---

### Paso 8. Programar el `PokedexFragment` y conectar todo

El `PokedexFragment` es el encargado de mostrar la lista paginada de Pokémon y coordinar la comunicación entre la interfaz y el `ViewModel`. Nada más crearse la vista, el fragment obtiene una instancia del `PokemonViewModel`, configura el `RecyclerView` con su adaptador y se suscribe a los cambios del LiveData que contiene la Pokédex. De este modo, cualquier actualización en los datos procedentes del Repository se reflejará automáticamente en pantalla.

Cuando el fragment observa el LiveData, gestiona los tres estados del `Resource`:

* **LOADING** → muestra un `ProgressBar` para indicar que se están cargando datos.
* **SUCCESS** → oculta el loading y añade al `RecyclerView` los nuevos Pokémon recibidos desde la API.
* **ERROR** → oculta la lista y muestra un mensaje de error si la petición no se ha podido completar.

Esta separación clara de estados facilita una interfaz más fluida y reactiva.

Además, el fragment implementa un **sistema de paginación automática**. A través de un `OnScrollListener`, detecta cuándo el usuario ha llegado al final del RecyclerView. En ese momento, llama al método `cargarPokedex()` del ViewModel para solicitar la siguiente página de resultados. Gracias a esto, el usuario puede seguir haciendo scroll y la lista irá creciendo conforme se descargan más Pokémon, imitando el comportamiento típico de una app con scroll infinito.

Por último, el fragment realiza una llamada inicial a `cargarPokedex()` en `onViewCreated()` para que la primera página de la Pokédex se cargue tan pronto como la pantalla esté lista, asegurando una experiencia rápida y sin retrasos.


```java
public class PokedexFragment extends Fragment {

    private FragmentPokedexBinding binding;
    private PokemonViewModel viewModel;
    private PokemonAdapter adapter;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentPokedexBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        viewModel = new ViewModelProvider(requireActivity()).get(PokemonViewModel.class);

        configurarRecyclerView();
        observarPokedex();
        configurarPaginacion();

        // Lanzamos la carga inicial
        viewModel.cargarPokedex();
    }

    private void configurarRecyclerView() {
        adapter = new PokemonAdapter(requireContext());
        binding.recyclerPokedex.setAdapter(adapter);
        binding.recyclerPokedex.setLayoutManager(new LinearLayoutManager(getContext()));
    }

    private void observarPokedex() {
        viewModel.pokedex.observe(getViewLifecycleOwner(), resource -> {
            if (resource == null) return;

            // Gestionamos los diferentes estados
            switch (resource.status) {
                case LOADING:
                    binding.progressLoadingPokedex.setVisibility(View.VISIBLE);
                    binding.layoutErrorPokedex.setVisibility(View.GONE);
                    binding.recyclerPokedex.setVisibility(View.VISIBLE);
                    break;

                case SUCCESS:
                    binding.progressLoadingPokedex.setVisibility(View.GONE);
                    binding.layoutErrorPokedex.setVisibility(View.GONE);
                    binding.recyclerPokedex.setVisibility(View.VISIBLE);

                    // Añadimos a la lista del RecyclerView los 20 nuevos Pokémon recibidos
                    adapter.addPokemonList(resource.data);
                    break;

                case ERROR:
                    binding.progressLoadingPokedex.setVisibility(View.GONE);
                    binding.recyclerPokedex.setVisibility(View.GONE);
                    binding.layoutErrorPokedex.setVisibility(View.VISIBLE);
                    binding.tvErrorPokedex.setText(resource.message);
                    break;
            }
        });
    }

    // OJO: hacer esto solo si tu API tiene paginación
    private void configurarPaginacion() {
        // Añadimos un listener al RecyclerView para detectar el scroll
        binding.recyclerPokedex.addOnScrollListener(new RecyclerView.OnScrollListener() {

            @Override
            public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);

                // Comprobamos si el usuario ha llegado al final del RecyclerView.
                // canScrollVertically(1) devuelve false cuando NO se puede seguir bajando.
                if (!recyclerView.canScrollVertically(1)) {

                    // Si estamos en el final, pedimos al ViewModel que cargue la siguiente página
                    viewModel.cargarPokedex();
                }
            }
        });
    }
}
```

---

## Mejoras sobre el código anterior

### Bloqueo de llamadas repetidas durante la paginación

Cuando el usuario hace scroll muy rápido hasta el final de la lista, Android puede disparar **varias veces seguidas** el evento del `OnScrollListener`.
Eso significa que podríamos llamar a:

```java
viewModel.cargarPokedex();
```

tres, cuatro o incluso diez veces antes de que la API haya respondido a la primera.

Observa como se saltan algunos Pokémon en la lista:

![Demo app](./0-img/demo-error-carga.gif)

Esto produciría varios problemas:

1. **Peticiones repetidas con el mismo offset**

    Hasta que no llega la respuesta, el `OFFSET` no cambia.
    Por tanto, se repetirían varias peticiones a:

    ```
    pokemon?limit=20&offset=0  
    pokemon?limit=20&offset=0  
    pokemon?limit=20&offset=0  
    ```

    La lista se llenaría de duplicados.

2. **Carga incorrecta de páginas**

    Si varias peticiones se completan en distinto orden (algo típico en redes móviles):

    * Página 2 puede llegar antes que página 1
    * O página 3 puede sobrescribir datos de página 2
    * Se mezclan resultados

    Esto **rompe por completo la paginación**.

3. **Ineficiencia y sobrecarga en la red**

    Hacer 5 peticiones simultáneas a la API para obtener lo mismo:

    * Malgasta datos móviles
    * Aumenta los tiempos de respuesta
    * Saturaría la app innecesariamente


Este error podemos solucionarlo con un booleano que actúe como **semáforo** que controla el acceso a la operación de carga.
Cuando su valor es `true`, es como si el semáforo estuviera en rojo:
ningún otro hilo (o más correctamente, ninguna otra llamada desde la UI) puede iniciar una nueva petición a la API.

Cuando la petición termina (en éxito o error), ponemos el booleano a `true` y el semáforo vuelve a verde, permitiendo que se pueda solicitar la siguiente página.


```java
public class PokemonViewModel extends ViewModel {

    private final PokemonRepository repository;
    MutableLiveData<Resource<Pokemon>> informacionPokemon = new MutableLiveData<>();

    MutableLiveData<Resource<List<PokedexResponse.PokedexEntry>>> pokedex = new MutableLiveData<>();

    //highlight-next-line
    // Semáforo de control de peticiones
    //highlight-next-line
    private boolean isLoading = false;

    public PokemonViewModel() {
        repository = new PokemonRepository();
    }

    public void buscarPokemon(String name) {
        // ...
    }

    //highlight-start
    public void cargarPokedex() {
        if (isLoading) return;   // Si ya estamos cargando, salimos y NO lanzamos otra petición
        isLoading = true;        // Marcamos que una petición está en curso

        repository.getPokedex(result -> {
            pokedex.postValue(result);  // Enviamos al LiveData el resultado recibido

            // Si la petición ya terminó (success o error), desbloqueamos
            switch (result.status) {
                case ERROR:
                case SUCCESS:
                    isLoading = false;
            }
        });
    }
    //highlight-end
}
```

### Pantalla de detalle

Para permitir que el usuario pueda consultar la información completa de un Pokémon seleccionándolo desde la Pokédex, necesitamos añadir un pequeño flujo de navegación entre el `RecyclerView` y la pantalla de detalle. A nivel teórico, el proceso consiste en los siguientes pasos:

1. **Detectar el click del usuario en un elemento del RecyclerView**
   El `Adapter` es el responsable de gestionar cada ítem, así que es ahí donde debemos incluir un *listener* de click.
   Esto se hace en `onBindViewHolder`, asociando un `setOnClickListener()` al `itemView`.
   Así sabremos exactamente qué Pokémon ha pulsado el usuario.
   Esta parte es igual que lo que ya sabemos.

2. **Obtener el identificador del Pokémon seleccionado**
   De cada entrada de la Pokédex podemos extraer su **id** (a partir de la URL) y enviarlo al ViewModel informando cuál es el Pokémon seleccionado.

3. **Navegar hacia la pantalla de detalle**
   Desde el Adapter usamos el *Navigation Component* para ir a la pantalla de detalle.

4. **Solicitar los datos completos del Pokémon**
   La pantalla de detalle ya cuenta con un `ViewModel` que tiene el método `buscarPokemon(nombre)` o similar.
   Cuando se abre, recibe el id/nombre desde los argumentos y llama al Repository para cargar la información completa.
   Esto evita tener que duplicar código o crear lógica nueva: **reutilizamos completamente el sistema de búsqueda del tutorial anterior**.

5. **Mostrar los datos completos del Pokémon**
   El Fragment de detalle observa el LiveData del ViewModel y actualiza la UI con nombre, altura, peso, tipos e imágenes, tal como ya se implementó en la pantalla de búsqueda.

En resumen, la pantalla de detalle no necesita cambios importantes.
Solo debemos **enlazar la Pokédex con ella**, detectando qué Pokémon seleccionó el usuario y reenviando ese valor al ViewModel para que consulte toda la información en la PokeAPI.
