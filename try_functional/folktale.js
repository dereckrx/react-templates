// folktale.origamitower.com
// Maybe, Result, Validation support

// chain === map

//---MAYBE----------------------------------------------
const f = require('folktale');
const peeps = require('./people');
const just = f.maybe.Just;
const none = f.maybe.Nothing;
const maybe = val => val ? just(val) : none();

const findFirst = (list, pred) =>
  maybe(
    list.find(item => pred(item))
  );

const getAllGivenNames = item =>
  maybe(item.givenNames);

const getSecondGivenName = item =>
  item.length > 1
  ? just(item[1])
    : none();

const getPersonMiddleName = (data, fn) =>
  findFirst(data ,fn)
    .chain(getAllGivenNames)
    .chain(getSecondGivenName)
    .matchWith({
      Just: ({value}) => value,
      Nothing: () => {
        console.log('No middle name found');
        return '';
      }
    });
[
  none(),
  just(1).chain(x => x + 1),
  maybe(null).chain(x => x + 1),
  getPersonMiddleName(
    peeps,
    x => x.surname === 'Dutton' && x.gender === 'Female'
    )
].map(x => console.log(x));

console.log('---RESULT----------------------------------------------');
const ok = f.result.Ok;
const error = f.result.Error;

const match = (result) =>
  result.matchWith({
    Ok: ({value}) => value,
    Error: ({value}) => console.log(value) || ''
  });
[
  ok('ok!').chain(x => x + '!'),
  error('Error!').chain(x => x + '?'),
  match(ok('Im ok')),
  match(error('Im an error')),
].map(x => console.log(x));

console.log('---VALIDATION----------------------------------------------');
const pass = f.validation.Success;
const fail = f.validation.Failure;

const validatePassword = pw =>
  f.validation
    .Success()
    .concat(
      pw.includes(' ') ? fail(['No spaces']) : pass(pw))
    .concat(
      pw.length < 5 ? fail(['Too short']) : pass(pw));

const validateAll = () =>
  f.validation.collect(
    [
      validatePassword('badp'),
      validatePassword('pw pw')
    ]
  ).matchWith({
    Success: ({value}) => `====Success: ${value}`,
    Failure: ({value}) => `----Failure: ${value}`
  });

const normalizeSpacing = (text) =>
  (text || '').replace(/(?<=\d,)\s+(?=\d)/, "")   // 10, 10, 10 => 10,10,10
    .replace(/(?<=\d)\s+(?=x\s*\d)/, "")  // 3 x10 => 3x10
    .replace(/(?<=\dx)\s+(?=\d)/, "")     // 3x 10 => 3x10
    .replace(/(?<=\d)\s+(?=\-\s*\d)/, "") // 3x8 -10 => 3x8-10
    .replace(/(?<=\d\-)\s+(?=\d)/, "")    // 3x8- 10 => 3x8-10
    .replace(/(?<=\d)\s+(?=@)/, "")       // 10 @100 => 10@100
    .replace(/(?<=@)\s+(?=\d)/, "");       // @ 100 => @100

[
    '==================hello',
  pass('Success'),
  fail(['FAIL']),
  pass('hi').concat('hi'.includes(' ') ? fail(['No spaces']) : pass('hi')),
  validatePassword('mypassss'),
  validatePassword('mypw'),
  validatePassword('p w'),
  validateAll(),
  normalizeSpacing('3 x 10 @ 100')
].map(x => console.log(x));