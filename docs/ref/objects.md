# Objetos

En Riot todo es un objeto, incluso los tipos primitivos, aunque estos tiene su propia clase constructora, por ejemplo, el tipo `int` tiene su clase constructora `Int`, el tipo `float` tiene su clase constructora `Float`, etc. Estas clases constructoras son las que se encargan de crear los objetos de los tipos primitivos con funcionalidades adicionales.

## Objetos primitivos

### `Int`

La clase constructora `Int` es la encargada de crear objetos del tipo `int`, esta clase constructora cuenta con los siguientes metodos:

- `Int.parse()`: es usada para convertir una cadena de texto a un objeto del tipo `int`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let i: int = Int.parse("10");
  // or
  let i: int = new Int("10");
  print(i); // 10
  ```

  </details>

- `Int.toStr()`: es usada para convertir un objeto del tipo `int` a una cadena de texto.
  <details>
  <summary>Ejemplo</summary>

  ```ts
  let i: int = 10;
  let s: str = i.toStr();
  print(s); // "10"
  ```

  </details>

- `Int.toChar()`: es usada para convertir un objeto del tipo `int` a un objeto del tipo `char`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let i: int = 65;
  let c: char = i.toChar();
  print(c); // 'A'
  ```

  </details>

- `Int.toFloat()`: es usada para convertir un objeto del tipo `int` a un objeto del tipo `float`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let i: int = 10;
  let f: float = i.toFloat();
  print(f); // 10.0
  ```

  </details>

### `Float`

La clase constructora `Float` es la encargada de crear objetos del tipo `float`, esta clase constructora cuenta con los siguientes metodos:

- `Float.parse`: es usada para convertir una cadena de texto a un objeto del tipo `float`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let f: float = Float.parse("10.5");
  // or
  let f: float = new Float("10.5");
  print(f); // 10.5
  ```

  </details>

- `Float.toStr()`: es usada para convertir un objeto del tipo `float` a una cadena de texto.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let f: float = 10.5;
  let s: str = f.toStr();
  print(s); // "10.5"
  ```

  </details>

- `Float.toInt()`: es usada para convertir un objeto del tipo `float` a un objeto del tipo `int`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let f: float = 10.5;
  let i: int = f.toInt();
  print(i); // 10
  ```

  </details>

### `Char`

La clase constructora `Char` es la encargada de crear objetos del tipo `char`, esta clase constructora cuenta con los siguientes metodos:

- `Char.parse()`: es usada para convertir una cadena de texto a un objeto del tipo `char`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let c: char = Char.parse("A");
  // or
  let c: char = new Char("A");
  print(c); // 'A'
  ```

  </details>

- `Char.toStr()`: es usada para convertir un objeto del tipo `char` a una cadena de texto.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let c: char = "A";
  let s: str = c.toStr();
  print(s); // "A"
  ```

  </details>

- `Char.toInt()`: es usada para convertir un objeto del tipo `char` a un objeto del tipo `int`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let c: char = "A";
  let i: int = c.toInt();
  print(i); // 65
  ```

  </details>

### `Bool`

La clase constructora `Bool` es la encargada de crear objetos del tipo `bool`, esta clase constructora cuenta con los siguientes metodos:

- `Bool.parse()`: es usada para convertir una cadena de texto a un objeto del tipo `bool`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let b: bool = Bool.parse("true");
  // or
  let b: bool = new Bool("true");
  print(b); // true
  ```

  </details>

- `Bool.toStr()`: es usada para convertir un objeto del tipo `bool` a una cadena de texto.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let b: bool = true;
  let s: str = b.toStr();
  print(s); // "true"
  ```

  </details>

### `Str`

La clase constructora `Str` es la encargada de crear objetos del tipo `str`, esta clase constructora cuenta con los siguientes metodos:

- `Str.parse()`: es usada para convertir un primitivo o un objeto a una cadena de texto.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = Str.parse(10);
  // or
  let s: str = new Str(10);
  print(s); // "10"
  ```

  </details>

- `Str.toChar()`: es usada para convertir un objeto del tipo `str` a un objeto del tipo `char`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "A";
  let c: char = s.toChar();
  print(c); // 'A'
  ```

  </details>

- `Str.join()`: es usada para concatenar dos objetos del tipo `str` sin modificar los objetos originales.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s1: str = "Hello";
  let s2: str = "World";
  let s3: str = s1.join(s2, sep:"-");
  print(s3); // "HelloWorld"
  ```

  </details>

- `Str.split()`: es usada para dividir un objeto del tipo `str` en un arreglo de objetos del tipo `str`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello-World";
  let arr: str[] = s.split("-");
  print(arr); // ["Hello", "World"]
  ```

  </details>


- `Str.at()`: es usada para obtener un caracter de un objeto del tipo `str` en una posición especifica.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello";
  let c: char = s.at(0);
  print(c); // 'H'
  ```

  </details>

