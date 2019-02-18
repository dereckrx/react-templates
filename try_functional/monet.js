// Might be dead?
// Maybe, either, validation
// reader, free, IO
// Immutable lists, non-empty lists, other

const m = require('monet');

const validate = () =>
  m.validation.Success()
    .ap(x => x > 3 ? 'yes' : 'no')
[
  m.Maybe.None(),
  m.Maybe.Some('Some'),
  m.Either.Right('Some'),
  m.Either.Left('Error! None!'), // None with error message
  validate()
].map(x => console.log(x));