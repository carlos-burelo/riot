# Clases

Las clases en Riot son una forma de organizar y estructurar el codigo de una manera mas legible y mantenible. Las clases en Riot son muy similares a las clases en otros lenguajes de programacion como Python, TypeScript y Rust.

## Declaracion de Clases

Para declarar una clase en Riot, se utiliza la palabra clave `class` seguida del nombre de la clase y un bloque de codigo que contiene los metodos y propiedades de la clase.

```ts
class Persona {
    nombre: str
    edad: int

    constructor(nombre: str, edad: int): void {
        self.nombre = nombre
        self.edad = edad
    }

    saludar() {
        print("Hola, mi nombre es {self.nombre} y tengo {self.edad} años")
    }
}

const persona = new Persona("Juan", 25)
```


## Herencia

Las clases en Riot soportan herencia, lo que significa que una clase puede heredar propiedades y metodos de otra clase. Para heredar de una clase, se utiliza la palabra clave `extends` seguida del nombre de la clase de la que se quiere heredar.

```ts
class Empleado extends Persona {
    salario: float

    constructor(nombre: str, edad: int, salario: float): void {
        super(nombre, edad)
        self.salario = salario
    }

    trabajar() {
        print("{self.nombre} esta trabajando")
    }
}

const empleado = new Empleado("Pedro", 30, 1000.0)
```

En el ejemplo anterior, la clase `Empleado` hereda de la clase `Persona` y agrega una propiedad `salario` y un metodo `trabajar`.

## Metodos Estaticos

Las clases en Riot tambien soportan metodos estaticos, que son metodos que se pueden llamar sin necesidad de instanciar la clase. Para declarar un metodo estatico, se utiliza la palabra clave `static` seguida del nombre del metodo.

```ts

class Math {
    static sumar(a: int, b: int): int {
        return a + b
    }
}

const resultado = Math.sumar(10, 20)
```

En el ejemplo anterior, la clase `Math` tiene un metodo estatico `sumar` que suma dos numeros enteros y devuelve el resultado.

## Propiedades Estaticas

Las clases en Riot tambien soportan propiedades estaticas, que son propiedades que se pueden acceder sin necesidad de instanciar la clase. Para declarar una propiedad estatica, se utiliza la palabra clave `static` seguida del nombre de la propiedad.

```ts

class Config {
    static version: str = "1.0.0"
}

print(Config.version)
```

En el ejemplo anterior, la clase `Config` tiene una propiedad estatica `version` que contiene la version de la aplicacion.

## Tipos de acceso

Las clases en Riot soportan tres tipos de acceso para sus propiedades y metodos: `public`, `private` y `protected`.

- `public`: Las propiedades y metodos publicos se pueden acceder desde cualquier parte del codigo.

- `private`: Las propiedades y metodos privados solo se pueden acceder desde dentro de la clase en la que fueron declarados.

- `protected`: Las propiedades y metodos protegidos solo se pueden acceder desde la clase en la que fueron declarados y desde las clases que heredan de ella.

```ts
class Persona {
    public nombre: str
    private edad: int
    protected genero: str

    constructor(nombre: str, edad: int, genero: str): void {
        self.nombre = nombre
        self.edad = edad
        self.genero = genero
    }

    saludar() {
        print("Hola, mi nombre es {self.nombre} y tengo {self.edad} años")
    }
}

class Empleado extends Persona {
    constructor(nombre: str, edad: int, genero: str): void {
        super(nombre, edad, genero)
    }

    trabajar() {
        print("{self.nombre} esta trabajando")
    }
}
```

En el ejemplo anterior, la clase `Persona` tiene una propiedad `nombre` publica, una propiedad `edad` privada y una propiedad `genero` protegida. La clase `Empleado` hereda de la clase `Persona` y puede acceder a la propiedad `nombre` pero no puede acceder a la propiedad `edad` ya que es privada.


## Decoradores