- `Str.toUpper()`: es usada para convertir un objeto del tipo `str` a mayúsculas.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello";
  let s2: str = s.upper();
  print(s2); // "HELLO"
  ```

  </details>

- `Str.toLower()`: es usada para convertir un objeto del tipo `str` a minúsculas.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello";
  let s2: str = s.lower();
  print(s2); // "hello"
  ```

  </details>

- `String.toCapital()`: es usada para convertir un objeto del tipo `str` a capital.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "hello";
  let s2: str = s.capital();
  print(s2); // "Hello"
  ```

  </details>

- `Str.trim()`: es usada para eliminar los espacios en blanco al inicio y al final de un objeto del tipo `str`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = " Hello ";
  let s2: str = s.trim();
  print(s2); // "Hello"
  ```

  </details>


- `Str.trimLeft()`: es usada para eliminar los espacios en blanco al inicio de un objeto del tipo `str`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = " Hello ";
  let s2: str = s.trimLeft();
  print(s2); // "Hello "
  ```

  </details>

- `Str.trimRight()`: es usada para eliminar los espacios en blanco al final de un objeto del tipo `str`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = " Hello ";
  let s2: str = s.trimRight();
  print(s2); // " Hello"
  ```

  </details>

- `Str.replace()`: es usada para reemplazar una cadena de texto por otra en un objeto del tipo `str`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello World";
  let s2: str = s.replace("World", "Mundo");
  print(s2); // "Hello Mundo"
  ```

  </details>

- `Str.has()`: es usada para verificar si un objeto del tipo `str` contiene una cadena de texto o hay coincidencia con una expresión regular.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello World";
  let b: bool = s.has("World");
  print(b); // true
  let b2: bool = s.has(/World/);
  print(b2); // true
  ```

  </details>

- `Str.startsWith()`: es usada para verificar si un objeto del tipo `str` comienza con una cadena de texto o hay coincidencia con una expresión regular.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello World";
  let b: bool = s.startsWith("Hello");
  print(b); // true
  let b2: bool = s.startsWith(/Hello/);
  print(b2); // true
  ```

  </details>

- `Str.endsWith()`: es usada para verificar si un objeto del tipo `str` termina con una cadena de texto o hay coincidencia con una expresión regular.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello World";
  let b: bool = s.endsWith("World");
  print(b); // true
  let b2: bool = s.endsWith(/World/);
  print(b2); // true
  ```

  </details>

- `Str.match()`: es usada para obtener un arreglo de objetos del tipo `str` que coincidan con una expresión regular.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello World";
  let arr: str[] = s.match(/World/);
  print(arr); // ["World"]
  ```

  </details>

- `Str.indexOf()`: es usada para obtener la posición de una cadena de texto o una expresión regular dentro de un objeto del tipo `str`.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello World";
  let i: int = s.indexOf("World");
  print(i); // 6
  let i2: int = s.indexOf(/World/);
  print(i2); // 6
  ```

  </details>

- `Str.lastIndexOf()`: es usada para obtener la posición de una cadena de texto o una expresión regular dentro de un objeto del tipo `str` empezando desde el final.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello World";
  let i: int = s.lastIndexOf("World");
  print(i); // 6
  let i2: int = s.lastIndexOf(/World/);
  print(i2); // 6
  ```

  </details>

- `Str.repeat()`: es usada para repetir un objeto del tipo `str` una cantidad de veces.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let s: str = "Hello";
  let s2: str = s.repeat(3);
  print(s2); // "HelloHelloHello"
  ```

  </details>

### `Record`

Los registros son una colección de propiedades, y una propiedad es una asociación entre un nombre (o clave) y un valor. Un valor de propiedad puede ser de cualquier tipo, incluidos otros registros con la característica de anidamiento e inmutabilidad.

- `Record.create()`: es usado para crear un registro a partir de un objeto literal.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let rec1: record = Record.create({
    name: 'John',
    age: 20,
  });

  // or literal Record

  let rec1: record = #{
    name: 'John',
    age: 20,
  };

  // or constructor Record

  let rec1: record = new Record({
    name: 'John',
    age: 20,
  });

  print(rec1); // #{ name: 'John', age: 20 }
  ```

  </details>

- `Record.copy()`: es usado para crear una copia de un registro.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let rec1: record = Record.create({
    name: 'John',
    age: 20,
  });

  let rec2: record = rec1.copy();
  print(rec2); // #{ name: 'John', age: 20 }
  ```

  </details>

