# Planificador docente (nombre provisorio)

> **Nombre definitivo: pendiente.** LUMEN y KÓSMOS son candidatos explorados; ambos requieren evaluación marcaria antes de considerarse definitivos.

- **Estado:** definición funcional (no se programa ni se cierra la arquitectura hasta completar las definiciones pendientes).
- **Última actualización:** 2026-11-08
- **Responsable del producto y desarrollo:** Nahuel

Este documento es la fuente de verdad del proyecto. Reúne el objetivo, las decisiones aprobadas, los criterios técnicos, la forma de trabajo y lo pendiente. Cada decisión importante tiene además su registro en [`DECISIONS/`](DECISIONS/).

---

## 1. Rol del asistente (Claude) en el proyecto

Claude actúa como **arquitecto de software, consultor técnico y auditor independiente**: acompaña el diseño y desarrollo, ayuda a tomar decisiones técnicas fundamentadas y revisa arquitectura, modelo de datos, código, seguridad y documentación.

El responsable del producto es un desarrollador en formación (conoce Python). Debe aprender mientras desarrolla: no se busca copiar y pegar código sin comprenderlo. Las explicaciones deben ser didácticas, sin simplificar en exceso.

## 2. Objetivo

Aplicación para que docentes de distintas materias y niveles organicen su trabajo pedagógico desde un único lugar. Integra:

- Instituciones y cursos.
- Planificación anual.
- Unidades y secuencias de clases.
- Planificación individual de clases.
- Calendario.
- Nómina de estudiantes.
- Registro de asistencia.
- Seguimiento de trabajos prácticos y evaluaciones.

Debe ser flexible y adaptarse a distintas formas de enseñar, sin imponer estructuras pedagógicas rígidas. Es también un proyecto de portfolio profesional: las decisiones técnicas deben ser sólidas, justificables y defendibles en entrevistas.

## 3. Decisiones funcionales aprobadas

Se consideran tomadas. No se vuelven a consultar ni se cambian sin una razón técnica o funcional concreta, que debe explicarse antes con alternativas.

### 3.1 Organización general

- Dirigida a docentes individuales de distintas materias y niveles.
- Inicialmente en español.
- Mobile-first y responsive (celular, tablet y navegador de escritorio).
- Se prioriza el funcionamiento **offline**.
- Cada docente administra instituciones y cursos.
- Un curso tiene institución, identificación o nombre, materia y nómina de estudiantes.
- No hay una entidad independiente de asignación docente.
- Un curso puede mantenerse de un año a otro; no es obligatorio crear uno nuevo por ciclo lectivo.
- Al renovar un curso, el docente puede modificar planificación, clases y nómina, conservando o reemplazando estudiantes.
- **No hay historial anual ni archivo de períodos anteriores en el MVP.** Las operaciones que eliminen información deben advertirlo y pedir confirmación.

### 3.2 Planificación anual

El docente puede:

1. Redactarla dentro de la app (fundamentación, objetivos, propósitos, contenidos, estrategias metodológicas, criterios de evaluación, organización temporal).
2. Adjuntar una planificación externa (preferentemente PDF o DOCX) para consultarla desde la app.

Los archivos se almacenan localmente y se consultan offline cuando están disponibles. No se interpreta su contenido automáticamente en el MVP.

**Alcance en el MVP:** la planificación anual queda fuera de la primera versión (ni redactada ni adjunta). El docente consulta la que armó por fuera. El docente considera más práctico cargar un archivo que redactarla en la app, y se prevé implementarlo en versiones futuras. (Ver [DECISIONS/0011](DECISIONS/0011-alcance-del-mvp.md).)

### 3.3 Organización pedagógica

Jerarquía: **Curso → Unidad → Secuencia de clases → Clases individuales.**

- Cada unidad puede tener una o varias secuencias, que se desarrollan una después de otra (no en paralelo).
- El docente elige libremente el nombre de cada secuencia; no hay categorías obligatorias (contenido vs. tema).
- No hay cantidad fija de clases por secuencia; se pueden agregar, quitar, editar y reordenar.
- Cada clase tiene: fecha, horario, unidad, secuencia, contenido, objetivo, actividad y observaciones. La clase se crea al agendarla, con la planificación en blanco: unidad y secuencia son opcionales hasta que el docente la planifica (ver 3.10).
- Recursos y evaluaciones pueden registrarse inicialmente en observaciones.

### 3.4 Orden pedagógico y calendario

Se distinguen dos conceptos:

- **Orden pedagógico:** orden en que se desarrollan clases y secuencias.
- **Programación temporal:** fecha y horario concretos de cada clase.

