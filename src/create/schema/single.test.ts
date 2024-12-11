import "../../entries/extend";
import { describe, expect, it } from "bun:test";
import { z } from "zod";
import { type SchemaResult, createSchema } from "./single";

describe("createSchema", () => {
  it("should create a schema", () => {
    const schema = createSchema(z.string().openapi({ description: "foo" }));

    expect(schema).toEqual({
      schema: {
        type: "string",
        description: "foo",
      },
    });
  });

  it("should create a registered schema", () => {
    const schema = createSchema(z.string().openapi({ description: "foo", ref: "String" }));

    expect(schema).toEqual({
      schema: {
        $ref: "#/components/schemas/String",
      },
      components: {
        String: {
          type: "string",
          description: "foo",
        },
      },
    });
  });

  it("should create components", () => {
    const schema = createSchema(
      z.object({
        foo: z.string().openapi({ description: "foo", ref: "foo" }),
      }),
    );

    expect(schema).toEqual({
      schema: {
        type: "object",
        properties: {
          foo: {
            $ref: "#/components/schemas/foo",
          },
        },
        required: ["foo"],
      },
      components: {
        foo: {
          type: "string",
          description: "foo",
        },
      },
    });
  });

  it("should support componentRefPath", () => {
    const schema = createSchema(z.string().openapi({ description: "foo", ref: "String" }), {
      componentRefPath: "#/definitions/",
    });

    expect(schema).toEqual({
      schema: {
        $ref: "#/definitions/String",
      },
      components: {
        String: {
          type: "string",
          description: "foo",
        },
      },
    });
  });
});