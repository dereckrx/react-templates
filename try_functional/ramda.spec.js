const r = require('ramda');
const p = (...args) => console.log(...args) || args

const validUsersNamedBuzz =
  r.filter(r.where({name: 'Buzz', errors: r.isEmpty}));

const expect = (result) => ({
  toEqual: (expected) => (
    r.equals(result, expected)
      ? p('PASS') || true
      : p(`${result} != ${expected}`) && false
  )
});

const it = (name, fn) => p(name, ": ", fn());

// @param text [String]
// @param separator [Regex, String]
// @return [Array<String>] Strings split by the separator with leading/trailing whitspace stripped
const split_strip = r.pipe(r.split, r.map(r.trim));

it('split_strip', () =>
  expect(
    split_strip(',', ' 1 ,2,  3  ')
  ).toEqual(['1', '2', '3'])
);