- `Record.get()`: es usado para eliminar todas las propiedades de un registro.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let rec1: record = Record.create({
    name: 'John',
    age: 20,
  });

  print(rec1.get('name')); // 'John'
  print(rec1.get('age')); // 20
  ```

  </details>

- `Record.has()`: es usado para verificar si una propiedad existe en un registro.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let rec1: record = Record.create({
    name: 'John',
    age: 20,
  });

  print(rec1.has('name')); // true
  print(rec1.has('age')); // true
  print(rec1.has('city')); // false
  ```

  </details>

### `Tuple`

Las tuplas son una colección de elementos, y un elemento es una asociación entre un índice y un valor. Un valor de elemento puede ser de cualquier tipo, incluidos otros registros con la característica de anidamiento e inmutabilidad.

- `Tuple.create()`: es usado para crear una tupla a partir de un objeto literal.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let tup1: tuple = Tuple.create(['John', 20]);

  // or literal Tuple

  let tup1: tuple = #['John', 20];

  // or constructor Tuple

  let tup1: tuple = new Tuple(['John', 20]);

  print(tup1); // #[ 'John', 20 ]
  ```

  </details>

- `Tuple.copy()`: es usado para crear una copia de una tupla.
  
    <details>
    <summary>Ejemplo</summary>
  
    ```rs
    let tup1: tuple = Tuple.create(['John', 20]);
  
    let tup2: tuple = tup1.copy();
    print(tup2); // #[ 'John', 20 ]
    ```
  
    </details>

- `Tuple.at()`: es usado para obtener el valor de un elemento de una tupla.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let tup1: tuple = Tuple.create(['John', 20]);

  print(tup1.at(0)); // 'John'
  print(tup1.at(1)); // 20
  // or
  print(tup1[0]); // 'John'
  ```

  </details>


### `None`

El tipo `None` es usado para representar la ausencia de un valor. Es usado en casos donde un valor no es requerido, como en la declaración de variables, parámetros de funciones, etc.

- `None`: es el valor por defecto de las variables que no tienen un valor asignado.

  <details>
  <summary>Ejemplo</summary>

  ```rs -> riot
  let user: str | none = none;
  user = "John";
  print(a); // None

  // or

  fn foo(a: int): None {
    print(a); // None
  }
  ```

  </details>

## Objetos compuestos

### `Array`

El tipo `Array` es usado para representar una lista de elementos. Los elementos de un arreglo pueden ser de cualquier tipo, incluso pueden ser de tipos diferentes.

- `Array`: es usado para crear un arreglo vacío.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let arr1: int[] = [];
  print(arr1); // []
  // or

  let arr2: int[] = Array();

  print(arr2); // []
  ```

  </details>

- `Array.from()`: es usado para crear un arreglo a partir de un objeto iterable.

  <details>
  <summary>Ejemplo</summary>

  ```rs -> riot
  // from array
  let arr1: int[] = Array.from([1, 2, 3]);
  print(arr1); // [1, 2, 3]
  
  // or strings

  let arr2: int[] = Array.from("Hello");
  print(arr2); // ["H", "e", "l", "l", "o"]

  // or using range

  let arr3: int[] = Array.from(1..5);
  ```

  </details>

- `Array.of()`: es usado para crear un arreglo a partir de una lista de elementos.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let arr1: int[] = Array.of(1, 2, 3);
  print(arr1); // [1, 2, 3]
  ```

  </details>

- `Array.push()`: es usado para agregar un elemento al final de un arreglo.

  > ⚠️ MUTABLE \
  > **Nota**: Este método modifica el arreglo original.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let arr1: int[] = [1, 2, 3];
  arr1.push(4);
  print(arr1); // [1, 2, 3, 4]
  ```

  </details>

- `Array.pop()`: es usado para eliminar el último elemento de un arreglo.

  > ⚠️ MUTABLE \
  > **Nota**: Este método modifica el arreglo original.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let arr1: int[] = [1, 2, 3];
  arr1.pop();
  print(arr1); // [1, 2]
  ```

  </details>

- `Array.append()`: es usado para agregar un elemento al inicio de un arreglo.

  > ⚠️ MUTABLE \
  > **Nota**: Este método modifica el arreglo original.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let arr1: int[] = [1, 2, 3];
  arr1.append(0);
  print(arr1); // [0, 1, 2, 3]
  ```

  </details>

- `Array.join()`: es usado para unir arreglos o elementos en un solo arreglo.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let arr1: int[] = [1, 2, 3]
  let arr2: int[] = [4, 5, 6]
  let arr3: int[] = [7, 8, 9]
  let arr4: int[] = arr1.join(arr2, arr3);
  print(arr4); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```

  </details>

