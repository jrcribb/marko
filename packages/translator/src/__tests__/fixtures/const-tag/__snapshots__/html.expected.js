import { markHydrateNode as _markHydrateNode, escapeXML as _escapeXML, write as _write, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = _register("packages/translator/src/__tests__/fixtures/const-tag/template.marko", input => {
  const x = 1;
  const y = 1;

  _write(`<div>${_markHydrateNode(0)}${_escapeXML(x)}</div>${_markHydrateNode(1)}${_escapeXML(y)}`);
});

export default _renderer;
export const render = _createRenderer(_renderer);