import { SemanticAnalizer } from "./src/analizer.ts";
import { LexicalAnalyzer } from "./src/lexer.ts";
import { SintacticAnalyzer } from "./src/parser.ts";
import { T } from "./src/shared.ts";

const path = Bun.argv[2];
const file = Bun.file(path);
const source = await file.text()

const lexer = new LexicalAnalyzer(source);
const tokens = lexer.tokenize();
const parser = new SintacticAnalyzer(tokens);
const ast = parser.parse();
const semantic = new SemanticAnalizer(ast);
semantic.analyze();


// console.table(tokens.map(t => ({ ...t, type: T[t.type] })))
// console.dir(ast, { depth: null });

export { };