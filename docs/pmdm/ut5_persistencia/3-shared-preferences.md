---
sidebar_position: 3
sidebar_label: Shared preferences
title: Shared preferences
---

<div className="hidden-summary">
Almacenamiento persistente de datos simples.
</div>

<div class="justify-text">

## SharedPreferences
 
`SharedPreferences` es una API de Android que permite almacenar datos **clave-valor** de manera persistente. Se usa para guardar configuraciones, preferencias del usuario o estados de la aplicación.  
- **Ligero y rápido.**  
- Los datos se **mantienen incluso si la app se cierra o el dispositivo se reinicia**.  
- Ideal para guardar **datos pequeños** como booleanos, strings, enteros o floats.  

Algunos casos de uso de las `SharedPreferences` pueden ser:
- **Guardar configuración del usuario** (modo oscuro, idioma, etc.).  
- **Detectar primer acceso o tutorial completado.**  
- **Guardar tokens o identificadores simples.**  
- **Estados de conmutadores** (`Switch` o `CheckBox`).


### Crear SharedPreferences y guardar datos

Recuperamos las `SharedPreferences` con el método `getSharedPreferences`, que espera dos parámetros:
- **Nombre del archivo**: "prefs" es simplemente el nombre del archivo donde se almacenarán los datos de `SharedPreferences`. Puedes usar cualquier nombre de archivo que desees y este se guardará en el almacenamiento interno de la app. Puedes tener múltiples archivos de preferencias, cada uno con un nombre diferente.
- **Modo de apertura**: `MODE_PRIVATE` indica que las preferencias solo serán accesibles por la aplicación que las creó. Es la forma más segura y recomendada.

Por otro lado, para almacenar datos necesitamos un `Editor`, a partir del cual usaremos los métodos `putBoolean`, `putString`, etc.

```java
// El MODE_PRIVATE indica que las preferencias solo serán accesibles por la aplicación que las creó.
SharedPreferences preferences = getSharedPreferences("prefs", Context.MODE_PRIVATE);
// Editor para modificar los datos
SharedPreferences.Editor editor = preferences.edit();

// Guardar datos
editor.putBoolean("primer_ingreso", true);
editor.putString("usuario", "Juan");
editor.putInt("nivel", 5);
editor.apply();  // Guarda los cambios (asíncrono)
```

### Leer datos
Para la lectura podemos utilizar los métodos `getBoolean`, `getString`, etc. Como segundo parámetro admite un valor por defecto, que se asignará a la variable en caso de que la clave buscada no exista en las `SharedPreferences`.

```java
// Asegúrate de usar el nombre del archivo correcto
SharedPreferences preferences = getSharedPreferences("prefs", Context.MODE_PRIVATE);

// Leer datos (con valores por defecto si no existe)
boolean primerIngreso = preferences.getBoolean("primer_ingreso", false);
String usuario = preferences.getString("usuario", "Desconocido");
int nivel = preferences.getInt("nivel", 0);
```

### Eliminar datos  
```java
SharedPreferences.Editor editor = preferences.edit();
editor.remove("usuario");  // Elimina una clave específica
editor.apply();
```


### Limpiar todas las preferencias  
```java
editor.clear();  // Elimina TODAS las claves guardadas
editor.apply();
```

### Tipos de datos que puedes guardar  
- **String** → `putString("clave", "valor")`  
- **Boolean** → `putBoolean("clave", true)`  
- **Int** → `putInt("clave", 10)`  
- **Float** → `putFloat("clave", 5.5f)`  
- **Long** → `putLong("clave", System.currentTimeMillis())`  

### Buenas prácticas

Para centralizar la gestión de las preferencias es recomendable crear una clase que encapsule su lógica, utilizando constantes para las claves y métodos que establezcan los valores de cada clave y los devuelvan:

```java title="SharedPreferencesHelper.java"
public class SharedPreferencesHelper {

    private SharedPreferences sharedPreferences;

    private static final String PREFS_NAME = "prefs";
    private static final String KEY_PRIMER_INGRESO = "primer_ingreso";

    public SharedPreferencesHelper(Context context) {
        sharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    public void guardarPrimerIngreso(boolean primerIngreso) {
        sharedPreferences.edit().putBoolean(KEY_PRIMER_INGRESO, primerIngreso).apply();
    }
    
    public boolean obtenerPrimerIngreso() {
        // Si no existe en el almacenamiento, consideramos que es el primer ingreso
        return sharedPreferences.getBoolean(KEY_PRIMER_INGRESO, true);
    }

}
```

Su uso sería similar al siguiente:

```java
SharedPreferencesHelper helper = new SharedPreferencesHelper(this);
boolean isPrimerIngreso = helper.obtenerPrimerIngreso();
helper.guardarPrimerIngreso(false);
```

---

## AlertDialog
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

Ejemplo de un `AlertDialog` simple con botón de Aceptar y Cancelar:

```java
new AlertDialog.Builder(this)
    .setTitle("Confirmar")
    .setMessage("¿Estás seguro de eliminar este elemento?")
    .setPositiveButton("Sí", (dialog, which) -> {
        // Acción al presionar Sí
        // Función lambda que recibe una referencia al diálogo y la referencia del botón que fue presionado (which) 
    })
    .setNegativeButton("Cancelar", (dialog, which) -> {
        dialog.dismiss();  // Cierra el diálogo
    })
    .show();
```


## Ejemplo de uso

En este tutorial vamos ampliar la aplicación anterior, de modo que si es la primera vez que accedemos se mostrará un PopUp de bienvenida al usuario. El procedimiento a seguir será:
- **Guardar un valor booleano** en `SharedPreferences` indicando si el usuario ha accedido por primera vez.  
- **Mostrar un Popup de bienvenida** (`AlertDialog`) si es la primera vez.  
- **Actualizar `SharedPreferences`** para que no se vuelva a mostrar el Popup.  

Como queremos que se muestre nada más iniciar la aplicación, podemos incluir este código en la `MainActivity`. Ten en cuenta que estamos utilizando la clase `SharedPreferencesHelper` creada en el apartado de Buenas prácticas.

```java title="MainActivity.java"
public class MainActivity extends AppCompatActivity {

    private static final String PREFERENCIAS = "prefs";
    private static final String PRIMER_INGRESO = "primer_ingreso";

    private SharedPreferencesHelper helper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Inicializamos la clase helper
        helper = new SharedPreferencesHelper(this);

        // Recuperar la clave "primer_ingreso"
        // La primera vez que ingresemos esa clave no existirá y por eso la ponemos a true por defecto
        boolean esPrimeraVez = helper.obtenerPrimerIngreso();

        if (esPrimeraVez) {
            mostrarPopupBienvenida();
        }
    }

    private void mostrarPopupBienvenida() {
        new AlertDialog.Builder(this)
                .setTitle("¡Bienvenido!")
                .setMessage("Gracias por instalar nuestra aplicación. ¡Esperamos que te guste!")
                .setPositiveButton("Entendido", (dialog, which) -> {
                    // Guardar que ya se mostró el Popup
                    helper.guardarPrimerIngreso(false);

                    // Cerramos el PopUp
                    dialog.dismiss();
                })
                .setCancelable(false)
                .show();
    }
}
```


:::info
Otras herramientas que puedes utilizar para crear mensajes con botones de acción son **`Snackbar`** o **`DialogFragment`**. Este último es similar a `AlertDialog` pero permite crear layouts más complejos y personalizables.
:::

![UT5. PopUp de Bienvenida](/img/pmdm/ut5/8-video-popup.gif)

</div>