var xtend = require('xtend')

module.exports = function batch (app) {
  return xtend(app, {
    update: function batchActions (model, action) {
      if (Array.isArray(action)) {
        return action.reduce(function (_state, action) {
          var state = app.update(_state.model, action)
          var model = xtend(_state.model, state.model)
          var effect = state.effect == null
            ? _state.effect == null
              ? null
              : _state.effect
            : _state.effect == null
              ? state.effect
              : [].concat(_state.effect).concat(state.effect)
          return effect == null ? { model: model } : { model: model, effect: effect }
        }, { model: model })
      }
      return app.update(model, action)
    }
  })
}
