# 0013 — Stack tecnológico: evaluación en curso

- **Estado:** en evaluación (no aprobada)
- **Fecha:** 2026-11-08

## Contexto
La propuesta inicial es React Native, Expo y TypeScript en el frontend, SQLite como persistencia local y, a futuro, FastAPI y PostgreSQL en el backend. Se hizo una primera exploración con documentación oficial. No se probó nada en código todavía.

## Hallazgos (consultados el 2026-11-08)
- **Versiones y mantenimiento:** Expo SDK 58 se publicó el 15 de octubre de 2026 con React Native 0.88. Expo publica tres SDK por año y cada actualización puede traer cambios que rompen cosas.
- **SQLite:** `expo-sqlite` funciona en Android, iOS y web. En las versiones de la documentación revisadas (v53 y v54) el soporte web figura como alfa y requiere configuración adicional (archivos wasm y cabeceras HTTP). Falta confirmar su estado en la v58.
- **Offline en el navegador:** se arma a mano con un service worker, y la propia documentación de Expo recomienda una app nativa para la mejor experiencia sin conexión.
- **Archivos:** `expo-file-system` funciona en Android, iOS y tvOS, no en web. `File.preview()` abre el archivo con la vista previa del sistema; en Android depende de que haya una app instalada que lo soporte.
- **Web instalable (PWA):** Safari en iPhone puede borrar los datos guardados por una página tras siete días sin uso; las web apps agregadas a la pantalla de inicio tienen un contador aparte. Reportes de 2026 muestran pérdidas de datos en pruebas reales.
- **Flet (Python):** permite construir apps web, móviles y de escritorio en Python. Es más joven y tiene una comunidad más chica. Una fuente secundaria indica que a mayo de 2026 no tenía fecha firme para su versión 1.0.

## Decisiones parciales
- **La web instalable (PWA) queda descartada como base** de la app por el riesgo de pérdida de datos. Podría servir como complemento en el futuro.
- **Candidato principal:** Expo / React Native con TypeScript y SQLite local. El responsable está dispuesto a aprender TypeScript, y usar el proyecto para aprender tecnologías nuevas es parte del objetivo.
- **Plan B:** Flet, si TypeScript resultara un obstáculo grande.
- **No se aprueba el stack todavía:** primero se hace una prueba de concepto (un programa mínimo que guarde datos en el teléfono, los conserve al cerrar la app y funcione sin conexión).

## Pendiente de verificar
- Disponibilidad actual de Expo Go para el SDK 58 (a fines de octubre aún no estaba en las tiendas; se requería un development build).
- Estado del soporte web de `expo-sqlite` en la v58.
- Cómo guarda datos y funciona sin conexión Flet en el celular.
- Flutter y Capacitor no se evaluaron; no hay hoy una razón concreta para sumarlos.

## Fuentes
- https://expo.dev/changelog/sdk-58
- https://expo.dev/blog/how-to-upgrade-to-sdk-58
- https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/
- https://docs.expo.dev/versions/v54.0.0/sdk/sqlite/
- https://docs.expo.dev/versions/v58.0.0/sdk/filesystem/
- https://docs.expo.dev/guides/progressive-web-apps/
- https://www.itnews.com.au/news/apple-cops-flak-for-deleting-local-browser-storage-after-7-days-539833
- https://bugs.webkit.org/show_bug.cgi?id=232302
- https://flet.dev/
