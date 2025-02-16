"use strict";(self.webpackChunkpmdm=self.webpackChunkpmdm||[]).push([[6723],{7278:(e,r,a)=>{a.r(r),a.d(r,{assets:()=>l,contentTitle:()=>d,default:()=>u,frontMatter:()=>n,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"pmdm/ut5_persistencia/firebase/firestore/configuracion-android","title":"Configuraci\xf3n de Firestore en Android","description":"Antes de poder utilizar Cloud Firestore en una aplicaci\xf3n Android, es necesario configurar correctamente Firebase en el proyecto. En este apartado veremos los pasos detallados para:","source":"@site/docs/pmdm/ut5_persistencia/4-firebase/2-firestore/1-configuracion-android.md","sourceDirName":"pmdm/ut5_persistencia/4-firebase/2-firestore","slug":"/pmdm/ut5_persistencia/firebase/firestore/configuracion-android","permalink":"/DevTacora/docs/pmdm/ut5_persistencia/firebase/firestore/configuracion-android","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"sidebar_label":"Configuraci\xf3n de Firestore","title":"Configuraci\xf3n de Firestore en Android"},"sidebar":"pmdmSidebar","previous":{"title":"Firestore Database","permalink":"/DevTacora/docs/pmdm/ut5_persistencia/firebase/firestore/"},"next":{"title":"Operaciones CRUD","permalink":"/DevTacora/docs/pmdm/ut5_persistencia/firebase/firestore/operaciones-crud"}}');var i=a(4848),o=a(8453);const n={sidebar_position:1,sidebar_label:"Configuraci\xf3n de Firestore",title:"Configuraci\xf3n de Firestore en Android"},d=void 0,l={},c=[{value:"\ud83d\udd39 1. Crear un proyecto en Firebase",id:"-1-crear-un-proyecto-en-firebase",level:2},{value:"\ud83d\udd39 2. Habilitar Firestore Database",id:"-2-habilitar-firestore-database",level:2},{value:"Paso 1: Acceder a Firestore en la consola de Firebase",id:"paso-1-acceder-a-firestore-en-la-consola-de-firebase",level:3},{value:"Paso 2: Seleccionar la ubicaci\xf3n de Firestore",id:"paso-2-seleccionar-la-ubicaci\xf3n-de-firestore",level:3},{value:"Paso 3: Elegir el modo de seguridad",id:"paso-3-elegir-el-modo-de-seguridad",level:3},{value:"\ud83d\udd39 3. Agregar Firestore a la app",id:"-3-agregar-firestore-a-la-app",level:2},{value:"Paso 1: Modificar <code>build.gradle</code> (nivel de proyecto)",id:"paso-1-modificar-buildgradle-nivel-de-proyecto",level:3},{value:"Paso 2: Modificar <code>build.gradle</code> (nivel de m\xf3dulo: app)",id:"paso-2-modificar-buildgradle-nivel-de-m\xf3dulo-app",level:3},{value:"Paso 3: Sincronizar el proyecto",id:"paso-3-sincronizar-el-proyecto",level:3},{value:"\ud83d\udd39 4. Configurar permisos y reglas de seguridad",id:"-4-configurar-permisos-y-reglas-de-seguridad",level:2},{value:"Paso 1: Acceder a las reglas en la consola de Firebase",id:"paso-1-acceder-a-las-reglas-en-la-consola-de-firebase",level:3},{value:"Paso 2: Configurar reglas de acceso",id:"paso-2-configurar-reglas-de-acceso",level:3},{value:"\ud83d\udd10 <strong>Reglas de seguridad b\xe1sicas (Modo abierto - solo para pruebas)</strong>",id:"-reglas-de-seguridad-b\xe1sicas-modo-abierto---solo-para-pruebas",level:4},{value:"\ud83d\udd10 <strong>Reglas seguras con autenticaci\xf3n (Recomendado)</strong>",id:"-reglas-seguras-con-autenticaci\xf3n-recomendado",level:4},{value:"\ud83d\udd10 <strong>Reglas para una colecci\xf3n espec\xedfica (Ejemplo: pedidos de un usuario)</strong>",id:"-reglas-para-una-colecci\xf3n-espec\xedfica-ejemplo-pedidos-de-un-usuario",level:4}];function t(e){const r={a:"a",br:"br",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)("div",{class:"justify-text",children:[(0,i.jsxs)(r.p,{children:["Antes de poder utilizar ",(0,i.jsx)(r.strong,{children:"Cloud Firestore"})," en una aplicaci\xf3n Android, es necesario configurar correctamente Firebase en el proyecto. En este apartado veremos los pasos detallados para:"]}),(0,i.jsxs)(r.p,{children:["1\ufe0f\u20e3 Crear un proyecto en Firebase",(0,i.jsx)(r.br,{}),"\n","2\ufe0f\u20e3 Habilitar Firestore Database",(0,i.jsx)(r.br,{}),"\n","3\ufe0f\u20e3 Agregar Firestore a la app Android",(0,i.jsx)(r.br,{}),"\n","4\ufe0f\u20e3 Configurar permisos y reglas de seguridad"]}),(0,i.jsx)(r.hr,{}),(0,i.jsx)(r.h2,{id:"-1-crear-un-proyecto-en-firebase",children:"\ud83d\udd39 1. Crear un proyecto en Firebase"}),(0,i.jsxs)(r.p,{children:["Para comenzar, sigue los mismos pasos que cuando estudiamos ",(0,i.jsx)(r.em,{children:"Authentication"}),", es decir, accede a la consola de Firebase, crea un proyecto nuevo y realiza la configuraci\xf3n b\xe1sica que indica el asistente. Finalmente, descarga el archivo ",(0,i.jsx)(r.code,{children:"google-services.json"})," y p\xe9galo en la carpeta ",(0,i.jsx)(r.code,{children:"app"})," de tu proyecto."]}),(0,i.jsx)(r.hr,{}),(0,i.jsx)(r.h2,{id:"-2-habilitar-firestore-database",children:"\ud83d\udd39 2. Habilitar Firestore Database"}),(0,i.jsxs)(r.p,{children:["Una vez creado el proyecto en Firebase, es necesario ",(0,i.jsx)(r.strong,{children:"habilitar Firestore"})," para que la aplicaci\xf3n pueda interactuar con la base de datos."]}),(0,i.jsx)(r.h3,{id:"paso-1-acceder-a-firestore-en-la-consola-de-firebase",children:"Paso 1: Acceder a Firestore en la consola de Firebase"}),(0,i.jsxs)(r.ol,{children:["\n",(0,i.jsxs)(r.li,{children:["En la ",(0,i.jsx)(r.a,{href:"https://console.firebase.google.com/",children:"Consola de Firebase"}),", selecciona tu proyecto."]}),"\n",(0,i.jsxs)(r.li,{children:["En el men\xfa lateral, haz clic en ",(0,i.jsx)(r.strong,{children:'"Firestore Database"'}),"."]}),"\n"]}),(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.img,{alt:"Iniciar Firestore",src:a(4640).A+"",width:"486",height:"1104"}),"\n3. Pulsa el bot\xf3n ",(0,i.jsx)(r.strong,{children:'"Crear Base de Datos"'}),"."]}),(0,i.jsx)(r.h3,{id:"paso-2-seleccionar-la-ubicaci\xf3n-de-firestore",children:"Paso 2: Seleccionar la ubicaci\xf3n de Firestore"}),(0,i.jsxs)(r.ol,{children:["\n",(0,i.jsxs)(r.li,{children:["Firebase te pedir\xe1 que selecciones la ",(0,i.jsx)(r.strong,{children:"regi\xf3n"})," donde se almacenar\xe1n los datos."]}),"\n",(0,i.jsxs)(r.li,{children:["Se recomienda elegir una ubicaci\xf3n cercana a la mayor\xeda de tus usuarios para mejorar el rendimiento.",(0,i.jsx)(r.br,{}),"\n",(0,i.jsx)(r.img,{alt:"Ubicaci\xf3n Firestore",src:a(8684).A+"",width:"1658",height:"990"})]}),"\n"]}),(0,i.jsx)(r.h3,{id:"paso-3-elegir-el-modo-de-seguridad",children:"Paso 3: Elegir el modo de seguridad"}),(0,i.jsx)(r.p,{children:"Firebase te preguntar\xe1 c\xf3mo deseas configurar la seguridad inicial de Firestore. Hay dos opciones:"}),(0,i.jsxs)(r.ol,{children:["\n",(0,i.jsxs)(r.li,{children:["\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Modo de prueba (recomendado para desarrollo)"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"Permite acceso libre a la base de datos, sin autenticaci\xf3n."}),"\n",(0,i.jsx)(r.li,{children:"Selecciona esta opci\xf3n si solo est\xe1s probando Firestore (nuestro caso)."}),"\n",(0,i.jsx)(r.li,{children:"Las reglas se ver\xe1n as\xed:"}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-json",children:"rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}\n"})}),"\n"]}),"\n",(0,i.jsxs)(r.li,{children:["\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Modo bloqueado (recomendado para producci\xf3n)"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"Solo permite el acceso a usuarios autenticados o seg\xfan reglas espec\xedficas."}),"\n",(0,i.jsx)(r.li,{children:"Se recomienda para aplicaciones en producci\xf3n."}),"\n"]}),"\n"]}),"\n"]}),(0,i.jsxs)(r.p,{children:["\ud83d\udccc ",(0,i.jsx)(r.strong,{children:"Ahora Firestore est\xe1 activado y listo para usarse en tu app Android."})]}),(0,i.jsx)(r.hr,{}),(0,i.jsx)(r.h2,{id:"-3-agregar-firestore-a-la-app",children:"\ud83d\udd39 3. Agregar Firestore a la app"}),(0,i.jsxs)(r.h3,{id:"paso-1-modificar-buildgradle-nivel-de-proyecto",children:["Paso 1: Modificar ",(0,i.jsx)(r.code,{children:"build.gradle"})," (nivel de proyecto)"]}),(0,i.jsxs)(r.p,{children:["Abre el archivo ",(0,i.jsxs)(r.strong,{children:[(0,i.jsx)(r.code,{children:"build.gradle"})," (Proyecto: DemoFirestore)"]})," y aseg\xfarate de que tengas el siguiente bloque en ",(0,i.jsx)(r.code,{children:"plugins"}),":"]}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-gradle",children:'plugins {\n    ...\n\n    // Add the dependency for the Google services Gradle plugin\n    id("com.google.gms.google-services") version "4.4.2" apply false\n}\n'})}),(0,i.jsxs)(r.h3,{id:"paso-2-modificar-buildgradle-nivel-de-m\xf3dulo-app",children:["Paso 2: Modificar ",(0,i.jsx)(r.code,{children:"build.gradle"})," (nivel de m\xf3dulo: app)"]}),(0,i.jsxs)(r.p,{children:["Abre el archivo ",(0,i.jsxs)(r.strong,{children:[(0,i.jsx)(r.code,{children:"build.gradle"})," (M\xf3dulo: app)"]})," y agrega las siguientes dependencias dentro de ",(0,i.jsx)(r.code,{children:"dependencies"}),":"]}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-gradle",children:'// Firebase BoM (Bill of Materials) para gestionar versiones autom\xe1ticamente\nimplementation(platform("com.google.firebase:firebase-bom:33.8.0"))\n\n// Dependencia de Firestore\nimplementation("com.google.firebase:firebase-firestore")\n'})}),(0,i.jsx)(r.p,{children:"Luego, en la parte superior del archivo, aseg\xfarate de aplicar el plugin de Google Services:"}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-gradle",children:'plugins {\n    ...\n    id("com.google.gms.google-services")\n}\n'})}),(0,i.jsx)(r.h3,{id:"paso-3-sincronizar-el-proyecto",children:"Paso 3: Sincronizar el proyecto"}),(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["Guarda los cambios y haz clic en ",(0,i.jsx)(r.strong,{children:'"Sync Now"'})," en la parte superior de Android Studio."]}),"\n",(0,i.jsx)(r.li,{children:"Aseg\xfarate de que la sincronizaci\xf3n se realice sin errores."}),"\n"]}),(0,i.jsx)(r.hr,{}),(0,i.jsx)(r.h2,{id:"-4-configurar-permisos-y-reglas-de-seguridad",children:"\ud83d\udd39 4. Configurar permisos y reglas de seguridad"}),(0,i.jsxs)(r.p,{children:["Firestore permite definir ",(0,i.jsx)(r.strong,{children:"reglas de seguridad"})," para controlar qui\xe9n puede leer y escribir en la base de datos. Ya las configuramos al crear la base de datos pero aqu\xed se explican brevemente por si necesitas aplicarlas en tus proyectos. Nosotros de momento dejaremos la base de datos abierta a cualquiera."]}),(0,i.jsx)(r.h3,{id:"paso-1-acceder-a-las-reglas-en-la-consola-de-firebase",children:"Paso 1: Acceder a las reglas en la consola de Firebase"}),(0,i.jsxs)(r.ol,{children:["\n",(0,i.jsxs)(r.li,{children:["Ve a la ",(0,i.jsx)(r.strong,{children:"Consola de Firebase"}),"."]}),"\n",(0,i.jsxs)(r.li,{children:["En la barra lateral, selecciona ",(0,i.jsx)(r.strong,{children:'"Firestore Database"'}),"."]}),"\n",(0,i.jsxs)(r.li,{children:["Haz clic en ",(0,i.jsx)(r.strong,{children:'"Reglas"'}),"."]}),"\n"]}),(0,i.jsx)(r.h3,{id:"paso-2-configurar-reglas-de-acceso",children:"Paso 2: Configurar reglas de acceso"}),(0,i.jsxs)(r.h4,{id:"-reglas-de-seguridad-b\xe1sicas-modo-abierto---solo-para-pruebas",children:["\ud83d\udd10 ",(0,i.jsx)(r.strong,{children:"Reglas de seguridad b\xe1sicas (Modo abierto - solo para pruebas)"})]}),(0,i.jsxs)(r.p,{children:["Si solo quieres permitir ",(0,i.jsx)(r.strong,{children:"lectura y escritura para todos"})," (no recomendado en producci\xf3n):"]}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-json",children:"rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}\n"})}),(0,i.jsxs)(r.p,{children:["\ud83d\udea8 ",(0,i.jsx)(r.strong,{children:"\xa1Cuidado!"})," Esta configuraci\xf3n permite que cualquiera pueda leer y escribir datos. Solo \xfasala en desarrollo."]}),(0,i.jsxs)(r.h4,{id:"-reglas-seguras-con-autenticaci\xf3n-recomendado",children:["\ud83d\udd10 ",(0,i.jsx)(r.strong,{children:"Reglas seguras con autenticaci\xf3n (Recomendado)"})]}),(0,i.jsx)(r.p,{children:"Para permitir acceso solo a usuarios autenticados con Firebase Authentication:"}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-json",children:"rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /users/{userId} {\n      allow read, write: if request.auth != null && request.auth.uid == userId;\n    }\n  }\n}\n"})}),(0,i.jsxs)(r.p,{children:["\ud83d\udd39 ",(0,i.jsx)(r.strong,{children:"Explicaci\xf3n:"})]}),(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["Solo los usuarios autenticados (",(0,i.jsx)(r.code,{children:"request.auth != null"}),") pueden acceder."]}),"\n",(0,i.jsxs)(r.li,{children:["Un usuario solo puede acceder a sus propios documentos (",(0,i.jsx)(r.code,{children:"request.auth.uid == userId"}),")."]}),"\n"]}),(0,i.jsxs)(r.h4,{id:"-reglas-para-una-colecci\xf3n-espec\xedfica-ejemplo-pedidos-de-un-usuario",children:["\ud83d\udd10 ",(0,i.jsx)(r.strong,{children:"Reglas para una colecci\xf3n espec\xedfica (Ejemplo: pedidos de un usuario)"})]}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-json",children:"rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /orders/{orderId} {\n      allow read, write: if request.auth != null;\n    }\n  }\n}\n"})}),(0,i.jsxs)(r.p,{children:["\ud83d\udd39 ",(0,i.jsxs)(r.strong,{children:["Esto significa que solo los usuarios autenticados pueden leer y escribir en la colecci\xf3n ",(0,i.jsx)(r.code,{children:"/orders/"})]}),"."]})]})}function u(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(t,{...e})}):t(e)}},4640:(e,r,a)=>{a.d(r,{A:()=>s});const s=a.p+"assets/images/firestore-menu-4276ccf6202724dfed5c3f7874486f6b.png"},8684:(e,r,a)=>{a.d(r,{A:()=>s});const s=a.p+"assets/images/ubicacion-firestore-c98d5481ddda01aed0bb721716245202.png"},8453:(e,r,a)=>{a.d(r,{R:()=>n,x:()=>d});var s=a(6540);const i={},o=s.createContext(i);function n(e){const r=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:n(e.components),s.createElement(o.Provider,{value:r},e.children)}}}]);