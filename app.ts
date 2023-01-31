import { Lexer } from "./src/lexer.ts";
import { resolve } from "https://deno.land/std@0.170.0/path/mod.ts";

const cwd = Deno.cwd();

const files = [
  resolve(cwd, "examples", "variables.riot"),
];

for (const file of files) {
  const source = await Deno.readTextFile(file);
  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();
  console.table(tokens);
}
