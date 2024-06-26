import { write as _write, writeScope as _writeScope, nextScopeId as _nextScopeId, createRenderer as _createRenderer, register as _register, markResumeControlSingleNodeEnd as _markResumeControlSingleNodeEnd, getScopeById as _getScopeById, createTemplate as _createTemplate } from "@marko/runtime-tags/debug/html";
const _renderer = /* @__PURE__ */_createRenderer((input, _tagVar) => {
  const _scope0_id = _nextScopeId();
  let _ifScopeId, _ifRenderer;
  if (input.a + input.b) {
    const _scope1_id = _nextScopeId();
    _write("Hello");
    _writeScope(_scope1_id, {});
    _register(_ifRenderer = /* @__PURE__ */_createRenderer(() => {}), "packages/translator-tags/src/__tests__/fixtures/if-tag/template.marko_1_renderer");
    _ifScopeId = _scope1_id;
  }
  _write(`${_markResumeControlSingleNodeEnd(_scope0_id, "#text/0", _ifScopeId)}`);
  let _ifScopeId2, _ifRenderer2;
  if (input.a, input.b) {
    const _scope2_id = _nextScopeId();
    _write("World");
    _writeScope(_scope2_id, {});
    _register(_ifRenderer2 = /* @__PURE__ */_createRenderer(() => {}), "packages/translator-tags/src/__tests__/fixtures/if-tag/template.marko_2_renderer");
    _ifScopeId2 = _scope2_id;
  }
  _write(`${_markResumeControlSingleNodeEnd(_scope0_id, "#text/1", _ifScopeId2)}<div>`);
  let _ifScopeId3, _ifRenderer3;
  if (input.x) {
    const _scope3_id = _nextScopeId();
    _write("A");
    _writeScope(_scope3_id, {});
    _register(_ifRenderer3 = /* @__PURE__ */_createRenderer(() => {}), "packages/translator-tags/src/__tests__/fixtures/if-tag/template.marko_3_renderer");
    _ifScopeId3 = _scope3_id;
  } else if (input.y) {
    const _scope4_id = _nextScopeId();
    _write("B");
    _writeScope(_scope4_id, {});
    _register(_ifRenderer3 = /* @__PURE__ */_createRenderer(() => {}), "packages/translator-tags/src/__tests__/fixtures/if-tag/template.marko_4_renderer");
    _ifScopeId3 = _scope4_id;
  } else {
    const _scope5_id = _nextScopeId();
    _write("C");
    _writeScope(_scope5_id, {});
    _register(_ifRenderer3 = /* @__PURE__ */_createRenderer(() => {}), "packages/translator-tags/src/__tests__/fixtures/if-tag/template.marko_5_renderer");
    _ifScopeId3 = _scope5_id;
  }
  _write(`${_markResumeControlSingleNodeEnd(_scope0_id, "#text/2", _ifScopeId3)}</div>`);
  _writeScope(_scope0_id, {
    "#text/0(": _ifRenderer,
    "#text/0!": _getScopeById(_ifScopeId),
    "#text/1(": _ifRenderer2,
    "#text/1!": _getScopeById(_ifScopeId2),
    "#text/2(": _ifRenderer3,
    "#text/2!": _getScopeById(_ifScopeId3)
  });
});
export default /* @__PURE__ */_createTemplate(_renderer, "packages/translator-tags/src/__tests__/fixtures/if-tag/template.marko");