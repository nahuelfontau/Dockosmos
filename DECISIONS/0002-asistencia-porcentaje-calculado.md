# 0002 — Porcentaje de asistencia calculado, no almacenado

- **Estado:** aprobada
- **Fecha:** 2026-11-05 (criterio de cálculo confirmado el 2026-11-08)

## Contexto
La app debe mostrar por estudiante el porcentaje de clases presentes y ausentes. Los estudiantes pueden sumarse a mitad de año, y "Sin completar" nunca debe ser ausencia.

## Decisión
- El porcentaje se **calcula** a partir de los registros de asistencia cada vez que se muestra; no se guarda como dato propio.
- El período va **desde la primera clase en la que se le cargó asistencia al estudiante** hasta la actualidad (no desde su fecha de incorporación al curso).

## Consecuencias
- Si el docente corrige una asistencia, el porcentaje se actualiza solo (sin duplicación de datos).
- No hace falta guardar una fecha de incorporación por estudiante.
- Límite: si la asistencia se carga con retraso, el punto de partida es esa primera carga.

## Criterio de cálculo (confirmado)
El porcentaje se calcula solo sobre las clases con presente o ausente registrado. Las clases que quedaron sin marcar (Sin completar) no entran en el porcentaje.

## Detalle de interfaz pendiente
Si se muestra o no, junto al porcentaje, cuántas clases quedaron sin marcar. Se define al diseñar las pantallas.
