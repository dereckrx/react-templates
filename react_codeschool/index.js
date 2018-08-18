import CommentBox from './comment/CommentBox.js';
import ContactsBox from './contact/ContactsBox.js';
import {TodoApp} from './todo/todoComponents.js';
import {SimplyReact, SimplyReactDOM} from '../simply_react.js';

const {x} = SimplyReact(React.createElement);
const {o} = SimplyReactDOM(ReactDOM)

o('app',
  x('div', {
      className: 'container',
      style: {margin: '50px'}
    },
    x('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }
      },
      x(CommentBox, {}),
      x(ContactsBox, {}),
      x(TodoApp, {})
    )
  )
);