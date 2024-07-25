enum T {
    Let,
    Const,
    Var,
    If,
    Else,
    For,
    While,
    Break,
    Continue,
    Return,
    Function,
    Class,
    Type,
    Super,
    Constructor,
    New,
    Try,
    Catch,
    Finally,
    Throw,
    Switch,
    Case,
    Default,
    Abstract,
    Implements,
    Extends,
    Async,
    Yield,
    Await,
    Match,
    Import,
    Export,
    From,
    As,
    With,
    In,
    Of,
    PlaceHolder,
    Method,
    Get,
    Set,
    Public,
    Private,
    Protected,
    Static,
    Plus,
    Minus,
    Multiply,
    Divide,
    Modulus,
    Power,
    Increment,
    Decrement,
    PlusEqual,
    MinusEqual,
    MultiplyEqual,
    DivideEqual,
    ModulusEqual,
    PowerEqual,
    Equal,
    EqualEqual,
    NotEqual,
    GreaterThan,
    GreaterThanEqual,
    LessThan,
    LessThanEqual,
    And,
    Or,
    Not,
    BitwiseAnd,
    Pipe,
    PipeEqual,
    PipeLine,
    Caret,
    Tilde,
    ShiftLeft,
    ShiftRight,
    Dot,
    Range,
    Spread,
    Question,
    NullishCoalescing,
    NullishAssign,
    QuestionDot,
    Hash,
    At,
    Dollar,
    OpenParen,
    CloseParen,
    OpenBracket,
    CloseBracket,
    OpenBrace,
    CloseBrace,
    Comma,
    BackTick,
    Semicolon,
    Colon,
    Arrow,
    DoubleArrow,
    StringLiteral,
    TemplateLiteral,
    IntegerLiteral,
    BigIntLiteral,
    BinaryLiteral,
    OctalLiteral,
    HexLiteral,
    FloatLiteral,
    NoneLiteral,
    Identifier,
    EOF,
    NewLine,
    WhiteSpace,
    Comment,
    True,
    False,
    Symbol,
}
type KeywordMap = Record<string, T>
type Kind = T.Let | T.Const | T.Var
class Token {
    constructor(
        public type: T,
        public value: string,
    ) { }
}
const KEYWORDS: KeywordMap = {
    _: T.PlaceHolder,
    let: T.Let,
    const: T.Const,
    var: T.Var,
    if: T.If,
    get: T.Get,
    set: T.Set,
    else: T.Else,
    for: T.For,
    while: T.While,
    break: T.Break,
    continue: T.Continue,
    return: T.Return,
    fn: T.Function,
    constructor: T.Constructor,
    super: T.Super,
    static: T.Static,
    class: T.Class,
    type: T.Type,
    new: T.New,
    try: T.Try,
    catch: T.Catch,
    finally: T.Finally,
    throw: T.Throw,
    switch: T.Switch,
    case: T.Case,
    default: T.Default,
    match: T.Match,
    import: T.Import,
    export: T.Export,
    from: T.From,
    as: T.As,
    with: T.With,
    in: T.In,
    of: T.Of,
    true: T.True,
    false: T.False,
    abstract: T.Abstract,
    implements: T.Implements,
    extends: T.Extends,
    async: T.Async,
    yield: T.Yield,
    await: T.Await,
    public: T.Public,
    private: T.Private,
    protected: T.Protected,
}
class Position {
    constructor(public line: number = 1, public column: number = 1) { }
    advance(char: string = ''): void {
        if (char === '\n') {
            this.line++
            this.column = 1
        } else {
            this.column++
        }
    }
}
class LexicalAnalyzer {
    constructor(
        public source: string,
        public tokens: Token[] = [],
        public start: number = 0,
        public current: number = 0,
        public position: Position = new Position()
    ) { }
    tokenize() {
        while (!this.#isAtEnd()) {
            this.start = this.current
            this.#scan()
        }
        this.tokens.push(new Token(T.EOF, ''))
        return this.tokens
    }
    #scan() {
        const char = this.#advance()
        switch (char) {
            case '(': this.#add(T.OpenParen); break
            case ')': this.#add(T.CloseParen); break
            case '[': this.#add(T.OpenBracket); break
            case ']': this.#add(T.CloseBracket); break
            case '{': this.#add(T.OpenBrace); break
            case '}': this.#add(T.CloseBrace); break
            case ',': this.#add(T.Comma); break
            case ';': this.#add(T.Semicolon); break
            case ':': this.#add(T.Colon); break
            case '^': this.#add(T.Caret); break
            case '~': this.#add(T.Tilde); break
            case '#': this.#add(T.Hash); break
            case '@': this.#add(T.At); break
            case '$': this.#add(T.Dollar); break
            case '.':
                if (this.#next('.')) {
                    if (this.#next('.')) this.#add(T.Spread)
                    else this.#add(T.Range)
                } else
                    this.#add(T.Dot)
                break
            case '+':
                if (this.#next('+')) this.#add(T.Increment)
                else if (this.#next('=')) this.#add(T.PlusEqual)
                else this.#add(T.Plus)
                break
            case '-':
                if (this.#next('-')) this.#add(T.Decrement)
                else if (this.#next('=')) this.#add(T.MinusEqual)
                else if (this.#next('>')) this.#add(T.Arrow)
                else this.#add(T.Minus)
                break
            case '*':
                if (this.#next('*')) {
                    if (this.#next('=')) this.#add(T.PowerEqual)
                    else this.#add(T.Power)
                } else if (this.#next('=')) this.#add(T.MultiplyEqual)
                else this.#add(T.Multiply)
                break
            case '/':
                if (this.#next('/')) {
                    this.#comment()
                    break
                } else if (this.#next('=')) this.#add(T.DivideEqual)
                else this.#add(T.Divide)
                break
            case '%':
                if (this.#next('=')) this.#add(T.ModulusEqual)
                else this.#add(T.Modulus)
                break
            case '=':
                if (this.#next('=')) this.#add(T.EqualEqual)
                else if (this.#next('>')) this.#add(T.DoubleArrow)
                else this.#add(T.Equal)
                break
            case '!':
                if (this.#next('=')) this.#add(T.NotEqual)
                else this.#add(T.Not)
                break
            case '>':
                if (this.#next('=')) this.#add(T.GreaterThanEqual)
                else this.#add(T.GreaterThan)
                break
            case '<':
                if (this.#next('=')) this.#add(T.LessThanEqual)
                else this.#add(T.LessThan)
                break
            case '&':
                if (this.#next('&')) this.#add(T.And)
                else this.#add(T.BitwiseAnd)
                break
            case '|':
                if (this.#next('|')) this.#add(T.Or)
                else if (this.#next('=')) this.#add(T.PipeEqual)
                else if (this.#next('>')) this.#add(T.PipeLine)
                else this.#add(T.Pipe)
                break
            case '?':
                if (this.#next('?')) {
                    if (this.#next('=')) this.#add(T.NullishAssign)
                    else this.#add(T.NullishCoalescing)
                } else if (this.#next('.')) this.#add(T.QuestionDot)
                else this.#add(T.Question)
                break
            case '`':
            case '"':
            case '\'':
                this.#string(char)
                break
            case ' ':
            case '\r':
            case '\t':
            case '\n':
                break
            default: {
                if (this.#isDigit(char)) {
                    this.#number()
                } else if (this.#isAlpha(char)) {
                    this.#identifier()
                } else {
                    this.#error(`Caracter inesperado '${char}'`)
                }
            }
        }
    }
    #advance() {
        const char = this.source.charAt(this.current)
        this.position.advance(char)
        this.current++
        return char
    }
    #add(type: T, value: string = '') {
        if (value === '') value = this.source.substring(this.start, this.current)
        this.tokens.push(new Token(type, value))
    }
    #next(expected: string) {
        if (this.#isAtEnd() || this.source.charAt(this.current) !== expected) return false
        this.current++
        this.position.advance()
        return true
    }
    #peek(offset: number = 0) {
        if (this.current + offset >= this.source.length) return '\0'
        return this.source.charAt(this.current + offset)
    }
    #isAtEnd() {
        return this.current >= this.source.length
    }
    #isAlpha(char: string) {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === '_'
    }
    #isAlphaNumeric(char: string) {
        return this.#isAlpha(char) || this.#isDigit(char)
    }
    #comment() {
        while (this.#peek() !== '\n' && !this.#isAtEnd()) this.#advance()
    }
    #escape() {
        const char = this.#peek()
        this.#advance()
        switch (char) {
            case 'n': return '\n'
            case 'r': return '\r'
            case 't': return '\t'
            case '\\': return '\\'
            case '\'': return '\''
            case '"': return '"'
            case '`': return '`'
            case '$': return '$'
            case '{': return '{'
            case '}': return '}'
            default:
                this.#error(`Secuencia de escape invalida '\\${char}'`)
        }
    }
    #string(quote: string) {
        if (quote === '`') this.#templateString()
        else this.#regularString(quote)
    }
    #regularString(quote: string) {
        let value = ''
        while (!this.#isAtEnd()) {
            const char = this.#peek()
            if (char === quote) break
            if (char === '\\') {
                this.#advance()
                value += this.#escape()
            } else {
                value += this.#advance()
            }
        }
        if (this.#isAtEnd()) {
            this.#error('Cadena sin terminar')
        }
        this.#advance()
        this.#add(T.StringLiteral, value)
    }
    #templateString() {
        this.#add(T.BackTick, '`')
        while (!this.#isAtEnd()) {
            if (this.#peek() === '`') {
                break
            } else if (this.#peek() === '$' && this.#peek(1) === '{') {
                this.#templateStringInterpolation()
            } else {
                let value = ''
                while (!this.#isAtEnd() && this.#peek() !== '`' && !(this.#peek() === '$' && this.#peek(1) === '{')) {
                    if (this.#peek() === '\\') {
                        this.#advance()
                        value += this.#escape()
                    } else {
                        value += this.#advance()
                    }
                }
                if (value !== '') {
                    this.#add(T.StringLiteral, value)
                }
            }
        }
        if (this.#isAtEnd()) {
            this.#error('Template string sin terminar')
        }
        this.#advance()
        this.#add(T.BackTick, '`')
    }
    #templateStringInterpolation() {
        this.#advance()
        this.#advance()
        let braceCount = 1
        let expression = ''
        while (!this.#isAtEnd() && braceCount > 0) {
            if (this.#peek() === '{') {
                braceCount++
                expression += this.#advance()
            } else if (this.#peek() === '}') {
                braceCount--
                if (braceCount === 0) {
                    this.#tokenizeExpression(expression)
                    this.#advance()
                    return
                } else {
                    expression += this.#advance()
                }
            } else if (this.#peek() === '"' || this.#peek() === '\'' || this.#peek() === '`') {
                expression += this.#captureString()
            } else {
                expression += this.#advance()
            }
        }
        if (braceCount > 0) {
            this.#error('Interpolación no terminada en la cadena de plantilla')
        }
    }
    #captureString() {
        const quote = this.#peek()
        let value = this.#advance()
        while (!this.#isAtEnd() && this.#peek() !== quote) {
            if (this.#peek() === '\\') {
                value += this.#advance() + this.#advance()
            } else {
                value += this.#advance()
            }
        }
        if (!this.#isAtEnd()) {
            value += this.#advance()
        }
        return value
    }
    #tokenizeExpression(expression: string) {
        const subLexer = new LexicalAnalyzer(expression)
        const tokens = subLexer.tokenize()
        for (const token of tokens) {
            if (token.type !== T.EOF) {
                this.tokens.push(token)
            }
        }
    }
    #number() {
        let value = this.source.substring(this.start, this.current)
        let type = T.IntegerLiteral
        if (value === '0') {
            if (this.#peek().toLowerCase() === 'b') {
                value += this.#advance()
                this.#tokenizeBinary(value)
                return
            } else if (this.#peek().toLowerCase() === 'x') {
                value += this.#advance()
                this.#tokenizeHexadecimal(value)
                return
            } else if (this.#peek().toLowerCase() === 'o') {
                value += this.#advance()
                this.tokenizeOctal(value)
                return
            }
        }
        while (!this.#isAtEnd()) {
            const char = this.#peek()
            if (this.#isDigit(char) || char === '_') {
                value += char === '_' ? '' : char
                this.#advance()
            } else if (char === '.' && type === T.IntegerLiteral) {
                if (this.#next('.')) {
                    this.#add(T.IntegerLiteral, value)
                    this.#add(T.Range, '..')
                    this.#advance()
                    return
                }
            } else if (char.toLowerCase() === 'e' && (type === T.IntegerLiteral || type === T.FloatLiteral)) {
                type = T.FloatLiteral
                value += char
                this.#advance()
                if (this.#peek() === '+' || this.#peek() === '-') {
                    value += this.#advance()
                }
            } else if (char.toLowerCase() === 'n' && type === T.IntegerLiteral) {
                type = T.BigIntLiteral
                this.#advance()
                break
            } else {
                break
            }
        }
        this.#add(type, value)
    }
    #tokenizeBinary(prefix: string) {
        let value = prefix
        let binaryLiteral = ''
        while (!this.#isAtEnd()) {
            const char = this.#peek()
            if (this.#isBinaryDigit(char) || char === '_') {
                value += char === '_' ? '' : char
                binaryLiteral += char === '_' ? '' : char
                this.#advance()
            } else {
                break
            }
        }
        if (!binaryLiteral.length) {
            this.#error('Expecting digits after binary prefix \'0b\'')
            return
        }
        this.#add(T.BinaryLiteral, value)
    }
    #tokenizeHexadecimal(prefix: string) {
        let value = prefix
        let hexLiteral = ''
        while (!this.#isAtEnd()) {
            const char = this.#peek()
            if (this.#isHexDigit(char) || char === '_') {
                value += char === '_' ? '' : char
                hexLiteral += char === '_' ? '' : char
                this.#advance()
            } else {
                break
            }
        }
        if (!hexLiteral.length) {
            this.#error('Expecting digits after hexadecimal prefix \'0x\'')
            return
        }
        this.#add(T.HexLiteral, value)
    }
    tokenizeOctal(prefix: string) {
        let value = prefix
        let octalLiteral = ''
        while (!this.#isAtEnd()) {
            const char = this.#peek()
            if (this.#isOctalDigit(char) || char === '_') {
                value += char === '_' ? '' : char
                octalLiteral += char === '_' ? '' : char
                this.#advance()
            } else {
                break
            }
        }
        if (!octalLiteral.length) {
            this.#error('Expecting digits after octal prefix \'0o\'')
            return
        }
        this.#add(T.OctalLiteral, value)
    }
    #isDigit(char: string) {
        return char >= '0' && char <= '9'
    }
    #isBinaryDigit(char: string) {
        return char === '0' || char === '1'
    }
    #isHexDigit(char: string) {
        return this.#isDigit(char) || (char >= 'a' && char <= 'f') || (char >= 'A' && char <= 'F')
    }
    #isOctalDigit(char: string) {
        return char >= '0' && char <= '7'
    }
    #error(message: string) {
        throw new Error(`Error lexico: ${message} en la linea ${this.position.line}, columna ${this.position.column}`)
    }
    #identifier() {
        while (this.#isAlphaNumeric(this.#peek())) this.#advance()
        const text = this.source.substring(this.start, this.current)
        const type = KEYWORDS[text] ?? T.Identifier
        if (type === T.True || type === T.False) {
            this.#add(type, text)
        } else if (type === T.NoneLiteral) {
            this.#add(type, 'none')
        } else {
            this.#add(type, text)
        }
    }
}
class ASTNode {
    is<T extends ASTNode>(classs: new (...args: any[]) => T): this is T {
        return this instanceof classs
    }
}
abstract class Type extends ASTNode {
}
class TypeAnnotation extends Type {
    constructor(public name: string) {
        super()
    }
}
class ArrayTypeAnnotation extends Type {
    constructor(public base: Type) {
        super()
    }
}
class GenericTypeAnnotation extends Type {
    constructor(public base: Type, public params: Type[]) {
        super()
    }
}
class TypeDeclaration extends ASTNode {
    constructor(
        public id: Identifier,
        public type: Type | Type[] | GenericTypeAnnotation | ArrayTypeAnnotation,
        public params?: Type[]
    ) {
        super()
    }
}
class TypeObjectDeclaration extends ASTNode {
    constructor(
        public id: Identifier,
        public properties: Property[],
        public params?: Type[]
    ) { super() }
}
class UnionTypeDeclaration extends ASTNode {
    constructor(
        public id: Identifier,
        public types: Type[]
    ) { super() }
}
class IntersectionTypeDeclaration extends ASTNode {
    constructor(
        public id: Identifier,
        public types: Type[]
    ) { super() }
}
type TypeDeclarator = TypeDeclaration | TypeObjectDeclaration | UnionTypeDeclaration | IntersectionTypeDeclaration
class VariableDeclaration extends ASTNode {
    constructor(public kind: Kind, public declarations: VariableDeclarator[]) {
        super()
    }
}
class VariableDeclarator extends ASTNode {
    constructor(
        public id: Identifier,
        public type?: Type,
        public init?: Expression,
        public optional: boolean = false,
        public rest: boolean = false,
        public decorators: Expression[] = []
    ) {
        super()
    }
}
class Expression extends ASTNode {
}
class BlockStatement extends ASTNode {
    constructor(public body: ASTNode[] | null = null) { super() }
}
class BinaryExpression extends ASTNode {
    constructor(
        public left: Expression,
        public right: Expression,
        public operator: string) {
        super()
    }
}
class UnaryExpression extends ASTNode {
    constructor(
        public operator: string,
        public argument: Expression,
        public prefix: boolean
    ) { super() }
}
class CallExpression extends ASTNode {
    constructor(public callee: Expression, public args: Expression[]) { super() }
}
class MemberExpression extends ASTNode {
    constructor(public object: Expression, public property: Expression, public computed: boolean) { super() }
}
class LogicalExpression extends ASTNode {
    constructor(public left: Expression, public right: Expression, public operator: string) { super() }
}
class ArrayExpression extends ASTNode {
    constructor(public elements: Expression[]) { super() }
}
class RangeExpression extends ASTNode {
    constructor(public start: Expression, public end: Expression) { super() }
}
class ObjectExpression extends ASTNode {
    constructor(public properties: Property[]) { super() }
}
class PipeLineExpression extends ASTNode {
    constructor(public left: Expression, public right: Expression) { super() }
}
class NewExpression extends ASTNode {
    constructor(public callee: Expression, public args: Expression[]) { super() }
}
class AssignmentExpression extends ASTNode {
    constructor(public left: Expression, public right: Expression, public operator: string) { super() }
}
class Identifier extends ASTNode {
    constructor(public name: string) { super() }
}
class IntegerLiteral extends ASTNode {
    constructor(public value: number) { super() }
}
class FloatLiteral extends ASTNode {
    constructor(public value: number) { super() }
}
class StringLiteral extends ASTNode {
    constructor(public value: string) { super() }
}
class BooleanLiteral extends ASTNode {
    constructor(public value: boolean) { super() }
}
class NoneLiteral extends ASTNode {
    constructor(public value: null) {
        super()
    }
}
class TemplateStringLiteral extends ASTNode {
    constructor(
        public quasis: TemplateElement[],
        public expressions: Expression[]
    ) { super() }
}
class TemplateElement extends ASTNode {
    constructor(public value: string, public tail: boolean) { super() }
}
class Conditional extends ASTNode {
    constructor(public test: Expression, public consequent: Expression, public alternate: Expression) { super() }
}
class Property extends ASTNode {
    constructor(public key: Identifier, public value: Expression) { super() }
}
class Program extends ASTNode {
    constructor(public body: ASTNode[]) { super() }
}
class FunctionStatement extends ASTNode {
    constructor(
        public id: Identifier,
        public params: VariableDeclarator[],
        public body: ASTNode[],
        public type: Type) {
        super()
    }
}
class ReturnStatement extends ASTNode {
    constructor(public argument?: Expression) { super() }
}
class IfStatement extends ASTNode {
    constructor(
        public test: Expression,
        public consequent: ASTNode[] | null = null,
        public alternate?: IfStatement | ASTNode[] | null
    ) { super() }
}
class ForStatement extends ASTNode {
    constructor(public init?: VariableDeclaration | Expression, public test?: Expression, public update?: Expression, public body?: ASTNode[]) { super() }
}
class ForInStatement extends ASTNode {
    constructor(public left: VariableDeclaration | Expression, public right: Expression, public body: ASTNode[]) { super() }
}
class ForOfStatement extends ASTNode {
    constructor(public left: VariableDeclaration | Expression, public right: Expression, public body: ASTNode[]) { super() }
}
class WhileStatement extends ASTNode {
    constructor(public test: Expression, public body: ASTNode[]) { super() }
}
class MatchStatement extends ASTNode {
    constructor(
        public discriminant: Expression,
        public cases: MatchCase[],
        public defaultCase?: ASTNode | null) {
        super()
    }
}
class MatchCase extends ASTNode {
    constructor(public test: Expression, public consequent: ASTNode | null) { super() }
}
class Decorator extends ASTNode {
    constructor(public expression: Expression) { super() }
}
class ClassDeclaration extends ASTNode {
    constructor(
        public id: Identifier,
        public body: ASTNode[],
        public superClass?: Identifier,
        public isAbstract: boolean = false,
        public typeParameters?: Type[],
        public implementslist?: Identifier[],
        public decorators?: Decorator[]) {
        super()
    }
}
type MethodKind = T.Constructor | T.Method | T.Get | T.Set
class MethodDefinition extends ASTNode {
    constructor(
        public id: Identifier,
        public isStatic: boolean,
        public kind: MethodKind,
        public isAsync: boolean,
        public params: VariableDeclarator[],
        public body: ASTNode[] | null,
        public type?: Type,
        public decorators?: Decorator[],
        public access: Access = T.Public,
    ) {
        super()
    }
}
type Access = T.Public | T.Private | T.Protected
class ClassProperty extends ASTNode {
    constructor(
        public id: Identifier,
        public isStatic: boolean,
        public access: Access,
        public type: Type,
        public init?: Expression,
        public decorators?: Decorator[]
    ) { super() }
}
const DEFAULT_TYPE = new TypeAnnotation('any')
class SintacticAnalyzer {
    current: number = 0
    constructor(public tokens: Token[]) { }
    parse() {
        const statements: ASTNode[] = []
        while (!this.isAtEnd()) {
            const stmt = this.declaration()
            if (stmt) statements.push(stmt)
        }
        return new Program(statements)
    }
    parseType(): Type {
        const base = this.expect(T.Identifier)
        let type: Type = new TypeAnnotation(base.value)
        while (this.match(T.LessThan)) {
            const params: Type[] = this.list(() => this.parseType(), T.GreaterThan)
            type = new GenericTypeAnnotation(type, params)
        }
        while (this.match(T.OpenBracket)) {
            this.expect(T.CloseBracket)
            type = new ArrayTypeAnnotation(type)
        }
        return type
    }
    declaration(): ASTNode {
        const decorators = this.parseDecorators()
        const isAbstract = this.match(T.Abstract)
        if (this.match(T.Class)) {
            return this.classDeclaration(decorators, isAbstract)
        }
        if (decorators.length > 0 || isAbstract) {
            throw this.error(this.previous())
        }
        if (this.match(T.Let, T.Const, T.Var)) return this.variableDeclaration()
        if (this.match(T.Function)) return this.functionDeclaration()
        if (this.match(T.Type)) return this.typeDeclaration()
        return this.statement()
    }
    classDeclaration(decorators: Decorator[], isAbstract: boolean): ClassDeclaration {
        const id = this.#identifier()
        const typeParameters = this.#typeParams()
        let superClass: Identifier | undefined
        if (this.match(T.Extends)) {
            superClass = this.#identifier()
        }
        const implementsList = this.parseImplements()
        this.expect(T.OpenBrace)
        const body = this.parseClassBody()
        return new ClassDeclaration(id, body, superClass, isAbstract, typeParameters, implementsList, decorators)
    }
    parseDecorators(): Decorator[] {
        const decorators: Decorator[] = []
        while (this.match(T.At)) {
            decorators.push(this.parseDecorator())
        }
        return decorators
    }
    parseDecorator(): Decorator {
        return new Decorator(this.expression())
    }
    #identifier(): Identifier {
        const name = this.expect(T.Identifier).value
        return new Identifier(name)
    }
    #typeParams(): Type[] | undefined {
        if (this.match(T.LessThan)) {
            const params = this.list(() => this.parseType(), T.GreaterThan)
            return params
        }
        return undefined
    }
    #block(necessaryBraces: boolean = true): ASTNode[] {
        if (necessaryBraces) {
            this.expect(T.OpenBrace)
        }
        if (this.match(T.CloseBrace)) {
            return []
        }
        const statements: ASTNode[] = []
        while (!this.check(T.CloseBrace) && !this.isAtEnd()) {
            const stmt = this.declaration()
            if (stmt) statements.push(stmt)
        }
        if (necessaryBraces) {
            this.expect(T.CloseBrace)
        }
        return statements
    }
    #parseParameters(): VariableDeclarator[] {
        this.expect(T.OpenParen)
        return this.list(() => {
            const decorators = this.parseDecorators()
            const isRest = this.match(T.Spread)
            const id = this.#identifier()
            const isOptional = this.match(T.Question)
            let type: Type | undefined
            if (this.match(T.Colon)) {
                type = this.parseType()
            }
            let init: Expression | undefined
            if (this.match(T.Equal)) {
                init = this.expression()
            }
            return new VariableDeclarator(id, type, init, isOptional, isRest, decorators)
        }, T.CloseParen)
    }
    parseImplements(): Identifier[] | undefined {
        if (this.match(T.Implements)) {
            return this.list(() => this.#identifier(), T.OpenBrace)
        }
        return undefined
    }
    parseClassBody(): ASTNode[] {
        const members: (MethodDefinition | ClassProperty)[] = []
        while (!this.check(T.CloseBrace) && !this.isAtEnd()) {
            const decorators = this.parseDecorators()
            const isStatic = this.match(T.Static)
            const access = this.parseAccessModifier()
            const isAsync = this.match(T.Async)
            if (this.check(T.OpenBracket)) {
                members.push(this.parseIndexSignature(isStatic, access))
            } else if (this.check(T.Constructor)) {
                members.push(this.parseConstructor(decorators, access))
            } else if (this.checkAhead(T.OpenParen)) {
                members.push(this.parseMethod(decorators, isStatic, access, isAsync))
            } else {
                members.push(this.parseProperty(decorators, isStatic, access))
            }
        }
        return members
    }
    parseAccessModifier(): Access {
        if (this.match(T.Public)) return T.Public
        if (this.match(T.Private)) return T.Private
        if (this.match(T.Protected)) return T.Protected
        return T.Public
    }
    parseIndexSignature(isStatic: boolean, access: Access): ClassProperty {
        this.expect(T.OpenBracket)
        const indexName = this.#identifier()
        this.expect(T.Colon)
        this.expect(T.CloseBracket)
        this.expect(T.Colon)
        const valueType = this.parseType()
        return new ClassProperty(indexName, isStatic, access, valueType)
    }
    parseConstructor(decorators: Decorator[], access: Access): MethodDefinition {
        this.expect(T.Constructor)
        const params: VariableDeclarator[] = this.#parseParameters()
        this.expect(T.Colon)
        const type = this.parseType()
        this.expect(T.OpenBrace)
        const { body } = this.blockStatement()
        return new MethodDefinition(new Identifier('constructor'), false, T.Constructor, false, params, body, type, decorators, access)
    }
    parseMethod(decorators: Decorator[], isStatic: boolean, access: Access, isAsync: boolean): MethodDefinition {
        let kind: MethodKind = T.Method
        if (this.match(T.Get)) {
            kind = T.Get
        } else if (this.match(T.Set)) {
            kind = T.Set
        }
        const id = this.#identifier()
        const params = this.#parseParameters()
        let returnType: Type | undefined
        if (this.match(T.Colon)) {
            returnType = this.parseType()
        }
        const { body } = this.blockStatement()
        return new MethodDefinition(id, isStatic, kind, isAsync, params, body, returnType, decorators, access)
    }
    parseProperty(decorators: Decorator[], isStatic: boolean, access: Access): ClassProperty {
        const id = this.#identifier()
        let type: Type | undefined
        let init: Expression | undefined
        if (this.match(T.Colon)) {
            type = this.parseType()
        }
        if (this.match(T.Equal)) {
            init = this.expression()
        }
        return new ClassProperty(id, isStatic, access, type!, init, decorators)
    }
    checkAhead(type: T): boolean {
        return this.peek(1).type === type
    }
    variableDeclaration(skipType = false): VariableDeclaration {
        const kind = this.previous().type
        const declarations: VariableDeclarator[] = this.list(() => {
            const name = this.expect(T.Identifier)
            let type: Type = DEFAULT_TYPE
            if (skipType) {
                if (this.match(T.Colon)) type = this.parseType()
            } else {
                this.expect(T.Colon)
                type = this.parseType()
            }
            let init: Expression | undefined
            if (this.match(T.Equal)) init = this.expression()
            const id = new Identifier(name.value)
            return new VariableDeclarator(id, type, init)
        })
        return new VariableDeclaration(T[kind] as unknown as Kind, declarations)
    }
    typeDeclaration(): TypeDeclarator {
        const id = this.expect(T.Identifier)
        const generics = this.match(T.LessThan) ? this.list(() => this.parseType(), T.GreaterThan) : []
        if (this.match(T.OpenBrace)) {
            const properties: Property[] = []
            while (!this.check(T.CloseBrace) && !this.isAtEnd()) {
                const key = this.expect(T.Identifier)
                this.expect(T.Colon)
                const value = this.parseType()
                properties.push(new Property(new Identifier(key.value), value))
            }
            this.expect(T.CloseBrace)
            return new TypeObjectDeclaration(new Identifier(id.value), properties, generics)
        } else if (this.match(T.Equal)) {
            if (this.match(T.OpenBrace)) {
                const properties: Property[] = []
                while (!this.check(T.CloseBrace) && !this.isAtEnd()) {
                    const key = this.expect(T.Identifier)
                    this.expect(T.Colon)
                    const value = this.parseType()
                    properties.push(new Property(new Identifier(key.value), value))
                }
                this.expect(T.CloseBrace)
                return new TypeObjectDeclaration(new Identifier(id.value), properties, generics)
            }
            const types: Type[] = []
            do types.push(this.parseType())
            while (this.match(T.Or, T.And))
            return this.match(T.Or) ? new UnionTypeDeclaration(new Identifier(id.value), types) : new IntersectionTypeDeclaration(new Identifier(id.value), types)
        }
        return new TypeDeclaration(new Identifier(id.value), this.parseType())
    }
    functionDeclaration(): FunctionStatement {
        const id = this.#identifier()
        const params = this.#parseParameters()
        this.expect(T.Colon)
        const type = this.parseType()
        const body = this.#block()
        return new FunctionStatement(id, params, body, type)
    }
    statement() {
        if (this.match(T.If)) return this.ifStatement()
        if (this.match(T.For)) return this.forStatement()
        if (this.match(T.While)) return this.whileStatement()
        if (this.match(T.Return)) return this.returnStatement()
        if (this.match(T.Match)) return this.matchStatement()
        if (this.match(T.OpenBrace)) return this.blockStatement()
        return this.expression()
    }
    instantiation(): NewExpression {
        const callee = this.expression()
        const args = this.match(T.OpenParen) ? this.list(() => this.expression(), T.CloseParen) : []
        return new NewExpression(callee, args)
    }
    ifStatement(): IfStatement {
        this.expect(T.OpenParen)
        const test = this.expression()
        this.expect(T.CloseParen)
        const { body: consequent } = this.statement() as unknown as BlockStatement
        let alternate: IfStatement | ASTNode[] | null = null
        if (this.match(T.Else)) {
            alternate = this.match(T.If) ? this.ifStatement() : this.#block()
        }
        return new IfStatement(test, consequent, alternate)
    }
    forStatement(): ASTNode {
        this.expect(T.OpenParen)
        let init: VariableDeclaration | Expression | undefined
        if (this.match(T.Semicolon)) {
            init = undefined
        } else if (this.match(T.Let, T.Const, T.Var)) {
            init = this.variableDeclaration(true)
        } else {
            init = this.expression()
        }
        if (this.match(T.In)) {
            const right = this.expression()
            this.expect(T.CloseParen)
            const body = this.#block()
            return new ForInStatement(init!, right, body)
        }
        if (this.match(T.Of)) {
            const right = this.expression()
            this.expect(T.CloseParen)
            const body = this.#block()
            return new ForOfStatement(init!, right, body)
        }
        let condition: Expression | undefined = undefined
        this.expect(T.Semicolon)
        if (!this.check(T.Semicolon)) {
            condition = this.expression()
        }
        this.expect(T.Semicolon)
        let update: Expression | undefined = undefined
        if (!this.check(T.CloseParen)) {
            update = this.expression()
        }
        this.expect(T.CloseParen)
        const body = this.#block()
        return new ForStatement(init, condition, update, body)
    }
    whileStatement(): WhileStatement {
        this.expect(T.OpenParen)
        const condition = this.expression()
        this.expect(T.CloseParen)
        const body = this.#block()
        return new WhileStatement(condition, body)
    }
    returnStatement(): ReturnStatement {
        let value: Expression | undefined
        if (!this.check(T.Semicolon)) {
            value = this.expression()
        }
        return new ReturnStatement(value)
    }
    blockStatement(): BlockStatement {
        const statements: ASTNode[] = []
        while (!this.check(T.CloseBrace) && !this.isAtEnd()) {
            statements.push(this.declaration()!)
        }
        this.expect(T.CloseBrace)
        return new BlockStatement(statements)
    }
    matchStatement(): MatchStatement {
        this.expect(T.OpenParen)
        const discriminant = this.expression()
        this.expect(T.CloseParen)
        this.expect(T.OpenBrace)
        let defaultCase: ASTNode | null = null
        const cases: MatchCase[] = this.list(() => {
            const test = this.expression()
            this.expect(T.DoubleArrow)
            const consequent = this.statement()
            if (test instanceof Identifier && test.name === '_') {
                if (defaultCase) {
                    throw this.error(this.previous())
                }
                defaultCase = consequent
            }
            return new MatchCase(test, consequent)
        }, T.CloseBrace)
        return new MatchStatement(discriminant, cases, defaultCase)
    }
    expression(): Expression {
        return this.assignment()
    }
    assignment(): Expression {
        const expr = this.ternary()
        if (this.match(T.Equal, T.PlusEqual, T.MinusEqual, T.MultiplyEqual, T.DivideEqual, T.ModulusEqual, T.PowerEqual)) {
            const operator = this.previous().value
            const right = this.assignment()
            if (expr instanceof Identifier || expr instanceof MemberExpression) {
                return new AssignmentExpression(expr, right, operator)
            } else {
                throw this.error(this.previous())
            }
        }
        if (this.match(T.PipeLine)) {
            const right = this.assignment()
            return new PipeLineExpression(expr, right)
        }
        if (this.match(T.Range)) {
            const right = this.assignment()
            return new RangeExpression(expr, right)
        }
        if (this.match(T.Increment, T.Decrement)) {
            const operator = this.previous().value
            if (expr instanceof Identifier || expr instanceof MemberExpression) {
                return new UnaryExpression(operator, expr, false)
            } else {
                throw this.error(this.previous())
            }
        }
        return expr
    }
    ternary(): Expression {
        let expr = this.logicalOr()
        if (this.match(T.Question)) {
            const consequent = this.expression()
            this.expect(T.Colon)
            const alternate = this.ternary()
            expr = new Conditional(expr, consequent, alternate)
        }
        return expr
    }
    logicalOr(): Expression {
        let expr = this.logicalAnd()
        while (this.match(T.Or, T.NullishCoalescing)) {
            const operator = this.previous().value
            const right = this.logicalAnd()
            expr = new LogicalExpression(expr, right, operator)
        }
        return expr
    }
    logicalAnd(): Expression {
        let expr = this.bitwise()
        while (this.match(T.And)) {
            const operator = this.previous().value
            const right = this.bitwise()
            expr = new LogicalExpression(expr, right, operator)
        }
        return expr
    }
    bitwise(): Expression {
        let expr = this.equality()
        while (this.match(T.BitwiseAnd, T.Pipe, T.Caret)) {
            const operator = this.previous().value
            const right = this.equality()
            expr = new BinaryExpression(expr, right, operator)
        }
        return expr
    }
    equality(): Expression {
        let expr = this.comparison()
        while (this.match(T.EqualEqual, T.NotEqual)) {
            const operator = this.previous().value
            const right = this.comparison()
            expr = new BinaryExpression(expr, right, operator)
        }
        return expr
    }
    comparison(): Expression {
        let expr = this.shift()
        while (this.match(T.LessThan, T.LessThanEqual, T.GreaterThan, T.GreaterThanEqual)) {
            const operator = this.previous().value
            const right = this.shift()
            expr = new BinaryExpression(expr, right, operator)
        }
        return expr
    }
    shift(): Expression {
        let expr = this.addition()
        while (this.match(T.ShiftLeft, T.ShiftRight)) {
            const operator = this.previous().value
            const right = this.addition()
            expr = new BinaryExpression(expr, right, operator)
        }
        return expr
    }
    addition(): Expression {
        let expr = this.multiplication()
        while (this.match(T.Plus, T.Minus)) {
            const operator = this.previous().value
            const right = this.multiplication()
            expr = new BinaryExpression(expr, right, operator)
        }
        return expr
    }
    multiplication(): Expression {
        let expr = this.unary()
        while (this.match(T.Multiply, T.Divide, T.Modulus)) {
            const operator = this.previous().value
            const right = this.unary()
            expr = new BinaryExpression(expr, right, operator)
        }
        return expr
    }
    unary(): Expression {
        if (this.match(T.Minus, T.Tilde, T.Increment, T.Decrement)) {
            const operator = this.previous().value
            const right = this.unary()
            return new UnaryExpression(operator, right, false)
        }
        if (this.match(T.Not)) {
            const operator = this.previous().value
            const right = this.unary()
            return new UnaryExpression(operator, right, true)
        }
        return this.power()
    }
    power(): Expression {
        let expr = this.call()
        if (this.match(T.Power)) {
            const operator = this.previous().value
            const right = this.unary()
            expr = new BinaryExpression(expr, right, operator)
        }
        return expr
    }
    call(): Expression {
        let expr = this.primary()
        while (true) {
            if (this.match(T.OpenParen)) {
                expr = this.finishCall(expr)
            } else if (this.match(T.OpenBracket)) {
                const index = this.expression()
                this.expect(T.CloseBracket)
                expr = new MemberExpression(expr, index, true)
            } else if (this.match(T.Dot)) {
                const property = this.expect(T.Identifier)
                expr = new MemberExpression(expr, new Identifier(property.value), false)
            } else {
                break
            }
        }
        return expr
    }
    finishCall(callee: Expression): CallExpression {
        const args = this.list(() => this.expression(), T.CloseParen)
        return new CallExpression(callee, args)
    }
    templateString(): TemplateStringLiteral {
        const quasis: TemplateElement[] = []
        const expressions: Expression[] = []
        do {
            const value = this.stringLiteral()
            quasis.push(new TemplateElement(value.value, this.match(T.BackTick)))
            if (!quasis[quasis.length - 1].tail) {
                expressions.push(this.expression())
            }
        } while (!this.isAtEnd() && !quasis[quasis.length - 1].tail && !this.match(T.BackTick))
        return new TemplateStringLiteral(quasis, expressions)
    }
    primary(): Expression {
        if (this.match(T.True)) return new BooleanLiteral(true)
        if (this.match(T.False)) return new BooleanLiteral(false)
        if (this.match(T.NoneLiteral)) return new NoneLiteral(null)
        if (this.match(T.IntegerLiteral)) {
            const value = parseInt(this.previous().value)
            return new IntegerLiteral(value)
        }
        if (this.match(T.FloatLiteral)) {
            const value = parseFloat(this.previous().value)
            return new FloatLiteral(value)
        }
        if (this.match(T.OctalLiteral)) {
            return new IntegerLiteral(+this.previous().value)
        }
        if (this.match(T.BinaryLiteral)) {
            return new IntegerLiteral(+this.previous().value)
        }
        if (this.match(T.HexLiteral)) {
            return new IntegerLiteral(+this.previous().value)
        }
        if (this.match(T.BackTick)) {
            return this.templateString()
        }
        if (this.match(T.StringLiteral)) {
            const value = this.previous().value
            return new StringLiteral(value)
        }
        if (this.match(T.Identifier)) {
            return new Identifier(this.previous().value)
        }
        if (this.match(T.PlaceHolder)) {
            return new Identifier(this.previous().value)
        }
        if (this.match(T.OpenParen)) {
            const expr = this.expression()
            this.expect(T.CloseParen)
            return expr
        }
        if (this.match(T.OpenBracket)) {
            const elements = this.list(() => this.expression(), T.CloseBracket)
            return new ArrayExpression(elements)
        }
        if (this.match(T.OpenBrace)) {
            const properties = this.list(() => {
                const key = this.expect(T.Identifier)
                this.expect(T.Colon)
                const value = this.expression()
                return new Property(new Identifier(key.value), value)
            }, T.CloseBrace)
            return new ObjectExpression(properties)
        }
        if (this.match(T.New)) {
            return this.instantiation()
        }
        if (this.match(T.Super)) {
            if (this.match(T.Dot)) {
                const property = this.expect(T.Identifier)
                return new MemberExpression(new Identifier('super'), new Identifier(property.value), false)
            } else if (this.match(T.OpenParen)) {
                return this.finishCall(new Identifier('super'))
            } else {
                throw this.error(this.peek())
            }
        }
        throw this.error(this.peek())
    }
    list<T>(parseItem: () => T, endToken?: any): T[] {
        const items: T[] = []
        if (endToken) {
            if (!this.check(endToken)) {
                do items.push(parseItem())
                while (this.match(T.Comma))
            }
            this.expect(endToken)
        } else {
            do items.push(parseItem())
            while (this.match(T.Comma))
        }
        return items
    }
    match(...types: T[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance()
                return true
            }
        }
        return false
    }
    check(type: T): boolean {
        if (this.isAtEnd()) return false
        return this.peek().type === type
    }
    advance(): Token {
        if (!this.isAtEnd()) this.current++
        return this.previous()
    }
    isAtEnd(): boolean {
        return this.peek().type === T.EOF
    }
    peek(offset: number = 0): Token {
        if (this.current + offset >= this.tokens.length) return this.tokens[this.tokens.length - 1]
        return this.tokens[this.current + offset]
    }
    previous(): Token {
        return this.tokens[this.current - 1]
    }
    expect(type: T): Token {
        if (this.check(type)) return this.advance()
        throw this.error(this.peek(), type)
    }
    error(token: Token, expectedType?: T): Error {
        const value = token.value
        const previous = this.previous().value
        const next = this.peek().value
        const expected = T[expectedType!]
        const got = T[token.type]
        const error = new Error(
            `Error: Expected ${expectedType ? T[expectedType] : 'Token'} but got ${T[token.type]}\n` +
            `Previous: ${previous}\n` +
            `Current: ${value}\n` +
            `Next: ${next}\n` +
            `Expected: ${expected} but got ${got}`
        )
        return error
    }
    stringLiteral(): StringLiteral {
        const value = this.expect(T.StringLiteral)
        return new StringLiteral(value.value)
    }
}
class SymbolTable {
    constructor(public parent: SymbolTable | null = null) { }
    private symbols: { [name: string]: any } = {}
    public define(name: string, value: any) {
        this.symbols[name] = value
    }
    public lookup(name: string): any {
        if (name in this.symbols) {
            return this.symbols[name]
        }
        if (this.parent) {
            return this.parent.lookup(name)
        }
        throw new Error(`Symbol ${name} not found`)
    }
    public exists(name: string): boolean {
        if (name in this.symbols) {
            return true
        }
        if (this.parent) {
            return this.parent.exists(name)
        }
        return false
    }
    public update(name: string, value: any) {
        if (name in this.symbols) {
            this.symbols[name] = value
            return
        }
        if (this.parent) {
            this.parent.update(name, value)
            return
        }
        throw new Error(`Symbol ${name} not found`)
    }
    public push(): SymbolTable {
        return new SymbolTable(this)
    }
    public pop(): SymbolTable {
        return this.parent || this
    }
    public merge(table: SymbolTable) {
        Object.assign(this.symbols, table.symbols)
    }
    public toString() {
        return JSON.stringify(this.symbols, null, 2)
    }
}
class BuildInFunctions {
    constructor(public table: SymbolTable) {
        this.table.define('print', (value: any) => { console.log(value) })
        this.table.define('input', (message: any) => { return prompt(message) })
    }
}
class BuildInTypes {
    constructor(public table: SymbolTable) {
        this.table.define('int', 'number')
        this.table.define('i8', 'number')
        this.table.define('float', 'number')
        this.table.define('str', 'string')
        this.table.define('bool', 'boolean')
        this.table.define('array', 'Array')
        this.table.define('object', 'Object')
        this.table.define('none', 'null')
    }
    static integers(value: number) {
        if (typeof value !== 'number') {
            throw new Error(`Value ${value} is not a number`)
        }
    }
    static strings(value: string) {
        if (typeof value !== 'string') {
            throw new Error(`Value ${value} is not a string`)
        }
    }
    static booleans(value: boolean) {
        if (typeof value !== 'boolean') {
            throw new Error(`Value ${value} is not a boolean`)
        }
    }
    static arrays(value: any[]) {
        if (!Array.isArray(value)) {
            throw new Error(`Value ${value} is not an array`)
        }
    }
    static rules: Record<string, (value: any) => void> = {
        i8(value: number) {
            BuildInTypes.integers(value)
            if (value < -128 || value > 127) {
                throw new Error(`Value ${value} is out of range for i8`)
            }
        },
        i16(value: number) {
            BuildInTypes.integers(value)
            if (value < -32768 || value > 32767) {
                throw new Error(`Value ${value} is out of range for i16`)
            }
        },
        i32(value: number) {
            BuildInTypes.integers(value)
            if (value < -2147483648 || value > 2147483647) {
                throw new Error(`Value ${value} is out of range for i32`)
            }
        },
        int(value: number) {
            BuildInTypes.integers(value)
        },
        float(value: number) {
            if (typeof value !== 'number') {
                throw new Error(`Value ${value} is not a number`)
            }
        },
        f32(value: number) {
            BuildInTypes.integers(value)
            if (value < -3.402823466e+38 || value > 3.402823466e+38) {
                throw new Error(`Value ${value} is out of range for f32`)
            }
        },
        f64(value: number) {
            BuildInTypes.integers(value)
            if (value < -1.7976931348623157e+308 || value > 1.7976931348623157e+308) {
                throw new Error(`Value ${value} is out of range for f64`)
            }
        },
        str(value: string) {
            BuildInTypes.strings(value)
        },
        char(value: string) {
            BuildInTypes.strings(value)
            if (value.length !== 1) {
                throw new Error(`Value ${value} is not a char`)
            }
        },
        bool(value: boolean) {
            BuildInTypes.booleans(value)
        },
        list(value: any[]) {
            BuildInTypes.arrays(value)
        },
    }
}
class SemanticAnalizer {
    table: SymbolTable = new SymbolTable()
    constructor(public ast: Program) {
        new BuildInFunctions(this.table)
        new BuildInTypes(this.table)
    }
    analyze() {
        this.visit(this.ast)
    }
    program(node: Program): void {
        node.body.forEach(statement => this.visit(statement))
    }
    block(node: ASTNode[]): void {
        const previousTable = this.table
        this.table = this.table.push()
        node.forEach(statement => this.visit(statement))
        this.table = previousTable
    }
    variableDeclaration(node: VariableDeclaration): void {
        node.declarations.forEach(declaration => this.visit(declaration))
    }
    variableDeclarator(node: VariableDeclarator): void {
        this.table.define(node.id.name, null)
        if (node.init) {
            const initValue = this.visit(node.init)
            const type = this.visit(node.type!) as keyof typeof BuildInTypes.rules
            BuildInTypes.rules[type](initValue)
            this.table.update(node.id.name, initValue)
        }
    }
    typeAnnotation(node: TypeAnnotation): string {
        return node.name
    }
    binaryExpression(node: BinaryExpression): number | string | boolean {
        const left = this.visit(node.left)
        const right = this.visit(node.right)
        const operator = node.operator
        switch (operator) {
            case '+': return left + right
            case '-': return left - right
            case '*': return left * right
            case '/': return left / right
            case '%': return left % right
            case '==': return left === right
            case '!=': return left !== right
            case '>': return left > right
            case '<': return left < right
            case '>=': return left >= right
            case '<=': return left <= right
            case '&&': return left && right
            case '||': return left || right
            default: throw new Error(`Operator ${operator} not implemented`)
        }
    }
    conditional(node: Conditional): void {
        if (this.visit(node.test)) {
            return this.visit(node.consequent)
        } else {
            return this.visit(node.alternate)
        }
    }
    assignmentExpression(node: AssignmentExpression): void {
        const value = this.visit(node.right)
        this.table.update((node.left as Identifier).name, value)
    }
    identifier(node: Identifier): string | number | boolean | null {
        return this.table.lookup(node.name)
    }
    functionDeclaration(node: FunctionStatement): void {
        this.table.define(node.id.name, (...args: any[]) => {
            const previousTable = this.table
            this.table = this.table.push()
            node.params.forEach((param, index) => {
                const paramName = (param.id as Identifier).name
                const paramValue = index < args.length ? args[index] : this.visit(param.init!)
                this.table.define(paramName, paramValue)
            })
            let returnValue
            for (const statement of node.body) {
                const result = this.visit(statement)
                if (statement instanceof ReturnStatement) {
                    returnValue = result
                    break
                }
            }
            this.table = previousTable
            return returnValue
        })
    }
    callExpression(node: CallExpression): any {
        const func = this.visit(node.callee) as FunctionStatement
        if (func instanceof FunctionStatement) {
            const previousTable = this.table
            this.table = this.table.push()
            func.params.forEach((param, index) => {
                this.table.define((param.id as Identifier).name, this.visit(node.args[index]))
            })
            let returnValue
            for (const statement of func.body) {
                const result = this.visit(statement)
                if (statement instanceof ReturnStatement) {
                    returnValue = result
                    break
                }
            }
            this.table = previousTable
            return returnValue
        } else if (typeof func === 'function') {
            const args = node.args.map(arg => this.visit(arg))
            const fn = func as any
            return fn(...args)
        } else {
            throw new Error(`Function ${node.callee} not found`)
        }
    }
    returnStatement(node: ReturnStatement): any {
        return this.visit(node.argument!)
    }
    ifStatement(node: IfStatement): void {
        if (this.visit(node.test)) {
            if (node.consequent) {
                node.consequent.forEach(statement => this.visit(statement))
            }
        } else if (node.alternate) {
            if (node.alternate instanceof IfStatement) {
                this.visit(node.alternate)
            } else {
                node.alternate.forEach(statement => this.visit(statement))
            }
        }
    }
    whileStatement(node: WhileStatement): void {
        while (this.visit(node.test)) {
            node.body.forEach(statement => this.visit(statement))
        }
    }
    forStatement(node: ForStatement): void {
        if (node.init) this.visit(node.init)
        while (this.visit(node.test!)) {
            const previousTable = this.table
            this.table = this.table.push()
            node.body?.forEach(statement => this.visit(statement))
            this.table = previousTable
            if (node.update) this.visit(node.update)
        }
    }
    matchStatement(node: MatchStatement): void {
        const discriminant = this.visit(node.discriminant)
        let matchFound = false
        for (const { test, consequent } of node.cases) {
            if (test instanceof Identifier && test.name === '_') {
                if (consequent) this.visit(consequent)
                matchFound = true
                break
            }
            if (discriminant === this.visit(test)) {
                if (consequent) this.visit(consequent)
                matchFound = true
                break
            }
        }
        if (!matchFound && node.defaultCase) {
            const previousTable = this.table
            this.table = this.table.push()
            this.table.define('_', discriminant)
            this.visit(node.defaultCase)
            this.table = previousTable
        }
    }
    forOfStatement(node: ForOfStatement): void {
        const iterable = this.visit(node.right)
        for (const element of iterable) {
            const previousTable = this.table
            this.table = this.table.push()
            this.table.define((node.left as VariableDeclaration).declarations[0].id.name, element)
            node.body.forEach(statement => this.visit(statement))
            this.table = previousTable
        }
    }
    forInStatement(n: ForInStatement): void {
        const iterable = this.visit(n.right)
        for (const key in iterable) {
            const previousTable = this.table
            this.table = this.table.push()
            this.table.define((n.left as VariableDeclaration).declarations[0].id.name, key)
            n.body.forEach(statement => this.visit(statement))
            this.table = previousTable
        }
    }
    integerLiteral(node: IntegerLiteral): number {
        return node.value
    }
    floatLiteral(node: FloatLiteral): number {
        return node.value
    }
    stringLiteral(node: StringLiteral): string {
        return String(node.value)
    }
    booleanLiteral(node: BooleanLiteral): boolean {
        return Boolean(node.value)
    }
    noneLiteral(node: NoneLiteral): any {
        return node.value
    }
    arrayExpression(node: ArrayExpression): any[] {
        return node.elements.map(element => this.visit(element))
    }
    objectExpression(n: ObjectExpression) {
        const obj: { [key: string]: any } = {}
        n.properties.forEach(property => {
            obj[property.key.name] = this.visit(property.value)
        })
        return obj
    }
    templateStringLiteral(n: TemplateStringLiteral) {
        const quasis = n.quasis.map(quasi => this.visit(quasi)) as string[]
        const expressions = n.expressions.map(expression => this.visit(expression)) as string[]
        return quasis.reduce((acc, cur, i) => acc + cur + (expressions[i] || ''), '')
    }
    templateElement(n: TemplateElement) {
        return n.value
    }
    rangeExpression(node: RangeExpression) {
        const left = this.visit(node.start)
        const right = this.visit(node.end)
        const range = []
        for (let i = left; i <= right; i++) {
            range.push(i)
        }
        return range
    }
    unaryExpression(node: UnaryExpression): any {
        let argument = this.visit(node.argument)
        const operator = node.operator
        const prefix = node.prefix
        if (prefix) {
            if (operator === '+') {
                return +argument
            } else if (operator === '-') {
                return -argument
            } else if (operator === '!') {
                return !argument
            } else {
                throw new Error(`Operator ${operator} not implemented`)
            }
        } else {
            if (operator === '++') {
                argument++
                this.table.update((node.argument as Identifier).name, argument)
                return argument
            } else if (operator === '--') {
                argument--
                this.table.update((node.argument as Identifier).name, argument)
                return argument
            } else {
                throw new Error(`Operator ${operator} not implemented`)
            }
        }
    }
    pipeLineExpression(node: PipeLineExpression): any {
        const left = this.visit(node.left)
        const previousTable = this.table
        this.table = this.table.push()
        this.table.define('_', left)
        const right = this.visit(node.right)
        this.table = previousTable
        return right
    }
    visit(n: ASTNode): any {
        if (Array.isArray(n)) return this.block(n)
        else if (n.is(Program)) return this.program(n)
        else if (n.is(VariableDeclaration)) return this.variableDeclaration(n)
        else if (n.is(VariableDeclarator)) return this.variableDeclarator(n)
        else if (n.is(TypeAnnotation)) return this.typeAnnotation(n)
        else if (n.is(BinaryExpression)) return this.binaryExpression(n)
        else if (n.is(UnaryExpression)) return this.unaryExpression(n)
        else if (n.is(Conditional)) return this.conditional(n)
        else if (n.is(Identifier)) return this.identifier(n)
        else if (n.is(FunctionStatement)) return this.functionDeclaration(n)
        else if (n.is(AssignmentExpression)) return this.assignmentExpression(n)
        else if (n.is(CallExpression)) return this.callExpression(n)
        else if (n.is(IntegerLiteral)) return this.integerLiteral(n)
        else if (n.is(FloatLiteral)) return this.floatLiteral(n)
        else if (n.is(StringLiteral)) return this.stringLiteral(n)
        else if (n.is(BooleanLiteral)) return this.booleanLiteral(n)
        else if (n.is(ArrayExpression)) return this.arrayExpression(n)
        else if (n.is(NoneLiteral)) return this.noneLiteral(n)
        else if (n.is(ObjectExpression)) return this.objectExpression(n)
        else if (n.is(TemplateStringLiteral)) return this.templateStringLiteral(n)
        else if (n.is(TemplateElement)) return this.templateElement(n)
        else if (n.is(RangeExpression)) return this.rangeExpression(n)
        else if (n.is(PipeLineExpression)) return this.pipeLineExpression(n)
        else if (n.is(IfStatement)) return this.ifStatement(n)
        else if (n.is(WhileStatement)) return this.whileStatement(n)
        else if (n.is(ForStatement)) return this.forStatement(n)
        else if (n.is(MatchStatement)) return this.matchStatement(n)
        else if (n.is(ForOfStatement)) return this.forOfStatement(n)
        else if (n.is(ForInStatement)) return this.forInStatement(n)
        else if (n.is(ReturnStatement)) return this.returnStatement(n)
        else throw new Error(`Node ${n.constructor.name} not implemented`)
    }
}
const path = Bun.argv[2]
const file = Bun.file(path)
const source = await file.text()
const lexer = new LexicalAnalyzer(source)
const tokens = lexer.tokenize()
const parser = new SintacticAnalyzer(tokens)
const ast = parser.parse()
const semantic = new SemanticAnalizer(ast)
semantic.analyze()
export { }