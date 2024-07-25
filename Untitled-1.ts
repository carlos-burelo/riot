
class BuilInTypes {
    static u8 = new PrimitiveType('u8')
    static u16 = new PrimitiveType('u16')
    static u32 = new PrimitiveType('u32')
    static u64 = new PrimitiveType('u64')
    static i8 = new PrimitiveType('i8')
    static i16 = new PrimitiveType('i16')
    static i32 = new PrimitiveType('i32')
    static i64 = new PrimitiveType('i64')
    static f32 = new PrimitiveType('f32')
    static f64 = new PrimitiveType('f64')
    static int = new PrimitiveType('int')
    static float = new PrimitiveType('float')
    static str = new PrimitiveType('str')
    static char = new PrimitiveType('char')
    static bool = new PrimitiveType('bool')
    static null = new PrimitiveType('null')
    static any = new PrimitiveType('any')
    static func = new PrimitiveType('func')
    static record = new PrimitiveType('record')
    static tuple = new PrimitiveType('tuple')
    static array = new PrimitiveType('list')
    static object = new PrimitiveType('object')
    static void = new PrimitiveType('void')
    static all = [
        BuilInTypes.u8,
        BuilInTypes.u16,
        BuilInTypes.u32,
        BuilInTypes.u64,
        BuilInTypes.i8,
        BuilInTypes.i16,
        BuilInTypes.i32,
        BuilInTypes.i64,
        BuilInTypes.f32,
        BuilInTypes.f64,
        BuilInTypes.int,
        BuilInTypes.float,
        BuilInTypes.str,
        BuilInTypes.char,
        BuilInTypes.bool,
        BuilInTypes.null,
        BuilInTypes.any,
        BuilInTypes.func,
        BuilInTypes.record,
        BuilInTypes.tuple,
        BuilInTypes.array,
        BuilInTypes.object,
        BuilInTypes.void

    ]
    static allNames = BuilInTypes.all.map(t => t.name)

