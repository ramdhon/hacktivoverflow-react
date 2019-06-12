const defaultState = {
  isLoading: false,
}

function reducer (state = defaultState, action) {
  switch(action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}

export default reducer;