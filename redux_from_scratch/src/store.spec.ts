// Run with
import {Store} from './store';

describe('Store', () => {

  const setup = () => {
    const reducer = (action, state) => {
      switch (action.type) {
        case 'test_action':
          return {...state, wasCalled: 'called'};
        default:
          return state;
      }
    };
    const store = Store({reducer});
    return {
      store,
    }
  };

  it('adds a listener', () => {
    const {store} = setup();
    store.subscribe(() => null);
    expect(store.listeners.length).toEqual(1)
  });

  it('dispatches to listeners', () => {
    const {store} = setup();
    let wasCalled = 'not called';
    store.subscribe((state) => {
      wasCalled = state.wasCalled
    });
    store.dispatch({type: 'test_action'});
    expect(wasCalled).toEqual('called')
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
    expect(wasCalled).toEqual('called')
  });

  it('creates a thunk with delay', async () => {
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
      expect(wasCalled).toEqual('called');
    });
  });

  it('creates a thunk with async test delay', () => {
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
      expect(wasCalled).toEqual('called');
    });
  });
});