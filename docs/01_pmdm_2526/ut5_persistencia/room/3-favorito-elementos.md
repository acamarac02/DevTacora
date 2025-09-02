---
sidebar_position: 3
sidebar_label: Marcar como favorito
title: Marcar como favorito
---

<div class="justify-text">

En este tutorial vamos añadir un **botón de favorito (ImageButton)** a cada Animal del `RecyclerView`, de forma que al presionar el botón, se marcará o desmarcará como favorito, y se actualizará el estado visual. Además, guardaremos el nuevo estado en la base de datos.

![UT5. Seleccion favoritos](/img/pmdm/ut5/7-video-favorito.gif)

Para el botón usaremos los siguientes iconos ([Estrella iconos creados por Pixel perfect](https://www.flaticon.es/iconos-gratis/estrella)): 
![UT5. Icono no favorito](/img/pmdm/ut5/6-icon_no_fav.png)
![UT5. Icono favorito](/img/pmdm/ut5/5-icon_fav.png)


## Modificar el layout del ViewHolder

Modifica el layout de los `ViewHolder` del `RecyclerView` para añadir un `ImageButton` para el botón de favorito. Por defecto vamos a poner el icono de no favorito aunque lo controlaremos más adelante desde Java.  

```xml title="viewholder_animal.xml"
<CardView ...>
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="16dp">

        <TextView
            android:id="@+id/tvNombreAnimal"
            android:layout_width="0dp"
            android:layout_weight="1"
            android:layout_height="wrap_content"
            android:text="Nombre animal"
            android:textSize="18sp"
            android:textStyle="bold"
            android:padding="4dp" />

        <ImageButton
            android:id="@+id/btnFavorito"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:background="?attr/selectableItemBackground"
            android:src="@drawable/icon_no_fav"
            android:contentDescription="Añadir a favoritos" />
    </LinearLayout>
</CardView>
```
 
El background **`selectableItemBackground`** añade un efecto táctil al presionar el botón.  

## Añadir el estado de favorito a la entidad (`Animal`)  

Modifica la entidad `Animal` para incluir un campo que indique si el animal está marcado como favorito:  

```java title="Animal.java"
@Entity(tableName = "animal")
public class Animal implements Serializable {

    @PrimaryKey(autoGenerate = true)
    private int id;
    private String nombre;
    private String descripcion;
    private byte[] foto;
    private boolean favorito;

    // Constructor
    public Animal(String nombre, String descripcion, byte[] foto) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.foto = foto;
        this.favorito = false; // Por defecto, cuando creamos un animal se pondrá como no favorito
    }
}
```

:::warning
Recuerda que un cambio en el modelo implica realizar una migración de la base de datos. También puedes **desinstalar la aplicación** del dispositivo y volver a instalarla sin realizar la migración.
:::

## Modificar el Adaptador del RecyclerView  

Ahora modificamos el adaptador del `RecyclerView` para:
- Mostrar el icono de favorito o no favorito según el estado del animal
- Responder al click del botón favorito, que implica:
    - Actualizar el estado del animal
    - Actualizar el icono en el `ViewHolder`
    - Ejecutar el update en base de datos


```java
public class AnimalAdapter extends RecyclerView.Adapter<AnimalAdapter.AnimalViewHolder> {

    ...

    @Override
    public void onBindViewHolder(@NonNull AnimalViewHolder holder, int position) {
        Animal animal = listaAnimales.get(position);
        holder.binding.tvNombreAnimal.setText(animal.getNombre());

        // Cuando se cargue el RecyclerView, actualizamos el icono según el estado del animal
        establecerIconoFavorito(animal, holder);

        holder.itemView.setOnClickListener(v -> navegarPantallaDetalle(animal));

        // Escuchamos los eventos de click sobre el botón de favorito
        holder.binding.btnFavorito.setOnClickListener(v -> marcarFavorito(animal, holder));
    }

    // Método que se ejecuta en el evento de click
    private void marcarFavorito(Animal animal, AnimalViewHolder holder) {
        // Cambiamos el estado del animal seleccionado
        if (animal.isFavorito()) animal.setFavorito(false);
        else animal.setFavorito(true);

        // Cambiamos el icono del animal seleccionado
        establecerIconoFavorito(animal, holder);

        // Actualizamos el estado del animal en base de datos
        viewModel.actualizarAnimal(animal);
    }

    // Método que establece el icono según el estado del animal
    private void establecerIconoFavorito(Animal animal, AnimalViewHolder holder) {
        if (animal.isFavorito()) {
            holder.binding.btnFavorito.setImageResource(R.drawable.icon_fav);
        } else {
            holder.binding.btnFavorito.setImageResource(R.drawable.icon_no_fav);
        }
    }
}
``` 

:::info
No olvides implementar el método `actualizarAnimal` en el `ViewModel`, `Repository` y `Dao` para realizar actualizaciones de registros sobre la base de datos.
:::

</div>