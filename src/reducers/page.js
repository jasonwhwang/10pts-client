const defaultState = {
  _id: '',
  isLiked: false,
  isSaved: false,
  isReviewed: -1,
  foodname: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return defaultState
    case 'isLiked':
    case 'isSaved':
      return {
        ...state,
        [action.type]: action.val
      }
    case 'setPage':
      return { ...state, ...action.val }
    case 'resetPage':
      return defaultState
    default:
      return state;
  }
}