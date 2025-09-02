---
sidebar_label: Firestore Database
title: Firestore Database
---

<div class="justify-text">
# Firestore Database
En este tutorial, aprenderemos a usar **Firebase Firestore** en una aplicación Android, cubriendo desde la configuración inicial hasta consultas avanzadas.

---

## Bases de datos en Firebase  
Firebase ofrece dos opciones principales de bases de datos en la nube para el desarrollo de aplicaciones móviles y web: **Firestore** y **Realtime Database**. Ambas permiten almacenar y sincronizar datos en tiempo real, pero tienen diferencias clave en su estructura, funcionamiento y casos de uso.

### 🔹 Firestore  
Firestore es una base de datos NoSQL basada en documentos y colecciones. Sus principales características incluyen:  
- **Estructura flexible**: Los datos se almacenan en documentos dentro de colecciones, lo que facilita la organización y escalabilidad.  
- **Consultas avanzadas**: Soporta filtros, ordenaciones y combinaciones complejas sin necesidad de recuperar toda la base de datos.  
- **Sincronización en tiempo real**: Aunque Firestore no está diseñado exclusivamente para tiempo real, permite el uso de **SnapshotListener** para obtener actualizaciones automáticas.  
- **Escalabilidad y rendimiento**: Maneja automáticamente la indexación y permite consultas eficientes, ideal para grandes volúmenes de datos.  
- **Modo offline**: Permite trabajar sin conexión y sincronizar los cambios cuando el dispositivo se conecta nuevamente.  

### 🔹 Realtime Database  
Realtime Database es una base de datos NoSQL estructurada en forma de árbol JSON, diseñada específicamente para sincronización en tiempo real. Sus características principales son:  
- **Baja latencia**: Perfecta para aplicaciones que requieren actualizaciones instantáneas, como chats en vivo o apps colaborativas.  
- **Estructura basada en nodos**: Los datos se almacenan en un solo árbol JSON anidado, lo que puede complicar las consultas y la organización de datos.  
- **Escalabilidad limitada**: A medida que los datos crecen, las consultas pueden volverse ineficientes y aumentar los costos.  
- **Modo offline**: Similar a Firestore, permite trabajar sin conexión.  

---

### 🔹 Estructura de datos  

Para analizar mejor las diferencias en el modelo de datos de ambas bases de datos, vamos a ver un ejemplo práctico. Supongamos que estamos implementando una aplicación de redes sociales donde los usuarios pueden hacer publicaciones y comentar en ellas.  

#### **1️⃣ Datos en Realtime Database (Estructura en árbol JSON)**  
En **Realtime Database**, los datos se almacenan en un solo árbol JSON. Aquí hay un ejemplo donde los datos de los usuarios, publicaciones y comentarios están organizados:

```json
{
  "users": {
    "user_123": {
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    "user_456": {
      "name": "María Gómez",
      "email": "maria@example.com"
    }
  },
  "posts": {
    "post_789": {
      "userId": "user_123",
      "content": "¡Hola, mundo!",
      "timestamp": 1707551200,
      "comments": {
        "comment_1": {
          "userId": "user_456",
          "text": "¡Genial post!",
          "timestamp": 1707551300
        }
      }
    }
  }
}
```

✅ **Pros de esta estructura en Realtime Database**:  
- Es fácil acceder a los datos con rutas directas (`/posts/post_789/comments/comment_1`).  
- La sincronización en tiempo real es sencilla y rápida.  

❌ **Contras**:  
- Los datos están anidados, lo que puede causar problemas al escalar (cargar un post trae consigo todos sus comentarios).  
- No permite consultas avanzadas (por ejemplo, no se pueden filtrar posts por fecha sin traer todo el nodo `posts`).  

#### **2️⃣ Datos en Firestore (Estructura basada en documentos y colecciones)**  
Firestore usa una estructura jerárquica con **colecciones** y **documentos**, lo que permite separar las relaciones y mejorar la escalabilidad. El mismo conjunto de datos en Firestore se organizaría así:

