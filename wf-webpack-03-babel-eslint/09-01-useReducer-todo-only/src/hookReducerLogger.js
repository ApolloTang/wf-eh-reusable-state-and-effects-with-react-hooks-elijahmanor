const hookReducerLogger = _reducer => (stateIn, action) => {
  const stateOut = _reducer(stateIn, action)
  console.groupCollapsed('hookReducer: ',action.type);
  console.log(action)
  console.log(stateIn)
  console.log(stateOut)
  console.groupEnd();
  return stateOut
}

export default hookReducerLogger
