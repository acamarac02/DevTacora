---
sidebar_position: 5
sidebar_label: Supabase Storage
title: Supabase Storage
--- 

<div class="justify-text">

## Introducción a Supabase

Supabase es una **plataforma Backend-as-a-Service (BaaS)** **open-source** que ofrece herramientas para construir aplicaciones web y móviles sin necesidad de administrar servidores. Es una alternativa a **Firebase**, pero basada en **tecnologías estándar y de código abierto**, como **PostgreSQL**.  

Supabase proporciona servicios listos para usar, incluyendo:  
- **Base de datos:** PostgreSQL con soporte para consultas en SQL.  
- **Autenticación:** Registro e inicio de sesión con correo, OAuth, SSO y más.  
- **Almacenamiento:** Supabase Storage para gestionar imágenes, archivos y videos.  
- **Funciones Serverless:** API en la base de datos con PostgreSQL Functions.  
- **Realtime:** Notificaciones en tiempo real usando WebSockets.  
- **API REST y GraphQL:** Generación automática de endpoints para acceder a la base de datos.  

Las principales diferencias con Firebase son:

| Característica        | Supabase        | Firebase       |
|----------------------|----------------|---------------|
| **Base de datos**    | PostgreSQL     | Firestore / Realtime Database |
| **Open-source**      | ✅ Sí           | ❌ No |
| **Autenticación**    | Email, OAuth, SSO, Web3 | Email, OAuth, SSO |
| **Reglas de acceso** | SQL (RLS)       | Reglas en JSON |
| **Soporte en tiempo real** | ✅ WebSockets | ✅ Firestore Realtime |
| **Precios**          | Más económico en proyectos grandes | Puede ser más costoso |

:::info ¿POR QUÉ ESTUDIAMOS AHORA SUPABASE SI FIREBASE OFRECE CASI LO MISMO?
Desde hace pocos meses, el servicio **Firebase Storage**, que permite almacenar imágenes, archivos y vídeos ha pasado a ser de pago en ciertos países, incluida España. Por este motivo, aprenderemos a utilizar su versión open-source **Supabase Storage**.
:::

## Introducción a Supabase Storage

Supabase Storage es un servicio de almacenamiento de archivos basado en S3-compatible Object Storage que permite a los desarrolladores **subir, gestionar y servir archivos** como imágenes, videos, documentos y otros tipos de contenido.

Algunas características clave de Supabase Storage incluyen:  
- **Buckets (contenedores de almacenamiento)**: Organización de archivos en espacios dedicados.  
- **Control de acceso** con reglas de seguridad basadas en **Row-Level Security (RLS)** de PostgreSQL.  
- **Soporte para versiones y logs** para gestionar cambios en los archivos.  
- **Compatibilidad con CDN (Content Delivery Network)** para servir archivos rápidamente.  
- **Integración con el sistema de autenticación de Supabase** para manejar permisos de usuario (no obstante, nosotros seguiremos utilizando Firebase Auth como herramienta de autenticación).  


Entre los **casos de uso** más destacados, Supabase Storage es ideal para:  
- **Subir y gestionar imágenes en una app** (ej. perfiles de usuario, publicaciones en redes sociales).  
- **Servir contenido multimedia** como audios, videos o GIFs en aplicaciones web/móviles.   


</div>