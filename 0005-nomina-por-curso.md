# 0005 — La nómina pertenece al curso

- **Estado:** aprobada para el MVP
- **Fecha:** 2026-11-05

## Contexto
La materia es un atributo del curso y la nómina pertenece al curso. Si un mismo grupo de estudiantes cursa dos materias con el docente, se generan dos cursos con nómina propia.

## Decisión
Se mantiene la nómina por curso. En el caso de un mismo grupo con dos materias, se cargan dos cursos y se acepta la duplicación de estudiantes por ahora.

## Consecuencias
- Modelo más simple en el MVP.
- Choca parcialmente con el principio de no duplicar datos, pero solo en ese caso puntual.
- Alternativa futura: compartir un grupo de estudiantes entre cursos (entidad adicional). Revisar si el caso resulta frecuente.
