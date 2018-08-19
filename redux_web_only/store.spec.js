// Run with in the browser by opening runTests.html

import {Store} from './store.js';
import {test, describe, it, async, itAsync, expectEqual} from './test_simply.js';

const t = test('Store', () => {
  const setup = () => {
    const reducer = (action, state) => {
      switch (action.type) {
        case 'test_action':
          return {...state, wasCalled: 'called'}
        default:
          return state;
      }
    };
    const store = Store({reducer, state: {}});
    return {
      store,
    }
  };

  it('adds a subscriber and notifies', () => {
    const {store} = setup();
    let wasCalled = 'not called';
    store.subscribe((state) => {
      wasCalled = state.wasCalled
    });
    store.dispatch({type: 'test_action'});
    expectEqual(wasCalled, 'called')
  });

  it('creates a thunk', () => {
    const {store} = setup();
    let wasCalled = 'not called';

    const thunk = store.thunk(
      (handler) => {
        //... do the async request ...
        handler('called')
      },
      (response) => {
        wasCalled = response
      },
      0
    );

    thunk();
    expectEqual(wasCalled, 'called')
  });

  it('creates a thunk with delay', () => {
    async((done) => {
      const {store} = setup();
      let wasCalled = 'not called';

      const thunk = store.thunk(
        (handler) => {
          handler('called')
        },
        (response) => {
          wasCalled = response
        },
        500
      );
      thunk().then(() => {
        expectEqual(wasCalled, 'called');
        done();
      });
    });
  });

  itAsync('creates a thunk with async test delay', () => {
    const {store} = setup();
    let wasCalled = 'not called';

    const thunk = store.thunk(
      (cb) => {
        cb('called')
      },
      (response) => {
        wasCalled = response
      },
      500
    );
    thunk().then(() => {
      expectEqual(wasCalled, 'called');
    });
  })();
});

export default t;