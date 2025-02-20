import { assertEquals } from "https://esm.sh/jsr/@std/assert@1";
import { escapeArg } from "./command.ts";

Deno.test("escapes arg", () => {
  assertEquals(escapeArg("hello"), "hello");
  assertEquals(escapeArg(""), "''");
  assertEquals(escapeArg("'abc'"), `''"'"'abc'"'"''`);
});
