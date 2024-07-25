enum T {
    Let,
    Const,
    Var,
    If,
    Else,
    For,
    Do,
    While,
    Break,
    Continue,
    Return,
    Enum,
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
    Underscore,
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
    Ampersand,
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
    FatArrow,
    StringLiteral,
    CharLiteral,
    TemplateLiteral,
    IntegerLiteral,
    BigIntLiteral,
    BinaryLiteral,
    OctalLiteral,
    HexLiteral,
    FloatLiteral,
    NullLiteral,
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
        public line: number = 1,
        public column: number = 1
    ) { }
}
const KEYWORDS: KeywordMap = {
    _: T.Underscore,
    let: T.Let,
    const: T.Const,
    enum: T.Enum,
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
    do: T.Do,
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
                else if (this.#next('>')) this.#add(T.FatArrow)
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
                else this.#add(T.Ampersand)
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
                } else if (this.#isWord(char)) {
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
        this.tokens.push(new Token(type, value, this.position.line, this.position.column))
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
    #isWord(char: string) {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === '_'
    }
    #isAlpha(char: string) {
        return this.#isWord(char) || this.#isDigit(char)
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
                this.#bin(value)
                return
            } else if (this.#peek().toLowerCase() === 'x') {
                value += this.#advance()
                this.#hex(value)
                return
            } else if (this.#peek().toLowerCase() === 'o') {
                value += this.#advance()
                this.#octal(value)
                return
            }
        }
        let hasDecimalPoint = false
        let hasExponent = false
        while (!this.#isAtEnd()) {
            const char = this.#peek()
            if (this.#isDigit(char) || char === '_') {
                value += char === '_' ? '' : char
                this.#advance()
            } else if (char === '.' && !hasDecimalPoint && !hasExponent) {
                if (this.#peekNext() === '.') {
                    break
                }
                hasDecimalPoint = true
                type = T.FloatLiteral
                value += char
                this.#advance()
            } else if ((char.toLowerCase() === 'e') && !hasExponent) {
                hasExponent = true
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
    #peekNext(): string {
        if (this.current + 1 >= this.source.length) return '\0'
        return this.source.charAt(this.current + 1)
    }
    #bin(prefix: string) {
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
    #hex(prefix: string) {
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
    #octal(prefix: string) {
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
        while (this.#isAlpha(this.#peek())) this.#advance()
        const text = this.source.substring(this.start, this.current)
        const type = KEYWORDS[text] ?? T.Identifier
        if (type === T.True || type === T.False) this.#add(type, text)
        else if (type === T.NullLiteral) this.#add(type, 'none')
        else this.#add(type, text)
    }
}
interface ASTNode { }
interface Type extends ASTNode { }
class PrimitiveType implements Type {
    constructor(public name: string) { }
}
class ListType implements Type {
    constructor(public name: Type) { }
}
class UnionType implements Type {
    constructor(public types: Type[]) { }
}
class IntersectionType implements Type {
    constructor(public types: Type[]) { }
}
class TupleType implements Type {
    constructor(public elements: Type[]) { }
}
class RangeType implements Type {
    constructor(public start: Type, public end: Type) { }
}
class FnType implements Type {
    constructor(public params: PropType[], public type: Type) { }
}
class ObjectType implements Type {
    constructor(public properties: PropType[]) { }
}
class GenericType implements Type {
    constructor(public name: string, public args: TypeParameter[]) { }
}
class PropType implements ASTNode {
    constructor(public name: string, public type: Type, public optional: boolean = false) { }
}
class TypeParameter implements ASTNode {
    constructor(public name: string, public constraint: Type | null = null) { }
}
class TypeAnnotation implements ASTNode {
    constructor(public type: Type) { }
}
class EnumType implements Type {
    constructor(public members: EnumMemberType[]) { }
}
class EnumMemberType implements Type {
    constructor(public name: string, public type: Type) { }
}
class TypeAliasDeclaration implements ASTNode {
    constructor(public name: string, public typeParameters: TypeParameter[], public type: Type) {
    }
}
class Block implements ASTNode {
    constructor(public body: ASTNode[] | null = null) { }
}
class Expression implements ASTNode { }
class Int implements ASTNode {
    constructor(public value: number) {
    }
}
class Float implements ASTNode {
    constructor(public value: number) {
    }
}
class Char implements ASTNode {
    constructor(public value: string) {
    }
}
class Str implements ASTNode {
    constructor(public value: string) {
    }
}
class Bool implements ASTNode {
    constructor(public value: boolean) {
    }
}
class Template implements ASTNode {
    constructor(
        public quasis: Quasis[],
        public expressions: Expression[]
    ) {
    }
}
class Quasis implements ASTNode {
    constructor(public value: string, public tail: boolean) { }
}
class Null implements ASTNode {
    constructor() {
    }
}
class Id implements ASTNode {
    constructor(
        public name: string,
        public type: TypeAnnotation | null = null
    ) {
    }
}
class Obj implements ASTNode {
    constructor(public properties: (Prop | SpreadProp)[]) {
    }
}
class Prop implements ASTNode {
    constructor(public id: Id, public value: Expression) {
    }
}
class Member implements ASTNode {
    constructor(public object: Expression, public property: Expression, public computed: boolean) {
    }
}
class List implements ASTNode {
    constructor(public elements: (Expression | SpreadProp)[]) {
    }
}
class Tuple implements ASTNode {
    constructor(public elements: Expression[]) {
    }
}
class Record$ implements ASTNode {
    constructor(public properties: Prop[]) {
    }
}
class Call implements ASTNode {
    constructor(public callee: Expression, public args: Expression[]) {
    }
}
class Lambda implements ASTNode {
    constructor(public params: Var[], public body: Expression) {
    }
}
class Range implements ASTNode {
    constructor(public start: Expression, public end: Expression) {
    }
}
class Spread implements ASTNode {
    constructor(public expression: Expression) {
    }
}
class SpreadProp implements ASTNode {
    constructor(public expression: Expression) {
    }
}
class PipeLine implements ASTNode {
    constructor(public left: Expression, public right: Expression) {
    }
}
class New implements ASTNode {
    constructor(public callee: Expression, public args: Expression[]) {
    }
}
class Assignment implements ASTNode {
    constructor(public left: Expression, public right: Expression, public operator: string) {
    }
}
class Binary implements ASTNode {
    constructor(public left: Expression, public operator: string, public right: Expression) {
    }
}
class Unary implements ASTNode {
    constructor(public operator: string, public right: Expression, public prefix: boolean) {
    }
}
class Conditional implements ASTNode {
    constructor(public test: Expression, public consequent: Expression, public alternate: Expression) {
    }
}
class Vars implements ASTNode {
    constructor(
        public kind: Kind,
        public declarations: Var[]) {
    }
}
class Var implements ASTNode {
    constructor(
        public id: Id,
        public init: Expression | null,
        public optional: boolean = false,
        public rest: boolean = false,
        public decorators: Expression[] = []
    ) {
    }
}
class Enum implements ASTNode {
    constructor(
        public id: Id,
        public members: EnumMember[]) {
    }
}
class EnumMember implements ASTNode {
    constructor(
        public id: Id,
        public init: Expression | null) {
    }
}
class Program implements ASTNode {
    constructor(public statements: Block) {
    }
}
class Fn implements ASTNode {
    constructor(
        public id: Id,
        public params: Var[],
        public body: Block | null,
        public type: TypeAnnotation) {
    }
}
class Return implements ASTNode {
    constructor(public value: Expression | null) {
    }
}
class If implements ASTNode {
    constructor(
        public test: Expression,
        public consequent: Block | null = null,
        public alternate: If | Block | null = null
    ) { }
}
class For implements ASTNode {
    constructor(
        public init: Expression | null,
        public test: Expression | null,
        public update: Expression | null,
        public body: Block | null) {
    }
}
class ForIn implements ASTNode {
    constructor(
        public left: Expression,
        public right: Expression,
        public body: Block | null) {
    }
}
class ForOf implements ASTNode {
    constructor(
        public left: Expression,
        public right: Expression,
        public body: Block | null) {
    }
}
class While implements ASTNode {
    constructor(
        public test: Expression,
        public body: Block | null) {
    }
}
class DoWhile implements ASTNode {
    constructor(
        public body: Block | null,
        public test: Expression) {
    }
}
class Break implements ASTNode {
    constructor() {
    }
}
class Continue implements ASTNode {
    constructor() {
    }
}
class Switch implements ASTNode {
    constructor(
        public discriminant: Expression,
        public cases: SwitchCase[],
        public defaultCase: Expression | null) {
    }
}
class SwitchCase implements ASTNode {
    constructor(
        public test: Expression | null,
        public consequent: Expression[]) {
    }
}
class Match implements ASTNode {
    constructor(
        public discriminant: Expression,
        public cases: MatchCase[],
        public defaultCase: Expression | null) {
    }
}
class MatchCase implements ASTNode {
    constructor(
        public test: Expression | null,
        public consequent: Expression[]) {
    }
}
class Try implements ASTNode {
    constructor(
        public block: Block | null,
        public handler: Catch | null,
        public finalizer: Expression | null) {
    }
}
class Catch implements ASTNode {
    constructor(
        public param: Id,
        public body: Block | null) {
    }
}
class Throw implements ASTNode {
    constructor(public argument: Expression) {
    }
}
type It<T> = () => T
class ParserError extends Error {
    constructor(
        public token: Token,
        public expected: T | undefined,
        public message: string
    ) {
        super(message)
        this.name = 'ParserError'
    }
}
class SyntaxAnalizer {
    current: number = 0
    stmt: string = Program.name
    constructor(public tokens: Token[]) { }
    parse() {
        const statements: ASTNode[] = []
        while (!this.isAtEnd()) {
            const stmt = this.declaration()
            if (stmt) statements.push(stmt)
        }
        return new Program(new Block(statements))
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
        return !this.isAtEnd() && this.peek().type === type
    }
    checkMany(...types: T[]): boolean {
        if (this.isAtEnd()) return false
        const currentType = this.peek().type
        return types.some(type => type === currentType)
    }
    advance() {
        if (!this.isAtEnd()) this.current++
        return this.previous()
    }
    isAtEnd() {
        return this.peek().type === T.EOF
    }
    peek(step: number = 0) {
        if (this.current + step >= this.tokens.length) return this.tokens[this.tokens.length - 1]
        return this.tokens[this.current + step]
    }
    previous() {
        return this.tokens[this.current - 1]
    }
    expect(type: T) {
        if (this.check(type)) return this.advance()
        throw this.error(this.peek(), type)
    }
    error(token: Token, expect?: T) {
        const value = token.value
        const previous = this.previous().value
        const next = this.peek().value
        const expected = expect ? T[expect] : 'different token'
        const got = T[token.type]
        const message = `Expected ${expected} but got ${got}\n${previous} \x1b[31m${value}\x1b[0m ${next}\nCurrent statement: ${this.stmt}\nCurrent token type: ${T[token.type]}`
        throw new ParserError(token, expect, message)
    }
    expression() {
        return this.assignment()
    }
    assignment(): Expression {
        const expr = this.ternary()
        if (this.match(T.Equal, T.PlusEqual, T.MinusEqual, T.MultiplyEqual, T.DivideEqual, T.ModulusEqual, T.PowerEqual)) {
            const operator = this.previous().value
            const right = this.assignment()
            if (expr instanceof Id || expr instanceof Member) {
                return new Assignment(expr, right, operator)
            } else {
                throw this.error(this.previous())
            }
        }
        if (this.match(T.PipeLine)) {
            const right = this.assignment()
            return new PipeLine(expr, right)
        }
        if (this.match(T.Range)) {
            const right = this.assignment()
            return new Range(expr, right)
        }
        if (this.match(T.Spread)) {
            const right = this.assignment()
            return new Spread(right)
        }
        if (this.match(T.NullishAssign)) {
            const right = this.assignment()
            return new Assignment(expr, right, '??=')
        }
        if (this.match(T.Increment, T.Decrement)) {
            const operator = this.previous().value
            if (expr instanceof Id || expr instanceof Member) {
                return new Unary(operator, expr, false)
            } else {
                throw this.error(this.previous())
            }
        }
        return expr
    }
    ternary() {
        let expr = this.logicalOr()
        if (this.match(T.Question)) {
            const consequent = this.expression()
            this.expect(T.Colon)
            const alternate = this.ternary()
            expr = new Conditional(expr, consequent, alternate)
        }
        return expr
    }
    binary(
        nextMethod: () => Expression,
        ...operators: T[]
    ): Expression {
        let left = nextMethod.call(this)
        while (this.match(...operators)) {
            const operator = this.previous().value
            const right = nextMethod.call(this)
            left = new Binary(left, operator, right)
        }
        return left
    }
    logicalOr() {
        return this.binary(this.logicalAnd, T.Or, T.NullishCoalescing)
    }
    logicalAnd() {
        return this.binary(this.bitwise, T.And)
    }
    bitwise() {
        return this.binary(this.equality, T.Ampersand, T.Pipe, T.Caret)
    }
    equality() {
        return this.binary(this.comparison, T.EqualEqual, T.NotEqual)
    }
    comparison() {
        return this.binary(this.shift, T.LessThan, T.LessThanEqual, T.GreaterThan, T.GreaterThanEqual)
    }
    shift() {
        return this.binary(this.addition, T.ShiftLeft, T.ShiftRight)
    }
    addition() {
        return this.binary(this.multiplication, T.Plus, T.Minus)
    }
    multiplication() {
        return this.binary(this.unary, T.Multiply, T.Divide, T.Modulus)
    }
    power() {
        return this.binary(this.call, T.Power)
    }
    unary(): Expression {
        if (this.match(T.Minus, T.Tilde, T.Increment, T.Decrement)) {
            const operator = this.previous().value
            const right = this.unary()
            return new Unary(operator, right, false)
        }
        if (this.match(T.Not)) {
            const operator = this.previous().value
            const right = this.unary()
            return new Unary(operator, right, true)
        }
        return this.power()
    }
    primary() {
        const is = this.match.bind(this)
        if (is(T.True)) return new Bool(true)
        if (is(T.False)) return new Bool(false)
        if (is(T.NullLiteral)) return new Null()
        if (is(T.IntegerLiteral)) return new Int(parseInt(this.previous().value))
        if (is(T.OctalLiteral, T.BinaryLiteral, T.HexLiteral)) return new Int(+this.previous().value)
        if (is(T.FloatLiteral)) return new Float(parseFloat(this.previous().value))
        if (is(T.BackTick)) return this.#template()
        if (is(T.StringLiteral)) return new Str(this.previous().value)
        if (is(T.CharLiteral)) return new Char(this.previous().value)
        if (is(T.Identifier)) return new Id(this.previous().value)
        if (is(T.Underscore)) return new Id(this.previous().value)
        if (is(T.OpenParen)) return this.exprOrLambda()
        if (is(T.New)) return this.newStatement()
        if (is(T.OpenBracket)) {
            if (this.match(T.CloseBracket)) return new List([])
            const elements = this.#list(() => {
                if (this.match(T.Spread)) {
                    const expression = this.expression()
                    return new SpreadProp(expression)
                } else {
                    return this.expression()
                }
            }, T.CloseBracket)
            return new List(elements)
        }
        if (is(T.OpenBrace)) {
            const properties = this.#list(() => {
                if (this.match(T.Spread)) {
                    const expression = this.expression()
                    return new SpreadProp(expression)
                } else {
                    const key = this.expect(T.Identifier)
                    this.expect(T.Colon)
                    const value = this.expression()
                    return new Prop(new Id(key.value), value)
                }
            }, T.CloseBrace)
            return new Obj(properties)
        }
        if (is(T.Hash)) {
            if (is(T.OpenBracket)) {
                const elements = this.#list(() => this.expression(), T.CloseBracket)
                return new Tuple(elements)
            }
            if (is(T.OpenBrace)) {
                const properties = this.#list(() => {
                    const key = this.expect(T.Identifier)
                    this.expect(T.Colon)
                    const value = this.expression()
                    return new Prop(new Id(key.value), value)
                }, T.CloseBrace)
                return new Record$(properties)
            }
        }
        if (is(T.Super)) {
            if (this.match(T.Dot)) {
                const property = this.expect(T.Identifier)
                return new Member(new Id('super'), new Id(property.value), false)
            } else if (this.match(T.OpenParen)) {
                return this.finishCall(new Id('super'))
            } else {
                throw this.error(this.peek())
            }
        }
        throw this.error(this.peek())
    }
    call() {
        let expr = this.primary()
        while (true) {
            if (this.match(T.OpenParen)) {
                expr = this.finishCall(expr)
            } else if (this.match(T.OpenBracket)) {
                const index = this.expression()
                this.expect(T.CloseBracket)
                expr = new Member(expr, index, true)
            } else if (this.match(T.Dot)) {
                const property = this.expect(T.Identifier)
                expr = new Member(expr, new Id(property.value), false)
            } else {
                break
            }
        }
        return expr
    }
    finishCall(callee: Expression) {
        const args = this.#list(() => this.expression(), T.CloseParen)
        return new Call(callee, args)
    }
    exprOrLambda() {
        const start = this.current
        try {
            const expr = this.expression()
            this.expect(T.CloseParen)
            if (this.match(T.FatArrow)) {
                if (expr instanceof Id) {
                    return this.#lambda([new Var(expr, null)])
                } else {
                    throw this.error(this.previous(), T.Identifier)
                }
            }
            return expr
        } catch (error) {
            this.current = start
            try {
                const params = this.#params({ hasOpen: true })
                this.expect(T.FatArrow)
                return this.#lambda(params)
            } catch (lambdaError) {
                throw error
            }
        }
    }
    #lambda(params: Var[]) {
        const raw = this.match(T.OpenBrace)
            ? this.#block({ hasOpen: true, allowSingle: true })
            : this.expression()
        if (!(raw instanceof Block)) {
            return new Lambda(params, new Return(raw))
        }
        return new Lambda(params, raw)
    }
    #list<F>(
        map: It<F>,
        end?: any,
        separator: T = T.Comma,
        allowTrailingSeparator: boolean = true
    ): F[] {
        const items: F[] = []
        const isSeparatorOptional = !separator
        if (end && this.check(end)) {
            this.advance()
            return items
        }
        do {
            if (end && this.check(end)) break
            items.push(map())
            if (separator) {
                if (this.match(separator)) {
                    if (!allowTrailingSeparator && end && this.check(end)) break
                } else if (end && !this.check(end)) {
                    throw this.error(this.peek(), separator)
                }
            }
        } while (isSeparatorOptional || (end && !this.check(end)))
        if (end) {
            this.expect(end)
        }
        return items
    }
    #template(): Template {
        const quasis: Quasis[] = []
        const expressions: Expression[] = []
        do {
            const str = this.#str()
            quasis.push(new Quasis(str.value, this.match(T.BackTick)))
            if (!quasis[quasis.length - 1].tail) {
                expressions.push(this.expression())
            }
        } while (!this.isAtEnd() && !quasis[quasis.length - 1].tail && !this.match(T.BackTick))
        return new Template(quasis, expressions)
    }
    #str(): Str {
        const value = this.expect(T.StringLiteral)
        return new Str(value.value)
    }
    #id(requiredType: boolean = true): Id {
        const name = this.expect(T.Identifier).value
        let type: TypeAnnotation | null = null
        if (this.match(T.Colon)) {
            type = new TypeAnnotation(this.#type())
        } else if (requiredType) {
            throw this.error(this.peek(), T.Colon)
        }
        return new Id(name, type)
    }
    #block({ hasOpen = false, allowSingle = false } = {}) {
        if (!hasOpen) this.expect(T.OpenBrace)
        const statements: ASTNode[] = []
        while (!this.check(T.CloseBrace) && !this.isAtEnd()) {
            const stmt = this.declaration()
            if (stmt) statements.push(stmt)
        }
        this.expect(T.CloseBrace)
        if (allowSingle && statements.length === 1) {
            return statements[0] as Block
        }
        return new Block(statements)
    }
    #params({ hasOpen = false } = {}) {
        if (!hasOpen) this.expect(T.OpenParen)
        return this.#list(() => {
            const id = this.#id()
            let init: Expression | null = null
            if (this.match(T.Equal)) {
                init = this.expression()
            }
            return new Var(id, init)
        }, T.CloseParen)
    }
    #type(): Type {
        if (this.match(T.OpenParen)) return this.#functionType()
        if (this.match(T.OpenBracket)) return this.#tupleType()
        if (this.match(T.OpenBrace)) return this.#objectType()
        const baseType = this.#baseType()
        if (this.match(T.Pipe)) return this.#unionType(baseType)
        if (this.match(T.Ampersand)) return this.#intersectionType(baseType)
        return baseType
    }
    #baseType(): Type {
        if (this.match(T.Identifier)) {
            const name = this.previous().value
            if (this.match(T.LessThan)) return this.#genericType(name)
            if (this.match(T.OpenBracket)) return this.#listType(name)
            return new PrimitiveType(name)
        }
        throw this.error(this.peek(), T.Identifier)
    }
    #genericType(name: string): GenericType {
        const typeArgs = this.#list(() => this.#type(), T.GreaterThan)
        return new GenericType(name, typeArgs as TypeParameter[])
    }
    #listType(name: string): ListType {
        const elementType = new PrimitiveType(name)
        this.expect(T.CloseBracket)
        return new ListType(elementType)
    }
    #unionType(firstType: Type): UnionType {
        const types = [firstType]
        do {
            types.push(this.#baseType())
        } while (this.match(T.Pipe))
        return new UnionType(types)
    }
    #intersectionType(firstType: Type): IntersectionType {
        const types = [firstType]
        do {
            types.push(this.#baseType())
        } while (this.match(T.Ampersand))
        return new IntersectionType(types)
    }
    #functionType(): FnType {
        const params = this.#list(() => {
            const { name, type: annotation } = this.#id()
            return new PropType(name, annotation!.type)
        }, T.CloseParen)
        this.expect(T.FatArrow)
        const returnType = this.#type()
        return new FnType(params, returnType)
    }
    #tupleType(): TupleType {
        const types = this.#list(() => this.#type(), T.CloseBracket)
        return new TupleType(types)
    }
    #objectType(): ObjectType {
        const properties = this.#list(() => {
            const name = this.expect(T.Identifier).value
            const optional = this.match(T.Question)
            this.expect(T.Colon)
            const type = this.#type()
            return new PropType(name, type, optional)
        }, T.CloseBrace)
        return new ObjectType(properties)
    }
    #typeParameters(): TypeParameter[] {
        return this.#list(() => {
            const name = this.expect(T.Identifier).value
            let constraint = null
            if (this.match(T.Extends)) {
                constraint = this.#type()
            }
            return new TypeParameter(name, constraint)
        }, T.GreaterThan)
    }
    statement() {
        if (this.match(T.OpenBrace)) return this.#block({ hasOpen: true }) as Block
        if (this.match(T.Return)) return this.returnStatement()
        if (this.match(T.If)) return this.ifStatement()
        if (this.match(T.For)) return this.forStatement()
        if (this.match(T.While)) return this.whileStatement()
        if (this.match(T.Do)) return this.doWhileStatement()
        if (this.match(T.Switch)) return this.switchStatement()
        if (this.match(T.Match)) return this.matchStatement()
        if (this.match(T.Try)) return this.tryStatement()
        if (this.match(T.Throw)) return this.throwStatement()
        if (this.match(T.Break)) return new Break()
        if (this.match(T.Continue)) return new Continue()
        return this.expression()
    }
    declaration(): ASTNode {
        if (this.match(T.Let, T.Const, T.Var)) return this.variableDeclaration()
        if (this.match(T.Function)) return this.functionDeclaration()
        if (this.match(T.Enum)) return this.enumDeclaration()
        if (this.match(T.Type)) return this.typeDeclaration()
        return this.statement()
    }
    variableDeclaration() {
        this.stmt = Vars.name
        const kind = this.previous().type as Kind
        const declarations = this.#list(() => this.variableDeclarator())
        return new Vars(kind, declarations)
    }
    variableDeclarator() {
        this.stmt = Var.name
        const id = this.#id()
        let init: Expression | null = null
        if (this.match(T.Equal)) {
            init = this.expression()
        }
        return new Var(id, init)
    }
    typeDeclaration(): TypeAliasDeclaration {
        const name = this.expect(T.Identifier).value
        const typeParameters = this.match(T.LessThan) ? this.#typeParameters() : []
        this.expect(T.Equal)
        const type = this.#type()
        return new TypeAliasDeclaration(name, typeParameters, type)
    }
    functionDeclaration() {
        this.stmt = Fn.name
        const id = this.#id(false)
        const params = this.#params()
        this.match(T.Colon)
        const type = new TypeAnnotation(this.#type())
        const body = this.#block()
        return new Fn(id, params, body, type)
    }
    enumDeclaration() {
        this.stmt = Enum.name
        const id = this.#id(false)
        this.expect(T.OpenBrace)
        const members = this.#list(() => {
            const id = this.#id(false)
            let init: Expression | null = null
            if (this.match(T.Equal)) {
                init = this.expression()
            }
            return new EnumMember(id, init)
        }, T.CloseBrace)
        return new Enum(id, members)
    }
    returnStatement() {
        this.stmt = Return.name
        let value: Expression | null = null
        if (!this.check(T.Semicolon)) {
            value = this.expression()
        }
        return new Return(value)
    }
    newStatement() {
        const callee = this.expression()
        const args = this.match(T.OpenParen) ? this.#list(() => this.expression(), T.CloseParen) : []
        return new New(callee, args)
    }
    ifStatement(): If {
        this.stmt = If.name
        this.expect(T.OpenParen)
        const test = this.expression()
        this.expect(T.CloseParen)
        const consequent = this.#block()
        let alternate: If | Block | null = null
        if (this.match(T.Else)) {
            if (this.match(T.If)) {
                alternate = this.ifStatement()
            } else {
                alternate = this.#block()
            }
        }
        return new If(test, consequent, alternate)
    }
    forStatement(): ASTNode {
        this.expect(T.OpenParen)
        let init: Vars | Expression | null = null
        if (this.match(T.Semicolon)) {
            init = null
        } else if (this.match(T.Let, T.Const, T.Var)) {
            init = this.variableDeclaration()
        } else {
            init = this.expression()
        }
        if (this.match(T.In)) return this.forInStatement(init!)
        if (this.match(T.Of)) return this.forOfStatement(init!)
        let condition: Expression | null = null
        this.expect(T.Semicolon)
        if (!this.check(T.Semicolon)) {
            condition = this.expression()
        }
        this.expect(T.Semicolon)
        let update: Expression | null = null
        if (!this.check(T.CloseParen)) {
            update = this.expression()
        }
        this.expect(T.CloseParen)
        const body = this.#block()
        return new For(init, condition, update, body)
    }
    forInStatement(init: Expression) {
        const right = this.expression()
        this.expect(T.CloseParen)
        const body = this.#block()
        return new ForIn(init, right, body)
    }
    forOfStatement(init: Expression) {
        const right = this.expression()
        this.expect(T.CloseParen)
        const body = this.#block()
        return new ForOf(init, right, body)
    }
    whileStatement() {
        this.expect(T.OpenParen)
        const test = this.expression()
        this.expect(T.CloseParen)
        const body = this.#block()
        return new While(test, body)
    }
    doWhileStatement() {
        const body = this.#block()
        this.expect(T.While)
        this.expect(T.OpenParen)
        const test = this.expression()
        this.expect(T.CloseParen)
        return new DoWhile(body, test)
    }
    switchStatement() {
        this.stmt = Switch.name
        const cases: SwitchCase[] = []
        const defaultCase: Expression[] = []
        this.expect(T.OpenParen)
        const discriminant = this.expression()
        this.expect(T.CloseParen)
        this.expect(T.OpenBrace)
        while (!this.check(T.CloseBrace)) {
            let test: Expression | null = null
            if (this.match(T.Case)) {
                test = this.expression()
            } else if (this.match(T.Default)) {
                test = null
            } else {
                throw this.error(this.peek(), T.Case)
            }
            this.expect(T.Colon)
            const consequent: Expression[] = []
            while (!this.checkMany(T.Case, T.Default, T.CloseBrace)) {
                const stmt = this.declaration()
                if (stmt) consequent.push(stmt)
            }
            if (test) {
                cases.push(new SwitchCase(test, consequent))
            } else {
                defaultCase.push(...consequent)
            }
        }
        this.expect(T.CloseBrace)
        return new Switch(discriminant, cases, defaultCase.length ? defaultCase : null)
    }
    matchStatement() {
        this.stmt = Match.name
        const discriminant = this.expression()
        this.expect(T.OpenBrace)
        let defaultCase: Expression | null = null
        const cases: MatchCase[] = this.#list(() => {
            this.stmt = MatchCase.name
            const test = this.expression()
            this.expect(T.FatArrow)
            const consequent: Expression[] = []
            while (!this.check(T.Comma) && !this.check(T.CloseBrace)) {
                const stmt = this.declaration()
                if (stmt) consequent.push(stmt)
            }
            if (test instanceof Id && test.name === '_') {
                defaultCase = new Block(consequent)
            } else {
                return new MatchCase(test, consequent)
            }
        }, T.CloseBrace).filter(c => c) as MatchCase[]
        return new Match(discriminant, cases, defaultCase)
    }
    tryStatement() {
        this.stmt = Try.name
        const block: Block | null = this.#block()
        let handler: Catch | null = null
        if (this.match(T.Catch)) {
            this.expect(T.OpenParen)
            const param = this.#id(false)
            this.expect(T.CloseParen)
            const body = this.#block()
            handler = new Catch(param, body)
        }
        let finalizer: Expression | null = null
        if (this.match(T.Finally)) {
            finalizer = this.expression()
        }
        return new Try(block, handler, finalizer)
    }
    throwStatement() {
        this.stmt = Throw.name
        const argument = this.expression()
        return new Throw(argument)
    }
}
class Types {
    static readonly int = new PrimitiveType('int')
    static readonly float = new PrimitiveType('float')
    static readonly char = new PrimitiveType('char')
    static readonly str = new PrimitiveType('str')
    static readonly bool = new PrimitiveType('bool')
    static readonly null = new PrimitiveType('null')
    static readonly any = new PrimitiveType('any')
    static readonly void = new PrimitiveType('void')
    static readonly unknown = new PrimitiveType('unknown')
    static readonly func = new PrimitiveType('func')
    static readonly list = new PrimitiveType('list')
    static readonly tuple = new PrimitiveType('tuple')
    static readonly record = new PrimitiveType('record')
    static readonly object = new PrimitiveType('object')
    static readonly enum = new PrimitiveType('enum')
    static readonly i8 = new PrimitiveType('i8')
    static readonly i16 = new PrimitiveType('i16')
    static readonly i32 = new PrimitiveType('i32')
    static readonly i64 = new PrimitiveType('i64')
    static readonly u8 = new PrimitiveType('u8')
    static readonly u16 = new PrimitiveType('u16')
    static readonly u32 = new PrimitiveType('u32')
    static readonly u64 = new PrimitiveType('u64')
    static readonly f32 = new PrimitiveType('f32')
    static readonly f64 = new PrimitiveType('f64')
    static readonly isize = new PrimitiveType('isize')
    static readonly usize = new PrimitiveType('usize')
    static readonly byte = new PrimitiveType('byte')
    static readonly integers = [
        Types.int, Types.i8, Types.i16, Types.i32, Types.i64,
        Types.u8, Types.u16, Types.u32, Types.u64, Types.isize, Types.usize
    ]
    static readonly floats = [
        Types.float, Types.f32, Types.f64
    ]
    static readonly numbers = [
        ...Types.integers,
        ...Types.floats
    ]
    static all = [
        Types.int, Types.float, Types.char, Types.str, Types.bool, Types.null, Types.any, Types.void, Types.unknown,
        Types.func, Types.list, Types.tuple, Types.record, Types.object, Types.enum,
        Types.i8, Types.i16, Types.i32, Types.i64,
        Types.u8, Types.u16, Types.u32, Types.u64,
        Types.f32, Types.f64, Types.isize, Types.usize,
        Types.byte
    ]
    static listOf(type: Type): ListType {
        return new ListType(type)
    }
    static tupleOf(types: Type[]): TupleType {
        return new TupleType(types)
    }
    static recordOf(properties: PropType[]): ObjectType {
        return new ObjectType(properties)
    }
    static objectOf(properties: PropType[]): ObjectType {
        return new ObjectType(properties)
    }
    static enumOf(members: EnumMemberType[]): EnumType {
        return new EnumType(members)
    }
    static funcOf(params: PropType[], returnType: Type): FnType {
        return new FnType(params, returnType)
    }
    static compatible(expected: Type, actual: Type): boolean {
        if (expected instanceof PrimitiveType && expected.name == 'any' ||
            actual instanceof PrimitiveType && actual.name == 'any') {
            return true
        }
        if (expected instanceof PrimitiveType && actual instanceof PrimitiveType) {
            if (expected.name === Types.int.name && Types.integers.some(({ name }) => name === actual.name)) return true
            if (expected.name === Types.float.name && Types.floats.some(({ name }) => name === actual.name)) return true
            return expected.name === actual.name
        }
        if (expected instanceof GenericType && actual instanceof GenericType) {
            return expected.name === actual.name && expected.args.length === actual.args.length
        }
        if (expected instanceof ListType && actual instanceof ListType) {
            return Types.compatible(expected.name, actual.name)
        }
        if (expected instanceof TupleType && actual instanceof TupleType) {
            if (expected.elements.length !== actual.elements.length) return false
            return expected.elements.every((type, i) => Types.compatible(type, actual.elements[i]))
        }
        if (expected instanceof ObjectType && actual instanceof ObjectType) {
            if (expected.properties.length !== actual.properties.length) return false
            return expected.properties.every((prop, i) => {
                const other = actual.properties[i]
                return prop.name === other.name && Types.compatible(prop.type, other.type)
            })
        }
        if (expected instanceof UnionType && actual instanceof UnionType) {
            return expected.types.length === actual.types.length
        }
        if (expected instanceof IntersectionType && actual instanceof IntersectionType) {
            return expected.types.length === actual.types.length
        }
        if (expected instanceof FnType && actual instanceof FnType) {
            if (expected.params.length !== actual.params.length) return false
            if (!Types.compatible(expected.type, actual.type)) return false
            return expected.params.every((param, i) => {
                const arg = actual.params[i]
                return Types.compatible(param.type, arg.type)
            })
        }
        if (expected instanceof EnumType && actual instanceof EnumType) {
            if (expected.members.length !== actual.members.length) return false
            return expected.members.every((member, i) => {
                const other = actual.members[i]
                return member.name === other.name && Types.compatible(member.type, other.type)
            })
        }
        if (expected instanceof TypeParameter && actual instanceof TypeParameter) {
            return expected.name === actual.name
        }
        if (expected instanceof PropType && actual instanceof PropType) {
            return expected.name === actual.name && Types.compatible(expected.type, actual.type)
        }
        return false
    }
}
class Functions {
    static readonly print = new FnType([new PropType('value', Types.any)], Types.void)
    static readonly println = new FnType([new PropType('value', Types.any)], Types.void)
    static readonly input = new FnType([new PropType('value', Types.str)], Types.str)
    static readonly random = new FnType([new PropType('min', Types.int), new PropType('max', Types.int)], Types.float)
}
class Objects {
    static readonly Math = new ObjectType([
        new PropType('PI', Types.int),
        new PropType('sum', Types.funcOf([new PropType('a', Types.int), new PropType('b', Types.int)], Types.int))
    ])
}
class BuiltIn {
    static types = Types
    static functions = Functions
    static objects = Objects
    static getFunction(name: keyof BuilInFunctions): FnType | undefined {
        return BuiltIn.functions[name]
    }
    static getObjectMethod(obj: keyof BuilInObjects, method: string): FnType | undefined {
        return BuiltIn.objects[obj]?.[method]
    }
}

