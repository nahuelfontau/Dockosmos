# Roadmap

**Última actualización:** 2026-11-25 · **Etapa actual:** MVP delimitado; stack aprobado (`DECISIONS/0015`); sigue el diseño de la arquitectura y el modelo de datos

## Prioridades

- [x] 1. Definir trabajos prácticos y evaluaciones (actividad evaluable única, calificación libre, sin vínculo con la planificación; estados de entrega fuera del MVP).
- [x] 2. Definir navegación y experiencia general (inicio en calendario semanal + lista jerárquica institución → curso).
- [x] 3. Delimitar el MVP (ver `PROJECT.md`, 3.12, y `DECISIONS/0011`).
- [x] 4. Investigar y validar el stack (local-first/offline, SQLite, PDF/DOCX, compatibilidad Expo/Web, sincronización futura). Completado: prueba de concepto (`DECISIONS/0014`) y aprobación (`DECISIONS/0015`).
- [ ] 5. Diseñar arquitectura y modelo de datos (`ARCHITECTURE.md`, `DATABASE.md`).
- [ ] 6. Preparar el roadmap de implementación.

## Próxima sesión

1. ~~Guardar el código de la prueba de concepto en el repositorio.~~ Hecho el 2026-11-25 en prototypes/poc-stack.
2. Diseñar la arquitectura y el modelo de datos (`ARCHITECTURE.md`, `DATABASE.md`). Incluye decidir cómo se accede a la base de datos, analizar el cifrado y revisar la limitación de datos sin respaldo (`DECISIONS/0016`).
3. Empezar con lo básico de TypeScript (el responsable ve cursos en paralelo).
4. Escribir un README.md propio (el actual es el inicial de GitHub).

## Detalles de UX para resolver al diseñar pantallas

- Flujo de primer uso (app sin datos).
- Cómo se ve la semana en un celular.
- Dónde se administran las instituciones.
- Cómo se asigna una clase a una unidad y secuencia al planificarla.

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
