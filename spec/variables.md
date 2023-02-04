# Declaracion de variables y constantes en el lenguage Riot

## Variables

**Consideraciones**

- Las variables se declaran con la palabra reservada `var`
- Pueden inicializarse con un valor o sin valor
- Empiezan con letra o `_`
- Pueden contener letras, números y `_`
- No pueden contener espacios
- No pueden ser palabras reservadas
- No pueden ser nombres de funciones, clases, objetos, etc.
- Los tipos de datos son obligatorios

```ts
var numero: int = 1
```

Como podemos obserbar, la variable `numero` es de tipo `int` y su valor es `1`

```ts
var numero: int
```

En este caso, la variable `numero` es de tipo `int` pero no tiene valor, pero esta reserva el espacio en memoria para el valor que se le asigne depediendo del tipo de dato.

## Constantes

**Consideraciones**

- Las constantes se declaran con la palabra reservada `const`
- Deben inicializarse con un valor (no pueden ser declaradas sin valor)
- Empiezan con letra o `_`
- Pueden contener letras, números y `_`
- No pueden contener espacios
- No pueden ser palabras reservadas
- No pueden ser nombres de funciones, clases, objetos, etc.
- Los tipos de datos son obligatorios
- la recomendación es que el nombre de la constante sea en mayúsculas

```ts
const PI: float = 3.1416
```

Como podemos obserbar, la constante `PI` es de tipo `float` y su valor es `3.1416`