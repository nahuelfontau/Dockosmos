# 0012 — Un dispositivo por docente en el MVP

- **Estado:** aprobada para el MVP
- **Fecha:** 2026-11-08

## Contexto
La app funciona sin conexión y guarda sus datos en una base de datos local, dentro del dispositivo. Sin un servidor que los sincronice (fuera del MVP), cada dispositivo tiene su propia copia de los datos.

## Decisión
En el MVP, los datos de cada docente viven en **un solo dispositivo**. No hay sincronización entre celular, tablet y computadora, ni respaldo ni exportación. Lo prioritario es que la app funcione bien para el docente; el respaldo se piensa más adelante.

## Consecuencias
- Lo cargado en un dispositivo no aparece en otro.
- **Riesgo aceptado:** si el dispositivo se pierde o se rompe, se pierden los datos.
- Modelo y arquitectura más simples, sin servidor.

## Criterio técnico propuesto (a validar al diseñar `DATABASE.md`)
Usar identificadores únicos (UUID) en lugar de números correlativos, para facilitar una futura sincronización sin rehacer el modelo.

## Alternativas descartadas
- Sincronización desde la primera versión: requiere servidor, cuentas de usuario y resolver conflictos entre dispositivos; demasiado alcance para el MVP.
