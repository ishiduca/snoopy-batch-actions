# snoopy-batch-actions

apply batch actions in [ '@ishiduca/snoopy' ](https://github.com/ishiduca/snoopy)

## install

```shell
npm i --save @ishiduca/snoopy-batch-actions
```

## usage

### applyBatchActionsApp = batch(app)

### example

```js
const yo = require('yo-yo')
const xtend = require('xtend')
const { start } = require('@ishiduca/snoopy')
const batch = require('@ishiduca/snoopy-batch-actions')
const app = batch({
  init () {
    return {
      model: {
        number: 0,
        string: '0'
      }
    }
  },
  update (_model, action) {
    const model = xtend(_model)
    if (action === 'stringAddOne') {
      model.string = _model.string + '1'
      return { model }
    }
    if (action === 'numberAddOne') {
      model.number = _model.number + 1
      return { model }
    }
    return { model }
  },
  view (model, actionsUp) {
    yo`
      <main>
        <section>
          <a onclick=${e => actionsUp('stringAddOne')}>string add one</a>
          <a onclick=${e => actionsUp('numberAddOne')}>number add one</a>
          <a onclick=${e => actionsUp([ 'stringAddOne', 'numberAddOne' ])}>batch</a>
        </section>
        <section class="result">
          <ol>
            <li>string: ${model.string} </li>
            <li>number: ${model.number} </li>
          </ol>
        </section>
      </main>
    `
  }
})

const root = document.querySelector('main')
const { views } = start(app)
views().pipe(through.obj((el, _, done) => {
  yo.update(root, el)
  done()
}))
```

## authour

ishiduca@gmail.com

## license

The Apache License

Copyright &copy; 2019 ishiduca

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
