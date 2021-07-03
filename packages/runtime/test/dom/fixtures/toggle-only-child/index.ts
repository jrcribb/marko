import {
  walk,
  data,
  setConditionalRendererOnlyChild,
  createRenderer,
  createRenderFn,
  read,
  write,
  readInOwner,
  runInBranch
} from "../../../../src/dom/index";
import { get, next, over } from "../../utils/walks";

export const inputs = [
  {
    value: "Hello"
  },
  {
    value: false
  },
  {
    value: "World"
  },
  {
    value: "!"
  }
];

const enum Index {
  INPUT_VALUE = 0,
  DIV = 1,
  CONDITIONAL = 1
}

type scope = {
  [Index.INPUT_VALUE]: typeof inputs[number]["value"];
  [Index.DIV]: HTMLDivElement;
  [Index.CONDITIONAL]: HTMLDivElement;
};

// <div>
//   <if=input.value>
//     <span>${input.value}</span>
//   </if>
// </div>

export const template = `<div></div>`;
export const walks = get + over(1);
export const hydrate = () => {
  write(Index.DIV, walk());
};

export const execInputValue = () => {
  setConditionalRendererOnlyChild(
    Index.CONDITIONAL,
    read(Index.INPUT_VALUE) ? branch0 : undefined
  );
  runInBranch(Index.CONDITIONAL, branch0, execInputBranch0);
};

function execInputBranch0() {
  data(
    Branch0Index.TEXT,
    readInOwner<scope, Index.INPUT_VALUE>(Index.INPUT_VALUE)
  );
}

export const execDynamicInput = (input: typeof inputs[number]) => {
  write(Index.INPUT_VALUE, input.value);
  execInputValue();
};

export default createRenderFn(template, walks, hydrate, 0, execDynamicInput);

const enum Branch0Index {
  TEXT = 0
}

type Branch0Scope = [Text];

const branch0 = createRenderer(
  "<span> </span>",
  next(1) + get + next(1),
  () => {
    write(Branch0Index.TEXT, walk());
  },
  0
);
