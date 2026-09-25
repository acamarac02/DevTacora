---
title: "📝 Ejercicios Prácticos"
sidebar_position: 2
description: "Relación de ejercicios prácticos sobre Programación Orientada a Objetos en Python (clases, objetos, atributos, métodos y excepciones)."
keywords: [Python, ejercicios, POO, clases, objetos, init, self, métodos, atributos]
---

<div class="justify-text">

## Ejercicio 1: Geometría básica de rectángulos
* Crea una clase llamada `Rectangulo` que reciba en su constructor los atributos `ancho` y `alto` (números decimales).
* Incluye un método `area()` que calcule y devuelva el área del rectángulo ($A = \text{ancho} \times \text{alto}$).
* Instancia dos rectángulos con dimensiones diferentes y comprueba por pantalla que el cálculo del área se realiza correctamente en ambos objetos.

---

## Ejercicio 2: Gestión de cuenta bancaria con saldo protegido
* Crea una clase llamada `CuentaBancaria` con los atributos `titular` (texto) y `saldo` (número decimal, con valor por defecto de `100.0` si no se especifica).
* Implementa los siguientes métodos:
  * `depositar(cantidad: float)`: suma la cantidad indicada al saldo de la cuenta.
  * `retirar(cantidad: float)`: resta la cantidad del saldo. Si se intenta retirar una cantidad superior al saldo disponible, debe lanzar una excepción `ValueError` informando que no se puede dejar la cuenta en números negativos.
  * `mostrar_saldo()`: imprime por pantalla el titular y el saldo actual de la cuenta.

---

## Ejercicio 3: Contenedor y validación de datos para experimentos (`Dataset`)
* Crea una clase llamada `Dataset` para almacenar y analizar medidas o lecturas numéricas de experimentos.
* El constructor debe recibir una lista inicial de valores (por defecto vacía). En el constructor se debe verificar que todos los elementos sean de tipo numérico (`int` o `float`). Si la lista contiene elementos de otro tipo (cadenas, booleanos, etc.), se debe mostrar un aviso por pantalla e inicializar la lista de datos como vacía.
* Implementa los siguientes métodos:
  * `agregar_dato(valor: float)`: añade un nuevo número a la lista tras verificar que es de tipo numérico.
  * `resumen()`: calcula y devuelve en una tupla la media aritmética, el valor mínimo y el valor máximo. Si la lista está vacía, debe indicarlo mediante un mensaje adecuado.
  * `total_muestras()`: devuelve la cantidad total de lecturas guardadas.

---

## Ejercicio 4: Simulación de flota de transportes (`Camion`)
* Crea una clase llamada `Camion` para gestionar el seguimiento logístico de vehículos de transporte.
* Atributos del camión:
  * `matricula` (texto, obligatorio).
  * `kms_actuales` (número decimal, obligatorio).
  * `peso` (toneladas, por defecto `18.0`).
  * `consumo` (litros cada 100 km, por defecto `20.0`).
  * `capacidad_maxima` (litros del depósito, por defecto `200.0`).
  * `combustible_actual` (litros en el depósito, por defecto igual a `capacidad_maxima`).

* Métodos a implementar:
  * `repostar_combustible(cantidad: float, precio_litro: float) -> float`: suma litros al depósito. Si se excede la capacidad máxima, llena hasta el límite e informa al usuario. Devuelve el coste total en euros del repostaje realizado.
  * `calcular_km_disponibles() -> float`: calcula la distancia que puede recorrer con el combustible actual según la fórmula base:
    $$\text{kms} = \left(\frac{\text{combustible\_actual}}{\text{consumo}}\right) \times 100$$
    Aplicando una penalización por tramos de peso en toneladas:
    * Hasta 4.5 t → sin penalización.
    * Más de 4.5 t y hasta 18 t → $-50\text{ km}$.
    * Más de 18 t y hasta 25 t → $-75\text{ km}$.
    * Más de 25 t → $-100\text{ km}$.  
    *(Los kilómetros disponibles nunca pueden ser negativos).*
  * `realizar_viaje(kms_recorrer: float)`: comprueba si hay suficiente combustible para el viaje. Si no hay suficiente, muestra una advertencia. Si hay suficiente, descuenta el combustible correspondiente, incrementa los `kms_actuales` y, si tras el viaje los km disponibles son inferiores a `100 km`, muestra un aviso de reserva de depósito.
  * `mostrar_info()`: imprime la información formateada del vehículo (matrícula, peso, kms actuales, combustible y autonomía estimada).

#### Ejemplo de uso esperado:

```python
c1 = Camion("1234ABC", kms_actuales=12000)
c1.mostrar_info()
print()

c1.repostar_combustible(50, 1.7)
print(f"Puede recorrer aproximadamente {c1.calcular_km_disponibles()} km.")
print()

c1.realizar_viaje(150)
c1.mostrar_info()
```

#### Salida esperada:

```text
--- Información del camión ---
Matrícula: 1234ABC
Peso: 18.0 t
Kilómetros actuales: 12000 km
Combustible actual: 200.0 L
Kms disponibles: 950.0 km

⚠️ Depósito lleno. No se puede repostar más.
✅ Repostados 0.0 L. Coste: 0.00 €
Puede recorrer aproximadamente 950.0 km.

🚚 Viaje realizado con éxito.
--- Información del camión ---
Matrícula: 1234ABC
Peso: 18.0 t
Kilómetros actuales: 12150 km
Combustible actual: 170.0 L
Kms disponibles: 800.0 km
```

</div>