**Modificar el orden pedagógico nunca cambia automáticamente fechas u horarios** (agregar, eliminar o reordenar clases, o reorganizar secuencias). Si se agrega una clase a una secuencia ya finalizada y hay secuencias posteriores, la app advierte que se modifica el orden pedagógico y permite reorganizarlas; fechas y horarios permanecen intactos. La reprogramación temporal es una operación explícita y separada.

El calendario tiene vistas diaria, semanal y mensual. Cada clase se programa individualmente, sin horarios habituales obligatorios. Se puede editar una clase desde el calendario y los cambios se reflejan en toda la app.

### 3.5 Estudiantes y asistencia

- La nómina pertenece al curso y es compartida por asistencia y por actividades evaluables. Sin duplicar la nómina por clase o actividad.
- Datos iniciales: **nombre y apellido** únicamente (sin DNI, domicilio, teléfono, fecha de nacimiento ni información familiar).
- El docente puede agregar, modificar y quitar estudiantes. En el MVP los estudiantes se cargan **uno por uno**; pegar una lista de nombres queda para una versión futura y no requiere cambios en el modelo de datos.
- La asistencia se registra por estudiante y clase. Estados: **Presente, Ausente y Sin completar.**
- **Sin completar es distinto de Ausente.** Nunca se asigna ausencia automáticamente por falta de registro.
- Antes de que el docente tome asistencia, la de cada estudiante figura como **Sin completar** hasta que él la cambie. (Ver [DECISIONS/0008](DECISIONS/0008-nomina-uno-por-uno-y-asistencia-sin-completar.md).)
- La app muestra, por estudiante, el **porcentaje de clases presentes y ausentes desde la primera clase en la que se le cargó asistencia hasta la actualidad.** Es un dato calculado, no almacenado. Se calcula solo sobre las clases con presente o ausente registrado; las clases sin marcar no entran en el porcentaje. (Ver [DECISIONS/0002](DECISIONS/0002-asistencia-porcentaje-calculado.md).)

### 3.6 Actividades evaluables (trabajos prácticos y evaluaciones)

Módulo independiente del de asistencia, que usa la nómina del curso.

- Trabajos prácticos y evaluaciones son **una misma entidad: la actividad evaluable**, visibles en la misma ventana. (Ver [DECISIONS/0001](DECISIONS/0001-actividad-evaluable-unica.md).)
- La actividad pertenece a un curso.
- La actividad tiene un **título** (ejemplos: "Trabajo práctico 2: Conflicto", "Evaluación final de Matemática"), un **tipo** (trabajo práctico, evaluación u otro, a elección del docente) y un espacio donde redactar las **consignas**, que es su único campo de texto. No tiene fecha de entrega o realización por ahora.
- Por cada estudiante y actividad se registra una **calificación libre** (numérica, de texto o símbolos). Una actividad sin calificación cargada se ve como sin calificar.
- Los estados de entrega (Sin completar, Entregado/realizado, No entregado/realizado) están definidos pero **quedan fuera del MVP**: la primera versión se dedica a la asignación de la calificación.
- En el MVP no hay cálculo de notas ni promedios. Las actividades no tienen peso y sus calificaciones no se vinculan entre sí: el docente califica cada una como considere mejor. Las opciones de calificación que ofrecerá la app se definirán más adelante.
- En el MVP **no hay vínculo** entre actividades evaluables y la planificación (unidades, secuencias, clases); el docente establece esa relación por su cuenta. Podría agregarse en futuras versiones. (Ver [DECISIONS/0003](DECISIONS/0003-sin-vinculo-actividades-planificacion.md).)
- Estados más finos ("con demora", "para recuperar") quedan para versiones futuras.

### 3.7 Navegación y experiencia

- Dos entradas principales: **Calendario** y una **lista jerárquica** (institución → cursos con sus materias → secciones del curso). (Ver [DECISIONS/0004](DECISIONS/0004-navegacion-calendario-y-lista-jerarquica.md).)
- La pantalla de inicio muestra la **planificación de la semana**, con acceso rápido al día de hoy, a otro día de la semana o al mes. Desde un día se accede a asistencia (de esa clase) o al listado de actividades evaluables del curso.
- Motivo: el docente usa la app tanto para el registro del día como para planificar las clases de las próximas semanas.

### 3.8 Coherencia de la información

Un mismo dato no se duplica en diferentes secciones. Se edita desde los lugares pertinentes y los cambios se reflejan en toda la app. Ver también [DECISIONS/0005](DECISIONS/0005-nomina-por-curso.md).

