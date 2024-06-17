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
    New,
    Try,
    Catch,
    Finally,
    Throw,
    Switch,
    Case,
    Default,
    Match,
    Import,
    Export,
    From,
    As,
    With,
    In,
    Of,
    Str,
    Int,
    Float,
    Bool,
    List,
    Object,
    None,
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
    Semicolon,
    Colon,
    Arrow,
    DoubleArrow,
    StringLiteral,
    TemplateLiteral,
    IntegerLiteral,
    FloatLiteral,
    BooleanLiteral,
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
type DataType = T.Str | T.Int | T.Float | T.Bool | T.List | T.Object | T.None | T.Function
class Token {
    constructor(
        public type: T,
        public value: string,
        public line: number,
        public column: number
    ) { }
}
class ASTNode {
    print(n: number): void {
        console.log("  ".repeat(n) + this.constructor.name);
    }
}
const KEYWORDS: KeywordMap = {
    'let': T.Let,
    'const': T.Const,
    'var': T.Var,
    'if': T.If,
    'else': T.Else,
    'for': T.For,
    'while': T.While,
    'break': T.Break,
    'continue': T.Continue,
    'return': T.Return,
    'function': T.Function,
    'class': T.Class,
    'new': T.New,
    'try': T.Try,
    'catch': T.Catch,
    'finally': T.Finally,
    'throw': T.Throw,
    'switch': T.Switch,
    'case': T.Case,
    'default': T.Default,
    'match': T.Match,
    'import': T.Import,
    'export': T.Export,
    'from': T.From,
    'as': T.As,
    'with': T.With,
    'in': T.In,
    'of': T.Of,
    'str': T.Str,
    'int': T.Int,
    'float': T.Float,
    'bool': T.Bool,
    'list': T.List,
    'object': T.Object,
    'none': T.None,
    'true': T.BooleanLiteral,
    'false': T.BooleanLiteral
}
class Position {
    constructor(public line: number = 1, public column: number = 1) { }
    advance(char: string = ''): void {
        if (char === '\n') {
            this.line++;
            this.column = 1;
        } else {
            this.column++;
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
    tokenize(): Token[] {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scan();
        }
        this.tokens.push(new Token(T.EOF, "", this.position.line, this.position.column));
        return this.tokens;
    }
    print(): void {
        console.table(tokens.map(token => token));
    }
    scan(): void {
        const char = this.advance();
        switch (char) {
            case '(': this.add(T.OpenParen); break;
            case ')': this.add(T.CloseParen); break;
            case '[': this.add(T.OpenBracket); break;
            case ']': this.add(T.CloseBracket); break;
            case '{': this.add(T.OpenBrace); break;
            case '}': this.add(T.CloseBrace); break;
            case ',': this.add(T.Comma); break;
            case ';': this.add(T.Semicolon); break;
            case ':': this.add(T.Colon); break;
            case '.':
                if (this.match('.')) {
                    if (this.match('.')) this.add(T.Spread);
                    else this.add(T.Range);
                } else {
                    this.add(T.Dot);
                }
                break;
            case '+':
                if (this.match('+')) this.add(T.Increment);
                else if (this.match('=')) this.add(T.PlusEqual);
                else this.add(T.Plus);
                break;
            case '-':
                if (this.match('-')) this.add(T.Decrement);
                else if (this.match('=')) this.add(T.MinusEqual);
                else if (this.match('>')) this.add(T.Arrow);
                else this.add(T.Minus);
                break;
            case '*':
                if (this.match('*')) {
                    if (this.match('=')) this.add(T.PowerEqual);
                    else this.add(T.Power);
                } else if (this.match('=')) this.add(T.MultiplyEqual);
                else this.add(T.Multiply);
                break;
            case '/':
                if (this.match('/')) {
                    this.comment();
                    break
                } else if (this.match('=')) this.add(T.DivideEqual);
                else this.add(T.Divide);
                break;
            case '%':
                if (this.match('=')) this.add(T.ModulusEqual);
                else this.add(T.Modulus);
                break;
            case '=':
                if (this.match('=')) this.add(T.EqualEqual);
                else if (this.match('>')) this.add(T.DoubleArrow);
                else this.add(T.Equal);
                break;
            case '!':
                if (this.match('=')) this.add(T.NotEqual);
                else this.add(T.Not);
                break;
            case '>':
                if (this.match('=')) this.add(T.GreaterThanEqual);
                else if (this.match('>')) this.add(T.ShiftRight);
                else this.add(T.GreaterThan);
                break;
            case '<':
                if (this.match('=')) this.add(T.LessThanEqual);
                else if (this.match('<')) this.add(T.ShiftLeft);
                else this.add(T.LessThan);
                break;
            case '&':
                if (this.match('&')) this.add(T.And);
                else this.add(T.BitwiseAnd);
                break;
            case '|':
                if (this.match('|')) this.add(T.Or);
                else if (this.match('=')) this.add(T.PipeEqual);
                else if (this.match('>')) this.add(T.PipeLine);
                else this.add(T.Pipe);
                break;
            case '^': this.add(T.Caret); break;
            case '~': this.add(T.Tilde); break;
            case '?':
                if (this.match('?')) {
                    if (this.match('=')) this.add(T.NullishAssign);
                    else this.add(T.NullishCoalescing);
                } else if (this.match('.')) this.add(T.QuestionDot);
                else this.add(T.Question);
                break;
            case '#': this.add(T.Hash); break;
            case '@': this.add(T.At); break;
            case '$': this.add(T.Dollar); break;
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n':
                break;
            case '"':
            case "'":
            case '`':
                this.string(char);
                break;
            default:
                if (this.isDigit(char)) {
                    this.number();
                } else if (this.isAlpha(char)) {
                    this.identifier();
                } else {
                    throw new Error(`Unexpected character '${char}' at line ${this.position.line}, column ${this.position.column}`);
                }
        }
    }
    advance(): string {
        const char = this.source.charAt(this.current);
        this.position.advance(char);
        this.current++;
        return char;
    }
    add(type: T, value: string = ""): void {
        if (value === "") value = this.source.substring(this.start, this.current);
        this.tokens.push(new Token(type, value, this.position.line, this.position.column - value.length));
    }
    match(expected: string): boolean {
        if (this.isAtEnd() || this.source.charAt(this.current) !== expected) return false;
        this.current++;
        this.position.advance();
        return true;
    }
    peek(offset: number = 0): string {
        if (this.current + offset >= this.source.length) return '\0';
        return this.source.charAt(this.current + offset);
    }
    isAtEnd(): boolean {
        return this.current >= this.source.length;
    }
    isDigit(char: string): boolean {
        return char >= '0' && char <= '9';
    }
    isAlpha(char: string): boolean {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === '_';
    }
    isAlphaNumeric(char: string): boolean {
        return this.isAlpha(char) || this.isDigit(char);
    }
    comment(): void {
        while (this.peek() !== '\n' && !this.isAtEnd()) this.advance();
    }
    string(quote: string): void {
        let value = "";
        let isTemplate = quote === '`';
        let braceDepth = 0;
        while (true) {
            if (this.isAtEnd()) {
                throw new Error(`Unterminated string at line ${this.position.line}`);
            }
            const char = this.peek();
            if (!isTemplate && char === quote) break;
            if (isTemplate && char === '`' && braceDepth === 0) break;
            if (char === '\\') {
                this.advance();
                switch (this.peek()) {
                    case 'n': value += '\n'; break;
                    case 'r': value += '\r'; break;
                    case 't': value += '\t'; break;
                    case '\\': value += '\\'; break;
                    case quote: value += quote; break;
                    case '`': value += '`'; break;
                    case '$': value += '$'; break;
                    case '{': value += '{'; break;
                    case '}': value += '}'; break;
                    default:
                        throw new Error(`Invalid escape sequence at line ${this.position.line}`);
                }
                this.advance();
            } else if (isTemplate && char === '$' && this.peek(1) === '{') {
                this.add(T.TemplateLiteral, value);
                this.advance();
                this.advance();
                braceDepth++;
                this.add(T.Dollar);
                this.add(T.OpenBrace);
                value = "";
            } else if (isTemplate && char === '}') {
                braceDepth--;
                if (braceDepth < 0) {
                    throw new Error(`Unmatched closing brace in template literal at line ${this.position.line}`);
                }
                this.add(T.TemplateLiteral, value);
                this.advance();
                this.add(T.CloseBrace);
                value = "";
            } else {
                value += this.advance();
            }
        }
        this.advance();
        this.add(isTemplate ? T.TemplateLiteral : T.StringLiteral, value);
    }
    number(): void {
        while (this.isDigit(this.peek())) this.advance();
        if (this.peek() === '.' && this.isDigit(this.peek(1))) {
            this.advance();
            while (this.isDigit(this.peek())) this.advance();
            this.add(T.FloatLiteral);
        } else {
            this.add(T.IntegerLiteral);
        }
    }
    identifier(): void {
        while (this.isAlphaNumeric(this.peek())) this.advance();
        const text = this.source.substring(this.start, this.current);
        const type = KEYWORDS[text] ?? T.Identifier;
        if (type === T.BooleanLiteral) {
            this.add(type, text === 'true' ? 'true' : 'false');
        } else if (type === T.NoneLiteral) {
            this.add(type,
                'none');
        } else {
            this.add(type, text);
        }
    }
}
class VariableDeclaration extends ASTNode {
    constructor(public kind: Kind, public declarations: VariableDeclarator[]) {
        super();
    }
    static match(parser: SintacticAnalyzer) {
        const kind = parser.previous().type as Kind;
        const declarations: VariableDeclarator[] = [];
        do {
            const name = parser.eat(T.Identifier, "Expected variable name.");
            let type: DataType | undefined;
            if (parser.match(T.Colon)) {
                type = parser.typeAnnotation();
            }
            let init: Expression | undefined;
            if (parser.match(T.Equal)) {
                init = parser.expression();
            }
            declarations.push(new VariableDeclarator(new Identifier(name.value), init, type));
        } while (parser.match(T.Comma));
        return new VariableDeclaration(kind, declarations);
    }
}
class VariableDeclarator extends ASTNode {
    constructor(public id: Identifier, public init?: Expression, public type?: DataType) {
        super();
    }
}
class Identifier extends ASTNode {
    constructor(public name: string) { super(); }
}
class IntegerLiteral extends ASTNode {
    constructor(public value: number) { super(); }
}
class FloatLiteral extends ASTNode {
    constructor(public value: number) { super(); }
}
class StringLiteral extends ASTNode {
    constructor(public value: string) { super(); }
}
class BooleanLiteral extends ASTNode {
    constructor(public value: boolean) { super(); }
}
class NoneLiteral extends ASTNode {
}
class Expression extends ASTNode {
}
class BinaryExpression extends ASTNode {
    constructor(public left: Expression, public right: Expression, public operator: string) { super(); }
}
class UnaryExpression extends ASTNode {
    constructor(public operator: string, public argument: Expression) { super(); }
}
class CallExpression extends ASTNode {
    constructor(public callee: Expression, public args: Expression[]) { super(); }
}
class MemberExpression extends ASTNode {
    constructor(public object: Expression, public property: Expression, public computed: boolean) { super(); }
}
class AssignmentExpression extends ASTNode {
    constructor(public left: Expression, public right: Expression, public operator: string) { super(); }
}
class Conditional extends ASTNode {
    constructor(public test: Expression, public consequent: Expression, public alternate: Expression) { super(); }
}
class LogicalExpression extends ASTNode {
    constructor(public left: Expression, public right: Expression, public operator: string) { super(); }
}
class ArrayExpression extends ASTNode {
    constructor(public elements: Expression[]) { super(); }
}
class ObjectExpression extends ASTNode {
    constructor(public properties: Property[]) { super(); }
}
class Property extends ASTNode {
    constructor(public key: Identifier, public value: Expression) { super(); }
}
class FunctionDeclaration extends ASTNode {
    constructor(
        public id: Identifier,
        public params: ParametertDeclaration[],
        public body: BlockStatement,
        public type: DataType
    ) { super(); }
}
class ParametertDeclaration extends ASTNode {
    constructor(public id: Identifier, public type: DataType, public init: Expression) {
        super();
    }
}
class BlockStatement extends ASTNode {
    constructor(public body: ASTNode[]) { super(); }
}
class ReturnStatement extends ASTNode {
    constructor(public argument?: Expression) { super(); }
}
class IfStatement extends ASTNode {
    constructor(public test: Expression, public consequent: BlockStatement, public alternate?: IfStatement | BlockStatement) { super(); }
}
class ForStatement extends ASTNode {
    constructor(public init?: VariableDeclaration | Expression, public test?: Expression, public update?: Expression, public body?: BlockStatement) { super(); }
}
class ForInStatement extends ASTNode {
    constructor(public left: VariableDeclaration | Expression, public right: Expression, public body: BlockStatement) { super(); }
}
class ForOfStatement extends ASTNode {
    constructor(public left: VariableDeclaration | Expression, public right: Expression, public body: BlockStatement) { super(); }
}
class WhileStatement extends ASTNode {
    constructor(public test: Expression, public body: BlockStatement) { super(); }
}

class Program extends ASTNode {
    constructor(public body: ASTNode[]) { super(); }
}
class ClassBody extends ASTNode {
    constructor(public body: (ClassMethod | ClassProperty)[]) { super(); }
}
class ClassDeclaration extends ASTNode {
    constructor(public id: Identifier, public body: ClassBody) { super(); }
}
class ClassMethod extends ASTNode {
    constructor(public key: Identifier, public params: ParametertDeclaration[], public body: BlockStatement) { super(); }
}
class ClassProperty extends ASTNode {
    constructor(public key: Identifier, public type: DataType, public value?: Expression) { super(); }
}
class SintacticAnalyzer {
    tokens: Token[];
    current: number = 0;
    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }
    parse(): Program {
        const statements: ASTNode[] = [];
        while (!this.isAtEnd()) {
            const stmt = this.declaration();
            if (stmt) statements.push(stmt);
        }
        return new Program(statements);
    }
    visit(node: ASTNode, n: number = 0): void {
        node.print(n);
        for (const key of Object.keys(node)) {
            const value = (node as any)[key];
            if (value instanceof ASTNode) {
                this.visit(value, n + 1);
            } else if (Array.isArray(value)) {
                for (const element of value) {
                    if (element instanceof ASTNode) {
                        this.visit(element, n + 1);
                    }
                }
            }
        }
    }
    print(): void {
        const ast = this.parse();
        this.visit(ast);
    }
    declaration(): ASTNode | null {
        if (this.match(T.Let, T.Const, T.Var)) return VariableDeclaration.match(this);
        if (this.match(T.Function)) return this.functionDeclaration();
        if (this.match(T.Class)) return this.classDeclaration();
        return this.statement();
    }
    functionDeclaration(): FunctionDeclaration {
        const name = this.eat(T.Identifier, "Expected function name.");
        this.eat(T.OpenParen, "Expected '(' after function name.");
        const parameters: ParametertDeclaration[] = [];
        if (!this.check(T.CloseParen)) {
            do {
                let type: DataType = T.None
                let idRaw = this.eat(T.Identifier, "Se esperaba el nombre del parametro");
                if (this.match(T.Colon)) {
                    type = this.typeAnnotation();
                }
                let init: Expression | undefined;
                if (this.match(T.Equal)) {
                    init = this.expression();
                }
                let id = new Identifier(idRaw.value)
                parameters.push(
                    new ParametertDeclaration(id, type, init!)
                )
            } while (this.match(T.Comma));
        }
        this.eat(T.CloseParen, "Expected ')' after parameters.");
        this.eat(T.Colon, "Se esperaba notacion de tipo de retorno");
        let type = this.typeAnnotation()
        this.eat(T.OpenBrace, "Expected '{' before function body.");
        const body = this.blockStatement();
        return new FunctionDeclaration(new Identifier(name.value), parameters, body, type);
    }
    classDeclaration(): ClassDeclaration {
        const name = this.eat(T.Identifier, "Expected class name.");
        this.eat(T.OpenBrace, "Expected '{' before class body.");
        const methods: ClassMethod[] = [];
        const properties: ClassProperty[] = [];
        while (!this.check(T.CloseBrace) && !this.isAtEnd()) {
            const name = this.eat(T.Identifier, "Expected variable name.");
            let type: DataType | undefined;
            let id = new Identifier(name.value)
            if (this.match(T.OpenParen)) {
                const parameters: ParametertDeclaration[] = [];
                if (!parser.check(T.CloseParen)) {
                    do {
                        let idRaw = this.eat(T.Identifier, "Se esperaba el nombre del parametro");
                        if (this.match(T.Colon)) {
                            type = this.typeAnnotation();
                        }
                        let init: Expression | undefined;
                        if (this.match(T.Equal)) {
                            init = this.expression();
                        }
                        let id = new Identifier(idRaw.value)
                        parameters.push(
                            new ParametertDeclaration(id, type!, init!)
                        )
                    } while (parser.match(T.Comma));
                }
                parser.eat(T.CloseParen, "Expected ')' after parameters.");
                parser.eat(T.OpenBrace, "Expected '{' before function body.");
                const body = parser.blockStatement();
                methods.push(new ClassMethod(id, parameters, body))
            } else {
                if (this.match(T.Colon)) {
                    type = this.typeAnnotation();
                }
                let init: Expression | undefined;
                if (this.match(T.Equal)) {
                    init = this.expression();
                }
                properties.push(new ClassProperty(id, type!, init));
            }
        }
        this.eat(T.CloseBrace, "Expected '}' after class body.");
        return new ClassDeclaration(new Identifier(name.value), new ClassBody([...methods, ...properties]));
    }
    typeAnnotation(): DataType {
        const typeMap: Map<T, DataType> = new Map([
            [T.Str, T.Str],
            [T.Int, T.Int],
            [T.Float, T.Float],
            [T.Bool, T.Bool],
            [T.List, T.List],
            [T.Object, T.Object],
            [T.None, T.None],
        ]);
        const type = this.advance();
        if (this.match(T.OpenBracket)) {
            this.eat(T.CloseBracket, "Se esperaba ]")
        }
        return typeMap.get(type.type)!;
    }
    statement(): ASTNode {
        if (this.match(T.If)) return this.ifStatement();
        if (this.match(T.For)) return this.forStatement();
        if (this.match(T.While)) return this.whileStatement();
        if (this.match(T.Return)) return this.returnStatement();
        if (this.match(T.OpenBrace)) return this.blockStatement();
        return this.expression();
    }
    ifStatement(): IfStatement {
        this.eat(T.OpenParen, "Expected '(' after 'if'.");
        const condition = this.expression();
        this.eat(T.CloseParen, "Expected ')' after if condition.");
        const thenBranch = this.statement() as BlockStatement;
        let elseBranch: IfStatement | BlockStatement | undefined;
        if (this.match(T.Else)) {
            elseBranch = this.match(T.If) ? this.ifStatement() : this.statement() as BlockStatement;
        }
        return new IfStatement(condition, thenBranch, elseBranch);
    }
    forStatement(): ASTNode {
        this.eat(T.OpenParen, "Expected '(' after 'for'.");
        let initializer: VariableDeclaration | Expression | undefined;
        if (this.match(T.Semicolon)) {
            initializer = undefined;
        } else if (this.match(T.Let, T.Const, T.Var)) {
            initializer = VariableDeclaration.match(this);
        } else {
            initializer = this.expression();
        }
        if (this.match(T.In)) {
            const right = this.expression();
            this.eat(T.CloseParen, "Expected ')' after for-in clause.");
            const body = this.statement() as BlockStatement;
            return new ForInStatement(initializer!, right, body);
        }
        if (this.match(T.Of)) {
            const right = this.expression();
            this.eat(T.CloseParen, "Expected ')' after for-of clause.");
            const body = this.statement() as BlockStatement;
            return new ForOfStatement(initializer!, right, body);
        }
        let condition: Expression | undefined = undefined;
        this.eat(T.Semicolon, "Se esperaba ; despues de la declaracion del iterador")
        if (!this.check(T.Semicolon)) {
            condition = this.expression();
        }
        this.eat(T.Semicolon, "Expected ';' after loop condition.");
        let update: Expression | undefined = undefined;
        if (!this.check(T.CloseParen)) {
            update = this.expression();
        }
        this.eat(T.CloseParen, "Se esperaba ')' despues de la expresion update");
        const body = this.statement() as BlockStatement;
        return new ForStatement(initializer, condition, update, body);
    }
    whileStatement(): WhileStatement {
        this.eat(T.OpenParen, "Expected '(' after 'while'.");
        const condition = this.expression();
        this.eat(T.CloseParen, "Expected ')' after condition.");
        const body = this.statement() as BlockStatement;
        return new WhileStatement(condition, body);
    }
    returnStatement(): ReturnStatement {
        let value: Expression | undefined;
        if (!this.check(T.Semicolon)) {
            value = this.expression();
        }
        return new ReturnStatement(value);
    }
    blockStatement(): BlockStatement {
        const statements: ASTNode[] = [];
        while (!this.check(T.CloseBrace) && !this.isAtEnd()) {
            statements.push(this.declaration()!);
        }
        this.eat(T.CloseBrace, "Expected '}'.");
        return new BlockStatement(statements);
    }
    expression(): Expression {
        return this.assignment();
    }
    assignment(): Expression {
        const expr = this.ternary();
        if (this.match(T.Equal, T.PlusEqual, T.MinusEqual, T.MultiplyEqual, T.DivideEqual, T.ModulusEqual, T.PowerEqual)) {
            const operator = this.previous().value;
            const right = this.assignment();
            if (expr instanceof Identifier || expr instanceof MemberExpression) {
                return new AssignmentExpression(expr, right, operator);
            } else {
                throw this.error(this.previous(), "Invalid assignment target.");
            }
        }
        if (this.match(T.Increment, T.Decrement)) {
            const operator = this.previous().value;
            if (expr instanceof Identifier || expr instanceof MemberExpression) {
                return new UnaryExpression(operator, expr);
            } else {
                throw this.error(this.previous(), "Invalid increment/decrement target.");
            }
        }
        return expr;
    }
    ternary(): Expression {
        let expr = this.logicalOr();
        if (this.match(T.Question)) {
            const consequent = this.expression();
            this.eat(T.Colon, "Expected ':' after ternary consequent.");
            const alternate = this.ternary();
            expr = new Conditional(expr, consequent, alternate);
        }
        return expr;
    }
    logicalOr(): Expression {
        let expr = this.logicalAnd();
        while (this.match(T.Or, T.NullishCoalescing)) {
            const operator = this.previous().value;
            const right = this.logicalAnd();
            expr = new LogicalExpression(expr, right, operator);
        }
        return expr;
    }
    logicalAnd(): Expression {
        let expr = this.bitwise();
        while (this.match(T.And)) {
            const operator = this.previous().value;
            const right = this.bitwise();
            expr = new LogicalExpression(expr, right, operator);
        }
        return expr;
    }
    bitwise(): Expression {
        let expr = this.equality();
        while (this.match(T.BitwiseAnd, T.Pipe, T.Caret)) {
            const operator = this.previous().value;
            const right = this.equality();
            expr = new BinaryExpression(expr, right, operator);
        }
        return expr;
    }
    equality(): Expression {
        let expr = this.comparison();
        while (this.match(T.EqualEqual, T.NotEqual)) {
            const operator = this.previous().value;
            const right = this.comparison();
            expr = new BinaryExpression(expr, right, operator);
        }
        return expr;
    }
    comparison(): Expression {
        let expr = this.shift();
        while (this.match(T.LessThan, T.LessThanEqual, T.GreaterThan, T.GreaterThanEqual)) {
            const operator = this.previous().value;
            const right = this.shift();
            expr = new BinaryExpression(expr, right, operator);
        }
        return expr;
    }
    shift(): Expression {
        let expr = this.addition();
        while (this.match(T.ShiftLeft, T.ShiftRight)) {
            const operator = this.previous().value;
            const right = this.addition();
            expr = new BinaryExpression(expr, right, operator);
        }
        return expr;
    }
    addition(): Expression {
        let expr = this.multiplication();
        while (this.match(T.Plus, T.Minus)) {
            const operator = this.previous().value;
            const right = this.multiplication();
            expr = new BinaryExpression(expr, right, operator);
        }
        return expr;
    }
    multiplication(): Expression {
        let expr = this.unary();
        while (this.match(T.Multiply, T.Divide, T.Modulus)) {
            const operator = this.previous().value;
            const right = this.unary();
            expr = new BinaryExpression(expr, right, operator);
        }
        return expr;
    }
    unary(): Expression {
        if (this.match(T.Not, T.Minus, T.Tilde, T.Increment, T.Decrement)) {
            const operator = this.previous().value;
            const right = this.unary();
            return new UnaryExpression(operator, right);
        }
        return this.power();
    }
    power(): Expression {
        let expr = this.call();
        if (this.match(T.Power)) {
            const operator = this.previous().value;
            const right = this.unary();
            expr = new BinaryExpression(expr, right, operator);
        }
        return expr;
    }
    call(): Expression {
        let expr = this.primary();
        while (true) {
            if (this.match(T.OpenParen)) {
                expr = this.finishCall(expr);
            } else if (this.match(T.OpenBracket)) {
                const index = this.expression();
                this.eat(T.CloseBracket, "Expected ']' after index.");
                expr = new MemberExpression(expr, index, true);
            } else if (this.match(T.Dot)) {
                const property = this.eat(T.Identifier, "Expected property name after '.'.");
                expr = new MemberExpression(expr, new Identifier(property.value), false);
            } else {
                break;
            }
        }
        return expr;
    }
    finishCall(callee: Expression): CallExpression {
        const args = this.parseCommaSeparatedList(() => this.expression(), T.CloseParen);
        return new CallExpression(callee, args);
    }
    primary(): Expression {
        if (this.match(T.True)) return new BooleanLiteral(true);
        if (this.match(T.False)) return new BooleanLiteral(false);
        if (this.match(T.None)) return new NoneLiteral();
        if (this.match(T.IntegerLiteral)) {
            const value = parseInt(this.previous().value);
            return new IntegerLiteral(value);
        }
        if (this.match(T.BooleanLiteral)) {
            const value = this.previous().value === 'true';
            return new BooleanLiteral(value);
        }
        if (this.match(T.FloatLiteral)) {
            const value = parseFloat(this.previous().value);
            return new FloatLiteral(value);
        }
        if (this.match(T.StringLiteral, T.TemplateLiteral)) {
            const value = this.previous().value;
            return new StringLiteral(value);
        }
        if (this.match(T.Identifier)) {
            return new Identifier(this.previous().value);
        }
        if (this.match(T.OpenParen)) {
            const expr = this.expression();
            this.eat(T.CloseParen, "Expected ')' after expression.");
            return expr;
        }
        if (this.match(T.OpenBracket)) {
            const elements = this.parseCommaSeparatedList(() => this.expression(), T.CloseBracket);
            return new ArrayExpression(elements);
        }
        if (this.match(T.OpenBrace)) {
            const properties = this.parseCommaSeparatedList(() => {
                const key = this.eat(T.Identifier, "Expected property name.");
                this.eat(T.Colon, "Expected ':' after property name.");
                const value = this.expression();
                return new Property(new Identifier(key.value), value);
            }, T.CloseBrace);
            return new ObjectExpression(properties);
        }
        throw this.error(this.peek(), "Expected expression.");
    }
    parseCommaSeparatedList<T>(parseItem: () => T, endToken: any): T[] {
        const items: T[] = [];
        if (!this.check(endToken)) {
            do {
                items.push(parseItem());
            } while (this.match(T.Comma));
        }
        this.eat(endToken, `Expected '${T[endToken]}' after list.`);
        return items;
    }
    match(...types: T[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }
    check(type: T): boolean {
        if (this.isAtEnd()) return false;
        return this.peek().type === type;
    }
    advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }
    isAtEnd(): boolean {
        return this.peek().type === T.EOF;
    }
    peek(offset: number = 0): Token {
        if (this.current + offset >= this.tokens.length) return this.tokens[this.tokens.length - 1];
        return this.tokens[this.current + offset];
    }
    previous(): Token {
        return this.tokens[this.current - 1];
    }
    eat(type: T, message: string): Token {
        if (this.check(type)) return this.advance();
        throw this.error(this.peek(), message, type);
    }
    error(token: Token, message: string, expectedType?: T): Error {
        const line = token.line;
        const column = token.column;
        const value = token.value;
        const previous = this.previous().value;
        const next = this.peek().value;
        const expected = T[expectedType!];
        const got = T[token.type];
        return new Error(
            `Error at line ${line}, column ${column}: ${message}\n` +
            `  Previous: ${previous}\n` +
            `  Current: ${value}\n` +
            `  Next: ${next}\n` +
            `  Expected: ${expected} but got ${got}`
        );
    }
    stringLiteral(): StringLiteral {
        const value = this.eat(T.StringLiteral, "Expected string literal.");
        return new StringLiteral(value.value);
    }
}
class SymbolTable {
    symbols: Map<string, DataType> = new Map();
    constructor(public parent?: SymbolTable) { }
    define(name: string, type: DataType): void {
        this.symbols.set(name, type);
    }
    lookup(name: string): DataType | undefined {
        const type = this.symbols.get(name);
        if (type) return type;
        if (this.parent) return this.parent.lookup(name);
        return undefined;
    }
}
const path = Bun.argv[2];
const file = Bun.file(path);
const source = await file.text()
const lexer = new LexicalAnalyzer(source);
const tokens = lexer.tokenize();
const parser = new SintacticAnalyzer(tokens);
parser.print();
export { };
