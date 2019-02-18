// sanctuaryjs.org
// Very complete + maybe and either
// Functional-purity, hard to learn
// Opinionated and less flexible

const {create, env} = require('sanctuary');
const peeps = require('./people');

const s = create({
  checkTypes: true, // Runtime type checking
  env: env
});
// s.filter, s.prop, s.compose, s.pipe, s.sortBy
// s.maybe
const getter = () =>
  s.prop('name')
  (
    s.fromMaybe({name: 'none'})
    (s.head([{name: 'Sam'}]))
  );
[
  s.head([]),
  s.head([{name: 'Sam'}]),
  s.fromMaybe({name: 'none'})(s.head([])),
  getter(),
].map(x => console.log(x));