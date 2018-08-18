// Run with
import {Store} from './store';
import {addTodo} from './actions';

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
    const store = Store({reducer, log: () => null});
    return {
      store,
    }
  };

  it('adds a subscriber', () => {
    const {store} = setup();
    store.subscribe(() => null);
    expect(store.subscribers.length).toEqual(1)
  });

  it('dispatches to subscriber', () => {
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

  it('dispatches add todo', () => {
    const {store} = setup();
    const todos = [];
    store.subscribe((todo) => { todos.push(todo) });
    store.dispatch(addTodo('Learn about actions'));
    store.dispatch(addTodo('Learn about reducers'));
    store.dispatch(addTodo('Learn about store'));
    expect(todos.length).toEqual(3)
  });

});