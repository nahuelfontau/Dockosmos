# 0001 — Una única entidad "actividad evaluable"

- **Estado:** aprobada
- **Fecha:** 2026-11-05

## Contexto
El módulo de seguimiento debe cubrir trabajos prácticos y evaluaciones. Hacía falta decidir si son conceptos separados o uno solo.

## Decisión
Trabajos prácticos y evaluaciones son una misma entidad: la **actividad evaluable**, que pertenece a un curso y se gestiona en la misma ventana. Por cada estudiante de la nómina y cada actividad se registra un **estado** (Sin completar, Entregado/realizado, No entregado/realizado) y una **calificación libre** (número, texto o símbolo).

## Consecuencias
- Un solo modelo en lugar de dos con lógica duplicada; se adapta a distintas formas de evaluar.
- Misma filosofía que asistencia: la actividad existe una vez y el resultado es por estudiante.
- La calificación puede guardarse como texto libre; si en el futuro se calculan promedios, habrá que agregar un campo numérico opcional mediante migración.
- "Sin completar" evita asumir que no entregar es lo mismo que no haber registrado nada.
- Las actividades no tienen peso y sus calificaciones no se vinculan entre sí (decidido el 2026-11-08): cada resultado guarda su calificación de forma independiente y el docente califica cada actividad como considere mejor.

## Alternativas descartadas
- Entidades separadas para trabajos y evaluaciones: más campos específicos, pero más complejidad y duplicación.
