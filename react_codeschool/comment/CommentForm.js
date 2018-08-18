// import * as React from 'react';
import {SimplyReact} from '../../simply_react.js';

const {form, label, div, p, input, textarea, button} = SimplyReact(React.createElement, ReactDOM);

const CommentForm = (props) => {

  const state = {
    author: '',
    body: '',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addComment(state.author, state.body);
  };

  return (
    form({
        className: "comment-form",
        onSubmit: handleSubmit
      },
      label({}, "Join the discussion"),
      div({className: "comment-form-fields"},
        p({},
          input({
            placeholder: "Name",
            onChange: (input) => { console.log(input); state.author = input.target.value}
          })
        ),
        textarea({
          placeholder: "Comment",
          onChange: (textarea) => state.body = textarea.target.value
        })
      ),
      div({className: "comment-form-actions"},
        button({type: "submit"}, "Post Comment")
      )
    )
  )
};
export default CommentForm;