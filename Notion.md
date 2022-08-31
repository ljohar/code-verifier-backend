# code-verifier-backend


Stack de Tecnologías

Se debe usar MERN. A saber:

* MongoDB para la base de datos

* Express para la aplicación API Rest de Backend

* React para la aplicación web de Frontend

* Node como entorno de ejecución de ambos proyectos

Lenguajes que se deben emplear:

* TypeScript y TSX

## Descripción del proyecto

Se trata de un proyecto web en el que los usuarios pueden encontrar enunciados de ejercicios (Katas) en los que practicar a desarrollar en distintos lenguajes de programación.

Requisitos

## Usuarios:

- Deben ser tener un rol de los siguientes:

    - Usuario

    - Administrador

    - Se deben poder registrar usuarios

- Restricciones: El email debe ser único

- Restricciones: El nombre de usuario debe ser único

- Un usuario registrado debe poder hacer Login

- Al recibir login, deberá recibir un JWT que le permitirá acceder a las diferentes funcionalidades del proyecto

- El JWT debe caducar a las 3 horas

- Si un usuario tiene un JWT caducado o erróneo, debe exigírsele que vuelva a realizar login

## Acciones de los usuarios

- Todos los usuarios registrados y logueados deben poder:

- Crear Katas

- Actualizar / Editar Katas que hayan creado

- Borrar Katas que haya creado

- Intentar resolver una Kata

- Puntuar una Kata que haya intentado previamente con una nota sobre 5

- Solicitar la solución de una Kata únicamente cuando la haya intentado resolver

- Realizar Logout

## Los usuarios administradores pueden:

- Actualizar cualquier Kata

- Borrar cualquier Kata

- Crear usuarios

- Actualizar usuarios

- Borrar usuarios

## Las Katas

- Cuando un usuario intente una Kata, si ID debe aparecer en la lista de participantes de la misma

- Deben disponer de una solución (bloque de código)

- Éste se debe enviar cuando el usuario que haya intentado previamente

- Ningún usuario que no haya intentado realizar la Kata debe poder ver la solución