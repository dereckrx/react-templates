//import * as React from 'react';
import CommentBox from "./comment/CommentBox";

const x = React.createElement;

class App extends React.Component {

  componentWillMount() {
    this.state = this.props.store.getState()
  }

  render() {
    return (
      x(CommentBox, {
        state: {
          showComments: this.state.showComments,
          comments: this.state.comments
        }
      })
    )
  }
}
export default App;