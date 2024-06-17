# Tipos de datos (Numeros)

En Riot, existen tres tipos de numeros: `int`, `float` y `bigint`, estos son
tipos de datos primitivos de uso comun en la mayoria de lenguajes de
programacion, mas sin embargo no son los unicos tipos de numeros que existen en
Riot. Este lenguage tambien cuenta con los tipos de datos `atomic_types` los
cuales son extenciones de los tipos de datos primitivos que a su vez tambien son
tipos de datos primitivos, pero a diferencia de los de proposito comun, estos
tipos de datos son especificos para el manejo de numeros de gran magnitud, estos
tipos de se dividen en 3 grupos:

- **Enteros con signo**: `i8`, `i16`, `i32`, `i64`, `i128`.
- **Enteros sin signo**: `u8`, `u16`, `u32`, `u64`, `u128`.
- **Punto flotante**: `f32`, `f64`.

Esta division se hace para poder tener un control _atomico_ de memoria, ya que
estos tipos estan diseñados para manejar el uso de la memoria segun sea la
necesidad del usuario dando asi un control mas preciso de los tipos de datos y
la cantidad de memoria que se esta usando.

## Enteros

Los enteros son numeros que no tienen parte decimal, estos pueden ser positivos
o negativos, y pueden ser de cualquier tamaño, ya que en Riot no existe un
limite de memoria para los enteros, sin embargo, si se llega a exceder la
memoria disponible, el programa se detendra y mostrara un error.

### _Enteros con signo_

Los enteros con signo son enteros que pueden ser positivos o negativos, estos
pueden ser de 8, 16, 32, 64 o 128 bits, dependiendo de la necesidad del usuario,
estos tipos de datos son los mas comunes en la mayoria de lenguajes de
programacion, y en Riot no son la excepcion.

#### `int`

```ts -> riot
let a: int = 10;
```

Naturalmente el tipo de dato `int` es un entero con signo de 32 bits, este tipo
de dato es el mas comun en la mayoria de lenguajes de programacion, y en Riot no
es la excepcion, pero te estaras preguntando porque 32 bits, y no 64 o 128, la
respuesta es simple, en la mayoria de los casos, los enteros con signo de 32
bits son suficientes para la mayoria de los casos, y si no lo son, siempre se
puede usar el tipo de dato `i128` que es un entero con signo de 128 bits el cual
es el mas grande que existe en Riot.

#### `i8`, `i16`, `i32`, `i64`, `i128`

```ts -> riot
let a: i8 = 127; // 8 bits de memoria (1 byte)
let b: i16 = -32767; // 16 bits de memoria (2 bytes)
let c: i32 = 2147483647; // 32 bits de memoria (4 bytes)
let d: i64 = -9223372036854775807; // 64 bits de memoria (8 bytes)
let e: i128 = 170141183460469231731687303715884105727; // 128 bits de memoria (16 bytes)
```

### _Enteros sin signo_

Los enteros sin signo son enteros que solo pueden ser positivos, estos pueden
ser de 8, 16, 32, 64 o 128 bits respectivamente.

#### `u8`, `u16`, `u32`, `u64`, `u128`

```ts -> riot
let a: u8 = 255; // 8 bits de memoria (1 byte)
let b: u16 = 65535; // 16 bits de memoria (2 bytes)
let c: u32 = 4294967295; // 32 bits de memoria (4 bytes)
let d: u64 = 18446744073709551615; // 64 bits de memoria (8 bytes)
let e: u128 = 340282366920938463463374607431768211455; // 128 bits de memoria (16 bytes)
```

## Punto flotante

Los numeros de punto flotante son numeros que tienen una parte decimal, estos pueden ser de 32 o 64 bits respectivamente, siendo los de 64 bits los mas comunes en la mayoria de los casos de uso.

```ts -> riot
let a: float = 9.99999; // 32 bits de memoria (4 bytes)
let b: float = 9.9999999999; // 64 bits de memoria (8 bytes)
```

## Notaciones

Los numeros en Riot pueden ser escritos de diferentes formas, ya sea en notacion decimal, binaria, octal o hexadecimal, entre otros dependiendo de la necesidad del usuario.

### Decimal

Los numeros en notacion decimal son los mas comunes en la mayoria de los casos, ya que son los mas faciles de leer y escribir.

```ts -> riot
let a: int = 10; // 10 en decimal
let b: int = 100; // 100 en decimal
let c: int = 1000; // 1000 en decimal
```

### Binario

Los numeros en notacion binaria son los mas faciles de leer, ya que solo se usan 0 y 1, pero son los mas dificiles de escribir, ya que se requiere de un prefijo `0b` para indicar que el numero es binario.

```ts -> riot
let a: int = 0b1010; // 10 en binario
let b: int = 0b1100100; // 100 en Binario
let c: int = 0b1111101000; // 1000 en Binario
```

### Octal

Los numeros en notacion octal son los mas faciles de escribir, ya que solo se usan 0, 1, 2, 3, 4, 5, 6 y 7, pero son los mas dificiles de leer, ya que se requiere de un prefijo `0o` para indicar que el numero es octal.

```ts -> riot
let a: int = 0o12; // 10 en octal
let b: int = 0o144; // 100 en octal
let c: int = 0o1750; // 1000 en octal
```

### Hexadecimal

Los numeros en notacion hexadecimal son un caso especial ya que estos contienen letras, pero su notacion al igual que las demas es facil de leer y escribir, ya que se requiere de un prefijo `0x` para indicar que el numero es hexadecimal.

```ts -> riot
let a: int = 0xa; // 10 en hexadecimal
let b: int = 0x64; // 100 en hexadecimal
let c: int = 0x3e8; // 1000 en hexadecimal
```

### Notacion cientifica

Los numeros en notacion cientifica son numeros que tienen una parte decimal, pero esta parte decimal es muy grande o muy pequeña, por lo que se usa la notacion cientifica para poder representarla.

```ts -> riot
let a: float = 1e2; // 100 en notacion cientifica
let b: float = 1e3; // 1000 en notacion cientifica
let c: float = 1e4; // 10000 en notacion cientifica
```

### Notacion cientifica con exponente negativo

Los numeros en notacion cientifica con exponente negativo son numeros que tienen una parte decimal, pero esta parte decimal es muy grande o muy pequeña, por lo que se usa la notacion cientifica para poder representarla, pero en este caso el exponente es negativo, por lo que la parte decimal es muy pequeña.

```ts -> riot
let a: float = 1e-2; // 0.01 en notacion cientifica
let b: float = 1e-3; // 0.001 en notacion cientifica
let c: float = 1e-4; // 0.0001 en notacion cientifica
```

### Notacion legible

Los numeros en notacion legible son cualquier numero entero o flotante que se pueda leer facilmente, ya que se usa el simbolo `_` para separar los digitos, esto es util para numeros muy grandes o muy pequeños que se puedan confundir facilmente.

```ts -> riot
let a: int = 1_000_000; // 1 millon en notacion legible
let b: float = 1_000_000.000_0; // 1 millon punto 0000 en notacion legible
let c: int = -1_00; // -100 en notacion legible
let d: float = -1_00.0; // -100.0 en notacion legible
```