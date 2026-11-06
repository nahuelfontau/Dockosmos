# 0003 — Sin vínculo entre actividades evaluables y planificación (MVP)

- **Estado:** aprobada para el MVP
- **Fecha:** 2026-11-05

## Contexto
Se evaluó permitir vincular opcionalmente una actividad evaluable con una unidad o una clase.

## Decisión
En la primera versión no hay vínculo. La planificación y el registro de asistencia/actividades son áreas separadas; el docente establece la relación por su cuenta. No se descarta vincularlas en futuras versiones.

## Consecuencias
- Cada actividad pertenece solo a un curso: modelo más simple.
- Desde un día del calendario, el acceso a actividades es un atajo al listado de actividades del curso, no a "las actividades de ese día".
- Agregar el vínculo después implica una columna opcional y una migración, sin tocar los datos existentes. Si se agrega, conviene un único vínculo por actividad (el resto se deduce de la jerarquía) para evitar inconsistencias.
