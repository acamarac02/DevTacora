---
title: RecyclerView
sidebar_position: 3
description: "RecyclerView permite mostrar listas de datos de forma eficiente mediante un sistema de ViewHolder y adaptadores, ideal para listas dinámicas o grandes volúmenes de información."
keywords: [Android, RecyclerView, Adapter, ViewHolder, Repository, GridLayoutManager]
---

<div class="justify-text">

La **RecyclerView** es un componente de Android diseñado para mostrar **listas o cuadrículas de elementos** de manera **eficiente y flexible**. Es ideal para listas grandes o listas dinámicas en las que los datos pueden cambiar en tiempo de
ejecución. El RecyclerView reutiliza ("recicla") las vistas, lo cual mejora el rendimiento y reduce la carga de
memoria, ya que no crea una vista para cada elemento, sino solo para las que están en pantalla o próximas a
mostrarse. A diferencia del antiguo `ListView`, este componente **recicla las vistas** que salen de pantalla y solo mantiene en memoria las necesarias, lo que mejora el rendimiento.

![Ejemplo RecyclerView](./0-img/ejemplo-recycler-view.png)

Un RecyclerView permite mostrar los datos con **cuatro disposiciones** diferentes:

![Disposiciones RecyclerView](./0-img/disposiciones-recyvlerview.png)

---

## Estructura general

Para implementar una RecyclerView completa necesitamos varios elementos que trabajan en conjunto:

| Elemento | Función |
|-----------|----------|
| **RecyclerView** | Contenedor que muestra los elementos en forma de lista o cuadrícula. |
| **Modelo (Model)** | Clase Java que define los datos de cada elemento (por ejemplo, `Animal`). |
| **Repository** | Clase que gestiona la lista de datos (por ahora, con patrón Singleton; más adelante utilizaremos ViewModel para mejorarlo). |
| **ViewHolder** | Describe la estructura visual de un solo elemento de la lista. |
| **Adapter** | Enlaza los datos del Repository con las vistas (ViewHolder). |
| **LayoutManager** | Controla la disposición de los elementos (vertical, horizontal o en cuadrícula). |

En resumen, **RecyclerView** es el contenedor principal para la interfaz de usuario y el **ViewHolder** es la plantilla para mostrar un elemento en el RecyclerView. Cada ítem que se muestra en el RecyclerView es una copia del ViewHolder. Por ejemplo, si el RecyclerView ha de mostrar una lista de productos, cada ViewHolder representa un único producto.

![Resumen ViewHolders](./0-img/resumen-viewholders.png)

---

## Pasos para implementar un RecyclerView

En esta parte del tutorial vamos a implementar esta aplicación:

![Demo Recycler](./0-img/demo-rv.gif)

### 1️⃣ Crear la estructura base de la app

Partimos de una aplicación con **una sola Activity** que contendrá **dos fragments**:

* `AnimalesFragment`: muestra la lista de animales mediante un `RecyclerView`.
* `DetalleAnimalFragment`: muestra la información detallada del animal seleccionado.

Esta estructura se conoce como **Master/Detail**, ya que un fragmento actúa como lista principal (*master*) y el otro como detalle del elemento (*detail*).

![Resumen navegación Recycler](./0-img/resumen-nav-recycler.png)

El **grafo de navegación** conecta ambos fragments.
Debemos definir una **acción de navegación** entre ellos, que se ejecutará al pulsar sobre un elemento del RecyclerView para mostrar su detalle.

![Grafo navegación RecyclerView](./0-img/grafo-recyclerview.png)

:::note Recordatorio
La incorporación de **Fragments dentro de una Activity** ya se explicó en apartados anteriores.  
Si tienes dudas sobre cómo añadir o gestionar fragments con Navigation, puedes revisar ese contenido antes de continuar.
:::

---

### 2️⃣ Crear el modelo de datos

Comenzamos definiendo la clase **`Animal.java`**, que actuará como **modelo de datos** para representar cada elemento que se mostrará en el `RecyclerView`.

Para crear una nueva clase Java:
➡️ **Click derecho sobre la carpeta `java` > New > Java Class**

![Crear clase Java](./0-img/crear-clase-java.png)

```java title="Animal.java"
public class Animal implements Serializable {

    private String nombre;
    private int imagen; // ID del recurso drawable
    private String descripcion;

    public Animal(String nombre, int imagen, String descripcion) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }

    public String getNombre() { return nombre; }
    public int getImagen() { return imagen; }
    public String getDescripcion() { return descripcion; }
}
```

:::info Sobre el atributo `imagen`
En este caso, el atributo `imagen` es de tipo **`int`** porque almacena el **identificador del recurso drawable** (por ejemplo, `R.drawable.perro`) incluido dentro del propio proyecto.  
Android asigna a cada recurso un ID numérico único, por eso el tipo debe ser `int`.  

Más adelante, cuando trabajemos con **APIs externas**, las imágenes no estarán dentro de la app, sino que se cargarán desde Internet. En ese caso, usaremos un **`String`** para guardar la **URL** de la imagen.
:::


