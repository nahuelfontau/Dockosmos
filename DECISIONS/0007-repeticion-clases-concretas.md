# 0007 — Repetición de clases mediante clases concretas

- **Estado:** aprobada
- **Fecha:** 2026-11-06

## Contexto
El docente quiere poner una clase en uno o varios días de la semana y poder repetirla en las semanas siguientes, o dejarla solo en la semana en que la carga.

## Decisión
- Al elegir repetir, la app crea una clase concreta por cada fecha, hasta una fecha de fin que el docente elige **cada vez** que crea una clase.
- Opciones de fin: la semana siguiente, durante este mes, todo el año (hasta el 31 de diciembre) y hasta la fecha que el docente elija.
- Cada clase generada es independiente: editar, mover o borrar una no afecta a las demás.

## Consecuencias
- Implementación simple de programar y probar, y funciona igual sin conexión.
- Coherente con el principio de que cada clase se programa individualmente: repetir es una decisión explícita del docente.
- "Todo el año" genera clases en semanas sin actividad (receso invernal, diciembre). Se aceptan por ahora; el docente las borra una por una con confirmación. No hay calendario de feriados en el MVP.
- Mejoras futuras posibles: calendario de feriados y borrado múltiple.

## Alternativas descartadas
- Guardar una regla de recurrencia ("todos los lunes") y calcular las fechas al mostrar el calendario: obliga a manejar excepciones y la pregunta "¿solo esta o también las siguientes?"; mayor complejidad.
- Generar todas las clases del año automáticamente, sin acción del docente: produciría fechas que el docente no eligió.
