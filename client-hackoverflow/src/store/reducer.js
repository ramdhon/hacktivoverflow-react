const defaultState = {
  isLoading: false,
  isLogin: false,
}

function reducer (state = defaultState, action) {
  switch(action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_LOGIN':
      return {
        ...state,
        isLogin: action.payload
      }
    default:
      return state
  }
}

export default reducer;