### 3.9 Inteligencia artificial

Complementaria y opcional. En el futuro podrá sugerir objetivos, actividades, recursos, estrategias, secuencias y clases. El docente siempre revisa y aprueba; la IA nunca modifica automáticamente una planificación. **No se envían datos personales de estudiantes a modelos externos.**

### 3.10 Agenda y clases (MVP)

- Lo primero que hace el docente es agendar sus cursos: indica institución, curso, materia y el día y horario de la semana en que los tiene.
- Una clase puede ubicarse en uno o varios días de la semana, cada uno con su horario (ejemplo: lunes de 9 a 12 y miércoles de 10 a 13).
- Al crearla, el docente elige si queda solo en esa semana o si se repite. Opciones de repetición: **la semana siguiente, durante este mes, todo el año o hasta la fecha que elija.** La elección se hace cada vez que se crea una clase.
- Repetir crea **clases concretas e independientes**, una por fecha. Editar, mover o borrar una no afecta a las demás. No se guarda una regla de recurrencia. (Ver [DECISIONS/0007](DECISIONS/0007-repeticion-clases-concretas.md).)
- "Todo el año" genera clases también en semanas sin actividad (receso invernal, diciembre). En el MVP el docente las borra una por una, con confirmación, y no hay calendario de feriados. Se revisará más adelante.
- En el calendario se ve primero el curso en su lugar de la agenda, no la planificación. La planificación se ve o se crea al ingresar al día.
- Cada clase nace con la planificación en blanco. Más tarde se la ubica en una unidad y una secuencia (el detalle de la interfaz se define al diseñar pantallas). "Actividad" es el texto libre donde el docente redacta lo que se desarrollará ese día; contenido, objetivo y observaciones siguen siendo campos de la clase.
- Las unidades engloban una o varias secuencias, y cada secuencia tiene sus clases sucesivas. Unidades y secuencias son elementos propios (no texto dentro de la clase), porque el orden pedagógico depende de ello.
- Asistencia y planificación son independientes: se toma asistencia en cualquier clase agendada, esté planificada o no. (Ver [DECISIONS/0006](DECISIONS/0006-clase-agendada-planificacion-posterior.md).)

### 3.11 Unidades, secuencias y planificación (MVP)

- La estructura de unidades y secuencias se puede planificar **desde el curso** (viendo las unidades a impartir) y **desde el día de la clase**. Ambos accesos llevan a la misma ventana de planificación.
- La planificación trabaja **solo con clases ya agendadas**. Como al agendar un curso con repetición ya existen las clases del año, el docente puede armar una secuencia con anticipación proyectando una cantidad determinada de clases consecutivas del curso. No existen clases sin fecha.
- Al proyectar, el orden pedagógico inicial coincide con el orden de las fechas; después son independientes, y reordenar nunca cambia fechas.
- El docente puede agregar o quitar clases de una secuencia después. Quitar una clase de una secuencia la deja libre; no la borra.
- Es poco frecuente planificar más de una secuencia por adelantado para un mismo curso. Lo frecuente es que se suspendan clases (por ejemplo, por feriado) y haya que pasar lo planificado a la clase siguiente.
- **Correr lo planificado** es una operación explícita, que el docente dispara desde una clase. Desplaza **una clase hacia adelante** la planificación (actividad, contenido, objetivo y observaciones) de esa clase y de las siguientes, incluso a través del límite entre secuencias. No cambia fechas, horarios ni asistencia. Muestra una vista previa y pide confirmación, y necesita una clase libre al final de la cadena (si no la hay, avisa). Nunca es automática. Sirve para clases suspendidas y para sumar una clase a una secuencia; es la forma de resolver la advertencia ya aprobada de que se está modificando el orden pedagógico. (Ver [DECISIONS/0009](DECISIONS/0009-planificacion-sobre-clases-agendadas.md) y [DECISIONS/0010](DECISIONS/0010-correr-lo-planificado.md).)

### 3.12 Alcance del MVP

La primera versión incluye:

- Instituciones y cursos, con su agenda y clases, incluida la repetición (3.10).
- Nómina de estudiantes cargada uno por uno y asistencia con porcentaje por estudiante (3.5).
- Unidades, secuencias y planificación de clases, incluida la operación "correr lo planificado" (3.11).
- Actividades evaluables con título, tipo, consignas y calificación libre por estudiante (3.6).
- Navegación con Calendario y lista jerárquica (3.7).
- Un dispositivo por docente: los datos viven en un solo dispositivo (ver [DECISIONS/0012](DECISIONS/0012-un-dispositivo-por-docente.md)).

