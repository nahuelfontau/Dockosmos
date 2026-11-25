# 0016 — Limitación conocida del MVP: datos en un solo dispositivo y sin respaldo

- **Estado:** aprobada
- **Fecha:** 2026-11-24
- **Relacionada con:** 0011 (alcance del MVP), 0012 (un dispositivo por docente), 0014 (prueba de concepto)

## Contexto

El MVP guarda los datos del docente en un solo dispositivo (0012) y no incluye respaldo ni exportación de datos (0011). La prueba de concepto (0014) mostró además que la base de datos del celular y la del navegador de escritorio son independientes: cada instalación tiene sus propios datos.

## Riesgo

Sin copia de seguridad, el docente puede perder toda su información (agenda, clases, planificación, nómina, asistencia y calificaciones) en situaciones como:

- Desinstalar la aplicación.
- Cambiar, perder o romper el celular.
- Borrar los datos del navegador, en el caso de la versión web.

Un docente que cargó un ciclo lectivo completo tendría que volver a cargarlo desde cero. En la versión web el riesgo es mayor, porque los datos del navegador son más fáciles de borrar sin querer.

Además, "responsive" no significa "los mismos datos en todos los dispositivos": en el MVP, el celular y el navegador no comparten información.

## Decisión

Se mantiene el alcance definido en 0011 y 0012: el MVP **no incluye** respaldo, exportación ni sincronización. El riesgo se acepta de forma consciente y se documenta como **limitación conocida**.

## Alternativas consideradas

- **Incluir una exportación simple en el MVP**, solo para guardar una copia. Reduce el riesgo, pero amplía el alcance de la primera versión. Descartada por ahora.
- **Mantener el alcance y documentar el riesgo.** Elegida.

## Seguimiento

- Revisar esta decisión al diseñar el modelo de datos (`DATABASE.md`), cuando se pueda estimar cuánto costaría una exportación o un respaldo sencillo.
- Evaluar si conviene informar al usuario, dentro de la app, que sus datos están guardados solo en ese dispositivo.
- Mantener esta limitación a la vista en `PROJECT.md` (sección 3.12) y en la documentación para el usuario cuando exista.
