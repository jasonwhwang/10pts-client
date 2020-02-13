const defaultState = {
  isFollowing: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return defaultState
    case 'isFollowing':
      return {
        ...state,
        [action.type]: action.val
      }
    default:
      return state;
  }
}