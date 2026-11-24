# 0015 — Aprobación del stack para el MVP

- **Estado:** aprobada
- **Fecha:** 2026-11-24
- **Reemplaza a:** 0013 (evaluación del stack)
- **Basada en:** 0014 (resultados de la prueba de concepto)

## Contexto

El 0013 propuso React Native, Expo y TypeScript con SQLite local, dejó a Flet como plan B y pidió una prueba de concepto antes de aprobar nada. El 0014 registra esa prueba: los cinco criterios definidos (corre en Android, los datos persisten, funciona sin conexión incluso con la app instalada y arrancada desde cero, rinde con volúmenes mayores a los esperados y funciona en el navegador de escritorio) se cumplieron.

## Decisión

Se aprueba para el MVP:

- **Frontend:** React Native con Expo y TypeScript, para Android y navegador de escritorio (React Native Web).
- **Persistencia local:** SQLite mediante `expo-sqlite`, con migraciones controladas por `PRAGMA user_version`.
- **Compilación y distribución de pruebas:** EAS Build con distribución interna.

## Razones

- La prueba de concepto confirmó con evidencia los requisitos críticos: persistencia, funcionamiento offline y rendimiento (ver 0014).
- Con una misma base de código se cubren celular y navegador de escritorio, requisito de la experiencia mobile-first y responsive.
- SQLite local es coherente con el enfoque local-first y con el funcionamiento offline.
- Aprender tecnologías que el responsable del producto todavía no conoce es uno de los objetivos del proyecto, y TypeScript y el ecosistema React Native aportan a ese objetivo y al valor del proyecto como portfolio.

## Alcance: qué no se decide acá

- **Backend futuro** (FastAPI, PostgreSQL, SQLAlchemy y Alembic) y la sincronización en la nube: fuera del MVP; no se aprueban ni se descartan.
- **Forma de acceder a la base** (usar `expo-sqlite` directamente o sumar una librería de acceso a datos): se define al diseñar la arquitectura y el modelo de datos.
- **Gestión de archivos PDF y DOCX:** fuera del MVP.
- **iOS:** no se probó; se verá más adelante.

## Alternativas

- **Web instalable (PWA):** descartada como base de la app, por el riesgo de pérdida de datos documentado en el 0013.
- **Flet (Python):** se mantiene como alternativa solo si TypeScript resultara un obstáculo grande, como se definió en el 0013. No se evaluó en profundidad.
- Flutter y Capacitor: no se evaluaron; no hay una razón concreta para hacerlo hoy.

## Condiciones y seguimiento

- **Cifrado de la base de datos:** analizarlo antes de guardar nombres de estudiantes en la app real. La documentación de `expo-sqlite` indica que SQLCipher no está soportado en Expo Go.
- **Calendario:** probar las vistas diaria, semanal y mensual con muchas clases al diseñar esas pantallas.
- **Límites del plan gratuito de EAS:** revisar si alcanzan durante el desarrollo.
- **Firma de la app:** definir cómo se gestionan y respaldan las credenciales antes de publicar.
- **Versionado de Expo:** Expo publica tres SDK por año y cada actualización puede traer cambios que rompen cosas. Planificar las actualizaciones y registrar las versiones usadas.

## Consecuencias

- El proyecto avanza a la prioridad 5 del ROADMAP: diseñar la arquitectura y el modelo de datos (`ARCHITECTURE.md` y `DATABASE.md`).
- El código de la prueba de concepto es descartable. Sirve como referencia de las técnicas validadas (ver 0014).
