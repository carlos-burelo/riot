# Funciones

Las funciones son un bloque de código que se ejecuta cuando es llamado. Puedes pasar datos, llamados parámetros, a una función. Las funciones pueden devolver datos como resultado.

## Declaración de funciones

Las funciones se declaran con la palabra reservada `fn` seguido del nombre de la función, los parámetros y el tipo de dato que devuelve la función.

```rs
fn sayHello(name: str): str {
    return "Hello {name}"
}
```

Como podemos obserbar, la función `sayHello` recibe un parámetro de tipo `str` y devuelve un valor de tipo `str`

## Llamada a funciones

Las funciones se llaman con el nombre de la función y los parámetros que recibe.

```rs
fn sayHello(name: str): str {
    return "Hello {name}"
}

sayHello("Riot")
```

## Parámetros

Los parámetros son los valores que se pasan a una función. Los parámetros se declaran en la declaración de la función.

```rs

fn sayHello(name: str, from: str): str {
    return "Hello {name} from {from}"
}

sayHello('Wold', 'Riot')
```

## Retorno de funciones

Las funciones pueden devolver un valor. Para devolver un valor se usa la palabra reservada `return` seguido del valor que se quiere devolver.

```rs
fn sum(a: i32, b: i32): i32 {
    return a + b
}

sum(1, 2) // 3
``` 

## Funciones anónimas / Flecha

Las funciones anónimas son funciones que no tienen nombre y que se encuentra declaradas como valor de un callback o propiedad. Se declaran con la sintaxis de una funcion, pero sin incluir la palabra reservada `fn` seguido de los parámetros y el tipo de dato que devuelve la función seguido de los caracteres `->` y el cuerpo de la función.



```rs

// Función anónima dentro de una propiedad de un objeto
const user = {
    name: 'Riot',
    sayHello: (name: str) -> str {
        return "Hello {this.name}"
    }
}

user.sayHello('Riot') // Hello Riot


// Función anónima dentro de un callback

type Task = (name: str) -> str

fn map(arr: list, forEach: Task): list {
    let result: str[] = []
    for (item in arr) {
        result.push(forEach(item))
    }
    return result
}

const arr: str[] = ['Riot', 'Riot']

map(arr, (name: str): str -> "Hello {name}") // ['Hello Riot', 'Hello Riot']
```

## Funciones recursivas

Las funciones recursivas son funciones que se llaman a si mismas. Se declaran de la misma forma que una función normal, pero en el cuerpo de la función se llama a si misma.

```rs

fn factorial(n: i32): i32 {
    if (n == 1) return 1
    return n * factorial(n - 1)
}

factorial(5) // 120
```


## Funciones de orden superior

Las funciones de orden superior son funciones que reciben como parámetro otra función o que devuelven una función.

```rs

// Función que recibe como parámetro otra función

fn map(arr: list, forEach: Task): list {
    let result: str[] = []
    for (item in arr) {
        result.push(forEach(item))
    }
    return result
}

const arr: str[] = ['Riot', 'Riot']

map(arr, (name: str): str -> "Hello {name}") // ['Hello Riot', 'Hello Riot']

// Función que devuelve una función

type Func = (i: i32) -> i32

fn makeAdder(x: i32): Func {
  return (a: i32, b: i32): i32 -> a + b + x
}

const add5: Func = makeAdder(5)

add5(10, 20) // 35
```

## Funciones de primera clase

Las funciones de primera clase son funciones que se pueden asignar a variables, pasar como parámetro a otras funciones o devolver como resultado de una función.

```rs

// Función que se asigna a una variable

type Func = (name: str) -> str
const sayHello: Func = (name: str): str -> "Hello {name}"

sayHello('Riot') // Hello Riot
```
