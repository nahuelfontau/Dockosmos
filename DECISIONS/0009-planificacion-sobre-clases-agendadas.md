# 0009 — Planificación sobre clases agendadas, desde una ventana única

- **Estado:** aprobada para el MVP
- **Fecha:** 2026-11-08

## Contexto
Las clases existen desde que se agendan (ver 0006) y, al repetir, ya existen las clases del año. Había que decidir desde dónde se arman unidades y secuencias y con qué clases.

## Decisión
- Unidades y secuencias se planifican desde el curso y desde el día de la clase; ambos accesos llevan a la **misma ventana de planificación**.
- La planificación trabaja **solo con clases ya agendadas**. El docente arma una secuencia proyectando una cantidad determinada de clases consecutivas del curso y puede agregar o quitar clases después. Quitar una clase la deja libre, sin borrarla.

## Consecuencias
- Una sola pantalla reutilizada, que lee y escribe los mismos datos desde dos puertas de entrada.
- No existen clases sin fecha: el modelo y el calendario se mantienen simples.
- Al proyectar, el orden pedagógico inicial coincide con el cronológico; luego son independientes y reordenar nunca cambia fechas.

## Alternativas descartadas
- Permitir clases sin fecha dentro de una secuencia: agrega un estado nuevo a la clase y complica el calendario y las reglas aprobadas.
- Crear unidades y secuencias solo desde el día: dificulta planificar con anticipación.
