class AstNode {
  constructor (public type: string, public value: string | number, public children: AstNode[] = []) { }
}

class Parser {
  private tokens: Array<{ value: string | number, type: string }>
  private current: number

  constructor (tokens: Array<{ value: string | number, type: string }>) {
    this.tokens = tokens
    this.current = 0
  }

  private getCurrentToken () {
    return this.tokens[this.current]
  }

  private consume (type: string) {
    const token = this.getCurrentToken()
    if (token.type === type) {
      this.current++
      return token
    } else {
      throw new Error(`Expected token of type "${type}" but got "${token.type}"`)
    }
  }

  private parseAssignment () {
    this.consume('variable')
    const name = this.consume('identifier')
    this.consume('semicolon')
    const dataType = this.consume('data_type')
    this.consume('assign_operator')
    const value = this.consume('number')
    return new AstNode(
      'AssignmentExpression',
      '=',
      [
        new AstNode('VariableDeclaration', 'var', [
          new AstNode('Identifier', name.value),
        ]),
        new AstNode('DataType', dataType.value),
        new AstNode('NumberLiteral', value.value),
      ],
    )
  }

  parse () {
    const assignment = this.parseAssignment()
    return new AstNode('Program', 'Program', [assignment])
  }
}

const tokens = [
  { value: 'var', type: 'variable' },
  { value: 'age', type: 'identifier' },
  { value: ':', type: 'semicolon' },
  { value: 'int', type: 'data_type' },
  { value: '=', type: 'assign_operator' },
  { value: 18, type: 'number' }
]

const parser = new Parser(tokens)
const ast = parser.parse()
console.log(ast.children)
