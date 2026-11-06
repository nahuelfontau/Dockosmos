# 0004 — Navegación: Calendario y lista jerárquica

- **Estado:** aprobada
- **Fecha:** 2026-11-05

## Contexto
La app se usa para el registro del día y para planificar clases de las próximas semanas, principalmente desde el celular.

## Decisión
- Dos entradas principales: **Calendario** y una **lista jerárquica** (institución → cursos con sus materias → secciones del curso: nómina, planificación anual, unidades y secuencias, asistencia, actividades evaluables).
- La pantalla de inicio es el calendario en **vista semanal**, con acceso rápido a hoy, a otro día de la semana o al mes.
- Desde un día se accede a la asistencia de esa clase y al listado de actividades del curso.

## Consecuencias
- No se necesita una pantalla de inicio distinta: es la vista semanal del calendario ya aprobado.
- La navegación recorre la misma jerarquía del modelo de datos, lo que facilita mantenerla y explicarla.
- Pendiente de diseño: cómo se ve la semana en pantallas chicas y el flujo de primer uso.
