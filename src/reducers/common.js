const defaultState = {
  user: null,
  language: null
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
    case 'LANGUAGE':
      return {
        ...state,
        language: action.language
      }
    default:
      return state;
  }
}