📂 **Colección: users/**  
📄 `user_123`
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```
📄 `user_456`
```json
{
  "name": "María Gómez",
  "email": "maria@example.com"
}
```

📂 **Colección: posts/**  
📄 `post_789`
```json
{
  "userId": "user_123",
  "content": "¡Hola, mundo!",
  "timestamp": 1707551200
}
```

📂 **Subcolección dentro del post: posts/post_789/comments/**  
📄 `comment_1`
```json
{
  "userId": "user_456",
  "text": "¡Genial post!",
  "timestamp": 1707551300
}
```

✅ **Pros de esta estructura en Firestore**:  
- **Escalabilidad y eficiencia**: No se cargan todos los comentarios cuando se consulta un post. Se pueden traer solo los necesarios.  
- **Consultas avanzadas**: Se pueden hacer filtros, ordenar por fecha, paginar resultados, etc.  
- **Estructura flexible**: Se pueden agregar más relaciones sin modificar la estructura base.  

❌ **Contras**:  
- Más escritura y lecturas separadas (por ejemplo, obtener un post y luego traer sus comentarios requiere dos consultas).  
- Sincronización en tiempo real menos eficiente si se compara con Realtime Database (pero sigue siendo buena con `SnapshotListener`).  

---

### 🔹 Cuadro resumen de diferencias 

| Característica          | Firestore 🟠 | Realtime Database 🟢 |
|------------------------|-------------|--------------------|
| **Estructura**         | Basada en documentos y colecciones | Basada en un árbol JSON |
| **Consultas**         | Avanzadas, permite filtrar y ordenar por múltiples campos | Limitadas, requiere cargar grandes conjuntos de datos |
| **Tiempo real**       | Sí, pero optimizado para consultas eficientes | Sí, con latencia muy baja |
| **Escalabilidad**     | Alta, con indexación automática | Menos escalable, puede volverse ineficiente con datos grandes |
| **Modo offline**      | Compatible en Android, iOS y Web | Compatible en Android, iOS y Web |
| **Seguridad**        | Reglas detalladas por documento y colección | Reglas basadas en nodos JSON |


### 💡 ¿Cuál elegir?  
- 🔥 **Usa Firestore** si necesitas consultas avanzadas, mejor escalabilidad y una estructura flexible.  
- ⚡ **Usa Realtime Database** si la prioridad es la sincronización ultra rápida en tiempo real y la estructura en JSON no es un problema.  

---

## Estructura de Firestore

El modelo de datos de Firestore es jerárquico, lo que permite estructurar la información de manera eficiente, facilitando consultas avanzadas y manteniendo la escalabilidad.   

### Documentos y Colecciones  

Firestore organiza los datos en **colecciones** y **documentos**, en lugar de utilizar tablas como en una base de datos relacional. Ambas tienen el mismo significado que ya hemos estado en MongoDB.

- **Colección:** Un conjunto de documentos similares.  
- **Documento:** Una unidad de almacenamiento de datos en formato clave-valor dentro de una colección, donde las claves representan los nombres de los campos.

📌 **Ejemplo: Base de datos de un sistema de gestión de pedidos**  

```plaintext
/orders (colección)
   ├── order_001 (documento)
   │      ├── customerName: "Juan Pérez"
   │      ├── total: 59.99
   │      ├── status: "En proceso"
   │      ├── items: [ "Pizza", "Refresco", "Postre" ]
   │      ├── orderDate: 1707551200
   │
   ├── order_002 (documento)
   │      ├── customerName: "Ana Gómez"
   │      ├── total: 35.50
   │      ├── status: "Entregado"
   │      ├── items: [ "Hamburguesa", "Papas" ]
   │      ├── orderDate: 1707551500
```

En este ejemplo:  
✅ La colección **"orders"** contiene múltiples documentos, cada uno representando un pedido.  
✅ Cada **documento** tiene campos como `customerName`, `total`, `status`, etc.  
✅ La información de cada pedido está encapsulada en su respectivo documento.  

---

### Subcolecciones

Firestore permite organizar los datos en **subcolecciones**, que son colecciones dentro de un documento. Esto ayuda a estructurar mejor la información y permite relaciones más flexibles.  

📌 **Ejemplo: Gestión de usuarios con sus pedidos**  

```plaintext
/users (colección)
   ├── user_123 (documento)
   │      ├── name: "Carlos López"
   │      ├── email: "carlos@example.com"
   │      ├── phone: "555-1234"
   │      ├── address: "Av. Principal 123"
   │
   │      /orders (subcolección)
   │           ├── order_001 (documento)
   │           │      ├── total: 50.99
   │           │      ├── status: "En proceso"
   │           │      ├── items: [ "Laptop", "Mouse" ]
   │           │      ├── orderDate: 1707551200
   │
   │           ├── order_002 (documento)
   │           │      ├── total: 99.50
   │           │      ├── status: "Entregado"
   │           │      ├── items: [ "Monitor", "Teclado" ]
   │           │      ├── orderDate: 1707551500
   │
   ├── user_456 (documento)
   │      ├── name: "María Gómez"
   │      ├── email: "maria@example.com"
   │      ├── phone: "555-5678"
   │
   │      /orders (subcolección)
   │           ├── order_003 (documento)
   │           │      ├── total: 20.99
   │           │      ├── status: "Cancelado"
   │           │      ├── items: [ "Audífonos" ]
   │           │      ├── orderDate: 1707551600
```

📌 **Explicación de la estructura:**  
- `/users` es una colección que almacena documentos de usuarios.  
- Cada usuario (`user_123`, `user_456`, etc.) tiene un **documento** con su información básica.  
- Dentro de cada documento de usuario, hay una **subcolección** `/orders`, que almacena los pedidos del usuario.  
- Cada pedido es un **documento** dentro de la subcolección `/orders`. 

📌 **No obstante, ten en cuenta que:**  
- **Esta estructura es útil si los pedidos siempre se consultan desde el usuario**.  
  - Por ejemplo, si quieres obtener todos los pedidos de `user_123`, puedes hacer una consulta directa a la subcolección `/users/user_123/orders`.  
- **No es la mejor opción si necesitas consultar pedidos globalmente**.  
  - Si deseas listar **todos los pedidos** sin importar el usuario, tendrías que recorrer cada usuario y su subcolección `/orders`, lo cual no es eficiente.  


#### 📌 **Solución alternativa si necesitas consultar pedidos globalmente**
Si necesitas **consultar los pedidos de forma independiente del usuario**, una mejor opción sería mover los pedidos a una colección principal `/orders`, utilizando una **referencia al usuario** en lugar de una subcolección.

```plaintext
/orders (colección)
   ├── order_001 (documento)
   │      ├── userId: "user_123"
   │      ├── total: 50.99
   │      ├── status: "En proceso"
   │      ├── items: [ "Laptop", "Mouse" ]
   │      ├── orderDate: 1707551200
   │
   ├── order_002 (documento)
   │      ├── userId: "user_123"
   │      ├── total: 99.50
   │      ├── status: "Entregado"
   │      ├── items: [ "Monitor", "Teclado" ]
   │      ├── orderDate: 1707551500
   │
   ├── order_003 (documento)
   │      ├── userId: "user_456"
   │      ├── total: 20.99
   │      ├── status: "Cancelado"
   │      ├── items: [ "Audífonos" ]
   │      ├── orderDate: 1707551600

/users (colección)
   ├── user_123 (documento)
   │      ├── name: "Carlos López"
   │      ├── email: "carlos@example.com"
   │      ├── phone: "555-1234"
   │      ├── address: "Av. Principal 123"
   │
   ├── user_456 (documento)
   │      ├── name: "María Gómez"
   │      ├── email: "maria@example.com"
   │      ├── phone: "555-5678"
```

:::warning IMPORTANCIA CASOS DE USO
Al igual que en el modelado de bases de datos en MongoDB, es fundamental considerar los casos de uso al diseñar nuestra estructura en Firestore. La forma en que modelamos las relaciones dependerá de cómo se acceda y consulte la información en la aplicación.
:::


### Referencias

También se pueden almacenar **referencias a otros documentos** en lugar de duplicar datos.  

📌 **Ejemplo:** En vez de incluir toda la información de los items incluidos en un pedido, podemos almacenar una **referencia** al producto.

```plaintext
/users (colección)
   ├── user_123 (documento)
   │      ├── name: "Carlos López"
   │      ├── email: "carlos@example.com"
   │      ├── phone: "555-1234"
   │      ├── address: "Av. Principal 123"
   │
   │      /orders (subcolección)
   │           ├── order_001 (documento)
   │           │      ├── total: 50.99
   │           │      ├── status: "En proceso"
   │           │      ├── items: [ "/items/item_001", "/items/item_002" ]
   │           │      ├── orderDate: 1707551200
   │
   │           ├── order_002 (documento)
   │           │      ├── total: 99.50
   │           │      ├── status: "Entregado"
   │           │      ├── items: [ "/items/item_003", "/items/item_004" ]
   │           │      ├── orderDate: 1707551500
   │
   ├── user_456 (documento)
   │      ├── name: "María Gómez"
   │      ├── email: "maria@example.com"
   │      ├── phone: "555-5678"
   │
   │      /orders (subcolección)
   │           ├── order_003 (documento)
   │           │      ├── total: 20.99
   │           │      ├── status: "Cancelado"
   │           │      ├── items: [ "/items/item_005" ]
   │           │      ├── orderDate: 1707551600

/items (colección)
   ├── item_001 (documento)
   │      ├── name: "Laptop"
   │      ├── price: 800.00
   │      ├── category: "Electrónica"
   │      ├── stock: 10
   │
   ├── item_002 (documento)
   │      ├── name: "Mouse"
   │      ├── price: 25.00
   │      ├── category: "Accesorios"
   │      ├── stock: 50
   │
   ├── item_003 (documento)
   │      ├── name: "Monitor"
   │      ├── price: 150.00
   │      ├── category: "Electrónica"
   │      ├── stock: 20
   │
   ├── item_004 (documento)
   │      ├── name: "Teclado"
   │      ├── price: 40.00
   │      ├── category: "Accesorios"
   │      ├── stock: 30
   │
   ├── item_005 (documento)
   │      ├── name: "Audífonos"
   │      ├── price: 35.00
   │      ├── category: "Audio"
   │      ├── stock: 15
```

📌 **Ventajas de usar referencias en lugar de duplicar datos:**  
- Evita la redundancia de datos.  
- Permite actualizar información de los productos en un solo lugar.   

### ¿Cuándo usar subcolecciones y cuándo referencias?
Decidir entre **usar subcolecciones** o **referencias** en Firestore depende de varios factores, como la frecuencia de acceso, el tamaño de los datos y el rendimiento de las consultas. Aquí te dejo una guía práctica para tomar la mejor decisión.  

#### 📌 **¿Cuándo usar una subcolección en Firestore?**   

Usa subcolecciones cuando:  
- Los datos relacionados son dependientes y pueden crecer en número (Ejemplo: comentarios en un post, pedidos de un usuario).  
- Los datos que se almacenan en la subcolección no tienen relación con otras colecciones (excepto la colección padre).
- No siempre necesitas cargar los datos relacionados (Ejemplo: en una app de redes sociales, cargar un post sin cargar sus comentarios).


#### 📌 **¿Cuándo usar referencias en Firestore?**  

Usa referencias cuando:  
- Los datos son reutilizables y compartidos entre múltiples documentos (Ejemplo: una mismo producto se puede pedir en varias pedidos).  
- No quieres duplicar información (Ejemplo: si un usuario está en múltiples grupos, se usa una referencia en lugar de copiar toda la info).  
- Necesitas acceder a los datos relacionados desde distintos lugares de la base de datos.  


#### 📌 **Resumen: ¿Subcolección o Referencia?**  

1. Si los datos son dependientes y deben consultarse juntos (casi siempre) → Usa subcolecciones.  
2. Si los datos pueden reutilizarse en múltiples lugares → Usa referencias.  
3. Si la relación es "uno a muchos" → Subcolección.  
4. Si la relación es "muchos a muchos" → Referencias.  

#### 📌 **Ejemplo práctico de comparación**  

**Caso 1: Un blog con comentarios en los posts**  
📌 Mejor opción: Subcolección  
🔹 Porque los comentarios pertenecen a un solo post y se acceden juntos.  
🔹 No tiene sentido duplicar comentarios en distintos lugares.  

```plaintext
/posts (colección)
   ├── post_123 (documento)
   │      ├── title: "Firestore vs Realtime Database"
   │
   │      /comments (subcolección)
   │           ├── comment_001 (documento)
   │           │      ├── user: "Carlos"
   │           │      ├── text: "¡Buen artículo!"
   │           │      ├── date: 1707551200
```

**Caso 2: Un marketplace con usuarios y productos comprados**  
📌 Mejor opción: Referencia  
🔹 Porque un usuario puede comprar múltiples productos, y un mismo producto puede ser comprado por varios usuarios.  
🔹 Se puede acceder a los productos sin necesidad de cargar información del usuario.  

```plaintext
/users (colección)
   ├── user_123 (documento)
   │      ├── name: "Carlos López"
   │      ├── purchasedProducts: [ "/products/product_456", "/products/product_789" ]

/products (colección)
   ├── product_456 (documento)
   │      ├── name: "Laptop"
   │      ├── price: 899.99
   │
   ├── product_789 (documento)
   │      ├── name: "Mouse inalámbrico"
   │      ├── price: 29.99
```

---

### Buenas Prácticas al Diseñar la Estructura de tus Bases de Datos en Firestore  

✅ **Usar colecciones para agrupar documentos similares:** No almacenes datos sin estructura clara.  
✅ **Evitar anidación excesiva de subcolecciones:** Aunque Firestore permite subcolecciones dentro de documentos, demasiada anidación puede hacer más difíciles las consultas.  
✅ **Utilizar referencias en lugar de duplicar datos:** Usa referencias a documentos en lugar de repetir información en múltiples lugares.  
✅ **Optimizar las consultas con índices:** Firestore indexa automáticamente, pero algunas consultas avanzadas requieren crear índices manualmente.  
✅ **Pensar en cómo se consultarán los datos:** La estructura de Firestore debe diseñarse pensando en las consultas que se harán con mayor frecuencia.  

</div>