La primera versión **no** incluye (ver [DECISIONS/0011](DECISIONS/0011-alcance-del-mvp.md)):

- Planificación anual, ni redactada ni adjunta. El docente consulta la que armó por fuera. Se prevé implementar la carga de archivos en versiones futuras.
- Estados de entrega de las actividades, fecha de las actividades y ayudas de calificación.
- Cálculo de notas, pesos y vínculo entre actividades y planificación.
- Historial anual, nómina compartida entre cursos, carga de nómina pegando una lista, estado "suspendida" para las clases y calendario de feriados.
- Sugerencias con IA, sincronización entre dispositivos o en la nube, y respaldo o exportación de datos.

## 4. Criterios técnicos

Propuesta inicial de stack, **todavía no aprobada**:

- Frontend: React Native, Expo y TypeScript.
- Compatibilidad web: React Native Web / Expo Web.
- Persistencia local: SQLite.
- Backend futuro: Python, FastAPI y PostgreSQL.
- ORM y migraciones: SQLAlchemy y Alembic.
- Calidad: Git, GitHub, Pytest, testing frontend, Docker y GitHub Actions.

La primera responsabilidad técnica es **investigar y evaluar** esta propuesta, no aceptarla automáticamente. Puntos de atención:

- Arquitectura local-first y funcionamiento offline.
- Persistencia y consistencia de datos.
- Compatibilidad entre plataformas.
- Gestión y visualización de PDF/DOCX.
- Posibilidad de sincronización en la nube en el futuro.
- Seguridad y privacidad.
- Complejidad de mantenimiento para un desarrollador en formación.

**Estado de la evaluación (2026-11-08):** se hizo una primera exploración con documentación oficial (ver [DECISIONS/0013](DECISIONS/0013-stack-en-evaluacion.md)). La web instalable (PWA) quedó descartada como base por el riesgo de pérdida de datos en iPhone. El candidato principal es Expo / React Native con TypeScript y SQLite local, a validar con una prueba de concepto antes de aprobarlo. Flet (Python) queda como plan B. El responsable está dispuesto a aprender TypeScript y usa el proyecto también para aprender tecnologías nuevas.

Se prefiere un **monolito modular** antes que microservicios innecesarios. No se elige tecnología por popularidad: se fundamenta con documentación oficial actualizada y pruebas cuando corresponda.

## 5. Forma de trabajo

- Tareas complejas divididas en pasos pequeños; explicar qué se hace, por qué y cómo comprobar que funciona.
- No avanzar varias etapas sin que la anterior haya sido comprendida y validada.
- No suponer que se conocen herramientas o conceptos que todavía no se usaron.
- Antes de modificar código, revisar archivos y estructura existentes; respetar decisiones y código ya desarrollado.
- No inventar APIs, dependencias ni funcionalidades; verificar versiones y compatibilidades.
- Proponer pruebas para validar cada implementación.
- Priorizar soluciones mantenibles y comprensibles.
- Si se detecta un problema en una decisión aprobada: explicarlo y presentar alternativas con ventajas y desventajas, sin cambiarla unilateralmente.
- Ante varias alternativas: recomendar una y justificar brevemente; evitar listas extensas sin conclusión.

**Regla principal:** construir una aplicación técnicamente sólida, útil para docentes y que el responsable pueda comprender, mantener y defender profesionalmente. La calidad del aprendizaje y del producto importa tanto como llegar a una primera versión funcional.

## 6. Documentación

GitHub es la fuente de verdad. Documentos previstos: `README.md`, `PROJECT.md`, `ROADMAP.md`, `ARCHITECTURE.md`, `DATABASE.md`, `CONTRIBUTING.md` y `DECISIONS/`. Las decisiones importantes se documentan, y al cerrar sesiones relevantes se actualiza la documentación con un resumen del estado, avances y próximos pasos.

## 7. Pendientes de definición

- Definir y ejecutar la prueba de concepto del stack (ver DECISIONS/0013).
- Detalle de interfaz del porcentaje de asistencia: si se muestra cuántas clases quedaron sin marcar.
- Evaluar, al investigar el stack, la viabilidad de adjuntar y abrir archivos PDF/DOCX sin conexión, para planificar su incorporación en una versión futura.
- Ayudas para calificar y estados de entrega: posteriores al MVP.
- Detalles de UX: primer uso de la app, vista semanal en celular, administración de instituciones.
- Investigar y validar el stack; diseñar arquitectura y modelo de datos; preparar el roadmap de implementación.
- Nombre definitivo de la aplicación.
