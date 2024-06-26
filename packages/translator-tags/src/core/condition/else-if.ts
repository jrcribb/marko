import { type Tag, assertNoParams, assertNoVar } from "@marko/babel-utils";
import { types as t } from "@marko/compiler";
import { analyze, translate } from "./if";

export default {
  analyze,
  translate: {
    enter(tag) {
      const { node } = tag;
      const [valueAttr] = node.attributes;

      assertNoVar(tag);
      assertNoParams(tag);

      if (!t.isMarkoAttribute(valueAttr) || !valueAttr.default) {
        throw tag
          .get("name")
          .buildCodeFrameError(
            `The '<else-if>' tag requires a default attribute like '<else-if=condition>'.`,
          );
      }

      if (node.attributes.length > 1) {
        const start = node.attributes[1].loc?.start;
        const end = node.attributes[node.attributes.length - 1].loc?.end;
        const msg = `The '<else-if>' tag only supports a default attribute.`;

        if (start == null || end == null) {
          throw tag.get("name").buildCodeFrameError(msg);
        } else {
          throw tag.hub.buildError(
            { loc: { start, end } } as unknown as t.Node,
            msg,
            Error,
          );
        }
      }

      translate.enter(tag);
    },
    exit(tag) {
      translate.exit(tag);
    },
  },
  attributes: {},
  autocomplete: [
    {
      snippet: "else-if=${1:condition}",
      description:
        "Use after an <if> or <else-if> tag to display content if those conditions do not match and this one does.",
      descriptionMoreURL: "https://markojs.com/docs/core-tags/#if-else-if-else",
    },
  ],
} as Tag;
