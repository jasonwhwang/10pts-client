const defaultState = {
  authUser: null,
  language: null,
  currentPage: null
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
    case 'CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage
      }
    default:
      return state;
  }
}