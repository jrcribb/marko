// size: 675 (min) 274 (brotli)
const _expr_input_value_input_valueChange = _$.intersection(2, (_scope) => {
    const { 8: input_value, 9: input_valueChange } = _scope;
    _state(_scope, input_value, input_valueChange);
  }),
  _otherState_effect = _$.effect("a0", (_scope) =>
    _$.on(
      _scope[3],
      "click",
      ((_scope) => {
        const { 11: otherState } = _scope;
        return function () {
          _otherState(_scope, otherState + 1);
        };
      })(_scope),
    ),
  ),
  _otherState = _$.state(11, (_scope, otherState) => {
    _$.data(_scope[5], otherState), _otherState_effect(_scope);
  }),
  _state_effect = _$.effect("a1", (_scope) =>
    _$.on(
      _scope[0],
      "click",
      ((_scope) => {
        const { 10: state } = _scope;
        return function () {
          _state(_scope, state + 1);
        };
      })(_scope),
    ),
  ),
  _state = _$.state(10, (_scope, state) => {
    _$.data(_scope[2], state), _state_effect(_scope);
  }),
  _input_valueChange = _$.value(
    9,
    0,
    () => _expr_input_value_input_valueChange,
  ),
  _input_value = _$.value(
    8,
    (_scope, input_value) => {
      _$.data(_scope[1], input_value), _$.data(_scope[4], input_value);
    },
    () => _expr_input_value_input_valueChange,
  ),
  _input_ = _$.value(
    7,
    (_scope, input) => {
      _input_value(_scope, input.value),
        _input_valueChange(_scope, input.valueChange),
        _otherState(_scope, input.value, input.valueChange);
    },
    () => _$.intersections([_input_value, _input_valueChange]),
  ),
  _valueChange = _$.register(
    "b0",
    (_scope) =>
      function (_new_source) {
        _source(_scope, _new_source);
      },
  ),
  _source = _$.state(
    2,
    (_scope, source) => {
      _$.data(_scope[1], source),
        _input_(_scope[0], {
          value: source,
          valueChange: _valueChange(_scope),
        });
    },
    () => _$.inChild(0, _input_),
  );
init();
