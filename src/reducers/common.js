const defaultState = {
  authUser: null,
  language: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return defaultState
    case 'AUTH_USER':
      return {
        ...state,
        authUser: action.authUser
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