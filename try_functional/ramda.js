// ramdajs.com/docs
// githubc.com/ramda/ramda/wiki/cookbook
// githubc.com/ramda/ramda/wiki/What-function-should-i-use

const r = require('ramda');
const people = require('./people');

// string -> string -> list -> list
// key, val, coll
const filterEq = r.compose(r.filter, r.propEq);
const reject = r.compose(r.filter, r.complement, r.propEq);

const married = filterEq('married', true);
const sortBy = r.compose(r.sortBy, r.prop);
const marriedByAge = r.compose(sortBy('age'), married);
const men = filterEq('gender', 'Male');
const withDnaTest = reject('dnaTestId', '');

const marriedMenWithDnaTestByAge = r.pipe(
  men,
  married,
  withDnaTest,
  sortBy('age')
);

const allMotherIdsOrDefault = r.map(val =>
  r.pathOr(-1, ['family', 'motherId'], val)
);

const birthPlaces = r.map(r.propOr('', 'birthplace'));
const unique = r.compose(
  r.uniq, r.reject(r.equals(''))
);
const asc = r.sort(r.gt);
const sortedPlaces = r.compose(
  asc,
  unique,
  birthPlaces
);
[
  married(people).length,
  marriedByAge(people).length,
  marriedMenWithDnaTestByAge(people).length,
  allMotherIdsOrDefault(people),
  sortedPlaces(people)
].map((x) => console.log(x));

