"use strict";(self.webpackChunkpmdm=self.webpackChunkpmdm||[]).push([[4568],{15:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>d,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>s});const i=JSON.parse('{"id":"pmdm/ut4_persistencia/room/insertar-elementos","title":"Insertar y eliminar elementos","description":"Vamos a estudiar c\xf3mo a\xf1adir animales a nuestra base de datos usando un Floating Action Button. Adem\xe1s, a\xf1adiremos un nuevo campo a nuestros animales: su imagen. Dicha imagen se seleccionar\xe1 desde la galer\xeda del dispositivo y se almacenar\xe1 en la base de datos. Por \xfaltimo, veremos c\xf3mo eliminar un animal al deslizar a izquierda o derecha un elemento del RecyclerView.","source":"@site/docs/pmdm/ut4_persistencia/room/2-insertar-elementos.md","sourceDirName":"pmdm/ut4_persistencia/room","slug":"/pmdm/ut4_persistencia/room/insertar-elementos","permalink":"/DevTacora/docs/pmdm/ut4_persistencia/room/insertar-elementos","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"sidebar_label":"Insertar y eliminar elementos","title":"Insertar y eliminar elementos"},"sidebar":"pmdmSidebar","previous":{"title":"Mostrar elementos almacenados","permalink":"/DevTacora/docs/pmdm/ut4_persistencia/room/lista-elementos"},"next":{"title":"Marcar como favorito","permalink":"/DevTacora/docs/pmdm/ut4_persistencia/room/favorito-elementos"}}');var r=n(4848),t=n(8453);const l={sidebar_position:2,sidebar_label:"Insertar y eliminar elementos",title:"Insertar y eliminar elementos"},o=void 0,d={},s=[{value:"Insertar elementos",id:"insertar-elementos",level:2},{value:"Floating Action Button (FAB)",id:"floating-action-button-fab",level:3},{value:"1. Agregar dependencias",id:"1-agregar-dependencias",level:4},{value:"2. Modificar el layout del Fragment",id:"2-modificar-el-layout-del-fragment",level:4},{value:"Gesti\xf3n de la navegaci\xf3n",id:"gesti\xf3n-de-la-navegaci\xf3n",level:3},{value:"1. Crear el fragmento y la navegaci\xf3n",id:"1-crear-el-fragmento-y-la-navegaci\xf3n",level:4},{value:"2. A\xf1adir Listener al FAB",id:"2-a\xf1adir-listener-al-fab",level:4},{value:"Fragment para a\xf1adir animales",id:"fragment-para-a\xf1adir-animales",level:3},{value:"A\xf1adir imagen del animal",id:"a\xf1adir-imagen-del-animal",level:2},{value:"Modificar la Entidad (<code>Animal</code>)",id:"modificar-la-entidad-animal",level:3},{value:"Actualizar la Base de Datos",id:"actualizar-la-base-de-datos",level:3},{value:"Actualizar el layout para elegir foto de la galer\xeda",id:"actualizar-el-layout-para-elegir-foto-de-la-galer\xeda",level:3},{value:"Implementar la l\xf3gica en el Fragment",id:"implementar-la-l\xf3gica-en-el-fragment",level:3},{value:"Mostrar la imagen en el Fragmento de detalle",id:"mostrar-la-imagen-en-el-fragmento-de-detalle",level:3},{value:"Consideraciones",id:"consideraciones",level:3},{value:"Eliminar animal",id:"eliminar-animal",level:2}];function c(e){const a={admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{class:"justify-text",children:[(0,r.jsx)(a.p,{children:"Vamos a estudiar c\xf3mo a\xf1adir animales a nuestra base de datos usando un Floating Action Button. Adem\xe1s, a\xf1adiremos un nuevo campo a nuestros animales: su imagen. Dicha imagen se seleccionar\xe1 desde la galer\xeda del dispositivo y se almacenar\xe1 en la base de datos. Por \xfaltimo, veremos c\xf3mo eliminar un animal al deslizar a izquierda o derecha un elemento del RecyclerView."}),(0,r.jsx)(a.h2,{id:"insertar-elementos",children:"Insertar elementos"}),(0,r.jsxs)(a.p,{children:["En este apartado implementaremos un ",(0,r.jsx)(a.strong,{children:"Floating Action Button (FAB)"})," en la pantalla principal de la aplicaci\xf3n, que permitir\xe1 a los usuarios acceder r\xe1pidamente al fragmento para insertar nuevos animales."]}),(0,r.jsx)(a.h3,{id:"floating-action-button-fab",children:"Floating Action Button (FAB)"}),(0,r.jsxs)(a.p,{children:["El ",(0,r.jsx)(a.strong,{children:"Floating Action Button (FAB)"})," es un bot\xf3n circular que flota sobre la interfaz de usuario con el objetivo de proporcionar una experiencia intuitiva par el usuario y consistente con las directrices de ",(0,r.jsx)(a.strong,{children:"Material Design"}),". Este bot\xf3n se usa generalmente para ",(0,r.jsx)(a.strong,{children:"acciones principales o m\xe1s frecuentes"})," en una pantalla (como a\xf1adir, crear o iniciar algo nuevo)."]}),(0,r.jsx)(a.h4,{id:"1-agregar-dependencias",children:"1. Agregar dependencias"}),(0,r.jsxs)(a.p,{children:["Comenzamos a\xf1adiendo las ",(0,r.jsx)(a.strong,{children:"dependencias"})," necesarias. Si est\xe1s usando una versi\xf3n reciente de Android Studio, ",(0,r.jsx)(a.strong,{children:"Material Design"})," ya deber\xeda estar incluido. Si no, a\xf1ade la siguiente dependencia:"]}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-groovy",metastring:'title="build.gradle (Module: app)"',children:'implementation ("com.google.android.material:material:1.10.0")\n'})}),(0,r.jsx)(a.admonition,{type:"info",children:(0,r.jsxs)(a.p,{children:["Recuerda ",(0,r.jsx)(a.strong,{children:"sincronizar"})," el proyecto (",(0,r.jsx)(a.code,{children:"Sync Now"}),") despu\xe9s de a\xf1adir la dependencia."]})}),(0,r.jsx)(a.hr,{}),(0,r.jsx)(a.h4,{id:"2-modificar-el-layout-del-fragment",children:"2. Modificar el layout del Fragment"}),(0,r.jsxs)(a.p,{children:["Vamos a modificar el layout del fragmento ",(0,r.jsx)(a.code,{children:"AnimalesFragment"})," para incluir el FAB."]}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-xml",metastring:'title="fragment_animales.xml"',children:'<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:tools="http://schemas.android.com/tools"\n    xmlns:app="http://schemas.android.com/apk/res-auto"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    tools:context=".AnimalesFragment">\n\n    <androidx.recyclerview.widget.RecyclerView\n        android:id="@+id/recyclerViewAnimales"\n        android:layout_width="match_parent"\n        android:layout_height="match_parent"\n        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"\n        android:scrollbars="vertical" />\n\n    <com.google.android.material.floatingactionbutton.FloatingActionButton\n        android:id="@+id/fabAgregarAnimal"\n        android:layout_width="wrap_content"\n        android:layout_height="wrap_content"\n        app:srcCompat="@android:drawable/ic_input_add"\n        android:layout_gravity="bottom|end"\n        android:layout_margin="16dp"\n        android:contentDescription="Agregar Animal" />\n</FrameLayout>\n'})}),(0,r.jsx)(a.p,{children:(0,r.jsx)(a.strong,{children:"Explicaci\xf3n:"})}),(0,r.jsxs)(a.ul,{children:["\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:(0,r.jsx)(a.code,{children:"FloatingActionButton"})}),": Es el bot\xf3n flotante que a\xf1ade la acci\xf3n de agregar un nuevo animal."]}),"\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:(0,r.jsx)(a.code,{children:'app:srcCompat="@android:drawable/ic_input_add"'})}),': Icono del bot\xf3n. Usamos el propio recurso que ofrece Android con el s\xedmbolo "+".']}),"\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:(0,r.jsx)(a.code,{children:'android:layout_gravity="bottom|end"'})}),": Coloca el FAB en la esquina inferior derecha."]}),"\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:(0,r.jsx)(a.code,{children:'android:layout_margin="16dp"'})}),": A\xf1ade margen alrededor del bot\xf3n."]}),"\n"]}),(0,r.jsx)(a.h3,{id:"gesti\xf3n-de-la-navegaci\xf3n",children:"Gesti\xf3n de la navegaci\xf3n"}),(0,r.jsx)(a.p,{children:"Ahora, implementemos la funcionalidad para que el FAB lleve a una pantalla de a\xf1adir animales."}),(0,r.jsx)(a.h4,{id:"1-crear-el-fragmento-y-la-navegaci\xf3n",children:"1. Crear el fragmento y la navegaci\xf3n"}),(0,r.jsx)(a.p,{children:"Tu grafo de navegaci\xf3n deber\xe1 ser similar al siguiente:"}),(0,r.jsx)(a.p,{children:(0,r.jsx)(a.img,{alt:"UT4. Grafo navegaci\xf3n a\xf1adir animal",src:n(3614).A+"",width:"615",height:"511"})}),(0,r.jsx)(a.h4,{id:"2-a\xf1adir-listener-al-fab",children:"2. A\xf1adir Listener al FAB"}),(0,r.jsx)(a.p,{children:"Gestiona la navegaci\xf3n al nuevo Fragment desde el Listener del bot\xf3n flotante:"}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-java",metastring:'title="AnimalesFragment.java"',children:"public class AnimalesFragment extends Fragment {\n\n    private NavController navController;\n\n    ...\n\n    @Override\n    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {\n        super.onViewCreated(view, savedInstanceState);\n\n        ...\n\n        navController = Navigation.findNavController(view);\n        binding.fabAgregarAnimal.setOnClickListener(new View.OnClickListener() {\n            @Override\n            public void onClick(View view) {\n                navController.navigate(R.id.action_animalesFragment_to_anadirAnimalFragment);\n            }\n        });\n\n    }\n}\n"})}),(0,r.jsx)(a.h3,{id:"fragment-para-a\xf1adir-animales",children:"Fragment para a\xf1adir animales"}),(0,r.jsx)(a.p,{children:"El layout del Fragment puede ser similar al siguiente:"}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-xml",metastring:'title="fragment_anadir_animal.xml"',children:'<?xml version="1.0" encoding="utf-8"?>\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical"\n    android:padding="16dp">\n\n    <EditText\n        android:id="@+id/editNombre"\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n        android:hint="Nombre del Animal" />\n\n    <EditText\n        android:id="@+id/editDescripcion"\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n        android:hint="Descripci\xf3n" />\n\n    <Button\n        android:id="@+id/btnGuardar"\n        android:layout_width="wrap_content"\n        android:layout_height="wrap_content"\n        android:text="Guardar"\n        android:layout_marginTop="16dp" />\n</LinearLayout>\n'})}),(0,r.jsx)(a.p,{children:"En el c\xf3digo Java del Fragment a\xf1adiremos la l\xf3gica necesaria para recuperar el texto de los dos campos y guardar el animal en la base de datos cuando se pulse el bot\xf3n Guardar."}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-java",metastring:'title="AnadirAnimalFragment.java"',children:'public class AnadirAnimalFragment extends Fragment {\n\n    private FragmentAnadirAnimalBinding binding;\n    private AnimalViewModel animalViewModel;\n\n    @Override\n    public View onCreateView(LayoutInflater inflater, ViewGroup container,\n                             Bundle savedInstanceState) {\n        return (binding = FragmentAnadirAnimalBinding.inflate(inflater, container, false)).getRoot();\n    }\n\n    @Override\n    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {\n        super.onViewCreated(view, savedInstanceState);\n\n        animalViewModel = new ViewModelProvider(requireActivity()).get(AnimalViewModel.class);\n        binding.btnGuardar.setOnClickListener(v -> anadirAnimal());\n    }\n\n    private void anadirAnimal() {\n        String nombre = binding.editNombre.getText().toString();\n        String descripcion = binding.editDescripcion.getText().toString();\n\n        // Guardamos en la base de datos\n        // Deber\xedas asegurarte que los campos obligatorios est\xe9n rellenos\n        Animal nuevoAnimal = new Animal(nombre, descripcion);\n        animalViewModel.insertarAnimal(nuevoAnimal);\n\n        Toast.makeText(requireActivity(), "Animal a\xf1adido con \xe9xito", Toast.LENGTH_SHORT);\n\n        // Volvemos al fragment anterior\n        requireActivity().getSupportFragmentManager().popBackStack();\n    }\n}\n'})}),(0,r.jsx)(a.hr,{}),(0,r.jsx)(a.h2,{id:"a\xf1adir-imagen-del-animal",children:"A\xf1adir imagen del animal"}),(0,r.jsx)(a.p,{children:"Nuestra aplicaci\xf3n tiene como nuevo requisito el almacenamiento de la imagen de cada animal. Dicha imagen debe seleccionarla el usuario desde su galer\xeda cuando vaya a crear el animal."}),(0,r.jsx)(a.p,{children:"Para guardar la foto de un animal elegido desde la galer\xeda, puedes almacenar la imagen de dos maneras en la base de datos:"}),(0,r.jsxs)(a.ol,{children:["\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:"Ruta del Archivo (URI)"})," \u2013 Guarda solo la ruta de la imagen. Recomendado por eficiencia pero tiene el inconveninente de que cuando seleccionas una imagen desde la galer\xeda (como Google Fotos), la URI que se obtiene es temporal y privada para la sesi\xf3n de la actividad."]}),"\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:"Imagen en Base64 o Blob"})," \u2013 Guarda la imagen directamente en la base de datos (no recomendado para im\xe1genes grandes)."]}),"\n"]}),(0,r.jsxs)(a.p,{children:["Lo m\xe1s adecuado ser\xeda ",(0,r.jsx)(a.strong,{children:"copiar la imagen"})," seleccionada desde la URI temporal al ",(0,r.jsx)(a.strong,{children:"almacenamiento interno o externo privado de tu aplicaci\xf3n"}),". No obstante, para seguir trabajando Room, la almacenaremos en la base de datos."]}),(0,r.jsxs)(a.h3,{id:"modificar-la-entidad-animal",children:["Modificar la Entidad (",(0,r.jsx)(a.code,{children:"Animal"}),")"]}),(0,r.jsxs)(a.p,{children:["Agregaremos un nuevo campo ",(0,r.jsx)(a.code,{children:"foto"})," para guardar la imagen. Un ",(0,r.jsx)(a.code,{children:"BLOB"})," de base de datos se corresponde con un array de bytes en Java."]}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-java",metastring:'title="Animal.java"',children:'import androidx.room.Entity;\nimport androidx.room.PrimaryKey;\n\n@Entity(tableName = "animal")\npublic class Animal {\n\n    @PrimaryKey(autoGenerate = true)\n    private int id;\n    private String nombre;\n    private String descripcion;\n    private byte[] foto;\n\n    // Constructor\n    public Animal(String nombre, String descripcion, byte[] foto) {\n        this.nombre = nombre;\n        this.descripcion = descripcion;\n        this.foto = foto;\n    }\n}\n'})}),(0,r.jsx)(a.h3,{id:"actualizar-la-base-de-datos",children:"Actualizar la Base de Datos"}),(0,r.jsxs)(a.p,{children:["Cuando ya has ejecutado la aplicaci\xf3n, la base de datos estar\xe1 creada y puede contener informaci\xf3n. En aplicaciones de producci\xf3n, se realizan ",(0,r.jsx)(a.strong,{children:"migraciones"})," de la base de datos, de forma que Room se encarga autom\xe1ticamente, y de forma transparente al usuario, de a\xf1adir esos nuevos campos a la base de datos."]}),(0,r.jsxs)(a.p,{children:["En nuestras aplicaciones sencillas, bastar\xeda con desinstalar la app del dispositivo y volver a intalarla para que se destruya la base de datos y vuelva a crearse, sin necesidad de implementar migraciones. No obstante, a continuaci\xf3n se explica ",(0,r.jsx)(a.strong,{children:"c\xf3mo realizar una migraci\xf3n"}),". Ten en cuenta que este proceso es m\xe1s complejo y problem\xe1tico en aplicaciones en producci\xf3n."]}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-java",metastring:'title="AnimalDatabase.java"',children:'// Actualizamos la versi\xf3n de la base de datos\n@Database(entities = {Animal.class}, version = 2)\npublic abstract class AnimalDatabase extends RoomDatabase {\n    public abstract AnimalDao animalDao();\n    private static volatile AnimalDatabase instance;\n\n    // Definimos una variable que contiene la modificaci\xf3n que hay que hacer en la base de datos\n    // En este caso, a\xf1adir el campo foto de tipo BLOB\n    static final Migration MIGRATION_1_2 = new Migration(1, 2) {\n        @Override\n        public void migrate(SupportSQLiteDatabase database) {\n            database.execSQL("ALTER TABLE animal ADD COLUMN foto BLOB");\n        }\n    };\n\n    public static AnimalDatabase getInstance(final Context context) {\n        if (instance == null) {\n            synchronized (AnimalDatabase.class) {\n                if (instance == null) {\n                    instance = Room.databaseBuilder(\n                                    context.getApplicationContext(),\n                                    AnimalDatabase.class,\n                                    "animal_database"\n                            )\n                            .addMigrations(MIGRATION_1_2) // A\xf1adimos la constante creada como nueva migraci\xf3n\n                            .build();\n                }\n            }\n        }\n        return instance;\n    }\n}\n'})}),(0,r.jsx)(a.h3,{id:"actualizar-el-layout-para-elegir-foto-de-la-galer\xeda",children:"Actualizar el layout para elegir foto de la galer\xeda"}),(0,r.jsxs)(a.p,{children:["A\xf1ade un bot\xf3n y/o ",(0,r.jsx)(a.code,{children:"ImageView"})," para seleccionar la imagen."]}),(0,r.jsx)(a.p,{children:(0,r.jsx)(a.strong,{children:"Layout (fragment_anadir_animal.xml):"})}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-xml",metastring:'title="fragment_anadir_animal.xml"',children:'<Button\n    android:id="@+id/btnSeleccionarFoto"\n    android:layout_width="wrap_content"\n    android:layout_height="wrap_content"\n    android:text="Seleccionar Foto" />\n\n<ImageView\n    android:id="@+id/imagenAnimal"\n    android:layout_width="200dp"\n    android:layout_height="200dp"\n    android:layout_gravity="center"\n    android:scaleType="centerCrop"\n    android:src="@drawable/ic_add_photo" />\n'})}),(0,r.jsx)(a.h3,{id:"implementar-la-l\xf3gica-en-el-fragment",children:"Implementar la l\xf3gica en el Fragment"}),(0,r.jsxs)(a.p,{children:["Pondremos un Listener sobre el bot\xf3n que iniciar\xe1 un ",(0,r.jsx)(a.strong,{children:"Intent para abrir la galer\xeda"}),". Recuerda que los Intents pueden ser:"]}),(0,r.jsxs)(a.ul,{children:["\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:"Impl\xedcito"}),": no especifica el componente exacto (actividad) que debe manejar la solicitud. En su lugar, describe una acci\xf3n general (como abrir la galer\xeda o compartir contenido) y el sistema busca una actividad que pueda realizar esa acci\xf3n."]}),"\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:"Expl\xedcito"}),": especifica una actividad o componente exacto que debe manejar el intent."]}),"\n"]}),(0,r.jsxs)(a.p,{children:["En primer lugar, debemos definir un ",(0,r.jsx)(a.strong,{children:(0,r.jsx)(a.code,{children:"ActivityResultLauncher"})}),', en el que especificaremos qu\xe9 debe hacer el fragmento cuando se haya cerrado la galer\xeda (o cualquier otra aplicaci\xf3n que se haya abierto mediante el Intent). Posteriormente, escucharemos el evento de click sobre el bot\xf3n "Seleccionar Foto"; cuando se produzca, lanzaremos el Intent para abrir la galer\xeda a trav\xe9s del ',(0,r.jsx)(a.code,{children:"ActivityResultLauncher"})," creado anteriormente."]}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-java",metastring:'title="AnadirAnimalFragment.java"',children:"public class AnadirAnimalFragment extends Fragment {\n\n    // Lanzador que gestiona actividades externas\n    private ActivityResultLauncher<Intent> imagePickerLauncher;\n    // Atributo que almacena la uri de la imagen\n    private byte[] fotoBlob;\n\n    ...\n\n    @Override\n    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {\n        super.onViewCreated(view, savedInstanceState);\n\n        animalViewModel = new ViewModelProvider(requireActivity()).get(AnimalViewModel.class);\n        binding.btnGuardar.setOnClickListener(v -> anadirAnimal());\n\n        // Indicamos al lanzador qu\xe9 debe hacer cuando se haya seleccionado la imagen y hayamos vuelto al fragment\n        imagePickerLauncher = registerForActivityResult(\n                new ActivityResultContracts.StartActivityForResult(),\n                new ActivityResultCallback<ActivityResult>() {\n                    @Override\n                    public void onActivityResult(ActivityResult result) { //  Se ejecuta autom\xe1ticamente cuando el usuario selecciona una imagen o cancela.\n                        // Si se ha seleccionado una imagen, la recuperamos del par\xe1metro del m\xe9todo\n                        if (result.getResultCode() == RESULT_OK && result.getData() != null) {\n                            Uri imageUri = result.getData().getData();  // URI de la imagen seleccionada\n                            fotoBlob = ImageUtils.uriToBlob(requireContext().getContentResolver(), imageUri); // Conseguimos el BLOB a partir de la URI\n\n                            binding.imagenAnimal.setImageBitmap(ImageUtils.blobToBitmap(fotoBlob));  // Muestra la imagen en el ImageView\n                            binding.imagenAnimal.setVisibility(View.VISIBLE);\n                        }\n                    }\n                }\n        );\n\n        binding.btnSeleccionarFoto.setOnClickListener(new View.OnClickListener() {\n            @Override\n            public void onClick(View view) {\n                // Creamos el Intent para abrir la galer\xeda (ver documentaci\xf3n en Android Developers)\n                Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);\n                // Lanzamos la galer\xeda usando el Launcher\n                imagePickerLauncher.launch(intent);\n            }\n        });\n    }\n\n    private void anadirAnimal() {\n        ...\n        // A\xf1adimos el atributo fotoBlob\n        Animal nuevoAnimal = new Animal(nombre, descripcion, fotoBlob);\n        ...\n    }\n}\n"})}),(0,r.jsxs)(a.p,{children:["Como puedes observar, necesitamos implementar una clase ",(0,r.jsx)(a.code,{children:"ImageUtils"})," para tratar la imagen. La galer\xeda nos devuelve la URI de la imagen, que transformamos a array de bytes mediante el m\xe9todo ",(0,r.jsx)(a.code,{children:"uriToBlob"}),". Por otro lado, el ",(0,r.jsx)(a.code,{children:"ImageView"})," no admite directamente un ",(0,r.jsx)(a.code,{children:"byte[]"}),"y debemos transformarlo a Bitmap mediante el m\xe9todo ",(0,r.jsx)(a.code,{children:"blobToBitmap"}),"."]}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-java",metastring:'title="ImageUtils.java"',children:"import android.content.ContentResolver;\nimport android.graphics.Bitmap;\nimport android.graphics.BitmapFactory;\nimport android.net.Uri;\n\nimport java.io.ByteArrayOutputStream;\nimport java.io.InputStream;\n\npublic class ImageUtils {\n\n    // Convierte la URI de la imagen a un array de bytes (BLOB)\n    public static byte[] uriToBlob(ContentResolver resolver, Uri uri) {\n        try {\n            InputStream inputStream = resolver.openInputStream(uri);\n            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);\n            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();\n\n            // Comprimir la imagen (JPEG, 80% de calidad)\n            bitmap.compress(Bitmap.CompressFormat.JPEG, 80, outputStream);\n\n            return outputStream.toByteArray();\n        } catch (Exception e) {\n            e.printStackTrace();\n            return null;\n        }\n    }\n\n    // Convierte un array de bytes (BLOB) a Bitmap\n    public static Bitmap blobToBitmap(byte[] blob) {\n        return BitmapFactory.decodeByteArray(blob, 0, blob.length);\n    }\n}\n"})}),(0,r.jsx)(a.h3,{id:"mostrar-la-imagen-en-el-fragmento-de-detalle",children:"Mostrar la imagen en el Fragmento de detalle"}),(0,r.jsx)(a.p,{children:"Para comprobar que funciona correctamente, puedes implementar la pantalla de detalle, mostrando la imagen."}),(0,r.jsx)(a.p,{children:(0,r.jsx)(a.img,{alt:"UT4. Insertar animal con imagen",src:n(7023).A+"",width:"406",height:"856"})}),(0,r.jsx)(a.h3,{id:"consideraciones",children:"Consideraciones"}),(0,r.jsxs)(a.ul,{children:["\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:"Permisos de Almacenamiento (Android 10 o inferior):"}),(0,r.jsx)(a.br,{}),"\n","Si necesitas acceder a la galer\xeda en Android 10 o inferior, a\xf1ade este permiso al ",(0,r.jsx)(a.code,{children:"AndroidManifest.xml"}),":"]}),"\n"]}),(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-xml",children:'<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />\n'})}),(0,r.jsxs)(a.ul,{children:["\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:"Android 11+ (Scoped Storage):"}),(0,r.jsx)(a.br,{}),"\n","A partir de Android 11, no es necesario el permiso para acceder a im\xe1genes de la galer\xeda."]}),"\n"]})]}),"\n",(0,r.jsx)(a.h2,{id:"eliminar-animal",children:"Eliminar animal"}),"\n",(0,r.jsx)(a.p,{children:"Como \xfaltimo requisito, queremos eliminar un animal cuando se deslice hacia derecha o izquierda. \xbfC\xf3mo podr\xedamos hacerlo? \xbfD\xf3nde habr\xeda que poner las instrucciones para eliminarlo de la base de datos?"}),"\n",(0,r.jsx)(a.p,{children:(0,r.jsx)(a.img,{alt:"UT4. Eliminar animal al deslizar",src:n(4068).A+"",width:"406",height:"856"})})]})}function m(e={}){const{wrapper:a}={...(0,t.R)(),...e.components};return a?(0,r.jsx)(a,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},3614:(e,a,n)=>{n.d(a,{A:()=>i});const i=n.p+"assets/images/2-grafo-nav-add-animal-dae216e09eccd2ce585203060a87f4f6.png"},7023:(e,a,n)=>{n.d(a,{A:()=>i});const i=n.p+"assets/images/3-video-insert-f320bce6b11db4d1a2a23346c08ef347.gif"},4068:(e,a,n)=>{n.d(a,{A:()=>i});const i=n.p+"assets/images/4-video-eliminar-fc183138a6a2eb4450853a8ced1d4ca5.gif"},8453:(e,a,n)=>{n.d(a,{R:()=>l,x:()=>o});var i=n(6540);const r={},t=i.createContext(r);function l(e){const a=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),i.createElement(t.Provider,{value:a},e.children)}}}]);