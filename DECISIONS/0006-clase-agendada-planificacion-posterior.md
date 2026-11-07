# 0006 — La clase existe desde que se agenda; la planificación es posterior

- **Estado:** aprobada
- **Fecha:** 2026-11-06

## Contexto
El docente quiere ver primero sus cursos ubicados en la agenda y planificar al entrar al día. Hasta ahora se había definido que cada clase tiene unidad y secuencia, sin contemplar clases que todavía no pertenecen a ninguna.

## Decisión
- Una clase se crea al agendarla, con curso, fecha y horario, y con la planificación en blanco.
- Unidad y secuencia son opcionales hasta que el docente planifica la clase. "Actividad" es un texto libre donde redacta lo que se desarrollará ese día.
- Unidades y secuencias siguen siendo elementos propios: las unidades engloban secuencias y las secuencias engloban clases sucesivas.
- Asistencia y planificación son independientes: se toma asistencia en cualquier clase agendada, esté planificada o no.

## Consecuencias
- Ajusta la definición previa (cada clase tenía unidad y secuencia): ahora son opcionales hasta planificar.
- No existe un concepto separado de "franja horaria semanal" ni de "clase sin planificar": lo que aparece en la agenda es una clase real.
- Mantener unidades y secuencias como elementos propios es necesario para el orden pedagógico: reordenar secuencias, advertir al agregar una clase a una secuencia ya finalizada y separar orden pedagógico de fechas.

## Alternativas descartadas
- Franja horaria semanal como entidad aparte, mostrada como "clase sin planificar" y convertida en clase al planificar: dos conceptos para lo mismo.
- Unidad y secuencia como texto libre dentro de la clase: haría imposibles las operaciones de orden pedagógico ya aprobadas.
