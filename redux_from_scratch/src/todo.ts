import * as React from 'react';
import { SimplyReact } from '../../simply_react';

const {div, ul, li, button, input} = SimplyReact(React.createElement);

const Todo = (props) => {

  let state = {value: ''};
  const dispatch = props.dispatch;

  const onAddHandler = () => {
    if (state.value) {
      dispatch({
        type: 'ADD_TODO',
        text: state.value
      });
    }
    state.value = '';
  };

  const onDeleteHandler = (todo) => {
    dispatch({
      type: 'DELETE_TODO',
      text: todo
    });
  };

  const todos = props.state.todos.map((t) => {
    return li({onClick: () => onDeleteHandler(t)}, t);
  });

  return (
    div({},
      input({
        placeholder: "Some Text",
        onChange: (e) => {
          state.value = e.target.value
        }
      }),
      button({onClick: onAddHandler}, 'Add Todo'),
      ul({}, ...todos),
    )
  )
};

export {Todo};