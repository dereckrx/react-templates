export function Todo(state, dispatch) {
  return {
    ...state,
    toggleFinished: () => dispatch({
      type: 'FINISH_TODO',
    }),
  }
}

export const reducers = {
  // Doesn't work, because it's editing store state and not
  // selected todo state
  'FINISH_TODO': (s, _) => {
    console.log(s.isFinished);
    return {
      isFinished: !s.isFinished,
    }
  },
};



