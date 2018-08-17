// Updating state
// this.setState({showComments: true })

// Shorthand Function Syntax:
//    (input) => { this._author = input }
// is the same as:
//    function(newComment) {
//      this._author = input;
//    }.bind(this)

import {CommentBox} from './commentComponents.js';
import ContactsBox from './contactsBox.js'
import {TodoApp} from './todo/todoComponents.js'

const x = (name, props, ...children) => {
  return React.createElement(name, props, ...children);
};

var rootElement = x('div', {style: {
  display: 'flex',
    'justify-content': 'space-evenly',
  }},
  x(CommentBox, {}),
  x(ContactsBox, {}),
  x(TodoApp, {})
);
console.log(rootElement)
ReactDOM.render(rootElement, document.getElementById('app'));