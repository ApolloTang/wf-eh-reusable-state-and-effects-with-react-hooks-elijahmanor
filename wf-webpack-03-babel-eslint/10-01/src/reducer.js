const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      let prevId = state.reduce((acc, todo)=>Math.max(acc,todo.id), 0)
      return [
        ...state,
        { id: ++prevId, text: action.payload.text, completed: false }
      ];
    }
    case "DELETE_TODO":
      return state.filter(todo => todo.id !== action.payload.id);
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

export default reducer
