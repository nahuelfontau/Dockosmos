# 0010 — Operación explícita "correr lo planificado"

- **Estado:** aprobada para el MVP
- **Fecha:** 2026-11-08

## Contexto
En la práctica, las clases se suspenden (por ejemplo, por feriado) y lo planificado debe pasar a la clase siguiente: si la clase 4 no se hizo, lo de la 4 se hace en la 5, y así. También ocurre cuando una secuencia necesita una clase más y las secuencias posteriores deben desplazarse.

## Decisión
- Se agrega la operación **"correr lo planificado"**, que el docente dispara desde una clase.
- Desplaza **una clase hacia adelante** la planificación (actividad, contenido, objetivo y observaciones) de esa clase y de las siguientes, también a través del límite entre secuencias.
- **No cambia fechas, horarios ni asistencia.** La asistencia pertenece al día y se queda ahí.
- Muestra una **vista previa** de qué contenido pasa a qué fecha y pide **confirmación**.
- Requiere una **clase libre al final de la cadena**; si no la hay, avisa y sugiere agendar una clase más.
- Corre de a una clase por vez y **nunca es automática**.

## Consecuencias
- Resuelve el caso de clases suspendidas sin agregar un estado "suspendida" al modelo.
- Cubre también sumar una clase a una secuencia: se libera un lugar y se corre lo planificado de las secuencias posteriores. Es la forma de resolver la advertencia ya aprobada de que se está modificando el orden pedagógico.
- Es coherente con la separación entre asistencia y planificación y con que la reprogramación sea una operación explícita.
- Modifica varias clases a la vez, por eso exige vista previa y confirmación.

## Criterio técnico propuesto (a validar al diseñar la arquitectura)
Ejecutarla como una **única transacción**: o se aplican todos los cambios, o ninguno. Así un error o un corte a mitad de camino no deja la planificación a medio mover.

## Alternativas descartadas
- Desplazamiento automático al marcar una clase como suspendida: la app no mueve cosas por su cuenta y exigiría un estado nuevo.
- Permitir solo agregar clases libres a una secuencia: no resuelve el caso real de las suspensiones.
