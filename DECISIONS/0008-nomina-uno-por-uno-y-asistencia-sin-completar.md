# 0008 — Nómina cargada uno por uno y asistencia "Sin completar" por defecto

- **Estado:** aprobada para el MVP
- **Fecha:** 2026-11-06

## Contexto
Hacía falta decidir cómo se carga la nómina de un curso en la primera versión y cuál es el estado inicial de la asistencia de cada estudiante.

## Decisión
- La nómina se carga **estudiante por estudiante**. Pegar una lista de nombres queda para una versión futura.
- Antes de que el docente tome asistencia, la de cada estudiante figura como **Sin completar** hasta que él la cambie.

## Consecuencias
- Pegar una lista después no cambia el modelo de datos: es una función de interfaz que repite la misma operación de crear un estudiante. Conviene mantener esa lógica en un único lugar del código, separada de la pantalla.
- Armar un curso numeroso es lento al principio; se acepta en el MVP.
- Coherente con la regla aprobada de que Sin completar nunca es Ausente.

## Criterio técnico propuesto (a validar al diseñar `DATABASE.md`)
No crear registro de asistencia hasta que el docente marque Presente o Ausente; **Sin completar se deduce de la falta de registro**. Si el docente vuelve a dejar a un estudiante sin completar, se elimina su registro.

- Ventajas: no se generan filas por cada estudiante al crear una clase (importante al repetir clases en todo el año); los estudiantes agregados después figuran como Sin completar automáticamente.
- Contrapartida: las consultas deben contemplar la ausencia de registro.

## Alternativa considerada
Crear un registro explícito "Sin completar" por estudiante al crear cada clase: más directo de leer, pero genera muchos registros y exige sincronizarlos cuando cambia la nómina.