:::tip Organización del proyecto
Es recomendable **crear paquetes** (por ejemplo: `model`, `repository`, `adapter`, `ui`)
para mantener el código organizado y facilitar su mantenimiento a medida que el proyecto crece.

![Organización paquetes](./0-img/organizacion-paquetes.png)
:::

---

### 3️⃣ Crear el repositorio de datos

El **Repository** será la clase encargada de **almacenar y proporcionar los datos** de los animales a los distintos fragments.
En este ejemplo, guardaremos la lista de animales en memoria mediante un **`ArrayList`**.

```java title="AnimalesRepository.java"
public class AnimalesRepository {

    private List<Animal> listaAnimales;

    private AnimalesRepository() {
        listaAnimales = new ArrayList<>();

        listaAnimales.add(new Animal("Max", R.drawable.perro1, "Max es un labrador leal y juguetón."));
        listaAnimales.add(new Animal("Luna", R.drawable.gato1, "Luna es una gata curiosa y cazadora."));
        listaAnimales.add(new Animal("Paco", R.drawable.pajaro1, "Paco es un loro que habla mucho."));
        listaAnimales.add(new Animal("Spirit", R.drawable.caballo1, "Spirit es un caballo fuerte y veloz."));
        listaAnimales.add(new Animal("Rocky", R.drawable.perro2, "Rocky es un bulldog cariñoso y protector."));
        listaAnimales.add(new Animal("Simba", R.drawable.gato2, "Simba es un gato persa muy tranquilo."));
        listaAnimales.add(new Animal("Tweety", R.drawable.pajaro2, "Tweety es un canario de color amarillo."));
        listaAnimales.add(new Animal("Stella", R.drawable.caballo2, "Stella es una yegua amigable y rápida."));
        listaAnimales.add(new Animal("Bella", R.drawable.perro3, "Bella es una golden retriever amistosa."));
        listaAnimales.add(new Animal("Nala", R.drawable.gato3, "Nala es una gata independiente y elegante."));
    }

    public List<Animal> getAnimales() {
        return listaAnimales;
    }

}
```

---


### 4️⃣ Crear el layout del fragment principal

El fragmento que mostrará la lista de animales contendrá un **`RecyclerView`**, que actúa como **contenedor de los datos**.
Por sí mismo, el RecyclerView **no muestra información**: solo define **dónde** y **cómo** se presentarán los elementos que le asigne el adaptador.

En esta fase el RecyclerView estará **vacío**, y más adelante lo **rellenaremos desde el código Java** con los datos del `ArrayList` del repositorio.

Cuando se añade al layout, es importante definir **cómo se organizarán los elementos** (los `ViewHolder`).
Esto se controla mediante el atributo `app:layoutManager`.
En nuestro caso, utilizaremos un **`GridLayoutManager`** para mostrar los animales en **cuadrícula**.

```xml title="fragment_animales.xml"
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".AnimalesFragment">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="8dp"
        tools:listitem="@layout/viewholder_animal" />
</FrameLayout>
```

:::info Atributo listitem
El atributo `tools:listitem` indica al editor de Android Studio qué layout se usará para previsualizar cada elemento del RecyclerView.
:::

---


### 5️⃣ Diseñar el layout del ViewHolder

Este layout define la **apariencia de cada elemento** de la lista, es decir, cómo se mostrará **cada animal** dentro del `RecyclerView`.
Para conseguir un estilo moderno y limpio, utilizaremos un **`CardView`**, que permite mostrar cada elemento como una tarjeta con esquinas redondeadas y sombra.

Antes de ver el código, ten en cuenta lo siguiente:

* Al usar un **`GridLayout`**, el contenedor principal del *ViewHolder* (en este caso el `CardView`) debe tener:

  * `android:layout_width="match_parent"`
  * `android:layout_height="wrap_content"`
    
    Luego, en el código Java, definiremos el número de columnas del grid, y Android ajustará automáticamente el tamaño de cada tarjeta.

* En el **`ImageView`** se mostrará la **imagen** del animal.

* En el **`TextView`** se mostrará su **nombre**.


```xml title="viewholder_animal.xml"
<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_margin="8dp"
    app:cardCornerRadius="12dp"
    app:cardElevation="4dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="8dp"
        android:gravity="center_horizontal">

        <ImageView
            android:id="@+id/ivAnimal"
            android:layout_width="120dp"
            android:layout_height="120dp" />

        <TextView
            android:id="@+id/tvNombre"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:textSize="18sp"
            android:textStyle="bold" />
    </LinearLayout>
</com.google.android.material.card.MaterialCardView>
```

:::note Recordatorio
Para crear un nuevo **layout** en Android Studio:  
➡️ **Click derecho sobre la carpeta `res/layout` > New > Layout resource file**  
Después, asigna un nombre (por ejemplo, `viewholder_animal`) y selecciona el tipo de raíz que necesites (`ConstraintLayout`, `FrameLayout`, etc.).

![Nuevo layout](./0-img/nuevo-layout-vh.png)
:::


---

### 6️⃣ Crear el Adapter y el ViewHolder

El `RecyclerView` **no sabe por sí mismo cómo debe mostrar los datos** ni qué hacer con cada elemento de la lista.
Para eso necesita dos piezas clave que trabajen juntas:

