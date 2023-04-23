import Lexer from './lexer.ts'

const lexer = new Lexer(`var num: int = 10
const float_num: float = 10.5
const name: str = 'Riot'
const is_true: bool = true
const char: char = "a"
var nothing: none = none
const arr: int[] = [1, 2, 3, 4, 5]`
)

let token = lexer.getNextToken()
while (token.type !== 'EOF') {
  console.log(token)
  token = lexer.getNextToken()
}