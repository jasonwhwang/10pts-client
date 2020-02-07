const defaultState = {
  user: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return defaultState
    case 'USER':
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}