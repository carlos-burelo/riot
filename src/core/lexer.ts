class Token {
  constructor(public type: string, public value: string) {}
}

class Lexer {
  private input: string;
  private position: number;
  private currentChar: string | null;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.currentChar = input.charAt(0);
  }

  private advance() {
    this.position++;
    this.currentChar = this.position < this.input.length ? this.input.charAt(this.position) : null;
  }

  private skipWhitespace() {
    while (this.currentChar !== null && /\s/.test(this.currentChar)) {
      this.advance();
    }
  }

  private isAlphaNumeric(char: string | null) {
    return /[a-zA-Z0-9_]/.test(char || "");
  }

  private isDigit(char: string | null) {
    return /\d/.test(char || "");
  }

  private getNextToken(): Token | null {
    while (this.currentChar !== null) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      if (this.isAlphaNumeric(this.currentChar)) {
        let value = "";
        while (this.isAlphaNumeric(this.currentChar)) {
          value += this.currentChar;
          this.advance();
        }

        // Check if the identifier is a keyword
        const keywords = ["break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete",
          "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if", "import",
          "in", "instanceof", "new", "null", "return", "super", "switch", "this", "throw", "true", "try",
          "typeof", "undefined", "var", "void", "while", "with"];
        const type = keywords.includes(value) ? value.toUpperCase() : "IDENTIFIER";
        return new Token(type, value);
      }

      if (this.isDigit(this.currentChar) || (this.currentChar === "." && this.isDigit(this.input[this.position + 1]))) {
        let number = "";
        while (this.isDigit(this.currentChar) || this.currentChar === ".") {
          number += this.currentChar;
          this.advance();
        }
        return new Token("NUMBER", number);
      }

      if (this.currentChar === ";") {
        this.advance();
        return new Token("SEMICOLON", ";");
      }

      if (this.currentChar === "{") {
        this.advance();
        return new Token("LEFT_BRACE", "{");
      }

      if (this.currentChar === "}") {
        this.advance();
        return new Token("RIGHT_BRACE", "}");
      }

      if (this.currentChar === "(") {
        this.advance();
        return new Token("LEFT_PAREN", "(");
      }

      if (this.currentChar === ")") {
        this.advance();
        return new Token("RIGHT_PAREN", ")");
      }

      if (this.currentChar === "[") {
        this.advance();
        return new Token("LEFT_BRACKET", "[");
      }

      if (this.currentChar === "]") {
        this.advance();
        return new Token("RIGHT_BRACKET", "]");
      }

      if (this.currentChar === ",") {
        this.advance();
        return new Token("COMMA", ",");
      }

      if (this.currentChar === ".") {
        this.advance();
        return new Token("DOT", ".");
      }

      if (this.currentChar === "+") {
        this.advance();
        return new Token("PLUS", "+");
      }

      if (this.currentChar === "-") {
        this.advance();
        return new Token("MINUS", "-");
      }

      if (this.currentChar === "*") {
        this.advance();
        return new Token("ASTERISK", "*");
      }

      if (this.currentChar === "/") {
        this.advance();
        return new Token("SLASH", "/");
      }

      if (this.currentChar === "%") {
        this.advance();
        return new Token("PERCENT", "%");
      }

      if (this.currentChar === "=") {
        if (this.input[this.position + 1] === "=") {
          this.advance();
          this.advance();
          return new Token("EQUAL_EQUAL", "==");
        } else {
          this.advance();
          return new Token("EQUAL", "=");
        }
      }

      if (this.currentChar === "!") {
        if (this.input[this.position + 1] === "=") {
          this.advance();
          this.advance();
          return new Token("NOT_EQUAL", "!=");
        } else {
          this.advance();
          return new Token("NOT", "!");
        }
      }

      if (this.currentChar === ">") {
        if (this.input[this.position + 1] === "=") {
          this.advance();
          this.advance();
          return new Token("GREATER_EQUAL", ">=");
        } else {
          this.advance();
          return new Token("GREATER", ">");
        }
      }

      if (this.currentChar === "<") {
        if (this.input[this.position + 1] === "=") {
          this.advance();
          this.advance();
          return new Token("LESS_EQUAL", "<=");
        } else {
          this.advance();
          return new Token("LESS", "<");
        }
      }

      if (this.currentChar === "&" && this.input[this.position + 1] === "&") {
        this.advance();
        this.advance();
        return new Token("AND", "&&");
      }

      if (this.currentChar === "|" && this.input[this.position + 1] === "|") {
        this.advance();
        this.advance();
        return new Token("OR", "||");
      }

      if (this.currentChar === "?") {
        this.advance();
        return new Token("QUESTION_MARK", "?");
      }

      if (this.currentChar === ":") {
        this.advance();
        return new Token("COLON", ":");
      }

      if (this.currentChar === "'") {
        let stringLiteral = "";
        this.advance();
        while (this.currentChar !== "'" && this.currentChar !== null) {
          stringLiteral += this.currentChar;
          this.advance();
        }
        if (this.currentChar === "'") {
          this.advance();
          return new Token("STRING", stringLiteral);
        } else {
          throw new Error("Unterminated string literal");
        }
      }

      if (this.currentChar === "\"") {
        let stringLiteral = "";
        this.advance();
        while (this.currentChar !== "\"" && this.currentChar !== null) {
          stringLiteral += this.currentChar;
          this.advance();
        }
        if (this.currentChar === "\"") {
          this.advance();
          return new Token("STRING", stringLiteral);
        } else {
          throw new Error("Unterminated string literal");
        }
      }

      throw new Error(`Invalid character: ${this.currentChar}`);
    }

    // Handle end of input
    return null;
  }

  public tokenize(): Token[] {
    const tokens: Token[] = [];

    let token = this.getNextToken();
    while (token !== null) {
      tokens.push(token);
      token = this.getNextToken();
    }

    return tokens;
  }
}

// Example usage
const code = `
  function add(a: number, b: number): number {
    return a + b;
  }

  let x = 42;
  let y = "Hello, world!";
  if (x > 0) {
    console.log(y);
  } else {
    console.log("x is not positive");
  }
`;

const lexer = new Lexer(code);
const tokens = lexer.tokenize();

console.log(tokens);
