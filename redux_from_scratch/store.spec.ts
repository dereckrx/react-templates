// Run with
import {Store} from './store';
import {it, async, itAsync, equal} from './test_simply';
try {
const expectEqual = equal;

const setup = () => {
  const reducer = (action, state) => {
    switch (action.type) {
      case 'test_action':
        return {...state, wasCalled: 'called'}
      default:
        return state;
    }
  };
  const store = Store({reducer});
  return {
    store,
  }
};

it('adds a listener', (m) => {
  const {store} = setup();
  store.subscribe(() => null);
  expectEqual(store.listeners.length, 1, m);
})();

it('dispatches to listeners', (m) => {
  const {store} = setup();
  let wasCalled = 'not called';
  store.subscribe((state) => { wasCalled = state.wasCalled });
  store.dispatch({type: 'test_action'});
  expectEqual(wasCalled, 'called with true', m)
})();

it('creates a thunk', (m) => {
  const {store} = setup();
  let wasCalled = 'not called';

  const thunk = store.thunk(
    (handler) => {
      //... do the async request ...
      handler('called')
    },
    (response) => {wasCalled = response},
    0
  );

  thunk();
  expectEqual(wasCalled, 'called', m)
})();

it('creates a thunk with delay', (m) => {
  async((done) => {
    const {store} = setup();
    let wasCalled = 'not called';

    const thunk = store.thunk(
      (handler) => { handler('called')},
      (response) => {
        wasCalled = response
      },
      500
    );
    thunk().then(() => {
      expectEqual(wasCalled, 'called', m);
      done();
    });
  }, m);
})();

itAsync('creates a thunk with async test delay', (m) => {
  const {store} = setup();
  let wasCalled = 'not called';

  const thunk = store.thunk(
    (cb) => { cb('called')},
    (response) => {
      wasCalled = response
    },
    500
  );
  thunk().then(() => {
    expectEqual(wasCalled, 'called', m);
  });
})();

} catch (error) {
  console.error(error)
}