- `Array.entries()`: es usado para crear un `record` con los índices y los valores de un arreglo.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let arr1: int[] = [1, 2, 3];
  let r: record = arr1.entries();
  print(r); // {0: 1, 1: 2, 2: 3}
  ```

  </details>

- `Array.iter()`: es usado para crear un iterador de un arreglo.

  <details>
  <summary>Ejemplo</summary>

  ```ts
  let arr1: int[] = [1, 2, 3];
  let iter: Iterator = arr1.iter();
  print(iter.next()); // 1
  print(iter.next()); // 2
  print(iter.next()); // 3
  print(iter.next()); // None
  ```

  </details>

- `Array.map()`: es usado para crear un nuevo arreglo con los resultados de la llamada a una función proporcionada en cada elemento del arreglo.


  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  let arr2: int[] = arr1.map((x: int) -> x * 2);
  print(arr2); // [2, 4, 6]
  ```

  </details>

- `Array.filter()`: es usado para crear un nuevo arreglo con todos los elementos que cumplan con la condición implementada por la función proporcionada.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3, 4, 5];
  let arr2: int[] = arr1.filter((x: int) -> x % 2 == 0);
  print(arr2); // [2, 4]
  ```

  </details>

- `Array.reduce()`: es usado para ejecutar una función reductora sobre cada elemento de un arreglo, devolviendo como resultado un único valor.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3, 4, 5];
  let sum: int = arr1.reduce((acc: int, x: int) -> acc + x, 0);
  print(sum); // 15
  ```

  </details>

- `Array.reverse()`: es usado para invertir el orden de los elementos de un arreglo sin modificar el arreglo original.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3, 4, 5];
  let arr2: int[] = arr1.reverse();
  print(arr2); // [5, 4, 3, 2, 1]
  ```

  </details>

- `Array.sort()`: es usado para ordenar los elementos de un arreglo en orden ascendente sin modificar el arreglo original.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [5, 4, 3, 2, 1];
  let arr2: int[] = arr1.sort();
  // or
  let arr2: int[] = arr1.sort((a: int, b: int) -> a - b);

  print(arr2); // [1, 2, 3, 4, 5]
  ```

  </details>

- `Array.copy()`: es usado para crear una copia de un arreglo.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  let arr2: int[] = arr1.copy();
  print(arr2); // [1, 2, 3]
  ```

  </details>

- `Array.clear()`: es usado para eliminar todos los elementos de un arreglo.

  > ⚠️ MUTABLE \
  > **Nota**: Este método modifica el arreglo original.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  arr1.clear();
  print(arr1); // []
  ```

  </details>

- `Array.has()`: es usado para verificar si un elemento existe en un arreglo.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  print(arr1.has(1)); // true
  print(arr1.has(4)); // false
  ```

  </details>

- `Array.find()`: es usado para buscar un elemento en un arreglo y devolver el elemento.
  
    <details>
    <summary>Ejemplo</summary>
  
    ```rs
    let arr1: int[] = [1, 2, 3];
    print(arr1.find(1)); // 1 (1 iteration)
    print(arr1.find(4)); // none
    ```
  
    </details>

- `Array.findLast()`: es usado para buscar un elemento en un arreglo y devolver el elemento empezando desde el final.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  print(arr1.findLast(1)); // 1 (3 iterations)
  print(arr1.findLast(4)); // none
  ```
  </details>

- `Array.findIndex()`: es usado para buscar un elemento en un arreglo y devolver su índice empezando desde el final.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  print(arr1.findIndex(1)); // 0 (1 iteration)
  print(arr1.findIndex(4)); // none
  ```
  </details>

- `Array.findLastIndex()`: es usado para buscar un elemento en un arreglo y devolver su índice empezando desde el final.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  print(arr1.findLastIndex(1)); // 0 (3 iterations)
  print(arr1.findLastIndex(4)); // none
  ```
  </details>

- `Array.every()`: es usado para verificar si todos los elementos de un arreglo cumplen con la condición implementada por la función proporcionada.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  print(arr1.every((x: int) -> x > 0)); // true
  print(arr1.every((x: int) -> x > 1)); // false
  ```
  </details>

- `Array.some()`: es usado para verificar si al menos un elemento de un arreglo cumple con la condición implementada por la función proporcionada.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  print(arr1.some((x: int) -> x > 0)); // true
  print(arr1.some((x: int) -> x > 3)); // false
  ```
  </details>

- `Array.forEach()`: es usado para ejecutar la función proporcionada una vez por cada elemento del arreglo.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  arr1.forEach((x: int) -> print(x));
  // 1
  // 2
  // 3
  ```
  </details>

- `Array.concat()`: es usado para unir todos los elementos de un arreglo en una cadena y devolver esta cadena.

  <details>
  <summary>Ejemplo</summary>

  ```rs
  let arr1: int[] = [1, 2, 3];
  print(arr1.concat()); // "123"
  print(arr1.concat("-")); // "1-2-3"
  ```
  </details>


> Proximos a implementar
> Functions, HashMap, HashSet, LinkedList, Queue, Stack, Tree, Graph, 
> si quieres contribuir, puedes hacerlo en el repositorio de github
> [Aqui](https://github.com/carlos-burelo/riot)