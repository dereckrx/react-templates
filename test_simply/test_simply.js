// Blog post
//https://medium.com/@WebReflection/vanilla-js-testing-part-ii-63b9d736121

// Github project
// https://github.com/WebReflection/tressa

// GIst
// https://gist.github.com/WebReflection/00531a64bb7b846c9b78e059fc0441ff

//---SYNC TESTS ----------------------------------------------
// For sync tests

// define a default timeout
const testData = {
  exitCode: 0,
  timeout: 1000,
};

let testName = 'NOT SET';

const assert = (condition, message) => {
  try {
    //console.assert.apply(console, arguments);
    const output = condition ? `. ${message}` : `x ${message}`;
    console.log(output);
  } catch(error) {
    testData.exitCode = 1;
    console.error('ERROR:', error.message);
  }
};

const expectEqual = (obj1, obj2) => {
  assert(obj1 === obj2, `"${testName}": expected '${obj1}' to equal '${obj2}'`);
};

const test = (description, fn) => {
  return (() => {
    console.log(`Testing: ${description}`);
    fn();
  })
};

const describe = (description, fn) => {
  fn(description)
};

const it = (description, fn) => {
  testName = description;
  fn(description);
};

// --- ASYNC TEST ----------------------------------------------
// fn:
const async = (fn, description) => {
  // create a timer that will fail if test takes too long
  const timer = setTimeout(
    () => {
      assert(false, `TIMEOUT: ${description}`)
    },
    test.timeout
  );
  // invoke test and pass function to clear timeout
  // This is the 'done()' function
  return fn(() => clearTimeout(timer));
};

// Test asynchronous tests
// fn: (m) => {...test...}
const itAsync = (description, fn) => {
  testName = description;
  return () => {
    async((done) => {
        new Promise((res, _) => res(fn(description)))
        .then(() => done());
      },
      description
    );
  }
};

export {assert, test, it, describe, async, itAsync, expectEqual};