Los decoradores son una caracteristica avanzada de las clases en Riot que permiten modificar o extender el comportamiento de una clase o de sus metodos y propiedades. Los decoradores se utilizan para anotar clases, metodos y propiedades con metadatos que pueden ser utilizados por el interprete para modificar su comportamiento.

```ts
function log(target: any, key: str, descriptor: any): void {
    const original = descriptor.value

    descriptor.value = function(...args: any[]): any {
        print(`Llamando al metodo ${key} con los argumentos ${args}`)
        return original.apply(this, args)
    }
}

class Persona {
    nombre: str
    edad: int

    constructor(nombre: str, edad: int): void {
        self.nombre = nombre
        self.edad = edad
    }

    @log
    saludar() {
        print("Hola, mi nombre es {self.nombre} y tengo {self.edad} años")
    }
}

const persona = new Persona("Juan", 25)

persona.saludar()
```

En el ejemplo anterior, se define un decorador `log` que anota el metodo `saludar` de la clase `Persona` y lo modifica para que imprima un mensaje antes de llamar al metodo original.

## Factory Functions

Las factory functions son una forma de crear instancias de una clase sin necesidad de utilizar la palabra clave `new`. Las factory functions son funciones que devuelven un objeto que tiene las propiedades y metodos de una clase.

```ts
class Persona {
    nombre: str
    edad: int
    factory(nombre: str, edad: int): Persona
}

let persona = Persona("Juan", 25)
```

En el ejemplo anterior, se define una factory function `Persona` que devuelve un objeto con las propiedades y metodos de la clase `Persona`.

##  Metodos Getters y Setters

Las clases en Riot soportan metodos getters y setters, que son metodos especiales que se utilizan para acceder y modificar propiedades de una clase.

```ts

class Persona {
    private _nombre: str

    get nombre(): str {
        return self._nombre
    }

    set nombre(value: str): void {
        self._nombre = value
    }
}

const persona = new Persona()

persona.nombre = "Juan"

print(persona.nombre)
```

En el ejemplo anterior, se define una propiedad privada `_nombre` y se definen los metodos getters y setters `nombre` para acceder y modificar la propiedad `_nombre`.

##  Metodos y clases Abstractas

Las clases y metodos abstractos son una caracteristica avanzada de las clases en Riot que permiten definir una clase o un metodo sin implementarlos y requerir que las clases que heredan de ellas los implementen.

```ts

abstract class Figura {
    abstract area(): float
}

class Circulo extends Figura {
    radio: float

    constructor(radio: float): void {
        this.radio = radio
    }

    area(): float {
        return 3.1416 * this.radio ** 2
    }
}

const circulo = new Circulo(5)

print(circulo.area())
```


En el ejemplo anterior, se define una clase abstracta `Figura` con un metodo abstracto `area` y se define una clase `Circulo` que hereda de `Figura` y implementa el metodo `area`.


##  Interfaces

Las interfaces son una caracteristica avanzada de las clases en Riot que permiten definir un contrato que las clases deben cumplir. Las interfaces se utilizan para definir la forma de un objeto sin especificar su implementacion.

```ts
interface Figura {
    area(): float
    radio: float
    constructor(radio: float): Figura
}

class Circulo implements Figura {
    radio: float

    constructor(radio: float): void {
        this.radio = radio
    }

    area(): float {
        return 3.1416 * this.radio ** 2
    }
}

const circulo = new Circulo(5)

print(circulo.area())
```

En el ejemplo anterior, se define una interfaz `Figura` con un metodo `area` y una propiedad `radio` y se define una clase `Circulo` que implementa la interfaz `Figura`.

##  Conclusion

Las clases en Riot son una caracteristica poderosa y flexible que permite organizar y estructurar el codigo de una manera mas legible y mantenible. Las clases en Riot soportan herencia, metodos estaticos, propiedades estaticas, tipos de acceso, decoradores, factory functions, metodos getters y setters, metodos y clases abstractas e interfaces, lo que las convierte en una herramienta poderosa para el desarrollo de aplicaciones complejas y escalables.




