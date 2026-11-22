# 0014 — Prueba de concepto del stack: resultados

- **Estado:** en evaluación (stack no aprobado todavía; ver "Decisiones parciales")
- **Fecha:** 2026-11-22
- **Relacionada con:** 0013 (evaluación del stack), prioridad 4 del ROADMAP

## Contexto

El 0013 dejó a Expo / React Native con TypeScript y SQLite local como candidato principal, con Flet como plan B, y pidió una prueba de concepto antes de aprobar nada. Se construyó un proyecto descartable (`poc-stack`) con una pantalla que guarda registros en SQLite, los lista, genera 200 de una vez dentro de una transacción y permite borrarlos. Se probó en un celular Android (con Expo Go) y en un navegador de escritorio.

## Entorno de la prueba

- Node.js 26.13.0 y npm 11.20.0, en Windows con PowerShell.
- `create-expo-app` 5.0.0, plantilla `blank-typescript@sdk-58`.
- `expo` ~58.0.24, `expo-status-bar` ~58.0.5, `expo-sqlite` ~58.0.18.
- Expo Go 58.0.5 en el celular Android.
- Para la web: `react-dom`, `react-native-web` y `@expo/metro-runtime` (instalados con `npx expo install`) y un `metro.config.js` con soporte para archivos `wasm` y las cabeceras `Cross-Origin-Embedder-Policy: credentialless` y `Cross-Origin-Opener-Policy: same-origin`, como indica la documentación de `expo-sqlite` v58.

## Resultados

- **Corre en Android:** sí, con Expo Go 58.0.5. El ciclo de trabajo (editar, guardar y ver el cambio en el celular sin reinstalar) funcionó.
- **Persistencia:** los registros guardados siguieron presentes después de cerrar por completo la app y volver a abrirla.
- **Sin conexión:** con el celular en modo avión y la app ya abierta, se pudieron guardar y leer registros sin problemas. No se probó el arranque desde cero sin conexión (ver "Pendiente de verificar").
- **Navegador de escritorio:** funcionó, incluida la persistencia de los registros al recargar la página, con la configuración de Metro descrita arriba.
- **Rendimiento:** inserción de 200 registros en una transacción, en modo desarrollo.
  - Celular: 239 ms en el primer intento y 157 ms en el tercero.
  - Navegador: 102 ms en el primer intento y 87 ms en el tercero.
- **Lista con 600 registros:** el desplazamiento fue fluido en el celular y en el navegador. En el navegador los elementos más antiguos se cargan a medida que se desplaza, comportamiento esperado de una lista virtualizada.
- Referencia: un curso tiene entre 40 y 80 clases por año, muy por debajo del volumen probado.

## Técnicas validadas para reutilizar

- Migraciones de la base con `PRAGMA user_version`, ejecutadas en `onInit` de `SQLiteProvider`.
- Consultas con parámetros (`?`) en lugar de armar el texto de la consulta, para evitar inyecciones SQL.
- Transacciones (`withTransactionAsync`) para operaciones masivas o que deban guardarse todas o ninguna.

## Respuestas a los pendientes del 0013

- **Expo Go para el SDK 58:** resuelto en Android. La versión 58.0.5 instalada desde Google Play abrió el proyecto sin necesidad de un development build. No se probó en iOS.
- **Soporte web de `expo-sqlite` en la v58:** funciona. La página de la v58 lista la web entre las plataformas soportadas y la prueba lo confirmó, con la configuración adicional ya prevista (wasm y cabeceras HTTP).
- **Flet:** sigue sin evaluarse. No hubo motivo para activar el plan B.

## Decisiones parciales

- Expo / React Native con TypeScript y SQLite local queda **validado como viable para el MVP** en Android y navegador de escritorio, según los criterios probados.
- **El stack todavía no se aprueba.** Se propone aprobarlo cuando se resuelva el arranque offline desde cero con una versión instalable, que es el único requisito crítico que quedó sin comprobar.
- Se mantiene el plan B (Flet) sin evaluar.

## Pendiente de verificar

- **Arranque offline desde cero.** En Expo Go el código se descarga desde la computadora de desarrollo cada vez, así que no puede probarse. Requiere una versión instalable (por ejemplo, un APK); falta elegir el camino más simple.
- **Calendario con muchas clases.** Se midió la escritura y una lista simple, no las vistas diaria, semanal y mensual. Se evaluará al diseñar esas pantallas.
- **Cifrado de la base.** La base de la prueba no está cifrada. La documentación de `expo-sqlite` indica que SQLCipher no está soportado en Expo Go. Hay que analizarlo antes de guardar nombres de estudiantes en la app real.
- **Publicación de la versión web.** Si se publica en un servidor, este también debe enviar las cabeceras `COEP` y `COOP`.
- **iOS.** No se probó (no se dispone del dispositivo ni de macOS).
- **PDF y DOCX, y sincronización futura.** Fuera del MVP; no se evaluaron.
- **Dependencias.** `npm audit` informó 3 vulnerabilidades de severidad moderada tras la instalación inicial. No se ejecutó `npm audit fix --force` por el riesgo de romper la compatibilidad con Expo. Pendiente de revisión.
- **Windows.** Fue necesario habilitar la ejecución de scripts de PowerShell para el usuario actual (`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`). Documentar en `CONTRIBUTING.md`.

## Fuentes

- https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/
- https://docs.expo.dev/guides/running-in-the-browser/
- https://expo.dev/blog/how-to-upgrade-to-sdk-58
