//-------------------------------------------------
// ## Container Components
// This is where the connections happen
// Technically, a container component is just a React component that uses
// store.subscribe() to read a part of the Redux state tree and supply props
// to a presentational component it renders.

function CommentBoxContainer() {

  const mapStateToProps = (state) => {
    return {
      comments: state.comments
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      deleteComment: (comment) => { dispatch(deleteCommentAction(comment)) }
    };
  };

  const connect = () => {
    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(CommentBox)
  }
}
//-------------------------------------------------

const connect = (mapStateToProps, mapDispatchToProps) => {
  const sub = (component) => store.subscribe((newState) => {
    const sProps = mapStateToProps(newState);
    const dProps = mapDispatchToProps(store.dispatch);
    const props = {...sProps, ...dProps};
    component.setState(props)
  });
};

