---
title: "Internacionalización"
sidebar_position: 4
description: "Cómo soportar múltiples idiomas en aplicaciones Android mediante el uso de ficheros de recursos strings.xml en diferentes carpetas values."
keywords: ["android", "internacionalización", "strings.xml", "idiomas", "traducciones"]
---

La **internacionalización** en Android permite que tu aplicación soporte múltiples idiomas, adaptando los textos, formatos de fecha y otros aspectos culturales de acuerdo con la **configuración regional del dispositivo**.

## Directorios de recursos

Los textos de la interfaz de usuario (botones, etiquetas, mensajes, etc.) se almacenan en archivos `strings.xml` dentro de la carpeta `res/values`.  
Para cada idioma, se debe crear un nuevo directorio `values` con un sufijo que identifique el idioma específico:

```
res/values/strings.xml      → Textos por defecto (usualmente en inglés)
res/values-es/strings.xml   → Textos en español
res/values-en/strings.xml   → Textos en inglés
res/values-fr/strings.xml   → Textos en francés
res/values-de/strings.xml   → Textos en alemán
```

## Ejemplo de `strings.xml`

Dentro de cada uno de los directorios values, tendrás un archivo strings.xml que define los textos en el idioma correspondiente y a cada texto le daremos la referencia a ese recurso concreto.


```xml title="res/values/strings.xml"
<resources>
    <string name="btn_accept">Accept</string>
</resources>
```

```xml title="res/values-es/strings.xml"
<resources>
    <string name="btn_accept">Aceptar</string>
</resources>
```

En el layout XML haremos referencia al recurso:

```xml
<Button
    android:id="@+id/btnAceptar"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/btn_accept"/>
```

## Uso desde Java

También es posible acceder a los textos desde el código Java:

```java
Button btn = findViewById(R.id.btnAceptar);
btn.setText(getString(R.string.btn_accept));
```

De esta forma, Android mostrará automáticamente el texto en el idioma configurado en el dispositivo.

:::info ACTIVIDAD DE SEGUIMIENTO 3
**Realiza la Actividad de Seguimiento 3: Domoticon.**
:::