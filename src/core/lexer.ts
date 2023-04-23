const RESERVED_WORDS = ['var', 'const', 'int', 'float', 'str', 'bool', 'char', 'none']

class Token {
  type: string
  value: any

  constructor (type: string, value: any) {
    this.type = type
    this.value = value
  }
}

class Lexer {
  text: string
  position: number
  currentChar: string | null

  constructor (text: string) {
    this.text = text
    this.position = 0
    this.currentChar = this.text[this.position]
  }

  advance () {
    this.position += 1
    if (this.position > this.text.length - 1) {
      this.currentChar = null
    } else {
      this.currentChar = this.text[this.position]
    }
  }

  skipWhitespace () {
    while (this.currentChar !== null && /\s/.test(this.currentChar)) {
      this.advance()
    }
  }

  skipComment () {
    while (this.currentChar !== '\n') {
      this.advance()
    }
    this.advance()
  }

  integer () {
    let result = ''
    while (this.currentChar !== null && /[0-9]/.test(this.currentChar)) {
      result += this.currentChar
      this.advance()
    }
    return parseInt(result)
  }

  string () {
    let result = ''
    const quoteType = this.currentChar
    this.advance()
    while (this.currentChar !== null && this.currentChar !== quoteType) {
      result += this.currentChar
      this.advance()
    }
    this.advance()
    return result
  }

  identifier () {
    let result = ''
    while (this.currentChar !== null && /[a-zA-Z_]/.test(this.currentChar)) {
      result += this.currentChar
      this.advance()
    }
    if (RESERVED_WORDS.includes(result)) {
      return new Token(result.toUpperCase(), result)
    }
    return new Token('IDENTIFIER', result)
  }

  getNextToken () {
    while (this.currentChar !== null) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace()
        continue
      }
      if (this.currentChar === '#') {
        this.skipComment()
        continue
      }
      if (/\d/.test(this.currentChar)) {
        return new Token('INTEGER', this.integer())
      }
      if (/'|"/.test(this.currentChar)) {
        return new Token('STRING', this.string())
      }
      if (/[a-zA-Z_]/.test(this.currentChar)) {
        return this.identifier()
      }
      if (/[+\-*/%=(),\[\]]/.test(this.currentChar)) {
        const token = new Token(this.currentChar, this.currentChar)
        this.advance()
        return token
      }
      throw new Error(`Invalid character: ${this.currentChar}`)
    }
    return new Token('EOF', null)
  }
}

export default Lexer