const defaultState = {
  user: null,
  language: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return defaultState
    case 'user':
      return {
        ...state,
        [action.type]: action.val
      }
    case 'language':
      return {
        ...state,
        [action.type]: action.val
      }
    default:
      return state;
  }
}