    static floats = [
        BuilInTypes.f32,
        BuilInTypes.f64,
        BuilInTypes.float
    ]
    static floatsNames = BuilInTypes.floats.map(t => t.name)
    static integers = [
        BuilInTypes.u8,
        BuilInTypes.u16,
        BuilInTypes.u32,
        BuilInTypes.u64,
        BuilInTypes.i8,
        BuilInTypes.i16,
        BuilInTypes.i32,
        BuilInTypes.i64,
        BuilInTypes.int
    ]
    static integerNames = BuilInTypes.integers.map(t => t.name)
    static strings = [
        BuilInTypes.str,
        BuilInTypes.char
    ]
    static numbers = [
        ...BuilInTypes.integers,
        ...BuilInTypes.floats
    ]
    static numbersNames = BuilInTypes.numbers.map(t => t.name)
    static stringNames = BuilInTypes.strings.map(t => t.name)
    static bools = [
        BuilInTypes.bool
    ]
    static boolNames = BuilInTypes.bools.map(t => t.name)
    static isBuilInType(type: Type): boolean {
        return BuilInTypes.all.some(t => t.name === (type as PrimitiveType).name)
    }
    static isNumber(type: Type): boolean {
        return BuilInTypes.numbers.some(t => t.name === (type as PrimitiveType).name)
    }
    static isFloat(type: Type): boolean {
        return BuilInTypes.floats.some(t => t.name === (type as PrimitiveType).name)
    }
    static isInteger(type: Type): boolean {
        return BuilInTypes.integers.some(t => t.name === (type as PrimitiveType).name)
    }
}
class BuilInFunctions {
    static print = new FunctionType([new TypeAnnotation(BuilInTypes.any)], new TypeAnnotation(BuilInTypes.void))
    static println = new FunctionType([new TypeAnnotation(BuilInTypes.any)], new TypeAnnotation(BuilInTypes.void))
    static input = new FunctionType([new TypeAnnotation(BuilInTypes.str)], new TypeAnnotation(BuilInTypes.str))
    static random = new FunctionType([new TypeAnnotation(BuilInTypes.int)], new TypeAnnotation(BuilInTypes.int))
}
class MathFunctions {
    static abs = new FunctionType([new TypeAnnotation(BuilInTypes.int)], new TypeAnnotation(BuilInTypes.int))
    static ceil = new FunctionType([new TypeAnnotation(BuilInTypes.float)], new TypeAnnotation(BuilInTypes.float))
    static floor = new FunctionType([new TypeAnnotation(BuilInTypes.float)], new TypeAnnotation(BuilInTypes.float))
    static max = new FunctionType([new TypeAnnotation(BuilInTypes.int), new TypeAnnotation(BuilInTypes.int)], new TypeAnnotation(BuilInTypes.int))
    static min = new FunctionType([new TypeAnnotation(BuilInTypes.int), new TypeAnnotation(BuilInTypes.int)], new TypeAnnotation(BuilInTypes.int))
    static pow = new FunctionType([new TypeAnnotation(BuilInTypes.int), new TypeAnnotation(BuilInTypes.int)], new TypeAnnotation(BuilInTypes.int))
    static round = new FunctionType([new TypeAnnotation(BuilInTypes.float)], new TypeAnnotation(BuilInTypes.int))
    static sqrt = new FunctionType([new TypeAnnotation(BuilInTypes.float)], new TypeAnnotation(BuilInTypes.float))
}
class BuilInObjects {
    static Math = MathFunctions
}
class BuiltIns {
    static types = BuilInTypes
    static functions = BuilInFunctions
    static objects = BuilInObjects
    static getFunction(name: keyof BuilInFunctions): FnTy | undefined {
        return BuiltIns.functions[name]
    }
    static getObjectMethod(obj: keyof BuilInObjects, method: string): FunctionType | undefined {
        return BuiltIns.objects[obj]?.[method]
    }
}
class SemanticAnalyzer {
    symbols: SymbolTable
    errors: string[]
    scope: Map<string, SymbolItem>
    private currentReturnType: Type | null = null
    constructor(private ast: Program) {
        this.symbols = new SymbolTable()
        this.errors = []
        this.scope = this.symbols.getCurrentScope()
    }
    analyze() {
        this.program(this.ast)
    }
    program(program: Program) {
        this.symbols.pushScope()
        if (program.statements.body) {
            for (const stmt of program.statements.body) this.node(stmt)
        }
        this.symbols.popScope()
    }
    node(node: ASTNode) {
        switch (node.constructor) {
            case Template: return this.template(node as Template)
            case Member: return this.member(node as Member)
            case Tuple: return this.tuple(node as Tuple)
            case RecordLiteral: return this.record(node as RecordLiteral)
            case Lambda: return this.lambda(node as Lambda)
            case SpreadExpression: return this.spread(node as SpreadExpression)
            case PipeLine: return this.pipeLine(node as PipeLine)
            case New: return this.new(node as New)
            case LogicalExpression: return this.logicalExpr(node as LogicalExpression)
            case Conditional: return this.conditional(node as Conditional)
            case Enum: return this.enum(node as Enum)
            case ForOf: return this.forOf(node as ForOf)
            case DoWhile: return this.doWhile(node as DoWhile)
            case Break: return this.break(node as Break)
            case Continue: return this.continue(node as Continue)
            case Switch: return this.switch(node as Switch)
            case Match: return this.match(node as Match)
            case Try: return this.try(node as Try)
            case Throw: return this.throw(node as Throw)
            case Block: return this.block(node as Block)
            case Vars: return this.vars(node as Vars)
            case Fn: return this.fn(node as Fn)
            case Return: return this.return(node as Return)
            case If: return this.if(node as If)
            case For: return this.for(node as For)
            case ForIn: return this.forIn(node as ForIn)
            case While: return this.while(node as While)
            case Assignment: return this.assignment(node as Assignment)
            case TypeAliasDeclaration: return this.typeAlias(node as TypeAliasDeclaration)
            case BinaryExpression: return this.binaryExpr(node as BinaryExpression)
            case UnaryExpression: return this.unaryExpr(node as UnaryExpression)
            case Range: return this.range(node as Range)
            case List: return this.list(node as List)
            case Obj: return this.obj(node as Obj)
            case Call: return this.call(node as Call)
            case Id: return this.id(node as Id)
            case Int:
            case Float:
            case Str:
            case Bool:
            case Null:
                return this.literal(node)
            default:
                this.errors.push(`Unsupported node type: ${node.constructor.name}`)
        }
    }
    typeAlias(node: TypeAliasDeclaration) {
        this.symbols.defineVariable(node.name, node.type)
    }
    block(block: Block) {
        this.symbols.pushScope()
        if (block.body) {
            for (const stmt of block.body) this.node(stmt)
        }
        this.symbols.popScope()
    }
    vars(vars: Vars) {
        for (const { init, id } of vars.declarations) {
            const varType = id.type ? this.resolve(id.type) : BuilInTypes.any
            if (init) {
                const initType = this.node(init) as PrimitiveType
                if (!this.isCompatible(varType, initType)) {
                    this.errors.push(`Type mismatch:${id.name}: Cannot assign ${this.toString(initType)} to ${this.toString(varType)}`)
                }
            }
            this.symbols.defineVariable(id.name, varType)
        }
    }
    fn(fn: Fn) {
        const returnType = this.resolve(fn.type.type)
        const paramTypes = fn.params.map(({ id }) => this.resolve(id.type?.type || BuilInTypes.any))
        const functionType = new FunctionType(paramTypes.map(t => new TypeAnnotation(t)), new TypeAnnotation(returnType))
        this.symbols.defineVariable(fn.id.name, functionType)
        this.symbols.pushScope()
        this.currentReturnType = returnType
        for (const { id } of fn.params) {
            const paramType = this.resolve(id.type?.type || BuilInTypes.any)
            this.symbols.defineVariable(id.name, paramType)
        }
        if (fn.body) this.node(fn.body)
        if (this.currentReturnType === null && returnType !== BuilInTypes.void) {
            this.errors.push(`Function ${fn.id.name} is declared to return ${this.toString(returnType)}, but no return statement was found.`)
        }
        this.currentReturnType = null
        this.symbols.popScope()
    }
    return({ value }: Return) {
        if (this.currentReturnType === null) {
            this.errors.push('Return statement outside of function body')
            return
        }
        if (value) {
            const actualReturnType = this.node(value) as PrimitiveType
            if (!this.isCompatible(this.currentReturnType, actualReturnType)) {
                this.errors.push(`Type mismatch: Function expects return type ${this.toString(this.currentReturnType)}, but got ${this.toString(actualReturnType)}`)
            }
        } else if (this.currentReturnType !== BuilInTypes.void) {
            this.errors.push(`Type mismatch: Function expects return type ${this.toString(this.currentReturnType)}, but no value is returned`)
        }
    }
    if(ifStmt: If) {
        const conditionType = this.node(ifStmt.test) as PrimitiveType
        if (!this.isCompatible(BuilInTypes.bool, conditionType)) {
            this.errors.push('Condition in if statement must be a boolean')
        }
        if (ifStmt.consequent) this.node(ifStmt.consequent)
        if (ifStmt.alternate) this.node(ifStmt.alternate)
    }
    for(forStmt: For) {
        this.symbols.pushScope()
        if (forStmt.init) this.node(forStmt.init)
        if (forStmt.test) {
            const testType = this.node(forStmt.test) as PrimitiveType
            if (!this.isCompatible(BuilInTypes.bool, testType)) {
                this.errors.push('Test condition in for loop must be a boolean')
            }
        }
        if (forStmt.update) this.node(forStmt.update)
        if (forStmt.body) this.node(forStmt.body)
        this.symbols.popScope()
    }
    forIn(forInStmt: ForIn) {
        const rightType = this.node(forInStmt.right) as PrimitiveType
        const id = (forInStmt.left as Vars).declarations[0].id.name
        if (rightType instanceof ListType) {
            this.symbols.pushScope()
            this.symbols.defineVariable(id, rightType.base)
            if (forInStmt.body) this.node(forInStmt.body)
            this.symbols.popScope()
        } else if (rightType instanceof ObjectType) {
            this.symbols.pushScope()
            this.symbols.defineVariable(id, rightType)
            for (const prop of rightType.properties) {
                this.symbols.defineVariable(prop.name, prop.type)
            }
            if (forInStmt.body) this.node(forInStmt.body)
            this.symbols.popScope()
        } else if (rightType instanceof TupleType) {
            this.symbols.pushScope()
            for (let i = 0; i < rightType.elementTypes.length; i++) {
                this.symbols.defineVariable(`_${i}`, rightType.elementTypes[i])
            }
            if (forInStmt.body) this.node(forInStmt.body)
            this.symbols.popScope()
        } else if (rightType instanceof RangeType) {
            this.symbols.pushScope()
            this.symbols.defineVariable(id, BuilInTypes.int)
            if (forInStmt.body) this.node(forInStmt.body)
            this.symbols.popScope()
        }
        else {
            this.errors.push(`Type mismatch: Cannot iterate over ${this.toString(rightType)}`)
        }
    }
    while(whileStmt: While) {
        const conditionType = this.node(whileStmt.test) as PrimitiveType
        if (!this.isCompatible(BuilInTypes.bool, conditionType)) {
            this.errors.push('Condition in while statement must be a boolean')
        }
        if (whileStmt.body) this.node(whileStmt.body)
    }
    assignment(assignment: Assignment): Type {
        const leftType = this.node(assignment.left) as PrimitiveType
        const rightType = this.node(assignment.right) as PrimitiveType
        if (!this.isCompatible(leftType, rightType)) {
            this.errors.push(`Type mismatch: Cannot assign ${this.toString(rightType)} to ${this.toString(leftType)}`)
        }
        return leftType
    }
    binaryExpr(expr: BinaryExpression): Type {
        const leftType = this.node(expr.left) as PrimitiveType
        const rightType = this.node(expr.right) as PrimitiveType
        if (!leftType || !rightType) return BuilInTypes.any
        const numberTypes = BuilInTypes.numbersNames
        switch (expr.operator) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                if (numberTypes.includes(leftType.name) && numberTypes.includes(rightType.name)) {
                    return this.isNumber(leftType, rightType)
                }
                this.errors.push(`Invalid operands for operator ${expr.operator}`)
                break
            case '==':
            case '!=':
            case '<':
            case '<=':
            case '>':
            case '>=':
                if (!this.isCompatible(leftType, rightType)) {
                    this.errors.push(`[${expr.operator}] Incompatible types for comparison: ${this.toString(leftType)} and ${this.toString(rightType)}`)
                }
                return BuilInTypes.bool
            default:
                this.errors.push(`Unsupported binary operator: ${expr.operator}`)
        }
        return BuilInTypes.any
    }
    unaryExpr(expr: UnaryExpression): Type {
        const operandType = this.node(expr.right) as PrimitiveType
        switch (expr.operator) {
            case '++':
            case '--': {
                return new PrimitiveType(operandType.name)
            }
            case '-':
            case '+':
                return new PrimitiveType(operandType.name)
            case '!':
                if (operandType.name === 'bool') {
                    return BuilInTypes.bool
                }
                this.errors.push(`Invalid operand for unary operator ${expr.operator}`)
                break

            default:
                this.errors.push(`Unsupported unary operator: ${expr.operator}`)
        }
        return BuilInTypes.any
    }
    range(range: Range): Type {
        const startType = this.node(range.start) as PrimitiveType
        const endType = this.node(range.end) as PrimitiveType
        if (BuilInTypes.integers.some(t => t.name === startType.name) && BuilInTypes.integers.some(t => t.name === endType.name)) {
            return new RangeType(startType, endType)
        }
        this.errors.push(`Invalid range: ${this.toString(startType)}..${this.toString(endType)}`)
        return BuilInTypes.any
    }
    list(list: List): Type {
        const elements = list.elements.map(e => this.node(e) as PrimitiveType)
        if (elements.length === 0) {
            return new ListType(BuilInTypes.any)
        }
        const elementType = elements.reduce((prev, current) => {
            if (prev.name === 'any') return current
            if (current.name === 'any') return prev
            if (prev.name === current.name) return prev
            if (BuilInTypes.numbersNames.includes(prev.name) && BuilInTypes.numbersNames.includes(current.name)) {
                return this.isNumber(prev, current)
            }
            return BuilInTypes.any
        })
        if (elementType.name === 'any') {
            return new ListType(BuilInTypes.any)
        }
        return new ListType(elementType)
    }
    obj(obj: Obj): Type {
        const properties = obj.properties.map(p => {
            if (p instanceof Prop) {
                const propType = this.node(p.value) as PrimitiveType
                return new ObjectTypeProperty(p.id.name, propType)
            } else if (p instanceof SpreadProp) {
                const spreadType = this.node(p.expression) as ObjectType
                return spreadType.properties.map(sp => {
                    return new ObjectTypeProperty(sp.name, sp.type)
                })
            } else {
                this.errors.push('Unsupported object property')
                return new ObjectTypeProperty('', BuilInTypes.any)
            }
        })
        const propertiesFlat = properties.flat()
        const propertyNames = propertiesFlat.map(p => p.name)
        const duplicates = propertyNames.filter((name, i) => propertyNames.indexOf(name) !== i)
        if (duplicates.length) {
            this.errors.push(`Duplicate property names: ${duplicates.join(', ')}`)
        }
        return new ObjectType(propertiesFlat)
    }
    call(call: Call): Type {
        let callee: Type | null
        if (call.callee instanceof Id) {
            callee = this.symbols.getVariable(call.callee.name)
            if (!callee) {
                callee = BuiltIns.getFunction(call.callee.name as keyof BuilInFunctions) as FunctionType
            }
        } else {
            callee = this.node(call.callee) as FunctionType
        }
        if (!(callee instanceof FunctionType)) {
            const calleeType = callee ? this.toString(callee) : 'unknown'
            this.errors.push(`[${call.callee.name}] Calling non-function value: ${calleeType}`)
            return BuilInTypes.any
        }
        if (call.args.length !== callee.params.length) {
            this.errors.push(`[${(call.callee as Id).name}] Expected ${callee.params.length} arguments, but got ${call.args.length}`)
        }
        for (let i = 0; i < Math.min(call.args.length, callee.params.length); i++) {
            const argType = this.node(call.args[i]) as PrimitiveType
            const paramType = callee.params[i].type
            if (!this.isCompatible(paramType, argType)) {
                this.errors.push(`Type mismatch: Argument ${i + 1} expected ${this.toString(paramType)}, but got ${this.toString(argType)}. Consider using an explicit cast if this conversion is intentional.`)
            }
        }
        return callee.returnType.type
    }
    checkArgs(func: FunctionType, args: Expression[]) {
        if (args.length !== func.params.length) {
            this.errors.push(`Expected ${func.params.length} arguments, but got ${args.length}`)
        }
        for (let i = 0; i < Math.min(args.length, func.params.length); i++) {
            const argType = this.node(args[i]) as PrimitiveType
            const paramType = func.params[i].type
            if (!this.isCompatible(paramType, argType)) {
                this.errors.push(`Type mismatch: Argument ${i + 1} expected ${this.toString(paramType)}, but got ${this.toString(argType)}. Consider using an explicit cast if this conversion is intentional.`)
            }
        }
    }
    id(id: Id): Type {
        const varType = this.symbols.getVariable(id.name)
        if (!varType) {
            this.errors.push(`Undefined variable: ${id.name}`)
            return BuilInTypes.any
        }
        return varType
    }
    literal(literal: ASTNode): Type {
        switch (literal.constructor) {
            case Int: {
                const value = (literal as Int).value
                if (value >= 0 && value <= 255) return BuilInTypes.u8
                if (value >= 0 && value <= 65535) return BuilInTypes.u16
                if (value >= 0 && value <= 4294967295) return BuilInTypes.u32
                if (value >= 0) return BuilInTypes.u64
                if (value >= -128 && value <= 127) return BuilInTypes.i8
                if (value >= -32768 && value <= 32767) return BuilInTypes.i16
                if (value >= -2147483648 && value <= 2147483647) return BuilInTypes.i32
                return BuilInTypes.i64
            }
            case Float: {
                const value = (literal as Float).value
                if (value >= 0 && value <= 4294967295) return BuilInTypes.f32
                return BuilInTypes.f64
            }
            case Str: {
                const value = (literal as Str).value
                if (value.length === 1) return BuilInTypes.char
                return BuilInTypes.str
            }
            case Char: return BuilInTypes.char
            case Bool: return BuilInTypes.bool
            case Null: return BuilInTypes.null
            default:
                this.errors.push(`Unsupported literal type: ${literal.constructor.name}`)
                return BuilInTypes.any
        }
    }
    template(template: Template): Type {
        template.expressions.forEach(expr => this.node(expr))
        return BuilInTypes.str
    }

    member(member: Member): Type {
        const objectType = this.node(member.object) as Type
        if (objectType instanceof ObjectType) {
            const propertyName = member.computed
                ? (member.property instanceof Str ? member.property.value : null)
                : (member.property instanceof Id ? member.property.name : null)

            if (propertyName) {
                const property = objectType.properties.find(p => p.name === propertyName)
                if (property) {
                    return property.type
                }
            }
            this.errors.push(`Property ${String(propertyName)} not found on object`)
        } else {
            this.errors.push(`Cannot access property of non-object type ${this.toString(objectType)}`)
        }
        return BuilInTypes.any
    }

    tuple(tuple: Tuple): Type {
        const elementTypes = tuple.elements.map(elem => this.node(elem)) as Type[]
        return new TupleType(elementTypes)
    }

    record(record: RecordLiteral): Type {
        const properties = record.properties.map(prop => {
            const propType = this.node(prop.value) as Type
            return new ObjectTypeProperty(prop.id.name, propType)
        })
        return new ObjectType(properties)
    }

    lambda(lambda: Lambda): Type {
        //infer return type from body: Block(Return(...))
        const returnType = this.resolve(lambda.body)
        const paramTypes = lambda.params.map(({ id }) => this.resolve(id.type?.type || BuilInTypes.any))
        const functionType = new FunctionType(paramTypes.map(t => new TypeAnnotation(t)), new TypeAnnotation(returnType))
        this.symbols.pushScope()
        this.currentReturnType = returnType
        for (const { id } of lambda.params) {
            const paramType = this.resolve(id.type?.type || BuilInTypes.any)
            this.symbols.defineVariable(id.name, paramType)
        }
        if (lambda.body) this.node(lambda.body)
        if (this.currentReturnType === null && returnType !== BuilInTypes.void) {
            this.errors.push('Lambda is declared to return a value, but no return statement was found.')
        }
        this.currentReturnType = null
        this.symbols.popScope()
        return functionType

        // first approach: infer return type from body
        // for example: (a: int, b: int) => a + b
        // Block(Return(BinaryExpression(+, Id(a), Id(b)))


    }

    spread(spread: SpreadExpression): Type {
        const exprType = this.node(spread.expression) as Type
        if (exprType instanceof ListType || exprType instanceof TupleType) {
            return exprType
        }
        this.errors.push(`Cannot spread non-iterable of type ${this.toString(exprType)}`)
        return BuilInTypes.any
    }

    pipeLine(pipeline: PipeLine): Type {
        const leftType = this.node(pipeline.left) as Type
        const rightType = this.node(pipeline.right) as Type
        if (rightType instanceof FunctionType) {
            if (this.isCompatible(rightType.params[0].type, leftType)) {
                return rightType.returnType.type
            }
            this.errors.push(`Incompatible types in pipeline: ${this.toString(leftType)} | ${this.toString(rightType)}`)
        } else {
            this.errors.push(`Right side of pipeline must be a function, got ${this.toString(rightType)}`)
        }
        return BuilInTypes.any
    }

    new(newExpr: New): Type {
        const constructorType = this.node(newExpr.callee) as Type
        if (constructorType instanceof FunctionType) {
            this.checkArgs(constructorType, newExpr.args)
            return constructorType.returnType.type
        }
        this.errors.push(`Cannot instantiate non-constructor type ${this.toString(constructorType)}`)
        return BuilInTypes.any
    }

    logicalExpr(expr: LogicalExpression): Type {
        const leftType = this.node(expr.left) as Type
        const rightType = this.node(expr.right) as Type
        if (!this.isCompatible(BuilInTypes.bool, leftType) || !this.isCompatible(BuilInTypes.bool, rightType)) {
            this.errors.push(`Logical expression expects boolean operands, got ${this.toString(leftType)} ${expr.operator} ${this.toString(rightType)}`)
        }
        return BuilInTypes.bool
    }

    conditional(cond: Conditional): Type {
        const testType = this.node(cond.test) as Type
        if (!this.isCompatible(BuilInTypes.bool, testType)) {
            this.errors.push(`Condition must be a boolean, got ${this.toString(testType)}`)
        }
        const consequentType = this.node(cond.consequent) as Type
        const alternateType = this.node(cond.alternate) as Type
        if (!this.isCompatible(consequentType, alternateType)) {
            this.errors.push(`Incompatible types in conditional: ${this.toString(consequentType)} and ${this.toString(alternateType)}`)
            return BuilInTypes.any
        }
        return consequentType
    }

    enum(enumNode: Enum): Type {
        const enumType = new ObjectType([])
        this.symbols.defineVariable(enumNode.id.name, enumType)
        enumNode.members.forEach(member => {
            if (member.init) {
                const initType = this.node(member.init) as PrimitiveType
                if (!this.isCompatible(BuilInTypes.str, initType) && !this.isCompatible(BuilInTypes.int, initType)) {
                    this.errors.push(`Enum member must be initialized with string or integer, got ${this.toString(initType)}`)
                }
            }
            enumType.properties.push(new ObjectTypeProperty(member.id.name, BuilInTypes.str))
        })
        return enumType
    }

    forOf(forOf: ForOf): Type {
        const rightType = this.node(forOf.right) as Type
        if (rightType instanceof ListType) {
            this.symbols.pushScope()
            if (forOf.left instanceof Vars) {
                const leftVar = forOf.left.declarations[0]
                this.symbols.defineVariable(leftVar.id.name, rightType.base)
            } else {
                this.errors.push('Invalid left-hand side in for-of loop')
            }
            if (forOf.body) this.node(forOf.body)
            this.symbols.popScope()
        } else {
            this.errors.push(`Right-hand side of for-of loop must be iterable, got ${this.toString(rightType)}`)
        }
        return BuilInTypes.void
    }

    doWhile(doWhile: DoWhile): Type {
        if (doWhile.body) this.node(doWhile.body)
        const testType = this.node(doWhile.test) as Type
        if (!this.isCompatible(BuilInTypes.bool, testType)) {
            this.errors.push(`Do-while condition must be a boolean, got ${this.toString(testType)}`)
        }
        return BuilInTypes.void
    }

    break(_: Break): Type {
        return BuilInTypes.void
    }

    continue(_: Continue): Type {
        return BuilInTypes.void
    }

    switch(switchNode: Switch): Type {
        const discriminantType = this.node(switchNode.discriminant) as Type
        switchNode.cases.forEach(caseNode => {
            if (caseNode.test) {
                const testType = this.node(caseNode.test) as Type
                if (!this.isCompatible(discriminantType, testType)) {
                    this.errors.push(`Switch case type ${this.toString(testType)} is not compatible with switch discriminant type ${this.toString(discriminantType)}`)
                }
            }
            caseNode.consequent.forEach(stmt => this.node(stmt))
        })
        if (switchNode.defaultCase) {
            this.node(switchNode.defaultCase)
        }
        return BuilInTypes.void
    }

    match(matchNode: Match): Type {
        const discriminantType = this.node(matchNode.discriminant) as Type
        const caseTypes: Type[] = []
        matchNode.cases.forEach(caseNode => {
            if (caseNode.test) {
                const testType = this.node(caseNode.test) as Type
                if (!this.isCompatible(discriminantType, testType)) {
                    this.errors.push(`Match case type ${this.toString(testType)} is not compatible with match discriminant type ${this.toString(discriminantType)}`)
                }
            }
            const consequentType = caseNode.consequent.map(stmt => this.node(stmt)).pop() || BuilInTypes.void
            caseTypes.push(consequentType)
        })
        if (matchNode.defaultCase) {
            caseTypes.push(this.node(matchNode.defaultCase) as Type)
        }
        // Check if all case types are compatible
        const firstType = caseTypes[0]
        for (let i = 1; i < caseTypes.length; i++) {
            if (!this.isCompatible(firstType, caseTypes[i])) {
                this.errors.push(`Incompatible types in match expression: ${this.toString(firstType)} and ${this.toString(caseTypes[i])}`)
                return BuilInTypes.any
            }
        }
        return firstType
    }

    try(tryNode: Try): Type {
        if (tryNode.block) this.node(tryNode.block)
        if (tryNode.handler) {
            this.symbols.pushScope()
            this.symbols.defineVariable(tryNode.handler.param.name, BuilInTypes.any) // Assuming any type for caught error
            if (tryNode.handler.body) this.node(tryNode.handler.body)
            this.symbols.popScope()
        }
        if (tryNode.finalizer) this.node(tryNode.finalizer)
        return BuilInTypes.void
    }

    throw(throwNode: Throw): Type {
        this.node(throwNode.argument)
        return BuilInTypes.void
    }
    resolve(type: Type): Type {

        if (type instanceof TypeAnnotation) {
            return this.resolveTypeAnnotation(type)
        } else if (type instanceof PrimitiveType) {
            return type
        } else if (typeof type === 'string') {
            return this.resolvePrimitiveTypeFromString(type)
        } else if (type instanceof FunctionType) {
            const paramTypes = type.params.map(p => new TypeAnnotation(this.resolve(p.type)))
            const returnType = new TypeAnnotation(this.resolve(type.returnType.type))
            return new FunctionType(paramTypes, returnType)
        } else if (type instanceof UnionType) {
            return new UnionType(type.types.map(t => this.resolve(t)))
        } else if (type instanceof IntersectionType) {
            return new IntersectionType(type.types.map(t => this.resolve(t)))
        } else if (type instanceof ListType) {
            return new ListType(this.resolve(type.base))
        } else if (type instanceof TupleType) {
            return new TupleType(type.elementTypes.map(t => this.resolve(t)))
        } else if (type instanceof RangeType) {
            return new RangeType(this.resolve(type.start), this.resolve(type.end))
        } else if (type instanceof ObjectType) {
            return new ObjectType(type.properties.map(p =>
                new ObjectTypeProperty(p.name, this.resolve(p.type), p.optional)
            ))
        } else if (type instanceof GenericType) {
            return new GenericType(
                type.name,
                type.typeParameters.map(tp =>
                    new TypeParameter(tp.name, tp.constraint ? this.resolve(tp.constraint) : null)
                )
            )
        } else {
            this.errors.push(`Unsupported type: ${type.constructor.name}`)
            return BuilInTypes.any
        }
    }
    resolveTypeAnnotation(typeAnnotation: TypeAnnotation): Type {
        if (typeof typeAnnotation.type === 'string') {
            return this.resolvePrimitiveTypeFromString(typeAnnotation.type)
        } else {
            return this.resolve(typeAnnotation.type)
        }
    }

    resolvePrimitiveTypeFromString(typeName: string): Type {
        const type = BuilInTypes.allNames.find(t => t === typeName)
        if (type) return new PrimitiveType(type)
        this.errors.push(`Unknown type: ${typeName}`)
        return BuilInTypes.any
    }

    isCompatible(expected: Type, actual: Type): boolean {
        if (
            expected instanceof PrimitiveType && expected.name === 'any' ||
            actual instanceof PrimitiveType && actual.name === 'any'
        ) {
            return true
        }
        if (expected instanceof PrimitiveType && actual instanceof PrimitiveType) {
            if (expected.name === 'any' || actual.name === 'any') {
                return true
            }
            return expected.name === actual.name
        } else if (expected instanceof FunctionType && actual instanceof FunctionType) {
            if (expected.params.length !== actual.params.length) {
                return false
            }
            for (let i = 0; i < expected.params.length; i++) {
                if (!this.isCompatible(expected.params[i].type, actual.params[i].type)) {
                    return false
                }
            }
            return this.isCompatible(expected.returnType.type, actual.returnType.type)
        } else if (expected instanceof ListType && actual instanceof ListType) {
            return this.isCompatible(expected.base, actual.base)
        } else if (expected instanceof ObjectType && actual instanceof ObjectType) {
            if (expected.properties.length !== actual.properties.length) {
                return false
            }
            for (let i = 0; i < expected.properties.length; i++) {
                if (expected.properties[i].name !== actual.properties[i].name) {
                    return false
                }
                if (!this.isCompatible(expected.properties[i].type, actual.properties[i].type)) {
                    return false
                }
            }
            return true
        } else if (expected instanceof TupleType && actual instanceof TupleType) {
            if (expected.elementTypes.length !== actual.elementTypes.length) {
                return false
            }
            for (let i = 0; i < expected.elementTypes.length; i++) {
                if (!this.isCompatible(expected.elementTypes[i], actual.elementTypes[i])) {
                    return false
                }
            }
            return true
        }
        return false
    }
    toString(type: Type): string {
        if (type instanceof PrimitiveType) return type.name
        else if (type instanceof FunctionType) {
            const params = type.params.map(p => this.toString(p.type)).join(', ')
            return `(${params}) => ${this.toString(type.returnType.type)}`
        } else if (type instanceof ListType) {
            return `${this.toString(type.base)}[]`
        } else if (type instanceof TupleType) {
            return `[${type.elementTypes.map(t => this.toString(t)).join(', ')}]`
        } else if (type instanceof ObjectType) {
            const properties = type.properties.map(p => `${p.name}: ${this.toString(p.type)}`).join(', ')
            return `{${properties}}`
        } else if (type instanceof RangeType) {
            return `${this.toString(type.start)}..${this.toString(type.end)}`
        }
        return 'unknown'

    }
    isNumber(type1: PrimitiveType, type2: PrimitiveType): PrimitiveType {
        const numericTypes = BuilInTypes.numbersNames
        const index1 = numericTypes.indexOf(type1.name)
        const index2 = numericTypes.indexOf(type2.name)
        return new PrimitiveType(numericTypes[Math.max(index1, index2)])
    }
    getErrors(): string[] {
        return this.errors
    }
}