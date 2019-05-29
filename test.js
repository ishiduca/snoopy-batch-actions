'use strict'
const test = require('tape')
const batch = require('./batch')

test('applyBatchedActionsApp = batch(app)', t => {
  const update = (_model, action) => {
    const model = { ..._model }
    if (action === 'stringAddOne') {
      model.string = _model.string + '1'
      return { model }
    }
    if (action === 'numberAddOne') {
      model.number = _model.number + 1
      return { model }
    }
    if (action === 'get') {
      let effect = 'GET'
      return { model, effect }
    }
    if (action === 'post') {
      let effect = 'POST'
      return { model, effect }
    }
    return { model }
  }

  t.test('batch - no effect', tt => {
    const app = batch({ update })
    const data = {
      string: '0',
      number: 0
    }
    const model = {
      string: '01',
      number: 1
    }
    const expected = { model }
    tt.deepEqual(app.update(data, ['stringAddOne', 'numberAddOne']), expected, JSON.stringify(expected))
    tt.end()
  })

  t.test('batch - one effect', tt => {
    const app = batch({ update })
    const data = {
      string: '0',
      number: 0
    }
    const model = {
      string: '01',
      number: 1
    }
    const effect = 'POST'
    const expected = { model, effect }
    tt.deepEqual(app.update(data, ['stringAddOne', 'post', 'numberAddOne']), expected, JSON.stringify(expected))
    tt.end()
  })

  t.test('batch - multi effect', tt => {
    const app = batch({ update })
    const data = {
      string: '0',
      number: 0
    }
    const model = {
      string: '01',
      number: 1
    }
    const effect = [ 'GET', 'POST' ]
    const expected = { model, effect }
    tt.deepEqual(app.update(data, ['get', 'stringAddOne', 'post', 'numberAddOne']), expected, JSON.stringify(expected))
    tt.end()
  })

  t.end()
})