1. **`ViewHolder`** → Define **cómo se ve** un elemento (el diseño de una sola tarjeta).
2. **`Adapter`** → Define **qué datos se muestran** en ese diseño y **cuántos elementos hay** en total.

En nuestro caso, el adaptador se llamará **`AnimalesAdapter`** y su ViewHolder interno será **`AnimalViewHolder`**.

#### 🧱 La clase `AnimalViewHolder`

El `ViewHolder` representa **una sola fila o tarjeta del RecyclerView**, es decir, la vista de **un solo animal**.
Su función es **mantener las referencias a los elementos del layout** (el `TextView` y el `ImageView`) para no tener que buscarlos con `findViewById()` cada vez, lo que mejora el rendimiento.

En este caso usamos **ViewBinding**, por lo que el ViewHolder se encarga de **enlazar el layout XML `viewholder_animal.xml`** con un objeto `binding` que da acceso directo a sus vistas.

#### 🧩 La clase `AnimalesAdapter`

El adaptador actúa como **puente entre los datos (ArrayList de animales)** y el **RecyclerView** que los muestra en pantalla.

Sus principales responsabilidades son:

| Método                 | Función                                                                           |
| ---------------------- | --------------------------------------------------------------------------------- |
| `onCreateViewHolder()` | Crea (infla) una nueva vista para un elemento cuando el RecyclerView la necesita. |
| `onBindViewHolder()`   | Rellena la vista con los datos del animal correspondiente.                        |
| `getItemCount()`       | Indica cuántos elementos hay en total en la lista.                                |
| `establecerLista()`    | Permite actualizar la lista completa y notificar los cambios.                     |

---

```java title="AnimalesAdapter.java"
public class AnimalesAdapter extends RecyclerView.Adapter<AnimalesAdapter.AnimalViewHolder> {

    private List<Animal> animales;            // Lista de animales a mostrar
    private final LayoutInflater inflater;    // Crea (infla) las vistas desde XML

    // Constructor: recibe el contexto y la lista de animales
    public AnimalesAdapter(Context context, ArrayList<Animal> animales) {
        this.animales = animales;
        this.inflater = LayoutInflater.from(context);
    }

    // Crea un nuevo ViewHolder cuando el RecyclerView lo necesita
    @NonNull
    @Override
    public AnimalViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Infla el layout del ViewHolder (viewholder_animal.xml)
        View view = inflater.inflate(R.layout.viewholder_animal, parent, false);
        return new AnimalViewHolder(view);
    }

    // Rellena los datos en el ViewHolder correspondiente a una posición concreta
    @Override
    public void onBindViewHolder(@NonNull AnimalViewHolder holder, int position) {
        Animal animal = animales.get(position);

        // Enlazamos los datos con los elementos del layout
        holder.binding.tvNombre.setText(animal.getNombre());
        holder.binding.ivAnimal.setImageResource(animal.getImagen());
    }

    // Indica cuántos elementos hay en la lista
    @Override
    public int getItemCount() {
        return animales != null ? animales.size() : 0;
    }

    // Permite actualizar la lista completa desde fuera del adaptador
    public void establecerLista(List<Animal> animales) {
        this.animales = animales;
        notifyDataSetChanged(); // Notifica al RecyclerView que los datos han cambiado
    }

    // Clase interna ViewHolder que representa un solo elemento con ViewBinding
    public static class AnimalViewHolder extends RecyclerView.ViewHolder {

        // Objeto de enlace al layout viewholder_animal.xml
        ViewholderAnimalBinding binding;

        // El constructor recibe la vista del layout inflado
        public AnimalViewHolder(@NonNull View itemView) {
            super(itemView);
            // Asociamos el objeto binding con la vista
            binding = ViewholderAnimalBinding.bind(itemView);
        }
    }
}
```


> 💡 En resumen:
>
> * El **`AnimalViewHolder`** se encarga de **sostener las vistas** de un solo elemento.
> * El **`AnimalesAdapter`** decide **cuántos elementos hay**, **cuál mostrar** en cada posición y **cómo rellenarlo con datos**.
>   Juntos permiten que el `RecyclerView` funcione de forma eficiente y flexible.


---

### 7️⃣ Configurar el fragment principal

Ahora conectamos todo en el fragmento que mostrará la lista de animales.

```java title="AnimalesFragment.java"
public class AnimalesFragment extends Fragment {

    private FragmentAnimalesBinding binding;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentAnimalesBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Obtenemos la lista desde el Repository
        AnimalesRepository repository = new AnimalesRepository();
        List<Animal> listaAnimales = repository.getAnimales();

        // Configuramos el RecyclerView
        AnimalesAdapter adapter = new AnimalesAdapter(requireContext(), listaAnimales);
        binding.recyclerView.setAdapter(adapter);

        // Definimos el LayoutManager (en cuadrícula de 2 columnas)
        binding.recyclerView.setLayoutManager(new GridLayoutManager(requireContext(), 2));

    }
}
```

---

## Interacción con los ViewHolders

### Navegación a la pantalla de detalle

### Eliminar un elemento

</div>
