
const {div, h1, creatorFor} = simpleReact(React.createElement, ReactDOM);
const pre = creatorFor('pre');
const o = (id, component) => ReactDOM.render(component, document.getElementById(id));

const MessageList = ({messages}) => {
  return (
    pre({id: 'messageList', style: {border: 'solid 1px', padding: '8px'}},
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
      component({messages: state.messages})
    )
  );
};



const superLog = console.log;
console.log = (...args) => {
  print(MessageList, ...args);
  superLog(...args)
};

print(MessageList, '...starting');

import test from "../reduxrx/store.spec.js";

try {
  test();
} catch (error) {
  console.error(error)
}
