import { assertEquals, assertThrows } from "https://esm.sh/jsr/@std/assert@1";
import { parseCatArgs } from "./cat.ts";

Deno.test("test cat parse args", () => {
  assertEquals(parseCatArgs([]), {
    paths: ["-"],
  });
  assertEquals(parseCatArgs(["path"]), {
    paths: ["path"],
  });
  assertEquals(parseCatArgs(["path", "-"]), {
    paths: ["path", "-"],
  });
  assertEquals(parseCatArgs(["path", "other-path"]), {
    paths: ["path", "other-path"],
  });
  assertThrows(
    () => parseCatArgs(["--flag"]),
    Error,
    "unsupported flag: --flag",
  );
  assertThrows(
    () => parseCatArgs(["-t"]),
    Error,
    "unsupported flag: -t",
  );
});
