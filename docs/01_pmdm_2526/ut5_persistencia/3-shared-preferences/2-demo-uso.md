---
title: "Demo de uso"
sidebar_position: 2
description: "Ejemplo práctico de uso de SharedPreferences siguiendo la arquitectura MVVM con Repository para mostrar un diálogo solo la primera vez que se abre la app."
keywords: [SharedPreferences, MVVM, Repository, Android, Dialog, Primer ingreso]
---

En este ejemplo vamos a implementar una funcionalidad muy habitual en aplicaciones Android:
**mostrar un diálogo únicamente la primera vez que el usuario abre la app**.

![Demo app](../0-img/demo-sp.gif)

Para ello utilizaremos:

* **SharedPreferences** para persistir el dato
* **Arquitectura MVVM + Repository**
* Una **Activity contenedora**
* Toda la lógica en el **Fragment** principal

El comportamiento esperado es:

* La primera vez que se abre la app → se muestra un `AlertDialog`.
* Cuando el usuario confirma el diálogo → se guarda que ya no es primer ingreso.
* En aperturas posteriores → el diálogo **no vuelve a mostrarse**.

---

## Paso 1. Estructura inicial

Partimos de una aplicación con un grafo de navegación y:

* `MainActivity` (actividad contenedora)
* `HomeFragment` (pantalla principal)

---

## Paso 2. Crear el Repository

El **Repository** será la única clase que conozca `SharedPreferences`.
Aquí centralizamos la lectura y escritura del flag `primer_ingreso` y de todas las variables que necesites almacenar.

```java title="PreferencesRepository.java"
public class PreferencesRepository {

    private static final String PREFS_NAME = "prefs";
    private static final String KEY_PRIMER_INGRESO = "primer_ingreso";

    private final SharedPreferences sharedPreferences;

    public PreferencesRepository(Context context) {
        sharedPreferences = context.getApplicationContext()
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    public boolean isPrimerIngreso() {
        // Si no existe el valor, asumimos que es la primera vez
        return sharedPreferences.getBoolean(KEY_PRIMER_INGRESO, true);
    }

    public void setPrimerIngreso(boolean value) {
        sharedPreferences.edit()                        // abrimos un editor
                .putBoolean(KEY_PRIMER_INGRESO, value)  // guardamos el valor
                .apply();                               // confirmamos cambios
    }

}
```

---

## Paso 3. Crear el ViewModel

El **ViewModel** es el encargado de transmitir la información de manera asíncrona entre la vista (el Fragment) y la fuente de datos (el repositorio).

Como necesitamos `Context` para crear el repository, utilizamos `AndroidViewModel`.

```java title="MainViewModel.java"
public class MainViewModel extends AndroidViewModel {

    private final PreferencesRepository repository;
    private MutableLiveData<Boolean> primerIngreso = new MutableLiveData<>();

    public MainViewModel(@NonNull Application application) {
        super(application);
        repository = new PreferencesRepository(application);
    }

    /**
     * Método que actualiza un MutableLiveData con el valor almacenado
     * en las Preferences del primer ingreso
     */
    public void comprobarPrimerIngreso() {
        primerIngreso.postValue(repository.isPrimerIngreso());
    }

    /**
     * Método que almacena en las SharedPreferences que el usuario
     * ya realizó el primer ingreso
     */
    public void actualizarPrimerIngreso() {
        repository.setPrimerIngreso(false);
    }

    ///  Getter para el LiveData
    public MutableLiveData<Boolean> getPrimerIngreso() {
        return primerIngreso;
    }
}
```
---

## Paso 4. Programar el Fragment

El Fragment:

* Obtiene el ViewModel
* Observa el valor almacenado en las `SharedPreferences`
* Muestra el `AlertDialog`
* Notifica al ViewModel cuando el usuario confirma

```java title="MainFragment.java"
public class HomeFragment extends Fragment {

    private MainViewModel viewModel;
    private FragmentHomeBinding binding;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return (binding = FragmentHomeBinding.inflate(inflater, container, false)).getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        viewModel = new ViewModelProvider(this).get(MainViewModel.class);
        
        // Invocamos el método que consulta el valor almacenado
        viewModel.comprobarPrimerIngreso();
        
        // Configuramos un observador sobre el LiveData
        observadorPrimerIngreso();
    }

    private void observadorPrimerIngreso() {
        viewModel.getPrimerIngreso().observe(getViewLifecycleOwner(), esPrimerIngreso -> {
            if (esPrimerIngreso) {
                mostrarDialogo();
            }
        });
    }

    private void mostrarDialogo() {
        new AlertDialog.Builder(requireContext())
                .setTitle("¡Bienvenido!")
                .setMessage("Gracias por instalar nuestra aplicación. ¡Esperamos que te guste!")
                .setCancelable(false)
                .setPositiveButton("Continuar", (dialog, which) -> {
                    // Cuando el usuario pulsa el botón continuar, actualizamos
                    // las preferences para indicar que ya se ha hecho
                    // el primer ingreso
                    viewModel.actualizarPrimerIngreso();
                    // Cerramos el diálogo
                    dialog.dismiss();
                })
                .show();
    }

}
```

:::info ALERT DIALOG
Un **`AlertDialog`** es una ventana emergente (popup) que aparece sobre la interfaz de usuario para mostrar mensajes, advertencias o pedir confirmación al usuario.  

Sus características principales son:
- **No interrumpe el flujo de la actividad.**  
- **Bloquea la interacción con otros elementos** hasta que el usuario interactúa con el diálogo.  
- **Opcionalmente puede tener botones**:  
  - **Positivo (OK, Aceptar)**.  
  - **Negativo (Cancelar)**.  
  - **Neutral (Opcional para otra acción como 'Más tarde').**  


Los principales parámetros que admite un `AlertDialog` son:
- **`setTitle()`**: Título del diálogo.  
- **`setMessage()`**: Mensaje dentro del popup.  
- **`setPositiveButton()`**: Botón de acción positiva (ej: Aceptar, Guardar).  
- **`setNegativeButton()`**: Botón de acción negativa (ej: Cancelar).  
- **`setNeutralButton()`**: Botón neutral (ej: Más tarde).  
- **`setView()`**: Permite añadir una vista personalizada (como un `EditText`).  
- **`setItems()`**: Lista de opciones. 
- **`setCancelable()`**: Controla si el usuario puede cerrar el diálogo tocando fuera de él o presionando el botón de atrás (Back).

Como puedes observar son altamente personalizables.
:::