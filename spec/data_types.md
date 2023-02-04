# Tipos de datos

## Numeros

**Primitivos genericos**

`int` - Números enteros de 128 bits (por defecto)[valores entre -9223372036854775808 y 9223372036854775807]
`float` - Números decimales de 128 bits (por defecto)[valores entre -1.7976931348623157e+308 y 1.7976931348623157e+308]
`bigint` - Números enteros de 256 bits (entre 57896044618658097711785492504343953926634992332820282019728792003956564819968- y 57896044618658097711785492504343953926634992332820282019728792003956564819967)

**Primitivos especificos**

`i8` - Números enteros de 8 bits (entre -128 y 127)
`i16` - Números enteros de 16 bits (entre -32768 y 32767)
`i32` - Números enteros de 32 bits (entre -2147483648 y 2147483647)
`i64` - Números enteros de 64 bits (entre -9223372036854775808 y 9223372036854775807)
`i128` - Números enteros de 128 bits (entre -170141183460469231731687303715884105728 y 170141183460469231731687303715884105727)
`u8` - Números enteros sin signo de 8 bits (entre 0 y 255)
`u16` - Números enteros sin signo de 16 bits (entre 0 y 65535)
`u32` - Números enteros sin signo de 32 bits (entre 0 y 4294967295)
`u64` - Números enteros sin signo de 64 bits (entre 0 y 18446744073709551615)
`u128` - Números enteros sin signo de 128 bits (entre 0 y 340282366920938463463374607431768211455)
`f32` - Números decimales de 32 bits (entre -3.4028235e+38 y 3.4028235e+38)
`f64` - Números decimales de 64 bits (entre -1.7976931348623157e+308 y 1.7976931348623157e+308)
`f128` - Números decimales de 128 bits (entre -1.18973149535723176508575932662800702e+4932 y 1.18973149535723176508575932662800702e+4932)

### Ejemplo de uso

```ts
var integer_8: i8 = 127 // 8 bits
var integer_16: i16 = 32767 // 16 bits
var integer_32: i32 = 2147483647 // 32 bits
var integer_64: i64 = 9223372036854775807 // 64 bits
var integer_128: i128 = 170141183460469231731687303715884105727 // 128 bits
```

### Notacion de valores numericos

```ts
var binary: i32 = 0b1111 // 15
var octal: i32 = 0o77 // 63
var hexadecimal: i32 = 0xFF // 255
```

### Notacion de valores numericos con separadores

```ts
var simple: i32 = 1_000_000 // 1000000
var binary: i32 = 0b_1111 // 15
var octal: i32 = 0o_77 // 63
var hexadecimal: i32 = 0xFF_FF_FF // 16777215
``` 

Las notaciones de valores numericos con separadores son validas para los tipos de datos `int` solamente y son opcionales. Su uso es para facilitar la lectura de los valores numericos.

### Valores numericos con punto flotante

```ts
const PI: float 
```

## Booleanos

**Primitivos genericos**

`bool` - Valores booleanos (por defecto)[true o false]

### Ejemplo de uso

```ts
var boolean: bool = true
var anotherBoolean: bool = false
```

## Caracteres

**Primitivos genericos**

`char` - Caracteres unicode (por defecto)[valores entre 0 y 1114111] con una longitud de 32 bits

### Ejemplo de uso

```ts
var character: char = 'a'
var anotherCharacter: char = 'b'
var unicodeCharacter: char = '😀'

// Caracteres especiales
var tab: char = '\t'
var newLine: char = '\n'
var carriageReturn: char = '\r'
var backspace: char = '\b'
var formFeed: char = '\f'
var doubleQuote: char = '\"'
var singleQuote: char = '\''
var backslash: char = '\\'
```

## Cadenas

**Primitivos genericos**

`str` - Cadenas de caracteres unicode (por defecto)[valores entre 0 y 1114111] con una longitud de 32 bits

### Ejemplo de uso

```ts
var string: str = 'Hello world!'
var anotherString: str = 'Hello world anymore!'
```

## Arreglos

**Primitivos genericos**

`list[str]` - Arreglos de cadenas de caracteres
`list[int]` - Arreglos de números enteros
`list[float]` - Arreglos de números decimales
`list[bool]` - Arreglos de valores booleanos
`list[char]` - Arreglos de caracteres
`index[str]` - Arreglos multidimensionales de cadenas de caracteres

**Primitivos especificos**
`list[i8|i32|i64...]` - Arreglos de números enteros de diferentes tamaños
`list[f32|f64...]` - Arreglos de números decimales de diferentes tamaños
`index[i8|i32|i64...]` - Arreglos multidimensionales de números enteros de diferentes tamaños
`index[f32|f64...]` - Arreglos multidimensionales de números decimales de diferentes tamaños

### Ejemplo de uso

```ts
var vector: list[int] = [1, 2, 3, 4, 5] // 32 bits -- default
var anotherVector: list[i8] = [1, 2, 3, 4, 5] // 8 bits -- explicit
var stringVector: list[str] = ['Hello', 'world', '!'] // 32 bits -- default

// Arreglos multidimensionales

var matrix: index[int] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] // 32 bits -- default
var anotherMatrix: index[int] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] // 48 bits -- explicit
```

## Tuplas

**Primitivos genericos**

`tuple[str, int, float, bool, char]` - Tuplas de diferentes tipos de datos

**Primitivos especificos**

`tuple[i8, i32, i64...]` - Tuplas de números enteros de diferentes tamaños
`tuple[f32, f64...]` - Tuplas de números decimales de diferentes tamaños


### Ejemplo de uso

```ts
var tuple: tuple[str, int, float, bool, char] = ('Hello', 1, 1.0, true, 'a') // 32 bits -- default
var anotherTuple: tuple[i8, i32, i64] = (1, 2, 3) // 8, 32, 64 bits -- explicit

// Acceder a los elementos de una tupla usando la notacion de indices

var firstElement: str = tuple[0]
var secondElement: int = tuple[1]
var thirdElement: float = tuple[2]
```

## Diccionarios

**Primitivos genericos**

`dict[str|int|float|char, str]` - Diccionarios de cadenas de caracteres

**Primitivos especificos**

`dict[i8|i32|i64..., str]` - Diccionarios de números enteros de diferentes tamaños
`dict[f32|f64..., str]` - Diccionarios de números decimales de diferentes tamaños

### Ejemplo de uso

```ts
var dictionary: dict[str, str] = {'key': 'value'} // 32 bits -- default

// Acceder a los elementos de un diccionario usando la notacion de operador de acceso

var value: str = dictionary['key'] // 'value'
```

## Valores vacios, nulos y nulos con valor

**Primitivos genericos**

`void` - Valores vacios
`none` - Valores nulos
`undefined` - Valores nulos con valor

### Ejemplo de uso

```ts
var voidValue: void = void
var nullValue: none = none
var undefinedValue: undefined = undefined
```