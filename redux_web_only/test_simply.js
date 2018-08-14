// Blog post
//https://medium.com/@WebReflection/vanilla-js-testing-part-ii-63b9d736121

// Github project
// https://github.com/WebReflection/tressa

// GIst
// https://gist.github.com/WebReflection/00531a64bb7b846c9b78e059fc0441ff

//---SYNC TESTS ----------------------------------------------
// For sync tests

// define a default timeout
const test = {
  exitCode: 0,
  timeout: 1000,
};

const assert = (condition, message) => {
  try {
    //console.assert.apply(console, arguments);
    const output = condition ? `. ${message}` : `x ${message}`;
    console.log(output);
  } catch(error) {
    test.exitCode = 1;
    console.error('ERROR:', error.message);
  }
};

const equal = (obj1, obj2, testName='') => {
  assert(obj1 === obj2, `"${testName}": expected '${obj1}' to equal '${obj2}'`);
};

const it = (description, fn) => {
  // Create timer to ensure test is actually called
  const timer = setTimeout(
    () => console.error(`ERROR: "${description}" was not called`),
    200
  );
  return (
    () => {
      fn(description);
      clearTimeout(timer)
    }
  );
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
  return () => {
    async((done) => {
        new Promise((res, _) => res(fn(description)))
        .then(() => done());
      },
      description
    );
  }
};

export default test;
export {assert, it, async, itAsync, equal};