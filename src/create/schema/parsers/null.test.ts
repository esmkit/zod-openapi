import type { Schema } from "..";

import { describe, expect, it } from "bun:test";
import { createNullSchema } from "./null";
describe("createNullSchema", () => {
  it("creates a null schema", () => {
    const expected: Schema = {
      type: "schema",
      schema: {
        type: "null",
      },
    };

    const result = createNullSchema();

    expect(result).toEqual(expected);
  });
});
