http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/

open file in browser to run it


## Setup
Code:
https://github.com/reactjs/react-redux
https://github.com/facebook/react

http://redux.js.org/docs/basics/Reducers.html
http://redux.js.org/docs/basics/UsageWithReact.html
http://redux.js.org/docs/basics/ExampleTodoList.html
https://www.codementor.io/reactjs/tutorial/intro-to-react-redux-pros

-------------------------------------------------
## Mon Jan 2 2017 8:05 AM
x finished using the async guide to implement a Redux style middle ware
- next I guess would be adding multiple components, comments on a TODO

## Thu Dec 15 2016 11:46 AM
x next is to pass in the actions as dispatch functions
x http://redux.js.org/docs/advanced/AsyncActions.html
x move all api calls to redux store

-------------------------------------------------

## Async
Move async API calls into action creator functions
component continues to call an action creator,
  - which then uses a promis to postpone dispatching an action until the API call is complete
  - dispatch action causes reducer to update its state

 * dispatch a PENDING action so UI cann show spinner
 * Make the API call
 * in a callback/promise, dispatch a SUCCEEDED action so that your reducers can update their state
 * or an FAILED action, so reducers can update state

## Simple
- p: LP, GP, Hand, Inv
- 1 active card: HP, AP, GP, LP
- opp: LP, GP, Hand, Inv
