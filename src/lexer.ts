import { KEYWORDS, REGEXES, TOKENS } from "./constants.ts";
import { TokenType, TokenValue } from "./constants.ts";

class Token {
  constructor(
    public type: TokenType,
    public is: TokenValue,
    public value: string,
  ) {}
}

export class Lexer {
  #source: string;
  #tokens: Token[] = [];
  #char = 0;

  constructor(source: string) {
    this.#source = source;
  }

  tokenize(): Token[] {
    while (this.#char < this.#source.length) {
      const char = this.#source[this.#char];

      if (char === " ") {
        this.#char++;
        continue;
      }

      if (char === "\r" || char === "\t") {
        this.#char++;
        continue;
      }

      if (char === "\n") {
        this.#char++;
        continue;
      }
      if (char.match(REGEXES.SYMBOLS_AND_OPERATORS)) {
        this.#tokens.push(this.#symbol());
        continue;
      }

      if (char === '"') {
        this.#tokens.push(this.#string());
        continue;
      }

      if (char === "'") {
        this.#tokens.push(this.#string());
        continue;
      }

      if (char === "`") {
        this.#tokens.push(this.#string());
        continue;
      }

      if (char.match(REGEXES.NUMBER)) {
        this.#tokens.push(this.#number());
        continue;
      }

      if (char.match(REGEXES.IDENTIFIER)) {
        this.#tokens.push(this.#identifier());
        continue;
      }

      throw new Error(`Unexpected character: ${char}`);
    }

    return this.#tokens;
  }

  #string(): Token {
    let value = "";
    const char = this.#source[this.#char];
    this.#char++;

    while (this.#source[this.#char] !== char) {
      value += this.#source[this.#char];
      this.#char++;
    }

    this.#char++;

    return new Token("string", "string", value);
  }

  #number(): Token {
    let value = "";
    while (this.#source[this.#char].match(REGEXES.NUMBER)) {
      value += this.#source[this.#char];
      this.#char++;
    }

    return new Token("number", "number", value);
  }

  #identifier(): Token {
    let value = "" as keyof typeof KEYWORDS;
    while (this.#source[this.#char].match(REGEXES.IDENTIFIER)) {
      value += this.#source[this.#char];
      this.#char++;
    }

    if (KEYWORDS[value]) {
      return new Token("keyword", KEYWORDS[value], value);
    } else {
      return new Token("identifier", "identifier", value);
    }
  }

  #symbol(): Token {
    let value = "";
    while (this.#source[this.#char].match(REGEXES.SYMBOLS_AND_OPERATORS)) {
      value += this.#source[this.#char];
      this.#char++;
    }

    return new Token("symbol", TOKENS[value], value);
  }
}
