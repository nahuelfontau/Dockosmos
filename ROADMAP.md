# Roadmap

**Última actualización:** 2026-11-26 · **Etapa actual:** MVP delimitado; stack aprobado (`DECISIONS/0015`); orden pedagógico definido (`DECISIONS/0017`, propuesta); sigue el diseño del modelo de datos (tablas) y de la arquitectura

## Prioridades

- [x] 1. Definir trabajos prácticos y evaluaciones (actividad evaluable única, calificación libre, sin vínculo con la planificación; estados de entrega fuera del MVP).
- [x] 2. Definir navegación y experiencia general (inicio en calendario semanal + lista jerárquica institución → curso).
- [x] 3. Delimitar el MVP (ver `PROJECT.md`, 3.12, y `DECISIONS/0011`).
- [x] 4. Investigar y validar el stack (local-first/offline, SQLite, PDF/DOCX, compatibilidad Expo/Web, sincronización futura). Completado: prueba de concepto (`DECISIONS/0014`) y aprobación (`DECISIONS/0015`).
- [ ] 5. Diseñar arquitectura y modelo de datos (`ARCHITECTURE.md`, `DATABASE.md`). Avance: modelo conceptual y orden pedagógico definidos (`DECISIONS/0017`, propuesta); falta el modelo lógico (tablas), el acceso a la base y el cifrado.
- [ ] 6. Preparar el roadmap de implementación.

## Próxima sesión

1. ~~Guardar el código de la prueba de concepto en el repositorio.~~ Hecho el 2026-11-25 en prototypes/poc-stack.
2. ~~Definir el modelo conceptual y el orden pedagógico.~~ Hecho el 2026-11-26 (`DECISIONS/0017`).
3. Aprobar el 0017: releerlo con calma, confirmar la definición de "clase vacía" para las secuencias y decidir si "intercambiar dos clases" y "mover secuencias o unidades enteras" entran al MVP.
4. Diseñar el modelo lógico de la base de datos (tablas, columnas y reglas de consistencia; `DATABASE.md`) y la arquitectura (`ARCHITECTURE.md`). Incluye decidir cómo se accede a la base de datos, analizar el cifrado y revisar la limitación de datos sin respaldo (`DECISIONS/0016`).
5. Empezar con lo básico de TypeScript (el responsable ve cursos en paralelo).
6. Escribir un README.md propio (el actual es el inicial de GitHub).

## Detalles de UX para resolver al diseñar pantallas

- Flujo de primer uso (app sin datos).
- Cómo se ve la semana en un celular.
- Dónde se administran las instituciones.
- Cómo se asigna una clase a una unidad y secuencia al planificarla.
- Avisos del orden pedagógico: secuencias entrelazadas, clase que pasa a otra unidad (sale de su secuencia) y vista previa con confirmación al desplazar clases, secuencias o unidades.
- Qué pasa con el motivo de una suspensión anotado en observaciones: si se escribe antes de correr lo planificado, viaja con el texto.

## Fuera del MVP (por ahora)

- Planificación anual (redactada y adjunta). La carga de archivos PDF/DOCX se intentará en versiones futuras.
- Estados de entrega de las actividades, fecha de las actividades y ayudas de calificación.
- Historial anual y archivo de períodos anteriores.
- Cálculo de notas y promedios.
- Vínculo entre actividades evaluables y la planificación.
- Estados finos de entrega ("con demora", "para recuperar").
- Nómina compartida entre cursos.
- Estado "suspendida" para las clases (por ahora el docente corre lo planificado de forma manual).
- Correr lo planificado más de una clase por vez.
- Carga de la nómina pegando una lista de nombres.
- Calendario de feriados y borrado múltiple de clases.
- Sugerencias con IA.
- Sincronización entre dispositivos y en la nube / backend, respaldo y exportación de datos.
