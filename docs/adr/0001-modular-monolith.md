# ADR-0001: Monolito modular

- Estado: aceptada provisionalmente
- Fecha: 2026-07-11

## Decisión

Construir una sola API desplegable con módulos de dominio explícitos y un frontend independiente en el mismo monorepositorio.

## Motivos

El objetivo de 700 usuarios concurrentes no exige microservicios. Esta opción reduce costos, facilita transacciones de inventario y pedidos, y mantiene una ruta de extracción futura.

## Consecuencias

Se impondrán límites entre módulos mediante interfaces y pruebas. El escalado inicial será horizontal con procesos sin estado y Redis compartido.
