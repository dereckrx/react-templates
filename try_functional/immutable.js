const i = require('immutable');
const p = (...args) => console.log(...args);

const list = i.List(['a', 'b']);
const map = i.Map({a: 'b', c: 111});
const map2 = i.Map({a: 'b', c: {d: 222}});
const people = i.fromJS([
  {
    name: 'dereck',
    age: 35,
    family: {fatherId: 1}
  }
  ]);

const get = (path, obj) =>
  obj.getIn(path.split('.'));

const first = people.first();
[   first.get('name', '(default)')
  , get('family.fatherId', first)
  , people.setIn(
      [0, 'family', 'fatherId'],
      69
    )
  , people.updateIn(
      [0, 'family', 'fatherId'],
      val => val + 319
    )
].map((x) => p(x));
