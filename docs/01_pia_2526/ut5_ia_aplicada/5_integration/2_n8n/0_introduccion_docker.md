---
title: Introducción a Docker
sidebar_position: 0
description: Conceptos básicos de contenedores Docker para desplegar herramientas de IA.
---

Seguro que alguna vez has escuchado (o dicho) la famosa frase: *"En mi ordenador funciona"*. Esto ocurre porque cada equipo tiene versiones de Python, librerías o sistemas operativos diferentes. 

Para solucionar este caos de raíz y desplegar aplicaciones de forma idéntica en cualquier lugar, utilizamos **Docker**.

## ¿Qué es Docker?

Imagina que quieres enviar un mueble frágil a la otra punta del mundo. En lugar de mandarlo suelto, lo metes en un **contenedor marítimo estándar**. No importa qué barco lo transporte, el contenedor protege el contenido y asegura que llegue intacto.

Docker hace exactamente eso con el software. Empaqueta tu código, tus librerías y tus configuraciones dentro de un "contenedor virtual" para que se ejecute igual en Windows, macOS o Linux.

## ¿Por qué es vital en proyectos de Inteligencia Artificial?

Las aplicaciones de IA suelen tener dependencias muy complejas y pesadas (versiones exactas de PyTorch, drivers de GPU, bases de datos vectoriales...). Instalar todo eso a mano en cada máquina es una pesadilla. Con Docker, levantar una herramienta completa como **n8n** o una base de datos requiere un único comando.

---

## Conceptos Clave (Sin rodeos)

Para empezar a moverte con Docker, solo necesitas tener claros tres términos:

*   **Imagen**: Es la "receta" o plantilla de tu aplicación. Contiene todo el software necesario listo para ejecutarse, pero está "congelado".
*   **Contenedor**: Es la imagen cobrando vida. Cuando ejecutas una imagen, se crea un contenedor (un proceso aislado en tu ordenador donde corre el programa). Puedes crear muchos contenedores a partir de una misma imagen.
*   **Docker Hub**: Es una tienda pública (como Google Play o App Store) donde los desarrolladores comparten sus imágenes oficiales (Python, n8n, PostgreSQL...).

---

## Comandos Esenciales que vas a usar

Aunque utilices la interfaz gráfica de **Docker Desktop**, tarde o temprano tirarás de terminal. Estos son los comandos que te salvarán la vida:

### Descargar y ejecutar un contenedor

```bash
docker run -d -p 8080:80 --name mi_servidor nginx
```
*   `-d` (*detached*): Corre el contenedor en segundo plano (no bloquea la terminal).
*   `-p 8080:80`: Mapea los puertos. Hace que el puerto `80` interno del contenedor sea accesible desde el puerto `8080` de tu navegador (`http://localhost:8080`).
*   `--name`: Le asigna un nombre amigable al contenedor.
*   `nginx`: El nombre de la imagen oficial que queremos descargar.

### Ver qué contenedores están corriendo

```bash
docker ps
```
*(Añade `-a` al final para ver también los contenedores que se han detenido).*

### Detener o eliminar contenedores

```bash
docker stop mi_servidor
docker rm mi_servidor
```

:::tip[Consejo de oro]
Si instalas **Docker Desktop** en tu equipo, dispondrás de una interfaz visual muy intuitiva desde la cual podrás encender, apagar y monitorizar tus contenedores haciendo un simple clic, sin necesidad de recordar comandos complejos.
:::
