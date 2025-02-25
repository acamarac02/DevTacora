---
sidebar_position: 1
sidebar_label: Arquitectura y Seguridad
title: Arquitectura y Seguridad de Supabase Storage
---

<div class="justify-text">

## Arquitectura y Organización de Supabase Storage

Supabase Storage está diseñado para gestionar archivos de manera eficiente, proporcionando almacenamiento en la nube con control de acceso flexible. En este apartado, exploraremos cómo organizar los archivos dentro de un **bucket**, cómo se estructuran las **rutas de archivos** y la diferencia entre **URLs públicas y privadas**.

---

### Buckets: qué son y cómo usarlos  

Un **bucket** es un contenedor donde se almacenan archivos dentro de Supabase Storage. Funciona de manera similar a una carpeta en la nube y cada proyecto en Supabase puede tener múltiples buckets, cada uno con sus propias reglas de acceso.  

**Ejemplo de buckets en un proyecto Supabase**:  
```
/anuncios (Público)  
  ├── imagen1.jpg  
  ├── imagen2.jpg  

/perfiles (Privado)  
  ├── usuario_123.jpg  
  ├── usuario_456.jpg  
```
---

### Organización de archivos dentro de un bucket  

Dentro de un bucket, los archivos se organizan en una **estructura jerárquica** similar a un sistema de archivos. Puedes crear carpetas para categorizar los archivos y mantener un orden lógico.

**Ejemplo de organización en un bucket `anuncios`**:  
```
/anuncios  
  ├── usuario_123  
  │      ├── imagen1.jpg  
  │      ├── imagen2.jpg  
  ├── usuario_456  
  │      ├── imagen3.jpg  
  │      ├── imagen4.jpg  
```
🔹 **Beneficios de organizar los archivos por carpetas**:  
✅ Facilita la búsqueda y recuperación de archivos.  
✅ Permite aplicar reglas de acceso diferentes por carpeta.  
✅ Reduce conflictos de nombres entre archivos de distintos usuarios.

---

### Rutas y URLs públicas y privadas  

Cada archivo en Supabase Storage tiene una **ruta única** dentro de su bucket y, dependiendo de la configuración del bucket, puede tener una **URL pública** o requerir autenticación para acceder.

#### 🔹 **Ejemplo de ruta interna en un bucket (`anuncios`)**:
```
/anuncios/usuario_123/imagen1.jpg
```

#### 🔹 **Ejemplo de URL pública** (si el bucket es público):
```
https://<tu-proyecto>.supabase.co/storage/v1/object/public/anuncios/usuario_123/imagen1.jpg
```
👉 Cualquiera puede acceder a esta URL sin autenticación.

#### 🔹 **Ejemplo de URL privada** (si el bucket es privado):  
```
https://<tu-proyecto>.supabase.co/storage/v1/object/anuncios/usuario_123/imagen1.jpg
```
👉 No accesible directamente. Se necesita un token de acceso para verla.  

⚠️ **Nota:** Si un bucket es privado, se deben usar **tokens de acceso temporales** o autenticación para acceder a los archivos. Esto se explica en el siguiente apartado.

---

## Configuración de Seguridad y Reglas de Acceso  

La seguridad en **Supabase Storage** se gestiona mediante **Row Level Security (RLS)**, que define quién puede leer, escribir o eliminar archivos. Es fundamental configurar correctamente estas reglas para evitar accesos no autorizados.

---

### Definir Políticas RLS (Row Level Security)  

Las **políticas RLS** controlan el acceso a los archivos de un bucket. Sin una política definida, Supabase **bloqueará todas las operaciones por defecto**. Para modificar esto, debemos crear reglas en SQL.

🔹 **Ejemplo de política para permitir a los usuarios autenticados subir archivos**:
```sql
CREATE POLICY "permitir usuarios autenticados subir archivos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');
```
🔹 **Ejemplo de política para permitir a los usuarios autenticados leer archivos**:
```sql
CREATE POLICY "permitir usuarios autenticados leer archivos"
ON storage.objects
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');
```

---

### Buckets Públicos vs Privados  

| 🔹 Característica  | 🔓 Público  | 🔒 Privado |
|--------------------|------------|------------|
| **Acceso sin autenticación** | ✅ Sí | ❌ No |
| **Ideal para...** | Imágenes accesibles para todos (ej. imágenes de productos) | Archivos sensibles (ej. fotos de perfil privadas) |
| **Requiere reglas RLS** | ❌ No | ✅ Sí |
| **Genera URL de acceso directo** | ✅ Sí | ❌ No |

:::info ¿Cuándo usar cada tipo?  
✅ **Usa buckets públicos** si los archivos deben ser accesibles sin autenticación, como imágenes de productos o fondos de una web.  
✅ **Usa buckets privados** si los archivos deben ser protegidos, como documentos privados o fotos de perfil de usuarios.
:::


</div>