// Run with
// $ node test_simply_example.js

import assert from './test_simply';

// --- EXAMPLE TESTS ----------------------------------------------
// synchronous
assert.equal(1, 1);
assert.equal(2, 1);

assert.it('matches using multiple asserts', () => {
  assert.equal(1, 1);
  assert.equal(2, 1);
})();

function promisedValue() {
  return (new Promise((resolve, reject) => {
    setTimeout(resolve(2), 5000);
  }));
}

// asynchronous
assert.async(
  (done) => {
    promisedValue().then((val) => {
      assert(1 === val, 'Async promised value failure');
      done();
    });
  }
);

// asynchronous timeout
assert.async(done => {
  setTimeout(() => {
    // fake assert(1 === 1) in here
    done();
  }, 3000);
}, 2000, 'Async timeout failure');