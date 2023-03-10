# Riot Language specification

Riot is a interpreted programming language strongly inspired by Python, Rust and TypeScript with a focus on simplicity and performance strictly typed.

# Data types

| Type | Description |
| --- | --- |
| **Numbers** | `int`, `float`, `bigint` |
| **Strings** | `str`, `char` |
| **Booleans** | `bool` |
| **Objects** | `list`, `object`, `func`, `tuple` |
| **Empty** | `void`, `unknown`, `none`, `undefined`, `any` |

## Variables

```ts
// normal variable
var num1: int = 1

// multiple variables
var num1: int, num2: int

// multiple variables with value
var num2: int = 2, num3: int = 3

// multiple variables with diferent type
var num4: int = 4, say: str = "string"
```

## Constants

```ts
// normal constant
const num1: int = 1

// multiple constants (initial value is required)
const num1: int = 1, num2: int = 2

// multiple constants with diferent type
const num3: int = 3, say: str = "string"
```

## Tuple

```ts
// normal tuple (without type default is any)
var tuple: tuple = (1, "Hello", true)

// tuple with type
var tuple: tuple<int, str> = (1, "Hello")

```

## Objects

```ts
// object with type
var obj: object = {
    name: "John",
    age: 20
}

// object with other type declaration (recomended)
interface Person {
    name: str,
    age: int
}

var otherObj: Person = {
    name: "John",
    age: 20
}

// object with mixed types
var obj: object = {
    name: "John",
    age: 20,
    sayHello: fn (): void -> print("Hello")
}

// object with mixed types (recomended)
interface Person {
    name: str,
    age: int,
    sayHello: () -> void 
}

var otherObj: Person = {
    name: "John",
    age: 20,
    sayHello: fn (): void -> print("Hello")
}

```

## Lists

```ts
// normal list
var list: list = [1, 2, 3]

// list with type
var listOfStrings: list<str> = ["Hello", "World"]

// list with other type declaration (recomended)
var otherListOfStrings: srt[] = ["Hello", "World"]

// list with mixed types
var mixedList: list<any> = ["Hello", 1, true]

// list with mixed types (recomended)
var otherMixedList: any[] = ["Hello", 1, true]

// list with multiple types
var multipleTypesList: list<int, str, bool> = [1, "Hello", true]

// list with multiple types (recomended)
var otherMultipleTypesList: (int, str, bool)[] = [1, "Hello", true]
```

## Functions

```ts
// normal function
fn sayHello() {
    print("Hello")
}

// function with parameters
fn sayHello(name: str) {
    print("Hello " + name)
}

// function with return
fn sayHello(name: str): str {
    return "Hello " + name
}

// function with parameters and return
fn sayHello(name: str, age: int): str {
    return "Hello " + name + ", you are " + age + " years old"
}


// arrow functions

// normal arrow function (single line)
var sayHello = (): void -> print("Hello")


// normal arrow function (multiple lines)
var sayHello = (): void -> {
    print("Hello")
    print("World")
}

// anonymous function
const pet = {
  getName: fn (): str {
    return "Dog"
  }
}

// anonymous arrow function
const person = {
  getAge: (): int -> 20
}

// async/await is supported by default!!!

// anonymous async function
const pet = {
  getName: fn (): str {
    await sleep(1000)
    return "Dog"
  }
}

// anonymous async arrow function
const person = {
  getAge: (): int -> {
    await sleep(1000)
    return 20
  }
}

// method style
const person = {
  getAge(): int {
    return 20
  }
}
```


## Classes

### Basic class
```ts
class Person {
    // constructor
    constructor(name: str, age: int) {
        this.name = name
        this.age = age
    }

    // method
    sayHello() {
        print("Hello " + this.name + ", you are " + this.age + " years old")
    }
}

// create object
var person = new Person("John", 20)

// with named parameters

var person = new Person(name: "John", age: 20)
```

### Static class
```ts
class StaticClass {
    // static method
    static sayHello() {
        print("Hello")
    }
}
```

### No constructable class

```ts
class NoConstructableClass {
    // private constructor
    public NoConstructableClass() {
        return 'Hello World'
    }
}

// create string of no constructable class
const message: str = NoConstructableClass()

print(message) // Hello world
```

## Inheritance

```ts

class Person {
    // constructor
    constructor(name: str, age: int) {
        this.name = name
        this.age = age
    }

    // method
    sayHello() {
        print("Hello " + this.name + ", you are " + this.age + " years old")
    }
}

// extend class Person
class Student extends Person {
    // constructor
    constructor(name: str, age: int, school: str) {
        super(name, age)
        this.school = school
    }

    // method
    sayHello() {
        print("Hello " + this.name + ", you are " + this.age + " years old and you study in " + this.school)
    }
}

// extends multiple classes

class StudentWithFriends extends Person, Student {
    // constructor
    constructor(name: str, age: int, school: str) {
      super.Person(name, age)
      super.Student(name, age, school)
    }

    // method
    sayHello() {
        print("Hello " + this.name + ", you are " + this.age + " years old and you study in " + this.school)
    }
}
```

## Interfaces

```ts
interface Person {
  name: str
  age: int
  readonly constructor(name: str, age: int)
}

// implements interface
class Student implements Person {
    name: str
    age: int
    constructor(name: str, age: int) {
        this.name = name
        this.age = age
    }

    // method
    sayHello() {
        print("Hello " + this.name + ", you are " + this.age + " years old")
    }
}
```

## Generics

```ts
// generic function
fn sayHello<T>(name: T): T {
    return "Hello " + name
}

// use generic function

const name: str = sayHello<str>("John")

// generic arrow function

var sayHello = <T>(name: T): T -> "Hello " + name

// use generic arrow function
var name: str = sayHello<str>("John")

// generic class

```

# in progress...