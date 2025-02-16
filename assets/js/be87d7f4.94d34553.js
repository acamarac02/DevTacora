"use strict";(self.webpackChunkpmdm=self.webpackChunkpmdm||[]).push([[4226],{1941:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>s});const a=JSON.parse('{"id":"pmdm/ut5_persistencia/firebase/firestore/demo-tablon-anuncios","title":"Lectura en Tiempo Real de un Tabl\xf3n de Anuncios","description":"En este ejemplo, implementaremos un Tabl\xf3n de Anuncios. Partiremos de la aplicaci\xf3n anterior en la que contamos con LoginActivity que se encarga de gestionar el registro del usuario. En MainActivity cargaremos TablonFragment, que permite insertar anuncios y consultar los \xfaltimos publicados. Adem\xe1s, el usuario propietario de un anuncio podr\xe1 eliminarlo si deliza el elemento a derecha o izquierda.","source":"@site/docs/pmdm/ut5_persistencia/4-firebase/2-firestore/5-demo-tablon-anuncios.md","sourceDirName":"pmdm/ut5_persistencia/4-firebase/2-firestore","slug":"/pmdm/ut5_persistencia/firebase/firestore/demo-tablon-anuncios","permalink":"/DevTacora/docs/pmdm/ut5_persistencia/firebase/firestore/demo-tablon-anuncios","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"sidebar_label":"Demo Tabl\xf3n de Anuncios","title":"Lectura en Tiempo Real de un Tabl\xf3n de Anuncios"},"sidebar":"pmdmSidebar","previous":{"title":"Gesti\xf3n de Subcolecciones","permalink":"/DevTacora/docs/pmdm/ut5_persistencia/firebase/firestore/gestion-subcolecciones"}}');var o=i(4848),t=i(8453);const r={sidebar_position:5,sidebar_label:"Demo Tabl\xf3n de Anuncios",title:"Lectura en Tiempo Real de un Tabl\xf3n de Anuncios"},d=void 0,c={},s=[{value:"1. Configurar las dependencias del proyecto",id:"1-configurar-las-dependencias-del-proyecto",level:2},{value:"2. Implementar <code>LoginActivity</code>",id:"2-implementar-loginactivity",level:2},{value:"3. Implementar <code>MainActivity</code>",id:"3-implementar-mainactivity",level:2},{value:"3.1. Layout",id:"31-layout",level:3},{value:"3.2. C\xf3digo",id:"32-c\xf3digo",level:3},{value:"4. Implementar el modelo de datos",id:"4-implementar-el-modelo-de-datos",level:2},{value:"5. Implementar el acceso a datos",id:"5-implementar-el-acceso-a-datos",level:2},{value:"5.1. C\xf3digo de AnunciosRepository",id:"51-c\xf3digo-de-anunciosrepository",level:3},{value:"5.2. C\xf3digo de AnunciosViewModel",id:"52-c\xf3digo-de-anunciosviewmodel",level:3},{value:"6. Implementar <code>TablonFragment</code>",id:"6-implementar-tablonfragment",level:2},{value:"6.1. Layout",id:"61-layout",level:3},{value:"6.2. Layout de los ViewHolder",id:"62-layout-de-los-viewholder",level:3},{value:"6.3. C\xf3digo de <code>AnuncioAdapter</code>",id:"63-c\xf3digo-de-anuncioadapter",level:3},{value:"6.4. C\xf3digo de <code>TablonFragment</code>",id:"64-c\xf3digo-de-tablonfragment",level:3}];function l(e){const n={admonition:"admonition",code:"code",h2:"h2",h3:"h3",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,o.jsxs)("div",{class:"justify-text",children:[(0,o.jsxs)(n.p,{children:["En este ejemplo, implementaremos un ",(0,o.jsx)(n.strong,{children:"Tabl\xf3n de Anuncios"}),". Partiremos de la aplicaci\xf3n anterior en la que contamos con ",(0,o.jsx)(n.code,{children:"LoginActivity"})," que se encarga de gestionar el registro del usuario. En ",(0,o.jsx)(n.code,{children:"MainActivity"})," cargaremos ",(0,o.jsx)(n.code,{children:"TablonFragment"}),", que permite insertar anuncios y consultar los \xfaltimos publicados. Adem\xe1s, el usuario propietario de un anuncio podr\xe1 eliminarlo si deliza el elemento a derecha o izquierda."]}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"UT5. GIF resumen de la aplicaci\xf3n",src:i(7170).A+"",width:"420",height:"898"})}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"Estructura del proyecto:"})}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"LoginActivity"})})," \u2192 Maneja el inicio de sesi\xf3n con Firebase Authentication."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"MainActivity"})})," \u2192 Contiene el ",(0,o.jsx)(n.code,{children:"TablonFragment"}),", donde se muestran los anuncios."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"TablonFragment"})})," \u2192 Muestra los anuncios en un ",(0,o.jsx)(n.code,{children:"RecyclerView"})," y permite agregar nuevos anuncios."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"AnuncioViewModel"})})," \u2192 Gestiona los datos entre la UI y Firestore."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"AnuncioRepository"})})," \u2192 Se encarga de la conexi\xf3n con Firestore."]}),"\n"]}),(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Diagrama de secuencia"})," que ilustra el flujo de llamadas entre las clases para recuperar y mostrar los anuncios en la aplicaci\xf3n:"]}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"alt text",src:i(8048).A+"",width:"3833",height:"1582"})}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h2,{id:"1-configurar-las-dependencias-del-proyecto",children:"1. Configurar las dependencias del proyecto"}),(0,o.jsxs)(n.p,{children:["Revisa el apartado ",(0,o.jsx)(n.code,{children:"Configuraci\xf3n de Firestore"})," y a\xf1ade las dependencias necesarias para utilizar Firebase Authentication y Firestore."]}),(0,o.jsxs)(n.h2,{id:"2-implementar-loginactivity",children:["2. Implementar ",(0,o.jsx)(n.code,{children:"LoginActivity"})]}),(0,o.jsxs)(n.p,{children:["El usuario debe autenticarse antes de acceder al tabl\xf3n de anuncios. Implementa el ejemplo pr\xe1ctico que estudiamos en la secci\xf3n ",(0,o.jsx)(n.code,{children:"Firebase Authentication"}),"."]}),(0,o.jsxs)(n.h2,{id:"3-implementar-mainactivity",children:["3. Implementar ",(0,o.jsx)(n.code,{children:"MainActivity"})]}),(0,o.jsxs)(n.p,{children:["Esta ",(0,o.jsx)(n.code,{children:"Activity"})," contiene el ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"FragmentContainerView"})})," donde se cargar\xe1 ",(0,o.jsx)(n.code,{children:"TablonFragment"})," y se mostrar\xe1n los anuncios."]}),(0,o.jsx)(n.h3,{id:"31-layout",children:"3.1. Layout"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-xml",metastring:'title="activity_main.xml"',children:'<?xml version="1.0" encoding="utf-8"?>\n<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:app="http://schemas.android.com/apk/res-auto"\n    xmlns:tools="http://schemas.android.com/tools"\n    android:id="@+id/main"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    tools:context=".MainActivity">\n\n\n    <androidx.fragment.app.FragmentContainerView\n        android:id="@+id/fragmentContainerView"\n        app:navGraph="@navigation/navigation_graph"\n        app:defaultNavHost="true"\n        android:name="androidx.navigation.fragment.NavHostFragment"\n        android:layout_width="0dp"\n        android:layout_height="0dp"\n        app:layout_constraintBottom_toBottomOf="parent"\n        app:layout_constraintEnd_toEndOf="parent"\n        app:layout_constraintStart_toStartOf="parent"\n        app:layout_constraintTop_toTopOf="parent" />\n</androidx.constraintlayout.widget.ConstraintLayout>\n'})}),(0,o.jsx)(n.admonition,{title:"RECUERDA...",type:"info",children:(0,o.jsxs)(n.p,{children:["Recuerda crear el grafo de navegaci\xf3n y a\xf1adir ",(0,o.jsx)(n.code,{children:"TablonFragment"})," en \xe9l."]})}),(0,o.jsx)(n.h3,{id:"32-c\xf3digo",children:"3.2. C\xf3digo"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",metastring:'title="MainActivity.java"',children:"public class MainActivity extends AppCompatActivity {\n\n    private ActivityMainBinding binding;\n\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        binding = ActivityMainBinding.inflate(getLayoutInflater());\n        setContentView(binding.getRoot());\n    }\n\n}\n"})}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h2,{id:"4-implementar-el-modelo-de-datos",children:"4. Implementar el modelo de datos"}),(0,o.jsx)(n.p,{children:"Se trata de la clase Java que representa la informaci\xf3n que se almacena en cada documento de tu colecci\xf3n:"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",metastring:'title="model/Anuncio.java"',children:"public class Anuncio {\n    private String id;\n    private String contenido;\n    private long fecha;\n    private String emailAutor;\n\n    // Constructor vac\xedo requerido por Firestore\n    public Anuncio() {}\n\n    public Anuncio(String contenido, long fecha, String emailAutor) {\n        this.contenido = contenido;\n        this.fecha = fecha;\n        this.emailAutor = emailAutor;\n    }\n\n    // Getters y setters\n}\n"})}),(0,o.jsx)(n.admonition,{title:"CUIDADO",type:"warning",children:(0,o.jsxs)(n.p,{children:["Al igual que sucede con MongoDB, nuestro modelo debe tener el ",(0,o.jsx)(n.strong,{children:"contructor por defecto y getters y setters de todos los atributos"}),". A parte, podr\xe1s a\xf1adir todos los constructores parametrizados que necesites."]})}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h2,{id:"5-implementar-el-acceso-a-datos",children:"5. Implementar el acceso a datos"}),(0,o.jsx)(n.h3,{id:"51-c\xf3digo-de-anunciosrepository",children:"5.1. C\xf3digo de AnunciosRepository"}),(0,o.jsxs)(n.p,{children:["Recuerda que el ",(0,o.jsx)(n.strong,{children:"Repository"})," en el patr\xf3n MVVM (Model-View-ViewModel) act\xfaa como ",(0,o.jsx)(n.strong,{children:"intermediario entre el ViewModel y las fuentes de datos"})," (Firestore, API, Room, etc.). Por este motivo, AnunciosRepository contiene una instancia de ",(0,o.jsx)(n.code,{children:"FirebaseFirestore"}),", a partir de la que se implementan los m\xe9todos para obtener todos los anuncios, insertar uno nuevo y eliminar uno existente. Adem\xe1s, contiene una instancia de ",(0,o.jsx)(n.code,{children:"FirebaseAuth"})," para devolver la informaci\xf3n del usuario conectado cuando sea necesario."]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",metastring:'title="repository/AnunciosRepository.java"',children:'public class AnunciosRepository {\n    // Instancia de Firestore para acceder a la base de datos de anuncios\n    private FirebaseFirestore db;\n    // Instancia de Authentication para consultar el usuario conectado\n    private FirebaseAuth mAuth;\n    // Referencia a la colecci\xf3n de anuncios\n    private CollectionReference coleccionAnuncios;\n\n\n    public AnunciosRepository() {\n        // Inicializaci\xf3n de los atributos de clase\n        db = FirebaseFirestore.getInstance();\n        mAuth = FirebaseAuth.getInstance();\n        coleccionAnuncios = db.collection("anuncios");\n    }\n\n    // Devuelve el email del usuario conectado\n    // \xdatil para saber si el usuario conectado es el propietario de un anuncio\n    public String getConnectedUserEmail() {\n        if (mAuth.getCurrentUser() != null) {\n            return mAuth.getCurrentUser().getEmail();\n        }\n        return null;\n    }\n\n    public LiveData<List<Anuncio>> obtenerAnuncios() {\n        // LiveData que devolveremos con la lista de anuncio\n        MutableLiveData<List<Anuncio>> anunciosLiveData = new MutableLiveData<>();\n\n        // Consulta en tiempo real, ordenada por fecha\n        // Esta query devuelve todos los anuncios\n        coleccionAnuncios.orderBy("fecha", Query.Direction.DESCENDING)\n                .addSnapshotListener((querySnapshot, e) -> {\n            if (e != null) {\n                Log.e("Firestore", "Error al obtener anuncios", e);\n                return;\n            }\n\n            if (querySnapshot != null) {\n                List<Anuncio> lista = new ArrayList<>();\n                // Recorremos todos los documentos y los a\xf1adimos a la lista\n                for (DocumentSnapshot doc : querySnapshot) {\n                    Anuncio anuncio = doc.toObject(Anuncio.class);\n                    if (anuncio != null) {\n                        lista.add(anuncio);\n                    }\n                }\n                // Actualiza el LiveData con los datos devueltos por la consulta\n                anunciosLiveData.setValue(lista);\n            }\n        });\n\n        // Devuelve el LiveData que la UI observar\xe1\n        return anunciosLiveData;\n    }\n\n    public void agregarAnuncio(Anuncio anuncio) {\n        // Generar un nuevo ID para el documento en Firestore\n        String idGenerado = coleccionAnuncios.document().getId();\n\n        // Asignar el ID generado al anuncio antes de guardarlo\n        anuncio.setId(idGenerado);\n\n        // Insertar el anuncio con el ID generado\n        coleccionAnuncios.document(idGenerado)\n                .set(anuncio)\n                .addOnSuccessListener(aVoid -> Log.d("Firestore", "Anuncio agregado con ID: " + idGenerado))\n                .addOnFailureListener(e -> Log.e("Firestore", "Error al agregar anuncio", e));\n    }\n\n    public void eliminarAnuncio(Anuncio anuncio) {\n        // Elimina el anuncio cuyo id coincide con el anuncio que se recibe por par\xe1metro\n        coleccionAnuncios.document(anuncio.getId())\n                .delete()\n                .addOnSuccessListener(aVoid -> Log.d("Firestore", "Anuncio eliminado correctamente"))\n                .addOnFailureListener(e -> Log.e("Firestore", "Error al eliminar anuncio", e));\n    }\n}\n'})}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h3,{id:"52-c\xf3digo-de-anunciosviewmodel",children:"5.2. C\xf3digo de AnunciosViewModel"}),(0,o.jsxs)(n.p,{children:["El ViewModel contiene una instancia de ",(0,o.jsx)(n.code,{children:"AnunciosRepository"})," e invoca sus m\xe9todos, actuando as\xed de intermediario entre la vista y la fuente de datos."]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",metastring:'title="viewmodel/AnunciosViewModel.java"',children:"public class AnunciosViewModel extends AndroidViewModel {\n\n    private AnunciosRepository repository;\n\n    public AnunciosViewModel(@NonNull Application application) {\n        super(application);\n        repository = new AnunciosRepository();\n    }\n\n    public String getConnectedUserEmail() {\n        return repository.getConnectedUserEmail();\n    }\n\n    public LiveData<List<Anuncio>> obtenerAnuncios() {\n        return repository.obtenerAnuncios();\n    }\n\n    public void agregarAnuncio(String contenido) {\n        // Creamos la instancia del anuncio\n        Anuncio anuncio = new Anuncio(contenido, System.currentTimeMillis(), FirebaseAuth.getInstance().getCurrentUser().getEmail());\n        // Llamamos al m\xe9todo del repository\n        repository.agregarAnuncio(anuncio);\n    }\n\n    public void eliminarAnuncio(Anuncio anuncio) {\n        repository.eliminarAnuncio(anuncio);\n    }\n}\n"})}),(0,o.jsx)(n.hr,{}),(0,o.jsxs)(n.h2,{id:"6-implementar-tablonfragment",children:["6. Implementar ",(0,o.jsx)(n.code,{children:"TablonFragment"})]}),(0,o.jsx)(n.h3,{id:"61-layout",children:"6.1. Layout"}),(0,o.jsx)(n.p,{children:"En el layout vamos a contar con un EditText para escribir el contenido del anuncio, un bot\xf3n para guardarlo y el RecyclerView que muestre todos los anuncios."}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-xml",metastring:'title="fragment_tablon.xml"',children:'<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:app="http://schemas.android.com/apk/res-auto"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical"\n    android:padding="16dp">\n\n    <EditText\n        android:id="@+id/etAnuncio"\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n        android:hint="Escribe un anuncio..." />\n\n    <Button\n        android:id="@+id/btnPublicar"\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n        android:text="Publicar" />\n\n    <androidx.recyclerview.widget.RecyclerView\n        android:id="@+id/recyclerAnuncios"\n        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"\n        android:layout_width="match_parent"\n        android:layout_height="match_parent" />\n</LinearLayout>\n'})}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h3,{id:"62-layout-de-los-viewholder",children:"6.2. Layout de los ViewHolder"}),(0,o.jsx)(n.p,{children:"Este contendr\xe1 la informaci\xf3n que se muestra de cada Anuncio en el RecyclerView."}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-xml",metastring:'title="viewholder_anuncio.xml"',children:'<?xml version="1.0" encoding="utf-8"?>\n<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:app="http://schemas.android.com/apk/res-auto"\n    android:layout_width="match_parent"\n    android:layout_height="wrap_content"\n    android:layout_margin="8dp"\n    app:cardCornerRadius="8dp"\n    app:cardElevation="4dp">\n\n    <LinearLayout\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n        android:orientation="vertical"\n        android:padding="16dp">\n\n        \x3c!-- Contenido del anuncio --\x3e\n        <TextView\n            android:id="@+id/tvContenido"\n            android:layout_width="wrap_content"\n            android:layout_height="wrap_content"\n            android:text="Contenido"\n            android:textStyle="bold"\n            android:textSize="16sp"\n            android:textColor="@android:color/black" />\n\n        \x3c!-- Fecha del anuncio --\x3e\n        <TextView\n            android:id="@+id/tvFecha"\n            android:layout_width="wrap_content"\n            android:layout_height="wrap_content"\n            android:text="Fecha"\n            android:textSize="14sp"\n            android:textColor="@android:color/darker_gray"\n            android:layout_marginTop="4dp" />\n\n        \x3c!-- Nombre del usuario --\x3e\n        <TextView\n            android:id="@+id/tvUsuario"\n            android:layout_width="wrap_content"\n            android:layout_height="wrap_content"\n            android:text="Usuario"\n            android:textSize="14sp"\n            android:textColor="@android:color/darker_gray"\n            android:layout_marginTop="4dp"  />\n\n    </LinearLayout>\n</androidx.cardview.widget.CardView>\n'})}),(0,o.jsx)(n.hr,{}),(0,o.jsxs)(n.h3,{id:"63-c\xf3digo-de-anuncioadapter",children:["6.3. C\xf3digo de ",(0,o.jsx)(n.code,{children:"AnuncioAdapter"})]}),(0,o.jsx)(n.p,{children:"El c\xf3digo del Adaptador y ViewHolder puede quedar as\xed:"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",metastring:'title="recyclerview/AnuncioAdapter"',children:'public class AnuncioAdapter extends RecyclerView.Adapter<AnuncioAdapter.AnuncioViewHolder> {\n\n    // Lista de anuncios que se muestra en el RecyclerView\n    List<Anuncio> anunciosList;\n\n    @NonNull\n    @Override\n    public AnuncioViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {\n        LayoutInflater inflater = LayoutInflater.from(parent.getContext());\n        return new AnuncioViewHolder(ViewholderAnuncioBinding.inflate(inflater, parent, false));\n    }\n\n    @Override\n    public void onBindViewHolder(@NonNull AnuncioViewHolder holder, int position) {\n        Anuncio anuncio = anunciosList.get(position);\n        holder.binding.tvContenido.setText(anuncio.getContenido());\n        holder.binding.tvUsuario.setText("Usuario: " + anuncio.getEmailAutor());\n        holder.binding.tvFecha.setText("Fecha: " + formatearFecha(anuncio.getFecha()));\n    }\n\n    @Override\n    public int getItemCount() {\n        return anunciosList != null ? anunciosList.size() : 0;\n    }\n\n    public void setAnunciosList(List<Anuncio> anunciosList) {\n        this.anunciosList = anunciosList;\n        notifyDataSetChanged();\n    }\n\n    // Devuelve el anuncio que est\xe9 en la posici\xf3n pasada por par\xe1metro\n    // Lo utilizamos para saber qu\xe9 anuncio eliminar con el gesto de desplazar\n    public Anuncio obtenerAnuncio(int posicion) {\n        return this.anunciosList.get(posicion);\n    }\n\n    // Elimina el anuncio que est\xe9 en la posici\xf3n pasada por par\xe1metro\n    // Lo utilizamos para eliminar el anuncio de la lista\n    public void eliminarAnuncio(int posicion) {\n        this.anunciosList.remove(posicion);\n        notifyItemRemoved(posicion);\n    }\n\n    // Retorna el timestamp en una fecha con el formato legible\n    private String formatearFecha(long timestamp) {\n        Date date = new Date(timestamp);\n        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());\n        return sdf.format(date);\n    }\n\n    static class AnuncioViewHolder extends RecyclerView.ViewHolder {\n        private final ViewholderAnuncioBinding binding;\n\n        // Constructor: Asigna la vista inflada al ViewHolder\n        public AnuncioViewHolder(@NonNull ViewholderAnuncioBinding binding) {\n            super(binding.getRoot());\n            this.binding = binding;\n        }\n    }\n}\n'})}),(0,o.jsxs)(n.h3,{id:"64-c\xf3digo-de-tablonfragment",children:["6.4. C\xf3digo de ",(0,o.jsx)(n.code,{children:"TablonFragment"})]}),(0,o.jsx)(n.p,{children:"En la inicializaci\xf3n del Fragmento, invocaremos el m\xe9todo del ViewModel que devuelve todos los anuncios, estableciendo un observador para \xe9l. Cada vez que reciba un cambio, actualizaremos la lista del RecyclerView."}),(0,o.jsx)(n.p,{children:"Adem\xe1s, se a\xf1adir\xe1 la l\xf3gica necesaria para insertar un nuevo anuncio cuando se pulse el bot\xf3n y eliminar un anuncio al deslizarlo a derecha o izquierda. Se incluir\xe1 la comprobaci\xf3n necesaria para asegurar que solo el usuario propietario puede eliminar su anuncio."}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",children:'public class TablonFragment extends Fragment {\n\n    private FragmentTablonBinding binding;\n    private AnunciosViewModel anunciosViewModel;\n    private AnuncioAdapter adapter;\n\n    @Override\n    public View onCreateView(LayoutInflater inflater, ViewGroup container,\n                             Bundle savedInstanceState) {\n        // Inflate the layout for this fragment\n        return (binding = FragmentTablonBinding.inflate(inflater, container, false)).getRoot();\n    }\n\n    @Override\n    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {\n        super.onViewCreated(view, savedInstanceState);\n\n        adapter = new AnuncioAdapter();\n        binding.recyclerAnuncios.setAdapter(adapter);\n\n        anunciosViewModel = new ViewModelProvider(requireActivity()).get(AnunciosViewModel.class);\n\n        binding.btnPublicar.setOnClickListener(v -> publicarAnuncio());\n\n        // Recuperamos los anuncios\n        anunciosViewModel.obtenerAnuncios().observe(getViewLifecycleOwner(), new Observer<List<Anuncio>>() {\n            @Override\n            public void onChanged(List<Anuncio> anuncios) {\n                // Establecemos la lista en el adapter\n                adapter.setAnunciosList(anuncios);\n            }\n        });\n\n        // Gesto para eliminar anuncio\n        ItemTouchHelper itemTouchHelper = new ItemTouchHelper(new ItemTouchHelper.SimpleCallback(\n                ItemTouchHelper.UP | ItemTouchHelper.DOWN,\n                ItemTouchHelper.RIGHT | ItemTouchHelper.LEFT) {\n            @Override\n            public boolean onMove(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder, @NonNull RecyclerView.ViewHolder target) {\n                return false;\n            }\n\n            @Override\n            public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int direction) {\n                // Recuperamos el anuncio seleccionado\n                int posicion = viewHolder.getAdapterPosition();\n                Anuncio anuncio = adapter.obtenerAnuncio(posicion);\n\n                // Recuperamos el email del usuario conectado para evitar\n                // que los usuarios eliminen anuncios de los que no son propietarios\n                String emailUsuarioActual = anunciosViewModel.getConnectedUserEmail();\n                if (anuncio.getEmailAutor().equalsIgnoreCase(emailUsuarioActual)) {\n                    mostrarDialogoAvisoEliminado(anuncio, posicion);\n                } else {\n                    Toast.makeText(requireContext(), "No eres el propietario del anuncio", Toast.LENGTH_SHORT).show();\n                    // Restaurar el elemento si el usuario no es el propietario\n                    adapter.notifyItemChanged(posicion);\n                }\n            }\n        });\n        itemTouchHelper.attachToRecyclerView(binding.recyclerAnuncios);\n    }\n\n    private void mostrarDialogoAvisoEliminado(Anuncio anuncio, int posicion) {\n        new AlertDialog.Builder(requireContext())\n                .setTitle("Eliminar Anuncio")\n                .setMessage("\xbfEst\xe1s seguro de que deseas eliminar este anuncio?")\n                .setPositiveButton("Eliminar", (dialog, which) -> {\n                    // Eliminamos el anuncio de la BBDD\n                    anunciosViewModel.eliminarAnuncio(anuncio);\n                    // Eliminamos el anuncio directamente de la lista, as\xed evitamos repetir consulta a la BBDD\n                    adapter.eliminarAnuncio(posicion);\n                    Toast.makeText(requireContext(), "Anuncio eliminado", Toast.LENGTH_SHORT).show();\n                })\n                .setNegativeButton("Cancelar", (dialog, which) -> {\n                    // Restaurar el elemento si se cancela\n                    adapter.notifyItemChanged(posicion);\n                })\n                .setCancelable(false)\n                .show();\n    }\n\n\n    private void publicarAnuncio() {\n        String contenido = binding.etAnuncio.getText().toString();\n        if (!contenido.isEmpty()) {\n            // Llamamos al m\xe9todo del ViewModel para insertar el anuncio\n            anunciosViewModel.agregarAnuncio(contenido);\n            // Reseteamos el valor del EditText\n            binding.etAnuncio.setText("");\n        }\n    }\n}\n'})})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},7170:(e,n,i)=>{i.d(n,{A:()=>a});const a=i.p+"assets/images/demo-anuncios-6754803240f58bad298cc2f001009905.gif"},8048:(e,n,i)=>{i.d(n,{A:()=>a});const a=i.p+"assets/images/diagrama-secuencia-firestore-0d3c4e02dd2efdce1db2f9def09f1ffa.png"},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>d});var a=i(6540);const o={},t=a.createContext(o);function r(e){const n=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),a.createElement(t.Provider,{value:n},e.children)}}}]);