

//-------------------------------------------------
// ## Container Components
// This is where the connections happen
// Technically, a container component is just a React component that uses
// store.subscribe() to read a part of the Redux state tree and supply props
// to a presentational component it renders.
// function CommentBoxContainer() {

//   this.mapStateToProps = function mapStateToProps(state) {
//     return {
//       comments: state.comments
//     };
//   }

//   this.mapDispatchToProps = function(dispatch) {
//     return {
//       deleteComment: (comment) => { store.dispatch(deleteCommentAction(comment)) }
//     };
//   }

//   this.connect = function() {
//     return connect(
//       mapStateToProps,
//       mapDispatchToProps
//     )(CommentBox)
//   }
// }
//-------------------------------------------------

// function connect(mapStateToProps, mapDispatchToProps) {
//   store.subscribe()
// }

