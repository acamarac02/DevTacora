"use strict";(self.webpackChunkpmdm=self.webpackChunkpmdm||[]).push([[1861],{9251:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>t,contentTitle:()=>l,default:()=>g,frontMatter:()=>r,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"pmdm/ut5_persistencia/firebase/authentication/demo-gmail","title":"Demo autenticaci\xf3n con Google Sign-In","description":"Vamos a agregar la autenticaci\xf3n con Google en nuestro proyecto anterior, donde implementamos login con email/contrase\xf1a.","source":"@site/docs/pmdm/ut5_persistencia/4-firebase/1-authentication/2-demo-gmail.md","sourceDirName":"pmdm/ut5_persistencia/4-firebase/1-authentication","slug":"/pmdm/ut5_persistencia/firebase/authentication/demo-gmail","permalink":"/DevTacora/docs/pmdm/ut5_persistencia/firebase/authentication/demo-gmail","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"sidebar_label":"Autenticaci\xf3n con Google","title":"Demo autenticaci\xf3n con Google Sign-In"},"sidebar":"pmdmSidebar","previous":{"title":"Autenticaci\xf3n con email y contrase\xf1a","permalink":"/DevTacora/docs/pmdm/ut5_persistencia/firebase/authentication/demo-mail-pass"}}');var o=i(4848),a=i(8453);const r={sidebar_position:2,sidebar_label:"Autenticaci\xf3n con Google",title:"Demo autenticaci\xf3n con Google Sign-In"},l=void 0,t={},c=[{value:"1. Habilitar Google Sign-In en Firebase",id:"1-habilitar-google-sign-in-en-firebase",level:2},{value:"2. Huella digital SHA-1",id:"2-huella-digital-sha-1",level:2},{value:"<strong>Paso 1: Obtener la huella SHA-1 en Android Studio</strong>",id:"paso-1-obtener-la-huella-sha-1-en-android-studio",level:4},{value:"<strong>Paso 2: Agregar SHA-1 en Firebase</strong>",id:"paso-2-agregar-sha-1-en-firebase",level:4},{value:"3. Agregar Dependencias en build.gradle",id:"3-agregar-dependencias-en-buildgradle",level:2},{value:"4. Agregar el Bot\xf3n de Google en LoginActivity",id:"4-agregar-el-bot\xf3n-de-google-en-loginactivity",level:2},{value:"5. Implementar Google Sign-In en <code>LoginActivity.java</code>",id:"5-implementar-google-sign-in-en-loginactivityjava",level:2},{value:"\ud83d\udd39 Paso 1: Agregar Variables",id:"-paso-1-agregar-variables",level:3},{value:"\ud83d\udd39 Paso 2: Obtener el Web Client Id",id:"-paso-2-obtener-el-web-client-id",level:3},{value:"\ud83d\udd39 Paso 3: Configurar Google Sign-In",id:"-paso-3-configurar-google-sign-in",level:3},{value:"\ud83d\udd39 Paso 4: Iniciar el Flujo de Sign-In",id:"-paso-4-iniciar-el-flujo-de-sign-in",level:3},{value:"\ud83d\udd39 Paso 5: Manejar la Respuesta del Login de Google",id:"-paso-5-manejar-la-respuesta-del-login-de-google",level:3},{value:"\ud83d\udd39 Paso 6: Autenticar en Firebase con la Cuenta de Google",id:"-paso-6-autenticar-en-firebase-con-la-cuenta-de-google",level:3},{value:"6. Gestionar el cierre de sesi\xf3n en <code>MainActivity.java</code>",id:"6-gestionar-el-cierre-de-sesi\xf3n-en-mainactivityjava",level:2}];function d(e){const n={a:"a",br:"br",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,o.jsxs)("div",{class:"justify-text",children:[(0,o.jsxs)(n.p,{children:["Vamos a ",(0,o.jsx)(n.strong,{children:"agregar la autenticaci\xf3n con Google"})," en nuestro proyecto anterior, donde implementamos login con email/contrase\xf1a."]}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"UT5. GIF resumen de la aplicaci\xf3n",src:i(1154).A+"",width:"420",height:"898"})}),(0,o.jsx)(n.p,{children:"Antes de empezar, entendamos las tecnolog\xedas que usaremos:"}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Firebase Authentication"}),":  es un servicio que nos permite autenticar usuarios de forma segura sin necesidad de gestionar un backend propio."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"OAuth 2.0"}),": Google utiliza ",(0,o.jsx)(n.strong,{children:"OAuth 2.0"})," para autenticar a los usuarios. Es un protocolo seguro que permite a las apps acceder a la informaci\xf3n de Google del usuario sin exponer sus credenciales."]}),"\n"]}),"\n"]}),(0,o.jsxs)(n.p,{children:["No obstante, ",(0,o.jsx)(n.strong,{children:"Firebase simplifica el proceso"}),", por lo que ",(0,o.jsx)(n.strong,{children:"no necesitas manejar tokens de OAuth manualmente"}),". Solo necesitas configurar Firebase y usar su SDK."]}),(0,o.jsx)(n.p,{children:"El uso de estas dos tecnolog\xedas independientes supone que el login con Google en Firebase tenga dos pasos fundamentales:"}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Obtener el usuario de Google"}),": Se inicia el flujo de Google Sign-In para que el usuario seleccione su cuenta y se obtenga su informaci\xf3n (correo, ID Token, etc.)."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Autenticar el usuario en Firebase Auth"}),": Se usa el ID Token obtenido para crear una credencial (",(0,o.jsx)(n.code,{children:"AuthCredential"}),"), que luego se env\xeda a Firebase para autenticar al usuario dentro de la app."]}),"\n"]}),"\n"]}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h2,{id:"1-habilitar-google-sign-in-en-firebase",children:"1. Habilitar Google Sign-In en Firebase"}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["Ve a la ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.a,{href:"https://console.firebase.google.com/",children:"Firebase Console"})}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Entra en tu proyecto y ve a ",(0,o.jsx)(n.strong,{children:"Authentication"})," > ",(0,o.jsx)(n.strong,{children:"M\xe9todo de inicio de sesi\xf3n"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Habilita ",(0,o.jsx)(n.strong,{children:"Google"})," y ",(0,o.jsx)(n.strong,{children:"guarda los cambios"}),"."]}),"\n"]}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"Habilitar Google Sign-In",src:i(6254).A+"",width:"1932",height:"658"})}),(0,o.jsxs)(n.ol,{start:"4",children:["\n",(0,o.jsx)(n.li,{children:"Introduce el nombre de tu aplicaci\xf3n (ser\xe1 el que se muestre en el correo que les llega a los usuarios despu\xe9s de acceder por primera vez) y el correo de asistencia al proyecto."}),"\n"]}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"Configuraci\xf3n del proveedor",src:i(2979).A+"",width:"1938",height:"1440"})}),(0,o.jsx)(n.h2,{id:"2-huella-digital-sha-1",children:"2. Huella digital SHA-1"}),(0,o.jsxs)(n.p,{children:["Cuando activas ",(0,o.jsx)(n.strong,{children:"autenticaci\xf3n con Google en Firebase"}),", Firebase necesita ",(0,o.jsx)(n.strong,{children:"verificar"})," que tu aplicaci\xf3n est\xe1 realmente conectada a tu proyecto de Firebase y a Google Cloud."]}),(0,o.jsxs)(n.p,{children:["Para ello, requiere ",(0,o.jsx)(n.strong,{children:"una huella digital SHA-1"}),", que es un identificador \xfanico generado a partir de la clave de firma de la app."]}),(0,o.jsxs)(n.p,{children:["Esto es necesario porque ",(0,o.jsx)(n.strong,{children:"Google Sign-In usa OAuth 2.0"}),", y para que Firebase pueda autenticar a los usuarios con sus cuentas de Google, necesita asociar la app con un ",(0,o.jsx)(n.strong,{children:"SHA-1 v\xe1lido"}),"."]}),(0,o.jsx)(n.p,{children:"Hay dos tipos de claves SHA-1 que puedes agregar:"}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"SHA-1 de desarrollo"})," (para pruebas en Android Studio)."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"SHA-1 de producci\xf3n"})," (para versiones firmadas y subidas a Google Play)."]}),"\n"]}),(0,o.jsx)(n.p,{children:"A continuaci\xf3n se explica c\xf3mo obtener SHA-1 de Desarrollo (Modo Debug):"}),(0,o.jsx)(n.h4,{id:"paso-1-obtener-la-huella-sha-1-en-android-studio",children:(0,o.jsx)(n.strong,{children:"Paso 1: Obtener la huella SHA-1 en Android Studio"})}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Abre Android Studio"})," y ve a la ",(0,o.jsx)(n.strong,{children:"terminal"})," (",(0,o.jsx)(n.code,{children:"View > Tool Windows > Terminal"}),")."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Escribe el siguiente comando y presiona ",(0,o.jsx)(n.code,{children:"Enter"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"./gradlew signingReport\n"})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"En Windows"}),", usa:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"gradlew signingReport\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Espera unos segundos y ver\xe1s una salida como esta:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"Variant: debug\nConfig: debug\nStore: /Users/tuusuario/.android/debug.keystore\nAlias: AndroidDebugKey\nMD5:  A1:B2:C3:D4:E5:F6:G7:H8:I9:J0\nSHA1: 11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:GG:HH:II:JJ\nSHA-256: XX:YY:ZZ...\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Copia el SHA-1"})," (solo los n\xfameros despu\xe9s de ",(0,o.jsx)(n.code,{children:"SHA1:"}),")."]}),"\n"]}),"\n"]}),(0,o.jsx)(n.h4,{id:"paso-2-agregar-sha-1-en-firebase",children:(0,o.jsx)(n.strong,{children:"Paso 2: Agregar SHA-1 en Firebase"})}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsxs)(n.strong,{children:["Ve a la ",(0,o.jsx)(n.a,{href:"https://console.firebase.google.com/",children:"Firebase Console"})]}),"."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["En tu proyecto, haz clic en \u2699 ",(0,o.jsx)(n.strong,{children:"Configuraci\xf3n del Proyecto"}),"."]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"Configuraci\xf3n del proyecto",src:i(7060).A+"",width:"1290",height:"440"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["En la secci\xf3n ",(0,o.jsx)(n.strong,{children:"Tus apps"}),", selecciona tu app de Android."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:'En la parte de "Huellas digitales del certificado SHA"'}),", selecciona ",(0,o.jsx)(n.code,{children:"Agregar huella digital"}),"."]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"Huella digital",src:i(849).A+"",width:"1890",height:"1432"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Guarda los cambios y vuelve a descargar y a\xf1adir a tu proyecto el archivo ",(0,o.jsx)(n.strong,{children:"google-services.json"}),"."]}),"\n"]}),"\n"]}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h2,{id:"3-agregar-dependencias-en-buildgradle",children:"3. Agregar Dependencias en build.gradle"}),(0,o.jsxs)(n.p,{children:["Abre ",(0,o.jsx)(n.code,{children:"build.gradle (Module: app)"})," y ",(0,o.jsx)(n.strong,{children:"a\xf1ade estas dependencias"})," (si has implementado el ejercicio anterior, ya debes tener las dos primera dependencias):"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-gradle",children:'dependencies {\n    // Firebase BOM (Gestiona autom\xe1ticamente las versiones de las dependencias de Firebase)\n    implementation(platform("com.google.firebase:firebase-bom:33.8.0"))\n\n    // Firebase Authentication\n    implementation("com.google.firebase:firebase-auth")\n\n    // Google Sign-In (Fuera de BOM, ya que no es parte de Firebase)\n    implementation("com.google.android.gms:play-services-auth:20.7.0")\n}\n'})}),(0,o.jsxs)(n.p,{children:["Luego, ",(0,o.jsx)(n.strong,{children:"sincroniza el proyecto"})," (",(0,o.jsx)(n.code,{children:"Sync Now"}),")."]}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h2,{id:"4-agregar-el-bot\xf3n-de-google-en-loginactivity",children:"4. Agregar el Bot\xf3n de Google en LoginActivity"}),(0,o.jsxs)(n.p,{children:["En ",(0,o.jsx)(n.code,{children:"activity_login.xml"}),", ",(0,o.jsx)(n.strong,{children:"agrega un bot\xf3n para iniciar sesi\xf3n con Google"}),":"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-xml",children:'<com.google.android.gms.common.SignInButton\n    android:id="@+id/googleSignInButton"\n    android:layout_width="wrap_content"\n    android:layout_height="wrap_content"\n    android:layout_marginTop="30dp"/>\n'})}),(0,o.jsxs)(n.p,{children:["\ud83d\udccc ",(0,o.jsx)(n.strong,{children:"Este bot\xf3n es el oficial de Google Sign-In"})," y se ver\xe1 como el bot\xf3n t\xedpico de ",(0,o.jsx)(n.strong,{children:'"Iniciar sesi\xf3n con Google"'}),"."]}),(0,o.jsx)(n.hr,{}),(0,o.jsxs)(n.h2,{id:"5-implementar-google-sign-in-en-loginactivityjava",children:["5. Implementar Google Sign-In en ",(0,o.jsx)(n.code,{children:"LoginActivity.java"})]}),(0,o.jsxs)(n.p,{children:["Abre ",(0,o.jsx)(n.code,{children:"LoginActivity.java"})," y sigue estos pasos:"]}),(0,o.jsx)(n.h3,{id:"-paso-1-agregar-variables",children:"\ud83d\udd39 Paso 1: Agregar Variables"}),(0,o.jsxs)(n.p,{children:["Dentro de la clase ",(0,o.jsx)(n.code,{children:"LoginActivity"}),", ",(0,o.jsx)(n.strong,{children:"declara estas variables"}),":"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",children:"private ActivityResultLauncher<Intent> googleSignInLauncher;\nprivate GoogleSignInClient googleSignInClient;\nprivate static final int RC_SIGN_IN = 9001;\n"})}),(0,o.jsxs)(n.p,{children:["\ud83d\udccc ",(0,o.jsx)(n.strong,{children:"Explicaci\xf3n"}),(0,o.jsx)(n.br,{}),"\n","\u2714 ",(0,o.jsxs)(n.strong,{children:[(0,o.jsx)(n.code,{children:"ActivityResultLauncher<Intent>"})," es una API moderna de Android"]})," que se usa para iniciar actividades y recibir resultados (ya la utilizamos para abrir la galer\xeda y recuperar una imagen). ",(0,o.jsx)(n.strong,{children:"En el contexto de Google Sign-In"}),", permite iniciar el flujo de autenticaci\xf3n y manejar la respuesta en un solo lugar.",(0,o.jsx)(n.br,{}),"\n","\u2714 ",(0,o.jsx)(n.code,{children:"GoogleSignInClient"})," es una clase que administra el flujo de autenticaci\xf3n con Google.",(0,o.jsx)(n.br,{}),"\n","\u2714 ",(0,o.jsx)(n.code,{children:"RC_SIGN_IN = 9001"})," es un ",(0,o.jsxs)(n.strong,{children:["c\xf3digo de solicitud (",(0,o.jsx)(n.code,{children:"Request Code"}),")"]})," que se usa para identificar el resultado del inicio de sesi\xf3n con Google."]}),(0,o.jsx)(n.h3,{id:"-paso-2-obtener-el-web-client-id",children:"\ud83d\udd39 Paso 2: Obtener el Web Client Id"}),(0,o.jsxs)(n.p,{children:["El ",(0,o.jsx)(n.strong,{children:"Web Client ID"})," (o ",(0,o.jsx)(n.strong,{children:"Client ID de OAuth 2.0"}),") es un identificador \xfanico generado por ",(0,o.jsx)(n.strong,{children:"Google Cloud Platform (GCP)"})," que permite a tu aplicaci\xf3n comunicarse con los servidores de Google para autenticar a los usuarios mediante ",(0,o.jsx)(n.strong,{children:"Google Sign-In"}),"."]}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Es necesario para que Firebase pueda validar la identidad de los usuarios que inician sesi\xf3n con Google."}),"\n",(0,o.jsx)(n.li,{children:'Se usa en Android para obtener un "ID Token" que luego se intercambia con Firebase para autenticar al usuario.'}),"\n",(0,o.jsx)(n.li,{children:"Cada proyecto de Firebase tiene su propio Web Client ID, y debe configurarse correctamente para que Google Sign-In funcione en tu app."}),"\n"]}),(0,o.jsx)(n.p,{children:"Para obtener el Web Client ID en Firebase sigue estos pasos:"}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Abre Firebase Console"}),": ",(0,o.jsx)(n.a,{href:"https://console.firebase.google.com/",children:"https://console.firebase.google.com/"})]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Selecciona tu proyecto"}),"."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["En el men\xfa lateral, ve a ",(0,o.jsx)(n.strong,{children:'"Configuraci\xf3n del Proyecto"'})," (\u2699)."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Dir\xedgete a la pesta\xf1a ",(0,o.jsx)(n.strong,{children:'"M\xe9todos de acceso"'}),"."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Selecciona el proveedor ",(0,o.jsx)(n.strong,{children:"Google"})," que hemos configurado previamente."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Despliega el apartado ",(0,o.jsx)(n.strong,{children:"Configuraci\xf3n del SDK web"})," y copia el primer campo."]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"ID cliente web",src:i(8286).A+"",width:"1930",height:"1208"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Agr\xe9galo a ",(0,o.jsx)(n.code,{children:"res/values/strings.xml"})," para mayor organizaci\xf3n:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-xml",children:'<string name="default_web_client_id">1234567890-abcdefghij.apps.googleusercontent.com</string>\n'})}),"\n"]}),"\n"]}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h3,{id:"-paso-3-configurar-google-sign-in",children:"\ud83d\udd39 Paso 3: Configurar Google Sign-In"}),(0,o.jsxs)(n.p,{children:["Agrega esta configuraci\xf3n dentro de ",(0,o.jsx)(n.code,{children:"LoginActivity.java"}),":"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",children:'@Override\nprotected void onCreate(Bundle savedInstanceState) {\n    super.onCreate(savedInstanceState);\n    binding = ActivityLoginBinding.inflate(getLayoutInflater());\n    setContentView(binding.getRoot());\n\n    mAuth = FirebaseAuth.getInstance();\n\n    configurarClienteGoogleSignIn();\n    inicializarLauncherGoogleSignIn();\n\n    // Evento para el bot\xf3n de Google Sign-In\n    binding.googleSignInButton.setOnClickListener(v -> signInWithGoogle());\n}\n\nprivate void configurarClienteGoogleSignIn() {\n    // Configurar Google Sign-In\n    GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)\n            .requestIdToken(getString(R.string.default_web_client_id)) // Usa tu Web client ID\n            .requestEmail()\n            .build();\n\n    // Inicializar Google Sign-In a partir de la configuraci\xf3n previa\n    googleSignInClient = GoogleSignIn.getClient(this, gso);\n}\n\nprivate void inicializarLauncherGoogleSignIn() {\n    // Inicializar el ActivityResultLauncher para manejar la respuesta de Google Sign-In\n    googleSignInLauncher = registerForActivityResult(\n            new ActivityResultContracts.StartActivityForResult(),\n            result -> {\n                if (result.getResultCode() == RESULT_OK) {\n                    Intent data = result.getData();\n                    Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);\n                    gestionarResultadoSignIn(task);\n                } else {\n                    Toast.makeText(this, "Error en el inicio de sesi\xf3n con Google", Toast.LENGTH_SHORT).show();\n                }\n            }\n    );\n}\n'})}),(0,o.jsxs)(n.p,{children:["\ud83d\udccc ",(0,o.jsx)(n.strong,{children:"Explicaci\xf3n"}),(0,o.jsx)(n.br,{}),"\n","El m\xe9todo ",(0,o.jsx)(n.code,{children:"configurarClienteGoogleSignIn()"}),":"]}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Configura Google Sign-In con ",(0,o.jsx)(n.code,{children:"GoogleSignInOptions"}),", solicitando el ",(0,o.jsx)(n.strong,{children:"ID Token"})," y ",(0,o.jsx)(n.strong,{children:"correo"})," del usuario."]}),"\n",(0,o.jsxs)(n.li,{children:["Inicializa ",(0,o.jsx)(n.code,{children:"GoogleSignInClient"})," con la configuraci\xf3n previa, que gestiona el flujo de autenticaci\xf3n."]}),"\n"]}),(0,o.jsxs)(n.p,{children:["El m\xe9todo ",(0,o.jsx)(n.code,{children:"inicializarLauncherGoogleSignIn()"}),":"]}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Registra ",(0,o.jsx)(n.code,{children:"ActivityResultLauncher<Intent>"}),", que manejar\xe1 el resultado del inicio de sesi\xf3n con Google."]}),"\n",(0,o.jsx)(n.li,{children:"Cuando termina el proceso de inicio de sesi\xf3n en los servidores de Google y regresamos a nuestra Activity se ejecutar\xe1 el contenido de este m\xe9todo."}),"\n",(0,o.jsxs)(n.li,{children:["El c\xf3digo que devuelve determina si el proceso ha sido existoso o no.","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Si ha sido exitoso, extrae la cuenta de Google seleccionada con ",(0,o.jsx)(n.code,{children:"GoogleSignIn.getSignedInAccountFromIntent(data)"}),". Posteriormente, llama a ",(0,o.jsx)(n.code,{children:"handleSignInResult(task)"}),", que procesa la cuenta obtenida y la autentica con Firebase."]}),"\n",(0,o.jsx)(n.li,{children:"Si no se ha podido realizar el inicio de sesi\xf3n, podemos mostrar un mensaje de error al usuario."}),"\n"]}),"\n"]}),"\n"]}),(0,o.jsxs)(n.p,{children:["Asigna un evento al bot\xf3n de Google Sign-In, ejecutando ",(0,o.jsx)(n.code,{children:"signInWithGoogle()"})," al hacer clic para iniciar el proceso de autenticaci\xf3n."]}),(0,o.jsx)(n.h3,{id:"-paso-4-iniciar-el-flujo-de-sign-in",children:"\ud83d\udd39 Paso 4: Iniciar el Flujo de Sign-In"}),(0,o.jsx)(n.p,{children:"Cuando se pulse el bot\xf3n de inicio de sesi\xf3n con Google se ejecutar\xe1 el siguiente m\xe9todo:"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",children:"private void signInWithGoogle() {\n    Intent signInIntent = googleSignInClient.getSignInIntent();\n    googleSignInLauncher.launch(signInIntent);\n}\n"})}),(0,o.jsxs)(n.p,{children:["\ud83d\udccc ",(0,o.jsx)(n.strong,{children:"Explicaci\xf3n"})]}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Obtiene el intent de Google Sign-In usando ",(0,o.jsx)(n.code,{children:"googleSignInClient.getSignInIntent()"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Lanza el intent con ",(0,o.jsx)(n.code,{children:"googleSignInLauncher.launch()"}),", iniciando el proceso de autenticaci\xf3n. Una vez ejecutado este m\xe9todo, el usuario ser\xe1 redirigido a la p\xe1gina de Google para realizar el log in."]}),"\n"]}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h3,{id:"-paso-5-manejar-la-respuesta-del-login-de-google",children:"\ud83d\udd39 Paso 5: Manejar la Respuesta del Login de Google"}),(0,o.jsxs)(n.p,{children:["El m\xe9todo ",(0,o.jsx)(n.code,{children:"gestionarResultadoSignIn()"})," quedar\xe1 de la siguiente manera:"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",children:'private void gestionarResultadoSignIn(Task<GoogleSignInAccount> task) {\n    try {\n        GoogleSignInAccount account = task.getResult(ApiException.class);\n        firebaseAuthWithGoogle(account);\n    } catch (ApiException e) {\n        Toast.makeText(this, "Error al iniciar sesi\xf3n con Google", Toast.LENGTH_SHORT).show();\n    }\n}\n'})}),(0,o.jsxs)(n.p,{children:["\ud83d\udccc ",(0,o.jsx)(n.strong,{children:"Explicaci\xf3n"}),"\n\u2714 Recibe el resultado de la autenticaci\xf3n con Google a trav\xe9s de ",(0,o.jsx)(n.code,{children:"Task<GoogleSignInAccount>"}),".",(0,o.jsx)(n.br,{}),"\n","\u2714 Obtiene la cuenta de Google del usuario con ",(0,o.jsx)(n.code,{children:"task.getResult(ApiException.class)"}),".",(0,o.jsx)(n.br,{}),"\n","\u2714 Si la autenticaci\xf3n falla, muestra un mensaje de error.",(0,o.jsx)(n.br,{}),"\n","\u2714 Si es exitosa, llama a ",(0,o.jsx)(n.code,{children:"firebaseAuthWithGoogle(account)"})," para autenticar al usuario en Firebase."]}),(0,o.jsx)(n.hr,{}),(0,o.jsx)(n.h3,{id:"-paso-6-autenticar-en-firebase-con-la-cuenta-de-google",children:"\ud83d\udd39 Paso 6: Autenticar en Firebase con la Cuenta de Google"}),(0,o.jsx)(n.p,{children:"Despu\xe9s de obtener la cuenta de Google, autenticamos en Firebase:"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",children:'private void firebaseAuthWithGoogle(GoogleSignInAccount account) {\n    AuthCredential credential = GoogleAuthProvider.getCredential(account.getIdToken(), null);\n    mAuth.signInWithCredential(credential)\n        .addOnCompleteListener(this, task -> {\n            if (task.isSuccessful()) {\n                Toast.makeText(LoginActivity.this, "Inicio de sesi\xf3n con Google exitoso", Toast.LENGTH_SHORT).show();\n                redirectToMain();\n            } else {\n                Toast.makeText(LoginActivity.this, "Error: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();\n            }\n        });\n}\n'})}),(0,o.jsxs)(n.p,{children:["\ud83d\udccc ",(0,o.jsx)(n.strong,{children:"Explicaci\xf3n"}),"\n\u2714 Crea una credencial de autenticaci\xf3n con ",(0,o.jsx)(n.code,{children:"GoogleAuthProvider.getCredential()"})," usando el ID Token del usuario.",(0,o.jsx)(n.br,{}),"\n","\u2714 Llama a ",(0,o.jsx)(n.code,{children:"signInWithCredential()"})," para autenticar al usuario en Firebase.",(0,o.jsx)(n.br,{}),"\n","\u2714 Si la autenticaci\xf3n es exitosa, redirige al usuario a ",(0,o.jsx)(n.code,{children:"MainActivity"}),".",(0,o.jsx)(n.br,{}),"\n","\u2714 Si hay un error, lo muestra en un ",(0,o.jsx)(n.code,{children:"Toast"}),"."]}),(0,o.jsxs)(n.h2,{id:"6-gestionar-el-cierre-de-sesi\xf3n-en-mainactivityjava",children:["6. Gestionar el cierre de sesi\xf3n en ",(0,o.jsx)(n.code,{children:"MainActivity.java"})]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",children:'public class MainActivity extends AppCompatActivity {\n    ...\n    private GoogleSignInClient googleSignInClient;\n\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        ...\n\n        // Inicializar Google Sign In\n        configurarClienteGoogleSignIn();\n\n        // Mismo bot\xf3n y evento que hicimos en la demo anterior\n        binding.logoutButton.setOnClickListener(new View.OnClickListener() {\n            @Override\n            public void onClick(View v) {\n                logoutUser();\n            }\n        });\n    }\n\n    // Configuramos el cliente de Google Sign In\n    // Mismo c\xf3digo que pusimos en Login Activity\n    private void configurarClienteGoogleSignIn() {\n        // Configurar Google Sign-In\n        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)\n                .requestIdToken(getString(R.string.default_web_client_id)) // Usa tu Web client ID\n                .requestEmail()\n                .build();\n\n        // Inicializar Google Sign-In a partir de la configuraci\xf3n previa\n        googleSignInClient = GoogleSignIn.getClient(this, gso);\n    }\n\n    // Cierra la sesi\xf3n del usuario\n    private void logoutUser() {\n        boolean loginGoogle = isGoogleLogin();\n        mAuth.signOut();\n        \n        if (loginGoogle) { // Si ha iniciado sesi\xf3n con Google, cerramos sesi\xf3n en el cliente de Google\n            googleSignInClient.signOut().addOnCompleteListener(this, task -> {\n                Toast.makeText(MainActivity.this, "Sesi\xf3n cerrada", Toast.LENGTH_SHORT).show();\n                redirectToLogin();\n            });\n        } else {\n            Toast.makeText(MainActivity.this, "Sesi\xf3n cerrada", Toast.LENGTH_SHORT).show();\n            redirectToLogin();\n        }\n    }\n\n    // Determina si el usuario ha iniciado sesi\xf3n con Google\n    private boolean isGoogleLogin() {\n        FirebaseUser user = mAuth.getCurrentUser();\n        for (UserInfo profile : user.getProviderData()) {\n            if (profile.getProviderId().equals("google.com")) {\n                return true;\n            }\n        }\n        return false;\n    }\n}\n'})}),(0,o.jsxs)(n.p,{children:["\ud83d\udccc ",(0,o.jsx)(n.strong,{children:"Explicaci\xf3n del log out"})]}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Obtiene el usuario actual con ",(0,o.jsx)(n.code,{children:"mAuth.getCurrentUser()"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Recorre los proveedores de autenticaci\xf3n del usuario con ",(0,o.jsx)(n.code,{children:"user.getProviderData()"})," para verificar si se us\xf3 Google (",(0,o.jsx)(n.code,{children:"google.com"}),")."]}),"\n",(0,o.jsxs)(n.li,{children:["Si el usuario se autentic\xf3 con Google, tambi\xe9n se llama a ",(0,o.jsx)(n.code,{children:"googleSignInClient.signOut()"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Se cierra la sesi\xf3n en Firebase con ",(0,o.jsx)(n.code,{children:"mAuth.signOut()"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Despu\xe9s del logout, se redirige a ",(0,o.jsx)(n.code,{children:"LoginActivity"})," para que el usuario vuelva a autenticarse."]}),"\n"]})]})}function g(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},2979:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/configuracion-proveedor-755f392b597903fc4fd29662e5c591e7.png"},7060:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/configuracion-proyecto-222134ef2bde1459cb5fc5d2558fcfb4.png"},1154:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/google-signin-demo-b5bddab04185db8eec490f6194bea595.gif"},6254:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/habilitar-google-signin-83cad0bf6ddca4166a8398fc459e4ffe.png"},849:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/huella-digital-9550dcc1987b9c8e81893beea43a34bd.png"},8286:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/id-cliente-web-b83a990a22130a7d08dd98a2b15c593a.png"},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>l});var s=i(6540);const o={},a=s.createContext(o);function r(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);