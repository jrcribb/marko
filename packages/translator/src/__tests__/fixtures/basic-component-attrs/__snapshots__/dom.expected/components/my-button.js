import { on as _on, data as _data, value as _value, register as _register, queueEffect as _queueEffect, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _text = /* @__PURE__ */_value("text", (_scope, text) => _data(_scope["#text/1"], text));
const _onClick_effect = _register("packages/translator/src/__tests__/fixtures/basic-component-attrs/components/my-button.marko_0_onClick", _scope => {
  const {
    onClick
  } = _scope;
  _on(_scope["#button/0"], "click", onClick);
});
const _onClick = /* @__PURE__ */_value("onClick", (_scope, onClick) => _queueEffect(_scope, _onClick_effect));
export const attrs = (_scope, _destructure, _dirty = true) => {
  let onClick, text;
  if (_dirty) ({
    onClick,
    text
  } = _destructure);
  _onClick(_scope, onClick, _dirty);
  _text(_scope, text, _dirty);
};
export { _onClick, _text };
export const template = "<button> </button>";
export const walks = /* get, next(1), get, out(1) */" D l";
export const setup = function () {};
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, null, "packages/translator/src/__tests__/fixtures/basic-component-attrs/components/my-button.marko");