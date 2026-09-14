---
title: "Conceptos teóricos"
sidebar_position: 1
description: "Fundamentos de Firebase Authentication y su integración en aplicaciones Android utilizando email y contraseña, siguiendo una arquitectura MVVM con Repository."
keywords: [Firebase Authentication, Firebase Auth, Android, Login, Registro, Email, Password, MVVM, Repository]
---

**Firebase Authentication** es un servicio de autenticación seguro y fácil de integrar que permite a los usuarios iniciar sesión en una aplicación con diferentes métodos. **Elimina la necesidad de gestionar un backend para la autenticación**, ya que Firebase se encarga de la infraestructura, la seguridad y la validación de credenciales.

---

## Métodos de Autenticación

Firebase Authentication ofrece **5 formas principales** para autenticar usuarios en una aplicación:  

1️⃣ **Autenticación con usuario y contraseña**  
   - Los usuarios se registran e inician sesión con su correo electrónico y una contraseña.  
   - Firebase gestiona el cifrado y almacenamiento de credenciales.  

2️⃣ **Autenticación con OAuth (Google, GitHub, Facebook, Twitter, etc.)**  
   - Permite a los usuarios iniciar sesión con sus cuentas de terceros.  
   - Menos fricción en el registro y más rápido que recordar contraseñas.  

3️⃣ **Autenticación con número de teléfono (OTP vía SMS)**  
   - Se envía un código de verificación SMS al número del usuario.  
   - Ideal para aplicaciones móviles donde los correos electrónicos no son necesarios.  

4️⃣ **Inicio de sesión anónimo**  
   - Permite a los usuarios interactuar con la app sin registrarse.  
   - Más adelante pueden vincular una cuenta permanente sin perder datos.  

5️⃣ **Autenticación con proveedor personalizado**  
   - Se usa cuando necesitas integrar tu propio sistema de autenticación.
   - Más flexible, pero requiere mayor configuración.  

---

## Funcionalidades y Gestión de Usuarios

Firebase Authentication simplifica la **gestión de usuarios** al manejar el **almacenamiento, seguridad y autenticación** sin que necesites configurar servidores propios. A continuación, se describen las principales funcionalidades que ofrece Firebase Authentication.

### 1. Registro y Almacenamiento de Credenciales
Cuando un usuario se registra con **correo y contraseña**, Firebase:  
✔ **Cifra automáticamente la contraseña** antes de almacenarla en su base de datos segura.  
✔ Guarda los datos del usuario en un **backend seguro**, sin que tú necesites una base de datos propia.  
✔ Permite almacenar información adicional del usuario, como nombre, foto de perfil, etc.  

### 2. Verificación de Identidad
Para mejorar la seguridad, Firebase permite:  
✔ **Verificación de correo electrónico**, enviando un enlace al usuario.  
✔ **Protección contra ataques de fuerza bruta**, limitando intentos fallidos de inicio de sesión.  
✔ **Autenticación de dos factores (2FA)** con número de teléfono (requiere configuración adicional).  

### 3. Inicio de Sesión y Validación de Usuarios
Cuando un usuario inicia sesión con **correo y contraseña**, Firebase:  
✔ Verifica las credenciales con su base de datos segura.  
✔ Devuelve un **token de autenticación (JWT)** para que la app lo use en solicitudes seguras.  
✔ Soporta **múltiples sesiones**, lo que permite iniciar sesión en varios dispositivos.  

### 4. Recuperación de Contraseña  
Si un usuario olvida su contraseña, Firebase permite enviar un **correo de restablecimiento** con un enlace seguro.

### 5. Manejo de Sesiones y Cierre de Sesión
Cuando un usuario inicia sesión, Firebase genera un **token JWT** que mantiene la sesión activa hasta que:  
✔ El usuario **cierra sesión** manualmente.  
✔ El token **expira** o se invalida (por cambios en la configuración de seguridad).  
✔ El administrador **revoca la sesión** desde Firebase Console.  

### 6. Administración de Usuarios desde Firebase Console  
Desde la **Firebase Console** puedes:  
✔ **Ver todos los usuarios registrados** en la sección de Authentication.  
✔ **Eliminar usuarios manualmente** si es necesario.  
✔ **Editar información del usuario** (nombre, foto, correo).  
✔ **Desactivar usuarios** sin eliminarlos.  
✔ **Revocar tokens** de usuarios si hay sospecha de actividad no autorizada.  

---

## Principales Métodos de Firebase Authentication en Android  

Para usar **Firebase Authentication** en tu aplicación Android, debes agregar la siguiente dependencia:

```gradle title="build.gradle (Module: app)"
implementation 'com.google.firebase:firebase-auth:21.0.1'
```

Firebase Authentication proporciona diversos métodos para registrar, autenticar y gestionar usuarios. Los más destacados son:

### Inicializar Firebase Authentication
Antes de usar cualquier método, debes obtener una instancia de **FirebaseAuth**:  
```java
FirebaseAuth mAuth = FirebaseAuth.getInstance();
```

