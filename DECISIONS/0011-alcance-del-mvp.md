# 0011 — Alcance del MVP

- **Estado:** aprobada
- **Fecha:** 2026-11-08

## Contexto
Con todas las áreas funcionales definidas, hacía falta decidir qué entra en la primera versión y qué queda para después, priorizando un producto útil que el responsable pueda comprender y mantener.

## Decisión
**Entra en el MVP:**
- Instituciones y cursos, con su agenda y clases, incluida la repetición (0006, 0007).
- Nómina cargada uno por uno y asistencia con porcentaje calculado (0002, 0005, 0008).
- Unidades, secuencias y planificación, incluida la operación "correr lo planificado" (0009, 0010).
- Actividades evaluables con título, tipo, consignas y calificación libre por estudiante (0001).
- Navegación con Calendario y lista jerárquica (0004).

**No entra en el MVP:**
- **Planificación anual**, ni redactada ni adjunta. El docente consulta la que armó por fuera; la función de organización y planificación de clases no depende de tenerla en la app. El docente considera más práctico cargar un archivo que redactarla, y quiere implementarlo en versiones futuras.
- Estados de entrega de las actividades, fecha de las actividades y ayudas de calificación.
- Cálculo de notas, pesos y vínculo entre actividades y planificación (0003).
- Historial anual, nómina compartida entre cursos, carga de nómina pegando una lista, estado "suspendida" para las clases y calendario de feriados.
- Sugerencias con IA y sincronización en la nube.

## Consecuencias
- Un alcance acotado y coherente: agenda, asistencia, planificación y calificaciones.
- La carga y visualización de PDF/DOCX sin conexión es el punto técnico más delicado; al dejarla fuera, no condiciona la elección del stack. Su viabilidad se evaluará en la investigación del stack, para planificar su incorporación.
- Ninguna de las exclusiones obliga a rehacer el modelo: todas se pueden sumar después con columnas o pantallas nuevas.

## Alternativas descartadas
- Incluir la planificación anual redactada dentro de la app: el docente la considera menos práctica que cargar un archivo.
- Incluir la carga de archivos desde la primera versión: complejidad técnica alta frente a una necesidad que se cubre consultando el archivo por fuera.
