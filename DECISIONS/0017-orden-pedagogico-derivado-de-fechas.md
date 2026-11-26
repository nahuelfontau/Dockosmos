# 0017 — Orden pedagógico derivado de las fechas

- **Estado:** aprobada (por el responsable del producto, el 2026-11-26)
- **Fecha:** 2026-11-26
- **Relacionada con:** 0006 (clase agendada, planificación posterior), 0007 (repetición de clases concretas), 0009 (planificación sobre clases agendadas), 0010 (correr lo planificado), 0015 (aprobación del stack). Secciones 3.3, 3.4, 3.8, 3.10 y 3.11 de `PROJECT.md`.

## Contexto

`PROJECT.md` (3.4) distingue el **orden pedagógico** de la **programación temporal** y exige que modificar el primero nunca cambie fechas ni horarios. Para diseñar el modelo de datos había que decidir dónde vive ese orden y qué mueve cada operación (agregar, quitar, intercambiar, correr, reorganizar). Se analizó con ejemplos concretos en la sesión del 2026-11-26.

## Decisión

### Principio

La fecha y el horario son solo una **ubicación en el calendario**: indican cuándo se hará qué. Lo que se mueve entre esas ubicaciones es la planificación. Ninguna operación de orden cambia fechas, horarios ni asistencia.

### Dos grupos de datos en la clase

| Grupo | Datos | Qué pasa al reorganizar |
|---|---|---|
| **Agenda** | fecha, horario, asistencia | se quedan en su lugar |
| **Planificación** | actividad, contenido, objetivo, observaciones (los cuatro textos) | se mueven |
| **Pertenencia** | unidad y secuencia de la clase | solo cambia por acción explícita del docente (ver Operaciones) |

### Orden derivado de las fechas

- No hay campo de posición. El orden de las clases dentro de una unidad o de una secuencia es el orden de sus fechas.
- Las secuencias de una unidad se ordenan por la fecha de su primera clase. Las unidades de un curso, igual.
- Son **datos calculados, no almacenados**: el rango de fechas de una secuencia y de una unidad, el orden de secuencias y unidades, y la numeración que se muestre (por ejemplo, "clase 5 de la secuencia").

### Estructura

- La clase pertenece a un curso y, opcionalmente, a una unidad y a una secuencia.
- La **secuencia es un agrupamiento opcional** de clases dentro de una unidad. Hay docentes que no la usan o que usan la unidad como secuencia.
- **Regla de consistencia:** si una clase tiene secuencia, esa secuencia pertenece a la misma unidad que la clase. Se hará cumplir en la base de datos (se detalla en `DATABASE.md`). Si una clase pasa a otra unidad, sale de su secuencia y la app lo avisa.

### Operaciones

| Operación | Qué mueve | Pertenencia a unidad o secuencia |
|---|---|---|
| Intercambiar dos clases | los cuatro textos | no cambia |
| Correr lo planificado (0010) | los cuatro textos, una clase hacia adelante | no cambia sola |
| Mover una secuencia o una unidad entera | textos y pertenencia: sus clases pasan a otras fechas | cambia |
| Agregar o quitar una clase de una unidad o secuencia | ningún texto | cambia |

- La pertenencia solo la cambia el docente, de forma explícita.
- Lo desplazado va **hacia adelante**, sin eliminarse. Antes de aplicar un desplazamiento se muestra una **vista previa** y se pide **confirmación**; nunca es automático.
- **Alcance en el MVP:** entran "correr lo planificado", "intercambiar dos clases" y el desplazamiento hacia adelante al sumar clases a una unidad o secuencia. **Mover una secuencia o una unidad entera a un lugar cualquiera del calendario queda para después del MVP**; el modelo de datos ya lo soporta.
- Cada operación se ejecuta en una **transacción**: se guarda completa o no se guarda.
- Si una operación deja secuencias entrelazadas (rangos de fechas que se solapan), la app avisa y lo permite.

### Crear unidades y secuencias

- **Toda unidad y toda secuencia incluye al menos una clase.** No existen unidades ni secuencias sin fecha.
- Una **clase vacía** es la que no tiene nada redactado (los cuatro textos en blanco) y no está asignada a ninguna unidad ni secuencia. No es lo mismo que una clase "libre de secuencia" (3.11), que puede tener texto.
- Una **unidad nueva** va a la primera clase vacía posterior a la última clase planificada del curso. Ejemplo: la unidad 1 queda el 3 de febrero y la unidad 2 el 10. Si se suma una segunda clase a la unidad 1 (el 10 de febrero), la unidad 2 pasa al 17, con vista previa y confirmación.
- Si una **secuencia se queda sin clases**, pasa a incluir la primera clase de **su misma unidad** que no tenga nada redactado y no pertenezca a otra secuencia.
- Si no existe tal clase, la app ofrece sumar una clase a la unidad (con vista previa) o eliminar la secuencia vacía.
- Una **unidad que se queda sin clases** sigue la regla de la creación.
- Si no hay ninguna clase disponible, la app avisa, igual que en "correr".

## Razones

- **Una sola fuente de verdad para el orden** (3.8): si el orden se guardara aparte, la lista de una secuencia y el calendario podrían contradecirse sin que la app supiera cuál es la correcta.
- **Un solo mecanismo:** correr, intercambiar y mover secuencias consisten en repartir los textos entre las fechas ya existentes, y se implementan como una operación transaccional reutilizable.
- **Flexibilidad pedagógica:** la secuencia es opcional y la unidad puede usarse como secuencia.
- **Orden siempre calculable:** al no existir unidades ni secuencias sin clases, el orden siempre se obtiene de las fechas, sin campos auxiliares.

## Alternativas consideradas

- **Número de posición guardado en cada clase:** descartada. Genera dos verdades (posición y fecha) que pueden contradecirse.
- **Toda unidad nace con una secuencia inicial oculta:** descartada. Obliga a usar secuencias a quien no las usa.
- **Unidades y secuencias vacías al final, por orden de creación:** descartada a favor de la regla "al menos una clase".
- **Que una secuencia vacía pueda tomar una clase que no pertenece a ninguna unidad:** descartada. Estiraría la unidad por encima de las que le siguen y la secuencia dejaría de quedar cerca.
- **Número de orden guardado en unidades y secuencias:** descartada por ahora. Si más adelante hiciera falta, agregarlo es un cambio chico mediante una migración.

## Resuelto al aprobarla (2026-11-26)

- Definición de la clase que toma una secuencia vacía: la primera de su misma unidad sin nada redactado y sin otra secuencia.
- Alcance en el MVP de las operaciones de orden (ver Operaciones).

## Seguimiento

- Escribir la regla de consistencia entre unidad y secuencia en `DATABASE.md`.
- Detalles de interfaz para el diseño de pantallas: aviso de secuencias entrelazadas, vista previa de desplazamientos, aviso al pasar una clase a otra unidad, y el motivo de una suspensión anotado en observaciones (si se escribe antes de correr, viaja con el texto).
