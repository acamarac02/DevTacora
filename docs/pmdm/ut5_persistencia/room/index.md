---
sidebar_position: 2
sidebar_label: Room
title: Room
---

<div class="justify-text">
A lo largo del tema vamos a desarrollar una aplicación que gestione un conjunto de animales almacenados en una base de datos local. Como siempre, vamos a implementar la **arquitectura MVVM**.

![UT5. GIF resumen de la aplicación](/img/pmdm/ut5/9-resumen-app.gif)

Cuando se inicie la aplicación, se solicitará a la base de datos la lista de animales para cargarlos en el RecyclerView. Todo ello, implicará el desarrollo de la siguiente arquitectura:

![UT5. Diagrama de secuencia del flujo de datos entre las clases](/img/pmdm/ut5/0-diagrama-secuencia-clases.png)

Cualquier otra operación que se realice sobre la base de datos implicará ese mismo flujo de datos.
</div>