class SemanticErrorBuilder extends Error {
    constructor(public message: string) {
        super('SemanticError')
        // this.stack = ''
        this.message = `\x1b[31mSemanticError: ${message}\x1b[0m`
    }
}

const SemanticError = (message: string) => new SemanticErrorBuilder(message)


class SemanticAnalyzer {
    symbols: SymbolTable
    errors: string[]
    scope: Map<string, SymbolItem>
    private currentReturn: Type | null = null
    constructor(private ast: Program) {
        this.symbols = new SymbolTable()
        this.errors = []
        this.scope = this.symbols.getCurrentScope()
    }
    analyze() {
        this.program(this.ast)
    }
    program({ statements: stmts }: Program) {
        this.symbols.pushScope()
        stmts.body && stmts.body.forEach(stmt => this.node(stmt))
        this.symbols.popScope()
    }
    node<T = Type | void>(node: ASTNode): T {
        switch (node.constructor) {
            case Template: return this.template(node as Template) as T
            case Member: return this.member(node as Member) as T
            case Tuple: return this.tuple(node as Tuple) as T
            case Record$: return this.record(node as Record$) as T
            case Lambda: return this.lambda(node as Lambda) as T
            case Spread: return this.spread(node as Spread) as T
            case PipeLine: return this.pipeLine(node as PipeLine) as T
            case New: return this.new(node as New) as T
            case Conditional: return this.conditional(node as Conditional) as T
            case Enum: return this.enum(node as Enum) as T
            case ForOf: return this.forOf(node as ForOf) as T
            case DoWhile: return this.doWhile(node as DoWhile) as T
            case Break: return this.break(node as Break) as T
            case Continue: return this.continue(node as Continue) as T
            case Switch: return this.switch(node as Switch) as T
            case Match: return this.match(node as Match) as T
            case Try: return this.try(node as Try) as T
            case Throw: return this.throw(node as Throw) as T
            case Block: return this.block(node as Block) as T
            case Vars: return this.vars(node as Vars) as T
            case Fn: return this.fn(node as Fn) as T
            case Return: return this.return(node as Return) as T
            case If: return this.if(node as If) as T
            case For: return this.for(node as For) as T
            case ForIn: return this.forIn(node as ForIn) as T
            case While: return this.while(node as While) as T
            case Assignment: return this.assignment(node as Assignment) as T
            case TypeAliasDeclaration: return this.typeAlias(node as TypeAliasDeclaration) as T
            case Binary: return this.binaryExpr(node as Binary) as T
            case Unary: return this.unaryExpr(node as Unary) as T
            case Range: return this.range(node as Range) as T
            case List: return this.list(node as List) as T
            case Obj: return this.obj(node as Obj) as T
            case Call: return this.call(node as Call) as T
            case Id: return this.id(node as Id) as T
            case Int:
            case Float:
            case Str:
            case Bool:
            case Null:
                return this.literal(node) as T
            default:
                throw SemanticError('Unsupported node type: ' + node.constructor.name)
        }
    }
    typeAlias({ name, type }: TypeAliasDeclaration) {
        this.symbols.define(name, type)
    }
    block({ body }: Block) {
        this.symbols.pushScope()
        body && body.forEach(stmt => this.node(stmt))
        this.symbols.popScope()
    }
    vars({ declarations }: Vars) {
        for (const { init, id } of declarations) {
            const varType = id.type ? this.resolve(id.type) : Types.any
            if (init) {
                const initType = this.node<PrimitiveType>(init)
                if (!this.isCompatible(varType, initType)) {
                    throw SemanticError(`Cannot assign ${this.str(initType)} to ${this.str(varType)}`)
                }
            }
            this.symbols.define(id.name, varType)
        }
    }
    fn({ id, body, params, type }: Fn) {
        const returnType = this.resolve(type.type)
        const paramTypes = params.map(({ id }) => this.resolve(id.type?.type || Types.any))
        const propTypes = paramTypes.map((type, i) => new PropType(params[i].id.name, type))
        const functionType = new FnType(propTypes, returnType)
        this.symbols.define(id.name, functionType)
        this.symbols.pushScope()
        this.currentReturn = returnType
        for (const { id } of params) {
            const paramType = this.resolve(id.type?.type || Types.any)
            this.symbols.define(id.name, paramType)
        }
        if (body) this.node(body)
        if (this.currentReturn === null && returnType !== Types.void) {
            throw SemanticError(`Function ${id.name} is declared to return ${this.str(returnType)}, but no return statement was found.`)
        }
        this.currentReturn = null
        this.symbols.popScope()
    }
    return({ value }: Return) {
        if (this.currentReturn === null) throw SemanticError('Return statement outside of function')
        if (value) {
            const actualReturnType = this.node<PrimitiveType>(value)
            if (!this.isCompatible(this.currentReturn, actualReturnType)) {
                throw SemanticError(`Type mismatch: Function expects return type ${this.str(this.currentReturn)}, but got ${this.str(actualReturnType)}`)
            }
        } else if (this.currentReturn !== Types.void) {
            throw SemanticError(`Function expects return type ${this.str(this.currentReturn)}, but got void`)
        }
    }
    if(ifStmt: If) {
        const conditionType = this.node<PrimitiveType>(ifStmt.test)
        if (!this.isCompatible(Types.bool, conditionType)) throw SemanticError('Condition in if statement must be a boolean')
        if (ifStmt.consequent) this.node(ifStmt.consequent)
        if (ifStmt.alternate) this.node(ifStmt.alternate)
    }
    for(forStmt: For) {
        this.symbols.pushScope()
        if (forStmt.init) this.node(forStmt.init)
        if (forStmt.test) {
            const testType = this.node<PrimitiveType>(forStmt.test)
            if (!this.isCompatible(Types.bool, testType)) throw SemanticError('Condition in for statement must be a boolean')
        }
        if (forStmt.update) this.node(forStmt.update)
        if (forStmt.body) this.node(forStmt.body)
        this.symbols.popScope()
    }
    forIn(forInStmt: ForIn) {
        const right = this.node<PrimitiveType>(forInStmt.right)
        const id = (forInStmt.left as Vars).declarations[0].id.name
        if (right instanceof ListType) {
            this.symbols.pushScope()
            this.symbols.define(id, right.name)
            if (forInStmt.body) this.node(forInStmt.body)
            this.symbols.popScope()
        } else if (right instanceof ObjectType) {
            this.symbols.pushScope()
            this.symbols.define(id, right)
            for (const prop of right.properties) this.symbols.define(prop.name, prop.type)
            if (forInStmt.body) this.node(forInStmt.body)
            this.symbols.popScope()
        } else if (right instanceof TupleType) {
            this.symbols.pushScope()
            for (let i = 0; i < right.elements.length; i++) {
                this.symbols.define(`_${i}`, right.elements[i])
            }
            if (forInStmt.body) this.node(forInStmt.body)
            this.symbols.popScope()
        } else if (right instanceof RangeType) {
            this.symbols.pushScope()
            this.symbols.define(id, Types.int)
            if (forInStmt.body) this.node(forInStmt.body)
            this.symbols.popScope()
        }
        else {
            throw SemanticError(`Type mismatch: Cannot iterate over ${this.str(right)}`)
        }
    }
    while(whileStmt: While) {
        const conditionType = this.node(whileStmt.test) as PrimitiveType
        if (!this.isCompatible(Types.bool, conditionType)) throw SemanticError('Condition in while statement must be a boolean')
        if (whileStmt.body) this.node(whileStmt.body)
    }
    assignment(assignment: Assignment): Type {
        const left = this.node<PrimitiveType>(assignment.left)
        const right = this.node<PrimitiveType>(assignment.right)
        if (!this.isCompatible(left, right)) throw SemanticError(`Cannot assign ${this.str(right)} to ${this.str(left)}`)
        return left
    }
    binaryExpr(expr: Binary): Type {
        const left = this.node<PrimitiveType>(expr.left)
        const right = this.node<PrimitiveType>(expr.right)
        if (!left || !right) return Types.any
        const numberTypes = Types.numbers.map(t => t.name)
        switch (expr.operator) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                if (numberTypes.includes(left.name) && numberTypes.includes(right.name)) return this.isNumber(left, right)
                throw SemanticError(`Invalid operands for operator ${expr.operator}`)
            case '==':
            case '!=':
            case '<':
            case '<=':
            case '>':
            case '>=':
                if (!this.isCompatible(left, right))
                    throw SemanticError(`Incompatible types for comparison: ${this.str(left)} and ${this.str(right)}`)
                return Types.bool
            default:
                throw SemanticError(`Unsupported binary operator: ${expr.operator}`)
        }
    }
    unaryExpr(expr: Unary): Type {
        const operandType = this.node<PrimitiveType>(expr.right)
        switch (expr.operator) {
            case '++':
            case '--': {
                return new PrimitiveType(operandType.name)
            }
            case '-':
            case '+':
            case '~':
            case '^':
                return new PrimitiveType(operandType.name)
            case '!':
                if (operandType.name === Types.bool.name) return Types.bool
                throw SemanticError(`Invalid operand for unary operator ${expr.operator}`)
            default:
                throw SemanticError(`Unsupported unary operator: ${expr.operator}`)
        }
    }
    range(range: Range): Type {
        const startType = this.node(range.start) as PrimitiveType
        const endType = this.node(range.end) as PrimitiveType
        const check = (a: PrimitiveType) => Types.integers.some(t => t.name === a.name)
        if (check(startType) && check(endType)) return new RangeType(startType, endType)
        throw SemanticError(`Invalid range: ${this.str(startType)}..${this.str(endType)}`)
    }
    list(list: List): Type {
        const elements = list.elements.map(e => this.node(e) as PrimitiveType)
        if (elements.length === 0) return new ListType(Types.any)
        const elementType = elements.reduce((prev, current) => {
            if (prev.name === 'any') return current
            if (current.name === 'any') return prev
            if (prev.name === current.name) return prev
            const numbers = Types.numbers.map(n => n.name)
            if (numbers.includes(prev.name) && numbers.includes(current.name)) {
                return this.isNumber(prev, current)
            }
            return Types.any
        })
        if (elementType.name === 'any') return new ListType(Types.any)
        return new ListType(elementType)
    }
    obj(obj: Obj): Type {
        const properties = obj.properties.map(p => {
            if (p instanceof Prop) {
                const propType = this.node(p.value) as PrimitiveType
                return new PropType(p.id.name, propType)
            } else if (p instanceof SpreadProp) {
                const spreadType = this.node(p.expression) as ObjectType
                return spreadType.properties.map(sp => {
                    return new PropType(sp.name, sp.type)
                })
            } else {
                throw SemanticError('Unsupported object property')
            }
        })
        const propertiesFlat = properties.flat()
        const propertyNames = propertiesFlat.map(p => p.name)
        const duplicates = propertyNames.filter((name, i) => propertyNames.indexOf(name) !== i)
        if (duplicates.length) throw SemanticError(`Duplicate property names: ${duplicates.join(', ')}`)
        return new ObjectType(propertiesFlat)
    }
    call(call: Call): Type {
        let callee: Type | null
        if (call.callee instanceof Id) {
            callee = this.symbols.lookup(call.callee.name)
            if (!callee) {
                callee = BuiltIn.getFunction(call.callee.name as keyof BuilInFunctions) as FnType
            }
        } else {
            callee = this.node(call.callee) as FnType
        }
        if (!(callee instanceof FnType)) {
            const calleeType = callee ? this.str(callee) : Types.unknown.name
            throw SemanticError(`Calling non-function value: ${calleeType}`)
        }
        if (call.args.length !== callee.params.length) {
            throw SemanticError(`Expected ${callee.params.length} arguments, but got ${call.args.length}`)
        }
        for (let i = 0; i < Math.min(call.args.length, callee.params.length); i++) {
            const argType = this.node(call.args[i]) as PrimitiveType
            const paramType = callee.params[i].type
            if (!this.isCompatible(paramType, argType)) throw SemanticError(`Type mismatch: Argument ${i + 1} expected ${this.str(paramType)}, but got ${this.str(argType)}`)
        }
        return callee.type
    }
    checkArgs(func: FnType, args: Expression[]) {
        if (args.length !== func.params.length) throw SemanticError(`Expected ${func.params.length} arguments, but got ${args.length}`)
        for (let i = 0; i < Math.min(args.length, func.params.length); i++) {
            const argType = this.node(args[i]) as PrimitiveType
            const paramType = func.params[i].type
            if (!this.isCompatible(paramType, argType)) {
                throw SemanticError(`Type mismatch: Argument ${i + 1} expected ${this.str(paramType)}, but got ${this.str(argType)}`)
            }
        }
    }
    id(id: Id): Type {
        const varType = this.symbols.lookup(id.name)
        if (!varType) throw SemanticError(`Undefined variable: ${id.name}`)
        return varType
    }
    literal(literal: ASTNode): Type {
        switch (literal.constructor) {
            case Int: {
                const value = (literal as Int).value
                if (value >= 0 && value <= 255) return Types.u8
                if (value >= 0 && value <= 65535) return Types.u16
                if (value >= 0 && value <= 4294967295) return Types.u32
                if (value >= 0) return Types.u64
                if (value >= -128 && value <= 127) return Types.i8
                if (value >= -32768 && value <= 32767) return Types.i16
                if (value >= -2147483648 && value <= 2147483647) return Types.i32
                return Types.i64
            }
            case Float: {
                const value = (literal as Float).value
                if (value >= 0 && value <= 4294967295) return Types.f32
                return Types.f64
            }
            case Str: {
                const value = (literal as Str).value
                if (value.length === 1) return Types.char
                return Types.str
            }
            case Char: return Types.char
            case Bool: return Types.bool
            case Null: return Types.null
            default:
                throw SemanticError(`Unsupported literal type: ${literal.constructor.name}`)
        }
    }
    template(template: Template): Type {
        template.expressions.forEach(expr => this.node(expr))
        return Types.str
    }
    member({ computed, property, object }: Member): Type {
        const objectType = this.node(object) as Type
        if (objectType instanceof ObjectType) {
            const propertyName = computed
                ? (property instanceof Str ? property.value : null)
                : (property instanceof Id ? property.name : null)
            if (propertyName) {
                const property = objectType.properties.find(p => p.name === propertyName)
                if (property) return property.type
            }
            throw SemanticError(`Property ${String(propertyName)} not found on object`)
        } else if (objectType instanceof ListType) {
            // List index must be an integer
            if (property instanceof Int || property instanceof Id) {
                return objectType.name
            }
            else throw SemanticError(`List index must be an integer, got ${this.str(property)}`)
        } else {
            throw SemanticError(`Cannot access property of non-object type ${this.str(objectType)}`)
        }
    }
    tuple(tuple: Tuple): Type {
        const elementTypes = tuple.elements.map(elem => this.node(elem)) as Type[]
        return new TupleType(elementTypes)
    }
    record(record: Record$): Type {
        const properties = record.properties.map(prop => {
            const propType = this.node(prop.value) as Type
            return new PropType(prop.id.name, propType)
        })
        return new ObjectType(properties)
    }
    lambda(lambda: Lambda): Type {
        const returnType = Types.any
        const paramTypes = lambda.params.map(({ id }) => this.resolve(id.type?.type || Types.any))
        const propTypes = paramTypes.map((type, i) => new PropType(lambda.params[i].id.name, type))
        const functionType = new FnType(propTypes, returnType)
        this.symbols.pushScope()
        this.currentReturn = returnType
        for (const { id } of lambda.params) {
            const paramType = this.resolve(id.type?.type || Types.any)
            this.symbols.define(id.name, paramType)
        }
        if (lambda.body) this.node(lambda.body)
        if (this.currentReturn === null && returnType !== Types.void) {
            throw SemanticError('Lambda is declared to return a value, but no return statement was found.')
        }
        this.currentReturn = null
        this.symbols.popScope()
        return functionType
    }
    spread(spread: Spread): Type {
        const exprType = this.node(spread.expression) as Type
        if (exprType instanceof ListType || exprType instanceof TupleType) {
            return exprType
        }
        throw SemanticError(`Cannot spread non-iterable of type ${this.str(exprType)}`)
    }
    pipeLine(pipeline: PipeLine): Type {
        const leftType = this.node(pipeline.left) as Type
        const rightType = this.node(pipeline.right) as Type
        if (rightType instanceof FnType) {
            if (this.isCompatible(rightType.params[0].type, leftType)) {
                return rightType.type
            }
            throw SemanticError(`Incompatible types in pipeline: ${this.str(leftType)} | ${this.str(rightType)}`)
        } else {
            throw SemanticError(`Right side of pipeline must be a function, got ${this.str(rightType)}`)
        }
    }
    new(newExpr: New): Type {
        const constructorType = this.node(newExpr.callee) as Type
        if (constructorType instanceof FnType) {
            this.checkArgs(constructorType, newExpr.args)
            return constructorType.type
        }
        throw SemanticError(`Cannot instantiate non-constructor type ${this.str(constructorType)}`)
    }
    conditional(cond: Conditional): Type {
        const testType = this.node(cond.test) as Type
        if (!this.isCompatible(Types.bool, testType)) {
            throw SemanticError(`Condition must be a boolean, got ${this.str(testType)}`)
        }
        const consequentType = this.node(cond.consequent) as Type
        const alternateType = this.node(cond.alternate) as Type
        if (!this.isCompatible(consequentType, alternateType)) {
            throw SemanticError(`Incompatible types in conditional: ${this.str(consequentType)} and ${this.str(alternateType)}`)
        }
        return consequentType
    }
    enum(enumNode: Enum): Type {
        const enumType = new ObjectType([])
        this.symbols.define(enumNode.id.name, enumType)
        enumNode.members.forEach(member => {
            if (member.init) {
                const initType = this.node(member.init) as PrimitiveType
                if (!this.isCompatible(Types.str, initType) && !this.isCompatible(Types.int, initType)) {
                    throw SemanticError(`Enum member must be initialized with string or integer, got ${this.str(initType)}`)
                }
            }
            enumType.properties.push(new PropType(member.id.name, Types.str))
        })
        return enumType
    }
    forOf(forOf: ForOf): Type {
        const rightType = this.node(forOf.right) as Type
        if (rightType instanceof ListType) {
            this.symbols.pushScope()
            if (forOf.left instanceof Vars) {
                const leftVar = forOf.left.declarations[0]
                this.symbols.define(leftVar.id.name, rightType.name)
            } else {
                throw SemanticError('Invalid left-hand side in for-of loop')
            }
            if (forOf.body) this.node(forOf.body)
            this.symbols.popScope()
        } else {
            throw SemanticError(`Right-hand side of for-of loop must be iterable, got ${this.str(rightType)}`)
        }
        return Types.void
    }
    doWhile(doWhile: DoWhile): Type {
        if (doWhile.body) this.node(doWhile.body)
        const testType = this.node(doWhile.test) as Type
        if (!this.isCompatible(Types.bool, testType)) {
            throw SemanticError(`Do-while condition must be a boolean, got ${this.str(testType)}`)
        }
        return Types.void
    }
    break(_: Break): Type {
        return Types.void
    }
    continue(_: Continue): Type {
        return Types.void
    }
    switch(switchNode: Switch): Type {
        const discriminantType = this.node(switchNode.discriminant) as Type
        switchNode.cases.forEach(caseNode => {
            if (caseNode.test) {
                const testType = this.node(caseNode.test) as Type
                if (!this.isCompatible(discriminantType, testType)) {
                    throw SemanticError(`Switch case type ${this.str(testType)} is not compatible with switch discriminant type ${this.str(discriminantType)}`)
                }
            }
            caseNode.consequent.forEach(stmt => this.node(stmt))
        })
        if (switchNode.defaultCase) {
            this.node(switchNode.defaultCase)
        }
        return Types.void
    }
    match(matchNode: Match): Type {
        const discriminantType = this.node(matchNode.discriminant) as Type
        const caseTypes: Type[] = []
        matchNode.cases.forEach(caseNode => {
            if (caseNode.test) {
                const testType = this.node(caseNode.test) as Type
                if (!this.isCompatible(discriminantType, testType)) {
                    throw SemanticError(`Match case type ${this.str(testType)} is not compatible with match discriminant type ${this.str(discriminantType)}`)
                }
            }
            const consequentType = caseNode.consequent.map(stmt => this.node(stmt)).pop() || Types.void
            caseTypes.push(consequentType)
        })
        if (matchNode.defaultCase) {
            caseTypes.push(this.node(matchNode.defaultCase) as Type)
        }
        const firstType = caseTypes[0]
        for (let i = 1; i < caseTypes.length; i++) {
            if (!this.isCompatible(firstType, caseTypes[i])) {
                throw SemanticError(`Incompatible types in match expression: ${this.str(firstType)} and ${this.str(caseTypes[i])}`)
            }
        }
        return firstType
    }
    try(tryNode: Try): Type {
        if (tryNode.block) this.node(tryNode.block)
        if (tryNode.handler) {
            this.symbols.pushScope()
            this.symbols.define(tryNode.handler.param.name, Types.any)
            if (tryNode.handler.body) this.node(tryNode.handler.body)
            this.symbols.popScope()
        }
        if (tryNode.finalizer) this.node(tryNode.finalizer)
        return Types.void
    }
    throw(throwNode: Throw): Type {
        this.node(throwNode.argument)
        return Types.void
    }
    resolve(type: Type): Type {
        if (type instanceof TypeAnnotation) {
            return this.resolveTypeAnnotation(type)
        } else if (type instanceof PrimitiveType) {
            return type
        } else if (typeof type === 'string') {
            return this.resolvePrimitiveTypeFromString(type)
        } else if (type instanceof FnType) {
            const paramTypes = type.params.map(p => new TypeAnnotation(this.resolve(p.type)))
            const returnType = new TypeAnnotation(this.resolve(type.type))
            const propTypes = paramTypes.map((t, i) => new PropType(type.params[i].name, t))
            return new FnType(propTypes, returnType)
        } else if (type instanceof UnionType) {
            return new UnionType(type.types.map(t => this.resolve(t)))
        } else if (type instanceof IntersectionType) {
            return new IntersectionType(type.types.map(t => this.resolve(t)))
        } else if (type instanceof ListType) {
            return new ListType(this.resolve(type.name))
        } else if (type instanceof TupleType) {
            return new TupleType(type.elements.map(t => this.resolve(t)))
        } else if (type instanceof RangeType) {
            return new RangeType(this.resolve(type.start), this.resolve(type.end))
        } else if (type instanceof ObjectType) {
            return new ObjectType(type.properties.map(p =>
                new PropType(p.name, this.resolve(p.type), p.optional)
            ))
        } else if (type instanceof GenericType) {
            return new GenericType(
                type.name,
                type.args.map(tp =>
                    new TypeParameter(tp.name, tp.constraint ? this.resolve(tp.constraint) : null)
                )
            )
        } else {
            throw SemanticError(`Unsupported type: ${type.constructor.name}`)
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
        const type = Types.all.find(t => t.name === typeName)
        if (type) return type
        throw SemanticError(`Unknown type: ${typeName}`)
    }
    isCompatible(expected: Type, actual: Type): boolean {
        if (expected instanceof PrimitiveType && expected.name === 'any' || actual instanceof PrimitiveType && actual.name === 'any') return true
        else if (expected instanceof PrimitiveType && actual instanceof PrimitiveType) {
            if (expected.name === 'any' || actual.name === 'any') return true
            if (expected.name == Types.int.name && Types.integers.some(({ name }) => name === actual.name)) return true
            return expected.name === actual.name
        } else if (expected instanceof FnType && actual instanceof FnType) {
            if (expected.params.length !== actual.params.length) {
                return false
            }
            for (let i = 0; i < expected.params.length; i++) {
                if (!this.isCompatible(expected.params[i].type, actual.params[i].type)) {
                    return false
                }
            }
            return this.isCompatible(expected.type, actual.type)
        } else if (expected instanceof ListType && actual instanceof ListType) {
            return this.isCompatible(expected.name, actual.name)
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
            if (expected.elements.length !== actual.elements.length) {
                return false
            }
            for (let i = 0; i < expected.elements.length; i++) {
                if (!this.isCompatible(expected.elements[i], actual.elements[i])) {
                    return false
                }
            }
            return true
        }
        return false
    }
    str(type: Type): string {
        if (type instanceof PrimitiveType) return type.name
        else if (type instanceof FnType) {
            const params = type.params.map(p => this.str(p.type)).join(', ')
            return `(${params}) => ${this.str(type.type)}`
        } else if (type instanceof ListType) {
            return `${this.str(type.name)}[]`
        } else if (type instanceof TupleType) {
            return `[${type.elements.map(t => this.str(t)).join(', ')}]`
        } else if (type instanceof ObjectType) {
            const properties = type.properties.map(p => `${p.name}: ${this.str(p.type)}`).join(', ')
            return `{${properties}}`
        } else if (type instanceof RangeType) {
            return `${this.str(type.start)}..${this.str(type.end)}`
        }
        return 'unknown'
    }
    isNumber(type1: PrimitiveType, type2: PrimitiveType): PrimitiveType {
        const numericTypes = Types.numbers.map(t => t.name)
        const index1 = numericTypes.indexOf(type1.name)
        const index2 = numericTypes.indexOf(type2.name)
        return new PrimitiveType(numericTypes[Math.max(index1, index2)])
    }
    getErrors(): string[] {
        return this.errors
    }
}
class SymbolItem {
    constructor(public name: string, public type: Type) { }
}
class SymbolTable {
    private scopes: Map<string, SymbolItem>[]
    constructor() {
        this.scopes = [new Map()]
    }
    pushScope() {
        this.scopes.push(new Map())
    }
    popScope() {
        this.scopes.pop()
    }
    getCurrentScope() {
        return this.scopes[this.scopes.length - 1]
    }
    define(name: string, type: Type) {
        this.getCurrentScope().set(name, new SymbolItem(name, type))
    }
    lookup(name: string): Type | null {
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            const item = this.scopes[i].get(name)
            if (item) return item.type
        }
        return null
    }
}
const path = Bun.argv[2]
const file = Bun.file(path)
const source = await file.text()
const lexer = new LexicalAnalyzer(source)
const tokens = lexer.tokenize()
const parser = new SyntaxAnalizer(tokens)
const ast = parser.parse()
const semanticAnalyzer = new SemanticAnalyzer(ast)
semanticAnalyzer.analyze()
const errors = semanticAnalyzer.getErrors()
if (errors.length) {
    errors.forEach(err => console.error(err))
    process.exit(1)
} else {
    console.log('\x1b[32m', 'No errors found\x1b[0m')
}
export { }