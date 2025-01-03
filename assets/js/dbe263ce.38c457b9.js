"use strict";(self.webpackChunkpmdm=self.webpackChunkpmdm||[]).push([[4957],{2711:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>t,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"pmdm/ut4_persistencia/room/lista-elementos","title":"Mostrar elementos almacenados","description":"En esta primera versi\xf3n del proyecto, vamos a implementar el RecyclerView para mostrar la lista de animales. Para ello, necesitaremos un m\xe9todo que devuelva todos los animales de la base de datos y otro que inserte un animal. De momento, de cada Animal conocemos el nombre y una breve descripci\xf3n. El resultado final de esta primera versi\xf3n ser\xe1 similar a:","source":"@site/docs/pmdm/ut4_persistencia/room/1-lista-elementos.md","sourceDirName":"pmdm/ut4_persistencia/room","slug":"/pmdm/ut4_persistencia/room/lista-elementos","permalink":"/DevTacora/docs/pmdm/ut4_persistencia/room/lista-elementos","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"sidebar_label":"Mostrar elementos almacenados","title":"Mostrar elementos almacenados"},"sidebar":"pmdmSidebar","previous":{"title":"Room","permalink":"/DevTacora/docs/pmdm/ut4_persistencia/room/"},"next":{"title":"Insertar y eliminar elementos","permalink":"/DevTacora/docs/pmdm/ut4_persistencia/room/insertar-elementos"}}');var s=n(4848),o=n(8453);const r={sidebar_position:1,sidebar_label:"Mostrar elementos almacenados",title:"Mostrar elementos almacenados"},l="Mostrar elementos almacenados",t={},d=[{value:"Configuraci\xf3n inicial del proyecto",id:"configuraci\xf3n-inicial-del-proyecto",level:2},{value:"Implementaci\xf3n de los componentes de Room",id:"implementaci\xf3n-de-los-componentes-de-room",level:2},{value:"Componente Entity (Tabla Animal)",id:"componente-entity-tabla-animal",level:3},{value:"Componente DAO (Data Access Object)",id:"componente-dao-data-access-object",level:3},{value:"Componente Database",id:"componente-database",level:3},{value:"Implementaci\xf3n del Repository",id:"implementaci\xf3n-del-repository",level:2},{value:"Implementaci\xf3n del ViewModel",id:"implementaci\xf3n-del-viewmodel",level:2},{value:"Implementaci\xf3n de la View",id:"implementaci\xf3n-de-la-view",level:2}];function c(e){const a={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)("div",{class:"justify-text",children:[(0,s.jsx)(a.header,{children:(0,s.jsx)(a.h1,{id:"mostrar-elementos-almacenados",children:"Mostrar elementos almacenados"})}),(0,s.jsx)(a.p,{children:"En esta primera versi\xf3n del proyecto, vamos a implementar el RecyclerView para mostrar la lista de animales. Para ello, necesitaremos un m\xe9todo que devuelva todos los animales de la base de datos y otro que inserte un animal. De momento, de cada Animal conocemos el nombre y una breve descripci\xf3n. El resultado final de esta primera versi\xf3n ser\xe1 similar a:"}),(0,s.jsx)(a.p,{children:(0,s.jsx)(a.img,{alt:"UT4. Primera versi\xf3n app",src:n(1288).A+"",width:"406",height:"859"})}),(0,s.jsx)(a.h2,{id:"configuraci\xf3n-inicial-del-proyecto",children:"Configuraci\xf3n inicial del proyecto"}),(0,s.jsx)(a.p,{children:"Crea un nuevo proyecto y a\xf1ade las dependencias de Room. Recuerda que tambi\xe9n puedes dejar que el propio Android Studio las importe cuando vayas a implementar la conexi\xf3n a base de datos."}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-groovy",metastring:'title="build.gradle (Module: app)"',children:'implementation("androidx.room:room-runtime:2.5.0")\nannotationProcessor("androidx.room:room-compiler:2.5.0")\n'})}),(0,s.jsx)(a.admonition,{type:"info",children:(0,s.jsx)(a.p,{children:"Deber\xe1s a\xf1adir m\xe1s dependencias sobre la marcha, como las del componente Navigation, ViewModel, RecyclerView, etc."})}),(0,s.jsx)(a.hr,{}),(0,s.jsx)(a.h2,{id:"implementaci\xf3n-de-los-componentes-de-room",children:"Implementaci\xf3n de los componentes de Room"}),(0,s.jsx)(a.p,{children:"Room se basa en tres componentes principales que trabajan juntos para gestionar bases de datos SQLite de manera sencilla y eficiente en Android:"}),(0,s.jsxs)(a.ol,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsxs)(a.strong,{children:["Entidad (",(0,s.jsx)(a.code,{children:"@Entity"}),")"]}),": Representa una tabla en la base de datos. Cada clase marcada con ",(0,s.jsx)(a.code,{children:"@Entity"})," se convierte en una tabla con columnas que corresponden a los campos de la clase."]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsxs)(a.strong,{children:["DAO (Data Access Object) ",(0,s.jsx)(a.code,{children:"@Dao"})]}),": Es la interfaz que define los m\xe9todos para acceder a los datos. A trav\xe9s de ",(0,s.jsx)(a.code,{children:"@Insert"}),", ",(0,s.jsx)(a.code,{children:"@Query"}),", ",(0,s.jsx)(a.code,{children:"@Delete"}),", etc., Room genera autom\xe1ticamente las consultas necesarias."]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsxs)(a.strong,{children:["Base de Datos (",(0,s.jsx)(a.code,{children:"@Database"}),")"]}),": Define la base de datos, gestionando la creaci\xf3n y actualizaci\xf3n de la misma. Sirve como el punto de acceso principal a la base de datos subyacente."]}),"\n"]}),"\n"]}),(0,s.jsx)(a.h3,{id:"componente-entity-tabla-animal",children:"Componente Entity (Tabla Animal)"}),(0,s.jsxs)(a.p,{children:["Una ",(0,s.jsx)(a.strong,{children:"Entity"})," es una clase anotada con ",(0,s.jsx)(a.code,{children:"@Entity"})," que describe la estructura de una tabla en SQLite, teniendo en cuenta las siguientes caracter\xedsticas:"]}),(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Nombre de la tabla"}),": Se puede definir expl\xedcitamente usando ",(0,s.jsx)(a.code,{children:"tableName"}),"; si no se define este atributo, tomar\xe1 como nombre el nombre de la clase."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Campos (columnas)"}),": Cada campo de la clase ser\xe1 una columna en la tabla."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Clave primaria"}),": Se define con ",(0,s.jsx)(a.code,{children:"@PrimaryKey"}),". Si se especifica ",(0,s.jsx)(a.code,{children:"autoGenerate = true"}),", el valor se generar\xe1 autom\xe1ticamente (autoincremental)."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Restricciones"}),": Se pueden agregar valores \xfanicos, claves for\xe1neas, \xedndices, etc."]}),"\n"]}),(0,s.jsxs)(a.p,{children:["Crea un nuevo paquete llamado ",(0,s.jsx)(a.strong,{children:'"data"'})," y a\xf1ade la siguiente clase:"]}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-java",metastring:'title="Animal.java"',children:'import androidx.room.Entity;\nimport androidx.room.PrimaryKey;\n\n@Entity(tableName = "animal") // tableName es opcional\npublic class Animal {\n\n    @PrimaryKey(autoGenerate = true)\n    private int id;\n    private String nombre;\n    private String descripcion;\n\n    // Constructor\n    public Animal(String nombre, String descripcion) {\n        this.nombre = nombre;\n        this.descripcion = descripcion;\n    }\n}\n'})}),(0,s.jsx)(a.p,{children:'Room se encarga autom\xe1ticamente de crear una clase en la base de datos con el nombre "animal" y las columnas especificadas.'}),(0,s.jsx)(a.h3,{id:"componente-dao-data-access-object",children:"Componente DAO (Data Access Object)"}),(0,s.jsxs)(a.p,{children:["El ",(0,s.jsx)(a.strong,{children:"DAO (Data Access Object)"})," es una ",(0,s.jsx)(a.strong,{children:"interfaz"})," (o clase abstracta) que define los m\xe9todos para interactuar con la base de datos. Room genera autom\xe1ticamente el c\xf3digo necesario para ejecutar las consultas SQL basadas en las ",(0,s.jsx)(a.strong,{children:"anotaciones"})," que apliques. La principal ventaja que ofrece el DAO es la ",(0,s.jsx)(a.strong,{children:"seguridad de consultas"}),", ya que Room verifica las consultas SQL en ",(0,s.jsx)(a.strong,{children:"tiempo de compilaci\xf3n"})," para evitar errores en tiempo de ejecuci\xf3n."]}),(0,s.jsx)(a.p,{children:"Las anotaciones m\xe1s comunes en el DAO son:"}),(0,s.jsxs)(a.table,{children:[(0,s.jsx)(a.thead,{children:(0,s.jsxs)(a.tr,{children:[(0,s.jsx)(a.th,{children:"Anotaci\xf3n"}),(0,s.jsx)(a.th,{children:"Descripci\xf3n"})]})}),(0,s.jsxs)(a.tbody,{children:[(0,s.jsxs)(a.tr,{children:[(0,s.jsx)(a.td,{children:(0,s.jsx)(a.strong,{children:"@Insert"})}),(0,s.jsx)(a.td,{children:"Inserta uno o varios registros."})]}),(0,s.jsxs)(a.tr,{children:[(0,s.jsx)(a.td,{children:(0,s.jsx)(a.strong,{children:"@Update"})}),(0,s.jsx)(a.td,{children:"Actualiza registros existentes."})]}),(0,s.jsxs)(a.tr,{children:[(0,s.jsx)(a.td,{children:(0,s.jsx)(a.strong,{children:"@Delete"})}),(0,s.jsx)(a.td,{children:"Elimina registros."})]}),(0,s.jsxs)(a.tr,{children:[(0,s.jsx)(a.td,{children:(0,s.jsx)(a.strong,{children:"@Query"})}),(0,s.jsxs)(a.td,{children:["Ejecuta cualquier consulta SQL (",(0,s.jsx)(a.code,{children:"SELECT"}),", ",(0,s.jsx)(a.code,{children:"DELETE"}),", etc.). Generalmente se utiliza para los ",(0,s.jsx)(a.code,{children:"SELECT"}),"."]})]}),(0,s.jsxs)(a.tr,{children:[(0,s.jsx)(a.td,{children:(0,s.jsx)(a.strong,{children:"@Transaction"})}),(0,s.jsx)(a.td,{children:"Asegura que m\xfaltiples operaciones se ejecuten como una sola transacci\xf3n."})]})]})]}),(0,s.jsxs)(a.p,{children:["Crea una nueva interfaz dentro del paquete ",(0,s.jsx)(a.code,{children:"data"}),":"]}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-java",metastring:'title="AnimalDao.java"',children:'import androidx.lifecycle.LiveData;\nimport androidx.room.Dao;\nimport androidx.room.Delete;\nimport androidx.room.Insert;\nimport androidx.room.Query;\nimport androidx.room.Update;\n\nimport java.util.List;\n\n@Dao\npublic interface AnimalDao {\n\n    @Insert\n    void insertar(Animal animal);\n\n    @Update\n    void actualizar(Animal animal);\n\n    @Delete\n    void eliminar(Animal animal);\n\n    @Query("SELECT * FROM animal ORDER BY nombre ASC")\n    LiveData<List<Animal>> obtenerTodos();\n\n    @Query("SELECT * FROM animal WHERE nombre = :nombre LIMIT 1")\n    LiveData<Animal> buscarPorNombre(String nombre);\n}\n'})}),(0,s.jsx)(a.p,{children:"Explicaci\xf3n:"}),(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.code,{children:"@Dao"})," define la interfaz que interact\xfaa con la base de datos."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.code,{children:"@Insert"}),", ",(0,s.jsx)(a.code,{children:"Update"}),", ",(0,s.jsx)(a.code,{children:"Delete"}),": inserta, actualiza o elimina el animal recibido por par\xe1metro."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.code,{children:"@Query"})," obtenerTodos(): devuelve en una lista de Animal todos los animales ordenados alfab\xe9ticamente."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.code,{children:"@Query"})," buscarPorNombre(): devuelve el animal cuyo nombre coincide con el especificado por par\xe1metro. Al igual que estudiamos en JPA, ",(0,s.jsx)(a.code,{children:":nombre"})," es un par\xe1metro vinculado (bind parameter), de forma que Room reemplaza autom\xe1ticamente ",(0,s.jsx)(a.code,{children:":nombre"})," con el valor pasado al m\xe9todo."]}),"\n",(0,s.jsxs)(a.li,{children:["Cuando la ",(0,s.jsx)(a.code,{children:"@Query"})," devuelve un LiveData directamente desde la consulta, Room se encargar\xe1 de observar los cambios en la base de datos y actualizar autom\xe1ticamente la UI cuando los datos cambien."]}),"\n"]}),(0,s.jsx)(a.admonition,{type:"info",children:(0,s.jsx)(a.p,{children:"Se han inclu\xeddo, a modo de ejemplo, m\xe1s m\xe9todos de los que nuestra aplicaci\xf3n necesitar\xe1 en realidad. En tus aplicaciones solo debes implementar los m\xe9todos CRUD realmente necesarios."})}),(0,s.jsx)(a.admonition,{type:"danger",children:(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.strong,{children:"En las consultas debes especificar el nombre de la tabla y las columnas"}),", no el nombre de la clase y los atributos. Si utilizaste ",(0,s.jsx)(a.code,{children:"tableName"}),' para modificar el nombre de la tabla, como es nuestro caso, deber\xe1s utilizar "animal" en la consulta y no "Animal" (nombre de la clase).']})}),(0,s.jsx)(a.h3,{id:"componente-database",children:"Componente Database"}),(0,s.jsxs)(a.p,{children:["El componente ",(0,s.jsx)(a.strong,{children:(0,s.jsx)(a.code,{children:"@Database"})})," en Room es una ",(0,s.jsx)(a.strong,{children:"clase abstracta"})," que act\xfaa como el punto de acceso principal a la base de datos SQLite."]}),(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Debe heredad de ",(0,s.jsx)(a.strong,{children:"RoomDatabase"})]}),"\n",(0,s.jsxs)(a.li,{children:["Es donde se definen las ",(0,s.jsx)(a.strong,{children:"entidades (tablas)"})," y las ",(0,s.jsx)(a.strong,{children:"versiones"})," de la base de datos."]}),"\n",(0,s.jsxs)(a.li,{children:["Tambi\xe9n conecta los ",(0,s.jsx)(a.strong,{children:"DAO"})," (Data Access Object) con la base de datos para realizar operaciones como insertar, actualizar y consultar datos."]}),"\n",(0,s.jsxs)(a.li,{children:["Implementa el ",(0,s.jsx)(a.strong,{children:"patr\xf3n Singleton"})," para evitar crear m\xfaltiples instancias de la base de datos, reduciendo el riesgo de inconsistencias y errores."]}),"\n",(0,s.jsxs)(a.li,{children:["Maneja las ",(0,s.jsx)(a.strong,{children:"migraciones"}),", es decir, la actualizaci\xf3n de la estructura de la base de datos cuando cambia el esquema."]}),"\n"]}),(0,s.jsxs)(a.p,{children:["Dentro del paquete ",(0,s.jsx)(a.code,{children:"data"})," crea la siguiente clase:"]}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-java",metastring:'title="AnimalDatabase.java"',children:'import androidx.room.Database;\nimport androidx.room.Room;\nimport androidx.room.RoomDatabase;\nimport android.content.Context;\n\n// Anotaci\xf3n para definir la base de datos\n@Database(entities = {Animal.class}, version = 1)\npublic abstract class AnimalDatabase extends RoomDatabase {\n\n    // M\xe9todo abstracto que expone el DAO\n    public abstract AnimalDao animalDao();\n\n    // Singleton - Evita m\xfaltiples instancias\n    private static AnimalDatabase instance;\n\n    // M\xe9todo para obtener la instancia de la base de datos\n    public static AnimalDatabase getInstance(final Context context) {\n        if (instance == null) {\n            synchronized (AnimalDatabase.class) {\n                if (instance == null) {\n                    instance = Room.databaseBuilder(\n                            context.getApplicationContext(),\n                            AnimalDatabase.class,\n                            "animal.db"\n                    )\n                    .fallbackToDestructiveMigration()  // Manejo de migraci\xf3n\n                    .build();\n                }\n            }\n        }\n        return instance;\n    }\n}\n'})}),(0,s.jsx)(a.p,{children:"Explicaci\xf3n:"}),(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:(0,s.jsx)(a.code,{children:"@Database"})}),":","\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Define la ",(0,s.jsx)(a.strong,{children:"lista de entidades"})," que forman parte de la base de datos."]}),"\n",(0,s.jsxs)(a.li,{children:["Especifica la ",(0,s.jsx)(a.strong,{children:"versi\xf3n actual"})," de la base de datos: Room usa esta informaci\xf3n para crear o actualizar la estructura de la base de datos."]}),"\n",(0,s.jsx)(a.li,{children:"Si agregas m\xe1s tablas en el futuro, debes a\xf1adir dichas entidades al array y actualizar el n\xfamero de versi\xf3n, de forma que el sistema actualice el esquema de la base de datos. De igual forma, si a\xf1ades un nuevo atributo a una entidad ya existente, tambi\xe9n debes actualizar la versi\xf3n."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:(0,s.jsx)(a.code,{children:"Room.databaseBuilder"})})," crea la base de datos con:","\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"Contexto de aplicaci\xf3n."}),"\n",(0,s.jsxs)(a.li,{children:["La clase que representa la base de datos (",(0,s.jsx)(a.code,{children:"AnimalDatabase.class"}),")."]}),"\n",(0,s.jsxs)(a.li,{children:["El nombre del archivo SQLite (",(0,s.jsx)(a.code,{children:"animal.db"}),")."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.code,{children:".fallbackToDestructiveMigration()"})," ",(0,s.jsx)(a.strong,{children:"destruye y recrea"})," la base de datos si hay un cambio en el esquema. Debes tener en cuenta que se perder\xe1n todos los datos. Para actualizaciones sin p\xe9rdida de datos, debes implementar ",(0,s.jsx)(a.strong,{children:"migraciones personalizadas"})," (no lo vamos a estudiar)."]}),"\n"]}),"\n"]}),"\n"]}),(0,s.jsx)(a.hr,{}),(0,s.jsx)(a.h2,{id:"implementaci\xf3n-del-repository",children:"Implementaci\xf3n del Repository"}),(0,s.jsxs)(a.p,{children:["El ",(0,s.jsx)(a.strong,{children:"Repository"})," es una clase que act\xfaa como ",(0,s.jsx)(a.strong,{children:"intermediario"})," entre la base de datos (a trav\xe9s de Room) y la capa de presentaci\xf3n (como ",(0,s.jsx)(a.code,{children:"ViewModel"}),", ",(0,s.jsx)(a.code,{children:"Activity"})," o ",(0,s.jsx)(a.code,{children:"Fragment"}),"). Su funci\xf3n principal es ",(0,s.jsx)(a.strong,{children:"gestionar el acceso a los datos"})," de forma organizada y separada, siguiendo el principio de ",(0,s.jsx)(a.strong,{children:"separaci\xf3n de responsabilidades"}),"."]}),(0,s.jsxs)(a.p,{children:["En el tema anterior, el ",(0,s.jsx)(a.code,{children:"ViewModel"})," era el encargado de realizar las peticiones a la API. No obstante, lo m\xe1s correcto es implementar un Repository que se encargue de ello, al igual que vamos a hacer con Room, pues ofrece las siguientes ventajas:"]}),(0,s.jsxs)(a.ol,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.strong,{children:"Abstracci\xf3n de la fuente de datos"}),":"]}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"El Repository proporciona una \xfanica fuente de datos para la aplicaci\xf3n."}),"\n",(0,s.jsxs)(a.li,{children:["Puede manejar datos de ",(0,s.jsx)(a.strong,{children:"m\xfaltiples fuentes"})," (base de datos local, API, archivo, cach\xe9, etc.)."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.strong,{children:"L\xf3gica de negocio centralizada"}),":"]}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["La l\xf3gica de obtenci\xf3n de datos se mantiene en el Repository, no en ",(0,s.jsx)(a.code,{children:"ViewModel"})," o ",(0,s.jsx)(a.code,{children:"Activity"}),"."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Las actividades o fragments solo solicitan los datos"})," al ViewModel y este al Repository, sin importar de d\xf3nde provengan."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.strong,{children:"Manejo de concurrencia"}),":"]}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["El Repository puede ejecutar consultas en ",(0,s.jsx)(a.strong,{children:"hilos secundarios"})," para evitar bloquear el hilo principal (UI)."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.strong,{children:"Reutilizaci\xf3n de c\xf3digo"}),":"]}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Si varios ",(0,s.jsx)(a.code,{children:"ViewModel"})," necesitan los mismos datos, el Repository proporciona una ",(0,s.jsx)(a.strong,{children:"\xfanica implementaci\xf3n"}),"."]}),"\n"]}),"\n"]}),"\n"]}),(0,s.jsxs)(a.p,{children:["Crea la siguiente clase en el paquete ",(0,s.jsx)(a.code,{children:"data"}),":"]}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-java",metastring:'title="AnimalRepository.java"',children:"import android.app.Application;\n\nimport androidx.lifecycle.LiveData;\n\nimport java.util.List;\nimport java.util.concurrent.Executor;\nimport java.util.concurrent.Executors;\n\npublic class AnimalRepository {\n    private AnimalDao animalDao;\n    private Executor executor;\n\n    public AnimalRepository(Application application) {\n        // Inicializamos el DAO de la entity Animal a trav\xe9s de la clase AnimalDatabase\n        animalDao = AnimalDatabase.getInstance(application).animalDao();\n        // Inicializamos el executor para realizar peticiones en otro hilo\n        executor = Executors.newSingleThreadExecutor();\n    }\n\n    public void insertar(Animal animal) {\n        executor.execute(() -> {\n            animalDao.insertar(animal);\n        });\n    }\n\n    // Devuelve el LiveData que recuperar del DAO\n    public LiveData<List<Animal>> obtenerAnimales() {\n        return animalDao.obtenerTodos();\n    }\n}\n"})}),(0,s.jsxs)(a.p,{children:["\ud83d\udd39 ",(0,s.jsx)(a.strong,{children:"Explicaci\xf3n"}),":"]}),(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["El Repository tendr\xe1 como atributos el DAO de la ",(0,s.jsx)(a.code,{children:"Entity"})," sobre la que debes operar y un ",(0,s.jsx)(a.code,{children:"Executor"})," para realizar peticiones en un hilo secundario."]}),"\n",(0,s.jsxs)(a.li,{children:["Se debe implementar un m\xe9todo por cada operaci\xf3n que se quiera realizar sobre la base de datos.","\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Las ",(0,s.jsx)(a.strong,{children:"operaciones de escritura en la base de datos"})," pueden tardar m\xe1s tiempo (acceso a disco, transacciones, etc.). Si se ejecutan en el hilo principal (UI thread), pueden bloquear la interfaz, causando que la app se congele o se cierre por ANR (Application Not Responding). La soluci\xf3n consiste en usar un ",(0,s.jsx)(a.code,{children:"Executor"})," para ejecutar la operaci\xf3n en ",(0,s.jsx)(a.strong,{children:"segundo plano y no afectar el rendimiento de la UI"}),"."]}),"\n",(0,s.jsxs)(a.li,{children:["Cuando el ",(0,s.jsx)(a.strong,{children:"DAO"})," de Room devuelve un ",(0,s.jsx)(a.code,{children:"LiveData"})," en una consulta (",(0,s.jsx)(a.code,{children:"@Query"}),"), la consulta se ejecuta autom\xe1ticamente en un ",(0,s.jsx)(a.strong,{children:"hilo secundario"})," (background thread), no en el hilo principal (UI thread)."]}),"\n"]}),"\n"]}),"\n"]}),(0,s.jsx)(a.hr,{}),(0,s.jsx)(a.h2,{id:"implementaci\xf3n-del-viewmodel",children:"Implementaci\xf3n del ViewModel"}),(0,s.jsxs)(a.p,{children:["El ",(0,s.jsx)(a.code,{children:"ViewModel"}),"lo implementaremos de forma similar a lo estudiado en los temas anteriores. En este caso, tendremos como atributo una instancia de ",(0,s.jsx)(a.code,{children:"AnimalRepository"}),", a partir de la cual realizaremos las operaciones sobre la base de datos."]}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-java",children:"import android.app.Application;\n\nimport androidx.annotation.NonNull;\nimport androidx.lifecycle.AndroidViewModel;\nimport androidx.lifecycle.LiveData;\n\nimport java.util.List;\n\nimport es.iesagora.demoroom.data.Animal;\nimport es.iesagora.demoroom.data.AnimalRepository;\n\npublic class AnimalViewModel extends AndroidViewModel {\n\n    // Instancia del Repository\n    private AnimalRepository animalRepository;\n\n    public AnimalViewModel(@NonNull Application application) {\n        super(application);\n        // Inicializamos el repository\n        animalRepository = new AnimalRepository(application);\n    }\n\n    public LiveData<List<Animal>> obtenerAnimales() {\n        // Devolvemos el LiveData recibido y pondremos un observador sobre el m\xe9todo en la View\n        return animalRepository.obtenerAnimales();\n    }\n\n    public void insertarAnimal(Animal animal) {\n        animalRepository.insertar(animal);\n    }\n}\n"})}),(0,s.jsx)(a.h2,{id:"implementaci\xf3n-de-la-view",children:"Implementaci\xf3n de la View"}),(0,s.jsxs)(a.p,{children:["Siguiendo los pasos que ya hemos estudiados en los temas anteriores, implementamos ",(0,s.jsx)(a.code,{children:"AnimalesFragment"})," utilizando el componente ",(0,s.jsx)(a.code,{children:"Navigation"}),". En este fragmento, incluiremos un RecyclerView que muestre el nombre de cada animal."]}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-java",metastring:'title="AnimalesFragment.java"',children:'public class AnimalesFragment extends Fragment {\n\n    FragmentAnimalesBinding binding;\n\n    @Override\n    public View onCreateView(LayoutInflater inflater, ViewGroup container,\n                             Bundle savedInstanceState) {\n        return (binding = FragmentAnimalesBinding.inflate(inflater, container, false)).getRoot();\n    }\n\n    @Override\n    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {\n        super.onViewCreated(view, savedInstanceState);\n        AnimalViewModel viewModel = new ViewModelProvider(requireActivity()).get(AnimalViewModel.class);\n\n        // Ejec\xfatalo solo la primera vez para tener animales insertados, despu\xe9s com\xe9ntalo\n        viewModel.insertarAnimal(new Animal("Pipo", "Perro bodeguero que duerme a todas horas."));\n        viewModel.insertarAnimal(new Animal("Luna", "Gata traviesa que persigue sombras y juega con pelotas."));\n        viewModel.insertarAnimal(new Animal("Roco", "Loro hablador que repite frases divertidas."));\n        viewModel.insertarAnimal(new Animal("Nina", "Coneja blanca que adora las zanahorias y salta por toda la casa."));\n        viewModel.insertarAnimal(new Animal("Max", "Hamster curioso que corre sin parar en su rueda."));\n        viewModel.insertarAnimal(new Animal("Toby", "Tortuga tranquila que disfruta tomar el sol en su terrario."));\n\n        // Establecemos el adaptador\n        AnimalesAdapter animalesAdapter = new AnimalesAdapter();\n        binding.recyclerViewAnimales.setAdapter(animalesAdapter);\n\n        // Recuperamos la lista de animales\n        viewModel.obtenerAnimales().observe(getViewLifecycleOwner(), new Observer<List<Animal>>() {\n            @Override\n            public void onChanged(List<Animal> animals) {\n                animalesAdapter.establecerListaAnimales(animals);\n            }\n        });\n    }\n\n    static class AnimalViewHolder extends RecyclerView.ViewHolder {\n        ...\n    }\n\n    class AnimalesAdapter extends RecyclerView.Adapter<AnimalViewHolder>{\n        List<Animal> listaAnimales;\n\n        ... // No olvides a\xf1adir el resto del c\xf3digo necesario para un Adapter\n\n        // Establecemos la lista de animales y notificamos los cambios para actualizar el RecyclerView\n        void establecerListaAnimales(List<Animal> listaAnimales){\n            this.listaAnimales = listaAnimales;\n            notifyDataSetChanged();\n        }\n    }\n}\n'})})]})}function m(e={}){const{wrapper:a}={...(0,o.R)(),...e.components};return a?(0,s.jsx)(a,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1288:(e,a,n)=>{n.d(a,{A:()=>i});const i=n.p+"assets/images/1-primera-version-app-53638c803f9f14a699e9f5418f0e5f7d.png"},8453:(e,a,n)=>{n.d(a,{R:()=>r,x:()=>l});var i=n(6540);const s={},o=i.createContext(s);function r(e){const a=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function l(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:a},e.children)}}}]);