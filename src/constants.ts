export const RESERVED_WORDS = {
  "var": "variable_declaration",
  "let": "variable_declaration",
  "const": "constant_declaration",
} as const;

export const BUILD_IN_TYPES = {
  "str": "string_type",
  "int": "integer_type",
  "float": "float_type",
  "bool": "boolean_type",
  "char": "character_type",
  "list": "list_type",
} as const;

export const KEYWORDS = {
  ...BUILD_IN_TYPES,
  ...RESERVED_WORDS,
} as const;

export const OPERATORS = {
  "+": "addition",
  "-": "subtraction",
  "*": "multiplication",
  "/": "division",
  "%": "modulo",
  "==": "equality",
  "!=": "inequality",
  ">": "greater_than",
  "<": "less_than",
  ">=": "greater_than_or_equal",
  "<=": "less_than_or_equal",
  "&&": "logical_and",
  "||": "logical_or",
  "!": "logical_not",
  "++": "increment",
  "--": "decrement",
  "=": "assignment",
} as const;

export const SYMBOLS = {
  "(": "open_parenthesis",
  ")": "close_parenthesis",
  "{": "open_brace",
  "}": "close_brace",
  "[": "open_bracket",
  "]": "close_bracket",
  ";": "semicolon",
  ",": "comma",
  ".": "dot",
  ":": "colon",
  "?": "ternary_operator",
  "->": "arrow",
} as const;

export const TOKENS = {
  ...KEYWORDS,
  ...OPERATORS,
  ...SYMBOLS,
} as const;

export type EspecialToken = "string" | "number" | "identifier";

export type TokenKey = keyof typeof TOKENS;
export type TokenValue = typeof TOKENS[TokenKey] | EspecialToken;
export type TokenType =
  | "string"
  | "number"
  | "type"
  | "keyword"
  | "operator"
  | "symbol"
  | "identifier";

export const REGEXES = {
  STRING: /["'`]/g,
  NUMBER: /[0-9]/g,
  IDENTIFIER: /[a-zA-Z_]/g,
  SYMBOLS_AND_OPERATORS: /[(){}\[\];,.:?\-+*/%=&|!]/g,
  WHITESPACE: /\s/g,
  NEWLINE: /\r?\n/g,
} as const;
