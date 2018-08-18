import {SimplyReact, SimplyReactDOM} from '../simply_react.js';

const {x, div, h1} = SimplyReact(React.createElement, ReactDOM);
const {o} = SimplyReactDOM(ReactDOM);

const MessageList = ({messages}) => {
  return (
    x('pre', {id: 'messageList', style: {border: 'solid 1px', padding: '8px'}},
      ...messages.map(m => div(m))
    )
  )
};

let state = {messages: []};

const print = (component, ...message) => {
  state.messages = state.messages.concat(message);
  o('app',
    div(
      h1('Tests!'),
      x(component, {messages: state.messages})
    )
  );
};



const superLog = console.log;
console.log = (...args) => {
  print(MessageList, ...args);
  superLog(...args)
};
print(MessageList, '...starting');

import test from "./store.spec.js";

try {
  test();
} catch (error) {
  console.error(error)
}
