import { assertEquals } from "@std/assert";
import { innerPrompt } from "./prompt.ts";
import { createTester } from "./testUtils.ts";
import { Keys } from "./utils.ts";

Deno.test("should render", () => {
  const tester = createTester(innerPrompt({
    message: "Some question?",
  }));

  assertEquals(tester.getText(), "Some question? \u2588");
  assertEquals(tester.onKey("A"), undefined);
  assertEquals(tester.onKey("b"), undefined);
  assertEquals(tester.getText(), "Some question? Ab\u2588");
  assertEquals(tester.onKey(Keys.Backspace), undefined);
  assertEquals(tester.getText(), "Some question? A\u2588");
  assertEquals(tester.onKey("c"), undefined);
  assertEquals(tester.getText(), "Some question? Ac\u2588");
  assertEquals(tester.onKey(Keys.Space), undefined);
  assertEquals(tester.onKey("d"), undefined);
  assertEquals(tester.getText(), "Some question? Ac d\u2588");
  assertEquals(tester.onKey(Keys.Enter), "Ac d");
  assertEquals(tester.getText(), "Some question? Ac d");
});

Deno.test("should render with default", () => {
  const tester = createTester(innerPrompt({
    message: "Some question?",
    default: "test",
  }));

  assertEquals(tester.getText(), "Some question? test\u2588");
});

Deno.test("should render with mask", () => {
  const tester = createTester(innerPrompt({
    message: "Some question?",
    default: "test",
    mask: true,
  }));

  assertEquals(tester.getText(), "Some question? ****\u2588");
});

Deno.test("should render with custom mask", () => {
  const tester = createTester(innerPrompt({
    message: "Some question?",
    default: "test",
    mask: {
      char: "🦕",
      lastVisible: true,
    },
  }));

  assertEquals(tester.getText(), "Some question? 🦕🦕🦕t\u2588");
});

Deno.test("should render mask all chars after complete and 'noClear' set", () => {
  const tester = createTester(innerPrompt({
    message: "Some question?",
    default: "test",
    noClear: true,
    mask: {
      lastVisible: true,
    },
  }));

  tester.onKey(Keys.Enter);

  assertEquals(tester.getText(), "Some question? ****");
});