### Registrar un Usuario con Correo y Contraseña
Registra un nuevo usuario con su **email y password** en Firebase.  
```java
mAuth.createUserWithEmailAndPassword(email, password)
    .addOnCompleteListener(this, task -> {
        if (task.isSuccessful()) {
            FirebaseUser user = mAuth.getCurrentUser();
            Toast.makeText(MainActivity.this, "Registro exitoso", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(MainActivity.this, "Error en el registro: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
        }
    });
```
📌 **Explicación:**  
✔ Crea un usuario con `email` y `password`.  
✔ Si el registro es exitoso, `getCurrentUser()` obtiene el usuario autenticado.  


### Iniciar Sesión con Correo y Contraseña  
Permite que un usuario ya registrado inicie sesión.  
```java
mAuth.signInWithEmailAndPassword(email, password)
    .addOnCompleteListener(this, task -> {
        if (task.isSuccessful()) {
            Toast.makeText(MainActivity.this, "Inicio de sesión exitoso", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(MainActivity.this, "Error: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
        }
    });
```
📌 **Explicación:**  
✔ Firebase valida el `email` y `password`.  
✔ Si es correcto, la sesión del usuario queda iniciada.  


### Cerrar Sesión
Para salir de la cuenta del usuario autenticado.  
```java
mAuth.signOut();
Toast.makeText(MainActivity.this, "Sesión cerrada", Toast.LENGTH_SHORT).show();
```
📌 **Explicación:**  
✔ `signOut()` elimina la sesión actual y el usuario deberá autenticarse nuevamente.  


### Obtener el Usuario Actual
Si la sesión está activa, Firebase devuelve el usuario autenticado.  
```java
FirebaseUser user = mAuth.getCurrentUser();
if (user != null) {
    String email = user.getEmail();
    Toast.makeText(MainActivity.this, "Usuario: " + email, Toast.LENGTH_SHORT).show();
} else {
    Toast.makeText(MainActivity.this, "No hay sesión activa", Toast.LENGTH_SHORT).show();
}
```
📌 **Explicación:**  
✔ `getCurrentUser()` devuelve el usuario autenticado, o `null` si no hay sesión.  


### Restablecer Contraseña (Enviar Email de Recuperación) 
Si el usuario olvida su contraseña, Firebase puede enviar un correo de restablecimiento.  
```java
mAuth.sendPasswordResetEmail(email)
    .addOnCompleteListener(task -> {
        if (task.isSuccessful()) {
            Toast.makeText(MainActivity.this, "Correo de recuperación enviado", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(MainActivity.this, "Error: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
        }
    });
```
📌 **Explicación:**  
✔ Envía un **correo de recuperación** con un enlace para restablecer la contraseña.  


### Verificar Correo Electrónico
Después del registro, Firebase puede enviar un **email de verificación**.  
```java
FirebaseUser user = mAuth.getCurrentUser();
if (user != null) {
    user.sendEmailVerification()
        .addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                Toast.makeText(MainActivity.this, "Correo de verificación enviado", Toast.LENGTH_SHORT).show();
            }
        });
}
```
📌 **Explicación:**  
✔ Envía un **correo con un enlace** para verificar la cuenta.  
✔ Firebase puede bloquear logins si el correo no ha sido verificado (según la configuración).  

### Eliminar una Cuenta de Usuario  
Permite que el usuario elimine su cuenta.  
```java
FirebaseUser user = mAuth.getCurrentUser();
if (user != null) {
    user.delete()
        .addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                Toast.makeText(MainActivity.this, "Cuenta eliminada", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(MainActivity.this, "Error: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
}
```
📌 **Explicación:**  
✔ `delete()` elimina la cuenta actual de Firebase.  
✔ No se puede eliminar si la cuenta está en uso (requiere nueva autenticación).  

### Autenticación con Google (OAuth)
Para permitir el inicio de sesión con Google, primero hay que **habilitar Google Sign-In en Firebase**. Luego, usa:  

```java
GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
        .requestIdToken(getString(R.string.default_web_client_id))
        .requestEmail()
        .build();

GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(this, gso);

// Llamar al intent de Google Sign-In
Intent signInIntent = googleSignInClient.getSignInIntent();
startActivityForResult(signInIntent, 9001);
```
Luego, maneja la respuesta:
```java
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == 9001) {
        Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
        try {
            GoogleSignInAccount account = task.getResult(ApiException.class);
            firebaseAuthWithGoogle(account);
        } catch (ApiException e) {
            Toast.makeText(this, "Error al iniciar sesión con Google", Toast.LENGTH_SHORT).show();
        }
    }
}

private void firebaseAuthWithGoogle(GoogleSignInAccount account) {
    AuthCredential credential = GoogleAuthProvider.getCredential(account.getIdToken(), null);
    mAuth.signInWithCredential(credential)
        .addOnCompleteListener(this, task -> {
            if (task.isSuccessful()) {
                Toast.makeText(MainActivity.this, "Inicio de sesión con Google exitoso", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(MainActivity.this, "Error: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
}
```
📌 **Explicación:**  
✔ Usa la API de Google para obtener la cuenta del usuario.  
✔ `signInWithCredential()` autentica al usuario en Firebase.  
